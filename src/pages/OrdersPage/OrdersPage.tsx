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
import UserContext from "../../context/UserContext";
import { Category, getSizeName, IOrder, statuses } from "../../models";
import { getNoun, ruDate } from "../../utils";
import styles from "./OrdersPage.module.css";
import { GrLocation } from "react-icons/gr";
import { Line } from "rc-progress";
import { useNavigate } from "react-router-dom";
import { axiosInstance, baseURL, wsURL } from "../../settings";

interface IActiveOrderPageProps {
  updateUserData: () => void;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const OrdersPage = ({
  updateUserData,
  setLoading,
}: IActiveOrderPageProps) => {
  const { user, setUser } = useContext(UserContext);
  const [selectedOrder, selectOrder] = useState<IOrder | undefined>();
  const [visibleOrder, setVisibleOrder] = useState<IOrder | undefined>();
  const [activeOrders, setActiveOrders] = useState<IOrder[] | undefined>();
  const [progress, setProgress] = useState<number>(10);
  const [error, setError] = useState<string | null>(null);
  const [currentSocket, setCurrentSocket] = useState<WebSocket | undefined>();
  const navigate = useNavigate();
  useEffect(() => {
    setVisibleOrder(selectedOrder);
    const interval = setInterval(() => {
      if (selectedOrder) {
        setProgress(
          ((new Date().getTime() -
            new Date(selectedOrder.created_at).getTime()) /
            (new Date(selectedOrder.target_time).getTime() -
              new Date(selectedOrder.created_at).getTime())) *
            100
        );
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [selectedOrder]);
  useEffect(() => {
    if (visibleOrder?.status === "CREATED") {
      const deleteTime = new Date(
        new Date(visibleOrder.created_at).getTime() + 300000
      ).toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
      });
      setError(`Заказ не оплачен, оплатите до ${deleteTime}`);
    } else setError(null);
    const openWS = async () => {
      if (currentSocket)
        currentSocket.close()
      const socket = new WebSocket(wsURL + "?token=" + user?.token);
      setCurrentSocket(socket)
      socket.onopen = (e: Event) => {
        console.log("Соединение установлено");
        socket.send(
          JSON.stringify({
            action: "subscribe_instance",
            pk: visibleOrder?.id,
            request_id: 1,
          })
        );
      };
      socket.onmessage = (message: MessageEvent<any>) => {
        const order: IOrder = JSON.parse(message.data).data;
        if (order.status === "COMPLETED") {
          socket.close();
          updateUserData()
          setCurrentSocket(undefined)
        } else {
          setVisibleOrder(order);
        }
      };
      socket.onclose = () => {
        console.log("Соединение прервано");
      };
      socket.onerror = (error) => {
        setTimeout(() => openWS(), 1000);
      };
    };
    if (user && visibleOrder && visibleOrder === selectedOrder) openWS();
  }, [navigate, selectedOrder, updateUserData, user, visibleOrder]);
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
            </button>
          ))}
        </div>
      )}
      {visibleOrder && (
        <div className={styles.selected_order}>
          <h2 className={styles.order_label}>
            Заказ № {visibleOrder.id} от {ruDate(visibleOrder.created_at)}
          </h2>
          <p className={styles.delivery_address}>
            <GrLocation /> &nbsp;{visibleOrder.delivery_address}
          </p>
          {error && <span className={styles.error_span}>{error}</span>}
          {visibleOrder.status !== "CREATED" ? (
            <>
              <div className={styles.time}>
                <p className={styles.estimated_time}>
                  {Math.max(
                    0,
                    Math.floor(
                      (new Date(visibleOrder.target_time).getTime() -
                        new Date().getTime()) /
                        60000
                    )
                  )}
                  &nbsp;
                  {getNoun(
                    Math.max(
                      0,
                      Math.floor(
                        (new Date(visibleOrder.target_time).getTime() -
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
                  {visibleOrder.target_time &&
                    new Date(visibleOrder.target_time).toLocaleTimeString(
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
                  (window.location.href = visibleOrder.payment_url)
                }
              >
                Оплата
              </button>
              <button
                onClick={async () => {
                  try {
                    await axiosInstance.post("cancel-order/", {
                      id: visibleOrder.id,
                    });
                    setUser &&
                      user &&
                      setUser({
                        ...user,
                        orders: user.orders.filter(
                          (order) => order.id !== visibleOrder.id
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
                  Object.keys(statuses).indexOf(visibleOrder.status) >= 1 &&
                  styles.active
                }`}
              />
              <span>Принят</span>
            </div>
            <div>
              <IoPizzaOutline
                className={`${styles.status} ${
                  Object.keys(statuses).indexOf(visibleOrder.status) >= 2 &&
                  styles.active
                }`}
              />
              <span>Готовится</span>
            </div>
            <div>
              <AiOutlineInbox
                className={`${styles.status} ${
                  Object.keys(statuses).indexOf(visibleOrder.status) >= 3 &&
                  styles.active
                }`}
              />
              <span>Собирается</span>
            </div>
            <div>
              <MdOutlineDeliveryDining
                className={`${styles.status} ${
                  Object.keys(statuses).indexOf(visibleOrder.status) >= 4 &&
                  styles.active
                }`}
              />
              <span>Едет к вам</span>
            </div>
          </div>
          <div className={styles.ordered_goods}>
            {visibleOrder.ordered_goods.map((ordered_good, index) => (
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
              Итого: <b>{visibleOrder.total} ₽</b>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
