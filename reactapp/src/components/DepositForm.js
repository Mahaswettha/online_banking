import React, { useState } from "react";
import api from "../services/api";
import "../styles/DepositForm.css";

const DepositForm = ({ accountId, onSuccess }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      await api.post("/transactions/deposit", {
        accountId,
        amount: parseFloat(amount),
        description,
      });

      setMsg("Deposit successful!");
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
        <label>Amount</label>
        <input className="input" type="number" min="1" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </div>

      <div>
        <label>Description</label>
        <input className="input" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <button className="btn btn-primary">Deposit</button>
    </form>
  );
};

export default DepositForm;

