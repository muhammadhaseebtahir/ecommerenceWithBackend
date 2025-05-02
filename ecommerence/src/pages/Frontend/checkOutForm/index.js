import { Button } from "antd";
import { useState } from "react";

export default  function CheckoutForm() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    paymentMethod: "cash",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.fullName || !form.email || !form.phone || !form.address || !form.city || !form.zip) {
      setError("Please fill in all required fields.");
      return;
    }

    console.log("Order submitted:", form);
    setSubmitted(true);
    setForm({
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      zip: "",
      paymentMethod: "cash",
      notes: "",
    });
    setError("");
  };

  const containerStyle = {
    maxWidth: "700px",
    margin: "40px auto",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 0 20px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
  };

  return (
    <div style={containerStyle}>
      <h2 className="text-center mb-4">🛒 Checkout</h2>

      {submitted ? (
        <div className="alert alert-success text-center">
          ✅ Order placed successfully!
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="fullName"
                className="form-control"
                value={form.fullName}
                onChange={handleChange}
                placeholder="John Doe"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={form.email}
                onChange={handleChange}
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Phone</label>
              <input
                type="tel"
                name="phone"
                className="form-control"
                value={form.phone}
                onChange={handleChange}
                placeholder="03XXXXXXXXX"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">City</label>
              <input
                type="text"
                name="city"
                className="form-control"
                value={form.city}
                onChange={handleChange}
                placeholder="Lahore, Karachi..."
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-8">
              <label className="form-label">Address</label>
              <input
                type="text"
                name="address"
                className="form-control"
                value={form.address}
                onChange={handleChange}
                placeholder="Street address..."
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">ZIP Code</label>
              <input
                type="text"
                name="zip"
                className="form-control"
                value={form.zip}
                onChange={handleChange}
                placeholder="54000"
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Order Notes (optional)</label>
            <textarea
              name="notes"
              className="form-control"
              rows="3"
              value={form.notes}
              onChange={handleChange}
              placeholder="Add any delivery notes here..."
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Payment Method</label>
            <select
              name="paymentMethod"
              className="form-select"
              value={form.paymentMethod}
              onChange={handleChange}
            >
              <option value="cash">Cash on Delivery</option>
              <option value="card">Credit/Debit Card</option>
              <option value="easypaisa">Easypaisa</option>
            </select>
          </div>

          <Button htmlType="submit" loading={isLoading} className="bg-dark text-light w-100">
            Confirm Order
          </Button>
        </form>
      )}
    </div>
  );
}

;
