import SearchFrame from "./components/SearchFrame/SearchFrame";
import ClinicDetail from "./pages/ClinicDetail/ClinicDetail";
import ClinicRegister from "./pages/ClinicRegister/ClinicRegister";
import CustomerInfoUpdate from "./pages/CustomerInfoUpdate/CustomerInfoUpdate";
import CustomerProfile from "./pages/CustomerProfile/CustomerProfile";
import CustomerRegister from "./pages/CustomerRegister/CustomerRegister";
import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";
import Service from "./pages/Service/Service";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";
import ClinicProfile from "./pages/ClinicProfile/ClinicProfile";
import ClinicInfoUpdate from "./pages/ClinicInfoUpdate/ClinicInfoUpdate";
import BookingInfo from "./pages/BookingInfo/BookingInfo";
import History from "./pages/History/History";

function App() {
  const { user } = useContext(Context);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/service" element={<Service />} />
          <Route path="/profileCus" element={user ? <CustomerProfile /> : <CustomerRegister />} />
          <Route path="/profileCli" element={user ? <ClinicProfile /> : <ClinicRegister />} />
          <Route path="/bookingInformation" element={<BookingInfo />} />
          <Route path="/cliRegister" element={<ClinicRegister />} />
          <Route path="/cusRegister" element={<CustomerRegister />} />
          <Route path="/search/:keyword" element={<Search />} />
          <Route path="/updateCusProfile" element={<CustomerInfoUpdate />} />
          <Route path="/updateCliProfile" element={<ClinicInfoUpdate />} />
          <Route path="/clinics/:clinicId" element={<ClinicDetail />} />
          <Route path="/bookings/clinic/:clinicId" element={<BookingInfo />} />
          <Route path="/bookingHistory" element={<History />} />
        </Routes>
      </Router>
      {/* <Home /> */}
      {/* <CustomerRegister /> */}
      {/* <ClinicRegister /> */}
      {/* <CustomerProfile /> */}
      {/* <CustomerInfoUpdate /> */}
      {/* <Service /> */}
      {/* <Search /> */}
      {/* <ClinicDetail /> */}
      {/* <ClinicProfile /> */}
      {/* <ClinicInfoUpdate /> */}
      {/* <BookingInfo /> */}
    </div>
  );
}

export default App;
