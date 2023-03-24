import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./Registration.css";

import { Paths } from "../../common/constants/paths";
import { signUp } from "../../redux/actions/auth.actions";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthState } from "../../types/user";
import { useEffect, useState } from "react";
import { isFunctionOrConstructorTypeNode } from "typescript";

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Неверный формат email")
    .required("Обязательное поле"),
  password: Yup.string()
    .required("Обязательное поле")
    .min(8, "мин.-макс. длина: 8-32")
    .max(32, "8-32"),
  confirmPwd: Yup.string()
    .required("Обязательное поле")
    .oneOf([Yup.ref("password")], "Пароли не совпадают"),
});

function getToken() {
  return localStorage.getItem("Authorization");
}

const Registration = () => {
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(
    (state: AuthState) => state.auth
  );
  const formOptions = { resolver: yupResolver(schema) };
  const { register, reset, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const navigate = useNavigate();
  useEffect(() => {
    const accessToken = getToken();
    if (accessToken) navigate("/academic-plans");
  }, [isAuthenticated, navigate]);

  const onSubmit = (data: any): void => {
    const { email, password, confirmPwd } = data;
    if (!email.trim() || !password.trim() || password !== confirmPwd) return;
    dispatch(signUp({ email, password }));
    reset();
  };
  return (
    <>
      <div className="reg-body">
        <div className="reg-container">
          <div className="reg-screen">
            <div className="reg-screen__content">
              <form
                className="reg-login"
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="reg-login__field">
                  <i className="reg-login__icon fas fa-user"></i>
                  <input
                    type="text"
                    className="reg-login__input"
                    placeholder="Email"
                    {...register("email")}
                  />
                  <span className="reg-error-message">
                    {errors.email?.message?.toString()}
                  </span>
                </div>
                <div className="reg-login__field">
                  <i className="reg-login__icon fas fa-lock"></i>
                  <input
                    type="password"
                    className="reg-login__input"
                    placeholder="Пароль"
                    {...register("password")}
                  />
                  <span className="error-message">
                    {errors.password?.message?.toString()}
                  </span>
                </div>
                <div className="reg-login__field">
                  <i className="reg-login__icon fas fa-lock"></i>
                  <input
                    type="password"
                    className="reg-login__input"
                    placeholder="Подтверждение пароля"
                    {...register("confirmPwd")}
                  />
                  <span className="reg-error-message">
                    {errors.confirmPwd?.message?.toString() || error}
                  </span>
                </div>
                <button
                  type="submit"
                  className="reg-button reg-login__submit"
                  disabled={loading}
                >
                  <span className="reg-button__text">Регистрация</span>
                  <i className="reg-button__icon fas fa-chevron-right"></i>
                </button>
              </form>
              <div className="reg-login-place">
                <Link className="reg-login-place-link" to={Paths.Login}>
                  Уже есть аккаунт?
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
            <div className="reg-screen__background">
              <span className="screen__background__shape reg-screen__background__shape4"></span>
              <span className="screen__background__shape reg-screen__background__shape3"></span>
              <span className="screen__background__shape reg-screen__background__shape2"></span>
              <span className="screen__background__shape reg-screen__background__shape1"></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Registration;
