
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import api from "../services/api";
// import "../styles/AccountDashboard.css";

// const AccountDashboard = () => {
//   const [accounts, setAccounts] = useState([]);
//   const [filter, setFilter] = useState("All"); // Filter state

//   useEffect(() => {
//     fetchAccounts();
//   }, []);

//   const fetchAccounts = async () => {
//     try {
//       const res = await api.get("/accounts");
//       setAccounts(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const filteredAccounts = accounts.filter(
//     (acc) => filter === "All" || acc.accountType === filter
//   );

//   return (
//     <div>
//       <div className="dash-header">
//         <h1>Account Dashboard</h1>
//         <Link to="/create">
//           <button className="btn btn-primary">+ Create Account</button>
//         </Link>
//       </div>

//       {/* Filter Dropdown */}
//       <div className="filter-container">
//         <label>Filter by Account Type: </label>
//         <select value={filter} onChange={(e) => setFilter(e.target.value)}>
//           <option value="All">All</option>
//           <option value="Savings">Savings</option>
//           <option value="Checking">Checking</option>
//         </select>
//       </div>

//       <div className="account-grid">
//         {filteredAccounts.map((acc) => (
//           <div className="card" key={acc.accountId}>
//             <h3>{acc.accountHolderName}</h3>
//             <p className="small">Account Number: {acc.accountNumber}</p>
//             <div className="balance">₹{acc.balance}</div>
//             <p className="small">{acc.accountType}</p>
//             <Link to={`/account/${acc.accountId}`}>
//               <button className="btn btn-primary">View Details</button>
//             </Link>
//           </div>
//         ))}

//         {filteredAccounts.length === 0 && (
//           <div className="card small">No accounts found.</div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AccountDashboard;
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "../styles/AccountDashboard.css";

const AccountDashboard = () => {
  const [accounts, setAccounts] = useState([]);
  const [filter, setFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("None"); // Sorting
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4;

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const res = await api.get("/accounts");
      setAccounts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Filter
  const filteredAccounts = accounts.filter(
    (acc) => filter === "All" || acc.accountType === filter
  );

  // Sort
  const sortedAccounts = [...filteredAccounts].sort((a, b) => {
    if (sortOrder === "A-Z")
      return a.accountHolderName.localeCompare(b.accountHolderName);
    if (sortOrder === "Z-A")
      return b.accountHolderName.localeCompare(a.accountHolderName);
    return 0;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAccounts = sortedAccounts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedAccounts.length / itemsPerPage);

  return (
    <div>
      <div className="dash-header">
        <h1>Account Dashboard</h1>
        <Link to="/create">
          <button className="btn btn-primary">+ Create Account</button>
        </Link>
      </div>

      {/* Filter Dropdown */}
      <div className="filter-container">
        <label>Filter by Account Type: </label>
        <select
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="All">All</option>
          <option value="Savings">Savings</option>
          <option value="Checking">Checking</option>
        </select>
      </div>

      {/* Sorting Dropdown */}
      <div className="sort-container">
        <label>Sort by Name: </label>
        <select
          value={sortOrder}
          onChange={(e) => {
            setSortOrder(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="None">None</option>
          <option value="A-Z">A → Z</option>
          <option value="Z-A">Z → A</option>
        </select>
      </div>
<br />
      <div className="account-grid">
        {currentAccounts.map((acc) => (
          <div className="card" key={acc.accountId}>
            <h3>{acc.accountHolderName}</h3>
            <p className="small">Account Number: {acc.accountNumber}</p>
            <p className="small">accountId: {acc.accountId}</p>
            <div className="balance">₹{acc.balance}</div>
            <p className="small">{acc.accountType}</p>
              
            <Link to={`/account/${acc.accountId}`}>
              <button className="btn btn-primary">View Details</button>
            </Link>
          </div>
        ))}

        {currentAccounts.length === 0 && (
          <div className="card small">No accounts found.</div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx + 1}
              className={currentPage === idx + 1 ? "active" : ""}
              onClick={() => setCurrentPage(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountDashboard;
