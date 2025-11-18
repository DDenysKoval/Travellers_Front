import { SyncLoader } from "react-spinners";

const Loading = () => {
  return (
    <SyncLoader
      color="#000000"
      loading={true}
      cssOverride={{
        display: "flex",
        justifyContent: "center",
        margin: "20px auto",
        opacity: "0.3",
      }}
      size={10}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};
export default Loading;
