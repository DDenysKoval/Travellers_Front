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
        <div className={css.logowrapper}>
          <svg className={css.logo} width="23" height="23">
            <use href="/icons.svg#icon-plant_1892751-1"></use>
          </svg>
          <p className={css.text}>Подорожники</p>
        </div>
        <div className={css.content}>{children}</div>
        <p className={css.textwrapper}>© 2025 Подорожники</p>
      </div>
    </div>
  );
};

export default AuthProfileEditProvider;
