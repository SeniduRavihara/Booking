import { Navigate, Outlet } from "react-router-dom";

const RootLayout = () => {
  const token = localStorage.getItem("token");

  return token ? <Outlet /> : <Navigate to="/login" />;
};
export default RootLayout;
