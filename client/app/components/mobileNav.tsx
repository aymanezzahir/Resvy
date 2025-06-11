import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import { Link } from "react-router";
import NavBar from "./navbar";

export default function Mobilenav() {
    // define side bar component
    let sidebar : SidebarComponent;

    function toogleSidebar(){
        sidebar.toggle()
    }

  return (
    <div className="mobile-sidebar wrapper">
        <header>
            <Link to={"/"}>
                <img src="/assets/icons/logo.svg" alt="logo" className="size-[30px]" />
                <h1>Resvy</h1>
            </Link>

            <button onClick={() => sidebar.toggle()}>
                <img className="size-[30px]" src="/assets/icons/menu.svg" alt="menu icon" />
            </button>
        </header>

        <SidebarComponent
            width={270}
            type="over"
            ref={(navbar)=> sidebar = navbar}
            created={toogleSidebar}
            showBackdrop={true}
            closeOnDocumentClick={true}
        >
            <NavBar toogleSidebar={toogleSidebar}/>
        </SidebarComponent>
    </div>
  )
}
