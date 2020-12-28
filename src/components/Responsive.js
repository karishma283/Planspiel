//Taleh Muzaffarov 
import React, { Component } from 'react'
import { useMediaQuery } from 'react-responsive'
import { Layout, Menu, Breadcrumb, Icon, Typography, Button } from 'antd';

/* import DesktopMain from './desktop/DesktopMain'
import MobileMain from './mobile/MobileMain' */
const { SubMenu } = Menu;
const { Title } = Typography;
const { Header, Content, Footer, Sider } = Layout;
export const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 1600 })
    return isDesktop ? children : null
}
export const Tablet = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 900, maxWidth: 1599 })
    return isTablet ? children : null
}
export const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 900 })
    return isMobile ? children : null
}
/* export const DesktopUserProfile = () => (
    <div>
        <Desktop>
            {UserProfile()}
        </Desktop>
        <Tablet>
            Tablet
        </Tablet>
        <Mobile>Mobile</Mobile>
    </div>
)
export const DesktopVersion = () => (
    <div>
        <Desktop>
            <DesktopMain />
        </Desktop>

    </div>
)

export const MobileVersion = () => (
    <div>
        <Mobile><MobileMain /></Mobile>
    </div>
)

export const SharedUserProfile = () => {

    return (
        <div>
            <Desktop></Desktop>
            <Mobile></Mobile>

        </div>)
} */