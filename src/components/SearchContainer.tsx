import Wrapper from "../assets/wrappers/SearchContainer";
import { FormRow, FormRowSelect } from ".";
import { useSelector, useDispatch } from "react-redux";
import { handleChange, clearFilters } from "../features/allJobs/allJobsSlice";
import { useState, useMemo } from "react";
import { AppDispatch, RootState } from "../store";
import { SearchRowNames } from "../utils/types";

const SearchContainer = () => {
  const [localSearch, setLocalSearch] = useState("");

  const { isLoading, searchStatus, searchType, sort, sortOptions } =
    useSelector((store: RootState) => store.allJobs);

  const { jobTypeOptions, statusOptions } = useSelector(
    (store: RootState) => store.job
  );

  const dispatch = useDispatch<AppDispatch>();

  const handleSearch = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;

    dispatch(
      handleChange({ name: target.name as SearchRowNames, value: target.value })
    );
  };

  const debounce = () => {
    let timeoutID: NodeJS.Timeout;

    return (e: React.ChangeEvent) => {
      const target = e.target as HTMLInputElement;

      setLocalSearch(target.value);
      clearTimeout(timeoutID);

      timeoutID = setTimeout(() => {
        dispatch(
          handleChange({
            name: target.name as SearchRowNames,
            value: target.value,
          })
        );
      }, 1000);
    };
  };

  const optimizedDebounce = useMemo(() => debounce(), []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalSearch("");
    dispatch(clearFilters());
  };

  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name={SearchRowNames.search}
            value={localSearch}
            handleChange={optimizedDebounce}
          />
          <FormRowSelect
            labelText="status"
            name={SearchRowNames.searchStatus}
            value={searchStatus}
            handleChange={handleSearch}
            list={["all", ...statusOptions]}
          />
          <FormRowSelect
            labelText="type"
            name={SearchRowNames.searchType}
            value={searchType}
            handleChange={handleSearch}
            list={["all", ...jobTypeOptions]}
          />
          <FormRowSelect
            name={SearchRowNames.sort}
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />
          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
