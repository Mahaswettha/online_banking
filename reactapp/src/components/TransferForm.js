import React, { useState } from "react";
import api from "../services/api";
import "../styles/TransferForm.css";

const TransferForm = ({ fromAccountId, onSuccess }) => {
  const [toAccountId, setToAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      await api.post("/transactions/transfer", {
        fromAccountId,
        toAccountId: parseInt(toAccountId),
        amount: parseFloat(amount),
        description,
      });

      setMsg("Transfer successful!");
      setToAccountId("");
      setAmount("");
      setDescription("");
      onSuccess();
    } catch (err) {
      setMsg(err.response?.data?.message || err.message);
    }
  };

  return (
    <form className="vstack" onSubmit={submit}>
      {msg && <p>{msg}</p>}

      <div>
        <label>Recipient Account ID</label>
        <input className="input" type="number" value={toAccountId} onChange={(e) => setToAccountId(e.target.value)} required />
      </div>

      <div>
        <label>Amount</label>
        <input className="input" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
      </div>

      <div>
        <label>Description</label>
        <input className="input" value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>

      <button className="btn btn-primary">Transfer</button>
    </form>
  );
};

export default TransferForm;
