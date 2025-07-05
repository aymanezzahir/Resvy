import { useState } from "react";
import { useNavigate } from "react-router";
import ChambreCard from "~/components/chambreCard";
import { Header } from "~/components";
import ChambreCardClient from "~/components/chambreCard-client";

export default function Chambres() {
  const [rooms, setRooms] = useState<RoomCreateDTO[]>([
    {
      roomNumber: "101",
      typeId: 1,
      floor: 1,
      price: 120,
      description: "Chambre avec vue sur mer",
      status: "Disponible",
      imgURL: ["/assets/images/sample.jpeg"],
      type: "Double",
    },
    {
      roomNumber: "102",
      typeId: 2,
      floor: 1,
      price: 90,
      description: "Chambre simple confortable",
      status: "Occupée",
      imgURL: ["/assets/images/sample1.jpg"],
      type: "Simple",
    },
    // Add more mock rooms or fetch from API
  ]);


  return (
    <main className="dashboard wrapper">
      <Header
        title="Toutes les Chambres"
        description="Cliquez sur une chambre pour plus de détails."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.map((room) => (
          <ChambreCardClient data={room}/>
        ))}
      </div>
    </main>
  );
}
