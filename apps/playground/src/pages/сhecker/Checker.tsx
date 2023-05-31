import React, { memo } from 'react';
import {
    Root,
    ModsColorBlue,
    ModsColor,
    ModsNotColor,
    ModsNotColorBlue,
    FnModsColor,
    FnModsColorBg,
    FnModsNotColorBg,
    Group,
    FnModsNotColor,
    FnModsColorBlue,
    FnModsNotColorBlue,
    FnModsColorBgBlue,
    FnModsNotColorBgBlue,
    Wrong,
    FnModsColorBgBlueGreen,
    FnModsNotColorBgBlueGreen,
    FnModsColorBlueBlack,
    FnModsNotColorBlueBlack,
} from './Checker.styles';

const Checker = memo(() => {
    return (
        <Root>
            <h1>Checking rendering styles</h1>

            <h2>Obj mode:</h2>

            <Group>
                <h4>Correct:</h4>

                <Wrong>
                    <h4>Wrong:</h4>
                </Wrong>
            </Group>

            <Group>
                <ModsColor $color="blue">
                    <h4>Any color and not undefined</h4>
                    <p>mods.color``</p>
                    <p>mods.color()</p>
                </ModsColor>

                <Wrong>
                    <ModsColor>
                        <h4>Any color and not undefined</h4>
                        <p>Props:</p>
                        <p>undefined</p>
                    </ModsColor>
                </Wrong>
            </Group>

            <Group>
                <ModsNotColor>
                    <h4>Color is undefined</h4>
                    <p>mods.not.color``</p>
                    <p>mods.not.color()</p>
                </ModsNotColor>

                <Wrong>
                    <ModsNotColor color="blue">
                        <h4>Color is undefined</h4>
                        <p>Props:</p>
                        <p>$color="blue"</p>
                    </ModsNotColor>
                </Wrong>
            </Group>

            <hr />

            <Group>
                <ModsColorBlue $color="blue">
                    <h4>Color is blue and not undefined</h4>
                    <p>mods.color.blue``</p>
                    <p>mods.color.blue()</p>
                </ModsColorBlue>

                <Wrong>
                    <ModsColorBlue $color="black">
                        <h4>Color is blue and not undefined</h4>
                        <p>Props:</p>
                        <p>$color="black"</p>
                    </ModsColorBlue>

                    <ModsColorBlue>
                        <h4>Color is blue and not undefined</h4>
                        <p>Props:</p>
                        <p>undefined</p>
                    </ModsColorBlue>
                </Wrong>
            </Group>

            <Group>
                <ModsNotColorBlue $color="black">
                    <h4>Color is not blue and not undefined</h4>
                    <p>mods.not.color.blue``</p>
                    <p>mods.not.color.blue()</p>
                </ModsNotColorBlue>

                <Wrong>
                    <ModsNotColorBlue $color="blue">
                        <h4>Color is not blue and not undefined</h4>
                        <p>Props:</p>
                        <p>$color="blue"</p>
                    </ModsNotColorBlue>

                    <ModsNotColorBlue>
                        <h4>Color is not blue and not undefined</h4>
                        <p>Props:</p>
                        <p>undefined</p>
                    </ModsNotColorBlue>
                </Wrong>
            </Group>

            <hr />

            <h2>Fn mode:</h2>

            <h4>Mod name is not array:</h4>

            <Group>
                <FnModsColor $color="blue">
                    <h4>Any color and not undefined</h4>
                    <p>mods('color')``</p>
                    <p>mods('color')()</p>
                </FnModsColor>

                <Wrong>
                    <FnModsColor>
                        <h4>Any color and not undefined</h4>
                        <p>Props:</p>
                        <p>undefined</p>
                    </FnModsColor>
                </Wrong>
            </Group>

            <Group>
                <FnModsNotColor>
                    <h4>Color is undefined</h4>
                    <p>mods.not('color')``</p>
                    <p>mods.not('color')()</p>
                </FnModsNotColor>

                <Wrong>
                    <FnModsNotColor $color="blue">
                        <h4>Color is undefined</h4>
                        <p>Props:</p>
                        <p>$color="blue"</p>
                    </FnModsNotColor>
                </Wrong>
            </Group>

            <hr />

            <Group>
                <FnModsColorBlue $color="blue">
                    <h4>Color is blue and not undefined</h4>
                    <p>mods('color', 'blue')``</p>
                    <p>mods('color', 'blue')()</p>
                </FnModsColorBlue>

                <Wrong>
                    <FnModsColorBlue $color="black">
                        <h4>Color is blue and not undefined</h4>
                        <p>Props:</p>
                        <p>$color="black"</p>
                    </FnModsColorBlue>

                    <FnModsColorBlue>
                        <h4>Color is blue and not undefined</h4>
                        <p>Props:</p>
                        <p>undefined</p>
                    </FnModsColorBlue>
                </Wrong>
            </Group>

            <Group>
                <FnModsNotColorBlue $color="black">
                    <h4>Color is not blue and not undefined</h4>
                    <p>mods.not('color', 'blue')``</p>
                    <p>mods.not('color', 'blue')()</p>
                </FnModsNotColorBlue>

                <Wrong>
                    <FnModsNotColorBlue $color="blue">
                        <h4>Color is not blue and not undefined</h4>
                        <p>Props:</p>
                        <p>$color="blue"</p>
                    </FnModsNotColorBlue>

                    <FnModsNotColorBlue>
                        <h4>Color is not blue and not undefined</h4>
                        <p>Props:</p>
                        <p>undefined</p>
                    </FnModsNotColorBlue>
                </Wrong>
            </Group>

            <hr />

            <Group>
                <FnModsColorBlueBlack $color="blue">
                    <h4>Color is blue or black and not undefined</h4>
                    <p>mods('color', ['blue', 'black'])``</p>
                    <p>mods('color', ['blue', 'black'])()</p>
                </FnModsColorBlueBlack>

                <Wrong>
                    <FnModsColorBlueBlack $color="white">
                        <h4>Color is blue or black and not undefined</h4>
                        <p>Props:</p>
                        <p>$color="white"</p>
                    </FnModsColorBlueBlack>

                    <FnModsColorBlueBlack>
                        <h4>Color is blue or black and not undefined</h4>
                        <p>Props:</p>
                        <p>undefined</p>
                    </FnModsColorBlueBlack>
                </Wrong>
            </Group>

            <Group>
                <FnModsNotColorBlueBlack $color="white">
                    <h4>Color is not blue or black and not undefined</h4>
                    <p>mods.not('color', ['blue', 'black'])``</p>
                    <p>mods.not('color', ['blue', 'black'])()</p>
                </FnModsNotColorBlueBlack>

                <Wrong>
                    <FnModsNotColorBlueBlack $color="blue">
                        <h4>Color is not blue or black and not undefined</h4>
                        <p>Props:</p>
                        <p>$color="blue"</p>
                    </FnModsNotColorBlueBlack>

                    <FnModsNotColorBlueBlack>
                        <h4>Color is not blue or black and not undefined</h4>
                        <p>Props:</p>
                        <p>undefined</p>
                    </FnModsNotColorBlueBlack>
                </Wrong>
            </Group>

            <hr />

            <h4>Mod name is array:</h4>

            <Group>
                <FnModsColorBg $color="blue" $bg="black">
                    <h4>Any color and any bg and both is not undefined</h4>
                    <p>mods(['color', 'bg'])``</p>
                    <p>mods(['color', 'bg'])()</p>
                </FnModsColorBg>

                <Wrong>
                    <FnModsColorBg $color="blue">
                        <h4>Any color and any bg and both is not undefined</h4>
                        <p>Props:</p>
                        <p>$color="blue" $bg=undefined</p>
                    </FnModsColorBg>

                    <FnModsColorBg>
                        <h4>Any color and any bg and both is not undefined</h4>
                        <p>Props:</p>
                        <p>$color=undefined $bg=undefined</p>
                    </FnModsColorBg>
                </Wrong>
            </Group>

            <Group>
                <FnModsNotColorBg>
                    <h4>Color and bg and both is undefined</h4>
                    <p>mods.not(['color', 'bg'])``</p>
                    <p>mods.not(['color', 'bg'])()</p>
                </FnModsNotColorBg>

                <Wrong>
                    <FnModsNotColorBg $color="blue" $bg="black">
                        <h4>Color and bg and both is undefined</h4>
                        <p>Props:</p>
                        <p>$color="blue" $bg="black"</p>
                    </FnModsNotColorBg>

                    <FnModsNotColorBg $color="blue">
                        <h4>Color and bg and both is undefined</h4>
                        <p>Props:</p>
                        <p>$color="blue" $bg=undefined</p>
                    </FnModsNotColorBg>
                </Wrong>
            </Group>

            <hr />

            <Group>
                <FnModsColorBgBlue $color="blue" $bg="blue">
                    <h4>Color and bg is blue and is not undefined</h4>
                    <p>mods.not(['color', 'bg'], 'blue')``</p>
                    <p>mods.not(['color', 'bg'], 'blue')()</p>
                </FnModsColorBgBlue>

                <Wrong>
                    <FnModsColorBgBlue $color="blue" $bg="green">
                        <h4>Color and bg is blue and is not undefined</h4>
                        <p>Props:</p>
                        <p>$color="blue" $bg="green"</p>
                    </FnModsColorBgBlue>

                    <FnModsColorBgBlue $color="blue">
                        <h4>Color and bg is blue and is not undefined</h4>
                        <p>Props:</p>
                        <p>$color="blue" $bg=undefined</p>
                    </FnModsColorBgBlue>

                    <FnModsColorBgBlue>
                        <h4>Color and bg is blue and is not undefined</h4>
                        <p>Props:</p>
                        <p>$color=undefined $bg=undefined</p>
                    </FnModsColorBgBlue>
                </Wrong>
            </Group>

            <Group>
                <FnModsNotColorBgBlue $color="black" $bg="green">
                    <h4>Color and bg is not blue and not undefined</h4>
                    <p>mods.not(['color', 'bg'], 'blue')``</p>
                    <p>mods.not(['color', 'bg'], 'blue')()</p>
                </FnModsNotColorBgBlue>

                <Wrong>
                    <FnModsNotColorBgBlue $color="blue" $bg="blue">
                        <h4>Color and bg is not blue and not undefined</h4>
                        <p>Props:</p>
                        <p>$color="blue" $bg="blue"</p>
                    </FnModsNotColorBgBlue>

                    <FnModsNotColorBgBlue $color="blue" $bg="green">
                        <h4>Color and bg is not blue and not undefined</h4>
                        <p>Props:</p>
                        <p>$color="blue" $bg="green"</p>
                    </FnModsNotColorBgBlue>

                    <FnModsNotColorBgBlue $bg="green">
                        <h4>Color and bg is not blue and not undefined</h4>
                        <p>Props:</p>
                        <p>$color=undefined $bg="green"</p>
                    </FnModsNotColorBgBlue>

                    <FnModsNotColorBgBlue>
                        <h4>Color and bg is not blue and not undefined</h4>
                        <p>Props:</p>
                        <p>$color=undefined $bg=undefined</p>
                    </FnModsNotColorBgBlue>
                </Wrong>
            </Group>

            <hr />

            <Group>
                <FnModsColorBgBlueGreen $color="blue" $bg="blue">
                    <h4>
                        Color and bg together is blue or green and not undefined
                    </h4>
                    <p>mods(['color', 'bg'], ['blue', 'green'])``</p>
                    <p>mods(['color', 'bg'], ['blue', 'green'])()</p>
                </FnModsColorBgBlueGreen>

                <Wrong>
                    <FnModsColorBgBlueGreen $color="blue" $bg="green">
                        <h4>
                            Color and bg together is blue or green and not
                            undefined
                        </h4>
                        <p>Props:</p>
                        <p>$color="blue" $bg="green"</p>
                    </FnModsColorBgBlueGreen>

                    <FnModsColorBgBlueGreen $color="black" $bg="black">
                        <h4>
                            Color and bg together is blue or green and not
                            undefined
                        </h4>
                        <p>Props:</p>
                        <p>$color="black" $bg="black"</p>
                    </FnModsColorBgBlueGreen>

                    <FnModsColorBgBlueGreen $color="blue">
                        <h4>
                            Color and bg together is blue or green and not
                            undefined
                        </h4>
                        <p>Props:</p>
                        <p>$color="blue" $bg=undefined</p>
                    </FnModsColorBgBlueGreen>

                    <FnModsColorBgBlueGreen>
                        <h4>
                            Color and bg together is blue or green and not
                            undefined
                        </h4>
                        <p>Props:</p>
                        <p>$color=undefined $bg=undefined</p>
                    </FnModsColorBgBlueGreen>
                </Wrong>
            </Group>

            <Group>
                <FnModsNotColorBgBlueGreen $color="blue" $bg="green">
                    <h4>
                        Color and bg together is not blue or green and not
                        undefined
                    </h4>
                    <p>mods.not(['color', 'bg'], ['blue', 'green'])``</p>
                    <p>mods.not(['color', 'bg'], ['blue', 'green'])()</p>
                </FnModsNotColorBgBlueGreen>

                <Wrong>
                    <FnModsNotColorBgBlueGreen $color="blue" $bg="blue">
                        <h4>
                            Color and bg together is not blue or green and not
                            undefined
                        </h4>
                        <p>Props:</p>
                        <p>$color="blue" $bg="blue"</p>
                    </FnModsNotColorBgBlueGreen>

                    <FnModsNotColorBgBlueGreen $color="blue">
                        <h4>
                            Color and bg together is not blue or green and not
                            undefined
                        </h4>
                        <p>Props:</p>
                        <p>$color="blue" $bg=undefined</p>
                    </FnModsNotColorBgBlueGreen>

                    <FnModsNotColorBgBlueGreen $bg="black">
                        <h4>
                            Color and bg together is not blue or green and not
                            undefined
                        </h4>
                        <p>Props:</p>
                        <p>$color=undefined $bg="black"</p>
                    </FnModsNotColorBgBlueGreen>

                    <FnModsNotColorBgBlueGreen>
                        <h4>
                            Color and bg together is not blue or green and not
                            undefined
                        </h4>
                        <p>Props:</p>
                        <p>$color=undefined $bg=undefined</p>
                    </FnModsNotColorBgBlueGreen>
                </Wrong>
            </Group>
        </Root>
    );
});

export default Checker;
