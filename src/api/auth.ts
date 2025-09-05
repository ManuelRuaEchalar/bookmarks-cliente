export const API_URL = import.meta.env.VITE_API_URL;

export async function signUp(userData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) {
  const response = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error en el registro");
  }

  return response.json(); 
}

export async function signIn(credentials: {
  email: string;
  password: string;
}) {
  const response = await fetch(`${API_URL}/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error en el login");
  }

  return response.json(); 
}
