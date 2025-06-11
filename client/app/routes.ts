import { type RouteConfig, index , layout, route} from "@react-router/dev/routes";


export default [
    layout("routes/admin/layout.tsx" , [
        route("dashboard" , "routes/admin/dashboard.tsx"),
        route("all-users" , "routes/admin/all-user.tsx"),

    ])
] satisfies RouteConfig;