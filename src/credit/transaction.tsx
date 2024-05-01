import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useParams } from "react-router-dom";

type RouteParams = {
  group?: string;
  shop_id?: string;
};

function showNote(params: string) {
  if (params == "") {
    return "";
  } else {
    return (
      <>
        <br />
        <small>{params}</small>
      </>
    );
  }
}

const Transaction: React.FC = () => {
  var currentBalance = 0;
  const [jsonData, setJsonData] = useState<any[]>([]);
  const { group, shop_id } = useParams<RouteParams>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { default: data } = await import(
          `../../data/credit-${group}.json`
        );
        setJsonData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [group]);

  const filtered = jsonData.filter((entry) => entry.shop_id == shop_id);
  const name = filtered[0]?.name;

  function balance(params: any) {
    var entry = params;
    currentBalance =
      currentBalance +
      entry.invoice -
      entry.payment -
      entry.return -
      entry.comm +
      entry.carried;
    return currentBalance;
  }

  return (
    <div>
      <h2 className="text-center">
        {name} <span className="h4">&lt;ID: {shop_id}&gt;</span>{" "}
        {group?.toUpperCase()}
      </h2>
      <Table striped bordered hover>
        <thead>
          <tr className="text-center">
            <th className="fs-tiny">Date</th>
            <th className="fs-tiny">Invoice</th>
            <th className="fs-tiny">Payment</th>
            <th className="fs-tiny">Return</th>
            <th className="fs-tiny">Commission</th>
            <th className="fs-tiny">Adjustment</th>
            <th className="fs-tiny">Balance</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((entry, index) => (
            <tr className="text-center" key={`${index}`}>
              <td>
                {entry.date}
                {showNote(entry.note)}
              </td>
              <td>
                {entry.invoice === 0 ? "-" : entry.invoice.toLocaleString()}
              </td>
              <td>
                {entry.payment === 0 ? "-" : entry.payment.toLocaleString()}
              </td>
              <td>
                {entry.return === 0 ? "-" : entry.return.toLocaleString()}
              </td>
              <td>{entry.comm === 0 ? "-" : entry.comm.toLocaleString()}</td>
              <td>
                {entry.carried === 0 ? "-" : entry.carried.toLocaleString()}
              </td>
              <td>
                {(() => {
                  var dayBalance = balance(entry);

                  return dayBalance === 0 ? "-" : dayBalance.toLocaleString();
                })()}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Transaction;
