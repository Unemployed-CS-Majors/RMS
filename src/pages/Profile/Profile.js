import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import ProfileSidebar from "../../components/Profile/ProfileSidebar/ProfileSidebar";
import MyReservations from "./sections/MyReservations/MyReservations";
import MyAccount from "./sections/MyAccount/MyAccount";
import MyOrders from "./sections/MyOrders/MyOrders";
import authService from "../../services/auth.service";
import { useProfileNavigation } from "./hooks/useProfileNavigation";
import { useReservations } from "./hooks/useReservations";
import { useOrders } from "./hooks/useOrders";
import { useUserDetails } from "./hooks/useUserDetails";
import layoutStyles from '../../components/Profile/ProfileLayout.module.css';

/**
 * Main Profile component that handles tab navigation and data fetching
 */
export default function Profile() {
  const { logout } = useContext(AuthContext);

  // Custom hooks for navigation and data
  const {
    activeTab,
    selectedOrderId,
    selectedReservationId,
    handleTabChange,
    handleViewOrder,
    handleViewReservation,
    clearSelectedOrder,
    clearSelectedReservation
  } = useProfileNavigation();

  const {
    reservations,
    upcomingReservation,
    fetchReservations,
    fetchUpcomingReservation,
    handleCancel,
    updateReservation
  } = useReservations();

  const { orders, fetchOrders } = useOrders();
  const { userDetails, fetchUserDetails } = useUserDetails();

  // Fetch data based on active tab
  useEffect(() => {
    const fetchData = async () => {
      switch (activeTab) {
        case "reservations":
          await fetchReservations();
          await fetchUpcomingReservation();
          break;

        case "account":
          await fetchUserDetails();
          break;

        case "orders":
          await fetchOrders();
          break;

        default:
          break;
      }
    };

    fetchData();
  }, [activeTab]);

  // Handle account deletion
  const handleDeleteAccount = async () => {
    try {
      await authService.deleteAccount();
      logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
      <div className={layoutStyles.profileLayout}>
        {/* Sidebar Navigation */}
        <ProfileSidebar
            activeTab={activeTab}
            handleTabChange={handleTabChange}
            logout={logout}
        />

        {/* Main Content */}
        <>
          {activeTab === 'reservations' && (
              <MyReservations
                  handleManage={handleViewReservation}
                  handleCancel={handleCancel}
                  reservations={reservations}
                  upcomingReservation={upcomingReservation}
                  refreshUpcomingReservation={fetchUpcomingReservation}
                  updateReservation={updateReservation}
                  initialSelectedId={selectedReservationId}
                  clearSelectedReservation={clearSelectedReservation}
              />
          )}

          {activeTab === 'account' && (
              <MyAccount
                  userDetails={userDetails}
                  deleteAccount={handleDeleteAccount}
              />
          )}

          {activeTab === 'orders' && (
              <MyOrders
                  orders={orders}
                  initialSelectedId={selectedOrderId}
                  handleViewDetails={handleViewOrder}
                  clearSelectedOrder={clearSelectedOrder}
              />
          )}
        </>
      </div>
  );
}