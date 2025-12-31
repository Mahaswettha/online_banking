import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import DepositForm from "./DepositForm";
import TransferForm from "./TransferForm";
import TransactionHistory from "./TransactionHistory";
import "../styles/AccountDetails.css";

const AccountDetails = () => {
  const { id } = useParams();
  const [account, setAccount] = useState(null);

  const fetchAccount = async () => {
    try {
      const res = await api.get(`/accounts/${id}`);
      setAccount(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAccount();
  }, [id]);

  if (!account) return <div className="card">Loading...</div>;

  return (
    <div className="details-layout">
      <div>
        <div className="card">
          <h2>{account.accountHolderName}</h2>
          <p className="small">Account Number :{account.accountNumber}</p>
          <h3>₹{account.balance}</h3>
          <p className="small">{account.accountType}</p>
        </div>

        <div className="section">
          <h3>Transaction History</h3>
          <TransactionHistory accountId={account.accountId} />
        </div>
      </div>

      <aside>
        <div className="card">
          <h3>Deposit</h3>
          <DepositForm accountId={account.accountId} onSuccess={fetchAccount} />
        </div>

        <div className="card">
          <h3>Transfer</h3>
          <TransferForm fromAccountId={account.accountId} onSuccess={fetchAccount} />
        </div>
      </aside>
    </div>
  );
};

export default AccountDetails;

