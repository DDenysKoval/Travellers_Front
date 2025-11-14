import css from "./Footer.module.css";
import Logo from './Logo/Logo';
import Socials from './Socials/Socials';
import Navigation from './Navigation/Navigation';

const Footer = ({ isAuth = false }: { isAuth?: boolean }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={css.footer} role="contentinfo">
      <div className="container">
        <div className={css.content}>
          <div className={css.footerTop}>
            <div className={css.footerWrapper}>
              <Logo link="/" />
              <Socials />
            </div>
            <div className={css.navigationWrapper}>
              <Navigation isAuth={isAuth} />
            </div>
          </div>
          <div className={css.footerBottom}>
            <p className={css.copyright}>
              © {currentYear} Подорожники. Усі права захищені.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;