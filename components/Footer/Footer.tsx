import css from "./Footer.module.css";
import Navigation from "./Navigation/Navigation";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={css.footer} role="contentinfo">
      <div className="container">
        <div className={css.content}>
          <div className={css.footerTop}>
            <div className={css.footerWrapper}>
              <div className={css.logoUlWrapper}>
                <Link className={css.link} href={"/"}>
                  <svg className={css.logo} width="23" height="23">
                    <use href="/icons.svg#icon-plant_1892751-1"></use>
                  </svg>
                  <p className={css.text}>Подорожники</p>
                </Link>
                <ul className={css.socialList}>
                  <li className={css.socialListItem} aria-label="facebook">
                    <Link href="https://www.facebook.com/" target="_blank">
                      <svg className={css.socialLogo} width="32" height="32">
                        <use href="/icons.svg#icon-Facebook-1"></use>
                      </svg>
                    </Link>
                  </li>
                  <li className={css.socialListItem} aria-label="instagram">
                    <Link href="https://www.instagram.com/" target="_blank">
                      <svg className={css.socialLogo} width="32" height="32">
                        <use href="/icons.svg#icon-Instagram-3"></use>
                      </svg>
                    </Link>
                  </li>
                  <li className={css.socialListItem} aria-label="x">
                    <Link href="https://x.com/" target="_blank">
                      <svg className={css.socialLogo} width="32" height="32">
                        <use href="/icons.svg#icon-X-1"></use>
                      </svg>
                    </Link>
                  </li>
                  <li className={css.socialListItem} aria-label="youtube">
                    <Link href="https://www.youtube.com/" target="_blank">
                      <svg className={css.socialLogo} width="32" height="32">
                        <use href="/icons.svg#icon-Youtube"></use>
                      </svg>
                    </Link>
                  </li>
                </ul>
              </div>
              <Navigation />
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
