export type User = {
  name: string;
  email: string;
  password: string;
};

export type CreatedUser = {
  name: string;
  lastName: string;
  email: string;
  token: string;
  location: string;
};

export type NewUser = Omit<CreatedUser, "token">;

export type Job = Record<RowNames, string>;

export type CreatedJob = Job & {
  _id: string;
  createdAt: string;
};

export type EditedJob = Omit<CreatedJob, "_id" | "createdAt"> & {
  editJobId: string;
};

export enum RowNames {
  position = "position",
  company = "company",
  status = "status",
  jobLocation = "jobLocation",
  jobType = "jobType",
}

export enum SearchRowNames {
  searchStatus = "searchStatus",
  searchType = "searchType",
  sort = "sort",
  search = "search",
}

export type Stats = {
  pending: number;
  interview: number;
  declined: number;
};

export type MonthlyApplication = { date: string; count: number };
