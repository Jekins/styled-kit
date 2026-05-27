import * as React from 'react';
import { renderToString } from 'react-dom/server';
import styled, { ServerStyleSheet } from 'styled-components';
import { initMods } from './mods';

const config = {
    color: ['red', 'blue', 'green'],
    bg: ['red', 'blue', 'green'],
    size: ['sm', 'md', 'lg'],
    spacing: [8, 12],
    disabled: [true, false],
} as const;

const mods = initMods(config);

type Props = {
    $color?: (typeof config.color)[number];
    $bg?: (typeof config.bg)[number];
    $size?: (typeof config.size)[number];
    $spacing?: (typeof config.spacing)[number];
    $disabled?: boolean;
};

const renderCss = (el: React.ReactElement): string => {
    const sheet = new ServerStyleSheet();

    try {
        renderToString(sheet.collectStyles(el));

        return sheet.getStyleTags();
    } finally {
        sheet.seal();
    }
};

describe('initMods — object mode', () => {
    describe('mods.color.red', () => {
        const Box = styled.div<Props>`
            ${mods.color.red`background: red;`};
        `;

        it('applies when $color === "red"', () => {
            expect(renderCss(<Box $color="red" />)).toContain('background:red');
        });

        it('does not apply when $color is a different value', () => {
            expect(renderCss(<Box $color="blue" />)).not.toContain(
                'background:red'
            );
        });

        it('does not apply when $color is undefined', () => {
            expect(renderCss(<Box />)).not.toContain('background:red');
        });
    });

    describe('mods.color (without value)', () => {
        const Box = styled.div<Props>`
            ${mods.color`color: white;`};
        `;

        it('applies when $color is any defined value', () => {
            expect(renderCss(<Box $color="red" />)).toContain('color:white');
            expect(renderCss(<Box $color="blue" />)).toContain('color:white');
        });

        it('does not apply when $color is undefined', () => {
            expect(renderCss(<Box />)).not.toContain('color:white');
        });
    });

    describe('mods.not.color.red', () => {
        const Box = styled.div<Props>`
            ${mods.not.color.red`background: red;`};
        `;

        it('applies when $color is set to anything but "red"', () => {
            expect(renderCss(<Box $color="blue" />)).toContain('background:red');
        });

        it('does not apply when $color === "red"', () => {
            expect(renderCss(<Box $color="red" />)).not.toContain(
                'background:red'
            );
        });

        it('does not apply when $color is undefined', () => {
            expect(renderCss(<Box />)).not.toContain('background:red');
        });
    });

    describe('mods.not.color (without value)', () => {
        const Box = styled.div<Props>`
            ${mods.not.color`color: white;`};
        `;

        it('applies when $color is undefined', () => {
            expect(renderCss(<Box />)).toContain('color:white');
        });

        it('does not apply when $color is set', () => {
            expect(renderCss(<Box $color="red" />)).not.toContain('color:white');
        });
    });

    describe('value callback', () => {
        const Box = styled.div<Props>`
            ${mods.color(
                (value) => `background: ${value === 'blue' ? 'navy' : 'gray'};`
            )};
        `;

        it('receives the actual prop value', () => {
            expect(renderCss(<Box $color="blue" />)).toContain('background:navy');
            expect(renderCss(<Box $color="red" />)).toContain('background:gray');
        });
    });
});

