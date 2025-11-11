import Link from "next/link";
import css from "./Join.module.css";

export default function Join() {
  return (
    <section className={css.join}>
      <div className="container">
        <div className={css.contentbox}>
          <h2 className={css.title}>Приєднуйтесь до нашої спільноти</h2>
          <p className={css.text}>
            Долучайтеся до мандрівників, які діляться своїми історіями та
            надихають на нові пригоди.
          </p>
          <Link
            className={css.button}
            href="/auth/register"
            aria-label="Register"
          >
            Зареєструватися
          </Link>
        </div>
      </div>
    </section>
  );
}
