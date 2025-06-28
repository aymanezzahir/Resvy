import { Category, ChartComponent, ColumnSeries, DataLabel, Inject, SeriesCollectionDirective, SeriesDirective, SplineAreaSeries, Tooltip } from "@syncfusion/ej2-react-charts";
import { Header, Stats as StatsCard } from "~/components";
import { tripXAxis, tripyAxis, userData, userXAxis, useryAxis } from "~/constants";

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


             <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <ChartComponent
                    id="chart-1"
                    primaryXAxis={userXAxis}
                    primaryYAxis={useryAxis}
                    title="📈 Croissance hebdomadaire des utilisateurs 🚀"
                    tooltip={{ enable: true}}
                >
                    <Inject services={[ColumnSeries, SplineAreaSeries, Category, DataLabel, Tooltip]} />

                    <SeriesCollectionDirective>
                        <SeriesDirective
                            dataSource={userData}
                            xName="day"
                            yName="count"
                            type="Column"
                            name="Column"
                            columnWidth={0.3}
                            cornerRadius={{topLeft: 10, topRight: 10}}
                        />

                        <SeriesDirective
                            dataSource={{}}
                            xName="day"
                            yName="count"
                            type="SplineArea"
                            name="Wave"
                            fill="rgba(71, 132, 238, 0.3)"
                            border={{ width: 2, color: '#4784EE'}}
                        />
                    </SeriesCollectionDirective>
                </ChartComponent>

                <ChartComponent
                    id="chart-2"
                    primaryXAxis={tripXAxis}
                    primaryYAxis={tripyAxis}
                    title="Reservation ce semaine"
                    tooltip={{ enable: true}}
                >
                    <Inject services={[ColumnSeries, SplineAreaSeries, Category, DataLabel, Tooltip]} />

                    <SeriesCollectionDirective>
                        <SeriesDirective
                            dataSource={{}}
                            xName="Reservation"
                            yName="count"
                            type="Column"
                            name="day"
                            columnWidth={0.3}
                            cornerRadius={{topLeft: 10, topRight: 10}}
                        />
                    </SeriesCollectionDirective>
                </ChartComponent>
            </section>

            
        </main> 
    )
}