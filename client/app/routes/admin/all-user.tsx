import { Header } from "~/components";
import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
  Search,
  Toolbar,
  Inject,
} from "@syncfusion/ej2-react-grids";

import axiosInstance from "lib/axios";
import { useEffect, useState } from "react";
import EditUser from "~/components/Popups/edit-user";

export const initialUser: UserDTO = {
  id: 0,
  username: "",
  email: "",
  fullName: "",
  role: "ROLE_CUSTOMER", 
  createdAt: new Date(), 
};

export default function AllUser() {
  const [users, setUsers] = useState<UserDetailsResponse[]>([]);
  const [visible, setvisisble] = useState<{visible : boolean , self : UserDTO}>({ visible: false , self : initialUser });
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axiosInstance.get("/api/users/all");
        console.log(data.data);
        setUsers(data.data);
      } catch (err: any) {
        console.error(err);
      }
    };

    getData();
  }, []);

  return (
    <main className="dashboard wrapper">
      <Header
        title="Carnet d’invités 📖🌟"
        description="Accédez à la liste complète de vos clients : fidèles voyageurs ou nouveaux venus. Apprenez à mieux les connaître pour mieux les servir !"
      />

     {users.length > 0 &&  <GridComponent
        dataSource={users}
        allowFiltering={true}
        allowPaging={true}
        allowSorting={true}
        pageSettings={{ pageSize: 6 }}
      >
        <ColumnsDirective>
          <ColumnDirective
            field=""
            headerText=""
            width="70"
            textAlign="Left"
            template={(props: UserDTO) => (
              <button
                className="cursor-pointer"
                onClick={() => setvisisble({visible : true , self : props})}
              >
                <img width={30} src="/assets/icons/edit.svg" />
              </button>
            )}
          />
          <ColumnDirective
            field="name"
            headerText="Nom Utilisateur"
            width="200"
            textAlign="Left"
            template={(props: UserDetailsResponse) => (
              <span>{props.username}</span>
            )}
          />
          <ColumnDirective
            field="name"
            headerText="Nom complet"
            width="200"
            textAlign="Left"
            template={(props: UserDetailsResponse) => (
              <span>{props.fullName}</span>
            )}
          />
          <ColumnDirective
            field="email"
            headerText="Email"
            width="200"
            textAlign="Left"
            template={(props: UserDetailsResponse) => (
              <span>{props.email}</span>
            )}
          />
          <ColumnDirective
            field="role"
            headerText="role"
            width="200"
            textAlign="Left"
            template={(props: UserDetailsResponse) => (
              <span>{props.role.split("_")[1].toLowerCase()}</span>
            )}
          />
        </ColumnsDirective>
      </GridComponent>
}
      {visible.visible && <EditUser self={visible.self} setVisible={setvisisble} />}
    </main>
  );
}
