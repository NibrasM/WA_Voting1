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
    console.log(storedData);
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

  return (
    <div className="admin-page">
      <div className="stats-div">
        <h3>Total Votes= {total} </h3>
        <h3>Stats= {stats}% </h3>
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
