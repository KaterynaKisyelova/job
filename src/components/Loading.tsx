type Props = {
  center?: boolean;
};

const Loading = ({ center }: Props) => {
  return <div className={center ? "loading loading-center" : "loading"}></div>;
};

export default Loading;
