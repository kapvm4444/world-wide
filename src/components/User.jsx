import styles from "./User.module.css";
import { useAuth } from "../contexts/FakeAuthContext.jsx";
import { useNavigate } from "react-router-dom";

function User() {
  const navigate = useNavigate();

  const { logout, user, isAuthenticated } = useAuth();

  async function handleClick() {
    logout();
    navigate("/", { replace: true });
  }

  if (!isAuthenticated) {
    return;
  }

  return (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.name} />
      <span>Welcome, {user.name}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;

/*
CHALLENGE

1) Add `AuthProvider` to `App.jsx`
2) In the `Login.jsx` page, call `login()` from context
3) Inside an effect, check whether `isAuthenticated === true`. If so, programmatically navigate to `/app`
4) In `User.js`, read and display logged in user from context (`user` object). Then include this component in `AppLayout.js`
5) Handle logout button by calling `logout()` and navigating back to `/`
*/
