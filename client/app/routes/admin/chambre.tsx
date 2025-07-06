import axios from "axios";
import axiosInstance from "lib/axios";
import { useEffect, useState } from "react";
import { AjouteUnChambre, Header } from "~/components";
import ChambreCard from "~/components/chambreCard";
export function meta() {
  return [
    { title: "Chambres" },
    {
      property: "og:title",
      content: "Very cool app",
    },
  ];
}

export default function Chambre() {
  const [visible, setvisisble] = useState<{
    visible: boolean;
    data: RoomCreateDTO[];
  }>({ visible: false, data: [] });
const [RoomType, setRoomType] = useState<RoomType[]>([]);
    useEffect(()=> {
    async function getAllRoom(){
       try {
        const res = await axiosInstance.get("api/rooms");
        const data = res.data;
      
       setvisisble(pre=> ({
        ...pre , data
       }))
      } catch (err) {
        // Not logged in, that's fine
      } 
    }

    getAllRoom()
  } , []);

   useEffect(() => {
      async function GetTypeRoom() {
        const response = await axiosInstance.get("api/rooms/types");
  
        // The actual user list is in response.data
        const types = response.data;
        
        setRoomType(types);
  
        // Log it to the console
      }
  
      GetTypeRoom();
    }, []);
  

  return (
    <main className="dashboard wrapper">
      <div className="flex justify-between">
        <Header
          title="Gestion des chambres"
          description="Consultez, gérez et organisez toutes les réservations de vos clients."
        />
        <button
          onClick={() => setvisisble({ visible: true, data: visible.data})}
          className="text-white transition-all cursor-pointer bg-primary-100 min-w-max hover:bg-primary-500 focus:ring-4 focus:outline-none focus:ring-primary-100 flex items-center gap-x-2 font-medium rounded-lg px-5 py-2.5 text-center"
        >
          <img src="/assets/icons/plus.svg" className="w-5 h-5" />
          <p className="text-lg font-bold">Ajoute une chambre</p>
        </button>

        <AjouteUnChambre RoomType={RoomType} visible={visible} setVisible={setvisisble} />
      </div>
      <div className="grid grid-cols-3">
        {visible.data.map((e, i) => (
          <ChambreCard RoomType={RoomType} key={i + 66} {...e} data={visible.data} setData={setvisisble} />
        ))}
      </div>
    </main>
  );
}
