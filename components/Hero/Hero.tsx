import Link from "next/link";
import css from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={css.hero}>
      <div className="container">
        <div className={css.contentbox}>
          <h1 className={css.title}>Відкрийте світ подорожей з нами!</h1>
          <p className={css.text}>
            Приєднуйтесь до нашої спільноти мандрівників, де ви зможете ділитися
            своїми історіями та отримувати натхнення для нових пригод. Відкрийте
            для себе нові місця та знайдіть однодумців!
          </p>
          <Link
            className={css.button}
            href="/auth/register"
            aria-label="Register"
          >
            Доєднатись
          </Link>
        </div>
      </div>
    </section>
  );
}
