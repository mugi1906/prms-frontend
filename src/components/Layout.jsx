import React from 'react'
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "../style/layout.css"
import { useState } from 'react';

function Layout({children}) {
    const [sidebarOpen,setSidebarOpen] = useState(
        window.innerWidth > 768
    );
    return (
        <div className="layout">
            <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}  />
            <div className="layout-body">
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <main className="content">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default Layout