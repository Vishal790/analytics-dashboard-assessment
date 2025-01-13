import EVCountByMake from "./components/EVCountByMake";
import EVCountByYear from "./components/EVCountByYear";
import EVTypeDistribution from "./components/EVTypeDistribution";
import ElectricRangeDistribution from "./components/ElectricRangeDistribution";
import EVPriceVsRange from "./components/EVPriceVsRange";
import CAFVEligibility from "./components/CAFVEligibility";
import MarketShare from "./components/MarketShare";

function Dashboard() {
  return (
    <div className="mx-auto px-4 py-8 bg-gray-950 text-white  lg:max-w-[90%]">
      {/* Header */}
      <h1 className="text-4xl text-center font-extrabold text-indigo-400 mb-10">
        Electric Vehicle Dashboard
      </h1>

      <div className="bg-gray-800 shadow-lg rounded-lg p-6 hover:shadow-2xl transition my-10">
        <h2 className="text-2xl font-bold text-red-500 mb-4">
          Market Share
        </h2>
        <MarketShare />
      </div>

      <div className="flex flex-wrap gap-4 justify-between">
        <div className="bg-gray-800 shadow-lg rounded-lg p-6 hover:shadow-2xl transition w-full lg:w-[48%] min-h-[300px] overflow-hidden">
          <EVCountByMake />
        </div>

        <div className="bg-gray-800 shadow-lg rounded-lg p-6 hover:shadow-2xl transition w-full lg:w-[48%] min-h-[300px] overflow-hidden">
          <EVCountByYear />
        </div>

        <div className="bg-gray-800 shadow-lg rounded-lg p-6 hover:shadow-2xl transition w-full lg:w-[48%] min-h-[300px] overflow-hidden">
          <EVTypeDistribution />
        </div>

        <div className="bg-gray-800 shadow-lg rounded-lg p-6 hover:shadow-2xl transition w-full lg:w-[48%] min-h-[300px] overflow-hidden">
          <CAFVEligibility />
        </div>

        <div className="bg-gray-800 shadow-lg rounded-lg p-6 hover:shadow-2xl transition w-full lg:w-[48%] min-h-[300px] overflow-hidden">
          <ElectricRangeDistribution />
        </div>

        <div className="bg-gray-800 shadow-lg rounded-lg p-6 hover:shadow-2xl transition w-full lg:w-[48%] min-h-[300px] overflow-hidden">
          <EVPriceVsRange />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
