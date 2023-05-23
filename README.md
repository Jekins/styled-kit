# StyledKit

StyledKit is an innovative library designed specifically to make working with [styled-components](https://styled-components.com/) easier.

It provides convenient tools and features that allow developers to add modifiers to components quickly and efficiently,
greatly speeding up the styling process.

### Packages:

[@styled-kit/mods](libs/mods/README.md) - allows you to write modifiers for Styled Components
and with autocomplete. As well as automatically generate for them typing.

```ts
export const StyledComponent = styled.div<Mod<'size'>>`
    ${mods.size.small`
        font-size: 14px;
    `};
`;
```
