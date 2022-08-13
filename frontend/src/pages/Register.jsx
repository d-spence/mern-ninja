const { useState } = require('react')

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(email, password);
  }

  return (
    <form className="register" onSubmit={handleSubmit}>
      <h3>Register</h3>

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

      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
