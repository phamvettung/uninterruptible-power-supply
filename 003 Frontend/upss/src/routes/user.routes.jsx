import React from "react";
import LoadingPage from "../components/common/LoadingPage";
import NotFound from "../pages/notfound";

const UserLayout = React.lazy(() => import("../layouts/user/UserLayout"));
const Dashboard = React.lazy(() => import("../pages/user/dashboard"));
const Analysis = React.lazy(() => import("../pages/user/analysis"));
const PowerSupplyDiagram = React.lazy(() => import("../pages/user/power-supply-diagram"));
const Alarm = React.lazy(() => import("../pages/user/alarm"));

const userRoutes = [
    {
        path: "/user",
        element: <LoadingPage children={<UserLayout />}/>,
        children:[
            {
                index: true,
                element: <LoadingPage children={<Dashboard />}/>
            },
            {
                path: "analysis",
                element: <LoadingPage children={<Analysis />}/>
            },
            {
                path: "power-supply-diagram",
                element: <LoadingPage children={<PowerSupplyDiagram />}/>
            },
            {
                path: "alarm",
                element: <LoadingPage children={<Alarm />}/>
            },
            {
                path: "*",
                element: <NotFound />,
            },
        ],
    },
];

export default userRoutes;