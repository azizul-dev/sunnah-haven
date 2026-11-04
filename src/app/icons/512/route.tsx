import { iconResponse } from "@/lib/pwaIcon";

export function GET() {
  return iconResponse(512);
}
