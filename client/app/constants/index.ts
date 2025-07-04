
import type { AxisModel } from "@syncfusion/ej2-react-charts";

export const sidebarItems = [
  {
    id: 1,
    icon: "/assets/icons/home.svg",
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    id: 2,
    icon: "/assets/icons/itinerary.svg",
    label: "Reservation",
    href: "/reservation",
  },
  
  {
    id: 2,
    icon: "/assets/icons/bed.svg",
    label: "Chambres",
    href: "/chambres",
  },
  {
    id: 2,
    icon: "/assets/icons/cutlery.svg",
    label: "Menu",
    href: "/menu",
  },

  {
    id: 4,
    icon: "/assets/icons/users.svg",
    label: "Utilisateur",
    href: "/all-users",
  },
  
];

export const userData = [
  { day: "Mon", count: 120 },
  { day: "Tue", count: 200 },
  { day: "Wed", count: 150 },
  { day: "Thu", count: 23 },
  { day: "Fri", count: 180 },
  { day: "Sat", count: 90 },
  { day: "Sun", count: 160 },
];


export const chartOneData: object[] = [
  {
    x: "Jan",
    y1: 0.5,
    y2: 1.5,
    y3: 0.7,
  },
  {
    x: "Feb",
    y1: 0.8,
    y2: 1.2,
    y3: 0.9,
  },
  {
    x: "Mar",
    y1: 1.2,
    y2: 1.8,
    y3: 1.5,
  },
  {
    x: "Apr",
    y1: 1.5,
    y2: 2.0,
    y3: 1.8,
  },
  {
    x: "May",
    y1: 1.8,
    y2: 2.5,
    y3: 2.0,
  },
  {
    x: "Jun",
    y1: 2.0,
    y2: 2.8,
    y3: 2.5,
  },
];

export const RoomType = [
  "Standard",
  "Familaire",
  "Lux"
];
export const RoomStatus = [
  "Disponible",
  "Occupée",
  "Maintenance"
];

export const interests = [
  "Food & Culinary",
  "Historical Sites",
  "Hiking & Nature Walks",
  "Beaches & Water Activities",
  "Museums & Art",
  "Nightlife & Bars",
  "Photography Spots",
  "Shopping",
  "Local Experiences",
];

export const budgetOptions = ["Budget", "Mid-range", "Luxury", "Premium"];

export const groupTypes = ["Solo", "Couple", "Family", "Friends", "Business"];

export const footers = ["Terms & Condition", "Privacy Policy"];

export const selectItems = [
  "groupType",
  "travelStyle",
  "interest",
  "budget",
] as (keyof TripFormData)[];


export const userXAxis: AxisModel = { valueType: "Category", title: "📅 Jour de la semaine" };
export const useryAxis: AxisModel = {
  minimum: 0,
  maximum: 300,
  interval: 25,
  title: "👥 Nombre d’utilisateurs",
};

export const tripXAxis: AxisModel = {
  valueType: "Category",
  title: "📅 Jour de la semaine",
  majorGridLines: { width: 0 },
};

export const tripyAxis: AxisModel = {
  minimum: 0,
  maximum: 10,
  interval: 2,
  title: "Nombre de Reservation",
};

export const CONFETTI_SETTINGS = {
  particleCount: 200, // Number of confetti pieces
  spread: 60, // Spread of the confetti burst
  colors: ["#ff0", "#ff7f00", "#ff0044", "#4c94f4", "#f4f4f4"], // Confetti colors
  decay: 0.95, // Gravity decay of the confetti
};

export const LEFT_CONFETTI = {
  ...CONFETTI_SETTINGS,
  angle: 45, // Direction of the confetti burst (90 degrees is top)
  origin: { x: 0, y: 1 }, // Center of the screen
};

export const RIGHT_CONFETTI = {
  ...CONFETTI_SETTINGS,
  angle: 135,
  origin: { x: 1, y: 1 },
};

export const reservations : Reservation[]= [
  {
    id: "e1e23221-7e1d-512f-997c-796949a456b9",
    fullName: "Claire Dupont",
    email: "claire.dupont@example.com",
    phone: "+33 6 45 78 12 34",
    numberOfGuests: 2,
    starRoom: 3,
    total : 40,
    checkInDate: "2025-07-15",
    checkOutDate: "2025-07-20",
    specialRequests: "Chambre avec vue sur la mer, lit bébé si possible",
    paymentMethod: "Carte de crédit",
    status: "Confirmée",
    nChambre: 231

  },
  {
    id: "ca94ea0d-2571-5024-9844-0231c88f6aec",
    fullName: "Mehdi Bensalem",
    email: "mehdi.bensalem@gmail.com",
    phone: "+212 6 22 11 33 44",
    numberOfGuests: 1,
    total : 20,
    starRoom: 1,
    checkInDate: "2025-08-01",
    checkOutDate: "2025-08-05",
    specialRequests: "Arrivée tardive vers 23h",
    paymentMethod: "Espèces à l'arrivée",
    status: "En cours",
    nChambre: 265

  },
  {
    id: "1ea36757-78b4-5f99-92b5-6271cb2be078",
    fullName: "Lucas Martin",
    email: "lucas.martin@protonmail.com",
    phone: "+33 7 88 66 55 44",
    numberOfGuests: 4,
    starRoom: 2,
    total : 30,
    checkInDate: "2025-09-10",
    checkOutDate: "2025-09-17",
    specialRequests: "Allergie au gluten – repas sans gluten si possible",
    paymentMethod: "PayPal",
    status: "Annulée",
    nChambre: 3

  },
  {
    id: "6250f748-1e18-5d80-9563-db54015d47f5",
    fullName: "Nora El Idrissi",
    email: "nora.elidrissi@gmail.com",
    phone: "+212 6 78 90 12 34",
    numberOfGuests: 3,
    total : 80,
    starRoom: 5,
    checkInDate: "2025-10-05",
    checkOutDate: "2025-10-10",
    specialRequests: "Proche ascenseur, étage élevé",
    paymentMethod: "Carte bancaire",
    status: "Confirmée",
    nChambre: 253

  },
  {
    id: "19c7bf9d-afc2-57f1-8152-975a9c2a0c7a",
    fullName: "Jean-Pierre Roux",
    email: "jproux@orange.fr",
    phone: "+33 6 11 22 33 44",
    numberOfGuests: 2,
    starRoom: 4,
    total : 40,
    checkInDate: "2025-11-01",
    checkOutDate: "2025-11-04",
    specialRequests: "Petit déjeuner au lit",
    paymentMethod: "Virement bancaire",
    status: "Terminée",
    nChambre: 240

  }
];
