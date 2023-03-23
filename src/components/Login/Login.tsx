import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../../common/constants/paths";
import { signIn } from "../../redux/actions/auth.actions";
import "./Login.css";
import { AuthState } from "../../types/user";

function getToken() {
  return localStorage.getItem("Authorization");
}

const Auth = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading, error } = useSelector(
    (state: AuthState) => state.auth
  );
  console.log({ loading, error });
  const navigate = useNavigate();
  useEffect(() => {
    const accessToken = getToken();
    if (isAuthenticated || accessToken) navigate("/academic-plans");
  }, [isAuthenticated, navigate]);
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [password, setPassword] = useState(
    localStorage.getItem("password") || ""
  );
  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    dispatch(signIn({ email, password }));
    setEmail("");
    setPassword("");
  };
  console.log({ email, password });
  return (
    <>
      <div className="body">
        <div className="container">
          <div className="screen">
            <div className="screen__content">
              <form
                className="login"
                autoComplete="off"
                onSubmit={handleSubmit}
              >
                <div className="login__field">
                  <i className="login__icon fas fa-user"></i>
                  <input
                    type="text"
                    className="login__input"
                    name="email"
                    placeholder="Email"
                    onChange={handleEmailChange}
                    value={email}
                    required
                  />
                </div>
                <div className="login__field">
                  <i className="login__icon fas fa-lock"></i>
                  <input
                    type="password"
                    className="login__input"
                    placeholder="Пароль"
                    name="password"
                    onChange={handlePasswordChange}
                    value={password}
                    required
                  />
                </div>
                {error && (
                  <div className="error-message">Неправильный логин/пароль</div>
                )}
                <button
                  type="submit"
                  className="button login__submit"
                  disabled={loading}
                >
                  <span className="button__text">Войти</span>
                  <i className="button__icon fas fa-chevron-right"></i>
                </button>
              </form>
              <div className="registration">
                <Link className="registration-link" to={Paths.Registration}>
                  Регистрация
                </Link>
              </div>
              {/* <div className="social-login">
              <h3>log in via</h3>
              <div className="social-icons">
                <a href="#" className="social-login__icon fab fa-instagram"></a>
                <a href="#" className="social-login__icon fab fa-facebook"></a>
                <a href="#" className="social-login__icon fab fa-twitter"></a>
              </div>
            </div> */}
            </div>
            <div className="screen__background">
              <span className="screen__background__shape screen__background__shape4"></span>
              <span className="screen__background__shape screen__background__shape3"></span>
              <span className="screen__background__shape screen__background__shape2"></span>
              <span className="screen__background__shape screen__background__shape1"></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Auth;
