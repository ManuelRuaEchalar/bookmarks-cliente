interface SubmitButtonProps {
  text: string;
}

function SubmitButton({ text }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      style={{
        padding: "0.75rem",
        borderRadius: "6px",
        border: "none",
        backgroundColor: "#94a884ff",
        color: "#fff",
        fontSize: "1rem",
        fontWeight: "bold",
        cursor: "pointer",
      }}
    >
      {text}
    </button>
  );
}

export default SubmitButton;
