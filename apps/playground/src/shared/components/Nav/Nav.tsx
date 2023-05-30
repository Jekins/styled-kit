import React, { FC, memo, PropsWithChildren } from 'react';
import { Root } from './Nav.styles';

const Nav: FC<PropsWithChildren> = memo((props) => {
    const { children } = props;

    return (
        <Root>
            <ul>{children}</ul>
        </Root>
    );
});

export default Nav;
