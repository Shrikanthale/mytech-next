import ProjectStatsDashboard from "../../components/ProjectStatsDashboard";
import RevenueTargetCard from "../../components/RevenueTargetCard ";
import StatisticsChart from "../../components/StatisticsChart";

export default function Home() {
  return (
    <main className="min-h-screen  items-center justify-center bg-gray-100 p-5">
      <ProjectStatsDashboard />
      <div className="flex gap-10 mx-auto my-5">
        <RevenueTargetCard /> <StatisticsChart />
      </div>
    </main>
  );
}
