import Header from "../components/header/header";
import MonthSelector from "../components/monthSelector/monthSelector";
import Transactions from "../components/Transactions/transaction";

const Dashboard = () => {
  return (
    <>
      <Header />
      <MonthSelector />
      <Transactions />
      <main></main>
    </>
  );
};

export default Dashboard;
