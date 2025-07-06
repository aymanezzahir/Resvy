import { type RouteConfig, index , layout, route} from "@react-router/dev/routes";


export default [
    index("routes/home.tsx"),
    route("signup" , "routes/signup.tsx"),
    route("login" , "routes/login.tsx"),

    layout("routes/admin/layout.tsx" , [
        route("dashboard" , "routes/admin/dashboard.tsx"),
        route("all-users" , "routes/admin/all-user.tsx"),
        route("reservation" , "routes/admin/reservation.tsx"),
        route("chambres" , "routes/admin/chambre.tsx" ,  )
    ] ) , 
    
    layout("routes/customers/client-layout.tsx" , [
        route("reserve" , "routes/customers/reserve.tsx"),
        route("user/historique" , "routes/customers/historique.tsx"),
        route("user/settings" , "routes/customers/settings.tsx"),
        route("user/chambre" , "routes/customers/chambres.tsx")
    ])
    
] satisfies RouteConfig;