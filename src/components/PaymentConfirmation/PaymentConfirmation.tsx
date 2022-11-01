import { useEffect, useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../App";
import styles from "./PaymentConfirmation.module.css";

const PaymentConfirmation = () => {
  const { id } = useParams();
  const [success, setSuccess] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    const confirmPayment = async () => {
      try {
        const response = await axiosInstance.get(`payment-confirmation/${id}/`);
        if (response.status === 200) {
          setSuccess(true);
          setTimeout(() => navigate('/'), 1000)
        } else setTimeout(() => confirmPayment(), 5000);
      } catch (e) {
        console.log(e);
        setTimeout(() => confirmPayment(), 5000);
      }
    };
    confirmPayment();
  }, [id, navigate]);
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
