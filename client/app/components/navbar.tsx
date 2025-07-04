import { cn } from "lib/util";
import { Link, NavLink } from "react-router";
import { sidebarItems } from "~/constants";

export default function NavBar({toogleSidebar} : {toogleSidebar? : () => void}) {

  // dumb data
  const user = {
    name : "ayman",
    email : "aymanefront2004@gmail.com",

  }
  return (
    <section className="nav-items">
      <Link to="/" className="link-logo">
        <img src="/assets/logo.png" width={30} />
        <h1>Resvy</h1>
      </Link>

      <div className="container">
        <nav>
          {sidebarItems.map(({id , href , label , icon}) => (
            <NavLink to={href} key={id} onClick={toogleSidebar}>
              {({isActive} : {isActive : boolean}) => (

                <div className={cn("group nav-item" , { "bg-primary-100 text-white": isActive}
                )}
                
                >
                  <img src={icon} alt={label} className={ `group-hover:brightness-0  group-hover:invert ${isActive ? "invert brightness-0" : "text-dark-200"}`} />
                  {label}
                </div>
              )}

              
            </NavLink>
          ))}
        </nav>
      </div>
    </section>
  )
}
