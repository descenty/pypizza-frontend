import axios from "axios";
import { useContext, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { GrFormClose } from "react-icons/gr";
import { axiosInstance } from "../../App";
import { IToken } from "../../models";
import styles from "./LoginWindow.module.css";

interface ILoginWindowProps {
  getUserData: () => Promise<unknown>;
  toggleLoginWindow: () => void;
}

const LoginWindow = ({ getUserData, toggleLoginWindow }: ILoginWindowProps) => {
  const [showSMSForm, setShowSMSForm] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>();

  // async function authenticate() {
  //   try {
  //     const response = await axiosInstance.post<IToken>(
  //       "token-auth/",
  //       loginFormData
  //     );
  //     localStorage.setItem("token", response.data.token);
  //     axiosInstance.defaults.headers.common["Authorization"] =
  //       "Token response.data.token";
  //     toggleLoginWindow();
  //     await getUserData();
  //   } catch {
  //     alert("Войти не удалось");
  //   }
  // }

  const generateAuthCode = async () => {
    setShowSMSForm(true);
  };
  return (
    <div className={styles.login_panel}>
      <div className="backtrigger" onClick={() => toggleLoginWindow()}></div>
      <div className={styles.login_window}>
        <div className={styles.login_header}>
          <h2>Вход</h2>
          <GrFormClose
            className={styles.exitButton}
            onClick={() => toggleLoginWindow()}
          ></GrFormClose>
        </div>
        <div className={styles.login_content}>
          <div
            className={`${styles.phone_form} ${showSMSForm && styles.hidden}`}
          >
            <label htmlFor="phone">Укажите свой телефон</label>
            <div className={styles.input_div}>
              <span className={styles.plus_span}>+</span>
              <input
                onChange={(event) => setPhone(event.target.value)}
                id="phone"
                value={phone}
                placeholder="7 . . . . . . ."
                maxLength={11}
              />
            </div>
            <ReCAPTCHA
              sitekey="6LdkqsciAAAAAI1B1ueIKMD7ha_gowtlL8sl-J3m"
              onChange={(value) => setRecaptchaToken(value)}
            />
            <button
              className={!recaptchaToken ? styles.button_inactive : ""}
              onClick={async () => await generateAuthCode()}
            >
              Получить код в SMS
            </button>
          </div>
          <div className={`${styles.sms_form} ${showSMSForm && styles.show}`}>
            <label htmlFor="code">
              Введите код из SMS. Код отправлен на +phone
            </label>
            <input type="text" id="code" placeholder=". . . ." maxLength={4} />
            {error && <span>error message</span>}
            <button>Получить новый код</button>
            <button onClick={() => setShowSMSForm(false)}>
              Изменить номер телефона
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginWindow;
