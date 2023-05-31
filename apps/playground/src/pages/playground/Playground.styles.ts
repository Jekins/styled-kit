import styled, { css } from 'styled-components';
import { SCProps } from '@styled-kit/mods';
import { Mods, mods, RMods } from '../../shared/styled';

export const Button = styled.button<SCProps<{ defaultButton?: boolean }>>`
    ${mods.not('defaultButton')`
        background: white;
        padding: 12px 20px;
        border: 1px solid #ccc;
        border-radius: 30px;
        font-size: 16px;
        cursor: pointer;
        transition: 0.3s;
    
        &:hover {
            border-color: black;
        }
    `};
`;

const wrapperColorMixin = (bg: RMods['color'], text: RMods['color']) => css`
    background-color: ${bg};
    color: ${text};
`;

export const Wrapper = styled.div<
    SCProps<Mods<'size' | 'color' | 'disabled'> & Mods<'spacing', 12>>
>`
    box-shadow: rgba(151, 158, 176, 0.2) 0 10px 30px;
    border-radius: 30px;
    margin-bottom: 16px;
    transition: 0.3s;

    ${mods.color.white(wrapperColorMixin('white', 'black'))};
    ${mods.color.black(wrapperColorMixin('black', 'white'))};
    ${mods.color.blue(wrapperColorMixin('blue', 'white'))};

    ${mods.size.small`
        font-size: 14px;
    `};
    ${mods.size.medium`
        font-size: 16px;
    `};
    ${mods.size.large`
        font-size: 20px;
    `};

    ${mods.disabled.true`
        color: gray;
        box-shadow: none;
        cursor: default;
    `};

    ${mods.spacing[12]`
        padding: 12px 20px;
    `};
`;

export const Root = styled.div`
    margin: 32px;
`;
