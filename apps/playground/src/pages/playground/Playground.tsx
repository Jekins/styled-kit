import { Button, Root, Wrapper } from './Playground.styles';
import React, { useState } from 'react';

const Playground = () => {
    const [disabled, toggleDisabled] = useState(false);

    return (
        <Root>
            <h1>Playground</h1>

            <Wrapper
                $size="large"
                $color="white"
                $spacing={12}
                $disabled={disabled}
            >
                {`Disabled: ${disabled}`}
            </Wrapper>

            <Button onClick={() => toggleDisabled((status) => !status)}>
                Switching disabled mode
            </Button>
        </Root>
    );
};

export default Playground;
