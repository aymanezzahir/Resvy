import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
  Search,
  Toolbar,
  Inject,
} from "@syncfusion/ej2-react-grids";
import { calculateTotal, cn, formatDate } from "lib/util";
import { EditReservationPopup, Header } from "~/components";

import { useEffect, useState } from "react";
import axiosInstance from "lib/axios";

export default function Reservation() {
  const [visible, setvisisble] = useState<{
    visible: boolean;
    selectedID: string | null;
    data: Booking[];
  }>({ visible: false, data: [], selectedID: null });


  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axiosInstance.get("/api/bookings");
        setvisisble(pre => ({ ...pre, data: data.data }));
        console.log(data);
      } catch (err: any) {
        console.error(err);
      }
    };

    getData();
  }, []);


  return (
    <main className="wrapper all-users">
      <Header
        title="Carnet de réservations 📖"
        description="Consultez, gérez et organisez toutes les réservations de vos clients."
      />

      
      {visible.data.length > 0 && (
        <GridComponent dataSource={visible.data} >
          <ColumnsDirective>
            <ColumnDirective
              field=""
              headerText=""
              width="70"
              textAlign="Left"
              template={(props: Booking) => (
                <button
                  className="cursor-pointer"
                  onClick={() =>
                    setvisisble(() => ({
                      visible: true,
                      data: visible.data,
                      selectedID: props.id.toString(),
                    }))
                  }
                >
                  <img width={30} src="/assets/icons/edit.svg" />
                </button>
              )}
            />
            <ColumnDirective
              field="username"
              headerText="Nom Utilisateur"
              width="200"
              textAlign="Left"
              template={(props: Booking) => <span>{props.username}</span>}
            />

            <ColumnDirective
              field="roomNumber"
              headerText="N.chambre"
              width="80"
              textAlign="Left"
            />
            <ColumnDirective
              field="checkInDate"
              headerText="Date d’arrivée"
              width="140"
              textAlign="Left"
              template={({ checkInDate }: { checkInDate: string }) =>
                formatDate(checkInDate)
              }
            />
            <ColumnDirective
              field="checkOutDate"
              headerText="Date de départ"
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
                  COMPLETED: {
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
          <Inject services={[Toolbar, Search]} />
        </GridComponent>
      )}
      <EditReservationPopup visible={visible} setVisible={setvisisble} />
    </main>
  );
}