describe('initMods — function mode (single name)', () => {
    describe('mods("color", "red")', () => {
        const Box = styled.div<Props>`
            ${mods('color', 'red')`background: red;`};
        `;

        it('applies when $color === "red"', () => {
            expect(renderCss(<Box $color="red" />)).toContain('background:red');
        });

        it('does not apply when $color !== "red"', () => {
            expect(renderCss(<Box $color="blue" />)).not.toContain(
                'background:red'
            );
        });
    });

    describe('mods("color", ["red", "blue"])', () => {
        const Box = styled.div<Props>`
            ${mods('color', ['red', 'blue'])`background: red;`};
        `;

        it('applies when $color is one of the values', () => {
            expect(renderCss(<Box $color="red" />)).toContain('background:red');
            expect(renderCss(<Box $color="blue" />)).toContain('background:red');
        });

        it('does not apply when $color is not in the list', () => {
            expect(renderCss(<Box $color="green" />)).not.toContain(
                'background:red'
            );
        });
    });

    describe('mods.not("color", "red") — regression for fix #1', () => {
        const Box = styled.div<Props>`
            ${mods.not('color', 'red')`background: red;`};
        `;

        it('applies when $color !== "red"', () => {
            expect(renderCss(<Box $color="blue" />)).toContain('background:red');
        });

        it('does not apply when $color === "red"', () => {
            expect(renderCss(<Box $color="red" />)).not.toContain(
                'background:red'
            );
        });

        it('callback receives the actual non-matching value', () => {
            const CbBox = styled.div<Props>`
                ${mods.not(
                    'color',
                    'red'
                )(
                    (value) =>
                        `background: ${value === 'blue' ? 'navy' : 'gray'};`
                )};
            `;

            expect(renderCss(<CbBox $color="blue" />)).toContain(
                'background:navy'
            );
            expect(renderCss(<CbBox $color="green" />)).toContain(
                'background:gray'
            );
        });
    });
});

describe('initMods — function mode (array of names)', () => {
    describe('mods(["color", "bg"], "blue")', () => {
        const Box = styled.div<Props>`
            ${mods(['color', 'bg'], 'blue')`background: red;`};
        `;

        it('applies only when ALL named props equal the value', () => {
            expect(renderCss(<Box $color="blue" $bg="blue" />)).toContain(
                'background:red'
            );
        });

        it('does not apply when only some match', () => {
            expect(renderCss(<Box $color="blue" $bg="red" />)).not.toContain(
                'background:red'
            );
        });

        it('does not apply when none match', () => {
            expect(renderCss(<Box $color="red" $bg="red" />)).not.toContain(
                'background:red'
            );
        });
    });

    describe('mods.not(["color", "bg"]) — fix #3 path (multi-name, no value)', () => {
        const Box = styled.div<Props>`
            ${mods.not(['color', 'bg'])`color: white;`};
        `;

        it('applies only when ALL named props are undefined', () => {
            expect(renderCss(<Box />)).toContain('color:white');
        });

        it('does not apply when at least one is defined', () => {
            expect(renderCss(<Box $color="red" />)).not.toContain('color:white');
            expect(renderCss(<Box $bg="red" />)).not.toContain('color:white');
        });
    });

    describe('mods.not("color") — single string, fix #3 footgun', () => {
        const Box = styled.div<Props>`
            ${mods.not('color')`color: white;`};
        `;

        it('applies when $color is undefined', () => {
            expect(renderCss(<Box />)).toContain('color:white');
        });

        it('does not apply when $color is defined', () => {
            expect(renderCss(<Box $color="red" />)).not.toContain('color:white');
        });
    });
});

describe('initMods — boolean modifiers', () => {
    const Box = styled.div<Props>`
        ${mods.disabled.true`opacity: 0.5;`};
        ${mods.disabled.false`opacity: 1;`};
    `;

    it('mods.disabled.true matches when $disabled === true', () => {
        expect(renderCss(<Box $disabled={true} />)).toContain('opacity:0.5');
    });

    it('mods.disabled.false matches when $disabled === false', () => {
        expect(renderCss(<Box $disabled={false} />)).toContain('opacity:1');
    });

    it('mods.disabled.false matches when $disabled is undefined (boolean default)', () => {
        expect(renderCss(<Box />)).toContain('opacity:1');
    });
});

describe('initMods — numeric modifier values', () => {
    const Box = styled.div<Props>`
        ${mods.spacing[12]`padding: 12px;`};
    `;

    it('matches the numeric value', () => {
        expect(renderCss(<Box $spacing={12} />)).toContain('padding:12px');
    });

    it('does not match a different numeric value', () => {
        expect(renderCss(<Box $spacing={8} />)).not.toContain('padding:12px');
    });
});
