import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./Registration.css";

import { Paths } from "../../common/constants/paths";
import { signUp } from "../../redux/actions/auth.actions";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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

const Registration = () => {
  const dispatch = useDispatch();
  const formOptions = { resolver: yupResolver(schema) };
  const { register, reset, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = (data: any): void => {
    // e.preventDefault();
    // if (!email.trim() || !password.trim()) return;
    // dispatch(signUp({ email, password }));
    // setEmail("");
    // setPassword("");
    console.log({ data });
    reset();
  };
  return (
    <>
      <div className="body">
        <div className="container">
          <div className="screen">
            <div className="screen__content">
              <form
                className="login"
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="login__field">
                  <i className="login__icon fas fa-user"></i>
                  <input
                    type="text"
                    className="login__input"
                    placeholder="Email"
                    {...register("email")}
                  />
                  <span className="error-message">
                    {errors.email?.message?.toString()}
                  </span>
                </div>
                <div className="login__field">
                  <i className="login__icon fas fa-lock"></i>
                  <input
                    type="password"
                    className="login__input"
                    placeholder="Пароль"
                    {...register("password")}
                  />
                  <span className="error-message">
                    {errors.password?.message?.toString()}
                  </span>
                </div>
                <div className="login__field">
                  <i className="login__icon fas fa-lock"></i>
                  <input
                    type="password"
                    className="login__input"
                    placeholder="Подтверждение пароля"
                    {...register("confirmPwd")}
                  />
                  <span className="error-message">
                    {errors.confirmPwd?.message?.toString()}
                  </span>
                </div>
                <button type="submit" className="button login__submit">
                  <span className="button__text">Регистрация</span>
                  <i className="button__icon fas fa-chevron-right"></i>
                </button>
              </form>
              <div className="login-place">
                <Link className="login-place-link" to={Paths.Login}>
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
export default Registration;
