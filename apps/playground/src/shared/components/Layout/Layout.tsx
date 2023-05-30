import { NavLink, Outlet } from 'react-router-dom';
import React, { FC, memo } from 'react';
import { Root } from './Layout.styles';
import { Nav } from '../index';

const Layout: FC = memo(() => (
    <Root>
        <Nav>
            <li>
                <NavLink to="/">Checker</NavLink>
            </li>

            <li>
                <NavLink to="/playground">Playground</NavLink>
            </li>
        </Nav>

        <Outlet />
    </Root>
));

export default Layout;
