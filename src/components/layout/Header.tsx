import { Search, User } from "lucide-react";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import CartLink from "@/components/layout/CartLink";
import HeaderIconLink from "@/components/layout/HeaderIconLink";
import MobileMenu from "@/components/layout/MobileMenu";
import NavLinks from "@/components/layout/NavLinks";
import ThemeToggle from "@/components/layout/ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-gold/30 bg-emerald-night/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Logo />
        <NavLinks />
        <div className="flex items-center gap-0.5">
          <HeaderIconLink href="/search" label="সার্চ" className="hidden md:block">
            <Search size={20} />
          </HeaderIconLink>
          <ThemeToggle />
          <HeaderIconLink href="/account" label="অ্যাকাউন্ট" className="hidden md:block">
            <User size={20} />
          </HeaderIconLink>
          <CartLink />
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
