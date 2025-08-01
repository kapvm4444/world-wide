import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import PageNav from "../components/PageNav.jsx";
import { useAuth } from "../contexts/FakeAuthContext.jsx";
import Button from "../components/Button.jsx";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES

  const { login, isAuthenticated } = useAuth();

  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/app", { replace: true });
  }, [isAuthenticated]);

  async function handleLogin(e) {
    e.preventDefault();
    await login(email, password);
  }

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type={"primary"} onClick={handleLogin}>
            Login
          </Button>
        </div>
      </form>
    </main>
  );
}
