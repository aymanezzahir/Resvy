import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import 'dayjs/locale/fr'; // importer le locale français

dayjs.locale('fr');


export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const formatDate = (dateString: string): string => {
    return dayjs(dateString).format("MMMM DD, YYYY");
};

export function parseMarkdownToJson(markdownText: string): unknown | null {
    const regex = /```json\n([\s\S]+?)\n```/;
    const match = markdownText.match(regex);

    if (match && match[1]) {
        try {
            return JSON.parse(match[1]);
        } catch (error) {
            console.error("Error parsing JSON:", error);
            return null;
        }
    }
    console.error("No valid JSON found in markdown text.");
    return null;
}

export function parseTripData(jsonString: string): Trip | null {
    try {
        const data: Trip = JSON.parse(jsonString);

        return data;
    } catch (error) {
        console.error("Failed to parse trip data:", error);
        return null;
    }
}

export function calculateTotal(start : number, nbr : number) {
  const maxStart = 5;
  const baseRate = Math.min(start, maxStart); // limit start to 5
  const extraPerPerson = 20;
  const extraPeople = Math.max(nbr - 1, 0);
  const total = baseRate + (extraPerPerson * extraPeople);
  return total;
}

export function calculateRoomPrice(
  pricePerNight: number,
  checkIn: string,
  checkOut: string
): number {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

  return Math.round(pricePerNight * days * 100) / 100;
}
export function getRandomCardType(): string {
  const cardTypes = ["Visa", "MasterCard", "American Express", "Discover", "Diners Club", "JCB", "UnionPay"];
  const index = Math.floor(Math.random() * cardTypes.length);
  return cardTypes[index];
}

export function getFirstWord(input: string = ""): string {
    return input.trim().split(/\s+/)[0] || "";
}

export const calculateTrendPercentage = (
    countOfThisMonth: number,
    countOfLastMonth: number
): TrendResult => {
    if (countOfLastMonth === 0) {
        return countOfThisMonth === 0
            ? { trend: "no change", percentage: 0 }
            : { trend: "increment", percentage: 100 };
    }

    const change = countOfThisMonth - countOfLastMonth;
    const percentage = Math.abs((change / countOfLastMonth) * 100);

    if (change > 0) {
        return { trend: "increment", percentage };
    } else if (change < 0) {
        return { trend: "decrement", percentage };
    } else {
        return { trend: "no change", percentage: 0 };
    }
};

