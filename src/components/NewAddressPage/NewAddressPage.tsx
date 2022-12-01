import styles from "./NewAddressPage.module.css";
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
import axios, { AxiosError } from "axios";
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

interface INewAddressPageProps {
  toggleNewAddressPage: () => void;
  showNewAddressPage: boolean;
}

const NewAddressPage = ({
  toggleNewAddressPage,
  showNewAddressPage,
}: INewAddressPageProps) => {
  const { user } = useContext(UserContext);
  const [address, setAddress] = useState<
    DaDataSuggestion<DaDataAddress> | undefined
  >();
  const [selectedAddress, setSelectedAddress] = useState<ISavedAddress>();
  const [error, setError] = useState<string | null>(null);

  interface IDynamicMapProps {
    selectedAddress: ISavedAddress;
  }
  const DynamicMapComponent = ({ selectedAddress }: IDynamicMapProps) => {
    const map = useMap();
    console.log(selectedAddress);
    if (selectedAddress) {
      map.setView(
        [selectedAddress.latitude, selectedAddress.longitude],
        map.getZoom()
      );
    }
    return null;
  };
  useEffect(() => {
    if (selectedAddress)
      setTimeout(
        () =>
          document
            .querySelector(".leaflet-marker-icon")
            ?.setAttribute("src", process.env.PUBLIC_URL + "/marker.svg"),
        50
      );
  }, [selectedAddress]);

  useEffect(() => {
    if (address) {
      try {
        axiosInstance
          .post<ISavedAddress>("get-address-geolocation/", {
            address: address.value,
          })
          .then((response) => {
            if (response.data.latitude) {
              setSelectedAddress(response.data);
              setError(null);
            } else {
              setError("некорректный адрес доставки");
              setSelectedAddress(undefined);
            }
          });
      } catch (ex) {
        console.log(ex);
      }
    }
  }, [address]);

  const addNewSavedAddress = async () => {
    if (selectedAddress) {
      try {
        await axiosInstance.post("add-saved-address/", {
          address: selectedAddress.name,
        });
        user?.saved_addresses.push(selectedAddress);
      } catch (e) {
        const error = e as AxiosError;
        if (error) {
          error.response!.status === 403 &&
            setError("Выбранный адрес уже добавлен");
          error.response!.status === 404 &&
            setError("В этом городе нет пиццерии");
          error.response!.status === 400 &&
            setError("Не удалось добавить новый адрес");
        } else toggleNewAddressPage();
      }
    }
  };
  return (
    <div
      className={`${styles.order_confirmation} ${
        showNewAddressPage ? styles.open : styles.close
      }`}
    >
      <div className="backtrigger" onClick={() => toggleNewAddressPage()}></div>
      <div>
        <h1>Новый адрес доставки</h1>
        <GrFormClose
          className={styles.close_button}
          onClick={() => toggleNewAddressPage()}
        />
        <div className={styles.address_div}>
          <AddressSuggestions
            token="d3842e1df7e2d35e71ecbc4469a4f6d76b74100e"
            value={address}
            onChange={setAddress}
          />
        </div>
        {error && <span className={styles.error_span}>{error}</span>}
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
        <button
          disabled={!selectedAddress}
          onClick={async () => {
            await addNewSavedAddress();
          }}
        >
          Добавить адрес
        </button>
      </div>
    </div>
  );
};

export default NewAddressPage;
