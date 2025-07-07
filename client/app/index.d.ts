declare interface BaseUser {
  id: string;
  name: string;
  email: string;
  dateJoined: string;
  imageUrl: string;
}
declare interface Reservation {
  id: string;
  nChambre: number;
  starRoom: number;
  checkInDate: string; // Format: YYYY-MM-DD
  checkOutDate: string; // Format: YYYY-MM-DD
  specialRequests?: string; // Optional
  paymentMethod:
    | "Carte de crédit"
    | "Espèces à l'arrivée"
    | "PayPal"
    | "Carte bancaire"
    | "Virement bancaire";
  status: "Confirmée" | "Terminée" | "Annulée" | "En cours";
}

declare interface RoomCreateDTO {
  id : number
  roomNumber: string; // required, max length 10
  typeId: number; // required
  floor: number; // required, must be >= 0
  price: number; // required, must be >= 0
  description?: string;
  status: 'AVAILABLE' | 'BOOKED' | 'MAINTENANCE'; // optional, default can be handled in backend
  images: {url : string , isPrimary : boolean}[]; // optional image URL
  type? : RoomType
}


declare interface RoomStatus {
  id: 'AVAILABLE' | 'BOOKED' | 'MAINTENANCE';
  value: string;
}
interface RoomType {
  id: number;
  name: string;
  maxOccupancy: number;
  // add any other fields you have in type object here
}

interface Image {
  id: number;
  url: string;
  isPrimary: boolean;
}

interface Room {
  id: number;
  roomNumber: string;
  status: 'AVAILABLE' | 'BOOKED' | 'MAINTENANCE'; // or string if more flexible
  floor: number;
  price: number;
  description?: string;
  type: RoomType;
  images: Image[];
}


declare interface StatsCard {
  headerTitle: string;
  total: number;
  lastMonthCount: number;
  currentMonthCount: number;
}

declare interface CardProps {
  containerClass?: string; 
  bigCard?: boolean; 
  rating: number; 
  title: string; 
  activityCount: number; 
  bgImage: string; 
}

declare interface UserDTO  {
  id: number;
  username: string;
  email: string;
  fullName: string;
  role: Role;
  createdAt: Date;
};

 type Role = 'ROLE_ADMIN' | 'ROLE_CUSTOMER';

declare interface UserDetailsResponse {
  id: number;
  username: string;
  email: string;
  fullName: string;
  role: Role;
  createdAt: string | null;
}

declare interface RoomType {
  id: number;
  name: string;
  maxOccupancy: number;
  description: string;
}

declare interface Booking  {
  id: number;
  roomId: number;
  roomNumber: string;
  userId: number;
  username: string;
  checkInDate: string;  
  checkOutDate: string; 
  amount? : string,
  status: "CONFIRMED" | "COMPLETED" | "CANCELLED"; 
  createdAt: string | null;
};
