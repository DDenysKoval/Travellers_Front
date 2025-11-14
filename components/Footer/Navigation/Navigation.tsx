import Link from 'next/link'
import css from './Navigation.module.css'

const Navigation = ({ isAuth = false }: { isAuth?: boolean }) => {
  const authenticatedLinks = [
    { label: 'Головна', href: '/' },
    { label: 'Історії', href: '/stories' },
    { label: 'Мандрівники', href: '/travelers' },
    { label: 'Профіль', href: '/profile' }
  ];

  const unauthenticatedLinks = [
    { label: 'Головна', href: '/auth/register' },
    { label: 'Історії', href: '/auth/register' },
    { label: 'Мандрівники', href: '/auth/register' },
    { label: 'Профіль', href: '/auth/register' }
  ];

  const navLinks = isAuth ? authenticatedLinks : unauthenticatedLinks;

  return (
    <nav className={css.navigation} aria-label="Основна навігація">
      <ul className={css.navList}>
        {navLinks.map((link) => (
          <li key={link.label} className={css.navItem}>
            <Link 
              href={link.href}
              className={css.navLink}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;