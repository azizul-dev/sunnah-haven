import { PHONE_NUMBER } from "@/lib/constants";
import { strings } from "@/data/strings";
import { toBanglaNumber } from "@/lib/format";

export default function TopBar() {
  const text = `${strings.topBar} • ${toBanglaNumber(PHONE_NUMBER)}`;

  return (
    <div className="overflow-hidden bg-emerald-deep py-2 text-xs text-gold-light sm:text-sm">
      <p className="hidden text-center sm:block">{text}</p>
      <div
        className="flex w-max animate-marquee whitespace-nowrap motion-reduce:animate-none sm:hidden"
        aria-label={text}
      >
        <span className="pr-12">{text}</span>
        <span className="pr-12" aria-hidden="true">
          {text}
        </span>
      </div>
    </div>
  );
}
