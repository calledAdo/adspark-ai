import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Index() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/advertiser/onboard", { replace: true });
  }, [navigate]);
  return null;
}
