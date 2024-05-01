import React from "react";
import creditData from "../../data/credit-tel.json";
import Credit from "../credit/credit";

const TELCredit: React.FC = () => {
  return (
    <div>
      <h2 className="page-header">TEL Credit</h2>
      <Credit data={creditData} group="tel" />
    </div>
  );
};

export default TELCredit;
