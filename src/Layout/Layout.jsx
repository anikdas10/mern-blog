import Footer from '@/components/Footer';
import Topbar from '@/components/Topbar';
import AppSidebar from '@/components/ui/AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
      // sidebar
      <SidebarProvider>
        <Topbar />
        <AppSidebar />
        <main className="w-full">
          <div  className='w-full min-h-[calc(100vh-50px)]'>
            <Outlet />
          </div>

          <Footer />
        </main>
      </SidebarProvider>
    );
};

export default Layout;