import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturerForm from './Inventory/ManufacturerForm';
import ManufacturerList from './Inventory/ManufacturerList';
import AutomobileList from './Inventory/AutomobileList';
import SalesPersonForm from './Sales/SalesPersonForm';
import SalesPersonSalesHistory from './Sales/SalesPersonSalesHistory';
import PotentialCustomerForm from './Sales/PotentialCustomerForm';
import SalesRecordForm from './Sales/SalesRecordForm';
import SalesRecordList from './Sales/SalesRecordList';


function App(props) {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufacturers">
            <Route index element={<ManufacturerList />} />
            <Route path="new" element={<ManufacturerForm />} />
          </Route>
          <Route path="automobiles">
            <Route index element={<AutomobileList />} />
          </Route>
          <Route path="salespersons">
            <Route index element={<SalesPersonSalesHistory />} />
            <Route path="new" element={<SalesPersonForm />} />
          </Route>
          <Route path="customers">
            <Route path="new" element={<PotentialCustomerForm />} />
          </Route>
          <Route path="saleshistory">
            <Route index element={<SalesRecordList />} />
            <Route path="new" element={<SalesRecordForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
