import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../../common/constants/paths";
import { signIn } from "../../redux/actions/auth.actions";
import * as cookie from "cookie";
import "./Login.css";
import { AuthState } from "../../types/user.js";

const Auth = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: AuthState) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    const cookies = cookie.parse(document.cookie);
    const accessToken = cookies["Authorization"];
    if (isAuthenticated || accessToken) navigate("/academic-plans");
  }, [isAuthenticated, navigate]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (e: any): void => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    dispatch(signIn({ email, password }));
    setEmail("");
    setPassword("");
  };
  console.log({ email, password });
  return (
    <>
      <div className="container">
        <div className="screen">
          <div className="screen__content">
            <form className="login" autoComplete="off">
              <div className="login__field">
                <i className="login__icon fas fa-user"></i>
                <input
                  type="text"
                  className="login__input"
                  placeholder="Email"
                  onChange={handleEmailChange}
                />
              </div>
              <div className="login__field">
                <i className="login__icon fas fa-lock"></i>
                <input
                  type="password"
                  className="login__input"
                  placeholder="Пароль"
                  onChange={handlePasswordChange}
                />
              </div>

              <button className="button login__submit" onClick={handleSubmit}>
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
    </>
  );
};
export default Auth;
