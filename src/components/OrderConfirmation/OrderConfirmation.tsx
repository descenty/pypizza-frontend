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
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { time } from "console";

interface IOrderConfirmationProps {
  toggleOrderConfirmation: () => void;
  showOrderConfirmation: boolean;
  toggleNewAddressPage: () => void;
}

const OrderConfirmation = ({
  toggleOrderConfirmation,
  showOrderConfirmation,
  toggleNewAddressPage,
}: IOrderConfirmationProps) => {
  const { user } = useContext(UserContext);
  const addressesOptions = user?.saved_addresses.map((saved_address) => ({
    value: saved_address,
    label: saved_address.name,
  }));
  const [selectedAddress, setSelectedAddress] = useState<ISavedAddress>();

  interface IDynamicMapProps {
    selectedAddress: ISavedAddress;
  }
  const DynamicMapComponent = ({ selectedAddress }: IDynamicMapProps) => {
    const map = useMap();
    map.setView(
      [selectedAddress.latitude, selectedAddress.longitude],
      map.getZoom()
    );
    return null;
  };
  useEffect(() => {
    setTimeout(
      () =>
        document
          .querySelector(".leaflet-marker-icon")
          ?.setAttribute("src", process.env.PUBLIC_URL + "/marker.svg"),
      50
    );
  }, [selectedAddress]);

  const makeOrder = async () => {
    if (!selectedAddress) return;
    const response = await axiosInstance.post("make-order/", {
      address: selectedAddress?.name,
    });
    window.location.href = response.data.redirect;
  };
  return (
    <div
      className={`${styles.order_confirmation} ${
        showOrderConfirmation ? styles.open : styles.close
      }`}
    >
      <div
        className="backtrigger"
        onClick={() => toggleOrderConfirmation()}
      ></div>
      <div>
        <h1>Адрес доставки</h1>
        <GrFormClose
          className={styles.close_button}
          onClick={() => toggleOrderConfirmation()}
        />
        <Select
          placeholder="Выберите адрес доставки"
          options={addressesOptions}
          onChange={(e) => {
            setSelectedAddress(e?.value);
          }}
          // defaultValue={addressesOptions && addressesOptions[0]}
        />
        <button
          onClick={() => {
            toggleNewAddressPage();
          }}
        >
          Добавить новый адрес
        </button>
        {selectedAddress && (
          <MapContainer
            center={[selectedAddress.latitude, selectedAddress.longitude]}
            zoom={17}
            scrollWheelZoom={false}
            className={styles.map}
            dragging={false}
          >
            <DynamicMapComponent selectedAddress={selectedAddress} />
            <TileLayer
              attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
              url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
            />
            <Marker
              position={[selectedAddress.latitude, selectedAddress.longitude]}
            >
              <Popup>{selectedAddress.name}</Popup>
            </Marker>
          </MapContainer>
        )}
        <button onClick={makeOrder}>К оплате</button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
