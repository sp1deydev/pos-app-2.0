import React, { FC, Fragment, ReactNode } from 'react';
import { Route, Routes } from 'react-router-dom';
import { LayoutType } from '../constants/Layouts';
import { configRoutes } from './ConfigRoutes';
import MainLayout from '../layouts/MainLayout';

interface RouteConfig {
    path: string;
    component: React.ComponentType;
    layout?: LayoutType;
  }

  const layouts: Record<LayoutType, FC<{ children: ReactNode }>> = {
    [LayoutType.NO_LAYOUT]: Fragment,
    [LayoutType.MAIN_LAYOUT]: MainLayout,
  };

function Router() {
    const routes: RouteConfig[] = configRoutes;
    return (
        <Routes>
            {routes.map((route, index) => {
                const layoutType = route.layout || LayoutType.MAIN_LAYOUT;
                const Layout = layouts[layoutType] || MainLayout;
                const Component = (
                    <Layout>
                        <route.component />
                    </Layout>
                );
                return <Route key={index} path={route.path} element={Component} />;
            })}
        </Routes>
    );
}

export default Router;