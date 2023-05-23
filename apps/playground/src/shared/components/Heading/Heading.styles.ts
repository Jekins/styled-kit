import styled from 'styled-components';
import { mods } from '../../styled';

export const Root = styled.h1<{ title?: string }>`
    ${mods.has('title')`
        color: cornflowerblue;
    `};
`;
