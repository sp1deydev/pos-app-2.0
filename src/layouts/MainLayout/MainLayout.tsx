import { ReactNode } from 'react';
import AppHeader from '../Header';

interface MainLayoutProps {
    children: ReactNode
}

function MainLayout(props: MainLayoutProps) {
    return (
        <>
            <AppHeader/>
            {props.children}
        </>
    );
}

export default MainLayout;