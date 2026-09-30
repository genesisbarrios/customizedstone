import { NextRequest, NextResponse } from "next/server";
import config from "@/config";

// Server-only — ENIGMA_API_URL and ADMIN_PASSWORD have no NEXT_PUBLIC_
// prefix, so neither the backend URL nor the real admin password is ever
// shipped to the browser. The /admin page submits the typed password here
// and only finds out whether it was correct from the response status.
const ENIGMA_API_URL = process.env.ENIGMA_API_URL || "http://localhost:5001";
// Fails closed: with no ADMIN_PASSWORD set, nobody gets in.
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";

export async function GET(req: NextRequest) {
  const password = req.headers.get("x-admin-password");
  if (!ADMIN_PASSWORD || password !== ADMIN_PASSWORD) {
    return NextResponse.json(
      { ok: false, message: "Invalid admin password." },
      { status: 401 }
    );
  }

  const res = await fetch(
    `${ENIGMA_API_URL}/api/crm/clients/${config.clientSlug}/subscribers`,
    { headers: { "x-admin-password": ADMIN_PASSWORD }, cache: "no-store" }
  );

  // The typed password matched this site's ADMIN_PASSWORD, but the CRM
  // backend doesn't accept that value (it takes CRM_ADMIN_PASSWORD or this
  // client's own adminPassword). Report it as a config problem, not a wrong
  // password, so the login screen doesn't mislead.
  if (res.status === 401) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Password is correct, but the CRM backend doesn't accept this site's ADMIN_PASSWORD. Set it as this client's password on the backend.",
      },
      { status: 502 }
    );
  }

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

// Backs the admin "+ Add Contact" button — a single manual add.
export async function POST(req: NextRequest) {
  const password = req.headers.get("x-admin-password");
  if (!ADMIN_PASSWORD || password !== ADMIN_PASSWORD) {
    return NextResponse.json(
      { ok: false, message: "Invalid admin password." },
      { status: 401 }
    );
  }

  const body = await req.json();

  const res = await fetch(`${ENIGMA_API_URL}/api/crm/subscribers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-admin-password": ADMIN_PASSWORD,
    },
    body: JSON.stringify({ ...body, clientSlug: config.clientSlug }),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
