import { type RouteConfig, index , layout, route} from "@react-router/dev/routes";


export default [
    index("routes/home.tsx"),
    route("signup" , "routes/signup.tsx"),
    route("login" , "routes/login.tsx"),

    layout("routes/admin/layout.tsx" , [
        route("dashboard" , "routes/admin/dashboard.tsx"),
        route("all-users" , "routes/admin/all-user.tsx"),
        route("reservation" , "routes/admin/reservation.tsx"),

    ])
] satisfies RouteConfig;