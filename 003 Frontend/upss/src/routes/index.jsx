import { createBrowserRouter } from "react-router-dom";
import adminRoutes from "./admin.routes";
import guestRoutes from "./guest.routes";
import userRoutes from "./user.routes";

const routes = createBrowserRouter([...guestRoutes, ...userRoutes, ...adminRoutes]);
export default routes;