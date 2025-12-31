import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/TransactionHistory.css";

const TransactionHistory = ({ accountId }) => {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const res = await api.get(`/transactions/account/${accountId}`);
      setTransactions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [accountId]);

  if (transactions.length === 0)
    return <p className="small">No transactions available.</p>;

  return (
    <table className="transactions-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Type</th>
          <th>Amount</th>
          <th>Description</th>
          <th>Date</th>
          <th>Recipient</th>
        </tr>
      </thead>

      <tbody>
        {transactions.map((tx) => (
          <tr key={tx.transactionId}>
            <td>{tx.transactionId}</td>
            <td>{tx.transactionType}</td>
            <td className={tx.transactionType === "DEPOSIT" ? "amount-plus" : "amount-minus"}>
              {tx.transactionType === "DEPOSIT" ? `+₹${tx.amount}` : `-₹${tx.amount}`}
            </td>
            <td>{tx.description}</td>
            <td>{new Date(tx.transactionDate).toLocaleString()}</td>
            <td>{tx.recipientAccountId || "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionHistory;
