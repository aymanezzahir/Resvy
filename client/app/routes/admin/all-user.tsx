import { Header } from "~/components";
import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
  Search,
  Toolbar,
  Inject,
} from "@syncfusion/ej2-react-grids";
import { calculateTotal, cn, formatDate } from "lib/util";

export default function AllUser() {
  return (
    <main className="dashboard wrapper">
      <Header
        title="Carnet d’invités 📖🌟"
        description="Accédez à la liste complète de vos clients : fidèles voyageurs ou nouveaux venus. Apprenez à mieux les connaître pour mieux les servir !"
      />

      <GridComponent
        dataSource={[]}
        allowFiltering={true}
        allowPaging={true}
        allowSorting={true}
        toolbar={["Search"]}
        pageSettings={{ pageSize: 6 }}
      >
        <Inject services={[Search, Toolbar]} />
        <ColumnsDirective>
          <ColumnDirective
            field=""
            headerText=""
            width="70"
            textAlign="Left"
            template={(props: UserDTO) => (
              <button
                className="cursor-pointer"
                onClick={() =>
                console.log("click")
                }
              >
                <img width={30} src="/assets/icons/edit.svg" />
              </button>
            )}
          />
          <ColumnDirective
            field="name"
            headerText="Nom complet"
            width="200"
            textAlign="Left"
            filter={{ type: "Menu" }}
            template={(props: UserDTO) => <span>{props.fullName}</span>}
          />
           <ColumnDirective
            field="email"
            headerText="Email"
            width="200"
            textAlign="Left"
            filter={{ type: "Menu" }}
            template={(props: UserDTO) => <span>{props.fullName}</span>}
          />
          <ColumnDirective
            field="role"
            headerText="role"
            width="200"
            textAlign="Left"
            filter={{ type: "Menu" }}
            template={(props: Reservation) => <span>{props.fullName}</span>}
          />
          
         
          
          
          
          
          
          
        </ColumnsDirective>
      </GridComponent>
    </main>
  );
}
