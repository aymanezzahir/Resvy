import { cn } from "lib/util";
import { Link, NavLink } from "react-router";
import { sidebarItems } from "~/constants";

export default function NavBar() {
  return (
    <section className="nav-items">
      <Link to="/" className="link-logo">
        <img src="/assets/icons/logo.svg" alt="logo" className="size-[30px]" />
        <h1>Resvy</h1>
      </Link>

      <div className="container">
        <nav>
          {sidebarItems.map(({id , href , label , icon}) => (
            <NavLink to={href} key={id}>
              {({isActive} : {isActive : boolean}) => (

                <div className={cn("group nav-item" , { "bg-primary-100 text-white": isActive}
                )}
                
                >
                  <img src={icon} alt={label} className={ `group-hover:brightness-0 size-0 group-hover:invert ${isActive ? "invert brightness-0" : "text-dark-200"}`} />
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
