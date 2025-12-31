import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/CreateAccountForm.css";

const CreateAccountForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    accountNumber: "",
    accountHolderName: "",
    balance: 500,
    accountType: "Savings",
  });

  const [error, setError] = useState("");

  // -------------------- VALIDATIONS ------------------------
  const validateForm = () => {
    // 1. Account Number (10 digits only)
    if (!/^[0-9]{10}$/.test(form.accountNumber)) {
      return "Account Number must be exactly 10 digits.";
    }

    // 2. Name (min 3 chars, only letters + space)
    if (!/^[A-Za-z ]{3,}$/.test(form.accountHolderName)) {
      return "Name must be at least 3 characters and contain only letters.";
    }

    // 3. Balance (minimum 500)
    if (form.balance < 500) {
      return "Initial balance must be at least ₹500.";
    }

    // 4. Account Type validation
    if (!["Savings", "Checking"].includes(form.accountType)) {
      return "Invalid account type selected.";
    }

    return ""; // no errors
  };

  // ---------------------------------------------------------

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    // Run validation
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await api.post("/accounts", form);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="card form-card">
      <h2>Create New Account</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={submit} className="vstack">
        <div>
          <label>Account Number</label>
          <input
            className="input"
            name="accountNumber"
            value={form.accountNumber}
            onChange={change}
            required
            
            placeholder="10-digit number"
          />
        </div>

        <div>
          <label>Name</label>
          <input
            className="input"
            name="accountHolderName"
            value={form.accountHolderName}
            onChange={change}
            required
            placeholder="Full name"
          />
        </div>

        <div>
          <label>Initial Balance</label>
          <input
            className="input"
            type="number"
            name="balance"
            value={form.balance}
            onChange={change}
            required
            
          />
        </div>

        <div>
          <label>Account Type</label>
          <select
            className="input"
            name="accountType"
            value={form.accountType}
            onChange={change}
          >
            <option>Savings</option>
            <option>Checking</option>
          </select>
        </div>

        <button className="btn btn-primary" type="submit">
          Create Account
        </button>
      </form>
    </div>
  );
};

export default CreateAccountForm;
