import { NextRequest } from "next/server";
import config from "@/config";
import { forwardToBackend, isAdmin, unauthorized } from "@/libs/crmProxy";

// Lists this client's subscribers for /admin. Also doubles as the admin
// login check — a 401 here means the typed password was wrong.
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!isAdmin(req)) return unauthorized();
  return forwardToBackend(`/api/crm/clients/${config.clientSlug}/subscribers`);
}
