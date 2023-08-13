import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { FormRow, FormRowSelect } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useEffect } from "react";
import {
  handleChange,
  clearValues,
  createJob,
  editJob,
} from "../../features/job/jobSlice";
import { AppDispatch, RootState } from "../../store";
import { RowNames } from "../../utils/types";

const AddJob = () => {
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    isEditing,
    editJobId,
  } = useSelector((store: RootState) => store.job);
  const { user } = useSelector((store: RootState) => store.user);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!position || !company || !jobLocation) {
      toast.error("Please fill out all fields");
      
      return;
    }
    if (isEditing) {
      dispatch(
        editJob({
          jobId: editJobId,
          job: { position, company, jobLocation, jobType, status },
        })
      );

      return;
    }

    dispatch(createJob({ position, company, jobLocation, jobType, status }));
  };

  const handleJobInput = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const name = target.name as RowNames;
    const value = target.value;

    dispatch(handleChange({ name, value }));
  };

  useEffect(() => {
    if (!isEditing && user?.location) {
      dispatch(
        handleChange({
          name: RowNames.jobLocation,
          value: user.location,
        })
      );
    }
  }, []);

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "edit job" : "add job"}</h3>
        <div className="form-center">
          <FormRow
            type="text"
            name={RowNames.position}
            value={position}
            handleChange={handleJobInput}
          />
          <FormRow
            type="text"
            name={RowNames.company}
            value={company}
            handleChange={handleJobInput}
          />
          <FormRow
            type="text"
            name={RowNames.jobLocation}
            labelText="job location"
            value={jobLocation}
            handleChange={handleJobInput}
          />
          <FormRowSelect
            name={RowNames.status}
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          />
          <FormRowSelect
            name={RowNames.jobType}
            labelText="job type"
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions}
          />
          <div className="btn-container">
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={() => dispatch(clearValues())}
            >
              clear
            </button>
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
