import { useState } from "react";
import DecorativePanel from "../components/Auth/DecorativePanel";
import AuthForm from "../components/Auth/AuthForm";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../api/auth";

function SignIn() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async (data: Record<string, string>) => {
    try {
      setError(null); // ocultar error anterior
      const result = await signIn({
        email: data.email,
        password: data.password,
      });

      localStorage.setItem("token", result.access_token);

      navigate("/dashboard");

    } catch (err: any) {
      setError(err.message,);
      console.error("Error during sign-in:", err, "additional info:", error);
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
          title="Sign In"
          fields={[
            { name: "email", label: "Email", type: "email" },
            { name: "password", label: "Password", type: "password" }
          ]}
          buttonText="Login"
          onSubmit={handleSignIn}
        />
        <p style={{ fontSize: 'small' }}>
          Don't have an account? <Link to="/SignUp"><strong>Sign Up</strong></Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
