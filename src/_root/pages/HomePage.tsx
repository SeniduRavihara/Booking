import { Button } from "@/components/ui/button";
import { logout } from "@/firebase/api";
import { paymentGateWay } from "@/lib/payhere";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div>HomePage</div>

      <Button className="bg-blue-600" onClick={paymentGateWay}>
        payHere
      </Button>

      <Button className="mt-20" onClick={logoutUser}>
        Logout
      </Button>
    </div>
  );
};
export default HomePage;
