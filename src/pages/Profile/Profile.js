import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../contexts/AuthContext";
import {useNavigate} from "react-router-dom";
import ROUTES from "../../constants/routes";
import './Profile.css';
import MyReservations from "./components/MyReservations";
import MyAccount from "./components/MyAccount";
import MyOrders from "./components/MyOrders";
import reservationService from "../../services/reservation.service";

export default function Profile() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("account");
  const [reservations, setReservations] = useState([]);
  const [upcomingReservation, setUpcomingReservation] = useState(null);
  const [orders, setOrders] = useState([
    {
      id: "sjdcjjd",
      date: "Mar 5, 2025",
      total: 89.97,
      status: "Delivered",
      tracking: "UPS1234567890",
      items: [
        { name: "Product 1", quantity: 2, price: 29.99 },
        { name: "Product 2", quantity: 1, price: 29.99 }
      ]
    }
  ]);
  useEffect(() => {
    const fetchData = async () => {
      console.log("activeTab", activeTab);
      switch (activeTab) {
        case "reservations":
          // Fetch reservations
          try {
            const userReservationsResponse = await reservationService.getByUser();

            const refactoredReservations = userReservationsResponse.map(reservation => {
              const start = new Date(reservation.startTime);
              const end = new Date(reservation.endTime);
              return {
                ...reservation,
                date: start.toLocaleDateString(),
                startTime: start.toLocaleTimeString(),
                endTime: end.toLocaleTimeString(),
              };
            });
            setReservations(refactoredReservations);

            console.log(userReservationsResponse)
          } catch (e) {
            console.error(e);
          }

          try {
            const upcomingReservationsResponse = await reservationService.getUserUpcomingReservations();
            const start = new Date(upcomingReservationsResponse.startTime);
            const end = new Date(upcomingReservationsResponse.endTime);
            const upcomingReservations = upcomingReservationsResponse;
            upcomingReservations.date = start.toLocaleDateString();
            upcomingReservations.startTime = start.toLocaleTimeString();
            upcomingReservations.endTime = end.toLocaleTimeString();

            setUpcomingReservation(upcomingReservations);
          }catch (e) {
            console.error(e);
          }

          break;
        case "account":
          // Fetch account details
          break;
        case "orders":
          //fetch account details
          break;
        default:
          break;
      }
    }

    fetchData();
  }, [activeTab]);

  const handleManage = (id) => {
    alert(`Manage reservation ${id} clicked`);
  };

  const handleCancel = () => {
    alert("Cancel reservation clicked");
  };

  const handleLogoutClick = () => {
    logout();
    navigate(ROUTES.HOME);
  };

  return (
    <div className="profile-layout">
      {/* Sidebar Navigation */}
      <nav className="sidebar-profile">
        <div className="sidebar-header-profile">
          <h2>My Profile</h2>
        </div>
        <ul className="sidebar-menu">
          <li
            className={activeTab === "account" ? "active" : ""}
            onClick={() => setActiveTab("account")}
          >
            My Account
          </li>
          <li
            className={activeTab === "reservations" ? "active" : ""}
            onClick={() => setActiveTab("reservations")}
          >
            Reservations
          </li>
          <li
           className={activeTab === "orders" ? "active" : ""}
           onClick={() => setActiveTab("orders")}
          >
            Orders
         </li>
        </ul>
        {/* Separate logout container */}
        <div className="logout-container">
          <button onClick={handleLogoutClick} className="logout-btn">
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}

      <>

      {activeTab === 'reservations' && (
        <MyReservations handleManage={handleManage} handleCancel={handleCancel} reservations={reservations} upcomingReservation={upcomingReservation} />
      )}

      {activeTab === 'account' && (
          <MyAccount />
      )}

      {activeTab === 'orders' && (
          <MyOrders orders={orders} />
      )}

      </>
    </div>
  );
}