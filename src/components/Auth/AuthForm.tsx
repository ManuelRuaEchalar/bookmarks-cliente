import InputField from "./InputField";
import SubmitButton from "./SubmitButton";

type Field = {
  name: string;
  label: string;
  type: string;
};

interface AuthFormProps {
  title: string;
  fields: Field[];
  buttonText: string;
  onSubmit: (data: Record<string, string>) => void;
}

function AuthForm({ title, fields, buttonText, onSubmit }: AuthFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    fields.forEach((field) => {
      data[field.name] = formData.get(field.name)?.toString() || "";
    });
    onSubmit(data);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "300px",
        textAlign: "center"
      }}
    >
      <h2>{title}</h2>
      {fields.map((field) => (
        <InputField
          key={field.name}
          name={field.name}
          label={field.label}
          type={field.type}
        />
      ))}
      <SubmitButton text={buttonText} />
    </form>
  );
}

export default AuthForm;
