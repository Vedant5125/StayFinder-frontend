import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RedirectHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const user = userData ? JSON.parse(userData) : null;
    const path = location.pathname;

    const isPublicRoute =
      path === "/" ||
      path === "/logreg" ||
      path.startsWith("/listings/") ||
      path.startsWith("/book/");

    const isHostOnlyRoute = path === "/Host" || path === "/Hostform";

    if (!user && !isPublicRoute) {
      navigate("/logreg");
    } else if (user) {
      if (isHostOnlyRoute && user.role !== "host") {
        navigate("/");
      }

      //redirect host to /Host if on home
      if (path === "/" && user.role === "host") {
        navigate("/Host");
      }

      //redirect normal user to home if they manually try to access /Host
      if (path === "/Host" && user.role === "user") {
        navigate("/");
      }
    }
  }, [location, navigate]);

  return null;
};

export default RedirectHandler;
