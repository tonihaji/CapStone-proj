
 import './App.css';
import { useState, useEffect } from "react";
import { Routes,Route } from 'react-router-dom';
import Popup from "../src/components/Popup";
import Footer from "../src/components/Footer";
import SignUp from '../src/components/SignUp';
import Login from '../src/components/Login';
import LandingPage from '../src/components/DonorPage/LandingPage';
import BeneficiaryStories from './components/BeneficiaryStories';
import BeneficiaryForm from "../src/components/CharityPage/BeneficiaryForm"
import NavBar from './components/NavBar';
import ContactUs from "./components/ContactUs"
import CharityEditForm from "./components/CharityPage/CharityEditForm"
import Charities from "./components/DonorPage/Charities"
import CharityDetails from "./components/DonorPage/CharityDetails"
import CharityDashboard from './components/CharityPage/CharityDashboard';
import AdministratorDashboard from "./components/Administrator/AdministratorDashboard"
import DonationForm from './components/DonorPage/DonationForm';

function App() {
  // States
  const [currentUser, setCurrentUser] = useState({});
  const[userType, setUserType] = useState("");
  const [popupVariables, setPopupVariables] = useState({
    visible: false,
    header: "",
    body: ""
  })

  const token = localStorage.getItem('token');  

  // Fetch logged in user
  useEffect(() => {
    const headers = {'Authorization': `Bearer ${token}`}
    fetch("http://127.0.0.1:3000/loggedin", {headers})
    .then((response) => response.json())
    .then((data) => {
      setCurrentUser(data.current_user);
      setUserType(data.user_type)
    })
  }, [])

  console.log("Current user: ", currentUser,", UserType: ", userType)

  return (
    <div className="App">
      <NavBar currentUser={currentUser} userType={userType}/>
      <Routes>
        
      <Route path='/' element={<LandingPage/>}/>

      <Route path='/home' element={<LandingPage/>}/>
      <Route exact path="/login" element={<Login setCurrentUser={setCurrentUser} setAppUserType={setUserType}/>} />
      <Route exact path="/signup" element={<SignUp/>} />
      <Route exact path="/contactus" element={<ContactUs/>} />
      <Route exact path="/beneficiarystories" element={<BeneficiaryStories/>} />
      <Route exact path="/charity-details/:id" element={<CharityDetails/>} />
      <Route exact path="/charitydashboard" element={<CharityDashboard/>} />
      <Route exact path="/charityeditform" element={<CharityEditForm/>} />
      <Route exact path="/charities" element={<Charities/>} />
      <Route exact path="/beneficiaryform" element={<BeneficiaryForm/>} />
      <Route exact path="/administratordashboard" element={<AdministratorDashboard currentUser={currentUser} popupVariables={popupVariables} setPopupVariables={setPopupVariables}/>} />
      <Route exact path="/donationform" element={<DonationForm/>} />
      <Route path="/charitydetails/:id" component={CharityDetails} />

      {/* <Route exact path="/donationform" element={<DonationForm/>} /> */}
      

      </Routes>

      {/* <Footer /> */}

      {/* Popup Component can be used by any other component */}
      <Popup visible={popupVariables.visible} header={popupVariables.header} body={popupVariables.body} setPopupVariables={setPopupVariables}/>
    </div>
  );
}

export default App;