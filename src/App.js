import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, matchPath } from "react-router-dom";
import Header from "headers/header";
import { routes } from "routes/routes";
import SidenavLayout from "sidenavs/sidenavlayout"
import { useDispatch } from "react-redux";
import api from "api/api";
import { setUser } from "./Redux/userSlice";

function Layout() {
  const location = useLocation();
  const dispatch=useDispatch();

  const navigate = useNavigate()
  const unrestricted = ["/",'/signup',"/verify"];
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await api.get("/users/config");
  
        dispatch(setUser(result.data));
      } catch (error) {
        console.error("Failed to fetch user config:", error);
      }
    };

    if (!unrestricted.includes(location.pathname)) {
      fetchUser();
    }
  }, [location.pathname]);

  const shouldShowHeader = routes.some(
    (route) => location.pathname === route.path && route.isHeader
  );

  useEffect(() => {
    const auth = sessionStorage.getItem("auth");
  
    const isUnrestricted = unrestricted.some((path) =>
      matchPath({ path, end: true }, location.pathname)
    );
  
    if (!auth && !isUnrestricted) {
      navigate("/", { replace: true });
    }
  }, [location.pathname, navigate]);
  

  return (
    <div className="App bg-[#F5EFFF] min-h-screen h-auto">
      {shouldShowHeader && <Header />}
      <SidenavLayout>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.component} />
        ))}
      </Routes>
      </SidenavLayout>
    </div>
  );
}

function App() {
  return (
    <Router>      
      <Layout />      
    </Router>
  );
}

export default App;
