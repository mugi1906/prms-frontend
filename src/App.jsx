import React from 'react'
import { useSelector } from 'react-redux'
import { useState, useEffect } from "react";
import SplashScreen from "./components/SplashScreen";
import { Routes, Route } from "react-router-dom";
import DeveloperDashboard from './pages/developerPages/DeveloperDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import RoleRoute from './components/RoleRoute';
import ReviewerDashboard from './pages/reviewerPages/ReviewerDashboard';
import AdminDashboard from './pages/adminPages/AdminDashboard';
import DeveloperSubmitProject from './pages/developerPages/DeveloperSubmitProject';
import MyProjects from './pages/developerPages/MyProjects';
import ProjectDetails from './pages/developerPages/ProjectDetails';
import AssignedReviews from './pages/reviewerPages/AssignedReviews';
import ProjectManagement from './pages/adminPages/ProjectManagement';
import AssingedReviewer from './pages/adminPages/AssingedReviewer';
import ReviewProject from './pages/reviewerPages/ReviewProject';
import ReviewHistory from './pages/reviewerPages/ReviewHistory';
import UserManagement from './pages/adminPages/UserManagement';
import ReviewManagement from './pages/adminPages/ReviewManagement';
import ActivityLogs from './pages/adminPages/ActivityLogs';
import Profile from './pages/CommenPage/Profile';
import UpdateProfile from './components/UpdateProfile';
import Settings from './pages/CommenPage/Settings';
import ChangePassword from './components/ChangePassword';
import ReviewerProjectDetails from './pages/reviewerPages/ReviewerProjectDetails';
import Layout from './components/Layout';
import Notification from './pages/CommenPage/Notification';
import AuthPage from './authPage/AuthPage';
import "./App.css"
import NotificationDetails from './pages/CommenPage/NotificationDetails';


function App() {
  const theme = useSelector((state)=> state.theme.theme)
  const [loading, setLoading] = useState(true);

    useEffect(() => {

        const timer = setTimeout(() => {
            setLoading(false);
        }, 2500);

        return () => clearTimeout(timer);

    }, []);

    if (loading) {
        return <SplashScreen />;
    }
  return (
    <>
      <div className={theme}>
        <Routes>
          <Route path='/' element={<AuthPage/>} />
          <Route 
            path='/profile' 
            element={
              <ProtectedRoute>
                <Layout>
                  <Profile/>
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route 
            path='/updateProfile' 
            element={
              <ProtectedRoute>
                <Layout>
                  <UpdateProfile/>
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route 
            path='/setting' 
            element={
              <ProtectedRoute>
                <Layout>
                  <Settings/>
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route 
            path='/changePassword' 
            element={
              <ProtectedRoute>
                <Layout>
                  <ChangePassword/>
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route 
            path='/notification' 
            element={
              <ProtectedRoute>
                <Layout>
                  <Notification/>
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route 
            path='/notification/:senderId' 
            element={
              <ProtectedRoute>
                <Layout>
                  <NotificationDetails/>
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route 
            path='/developer/dashboard' 
            element={ 
              <ProtectedRoute>
                <RoleRoute allowedRoles={['developer']}>
                  <Layout>
                    <DeveloperDashboard/>
                  </Layout>
                </RoleRoute>
              </ProtectedRoute>     
            }
          />
          <Route 
            path='/developer/CreateProject'
            element={
              <ProtectedRoute>
                <RoleRoute allowedRoles={['developer']}>
                  <Layout>
                    <DeveloperSubmitProject/>
                  </Layout>
                </RoleRoute>
              </ProtectedRoute>
            }
          /> 
          <Route 
            path='/developer/MyProjects'
            element={
              <ProtectedRoute>
                <RoleRoute allowedRoles={['developer']}>
                  <Layout>
                    <MyProjects/>
                  </Layout>
                </RoleRoute>
              </ProtectedRoute>
            }
          /> 
          <Route 
            path='/developer/ProjectDetails/:id'
            element={
              <ProtectedRoute>
                <RoleRoute allowedRoles={['developer']}>
                  <Layout>
                    <ProjectDetails/>
                  </Layout>
                </RoleRoute>
              </ProtectedRoute>
              
            }
          />
          <Route
            path='/review/dashboard'
            element={
              <ProtectedRoute>
                <RoleRoute allowedRoles={['reviewer']}>
                  <Layout>
                    <ReviewerDashboard/>
                  </Layout>
                </RoleRoute>
              </ProtectedRoute>
            }
          />
          <Route 
            path='/review/AssignedReviews'
            element={
              <ProtectedRoute>
                <RoleRoute allowedRoles={['reviewer']}>
                  <Layout>
                    <AssignedReviews/>
                  </Layout>
                </RoleRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path='/review/ReviewerProject/:id'
            element={
              <ProtectedRoute>
                <RoleRoute allowedRoles={['reviewer']}>
                  <Layout>
                    <ReviewProject/>
                  </Layout>
                </RoleRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path='/review/Reviewer/History'
            element={
              <ProtectedRoute>
                <RoleRoute allowedRoles={['reviewer']}>
                  <Layout>
                    <ReviewHistory/>
                  </Layout>
                </RoleRoute>
              </ProtectedRoute>
            }
          />

          <Route
            path='/review/ReviewerProjectDetails/:id'
            element={
              <ProtectedRoute>
                <RoleRoute allowedRoles={['reviewer']}>
                  <Layout>
                    <ReviewerProjectDetails/>
                  </Layout>
                </RoleRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path='/admin/dashboard'
            element={
              <ProtectedRoute>
                <RoleRoute allowedRoles={['admin']}>
                  <Layout>
                    <AdminDashboard/>
                  </Layout>
                </RoleRoute>
              </ProtectedRoute>
            }
          />
          <Route 
            path='/admin/ProjectMangment'
            element={
              <ProtectedRoute>
                <RoleRoute allowedRoles={['admin']}>
                  <Layout>
                    <ProjectManagement/>
                  </Layout>
                </RoleRoute>
              </ProtectedRoute>
            }
          />
          <Route 
            path='/admin/AssignedReviewer/:id'
            element={
              <ProtectedRoute>
                <RoleRoute allowedRoles={['admin']}>
                  <Layout>
                    <AssingedReviewer/>
                  </Layout>
                </RoleRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path='/admin/allUser'
            element={
              <ProtectedRoute>
                <RoleRoute allowedRoles={['admin']}>
                  <Layout>
                    <UserManagement/>
                  </Layout>
                </RoleRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path='/admin/Reviewer/Managment'
            element={
              <ProtectedRoute>
                <RoleRoute allowedRoles={['admin']}>
                  <Layout>
                    <ReviewManagement/>
                  </Layout>
                </RoleRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path='/admin/actvieLog'
            element={
              <ProtectedRoute>
                <RoleRoute allowedRoles={['admin']}>
                  <Layout>
                    <ActivityLogs/>
                  </Layout>
                </RoleRoute>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  )
}

export default App;