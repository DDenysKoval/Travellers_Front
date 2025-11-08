import css from "./LayoutStories.module.css";

interface Props {
  children: React.ReactNode;
}

const StoriesLayout = ({ children }: Props) => {
  return <section>{children}</section>;
};
export default StoriesLayout;
