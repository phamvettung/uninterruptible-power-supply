import React from "react";
import LoadingPage from "../components/LoadingPage";
import NotFound from "../pages/notfound";

const AdminLayout = React.lazy(() => import("../layouts/admin/AdminLayout"));
const Dashboard = React.lazy(() => import("../pages/admin/dashboard"));
const AccountManagement = React.lazy(() => import("../pages/admin/account"));
const LoadManagement = React.lazy(() => import("../pages/admin/load"));

const adminRoutes = [
    {
        path: "/admin",
        element: <LoadingPage children={<AdminLayout/>}/>,
        children:[
            {
                index: true,
                element: <LoadingPage children={<Dashboard/>}/>,
            },
            {
                path: "account-management",
                element: <LoadingPage children={<AccountManagement/>}/>,
            },
            {
                path: "load-management",
                element: <LoadingPage children={<LoadManagement/>}/>,
            },
            {
                path: "*",
                element: <NotFound />,
            },
        ],
    },
];

export default adminRoutes;