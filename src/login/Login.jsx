// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useAuth } from './auth/AuthProvider';
import { Navigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { handleLogin, isAuthenticated } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await handleLogin(email, password);
    if (!success) setError("Usuario o contraseña incorrectos");
  };

  if (isAuthenticated) return <Navigate to="/Principal" />;

  return (
      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <h1>Iniciar Sesión</h1>

          <label htmlFor="email" className="label">Correo Electrónico</label>
          <input type="text" id="email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} />

          <label htmlFor="password" className="label">Contraseña</label>
          <input type="password" id="password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} />

          {error && <div className="error" style={{ color: 'red' }}>{error}</div>}

          <button type="submit" className="button">Ingresar</button>
        </form>
      </div>
  );
}
