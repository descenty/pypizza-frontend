import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  AiOutlineCheck,
  AiOutlineHourglass,
  AiOutlineInbox,
} from "react-icons/ai";
import { FaPizzaSlice } from "react-icons/fa";
import { IoMdPizza } from "react-icons/io";
import { HiArrowDown } from "react-icons/hi";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { IoPizzaOutline } from "react-icons/io5";
import { axiosInstance, baseURL } from "../../App";
import UserContext from "../../context/UserContext";
import { Category, getSizeName, IOrder, statuses } from "../../models";
import { getNoun, ruDate } from "../../utils";
import styles from "./ActiveOrderPage.module.css";
import { GrLocation } from "react-icons/gr";
import { Line } from "rc-progress";
import { useNavigate } from "react-router-dom";

interface IActiveOrderPageProps {
  updateUserData: () => void;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const ActiveOrderPage = ({
  updateUserData,
  setLoading,
}: IActiveOrderPageProps) => {
  const { user, setUser } = useContext(UserContext);
  const [selectedOrder, selectOrder] = useState<IOrder | undefined>();
  const [activeOrders, setActiveOrders] = useState<IOrder[] | undefined>();
  const [progress, setProgress] = useState<number>(10);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (selectedOrder?.status === "CREATED") {
      const deleteTime = new Date(
        new Date(selectedOrder.created_at).getTime() + 300000
      ).toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
      });
      setError(`Заказ не оплачен, оплатите до ${deleteTime}`);
    } else setError(null);
    const interval = setInterval(() => {
      if (selectedOrder) {
        setProgress(
          Math.floor(
            (new Date().getTime() -
              new Date(selectedOrder.created_at).getTime()) /
              1000 /
              60
          ) / 0.4
        );
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [selectedOrder]);
  useEffect(() => {
    if (
      user &&
      user.orders.filter((order) => order.status !== "COMPLETED").length === 0
    ) {
      navigate("/");
    }
    setActiveOrders(
      user?.orders.filter((order) => order.status !== "COMPLETED")
    );
  }, [navigate, user]);
  useEffect(() => {
    activeOrders && selectOrder(activeOrders[0]);
  }, [activeOrders]);
  return (
    <div className={styles.active_order_page}>
      {activeOrders && activeOrders.length > 1 && (
        <div className={styles.active_orders_list}>
          {activeOrders?.map((order) => (
            <button
              className={order === selectedOrder ? styles.active : undefined}
              onClick={() => selectOrder(order)}
              key={order.id}
            >
              <span>
                Заказ от&nbsp;
                {ruDate(order.created_at)}
              </span>
              <span>{statuses[order.status]}</span>
            </button>
          ))}
        </div>
      )}
      {selectedOrder && (
        <div className={styles.selected_order}>
          <h2 className={styles.order_label}>
            Заказ от {ruDate(selectedOrder.created_at)}
          </h2>
          <p className={styles.delivery_address}>
            <GrLocation /> &nbsp;{selectedOrder.delivery_address}
          </p>
          {error && <span className={styles.error_span}>{error}</span>}
          {selectedOrder.status !== "CREATED" ? (
            <>
              <div className={styles.time}>
                <p className={styles.estimated_time}>
                  {Math.max(
                    0,
                    Math.floor(
                      (new Date(
                        new Date(selectedOrder.created_at).getTime() + 2400000
                      ).getTime() -
                        new Date().getTime()) /
                        60000
                    )
                  )}
                  &nbsp;
                  {getNoun(
                    Math.max(
                      0,
                      Math.floor(
                        (new Date(selectedOrder.target_time).getTime() -
                          new Date().getTime()) /
                          60000
                      )
                    ),
                    "минута",
                    "минуты",
                    "минут"
                  )}
                </p>
                <p className={styles.target_time}>
                  {selectedOrder.target_time &&
                    new Date(selectedOrder.target_time).toLocaleTimeString(
                      "ru-RU",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                </p>
              </div>
              <Line
                className={styles.progress}
                percent={progress}
                strokeWidth={2}
                strokeColor="#FD6D22"
                trailWidth={2}
                trailColor="#F7F7F7"
              />
            </>
          ) : (
            <>
              <button
                onClick={() =>
                  (window.location.href = selectedOrder.payment_url)
                }
              >
                Оплата
              </button>
              <button
                onClick={() => {
                  try {
                    axiosInstance.post("cancel-order/", {
                      id: selectedOrder.id,
                    });
                    setUser &&
                      user &&
                      setUser({
                        ...user,
                        orders: user.orders.filter(
                          (order) => order.id !== selectedOrder.id
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
            </>
          )}
          <div className={styles.statuses}>
            <div>
              <AiOutlineHourglass
                className={`${styles.status} ${styles.active}`}
              />
              <span>Создан</span>
            </div>
            <div>
              <AiOutlineCheck
                className={`${styles.status} ${
                  Object.keys(statuses).indexOf(selectedOrder.status) >= 1 &&
                  styles.active
                }`}
              />
              <span>Принят</span>
            </div>
            <div>
              <IoPizzaOutline
                className={`${styles.status} ${
                  Object.keys(statuses).indexOf(selectedOrder.status) >= 2 &&
                  styles.active
                }`}
              />
              <span>Готовится</span>
            </div>
            <div>
              <AiOutlineInbox
                className={`${styles.status} ${
                  Object.keys(statuses).indexOf(selectedOrder.status) >= 3 &&
                  styles.active
                }`}
              />
              <span>Собирается</span>
            </div>
            <div>
              <MdOutlineDeliveryDining
                className={`${styles.status} ${
                  Object.keys(statuses).indexOf(selectedOrder.status) >= 4 &&
                  styles.active
                }`}
              />
              <span>Едет к вам</span>
            </div>
          </div>
          <div className={styles.ordered_goods}>
            {selectedOrder.ordered_goods.map((ordered_good, index) => (
              <div key={index}>
                <img src={baseURL + ordered_good.image} alt="" />
                <div>
                  <h4>{ordered_good.name}</h4>
                  <p>{getSizeName(ordered_good.category, ordered_good.size)}</p>
                </div>
                <p className={styles.quantity}>{ordered_good.quantity}</p>
                <p className={styles.ordered_good_price}>
                  {ordered_good.price} ₽
                </p>
              </div>
            ))}
            <p className={styles.total}>
              Итого: <b>{selectedOrder.total} ₽</b>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActiveOrderPage;
