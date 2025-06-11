import { cn } from "lib/util";
import { useLocation } from "react-router";

export default function Header({title , description} : {title : string , description : string}) {

    // recuperer url
    const path = useLocation();
  return (
    <header className="header">
        <article>
            <h1 className={cn("text-dark-100 " + (path.pathname === "/" ? "text-2xl md:text-4xl font-bold" : "text-xl md:text-2xl font-semibold"))}>
                {title}
            </h1>

               <p className={cn("text-gray-100 font-normal" + (path.pathname === "/" ? "text-base md:text-lg" : "text-sm md:text-lg"))}>
                {description}
            </p>
        </article>
    </header>
  )
}

