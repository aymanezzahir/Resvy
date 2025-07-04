import { useState } from "react";
import { AjouteUnChambre } from ".";

import EditChambre from "./Popups/editunchambre";

const ChambreCard = ({data , ...props}: RoomCreateDTO & {data : RoomCreateDTO[]}) => {
  const [visible, setvisisble] = useState<{
    visible: boolean;
    data: RoomCreateDTO[];
    self : RoomCreateDTO
  }>({
    visible: false,
    data:data,
    self: props
  });


  const {
  roomNumber,
  typeId,
  floor,
  imgURL,
  description,
  price,
  status,
} = props;

  return (
    <button onClick={() => setvisisble(() => ({
      visible : true,
      data : data,
      self : props
    }))} className="trip-card">
      <img src={imgURL[0]} alt={"photo"} />

      <article>
        <h2>{roomNumber}</h2>
        <p>{description}</p>
        <figure>
          <img
            src="/assets/icons/location-mark.svg"
            alt="location"
            className="size-4"
          />
          <figcaption>{status}</figcaption>
        </figure>
      </article>

      <article className="tripCard-pill">{price}</article>
      <EditChambre visible={visible} setVisible={setvisisble}  />
    </button>
  );
};
export default ChambreCard;
