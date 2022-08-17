import { useState } from 'react';
import { useRegister } from '../hooks/useRegister';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register, isLoading, error } = useRegister();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await register(email, password);
  }

  return (
    <form className="register" onSubmit={handleSubmit}>
      <h3>Register New Account</h3>

      <label htmlFor="email">Email:</label>
      <input
        id="email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <label htmlFor="password">Password:</label>
      <input
        id="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <button type="submit" disabled={isLoading}>Create Account</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default Register;
