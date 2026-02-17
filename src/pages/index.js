import { useEffect, useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "",
    tAndC: false,
  });
  const [formStep, setFormStep] = useState(0);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [formFields, setFormFields] = useState([
    [
      {
        placeholder: "Full name",
        type: "text",
        value: "fullName",
      },
      {
        placeholder: "Email address",
        type: "text",
        value: "email",
      },
    ],
    [
      {
        placeholder: "Select role",
        type: "select",
        value: "role",
        options: ["Select role", "Developer", "Designer", "Manager"],
      },
      {
        placeholder: "Accept Terms & Conditions",
        type: "checkbox",
        value: "tAndC",
      },
    ],
  ]);

  function handleNextButton(e) {
    e.preventDefault();
    setFormStep(1);
  }

  function handleSubmitButton() {
    setIsFormSubmitted(true);
  }

  if (isFormSubmitted) {
    return (
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          textAlign:'center'
        }}
      >
        <h2>Form submitted successfully!</h2>
        <ui>
          <ul>Full Name: {formData.fullName}</ul>
          <ul>Email: {formData.email}</ul>
          <ul>Role: {formData.role}</ul>
          <ul>Terms and Conditions: {formData.tAndC ? "Yes" : "No"}</ul>
        </ui>
      </div>
    );
  }

  return (
    <form>
      {formFields[formStep].map((field) => {
        if (field.type === "text") {
          return (
            <input
              key={field.value}
              type="text"
              placeholder={field.placeholder}
              onChange={(e) =>
                setFormData({ ...formData, [field.value]: e.target.value })
              }
              value={formData[field.value]}
            ></input>
          );
        }
        if (field.type === "select") {
          return (
            <select
              key={field.value}
              onChange={(e) =>
                setFormData({ ...formData, [field.value]: e.target.value })
              }
              value={formData[field.value]}
            >
              {field.options.map((option) => (
                <option
                  key={option}
                  value={option === "Select role" ? "" : option}
                >
                  {option}
                </option>
              ))}
            </select>
          );
        }
        if (field.type === "checkbox") {
          return (
            <div
              key={field.value}
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
                  setFormData({ ...formData, [field.value]: e.target.checked })
                }
                checked={formData[field.value]}
              ></input>
              <label
                style={{
                  cursor: "pointer",
                }}
                onClick={(e) =>
                  setFormData({
                    ...formData,
                    [field.value]: !formData[field.value],
                  })
                }
              >
                {field.placeholder}
              </label>
            </div>
          );
        }
      })}

      {formStep === 1 && (
        <input
          onClick={(e) => {
            e.preventDefault();
            setFormStep(0);
          }}
          type="submit"
          value="Back"
        ></input>
      )}
      {formStep === 0 ? (
        <input
          onClick={(e) => handleNextButton(e)}
          disabled={!formData.email || !formData.fullName}
          type="submit"
          value="Next"
        ></input>
      ) : (
        <input
          onClick={handleSubmitButton}
          disabled={!formData.role || !formData.tAndC}
          type="submit"
          value="Submit"
        ></input>
      )}
    </form>
  );
}
