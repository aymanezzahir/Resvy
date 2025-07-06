import { useEffect, useState } from "react";
import { cn } from "lib/util";
import { roomStatuses } from "~/constants";
import axios from "axios";
import axiosInstance from "lib/axios";

const CLOUDINARY_UPLOAD_URL = import.meta.env.VITE_CLOUDINARY_UPLOAD_URL;
const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_RESET;

export const initialRoomData: RoomCreateDTO = {
  id: 0,
  roomNumber: "",
  typeId: 0,
  floor: 0,
  price: 0,
  description: "",
  status: "AVAILABLE",
  images: [],
};

export default function RoomFormPopup({
  visible,
  setVisible,
  RoomType
}: {
  visible: { visible: boolean; data: RoomCreateDTO[] };
  setVisible: React.Dispatch<
    React.SetStateAction<{
      visible: boolean;
      data: RoomCreateDTO[];
    }>
  >;
  RoomType : RoomType[]
}) {
  const [formData, setFormData] = useState<RoomCreateDTO>(initialRoomData);
  const [uploading, setUploading] = useState(false);
  

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "typeId" || name === "floor" || name === "price"
          ? Number(value)
          : value,
    }));
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length === 0) return;
    for (let i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i];
      const form = new FormData();
      form.append("file", file);
      form.append("upload_preset", UPLOAD_PRESET);
      form.append("cloud_name", CLOUD_NAME);

      setUploading(true);
      try {
        const res = await fetch(CLOUDINARY_UPLOAD_URL, {
          method: "POST",
          body: form,
        });
        const data = await res.json();
        if (data.secure_url) {
          setFormData((prev) => ({
            ...prev,
            images: [
              ...prev.images,
              { url: data.secure_url, isPrimary: false },
            ],
          }));
        }
      } catch (err) {
        console.error("Image upload error", err);
      } finally {
        setUploading(false);
      }
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

   
  
    const response = await axiosInstance.post("api/rooms",formData);
    
 setVisible((pre) => ({
      visible: false,
      data: [...pre.data, response.data],
    }));

    
  }

 
  return (
    <div
      className={cn(
        "fixed top-0 left-0  right-0 bottom-0 z-50 flex justify-center items-center  bg-black/40",

        { hidden: !visible.visible }
      )}
    >
      <div className="bg-white rounded-lg  overflow-y-scroll shadow-lg max-h-[90vh] w-full max-w-md p-6 relative">
        <h2 className="text-xl font-bold mb-4">Ajouter une Chambre</h2>
        <button
          onClick={function () {
            setVisible({
              visible: false,
              data: visible.data,
            });
            setFormData(initialRoomData);
          }}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-4 mb-4 grid-cols-3">
            <div className="col-span-1">
              <label
                htmlFor="fullName"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                N.chambre
              </label>
              <input
                type="number"
                min={0}
                name="roomNumber"
                value={formData.roomNumber}
                onChange={handleChange}
                placeholder="Numéro de chambre"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                required
              />
            </div>

            <div className="col-span-2">
              <label
                htmlFor="status"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Type de Chambre
              </label>
              <select
                id="typeId"
                name="typeId"
                value={formData.typeId}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              >
                {RoomType.map((e, i) => (
                  <option key={i} value={e.id}>
                    {e.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-1">
              <label
                htmlFor="fullName"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Étage
              </label>
              <input
                type="number"
                name="floor"
                min={0}
                value={formData.floor}
                onChange={handleChange}
                placeholder="Étage"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                required
              />
            </div>
            <div className="col-span-1">
              <label
                htmlFor="fullName"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Prix
              </label>
              <input
                type="number"
                name="price"
                min={0}
                value={formData.price}
                onChange={handleChange}
                placeholder="Prix"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                required
              />
            </div>
            <div className="col-span-1">
              <label
                htmlFor="status"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Statut
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              >
                {roomStatuses.map((e, i) => (
                  <option key={i} value={e.id}>
                    {e.value}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-3">
              <label
                htmlFor="status"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              />
            </div>

            <div className="col-span-3">
              <label
                htmlFor="status"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Image
              </label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 "
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      WEBP, JPG ET JPEG (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    onChange={handleImageUpload}
                    id="dropzone-file"
                    type="file"
                    multiple
                    accept="image/webp, image/jpg , image/jpeg"
                    className="hidden"
                  />
                </label>
              </div>

              {uploading && (
                <p className="text-sm text-blue-600 mt-1">Chargement...</p>
              )}

              {formData.images.map((e, i) => (
                <div key={i} className="col-span-1 relative">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((pre) => ({
                        ...pre,
                        images: pre.images.filter((item) => item !== e),
                      }))
                    }
                    className="text-red-500 font-black cursor-pointer absolute right-2 top-2 text-lg"
                  >
                    ✕
                  </button>
                  <img
                    src={e.url}
                    alt="Uploaded"
                    className="mt-2 rounded border w-full"
                  />
                </div>
              ))}
            </div>

            <div className="col-span-3">
              <button
                type="submit"
                className="text-white bg-primary-100 hover:bg-primary-500 w-full font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Sauvegarder la chambre
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
