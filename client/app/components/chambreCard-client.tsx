import { useState } from "react";
import EditChambre from "./Popups/editunchambre";
import { Link } from "react-router";

const ChambreCardClient = ({data} :{data : RoomCreateDTO}) => {
  

  const { roomNumber, typeId, floor, imgURL, description, price, status } = data;

  return (
    <>
      <Link
        to={`/reserve?roomNumber=`}
        className="trip-card flex flex-col rounded-lg shadow-md overflow-hidden bg-white hover:shadow-lg transition-shadow w-full max-w-sm"
        type="button"
      >
        {imgURL && imgURL.length > 0 ? (
          <img
            src={imgURL[0]}
            alt={`Photo chambre ${roomNumber}`}
            className="w-full h-40 object-cover"
          />
        ) : (
          <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
            Pas d'image
          </div>
        )}

        <article className="p-4 flex flex-col flex-grow">
          <h2 className="text-xl font-semibold mb-1">Chambre #{roomNumber}</h2>
          <p className="text-gray-700 flex-grow mb-2 line-clamp-3">{description}</p>

          <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
            <span>Étage: {floor}</span>
            <span>Type ID: {typeId}</span>
            <span>Status: {status}</span>
          </div>

          <div className="tripCard-pill text-right font-bold text-primary-600 text-lg">
            {price} €
          </div>
        </article>
      </Link>

      
    </>
  );
};

export default ChambreCardClient;
