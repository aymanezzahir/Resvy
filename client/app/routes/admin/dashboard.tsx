import { Header, Stats } from "~/components";

export default function Dashboard(){

      // fake data
    const dashboardStats = {
        totalUsers: 1237,
        usersJoined: { currentMonth: 218, lastMonth: 176 },
        totalTrips: 118,
        tripsCreated: { currentMonth: 6, lastMonth: 2 },
        userRole: { total: 62, currentMonth: 63, lastMonth: 78 },
    };

    const {totalUsers , usersJoined, totalTrips, tripsCreated, userRole} = dashboardStats

    return (
        <main className="dashboard wrapper">
            <Header
                title = "Bienvenue à bord, Capitaine ! 🚀"
                description = "Gérez vos réservations, suivez l’activité des utilisateurs et surveillez les performances de votre hôtel — tout depuis votre tableau de bord central. Prêt à offrir des séjours inoubliables ? ✨"
            />

            <Stats 
                headerTitle="Total Utilisateur"
                total={totalUsers}
                currentMonthCount={usersJoined}
                lastMonthCount={usersJoined}
            />
            
             <Stats 
                headerTitle="Total Utilisateur"
                total={totalUsers}
                currentMonthCount={usersJoined}
                lastMonthCount={usersJoined}
            />
            
             <Stats 
                headerTitle="Total Utilisateur"
                total={totalUsers}
                currentMonthCount={usersJoined}
                lastMonthCount={usersJoined}
            />
            
        </main> 
    )
}