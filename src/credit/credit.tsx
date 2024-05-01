import React from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

interface Transaction {
  name: string;
  sr: string;
  t_balance: number;
  shop_id: number;
  date: string;
}

interface CreditProps {
  data: Transaction[];
  group: string;
}

const Credit: React.FC<CreditProps> = ({ data, group }) => {
  const filteredCustomerBalances = data
    .filter((entry) => entry.sr == "Tarek" || entry.sr == "Azizul")
    .reduce((acc: Transaction[], entry) => {
      const existingEntryIndex = acc.findIndex(
        (e) =>
          e.name === entry.name &&
          e.sr === entry.sr &&
          e.shop_id === entry.shop_id
      );

      if (existingEntryIndex !== -1) {
        if (entry.date > acc[existingEntryIndex].date) {
          acc[existingEntryIndex] = entry;
        }
      } else {
        acc.push(entry);
      }

      return acc;
    }, [])
    .filter((entry) => entry.t_balance !== 0)
    .sort((a, b) => {
      if (a.name !== b.name) {
        return extractArea(a.name).localeCompare(extractArea(b.name));
      } else {
        return a.name.localeCompare(b.name);
      }
    });

  let grandTotalSum = 0;
  filteredCustomerBalances.forEach((entry) => {
    grandTotalSum += entry.t_balance;
  });

  // function sortByAreaAndName(
  //   a: [{ name: string; shop_id: number }, Map<string, number>],
  //   b: [{ name: string; shop_id: number }, Map<string, number>]
  // ) {
  //   const areaA = extractArea(a[0].name);
  //   const areaB = extractArea(b[0].name);

  //   if (areaA !== areaB) {
  //     return areaA.localeCompare(areaB);
  //   }
  //   return a[0].name.localeCompare(b[0].name);
  // }

  // const sortedCustomerBalances =
  //   filteredCustomerBalances.sort(sortByAreaAndName);

  function extractArea(key: string): string {
    const match = key.match(/\[(.*?)\]/);
    return match ? match[1] : "";
  }

  // Function to extract name from the key
  function extractName(key: string): string {
    return key.split("[")[0].trim();
  }

  function balanceFormatting(key: number): string {
    if (key < 0) {
      return "fw-bold";
    } else {
      return "";
    }
  }

  // function getShopIdFromKey(key: string): string {
  //   // Assuming shop_id is the text within the square brackets
  //   const match = key.match(/\[(.*?)\]/);
  //   return match ? match[1] : "";
  // }

  function loadTable() {
    return (
      <Table striped bordered hover className="credit-table">
        <thead>
          <tr className="text-center">
            <th>Area</th>
            <th>Shop</th>
            <th>SR</th>
            <th>Total Balance</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomerBalances.map((entry, index) => (
            <tr className="text-center" key={`${index}`}>
              <td>{extractArea(entry.name)}</td>
              <td>
                <Link
                  to={`/transaction/${group}/${entry.shop_id}`}
                  className="shop-link"
                >
                  {extractName(entry.name)}
                </Link>
              </td>
              <td>{entry.sr}</td>
              <td className={`${balanceFormatting(entry.t_balance)} text-end`}>
                {entry.t_balance.toLocaleString()}
              </td>
              <td className="text-center">{entry.date.toString()}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3}>
              <strong>
                Grand Total ({filteredCustomerBalances.length} shops)
              </strong>
            </td>
            <td className="text-end">
              <strong>{grandTotalSum.toLocaleString()}</strong>
            </td>
            <td></td>
          </tr>
        </tfoot>
      </Table>
    );
  }
  return <div>{loadTable()}</div>;
};

export default Credit;
