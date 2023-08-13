import Wrapper from "../assets/wrappers/JobInfo";

type Props = {
  text: string;
  icon: JSX.Element;
};

const JobInfo = ({ icon, text }: Props) => {
  return (
    <Wrapper>
      <span className="icon">{icon}</span>
      <span className="text">{text} </span>
    </Wrapper>
  );
};
export default JobInfo;
