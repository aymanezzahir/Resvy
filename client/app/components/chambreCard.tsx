import { useState } from "react";
import EditChambre from "./Popups/editunchambre";
import { cn } from "lib/util";
import { roomStatuses } from "~/constants";
import { getRoomStatusStyles, getRoomTypeStyles } from "./chambreCard-client";

const ChambreCard = ({
  data,
  setData,
  RoomType,
  ...props
}: RoomCreateDTO & {
  data: RoomCreateDTO[];
  setData: React.Dispatch<
    React.SetStateAction<{
      visible: boolean;
      data: RoomCreateDTO[];
    }>
  >;
  RoomType : RoomType[]
}) => {
  const [visible, setVisible] = useState<{
    visible: boolean;
    data: RoomCreateDTO[];
    self: RoomCreateDTO;
  }>({
    visible: false,
    data: data,
    self: props,
  });

  const { roomNumber, type, floor, images, description, price, status } = props;

  return (
    <>
      <button
        onClick={() =>
          setVisible({
            visible: true,
            data: data,
            self: props,
          })
        }
        className="trip-card  flex flex-col rounded-lg shadow-md overflow-hidden bg-white hover:shadow-lg transition-shadow"
        type="button"
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
      </button>

      <EditChambre setData={setData} setVisible={setVisible} visible={visible} RoomType={RoomType} />
    </>
  );
};

export default ChambreCard;
