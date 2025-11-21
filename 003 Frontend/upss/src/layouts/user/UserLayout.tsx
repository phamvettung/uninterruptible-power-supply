import { Outlet } from 'react-router-dom'
import { SidebarProvider, useSidebar } from '../../context/SidebarContext';
import Sidebar from '../sidebar';
import Header from '../header';

const LayoutContent: React.FC = () => {

  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  return (
    <div>

      <div>
        <Sidebar />
      </div>

      <div>
        <Header/>

        <div>
          <Outlet/>
        </div>
      </div>

    </div>
  );

};

const UserLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};

export default UserLayout;

