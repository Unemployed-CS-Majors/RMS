import React from "react";
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";

import HashNavigationWrapper from "../modules/shared/components/Navigation/HashNavigationWrapper/HashNavigationWrapper";
import Auth from "../modules/authentication/pages/Auth";
import NotFound from "../modules/notFound/NotFound";
import Layout from "../modules/shared/components/Layout/Layout";
import {ROUTES} from "../constants/routes";
import Profile from "../modules/profile/pages/Profile";
import ProtectedRoute from "./ProtectedRoute";
import RestaurantDashboard from "../modules/dashboard/pages/Dashboard";
import ForgotPassword from "../modules/authentication/pages/ForgotPassword";
import Checkout from "../modules/checkout/pages/Checkout";

function AppRoutes() {
    return (
        <Router>
            <Routes>
                {}
                <Route
                    path={ROUTES.HOME}
                    element={
                        <Layout>
                            <HashNavigationWrapper />
                        </Layout>
                    }
                />

                {}
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

                <Route
                    path={ROUTES.CHECKOUT}
                    element={
                        <Layout>
                            <Checkout/>
                        </Layout>
                    }
                />

                {}
                <Route
                    path={ROUTES.PROFILE}
                    element={
                        <Layout>
                            <Profile />
                        </Layout>
                    }
                />

                {}
                <Route path={ROUTES.AUTH} element={<Auth />} />
                <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
                {}
                <Route path={ROUTES.ADMIN} element={<ProtectedRoute roles={['owner', 'employee']} />}>
                    <Route index element={<RestaurantDashboard />} />
                </Route>

                {}
                <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;