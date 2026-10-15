import { lazy, Suspense } from "react";
import Header from "../components/header/header";
import MonthSelector from "../components/monthSelector/monthSelector";
import Transactions from "../components/Transactions/transaction";

const FinanceChart = lazy(
  () => import("../components/financeChart/financeChart")
);

const Dashboard = () => {
  return (
    <>
      <Header />
      <MonthSelector />
      <Transactions />
      <Suspense fallback={<p>Cargando gráfico...</p>}>
        <FinanceChart />
      </Suspense>
    </>
  );
};

export default Dashboard;
