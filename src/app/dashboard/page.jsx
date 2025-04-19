import ProjectStatsDashboard from "../../components/ProjectStatsDashboard";
import RevenueTargetCard from "../../components/RevenueTargetCard ";
import StatisticsChart from "../../components/StatisticsChart";
import RecentOrdersDashboard from "../../components/RecentOrders";
import CustomerGrowth from "../../components/CustomerGrowth";
import SalesDashboard from "./SalesDashboard.jsx"
import TopNavbar from "../../components/TopNavbar";
export default function Home() {
  return (
    <main className="min-h-screen  items-center justify-center bg-gray-100 p-5">
      <TopNavbar />
      <ProjectStatsDashboard />
      <div className="flex flex-col md:flex-row mx-auto my-5">
        <div className="md:w-1/3 p-0 bg-transparent">
          <RevenueTargetCard />
        </div>
        <div className="md:w-2/3 p-0 bg-transparent">
          <StatisticsChart />
        </div>
      </div>
      <div>
        <SalesDashboard />
      </div>
      <div className="flex flex-col md:flex-row gap-1">
        <RecentOrdersDashboard />
        <CustomerGrowth />
      </div>
    </main>
  );
}
