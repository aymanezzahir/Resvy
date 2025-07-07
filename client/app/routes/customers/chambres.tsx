import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ChambreCard from "~/components/chambreCard";
import { Header } from "~/components";
import ChambreCardClient from "~/components/chambreCard-client";
import axios from "axios";
import axiosInstance from "lib/axios";
import { roomStatuses } from "~/constants";

export default function Chambres() {
  const [filter, setFilter] = useState({
  status: "",
  type: 0,
  maxPrice: Infinity,
});
  const [rooms, setRooms] = useState<RoomCreateDTO[]>([]);
  const [RoomType, setRoomType] = useState<RoomType[]>([]);
    useEffect(()=> {
    async function getAllRoom(){
       try {
        const res = await axiosInstance.get("api/rooms/types");
        const data = res.data;
      
       setRoomType(data)
      } catch (err) {
        // Not logged in, that's fine
      } 
    }

    getAllRoom()
  } , []);
  useEffect(()=> {
    async function getAllRoom(){
       try {
        const res = await axiosInstance.get("/api/rooms");
        const data = res.data;
        
       setRooms(data)
      } catch (err) {
        // Not logged in, that's fine
      } 
    }

    getAllRoom()
  } , []);

const filteredRooms = rooms.filter((room) => {
  const matchStatus = filter.status ? room.status === filter.status : true;
  const matchType = filter.type ? (room?.type?.id || "") === filter.type : true;
  const matchPrice = room.price <= filter.maxPrice;
  return matchStatus && matchType && matchPrice;
});
  return (
    <main className="dashboard wrapper">
      <Header
        title="Toutes les Chambres"
        description="Cliquez sur une chambre pour reserver."
      />

      <div className="mb-4 flex flex-col sm:flex-row gap-4 items-start sm:items-end">
        
  <select
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
    onChange={(e) => setFilter(f => ({ ...f, status: e.target.value }))}
    value={filter.status}
  >
    <option value="">Tous les statuts</option>
    
      {roomStatuses.map(e=> <option key={e.id} value={e.id}>{e.value}</option>)}
  </select>

  <select
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
    onChange={(e) => setFilter(f => ({ ...f, type: +e.target.value }))}
    value={filter.type}
  >
    <option value="">Tous les types</option>
      {RoomType.map(e=> <option key={e.id} value={e.id}>{e.name}</option>)}
  </select>

  <input
    type="number"
    placeholder="Prix max"
   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
    onChange={(e) => {
      const price = parseFloat(e.target.value);
      setFilter(f => ({ ...f, maxPrice: isNaN(price) ? Infinity : price }));
    }}
  />
</div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRooms.map((room) => (
          <ChambreCardClient key={room.id} data={room}/>
        ))}
      </div>
    </main>
  );
}
