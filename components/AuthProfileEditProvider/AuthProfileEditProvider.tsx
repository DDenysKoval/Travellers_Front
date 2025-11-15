import Link from "next/link";
import css from "./AuthProfileEditProvider.module.css";

interface AuthProfileEditProviderProps {
  children: React.ReactNode;
}

const AuthProfileEditProvider = ({
  children,
}: AuthProfileEditProviderProps) => {
  return (
    <div className="container">
      <div className={css.providercontainer}>
        <header className={css.logowrapper}>
          <Link className={css.link} href={"/"}>
            <svg className={css.logo} width="23" height="23">
              <use href="/icons.svg#icon-plant_1892751-1"></use>
            </svg>
            <p className={css.text}>Подорожники</p>
          </Link>
        </header>
        <main className={css.content}>{children}</main>
        <footer className={css.textwrapper}>© 2025 Подорожники</footer>
      </div>
    </div>
  );
};

export default AuthProfileEditProvider;
