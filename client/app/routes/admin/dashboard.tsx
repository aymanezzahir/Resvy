import { Header, Stats as StatsCard } from "~/components";

export default function Dashboard(){

      // fake data
    const dashboardStats = {
        totalUsers: 1237,
        usersJoined: { currentMonth: 218, lastMonth: 176 },
        totalTrips: 118,
        tripsCreated: { currentMonth: 6, lastMonth: 2 },
        userRole: { total: 62, currentMonth: 63, lastMonth: 78 },
    };

    

    return (
        <main className="dashboard wrapper">
            <Header
                title = "Bienvenue à bord, Capitaine ! 🚀"
                description = "Gérez vos réservations, suivez l’activité des utilisateurs et surveillez les performances de votre hôtel — tout depuis votre tableau de bord central. Prêt à offrir des séjours inoubliables ? ✨"
            />

           <section className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    <StatsCard
                        headerTitle="Total Utilisateurs"
                        total={dashboardStats.totalUsers}
                        currentMonthCount={dashboardStats.usersJoined.currentMonth}
                        lastMonthCount={dashboardStats.usersJoined.lastMonth}
                    />
                    <StatsCard
                        headerTitle="Total Reservation"
                        total={dashboardStats.totalTrips}
                        currentMonthCount={dashboardStats.tripsCreated.currentMonth}
                        lastMonthCount={dashboardStats.tripsCreated.lastMonth}
                    />
                    <StatsCard
                        headerTitle="Active Users"
                        total={dashboardStats.userRole.total}
                        currentMonthCount={dashboardStats.userRole.currentMonth}
                        lastMonthCount={dashboardStats.userRole.lastMonth}
                    />
                </div>
            </section>
        </main> 
    )
}