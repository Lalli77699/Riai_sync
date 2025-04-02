import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "headers/header";
import { routes } from "routes/routes";
import SidenavLayout from "sidenavs/sidenavlayout";

function Layout() {
  const location = useLocation();

  const shouldShowHeader = routes.some(route => 
    location.pathname === route.path && route.isHeader
  );

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
