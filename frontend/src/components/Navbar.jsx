import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="container">
        <Link to="/">
          <h1>Workout Buddy</h1>
        </Link>
        <nav>
          <div>
            <Link to="/login">Log In</Link>
            <Link to="/register">Register</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
export default Navbar;
