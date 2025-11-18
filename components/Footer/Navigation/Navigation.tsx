import Link from "next/link";
import css from "./Navigation.module.css";
import { useAuthStore } from "@/lib/store/authStore";

const Navigation = () => {
  const { isAuthenticated } = useAuthStore();

  const authenticatedLinks = [
    { label: "Головна", href: "/" },
    { label: "Історії", href: "/stories" },
    { label: "Мандрівники", href: "/travelers" },
    { label: "Профіль", href: "/auth/register" },
  ];

  const unauthenticatedLinks = [
    { label: "Головна", href: "/" },
    { label: "Історії", href: "/stories" },
    { label: "Мандрівники", href: "/travellers" },
  ];

  const navLinks = isAuthenticated ? authenticatedLinks : unauthenticatedLinks;

  return (
    <nav className={css.navigation} aria-label="Основна навігація">
      <ul className={css.navList}>
        {navLinks.map((link) => (
          <li key={link.label} className={css.navItem}>
            <Link href={link.href} className={css.navLink}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
