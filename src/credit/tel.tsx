import React from "react";
import creditData from "../../data/credit-tel.json";
import Credit from "../credit/credit";

const TELCredit: React.FC = () => {
  return (
    <div>
      <Credit data={creditData} group="tel" sr="Tarek" />
    </div>
  );
};

export default TELCredit;
