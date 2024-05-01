import React from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import ACICredit from "./credit/aci";
import Button from "react-bootstrap/Button";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import TELCredit from "./credit/tel";
import Transaction from "./credit/transaction";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <h1 className="site-header">SK-KM Records</h1>
        <nav className="site-nav">
          <Button variant="primary">
            <Link to="/skkm-second/credit/aci" className="text-white text-decoration-none">
              ACI Credit
            </Link>
          </Button>
          <Button variant="primary">
            <Link to="/skkm-second/credit/tel" className="text-white text-decoration-none">
              TEL Credit
            </Link>
          </Button>
        </nav>

        <Routes>
          <Route path="/skkm-second/credit/aci" element={<ACICredit />} />
          <Route path="/skkm-second/credit/tel" element={<TELCredit />} />
          <Route
            path="/skkm-second/transaction/:group/:shop_id"
            element={<Transaction />}
          />
          {/* Add more routes for other pages */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
