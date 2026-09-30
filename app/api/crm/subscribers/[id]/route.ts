import { NextRequest } from "next/server";
import config from "@/config";
import { forwardToBackend, isAdmin, unauthorized } from "@/libs/crmProxy";

// Deletes one subscriber — used by the admin table's Delete button and
// Delete Selected. clientSlug is set here, so a request can only ever
// delete this client's contacts.
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAdmin(req)) return unauthorized();
  return forwardToBackend(`/api/crm/subscribers/${encodeURIComponent(params.id)}`, {
    method: "DELETE",
    body: { clientSlug: config.clientSlug },
  });
}
