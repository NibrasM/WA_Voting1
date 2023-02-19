import { useTable } from "react-table";
import { useState, useEffect } from "react";
import "./Admin.css";
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
    <div className="admin-page">
      <div className="stats-div">
        <h1>Total Votes= {total} </h1>
        <h1>Stats= {stats}% </h1>
      </div>
      <table className="data-table">
        <tr className="table-header">
          <th>Name</th>
          <th>Email</th>
          <th>Did Vote</th>
        </tr>
        {usersData.map((val) => {
          return val.isVoted ? (
            <tr key={val.name}>
              <td className="isVoted">{val.name}</td>
              <td className="isVoted">{val.email}</td>
              <td className="isVoted">{val.isVoted.toString()}</td>
            </tr>
          ) : (
            <tr>
              <td className="notVoted">{val.name}</td>
              <td className="notVoted">{val.email}</td>
              <td className="notVoted">{val.isVoted.toString()}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
