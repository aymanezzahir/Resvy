import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import { Link } from "react-router";
import NavBar from "./navbar";
import { Category, ChartComponent, ColumnSeries, DataLabel, Inject, SeriesCollectionDirective, SeriesDirective, SplineAreaSeries, Tooltip } from "@syncfusion/ej2-react-charts";
import { tripXAxis, tripyAxis, userXAxis, useryAxis } from "~/constants";

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
                <img src="/assets/logo.png" alt="logo" className="size-[30px]" />
                <h1>Resvy</h1>
            </Link>

            <button onClick={() => sidebar.toggle()}>
                <img className="size-[30px]" src="/assets/icons/menu.svg" alt="menu icon" />
            </button>
        </header>

        <SidebarComponent
            width={270}
          
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
