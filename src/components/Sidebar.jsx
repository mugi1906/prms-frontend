import React from 'react';
import { toast } from 'react-toastify';
import {
  LayoutDashboard,
  FolderCheck,
  FolderPlus,
  FolderKanban,
  CircleUserRound,
  Navigation,
  Settings,
  GalleryVerticalEnd,
  FolderCog,
  Users,
  ClipboardCheck,
  Activity,
  LogOut
} from 'lucide-react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import "../style/saidbar.css"


function Sidebar({ sidebarOpen, setSidebarOpen }) {

  const user = JSON.parse(sessionStorage.getItem('user'))
  const role = user?.role;
  const { logOut } = useContext(AuthContext)

  const logout = async () => {
    try {
      logOut();
      toast.success("logout seccuss",
        {
          autoClose : 2000,
          theme : "colored"
        }
      );
    } catch (error) {

    }

  }

  const handleMenuClick = () => {
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  }

  return (
    <aside
      className={sidebarOpen ? "sidebar open" : "sidebar"}
      onClick={(e)=>e.stopPropagation()}
    >

      <div className='saidMenus'>
        <h1>{sidebarOpen && `${role.toUpperCase()} MENU`}</h1>
        {
          role === "developer" &&
          <div className='menuList'>
            <Link onClick={handleMenuClick} to={'/developer/dashboard'} className='menuLink'><LayoutDashboard />{sidebarOpen && "Dashboard"}</Link>
            <Link onClick={handleMenuClick} to={'/developer/CreateProject'} className='menuLink'> <FolderPlus /> {sidebarOpen && "Create Project"} </Link>
            <Link onClick={handleMenuClick} to={'/developer/MyProjects'} className='menuLink'> <FolderKanban /> {sidebarOpen && "My Projects"}</Link>
            <Link onClick={handleMenuClick} to={'/notification'} className='menuLink'><Navigation/>{sidebarOpen && "Notifications"}</Link>
            <Link onClick={handleMenuClick} to={'/profile'} className='menuLink'> <CircleUserRound /> {sidebarOpen && "Profile"}</Link>
            <Link onClick={handleMenuClick} to={'/setting'} className='menuLink'> <Settings /> {sidebarOpen && "Settings"}</Link>
          </div>
        }
        {
          role === "reviewer" &&
          <div className='menuList'>
            <Link onClick={handleMenuClick} to={'/review/dashboard'} className='menuLink'> <LayoutDashboard /> {sidebarOpen && "Dashboard"}</Link>
            <Link onClick={handleMenuClick} to={'/review/AssignedReviews'} className='menuLink'> <FolderCheck /> {sidebarOpen && "Assigned Projects"}</Link>
            <Link onClick={handleMenuClick} to={'/review/Reviewer/History'} className='menuLink'> <GalleryVerticalEnd /> {sidebarOpen && "Review History"}</Link>
            <Link onClick={handleMenuClick} to={'/notification'} className='menuLink'><Navigation/>{sidebarOpen && "Notifications"}</Link>
            <Link onClick={handleMenuClick} to={'/profile'} className='menuLink'> <CircleUserRound /> {sidebarOpen && "Profile"}</Link>
            <Link onClick={handleMenuClick} to={'/setting'} className='menuLink'> <Settings /> {sidebarOpen && "Settings"}</Link>
          </div>
        }
        {
          role === "admin" &&
          <div className='menuList'>
            <Link onClick={handleMenuClick} to={'/admin/dashboard'} className='menuLink'> <LayoutDashboard /> {sidebarOpen && "Dashboard"}</Link>
            <Link onClick={handleMenuClick} to={'/admin/ProjectMangment'} className='menuLink'> <FolderCog /> {sidebarOpen && "Project Managment"}</Link>
            <Link onClick={handleMenuClick} to={'/admin/allUser'} className='menuLink'> <Users /> {sidebarOpen && "All Users"}</Link>
            <Link onClick={handleMenuClick} to={'/admin/Reviewer/Managment'}> <ClipboardCheck /> {sidebarOpen && "Review Managment"}</Link>
            <Link onClick={handleMenuClick} to={'/admin/actvieLog'} className='menuLink'> <Activity /> {sidebarOpen && "User Activitys"}</Link>
            <Link onClick={handleMenuClick} to={'/notification'} className='menuLink'><Navigation/>{sidebarOpen && "Notifications"}</Link>
            <Link onClick={handleMenuClick} to={'/profile'} className='menuLink'> <CircleUserRound /> {sidebarOpen && "Profile"}</Link>
            <Link onClick={handleMenuClick} to={'/setting'} className='menuLink'> <Settings /> {sidebarOpen && "Settings"}</Link>
          </div>
        }
      </div>
      <div className='logoutBtn'>
        <button onClick={logout} className='logOutBtn'> <span><LogOut /></span> LogOuut</button>
      </div>
    </aside>
  )
}

export default Sidebar;