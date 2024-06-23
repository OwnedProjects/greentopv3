import BatchDetailsWidget from './_widgets/BatchDetailsWidget';
import FinishedProductsList from './_widgets/FinishedProductsList';
import RawMaterialList from './_widgets/RawMaterialList';
import TotalMonthlyPurchaseWidget from './_widgets/TotalMonthlyPurchaseWidget';
import TotalMonthlySalesWidget from './_widgets/TotalMonthlySalesWidget';

const Dashboard = () => {
  return (
    <>
      <div className="grid lg:grid-cols-2 xs:grid-cols-1 gap-4 pb-2">
        <div className="grid sm:grid-cols-2 xs:grid-cols-1 gap-2">
          <RawMaterialList />
          <FinishedProductsList />
        </div>
        <div className="grid sm:grid-cols-2 xs:grid-cols-1 gap-2">
          <TotalMonthlySalesWidget />
          <TotalMonthlyPurchaseWidget />
        </div>
      </div>
      <div className="grid lg:grid-cols-2 xs:grid-cols-1 gap-4 py-2">
        <div className="grid sm:grid-cols-2 xs:grid-cols-1 gap-2">
          <BatchDetailsWidget />
        </div>
        <div className="grid sm:grid-cols-2 xs:grid-cols-1 gap-2"></div>
      </div>
    </>
  );
};

export default Dashboard;
