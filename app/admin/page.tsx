"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as XLSX from "xlsx";
import config from "@/config";

interface Subscriber {
  _id: string;
  name?: string;
  email: string;
  phone?: string;
  message?: string;
  source: string;
  createdAt: string;
}

const SOURCE_LABELS: Record<string, string> = {
  contact_form: "Contact Form",
  newsletter: "Newsletter",
  import: "Imported",
};

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "pw";
const SESSION_KEY = "customizedstone_admin_authed";

function downloadBlob(content: BlobPart, filename: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function toRows(subscribers: Subscriber[]) {
  return subscribers.map((s) => ({
    Name: s.name || "",
    Email: s.email,
    Phone: s.phone || "",
    Message: s.message || "",
    Source: s.source,
    "Signed Up": new Date(s.createdAt).toLocaleString(),
  }));
}

function findField(row: Record<string, any>, candidates: string[]) {
  const keys = Object.keys(row);
  for (const candidate of candidates) {
    const match = keys.find((k) => k.trim().toLowerCase() === candidate);
    if (match) return String(row[match] ?? "").trim();
  }
  return "";
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [copyLabel, setCopyLabel] = useState("Copy");
  const [importStatus, setImportStatus] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedSubscriberIds, setSelectedSubscriberIds] = useState<Set<string>>(new Set());
  const [bulkDeleting, setBulkDeleting] = useState(false);
  const [subscriberSearch, setSubscriberSearch] = useState("");
  const [subscriberSourceFilter, setSubscriberSourceFilter] = useState("all");

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === "1") {
      setAuthed(true);
    }
  }, []);

  const loadSubscribers = async () => {
    setLoading(true);
    setLoadError("");
    try {
      const res = await fetch(
        `${config.crm.apiUrl}/api/crm/clients/${config.clientSlug}/subscribers`,
        { headers: { "x-admin-password": ADMIN_PASSWORD } }
      );
      if (!res.ok) throw new Error("Failed to load subscribers");
      const json = await res.json();
      setSubscribers(json.subscribers || []);
    } catch {
      setLoadError("Could not load subscribers. Check the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authed) loadSubscribers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authed]);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "1");
      setAuthed(true);
      setAuthError("");
    } else {
      setAuthError("Wrong password.");
    }
  };

  const handleExportCsv = () => {
    const rows = toRows(subscribers);
    const sheet = XLSX.utils.json_to_sheet(rows);
    const csv = XLSX.utils.sheet_to_csv(sheet);
    downloadBlob(csv, "customizedstone-subscribers.csv", "text/csv;charset=utf-8;");
  };

  const handleExportXlsx = () => {
    const rows = toRows(subscribers);
    const sheet = XLSX.utils.json_to_sheet(rows);
    const book = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, sheet, "Subscribers");
    XLSX.writeFile(book, "customizedstone-subscribers.xlsx");
  };

  const handleCopy = async () => {
    const rows = toRows(subscribers);
    const sheet = XLSX.utils.json_to_sheet(rows);
    const tsv = XLSX.utils.sheet_to_csv(sheet, { FS: "\t" });
    await navigator.clipboard.writeText(tsv);
    setCopyLabel("Copied!");
    setTimeout(() => setCopyLabel("Copy"), 1500);
  };

  const handleDelete = async (subscriber: Subscriber) => {
    const confirmDelete = window.confirm(
      `Delete ${subscriber.name || subscriber.email}? This can't be undone.`
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${config.crm.apiUrl}/api/crm/subscribers/${subscriber._id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", "x-admin-password": ADMIN_PASSWORD },
        body: JSON.stringify({ clientSlug: config.clientSlug }),
      });
      if (!res.ok) throw new Error("Delete failed");
      setSubscribers((prev) => prev.filter((s) => s._id !== subscriber._id));
      setSelectedSubscriberIds((prev) => {
        const next = new Set(prev);
        next.delete(subscriber._id);
        return next;
      });
    } catch {
      window.alert("Could not delete this subscriber — try again.");
    }
  };

  // Search + source filter for the main table. Select All and bulk actions
  // only ever apply to the rows currently shown.
  const sourceOptions = useMemo(
    () => Array.from(new Set(subscribers.map((s) => s.source))).sort(),
    [subscribers]
  );

  const visibleSubscribers = useMemo(() => {
    const q = subscriberSearch.trim().toLowerCase();
    return subscribers.filter((s) => {
      if (subscriberSourceFilter !== "all" && s.source !== subscriberSourceFilter) return false;
      if (!q) return true;
      return [s.name, s.email, s.phone, s.message].some((v) => (v || "").toLowerCase().includes(q));
    });
  }, [subscribers, subscriberSearch, subscriberSourceFilter]);

  const isFiltered = subscriberSearch.trim() !== "" || subscriberSourceFilter !== "all";

  const toggleSelected = (id: string) => {
    setSelectedSubscriberIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const allSelected =
    visibleSubscribers.length > 0 && visibleSubscribers.every((s) => selectedSubscriberIds.has(s._id));

  const toggleSelectAll = () => {
    setSelectedSubscriberIds(allSelected ? new Set() : new Set(visibleSubscribers.map((s) => s._id)));
  };

  const clearSelection = () => setSelectedSubscriberIds(new Set());

  const handleBulkDelete = async () => {
    const ids = Array.from(selectedSubscriberIds);
    if (ids.length === 0) return;
    const confirmDelete = window.confirm(
      `Delete ${ids.length} contact${ids.length === 1 ? "" : "s"}? This can't be undone.`
    );
    if (!confirmDelete) return;

    setBulkDeleting(true);
    try {
      // fetch() doesn't throw on a 4xx/5xx, so check each response and only
      // drop the rows the backend actually deleted.
      const results = await Promise.all(
        ids.map((id) =>
          fetch(`${config.crm.apiUrl}/api/crm/subscribers/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json", "x-admin-password": ADMIN_PASSWORD },
            body: JSON.stringify({ clientSlug: config.clientSlug }),
          })
            .then((res) => ({ id, ok: res.ok }))
            .catch(() => ({ id, ok: false }))
        )
      );
      const deleted = new Set(results.filter((r) => r.ok).map((r) => r.id));
      setSubscribers((prev) => prev.filter((s) => !deleted.has(s._id)));
      setSelectedSubscriberIds(new Set(ids.filter((id) => !deleted.has(id))));
      if (deleted.size < ids.length) {
        window.alert(
          `Could not delete ${ids.length - deleted.size} contact${ids.length - deleted.size === 1 ? "" : "s"} — try again.`
        );
      }
    } finally {
      setBulkDeleting(false);
    }
  };

  const handleImportClick = () => fileInputRef.current?.click();

  const handleImportFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImportStatus("Reading file...");
    try {
      const buffer = await file.arrayBuffer();
      const book = XLSX.read(buffer, { type: "array" });
      const sheet = book.Sheets[book.SheetNames[0]];
      const rawRows: Record<string, any>[] = XLSX.utils.sheet_to_json(sheet);

      const parsed = rawRows
        .map((row) => ({
          name: findField(row, ["name", "full name"]),
          email: findField(row, ["email", "email address"]),
          phone: findField(row, ["phone", "phone number"]),
          message: findField(row, ["message", "notes"]),
        }))
        .filter((row) => row.email);

      if (parsed.length === 0) {
        setImportStatus("No rows with an email column found.");
        return;
      }

      setImportStatus(`Importing ${parsed.length} rows...`);

      const res = await fetch(
        `${config.crm.apiUrl}/api/crm/subscribers/import`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-admin-password": ADMIN_PASSWORD,
          },
          body: JSON.stringify({
            clientSlug: config.clientSlug,
            clientName: config.appName,
            subscribers: parsed,
          }),
        }
      );

      if (!res.ok) throw new Error("Import failed");
      const json = await res.json();
      setImportStatus(
        `Imported ${json.insertedCount}, skipped ${json.skippedCount} duplicate(s).`
      );
      loadSubscribers();
    } catch {
      setImportStatus("Import failed — check the file format and try again.");
    } finally {
      e.target.value = "";
    }
  };

  if (!authed) {
    return (
      <div
        data-theme={config.colors.theme}
        className="min-h-screen flex items-center justify-center bg-base-100 px-6"
      >
        <form
          onSubmit={handlePasswordSubmit}
          className="w-full max-w-sm flex flex-col gap-4"
        >
          <h1 className="font-display text-2xl tracking-wide text-center">
            ADMIN LOGIN
          </h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="input input-bordered w-full"
            autoFocus
          />
          {authError && <p className="text-error text-sm">{authError}</p>}
          <button type="submit" className="btn btn-primary">
            Log In
          </button>
        </form>
      </div>
    );
  }

  return (
    <div data-theme={config.colors.theme} className="min-h-screen bg-base-100 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <h1 className="font-display text-3xl tracking-wide">
            NEWSLETTER & CONTACT SUBSCRIBERS
          </h1>
          <button
            onClick={() => {
              sessionStorage.removeItem(SESSION_KEY);
              setAuthed(false);
            }}
            className="btn btn-ghost btn-sm"
          >
            Log Out
          </button>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <button onClick={handleExportCsv} className="btn btn-outline btn-sm" disabled={!subscribers.length}>
            Export CSV
          </button>
          <button onClick={handleExportXlsx} className="btn btn-outline btn-sm" disabled={!subscribers.length}>
            Export XLSX
          </button>
          <button onClick={handleCopy} className="btn btn-outline btn-sm" disabled={!subscribers.length}>
            {copyLabel}
          </button>
          <button onClick={handleImportClick} className="btn btn-primary btn-sm">
            Import CSV/XLSX
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.xlsx,.xls"
            className="hidden"
            onChange={handleImportFile}
          />
          <button onClick={loadSubscribers} className="btn btn-ghost btn-sm">
            Refresh
          </button>
        </div>

        {importStatus && (
          <p className="text-sm text-base-content/70 mb-4">{importStatus}</p>
        )}

        {loading && <p className="text-base-content/60">Loading...</p>}
        {loadError && <p className="text-error">{loadError}</p>}

        {!loading && !loadError && subscribers.length > 0 && (
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <input
              type="search"
              value={subscriberSearch}
              onChange={(e) => {
                setSubscriberSearch(e.target.value);
                clearSelection();
              }}
              placeholder="Search name, email, phone, message..."
              className="input input-bordered input-sm w-full sm:w-72"
              aria-label="Search contacts"
            />
            <select
              value={subscriberSourceFilter}
              onChange={(e) => {
                setSubscriberSourceFilter(e.target.value);
                clearSelection();
              }}
              className="select select-bordered select-sm"
              aria-label="Filter by source"
            >
              <option value="all">All sources</option>
              {sourceOptions.map((source) => (
                <option key={source} value={source}>
                  {SOURCE_LABELS[source] || source}
                </option>
              ))}
            </select>
            {isFiltered && (
              <span className="text-sm text-base-content/60">
                Showing {visibleSubscribers.length} of {subscribers.length}
              </span>
            )}
            <button onClick={toggleSelectAll} className="btn btn-ghost btn-sm" disabled={!visibleSubscribers.length}>
              {allSelected ? "Deselect All" : `Select All (${visibleSubscribers.length})`}
            </button>
            {selectedSubscriberIds.size > 0 && (
              <>
                <span className="text-sm text-base-content/60">
                  {selectedSubscriberIds.size} selected
                </span>
                <div className="dropdown">
                  <label tabIndex={0} className="btn btn-primary btn-sm">
                    Actions ▾
                  </label>
                  <ul tabIndex={0} className="dropdown-content menu menu-sm bg-base-100 border border-base-300 rounded-lg shadow-md w-52 z-10 p-1">
                    <li><a onClick={handleBulkDelete} className={bulkDeleting ? "pointer-events-none opacity-50" : "text-error"}>
                      {bulkDeleting ? "Deleting..." : "Delete Selected"}
                    </a></li>
                  </ul>
                </div>
                <button onClick={clearSelection} className="btn btn-ghost btn-sm">
                  Clear Selection
                </button>
              </>
            )}
          </div>
        )}

        {!loading && !loadError && (
          <div className="overflow-x-auto border border-base-300 rounded-lg">
            <table className="table">
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm"
                      checked={allSelected}
                      onChange={toggleSelectAll}
                      aria-label="Select all"
                    />
                  </th>
                  <th>Actions</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Message</th>
                  <th>Source</th>
                  <th>Signed Up</th>
                </tr>
              </thead>
              <tbody>
                {visibleSubscribers.map((s) => (
                  <tr key={s._id}>
                    <td>
                      <input
                        type="checkbox"
                        className="checkbox checkbox-sm"
                        checked={selectedSubscriberIds.has(s._id)}
                        onChange={() => toggleSelected(s._id)}
                        aria-label={`Select ${s.name || s.email}`}
                      />
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(s)}
                        className="btn btn-ghost btn-xs text-error"
                        title="Delete"
                        aria-label="Delete"
                      >
                        Delete
                      </button>
                    </td>
                    <td>{s.name || "—"}</td>
                    <td>{s.email}</td>
                    <td>{s.phone || "—"}</td>
                    <td className="max-w-xs truncate">{s.message || "—"}</td>
                    <td>
                      <span className="badge badge-sm">{SOURCE_LABELS[s.source] || s.source}</span>
                    </td>
                    <td>{new Date(s.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
                {visibleSubscribers.length === 0 && (
                  <tr>
                    <td colSpan={8} className="text-center text-base-content/50 py-8">
                      {isFiltered ? "No contacts match these filters." : "No subscribers yet."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
