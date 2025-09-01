import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp"; // lo tendrás luego
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta por defecto */}
        <Route path="/" element={<SignIn />} />
        
        {/* Ruta para SignUp */}
        <Route path="/signup" element={<SignUp />} />
        {/* Ruta para Dashboard (después de login) */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
