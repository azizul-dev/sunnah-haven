import { MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { strings } from "@/data/strings";

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={strings.whatsapp}
      className="fixed bottom-20 right-4 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 md:bottom-6 md:right-6"
    >
      <MessageCircle size={26} />
    </a>
  );
}
