import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const ACICredit = lazy(() => import("./credit/aci"));
const TELCredit = lazy(() => import("./credit/tel"));
const Transaction = lazy(() => import("./credit/transaction"));

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <h1 className="site-header">
          <Link to="/skkm-second/" className="text-white text-decoration-none">
            SK-KM Records
          </Link>
        </h1>
        <nav className="site-nav">
          <Button variant="primary">
            <Link
              to="/skkm-second/credit/aci"
              className="text-white text-decoration-none"
            >
              ACI Credit
            </Link>
          </Button>
          <Button variant="primary">
            <Link
              to="/skkm-second/credit/tel"
              className="text-white text-decoration-none"
            >
              TEL Credit
            </Link>
          </Button>
        </nav>

        <Suspense fallback={<h1>Loading...</h1>}>
          <Routes>
            <Route path="/skkm-second/credit/aci" element={<ACICredit />} />
            <Route path="/skkm-second/credit/tel" element={<TELCredit />} />
            <Route
              path="/skkm-second/transaction/:group/:shop_id"
              Component={Transaction}
            />
            {/* Add more routes for other pages */}
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
