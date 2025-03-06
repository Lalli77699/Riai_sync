import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "headers/header";
import { routes } from "routes/routes";

function App() {
  const shouldShowHeader = routes.some(route => 
    window.location.pathname === route.path && route.isHeader
  );

  return (
    <Router>
      <div className="App bg-slate-50 min-h-screen">
        {shouldShowHeader && <Header />}

        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.component} />
          ))}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
