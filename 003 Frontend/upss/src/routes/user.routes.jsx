import React from "react";
import LoadingPage from "../components/LoadingPage";
import NotFound from "../pages/notfound";

const UserLayout = React.lazy(() => import("../layouts/user/UserLayout"));
const Dashboard = React.lazy(() => import("../pages/user/dashboard"));
const Statistic = React.lazy(() => import("../pages/user/statistic"));

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
                path: "statistic",
                element: <LoadingPage children={<Statistic />}/>
            },
            {
                path: "*",
                element: <NotFound />,
            },
        ],
    },
];

export default userRoutes;