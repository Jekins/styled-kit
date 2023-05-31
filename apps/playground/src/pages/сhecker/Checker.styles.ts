import styled, { css } from 'styled-components';
import { SCProps } from '@styled-kit/mods';
import { mods, Mods } from '../../shared/styled';

/*
 * Obj mode
 */
export const ModsColor = styled.div<SCProps<Mods<'color'>>>`
    ${mods.color`
        color: white;
    `};

    ${mods.color(
        (value, props) => css`
            background-color: ${(value === 'blue' || value === 'black') &&
            'darkslateblue'};
        `
    )};
`;

export const ModsNotColor = styled.div<SCProps<Mods<'color'>>>`
    ${mods.not.color`
        color: white;
    `};

    ${mods.not.color(
        (value, props) => css`
            background-color: darkslateblue;
        `
    )};
`;

export const ModsColorBlue = styled.div<SCProps<Mods<'color'>>>`
    ${mods.color.blue`
        color: white;
    `};

    ${mods.color.blue(
        (value, props) => css`
            background-color: ${value === 'blue' && 'darkslateblue'};
        `
    )};
`;

export const ModsNotColorBlue = styled.div<SCProps<Mods<'color'>>>`
    ${mods.not.color.blue`
        color: white;
    `};

    ${mods.not.color.blue(
        (value, props) => css`
            background-color: ${value === 'black' && 'darkslateblue'};
        `
    )};
`;

/*
 * Fn mode
 */

/* Mod name is not array */

export const FnModsColor = styled.div<SCProps<Mods<'color'>>>`
    ${mods('color')`
        color: white;
    `};

    ${mods('color')(
        (value, props) => css`
            background-color: ${value === 'blue' && 'darkslateblue'};
        `
    )};
`;

export const FnModsNotColor = styled.div<SCProps<Mods<'color'>>>`
    ${mods.not('color')`
        color: white;
    `};

    ${mods.not('color')(
        (value, props) => css`
            background-color: ${value === undefined && 'darkslateblue'};
        `
    )};
`;

export const FnModsColorBlue = styled.div<SCProps<Mods<'color'>>>`
    ${mods('color', 'blue')`
        color: white;
    `};

    ${mods(
        'color',
        'blue'
    )(
        (value, props) => css`
            background-color: ${value === 'blue' && 'darkslateblue'};
        `
    )};
`;

export const FnModsNotColorBlue = styled.div<SCProps<Mods<'color'>>>`
    ${mods.not('color', 'blue')`
        color: white;
    `};

    ${mods.not(
        'color',
        'blue'
    )(
        (value, props) => css`
            background-color: ${value === 'black' && 'darkslateblue'};
        `
    )};
`;

export const FnModsColorBlueBlack = styled.div<SCProps<Mods<'color'>>>`
    ${mods('color', ['blue', 'black'])`
        color: white;
    `};

    ${mods('color', ['blue', 'black'] as const)(
        (value, props) => css`
            background-color: ${value === 'blue' && 'darkslateblue'};
        `
    )};
`;

export const FnModsNotColorBlueBlack = styled.div<SCProps<Mods<'color'>>>`
    ${mods.not('color', ['blue', 'black'])`
        color: white;
    `};

    ${mods.not('color', ['blue', 'black'] as const)(
        (value, props) => css`
            background-color: ${value === 'white' && 'darkslateblue'};
        `
    )};
`;

/* Mod name is array */

export const FnModsColorBg = styled.div<SCProps<Mods<'color' | 'bg'>>>`
    ${mods(['color', 'bg'])`
        color: white;
    `};

    ${mods(['color', 'bg'] as const)(
        (value, props) => css`
            background-color: ${value.color === 'blue' &&
            value.bg === 'black' &&
            'darkslateblue'};
        `
    )};
`;

export const FnModsNotColorBg = styled.div<SCProps<Mods<'color' | 'bg'>>>`
    ${mods.not(['color', 'bg'])`
        color: white;
    `};

    ${mods.not(['color', 'bg'] as const)(
        (value, props) => css`
            background-color: ${value.color === undefined &&
            value.bg === undefined &&
            'darkslateblue'};
        `
    )};
`;

export const FnModsColorBgBlue = styled.div<SCProps<Mods<'color' | 'bg'>>>`
    ${mods(['color', 'bg'], 'blue')`
        color: white;
    `};

    ${mods(
        ['color', 'bg'] as const,
        'blue'
    )(
        (value, props) => css`
            background-color: ${value === 'blue' && 'darkslateblue'};
        `
    )};
`;

export const FnModsNotColorBgBlue = styled.div<SCProps<Mods<'color' | 'bg'>>>`
    ${mods.not(['color', 'bg'], 'blue')`
        color: white;
    `};

    ${mods.not(
        ['color', 'bg'] as const,
        'blue'
    )(
        (value, props) => css`
            background-color: ${value.color === 'black' &&
            value.bg === 'green' &&
            'darkslateblue'};
        `
    )};
`;

export const FnModsColorBgBlueGreen = styled.div<SCProps<Mods<'color' | 'bg'>>>`
    ${mods(['color', 'bg'], ['blue', 'green'])`
        color: white;
    `};

    ${mods(
        ['color', 'bg'] as const,
        ['blue', 'green'] as const
    )(
        (value, props) => css`
            background-color: ${value.color === 'blue' &&
            value.bg === 'blue' &&
            'darkslateblue'};
        `
    )};
`;

export const FnModsNotColorBgBlueGreen = styled.div<
    SCProps<Mods<'color' | 'bg'>>
>`
    ${mods.not(['color', 'bg'], ['blue', 'green'])`
        color: white;
    `};

    ${mods.not(
        ['color', 'bg'],
        ['blue', 'green']
    )(
        (value, props) => css`
            background-color: ${value.color === 'blue' &&
            value.bg === 'green' &&
            'darkslateblue'};
        `
    )};
`;

const cardMixin = css`
    margin: 8px;
    padding: 20px 20px;
    border-radius: 20px;
    font-size: 16px;
    line-height: 24px;
    width: 23%;
    flex-shrink: 0;
`;

export const Group = styled.div`
    display: flex;
    margin: -8px;
    width: 100%;

    > *:first-child {
        ${cardMixin};
    }
`;

export const Wrong = styled.div`
    display: flex;
    width: 100%;
    flex-wrap: wrap;

    > :not(h4) {
        box-shadow: rgba(151, 158, 176, 0.2) 0 10px 30px;
    }

    > * {
        ${cardMixin};
    }
`;

export const Root = styled.div`
    border-radius: 30px;
    background-color: #eceff4;
    margin: 32px;
    padding: 32px;
`;
