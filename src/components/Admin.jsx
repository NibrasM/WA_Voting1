import { useTable } from "react-table";
import { useState, useEffect } from "react";

export default function Admin() {
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("users");
    if (storedData) {
      setUsersData(JSON.parse(storedData));
    }
  }, []);

  let total = 0;
  let stats = 0;
  usersData.forEach((element) => {
    if (element.isVoted) {
      total++;
    }
  });
  stats = (total / usersData.length) * 100;
  stats = Math.round(stats * 10) / 10;
  console.log(total);

  return (
    <div className="App">
      <h1>Total Votes= {total} </h1>
      <h1>Stats= {stats}% </h1>

      {/* <table>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Did Vote</th>
        </tr>
        {usersData.map((val) => {
          return val.isVoted ? (
            <tr key={val.name}>
              <td style={{ color: "green" }}>{val.name}</td>
              <td style={{ color: "green" }}>{val.email}</td>
              <td style={{ color: "green" }}>{val.isVoted.toString()}</td>
            </tr>
          ) : (
            <tr>
              <td style={{ color: "red" }}>{val.name}</td>
              <td style={{ color: "red" }}>{val.email}</td>
              <td style={{ color: "red" }}>{val.isVoted.toString()}</td>
            </tr>
          );
        })}
      </table> */}
    </div>
  );
}
