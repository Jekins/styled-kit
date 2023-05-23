import { Button, Root, Wrapper } from './Playground.styles';
import React, { useState } from 'react';
import { Heading } from '../../shared/components';

const Playground = () => {
    const [disabled, toggleDisabled] = useState(false);

    return (
        <Root>
            <Heading title="Look at this!">StyledKit library</Heading>

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
