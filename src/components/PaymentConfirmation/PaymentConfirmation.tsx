import { AxiosError } from "axios";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../settings";
import UserContext from "../../context/UserContext";
import styles from "./PaymentConfirmation.module.css";

interface IPaymentConfirmationProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  updateUserData: () => void;
}

const PaymentConfirmation = ({
  setLoading,
  updateUserData,
}: IPaymentConfirmationProps) => {
  const { user, setUser } = useContext(UserContext);
  const { id } = useParams();
  const [success, setSuccess] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (user && !success) {
      if (user?.orders.filter((order) => order.id === Number(id)).length === 0)
        navigate("/");
      else {
        const confirmPayment = async () => {
          try {
            const response = await axiosInstance.get(
              `payment-confirmation/${id}/`
            );
            if (response.status === 200) {
              setTimeout(() => {
                setSuccess(true);
                updateUserData();
              }, 2000);
              setTimeout(() => navigate("/"), 3000);
            } else setTimeout(() => confirmPayment(), 5000);
          } catch (e) {
            const error = e as AxiosError;
            error &&
              error.response!.status !== 404 &&
              setTimeout(() => confirmPayment(), 5000);
          }
        };
        confirmPayment();
      }
    }
  }, [id, navigate, setLoading, success, updateUserData, user]);
  return (
    <div className={styles.payment_confirmation}>
      <div className={styles.payment_awaiting_panel}>
        <h2>Подтверждение оплаты</h2>
        <div className={styles.ldsring}>
          <div />
          <div />
          <div />
          <div />
        </div>
        <div className={styles.buttons_div}>
          <button
            onClick={() => {
              user?.orders.filter((order) => order.id === Number(id)).length ===
                1 &&
                (window.location.href = user?.orders.filter(
                  (order) => order.id === Number(id)
                )[0].payment_url);
            }}
          >
            Оплатить
          </button>
          <button
            onClick={() => {
              try {
                axiosInstance.post("cancel-order/", {
                  id: id,
                });
                setUser &&
                  user &&
                  setUser({
                    ...user,
                    orders: user.orders.filter(
                      (order) => order.id !== Number(id)
                    ),
                  });
                setLoading(true);
                setTimeout(() => setLoading(false), 1000);
                setTimeout(() => navigate("/"), 900);
              } catch (ex) {
                console.log(ex);
              }
            }}
          >
            Отменить заказ
          </button>
        </div>
      </div>
      <div
        className={`${styles.payment_success_panel} ${
          success && styles.success
        }`}
      >
        <AiOutlineCheck className={styles.check} />
        <h3>Оплата прошла успешно</h3>
      </div>
    </div>
  );
};

export default PaymentConfirmation;
