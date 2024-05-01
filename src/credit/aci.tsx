import React from "react";
import creditData from "../../data/credit-aci.json";
import Credit from "../credit/credit";

const ACICredit: React.FC = () => {
  return (
    <div>
      <h2 className="page-header">ACI Credit</h2>
      <Credit data={creditData} group="aci" />
    </div>
  );
};

export default ACICredit;
