
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function LoginPage({ setRole }) {
//   const [form, setForm] = useState({ username: "", password: "", role: "", userId: "" });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
   
//     setRole(form.role); // ✅ store role globally

//     if (form.role === "admin") {
//       navigate("/dashboard");
//     } else if (form.role === "user") {
//       navigate(`/account/${form.userId}`);
//     } else {
//       alert("Please select a role");
//     }
// setTimeout(() => {
//     setForm({ username: "", password: "", role: "", userId: "" });
//   }, 0);
//     // Clear form after submit
    
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         <h2 style={styles.title}>🔐 Login to BasicBank</h2>
//         <form onSubmit={handleSubmit} style={styles.form}>
//           <input
//             type="text"
//             name="username"
//             placeholder="Username"
//             value={form.username}
//             onChange={handleChange}
//             style={styles.input}
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//             style={styles.input}
//           />
//           <select name="role" value={form.role} onChange={handleChange} style={styles.select}>
//             <option value="">Select Role</option>
//             <option value="admin">Admin</option>
//             <option value="user">User</option>
//           </select>
//           {form.role === "user" && (
//             <input
//               type="text"
//               name="userId"
//               placeholder="Enter User ID"
//               value={form.userId}
//               onChange={handleChange}
//               style={styles.input}
//             />
//           )}
//           <button type="submit" style={styles.button}>Login</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     backgroundColor: "#f0f4f8",
//     height: "100vh",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   card: {
//     backgroundColor: "#ffffff",
//     padding: "30px",
//     borderRadius: "12px",
//     boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//     width: "350px",
//     textAlign: "center",
//   },
//   title: {
//     marginBottom: "20px",
//     color: "#2c3e50",
//   },
//   form: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "15px",
//   },
//   input: {
//     padding: "10px",
//     borderRadius: "6px",
//     border: "1px solid #ccc",
//     fontSize: "16px",
//   },
//   select: {
//     padding: "10px",
//     borderRadius: "6px",
//     border: "1px solid #ccc",
//     fontSize: "16px",
//     backgroundColor: "#fff",
//   },
//   button: {
//     padding: "12px",
//     borderRadius: "6px",
//     border: "none",
//     backgroundColor: "#3498db",
//     color: "#fff",
//     fontSize: "16px",
//     cursor: "pointer",
//   },
// };

// export default LoginPage;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage({ setRole }) {
  const [form, setForm] = useState({ username: "", password: "", role: "", userId: "" });
  const navigate = useNavigate();

  // ✅ Clear form whenever LoginPage mounts (after logout or fresh visit)
  useEffect(() => {
    setForm({ username: "", password: "", role: "", userId: "" });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setRole(form.role); // store role globally

    if (form.role === "admin") {
      navigate("/dashboard");
    } else if (form.role === "user") {
      navigate(`/account/${form.userId}`);
    } else {
      alert("Please select a role");
    }

    // ✅ Clear form after submit
    setForm({ username: "", password: "", role: "", userId: "" });
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🔐 Login to BasicBank</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            style={styles.input}
          />
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          {form.role === "user" && (
            <input
              type="text"
              name="userId"
              placeholder="Enter User ID"
              value={form.userId}
              onChange={handleChange}
              style={styles.input}
            />
          )}
          <button type="submit" style={styles.button}>Login</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#f0f4f8",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    width: "350px",
    textAlign: "center",
  },
  title: {
    marginBottom: "20px",
    color: "#2c3e50",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  select: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px",
    backgroundColor: "#fff",
  },
  button: {
    padding: "12px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#3498db",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default LoginPage;
