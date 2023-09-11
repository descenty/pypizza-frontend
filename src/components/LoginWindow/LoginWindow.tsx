import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
} from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { GrFormClose } from "react-icons/gr";
import { axiosInstance } from "../../settings";
import styles from "./LoginWindow.module.css";

interface ILoginWindowProps {
  getUserData: () => Promise<unknown>;
  toggleLoginWindow: () => void;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const LoginWindow = ({
  getUserData,
  toggleLoginWindow,
  setLoading,
}: ILoginWindowProps) => {
  const [showSMSForm, setShowSMSForm] = useState<boolean>(false);
  const [phoneInput, setPhoneInput] = useState<string>("7 ");
  const [phone, setPhone] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>();
  const [canGenerateCode, setCanGenerateCode] = useState<boolean>(true);
  const [code, setCode] = useState<string>("");
  const enableRecaptcha = false;

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
    if (canGenerateCode) {
      try {
        const responseData = (
          await axiosInstance.post("send-auth-sms/", {
            phone: phone,
          })
        ).data;
        if (typeof responseData === "string") alert(responseData);
        setCanGenerateCode(false);
      } catch (e) {
        setError("код уже был отправлен");
      }
      setTimeout(() => {
        setCanGenerateCode(true);
        setError("");
      }, 60000);
    } else setError("код уже был отправлен");
  };
  const phoneInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      let value = "7 " + event.target.value.substring(2).replace(/\D/g, "");
      if (value.length > 5)
        value = value.slice(0, 5) + " " + value.slice(5).replaceAll(" ", "");
      if (value.length > 9)
        value = value.slice(0, 9) + " " + value.slice(9).replaceAll(" ", "");
      if (value.length > 12)
        value = value.slice(0, 12) + " " + value.slice(12).replaceAll(" ", "");
      setPhoneInput(value);
      setPhone(value.replaceAll(" ", ""));
    },
    []
  );
  const codeInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setCode(event.target.value);
      if (event.target.value.length === 4) {
        try {
          const response = await axiosInstance.post("phone-code-auth/", {
            phone: phone,
            code: event.target.value,
          });
          setLoading(true);
          setTimeout(() => setLoading(false), 1000);
          localStorage.setItem("token", response.data.token);
          await getUserData();
          toggleLoginWindow();
        } catch (e) {
          setError("неверный код");
        }
      }
    },
    [getUserData, phone, setLoading, toggleLoginWindow]
  );
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
            <label htmlFor="phone">Укажите свой телефон:</label>
            <div className={styles.input_div}>
              <span className={styles.plus_span}>+</span>
              <input
                onChange={phoneInputChange}
                id="phone"
                value={phoneInput}
                placeholder="7 . . . . . . ."
                maxLength={15}
                inputMode="numeric"
              />
            </div>
            {enableRecaptcha && (
              <ReCAPTCHA
                sitekey="6LdkqsciAAAAAI1B1ueIKMD7ha_gowtlL8sl-J3m"
                onChange={(value) => setRecaptchaToken(value)}
              />
            )}
            <button
              className={
                phone.length !== 11 || (enableRecaptcha && !recaptchaToken)
                  ? styles.button_inactive
                  : ""
              }
              onClick={async () => await generateAuthCode()}
            >
              Получить код в SMS
            </button>
          </div>
          <div className={`${styles.sms_form} ${showSMSForm && styles.show}`}>
            <label htmlFor="code">Код отправлен на +{phone}</label>
            <input
              type="text"
              id="code"
              placeholder=". . . ."
              maxLength={4}
              onChange={codeInputChange}
              value={code}
              inputMode="numeric"
            />
            {error && <span className={styles.error_span}>{error}</span>}
            {canGenerateCode && (
              <button onClick={async () => await generateAuthCode()}>
                Получить новый код
              </button>
            )}
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
