import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ReactNode } from "react";
import { RootState } from "../store";

type Props = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const { user } = useSelector((store: RootState) => store.user);

  if (!user) {
    return <Navigate to="/landing" />;
  }

  return children;
};

export default ProtectedRoute;
