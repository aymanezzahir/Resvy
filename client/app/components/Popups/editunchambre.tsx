import { useEffect, useState } from "react";
import { cn } from "lib/util";
import { roomStatuses } from "~/constants";
import { initialRoomData } from "./ajouteunchambre";
import axiosInstance from "lib/axios";

const CLOUDINARY_UPLOAD_URL = import.meta.env.VITE_CLOUDINARY_UPLOAD_URL;
const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_RESET;

export default function EditChambre({
  visible,
  setVisible,
  setData,
  RoomType
}: {
  visible: { visible: boolean; data: RoomCreateDTO[]; self: RoomCreateDTO };
  setVisible: React.Dispatch<
    React.SetStateAction<{
      visible: boolean;
      data: RoomCreateDTO[];
      self: RoomCreateDTO;
    }>
  >;
  RoomType : RoomType[];
  setData :  React.Dispatch<React.SetStateAction<{
    visible: boolean;
    data: RoomCreateDTO[];
}>> 
}) {
  const [formData, setFormData] = useState<RoomCreateDTO>(visible.self);
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await axiosInstance.put("api/rooms/"+visible.self.id , {
      price : formData.price,
      status : formData.status
    })
    setVisible((pre) => ({
      visible: false,
      self: formData,
      data: pre.data.map((e) =>
        e.roomNumber === pre.self.roomNumber ? formData : e
      ),
    }));

    setData(pre =>({
      ...pre,
      data: pre.data.map((e) =>
        e.roomNumber === visible.self.roomNumber ? formData : e
      ),
    }))
  }

  async function supprimerChambre(){
    const res = await axiosInstance.delete("api/rooms/"+visible.self.id)
    window.location.reload()
  }
  useEffect(()=>{
    setFormData(visible.self)
  } , [visible]);

  
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
              self: initialRoomData, 
            });
            setFormData(initialRoomData);
          }}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-4 mb-4 grid-cols-2">
           
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
                {roomStatuses.map((e , i) => (
                  <option key={i} value={e.id}>{e.value}</option>
                ))}
              </select>
            </div>

         
            
           
            <div className="col-span-2 flex gap-3 mt-6 items-center">
              <button
                type="submit"
                className="text-white bg-primary-100 cursor-pointer hover:bg-primary-500 w-full font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Sauvegarder 
              </button>
              <button
              onClick={supprimerChambre}
                type="button"
                className="text-white bg-red-100 cursor-pointer hover:bg-red-500 w-full font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Supprimer
              </button>
            </div>
           </div>
        
        </form>
      </div>
    </div>
  );
}
