import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturerForm from './Inventory/ManufacturerForm';
import ManufacturerList from './Inventory/ManufacturerList';
import VehicleModelsList from './Inventory/VehicleModelsList';
import VehicleModelForm from './Inventory/VehicleModelForm';
import AutomobileForm from './AutomobileForm';
import TechnicianForm from './Services/TechnicianForm';
import AppointmentForm from './Services/ServiceAppointmentForm';
import AppointmentList from './Services/ServiceAppointmentList';
import ServiceHistory from './Services/ServiceHistory';

function App(props) {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufacturers">
            <Route index element={<ManufacturerList manufacturers={props.manufacturers} />} />
            <Route path="new" element={<ManufacturerForm />} />
          </Route>
          <Route>
            <Route path="models">
              <Route index element={<VehicleModelsList vehicleModels={props.models} />} />
              <Route path="new" element={<VehicleModelForm />} />
            </Route>
          </Route>
          <Route path="technicians">
            <Route path="new" element={<TechnicianForm />} />
          </Route>
          <Route path="appointments">
            <Route path="new" element={<AppointmentForm />} />
            <Route index element={<AppointmentList serviceAppointments={props.appointments} />} />
          </Route>
          <Route path="history" element={<ServiceHistory/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
