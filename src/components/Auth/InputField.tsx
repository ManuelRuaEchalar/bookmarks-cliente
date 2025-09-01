interface InputFieldProps {
  name: string;
  label: string;
  type?: string;
}

function InputField({ name, label, type = "text" }: InputFieldProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
      <label htmlFor={name} style={{ marginBottom: "0.25rem", fontSize: "0.9rem" }}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        style={{
          padding: "0.5rem",
          borderRadius: "6px",
          border: "1px solid #ccc",
          fontSize: "1rem"
        }}
        required
      />
    </div>
  );
}

export default InputField;
