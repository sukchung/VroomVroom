import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturerForm from './Inventory/ManufacturerForm';
import ManufacturerList from './Inventory/ManufacturerList';
import AutomobileForm from './Inventory/AutomobileForm';
import AutomobileList from './Inventory/AutomobileList';
import VehicleModelForm from './Inventory/VehicleModelForm';
import VehicleModelsList from './Inventory/VehicleModelsList';
import TechnicianForm from './Services/TechnicianForm';
import AppointmentForm from './Services/ServiceAppointmentForm';
import AppointmentList from './Services/ServiceAppointmentList';
import ServiceHistory from './Services/ServiceHistory';
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
            <Route path="new" element={<AutomobileForm />} />
          </Route>
          <Route path="models">
            <Route index element={<VehicleModelsList vehicleModels={props.models} />} />
            <Route path="new" element={<VehicleModelForm />} />
          </Route>
          <Route path="technicians">
            <Route path="new" element={<TechnicianForm />} />
          </Route>
          <Route path="appointments">
            <Route path="new" element={<AppointmentForm />} />
            <Route index element={<AppointmentList serviceAppointments={props.appointments} />} />
          </Route>
          <Route path="history" element={<ServiceHistory />} />
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
