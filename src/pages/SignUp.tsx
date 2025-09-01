import { useState } from "react";
import DecorativePanel from "../components/Auth/DecorativePanel";
import AuthForm from "../components/Auth/AuthForm";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../api/auth";

function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async (data: Record<string, string>) => {
    try {
      setError(null); // ocultar error anterior
      const result = await signUp({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      });

      localStorage.setItem("token", result.access_token);
      console.log("Token guardado:", result.access_token);

      navigate("/dashboard");

    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      width: '100vw', 
      height: '100vh',
      margin: 0,
      overflow: 'hidden'
    }}>
      <div style={{ 
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 0
      }}>
        <DecorativePanel />
      </div>
      <div style={{ 
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee0c3ff',
        minWidth: 0
      }}>
        <AuthForm
          title="Sign Up"
          fields={[
            { name: "firstName", label: "First name", type: "text" },
            { name: "lastName", label: "Last name", type: "text" },
            { name: "email", label: "Email", type: "email" },
            { name: "password", label: "Password", type: "password" }
          ]}
          buttonText="Register"
          onSubmit={handleSignUp}
        />
        <p style={{ fontSize: 'small' }}>
          Have an account? <Link to="/"><strong>Sign In</strong></Link>
        </p>
        {error && (
          <p style={{ color: "red", fontSize: "small", marginTop: "8px" }}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

export default SignUp;
