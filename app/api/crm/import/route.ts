import { NextRequest } from "next/server";
import config from "@/config";
import { forwardToBackend, isAdmin, unauthorized } from "@/libs/crmProxy";

// CSV/XLSX import from /admin. clientSlug/clientName come from config here,
// not the request, so an import always lands under this client.
export async function POST(req: NextRequest) {
  if (!isAdmin(req)) return unauthorized();
  const body = await req.json();
  return forwardToBackend("/api/crm/subscribers/import", {
    method: "POST",
    body: { subscribers: body.subscribers || [], clientSlug: config.clientSlug, clientName: config.appName },
  });
}
