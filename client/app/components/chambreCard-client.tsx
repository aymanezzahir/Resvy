import { useState } from "react";
import EditChambre from "./Popups/editunchambre";
import { Link } from "react-router";
import { roomStatuses } from "~/constants";
import { cn } from "lib/util";

const ChambreCardClient = ({ data }: { data: RoomCreateDTO }) => {
  const { roomNumber,type , floor, images, description, price, status , id } =
    data;

  return (
    <>
      <Link
        to={status == "AVAILABLE" ? `/reserve?roomID=${id}` : "."}
        className={cn("trip-card  flex flex-col rounded-lg shadow-md overflow-hidden bg-white hover:shadow-lg transition-all duration-500 w-full max-w-sm" , {"hover:scale-105" : status == "AVAILABLE" , 
          "cursor-not-allowed" :status != "AVAILABLE"
        }


        )}
       
      >
        {images && images.length > 0 ? (
          <img
            src={images[0].url}
            alt={`Photo chambre ${roomNumber}`}
            className="w-full h-40 object-cover"
          />
        ) : (
          <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
            Pas d'image
          </div>
        )}

        <article className="p-4 flex flex-col flex-grow">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold mb-1">
              Chambre #{roomNumber}
            </h2>
            <div className={cn(getRoomStatusStyles(status).bg , "p-2 flex gap-2 items-center  rounded-2xl") }>
              {status == "AVAILABLE" && <span className="w-2 h-2 rounded-full animate-pulse bg-green-700"></span>}
              <span className={cn(getRoomStatusStyles(status).text , "font-bold")}>{roomStatuses.filter((e) => e.id == status)[0].value}</span>
            </div>
          </div>
          <p className="text-gray-700 flex-grow mb-2 line-clamp-3">
            {description}. Étage: {floor}
          </p>

          

          <div className="tripCard-pill text-right font-bold text-primary-600 text-lg">
            {price} €/jour
          </div>
          <div className={cn("tripCard-pill-2 text-right font-bold text-primary-600 text-lg" ,getRoomTypeStyles(type?.name || "").bg)}>
            {type?.name}
          </div>
        </article>
      </Link>
    </>
  );
};

type StatusStyle = {
  bg: string;
  dot: string;
  text: string;
};
export function getRoomStatusStyles(status: string): StatusStyle {
  const styles: Record<string, StatusStyle> = {
    AVAILABLE: {
      bg: "bg-green-200",
      dot: "bg-green-500",
      text: "text-green-700",
    },
    BOOKED: {
      bg: "bg-yellow-200",
      dot: "bg-yellow-500",
      text: "text-yellow-700",
    },
    MAINTENANCE: {
      bg: "bg-red-200",
      dot: "bg-red-500",
      text: "text-red-700",
    },
  };

  return (
    styles[status] || {
      bg: "bg-gray-100",
      dot: "bg-gray-400",
      text: "text-gray-600",
    }
  );
}




type RoomTypeStyle = {
  bg: string;
  text: string;
  border?: string; 
};

export function getRoomTypeStyles(typeName: string): RoomTypeStyle {
  const styles: Record<string, RoomTypeStyle> = {
    "Single Room": {
      bg: "bg-blue-200",
      text: "text-blue-700",
    },
    "Double Room": {
      bg: "bg-purple-200",
      text: "text-purple-700",
    },
    "Twin Room": {
      bg: "bg-indigo-200",
      text: "text-indigo-700",
    },
    "Deluxe Room": {
      bg: "bg-yellow-200",
      text: "text-yellow-800",
      border: "border border-yellow-300",
    },
    "Family Suite": {
      bg: "bg-teal-200",
      text: "text-teal-700",
    },
    "Presidential Suite": {
      bg: "bg-amber-200",
      text: "text-amber-800",
      border: "border-2 border-amber-400",
    },
    "Studio Room": {
      bg: "bg-pink-200",
      text: "text-pink-700",
    },
    "Accessible Room": {
      bg: "bg-green-200",
      text: "text-green-700",
    },
  };

  return (
    styles[typeName] || {
      bg: "bg-gray-100",
      text: "text-gray-600",
    }
  );
}


export default ChambreCardClient;
