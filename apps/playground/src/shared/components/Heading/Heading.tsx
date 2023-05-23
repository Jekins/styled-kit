import { FC, memo, PropsWithChildren } from 'react';
import { HeadingProps } from './heading.types';
import { Root } from './Heading.styles';

const Heading: FC<PropsWithChildren<HeadingProps>> = memo((props) => {
    const { title, children, ...restProps } = props;

    return (
        <Root title={title} {...restProps}>
            {children}
        </Root>
    );
});

export default Heading;
