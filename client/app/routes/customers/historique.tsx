import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
} from "@syncfusion/ej2-react-grids";
import {  cn, formatDate } from "lib/util";
import { EditReservationPopup, Header } from "~/components";

import { useEffect, useState } from "react";
import axiosInstance from "lib/axios";
export default function Historique() {
  const [visible, setvisisble] = useState<{
    visible: boolean;
    selectedID: string | null;
    data: Booking[];
  }>({ visible: false, data: [], selectedID: null });


  useEffect(() => {
    async function getHistorique() {

      const res = await axiosInstance.get("api/bookings/user/" +localStorage.getItem("ui"));
  
      console.log(res.data)
      setvisisble(e => ({
        ...e,
        data : res.data
      }))
      
    }

    getHistorique();
  } , []);
  return (
    <main className="wrapper all-users">
      <Header
        title="Carnet de réservations 📖"
        description=""
      />

    {visible.data.length > 0 && <GridComponent
        dataSource={visible.data}
       
        
        
      >
        <ColumnsDirective>
          
      
          <ColumnDirective
            field="roomNumber"
            headerText="N.chambre"
            width="80"
            textAlign="Left"
          />
          <ColumnDirective
            field="checkInDate"
            headerText="Depart reserv."
            width="140"
            textAlign="Left"
            template={({ checkInDate }: { checkInDate: string }) =>
              formatDate(checkInDate)
            }
          />
          <ColumnDirective
            field="checkOutDate"
            headerText="Fin reserv."
            width="140"
            textAlign="Left"
            template={({ checkOutDate }: { checkOutDate: string }) =>
              formatDate(checkOutDate)
            }
          />
          <ColumnDirective
            field="status"
            headerText="Statut"
            width="120"
            textAlign="Left"
            template={({ status }: Booking) => {
              const statusStyles: {
                [key: string]: {
                  bg: string;
                  dot: string;
                  text: string;
                };
              } = {
                CONFIRMED: {
                  bg: "bg-success-50",
                  dot: "bg-success-500",
                  text: "text-success-700",
                },
                
                Terminée: {
                  bg: "bg-purple-50",
                  dot: "bg-purple-500",
                  text: "text-purple-700",
                },
                CANCELLED: {
                  bg: "bg-red-50",
                  dot: "bg-red-500",
                  text: "text-red-700",
                },
              };

              const current = statusStyles[status] || {
                bg: "bg-gray-100",
                dot: "bg-gray-400",
                text: "text-gray-600",
              };

              return (
                <article
                  className={cn(
                    "status-column px-1 py-1 flex justify-start gap-2 rounded",
                    current.bg
                  )}
                >
                  <div className={cn("size-1.5 rounded-full", current.dot)} />
                  <h3
                    className={cn(
                      "font-inter text-xs font-medium",
                      current.text
                    )}
                  >
                    {status}
                  </h3>
                </article>
              );
            }}
          />
        </ColumnsDirective>
      </GridComponent>
}

     
    </main>
  );
}
