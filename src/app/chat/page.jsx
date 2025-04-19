import ProjectStatsDashboard from "../../components/ProjectStatsDashboard";
import RevenueTargetCard from "../../components/RevenueTargetCard ";
import StatisticsChart from "../../components/StatisticsChart";
import RecentOrdersDashboard from "../../components/RecentOrders";
export default function Home() {
  return (
    <main className="min-h-screen  items-center justify-center bg-gray-100 p-5">
      <ProjectStatsDashboard />
      <div className="flex flex-col md:flex-row gap-1 mx-auto my-5">
        <RevenueTargetCard />
        {/* <StatisticsChart /> */}
      </div>
      <div>
       <RecentOrdersDashboard />  
      </div>
    </main>
  );
}
