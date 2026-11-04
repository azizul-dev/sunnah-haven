export function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  if (href === "/shop") {
    return pathname.startsWith("/shop") || pathname.startsWith("/product");
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}
