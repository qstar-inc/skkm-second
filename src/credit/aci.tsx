import React from "react";
import creditData from "../../data/credit-aci.json";
import Credit from "../credit/credit";

const ACICredit: React.FC = () => {
  return (
    <div>
      <Credit data={creditData} group="aci" sr="Azizul" />
    </div>
  );
};

export default ACICredit;
