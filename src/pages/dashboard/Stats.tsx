import { useEffect } from "react";
import { StatsContainer, ChartsContainer } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { showStats } from "../../features/allJobs/allJobsSlice";
import { AppDispatch, RootState } from "../../store";

const Stats = () => {
  const { monthlyApplications } = useSelector(
    (store: RootState) => store.allJobs
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(showStats());
  }, []);

  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
};
export default Stats;
