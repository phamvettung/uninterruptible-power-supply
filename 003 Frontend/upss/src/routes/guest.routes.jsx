import React from "react";
import LoadingPage from "../components/common/LoadingPage";
import NotFound from "../pages/notfound";

const Home = React.lazy(() => import("../pages/guest/home"));
const Contact = React.lazy(() => import("../pages/guest/contact"));
const About = React.lazy(() => import("../pages/guest/about"));
const Login = React.lazy(() => import("../pages/guest/login"));
const Register = React.lazy(() => import("../pages/guest/register"));

const guestRoutes = [
    {
        path: "/",
        element: <LoadingPage children={<Home />}/>,
    },
    {
        path: "/contact",
        element: <LoadingPage children={<Contact />}/>,
    },
    {
        path: "/about",
        element: <LoadingPage children={<About />}/>,
    },
    {
        path: "/login",
        element: <LoadingPage children={<Login />}/>,
    },
    {
        path: "/register",
        element: <LoadingPage children={<Register />}/>,
    },
    {
        path: "*",
        element: <NotFound />,
    },
];

export default guestRoutes;