import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { Paths } from "../../common/constants/paths";
import { signUp } from "../../redux/actions/auth.actions";

const Registration = () => {
  const dispatch = useDispatch();
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
    dispatch(signUp({ email, password }));
    setEmail("");
    setPassword("");
  };
  return (
    <>
      <div className="container">
        <div className="screen">
          <div className="screen__content">
            <form className="login" autoComplete="off">
              <div className="login__field">
                <i className="login__icon fas fa-user"></i>
                <input
                  type="email"
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
export default Registration;
