// src/auth/authApi.ts
import env from "../config/envConfig";

// ✅ Login API
export const loginAPI = async (email: string, password: string) => {
  const res = await fetch(`${env.apiBaseUrl}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Login failed");
  }

  const data = await res.json();
  return {
    token: data.data.token, 
    user: { email }, 
  };
};

// ✅ Register API
export const registerAPI = async (name: string, email: string, password: string) => {
  const res = await fetch(`${env.apiBaseUrl}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Registration failed");
  }

  const data = await res.json();
  return data.message; 
};
