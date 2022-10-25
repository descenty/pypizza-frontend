import styles from "./OrderConfirmation.module.css";
import {
  IGood,
  IConfiguration,
  getSizeName,
  SizeType,
  ISavedAddress,
} from "../../models";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import axios from "axios";
import UserContext from "../../context/UserContext";
import { axiosInstance } from "../../App";
import { addToCart } from "../../APIFunctions";
import { GrFormClose } from "react-icons/gr";
import {
  AddressSuggestions,
  DaDataAddress,
  DaDataSuggestion,
} from "react-dadata";
import "react-dadata/dist/react-dadata.css";
import { Link } from "react-router-dom";
import Select from "react-select";

interface IOrderConfirmationProps {
  toggleOrderConfirmation: () => void;
  showOrderConfirmation: boolean;
}

const OrderConfirmation = ({
  toggleOrderConfirmation,
  showOrderConfirmation,
}: IOrderConfirmationProps) => {
  const { user } = useContext(UserContext);
  const [address, setAddress] = useState<
    DaDataSuggestion<DaDataAddress> | undefined
  >();
  const addressesOptions = user?.saved_addresses.map((saved_address) => ({
    value: saved_address,
    label: saved_address.name,
  }));
  const [selectedAddress, setSelectedAddress] = useState<ISavedAddress>();

  useEffect(() => {setSelectedAddress(addressesOptions && addressesOptions[0].value)}, [addressesOptions, user])
  return (
    <div
      className={`${styles.order_confirmation} ${
        showOrderConfirmation ? styles.open : styles.close
      }`}
    >
      <div>
        <h1>Адрес доставки</h1>
        <h1>{selectedAddress?.name}</h1>
        <GrFormClose
          className={styles.close_button}
          onClick={() => toggleOrderConfirmation()}
        />
        <Select
          options={addressesOptions}
          onChange={(e) => setSelectedAddress(e?.value)}
          value={addressesOptions && addressesOptions[0]}
        />
        <button>Добавить адрес</button>
        <div className={styles.address_div}>
          <AddressSuggestions
            token="d3842e1df7e2d35e71ecbc4469a4f6d76b74100e"
            value={address}
            onChange={setAddress}
          />
        </div>
        <a href="#">К оплате</a>
      </div>
    </div>
  );
};

export default OrderConfirmation;
