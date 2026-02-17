import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "",
    tAndC: false,
  });
  const [formStep, setFormStep] = useState(0);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  function handleNextButton(e) {
    e.preventDefault();
    setFormStep(1);
  }

  function handleSubmitButton() {
    setIsFormSubmitted(true);
  }

  if (isFormSubmitted) {
    return (
      <div>
        <h1>Form submitted successfully!</h1>
        <ui>
          <ul>Full Name: {formData.fullName}</ul>
          <ul>Email: {formData.email}</ul>
          <ul>Role: {formData.role}</ul>
          <ul>Terms and Conditions: {formData.tAndC ? "Yes" : "No"}</ul>
        </ui>
      </div>
    );
  }

  if (formStep === 0) {
    return (
      <form>
        <input
          onChange={(e) =>
            setFormData({ ...formData, fullName: e.target.value })
          }
          type="text"
          placeholder="Full name"
          value={formData.fullName}
        ></input>
        <input
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          type="text"
          placeholder="Email address"
          value={formData.email}
        ></input>
        <input
          onClick={(e) => handleNextButton(e)}
          disabled={!formData.email || !formData.fullName}
          type="submit"
          value="Next"
        ></input>
      </form>
    );
  }

  return (
    <form>
      <select
        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        value={formData.role}
      >
        <option value="">Select role</option>
        <option value="Developer">Developer</option>
        <option value="Designer">Designer</option>
        <option value="Manager">Manager</option>
      </select>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          cursor: "pointer",
        }}
      >
        <input
          type="checkbox"
          onChange={(e) =>
            setFormData({ ...formData, tAndC: e.target.checked })
          }
          checked={formData.tAndC}
        ></input>
        <label
          style={{
            cursor: "pointer",
          }}
          onClick={(e) => setFormData({ ...formData, tAndC: !formData.tAndC })}
        >
          Accept Terms & Conditions
        </label>
      </div>
      <input
        onClick={(e) => {
          e.preventDefault();
          setFormStep(0);
        }}
        type="submit"
        value="Back"
      ></input>
      <input
        onClick={handleSubmitButton}
        disabled={!formData.role || !formData.tAndC}
        type="submit"
        value="Submit"
      ></input>
    </form>
  );
}
