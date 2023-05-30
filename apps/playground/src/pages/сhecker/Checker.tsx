import React, { memo } from 'react';
import {
    Root,
    ModsColorBlue,
    ModsColor,
    ModsNoColor,
    ModsNoColorBlue,
    FnModsColor,
    FnModsColorBg,
    FnModsNoColorBg,
    Group,
    FnModsNoColor,
    FnModsColorBlue,
    FnModsNoColorBlue,
    FnModsColorBgBlue,
    FnModsNoColorBgBlue,
    Wrong,
    FnModsColorBgBlueGreen,
    FnModsNoColorBgBlueGreen,
    FnModsColorBlueBlack,
    FnModsNoColorBlueBlack,
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
                <ModsNoColor>
                    <h4>Color is undefined</h4>
                    <p>mods.no.color``</p>
                    <p>mods.no.color()</p>
                </ModsNoColor>

                <Wrong>
                    <ModsNoColor color="blue">
                        <h4>Color is undefined</h4>
                        <p>Props:</p>
                        <p>$color="blue"</p>
                    </ModsNoColor>
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
                <ModsNoColorBlue $color="black">
                    <h4>Color is not blue and not undefined</h4>
                    <p>mods.no.color.blue``</p>
                    <p>mods.no.color.blue()</p>
                </ModsNoColorBlue>

                <Wrong>
                    <ModsNoColorBlue $color="blue">
                        <h4>Color is not blue and not undefined</h4>
                        <p>Props:</p>
                        <p>$color="blue"</p>
                    </ModsNoColorBlue>

                    <ModsNoColorBlue>
                        <h4>Color is not blue and not undefined</h4>
                        <p>Props:</p>
                        <p>undefined</p>
                    </ModsNoColorBlue>
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
                <FnModsNoColor>
                    <h4>Color is undefined</h4>
                    <p>mods.no('color')``</p>
                    <p>mods.no('color')()</p>
                </FnModsNoColor>

                <Wrong>
                    <FnModsNoColor $color="blue">
                        <h4>Color is undefined</h4>
                        <p>Props:</p>
                        <p>$color="blue"</p>
                    </FnModsNoColor>
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
                <FnModsNoColorBlue $color="black">
                    <h4>Color is not blue and not undefined</h4>
                    <p>mods.no('color', 'blue')``</p>
                    <p>mods.no('color', 'blue')()</p>
                </FnModsNoColorBlue>

                <Wrong>
                    <FnModsNoColorBlue $color="blue">
                        <h4>Color is not blue and not undefined</h4>
                        <p>Props:</p>
                        <p>$color="blue"</p>
                    </FnModsNoColorBlue>

                    <FnModsNoColorBlue>
                        <h4>Color is not blue and not undefined</h4>
                        <p>Props:</p>
                        <p>undefined</p>
                    </FnModsNoColorBlue>
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
                <FnModsNoColorBlueBlack $color="white">
                    <h4>Color is not blue or black and not undefined</h4>
                    <p>mods.no('color', ['blue', 'black'])``</p>
                    <p>mods.no('color', ['blue', 'black'])()</p>
                </FnModsNoColorBlueBlack>

                <Wrong>
                    <FnModsNoColorBlueBlack $color="blue">
                        <h4>Color is not blue or black and not undefined</h4>
                        <p>Props:</p>
                        <p>$color="blue"</p>
                    </FnModsNoColorBlueBlack>

                    <FnModsNoColorBlueBlack>
                        <h4>Color is not blue or black and not undefined</h4>
                        <p>Props:</p>
                        <p>undefined</p>
                    </FnModsNoColorBlueBlack>
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
                <FnModsNoColorBg>
                    <h4>Color and bg and both is undefined</h4>
                    <p>mods.no(['color', 'bg'])``</p>
                    <p>mods.no(['color', 'bg'])()</p>
                </FnModsNoColorBg>

                <Wrong>
                    <FnModsNoColorBg $color="blue" $bg="black">
                        <h4>Color and bg and both is undefined</h4>
                        <p>Props:</p>
                        <p>$color="blue" $bg="black"</p>
                    </FnModsNoColorBg>

                    <FnModsNoColorBg $color="blue">
                        <h4>Color and bg and both is undefined</h4>
                        <p>Props:</p>
                        <p>$color="blue" $bg=undefined</p>
                    </FnModsNoColorBg>
                </Wrong>
            </Group>

            <hr />

            <Group>
                <FnModsColorBgBlue $color="blue" $bg="blue">
                    <h4>Color and bg is blue and is not undefined</h4>
                    <p>mods.no(['color', 'bg'], 'blue')``</p>
                    <p>mods.no(['color', 'bg'], 'blue')()</p>
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
                <FnModsNoColorBgBlue $color="black" $bg="green">
                    <h4>Color and bg is not blue and not undefined</h4>
                    <p>mods.no(['color', 'bg'], 'blue')``</p>
                    <p>mods.no(['color', 'bg'], 'blue')()</p>
                </FnModsNoColorBgBlue>

                <Wrong>
                    <FnModsNoColorBgBlue $color="blue" $bg="blue">
                        <h4>Color and bg is not blue and not undefined</h4>
                        <p>Props:</p>
                        <p>$color="blue" $bg="blue"</p>
                    </FnModsNoColorBgBlue>

                    <FnModsNoColorBgBlue $color="blue" $bg="green">
                        <h4>Color and bg is not blue and not undefined</h4>
                        <p>Props:</p>
                        <p>$color="blue" $bg="green"</p>
                    </FnModsNoColorBgBlue>

                    <FnModsNoColorBgBlue $bg="green">
                        <h4>Color and bg is not blue and not undefined</h4>
                        <p>Props:</p>
                        <p>$color=undefined $bg="green"</p>
                    </FnModsNoColorBgBlue>

                    <FnModsNoColorBgBlue>
                        <h4>Color and bg is not blue and not undefined</h4>
                        <p>Props:</p>
                        <p>$color=undefined $bg=undefined</p>
                    </FnModsNoColorBgBlue>
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
                <FnModsNoColorBgBlueGreen $color="blue" $bg="green">
                    <h4>
                        Color and bg together is not blue or green and not
                        undefined
                    </h4>
                    <p>mods.no(['color', 'bg'], ['blue', 'green'])``</p>
                    <p>mods.no(['color', 'bg'], ['blue', 'green'])()</p>
                </FnModsNoColorBgBlueGreen>

                <Wrong>
                    <FnModsNoColorBgBlueGreen $color="blue" $bg="blue">
                        <h4>
                            Color and bg together is not blue or green and not
                            undefined
                        </h4>
                        <p>Props:</p>
                        <p>$color="blue" $bg="blue"</p>
                    </FnModsNoColorBgBlueGreen>

                    <FnModsNoColorBgBlueGreen $color="blue">
                        <h4>
                            Color and bg together is not blue or green and not
                            undefined
                        </h4>
                        <p>Props:</p>
                        <p>$color="blue" $bg=undefined</p>
                    </FnModsNoColorBgBlueGreen>

                    <FnModsNoColorBgBlueGreen $bg="black">
                        <h4>
                            Color and bg together is not blue or green and not
                            undefined
                        </h4>
                        <p>Props:</p>
                        <p>$color=undefined $bg="black"</p>
                    </FnModsNoColorBgBlueGreen>

                    <FnModsNoColorBgBlueGreen>
                        <h4>
                            Color and bg together is not blue or green and not
                            undefined
                        </h4>
                        <p>Props:</p>
                        <p>$color=undefined $bg=undefined</p>
                    </FnModsNoColorBgBlueGreen>
                </Wrong>
            </Group>
        </Root>
    );
});

export default Checker;
