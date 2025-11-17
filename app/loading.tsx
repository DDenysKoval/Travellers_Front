import css from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={css.loading}>
      <p>Завантаження, зачекайте будь-ласка...</p>
    </div>
  );
};
export default Loading;
