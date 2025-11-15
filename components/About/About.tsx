import css from "./About.module.css";

export default function About() {
  return (
    <section className={css.about}>
      <div className="container">
        <div className={css.contentbox}>
          <div className={css.textbox}>
            <h2 className={css.title}>
              Проєкт, створений для тих, хто живе подорожами
            </h2>
            <p className={css.text}>
              Ми віримо, що кожна подорож — це унікальна історія, варта того,
              щоб нею поділилися. Наша платформа створена, щоб об&apos;єднати
              людей, закоханих у відкриття нового. Тут ви можете ділитися
              власним досвідом, знаходити друзів та надихатися на наступні
              пригоди разом з нами.
            </p>
          </div>
          <ul className={css.list}>
            <li className={css.listitem}>
              <svg className={css.iconwrap} width="48" height="48">
                <use href="/icons.svg#icon-wand_stars"></use>
              </svg>
              <h3 className={css.subtitle}>Наша місія</h3>
              <p className={css.listitemtext}>
                Об&apos;єднувати людей через любов до пригод та надихати на нові
                відкриття.
              </p>
            </li>
            <li className={css.listitem}>
              <svg className={css.iconwrap} width="48" height="48">
                <use href="/icons.svg#icon-travel_luggage_and_bags"></use>
              </svg>
              <h3 className={css.subtitle}>Автентичні історії</h3>
              <p className={css.listitemtext}>
                Ми цінуємо справжні, нередаговані враження від мандрівників з
                усього світу.
              </p>
            </li>
            <li className={css.listitem}>
              <svg className={css.iconwrap} width="48" height="48">
                <use href="/icons.svg#icon-communication"></use>
              </svg>
              <h3 className={css.subtitle}>Ваша спільнота</h3>
              <p className={css.listitemtext}>
                Станьте частиною спільноти, де кожен може бути і автором, і
                читачем.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
