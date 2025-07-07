// Step 1
import axios from "axios";
import axiosInstance from "lib/axios";
import { calculateRoomPrice, getRandomCardType } from "lib/util";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router";
import { roomStatuses } from "~/constants";

export type RoomFormData = {
  roomNumber: number;
  status: string;
  roomID: number;
  checkin: Date;
  checkout: Date;
  price: number;
};

function getTomorrowDate() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split("T")[0];
}

export function FormStep1({ onNext }: { onNext: () => void }) {
  const [searchParams, setSearchParams] = useSearchParams();
  let roomID = searchParams.get("roomID");
  const [formData, setFormData] = useState<RoomFormData>({
  roomNumber: 0,
  roomID: +(roomID || 0),
  status: "Confirmee",
  checkin: (() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  })(), 
  checkout: (() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  })(),
  price: 0,
});
  useEffect(() => {
    async function getUserById() {
      const res = await axiosInstance.get("api/rooms/" + roomID);
      const data = res.data;

      setFormData((pre) => ({
        ...pre,
        roomNumber: data.roomNumber,
        roomID: data.id,
        price: data.price,
      }));
    }

    getUserById();
  }, [roomID]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "roomNumber"
          ? parseInt(value)
          : name === "checkin" || name === "checkout"
          ? new Date(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const resUser = await axiosInstance.post("api/auth/userdetails");

    const res = await axiosInstance.post(
      "api/bookings/user/" + resUser.data.id,
      {
        roomId: formData.roomID,
        checkInDate: formData.checkin.toISOString().split("T")[0],
        checkOutDate: formData.checkout.toISOString().split("T")[0],
      }
    );
    const bookingInfo = res.data;

    localStorage.setItem("bookingId", bookingInfo.id);

    onNext(); // Move to next step
  };

  return (
    <form onSubmit={handleSubmit} className="grid w-full gap-4">
      {/* Room Number */}
      <div className="col-span-1">
        <label
          htmlFor="roomNumber"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          N° chambre
        </label>
        <input
          type="number"
          min={0}
          name="roomNumber"
          value={+formData.roomNumber}
          disabled
          placeholder="Numéro de chambre"
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        />
      </div>

      {/* Price */}
      <div className="col-span-1">
        <label
          htmlFor="price"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Prix
        </label>
        <input
          type="number"
          min={0}
          name="price"
          value={calculateRoomPrice(
            formData.price,
            formData.checkin.toISOString(),
            formData.checkout.toISOString()
          )}
          disabled
          placeholder="Prix"
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        />
      </div>

      {/* Status */}
      <div className="col-span-1">
        <label
          htmlFor="price"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Check in
        </label>

        <input
          type="date"
          name="checkin"
          min={getTomorrowDate()}
          value={formData.checkin.toISOString().split("T")[0]}
          onChange={handleChange}
          placeholder="Prix"
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        />
      </div>
      <div className="col-span-1">
        <label
          htmlFor="price"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Check out
        </label>

        <input
          type="date"
          name="checkout"
          min={formData.checkin.toISOString().split("T")[0]}
          value={formData.checkout.toISOString().split("T")[0]}
          onChange={handleChange}
          placeholder="Prix"
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        />
      </div>

      {/* Submit Button */}
      <div className="col-span-3">
        <button
          type="submit"
          className="text-white bg-primary-100 hover:bg-primary-500 w-full font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Suivant
        </button>
      </div>
    </form>
  );
}

// Step 2

export function FormStep2({ onNext }: { onNext: () => void }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
    prix: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // get id from local storage
    const id = Number(localStorage.getItem("bookingId"));


    const res = await axiosInstance.post("api/payments", {
      bookingId: id,
      method: getRandomCardType(),
    });

    onNext();
    // You'd typically send the data to Stripe, PayPal, etc.
  };

  useEffect(() => {
    const id = Number(localStorage.getItem("bookingId"));

    if (!id) navigate("/user/chambre");
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-2xl font-semibold text-gray-700">
        Payment Information
      </h2>

      <div>
        <label className="block mb-1 font-medium text-sm text-gray-700">
          Cardholder Name
        </label>
        <input
          type="text"
          name="cardName"
          value={formData.cardName}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-sm text-gray-700">
          Card Number
        </label>
        <input
          type="text"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleChange}
          maxLength={16}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
          required
        />
      </div>

      <div className="flex space-x-4">
        <div className="flex-1">
          <label className="block mb-1 font-medium text-sm text-gray-700">
            Expiry Date
          </label>
          <input
            type="text"
            name="expiry"
            value={formData.expiry}
            onChange={handleChange}
            placeholder="MM/YY"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primry-500"
            required
          />
        </div>

        <div className="flex-1">
          <label className="block mb-1 font-medium text-sm text-gray-700">
            CVC
          </label>
          <input
            type="text"
            name="cvc"
            value={formData.cvc}
            onChange={handleChange}
            maxLength={4}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primry-500"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full cursor-pointer bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-500 font-semibold"
      >
        Payer maintenant
      </button>
    </form>
  );
}

// Step 3
export function FormStep3() {
  const [data , setData] = useState({username : "" , amount : 0})
  const navigate = useNavigate()
  useEffect(() => {
    
  }, []);

   useEffect(() => {
    const id = Number(localStorage.getItem("bookingId"));
    if (!id) navigate("/user/chambre");

    async function getPayementById() {
      const resUser =  await axiosInstance.post("/api/auth/userdetails");
      const resData = await axiosInstance.get("/api/payments/booking/" + id);
      setData({username : resUser.data.username , amount : resData.data.amount})
      
      
    }

    getPayementById();
  }, []);

  return (
  <div>
    <img src="/assets/images/check.png" className="block mx-auto w-40" alt="" />

    <div className="flex py-5 justify-between items-center">
      <p className="text-lg font-bold">Nom complete</p>
      <p className="text-lg font-bold">{data.username}</p>
    </div>
    <hr />
    <div className="flex py-5 justify-between items-center">
      <p className="text-lg font-bold">montant</p>
      <p className="text-lg font-bold">{data.amount}$</p>
    </div>
    <p className="text-center font-semibold text-gray-400">
      Le paiement a été effectué avec succès.
    </p>

    <div className="col-span-3">
      <Link
        to={"/user/historique"}
        className="text-white bg-primary-100 hover:bg-primary-500 w-full font-medium rounded-lg text-sm px-5 py-2.5"
      >
        Historique
      </Link>
    </div>
  </div>
)
}
