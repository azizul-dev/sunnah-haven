import Link from "next/link";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import { PHONE_NUMBER, SITE_NAME } from "@/lib/constants";
import { strings } from "@/data/strings";
import { toBanglaNumber } from "@/lib/format";

type LinkItem = { label: string; href: string };

function LinkColumn({ title, links }: { title: string; links: LinkItem[] }) {
  return (
    <div>
      <h3 className="mb-3 font-heading text-lg text-gold">{title}</h3>
      <ul className="space-y-2 text-sm text-cream/80">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="transition hover:text-gold">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const { footer } = strings;

  return (
    <footer className="mt-16 border-t border-gold/40 bg-emerald-night pb-24 pt-12 md:pb-10">
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-3 text-sm leading-relaxed text-cream/70">
              {footer.tagline}
            </p>
          </div>
          <LinkColumn title={footer.shopTitle} links={footer.shopLinks} />
          <LinkColumn title={footer.helpTitle} links={footer.helpLinks} />
          <div>
            <h3 className="mb-3 font-heading text-lg text-gold">
              {footer.contactTitle}
            </h3>
            <p className="text-sm text-cream/80">{footer.address}</p>
            <p className="mt-2 text-sm text-cream/80">
              {toBanglaNumber(PHONE_NUMBER)}
            </p>
          </div>
        </div>

        <ul className="mt-10 flex flex-wrap gap-2">
          {footer.payments.map((payment) => (
            <li
              key={payment}
              className="rounded border border-gold/50 px-3 py-1 text-xs text-gold-light"
            >
              {payment}
            </li>
          ))}
        </ul>

        <p className="mt-8 border-t border-gold/20 pt-6 text-center text-xs text-cream/60">
          © {SITE_NAME}. {footer.rights}
        </p>
      </Container>
    </footer>
  );
}
