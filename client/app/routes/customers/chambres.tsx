import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ChambreCard from "~/components/chambreCard";
import { Header } from "~/components";
import ChambreCardClient from "~/components/chambreCard-client";
import axios from "axios";

export default function Chambres() {
  const [filter, setFilter] = useState({
  status: "",
  type: "",
  maxPrice: Infinity,
});
  const [rooms, setRooms] = useState<RoomCreateDTO[]>([]);


  useEffect(()=> {
    async function getAllRoom(){
       try {
        const res = await axios.get(
          "http://192.168.3.235:8080/api/rooms",
      
          { withCredentials: true }
        );
        const data = res.data;
        console.log(data)
       setRooms(data)
      } catch (err) {
        // Not logged in, that's fine
      } 
    }

    getAllRoom()
  } , []);

const filteredRooms = rooms.filter((room) => {
  const matchStatus = filter.status ? room.status === filter.status : true;
  const matchType = filter.type ? room.type === filter.type : true;
  const matchPrice = room.price <= filter.maxPrice;
  return matchStatus && matchType && matchPrice;
});
  return (
    <main className="dashboard wrapper">
      <Header
        title="Toutes les Chambres"
        description="Cliquez sur une chambre pour plus de détails."
      />

      <div className="mb-4 flex flex-col sm:flex-row gap-4 items-start sm:items-end">
  <select
    className="p-2 border rounded"
    onChange={(e) => setFilter(f => ({ ...f, status: e.target.value }))}
    value={filter.status}
  >
    <option value="">Tous les statuts</option>
    <option value="Disponible">Disponible</option>
    <option value="Occupée">Occupée</option>
  </select>

  <select
    className="p-2 border rounded"
    onChange={(e) => setFilter(f => ({ ...f, type: e.target.value }))}
    value={filter.type}
  >
    <option value="">Tous les types</option>
    <option value="Simple">Simple</option>
    <option value="Double">Double</option>
  </select>

  <input
    type="number"
    placeholder="Prix max"
    className="p-2 border rounded"
    onChange={(e) => {
      const price = parseFloat(e.target.value);
      setFilter(f => ({ ...f, maxPrice: isNaN(price) ? Infinity : price }));
    }}
  />
</div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRooms.map((room) => (
          <ChambreCardClient data={room}/>
        ))}
      </div>
    </main>
  );
}
