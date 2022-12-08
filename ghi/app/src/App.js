import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturerForm from './Inventory/ManufacturerForm';
import ManufacturerList from './Inventory/ManufacturerList';
import SalesPersonForm from './Sales/SalesPersonForm';

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
          {/* <Route path="salespersons">
            <Route index element={<SalesPersonsList salespersons={props.salespersons} />} />
            <Route path="new" element={<SalesPersonForm />} />
          </Route> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
