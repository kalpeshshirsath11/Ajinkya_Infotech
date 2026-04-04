import { useState } from "react";
import api from "../api/axios";

const RegisterUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    Role: "USER", // capital R
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.mobileNumber) {
      return "All fields are required";
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      return "Invalid email format";
    }
    if (!/^[0-9]{10}$/.test(formData.mobileNumber)) {
      return "Mobile must be 10 digits";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/admin/register", formData);
      setMessage(res.data);

      // Reset form
      setFormData({
        name: "",
        email: "",
        mobileNumber: "",
        Role: "USER",
      });
    } catch (err) {
      setError(
        err.response?.data || "Failed to create user. Check admin access."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Register New User</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="text"
            name="mobileNumber"
            placeholder="Mobile Number"
            value={formData.mobileNumber}
            onChange={handleChange}
            style={styles.input}
          />

          <select
            name="Role"
            value={formData.Role}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Creating..." : "Create User"}
          </button>
        </form>

        {message && <p style={styles.success}>{message}</p>}
        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

// 🔹 Simple Styling
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f4f6f8",
  },
  card: {
    padding: "30px",
    borderRadius: "10px",
    background: "#fff",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    width: "350px",
  },
  title: {
    marginBottom: "20px",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  success: {
    color: "green",
    marginTop: "10px",
    textAlign: "center",
  },
  error: {
    color: "red",
    marginTop: "10px",
    textAlign: "center",
  },
};

export default RegisterUser;