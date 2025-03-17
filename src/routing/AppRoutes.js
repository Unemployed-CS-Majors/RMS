import React from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";

import HashNavigationWrapper from "../modules/shared/components/Navigation/HashNavigationWrapper/HashNavigationWrapper";
import Auth from "../modules/authentication/pages/Auth";
import NotFound from "../modules/notFound/NotFound";
import Layout from "../modules/shared/components/Layout/Layout";
import { ROUTES } from "../constants/routes";
import Profile from "../modules/profile/pages/Profile";
import ProtectedRoute from "./ProtectedRoute";
import RestaurantDashboard from "../modules/dashboard/pages/Dashboard";
import ForgotPassword from "../modules/authentication/pages/ForgotPassword";
import Checkout from "../modules/checkout/pages/Checkout";

/**
 * AppRoutes component
 *
 * Defines the main application routes using React Router.
 *
 * @returns {JSX.Element} The AppRoutes component
 */
function AppRoutes() {
    return (
        <Router>
            <Routes>
                {/* Home route */}
                <Route
                    path={ROUTES.HOME}
                    element={
                        <Layout>
                            <HashNavigationWrapper />
                        </Layout>
                    }
                />

                {/* Redirect routes */}
                <Route
                    path={ROUTES.MENU}
                    element={<Navigate to="/#Menu" replace />}
                />
                <Route
                    path={ROUTES.LOCATION}
                    element={<Navigate to="/#Location" replace />}
                />
                <Route
                    path={ROUTES.RESERVE_TABLE}
                    element={<Navigate to="/#Reservation" replace />}
                />

                {/* Checkout route */}
                <Route
                    path={ROUTES.CHECKOUT}
                    element={
                        <Layout>
                            <Checkout />
                        </Layout>
                    }
                />

                {/* Profile route */}
                <Route
                    path={ROUTES.PROFILE}
                    element={
                        <Layout>
                            <Profile />
                        </Layout>
                    }
                />

                {/* Authentication routes */}
                <Route path={ROUTES.AUTH} element={<Auth />} />
                <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />

                {/* Admin route */}
                <Route path={ROUTES.ADMIN} element={<ProtectedRoute roles={['owner', 'employee']} />}>
                    <Route index element={<RestaurantDashboard />} />
                </Route>

                {/* Not found route */}
                <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;