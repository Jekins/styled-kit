# Modifiers with autocomplete for Styled Components

This library allows you to write modifiers for [Styled Components](https://styled-components.com/) via Dot Notation
and with autocomplete. As well as automatically generate for them [typing](https://www.typescriptlang.org/).

## Quick look
Apply the styles if the `size` property is `small`:
```ts
export const StyledComponent = styled.div<Mod<'size'>>`
    ${mods.size.small`
        font-size: 14px;
    `};
`;
```

Apply the styles if the `disabled` property is `true`:
```ts
export const StyledComponent = styled.div<Mod<'disabled'>>`
    ${mods.disabled.true`
        color: gray;
    `};
`;
```

Apply styles if the custom property `customProp` is equal to `customValue`:
```ts
export const StyledComponent = styled.div<{ customProp: string }>`
    ${mods.is('customProp', 'customValue')`
        background: black;
    `};
`;
```

Apply the styles if the custom property `customProp` is `true`:
```ts
export const StyledComponent = styled.div<{ customProp: boolean }>`
    ${mods.is('customProp')`
        background: black;
    `};
`;
```

# Contents
[Installing](#setup)  
[Setting up modifiers](#initMods)  
[Setting types for modifiers](#initTypes)  
[Using types](#usageTypes)  
[Using modifiers](#usage)  

<a name="setup"><h2>Installing</h2></a>
You can install the library using the `npm` or `Yarn` package manager.

Installation example using `npm`:
```
npm install @styled-kit/mods
```

An example installation using `Yarn':
```
yarn add @styled-kit/mods
```

<a name="initMods"><h2>Setting up modifiers</h2></a>
To be able to use modifiers via Dot Notation,
you must define in advance what they can be and what their values are. 

### Creating a modifier configuration
To configure modifiers, create a `config` configuration object.

You can create this object in any file in your project, but as an option,
you can create a file `styled.config.ts` (or `styled.config.js` if you're not using TypeScript)
Next to the `App` component.

_./src/styled.config.ts_
```ts
export const config = <const>{
    size: ['small', 'medium', 'large'],
    spacing: [8, 12],
    disabled: [true, false],
};
```

Describe in `config` what modifiers with what values you can have.
Over time, you can add to this object as new modifiers are needed.

<b>Note:</b> In TypeScript you must specify the `<const>` type for the `config` object,
to fix its values and ensure that typing works correctly.

### Initializing the configuration
In the `App` component, import your configuration and initialize the modifiers,
using the `initMods` function.

You can initialize the modifiers in any file of your project, but
it is important that the initialization is done only once at application startup.
The `mods` object can then be reused in components of your application.

_./src/App.ts_
```ts
import { initMods } from '@styled-kit/mods';
import { config } from './styled.config';

export const mods = initMods(config);

const App = () => {
  // App component
}
```

<a name="initTypes"><h2>Setting types for modifiers</h2></a>
To use autocomplete and types for modifiers, you must configure the appropriate TypeScript types.

You can make type settings in any file of your project, but as an option,
you can do this in `styled.config.ts` just below your configuration:

_./src/styled.config.ts_
```ts
import { ModConfigType, ModType } from '@styled-kit/mods';

export const config = <const>{
    size: ['small', 'medium', 'large'],
    spacing: [8, 12],
    disabled: [true, false],
};

type ModConfig = ModConfigType<typeof config>;

export type Mod<M extends keyof ModConfig, V extends ModConfig[M] = undefined> = ModType<ModConfig, M, V>;
```

`ModConfig` is a type representing the configuration structure of modifiers.
It is only needed to create a `Mod` type.

`Mod` is a type representing modifiers, where `M` is the name of the modifier,
and `V` is the value of the modifier _(optional)_.

<a name="usageTypes"><h2>Using types</h2></a>
### Type `Mod`.
This type allows you to define which properties a particular Styled Component can take.

`Mod<'size'>` - returns the type of object with the `size` modifier, with all its values from `config`:
```ts
type ComponentProps = Mod<'size'>

// ComponentProps = {
//  size?: 'small' | 'medium' | 'large';
// }
```

`Mod<'size' | 'disabled'>` - returns object type with `size` and `disabled` modifiers, with all their values from `config`:
```ts
type ComponentProps = Mod<'size' | 'disabled'>

// ComponentProps = {
//  size?: 'small' | 'medium' | 'large';
//  disabled?: boolean;
// }
```

`Mod<'size', 'small' | 'large'>` – Returns the object type with the `size` modifier, with `small` and `large` values:
```ts
type ComponentProps = Mod<'size', 'small' | 'large'>

// ComponentProps = {
//  size?: 'small' | 'large';
// }
```

`Mod<'size', 'small'> & Mod<'disabled', true> & Mod<'spacing', 12>` – returns the object type with `size`, `disabled` and `spacing` modifiers, with the selected values:
```ts
type ComponentProps = Mod<'size', 'small'> & Mod<'disabled', true> & Mod<'spacing', 12>

// ComponentProps = {
//  size?: 'small';
//  disabled?: true;
//  spacing?: 12;
// }
```

## Type `SCProps`
Since version 16 of React [all specified attributes remain on DOM elements](https://legacy.reactjs.org/blog/2017/09/08/dom-attributes-in-react-16.html)
and are not removed even if React does not recognize them. That said, if these attributes are not known to React,
you will see a `Warning' in the developer console in the browser.

To avoid these warnings, [Styled Components recommends](https://styled-components.com/docs/api#transient-props]) use
prefix `$` in front of properties that should not be included in the DOM element.

The `SCProps` type will allow you to write Styled Component property types without the `$` prefix,
but still have valid typing. Internally, it prefixes all types passed to it with `$`.
to all the types passed to it.

Without the `SCProps` type:
```ts
export const StyledComponent = styled.div<Mod<'size'> & { padding: string; }>`
    ${mods.size.small`
        font-size: 14px;
    `};
    
    padding: ${({ padding }) => padding};
`;

<StyledComponent size='small' padding='12px' />
```

With type `SCProps`:
```ts
import { SCProps } from '@styled-kit/mods';

export const StyledComponent = styled.div<SCProps<Mod<'size'> & { padding: string; }>>`
    ${mods.size.small`
        font-size: 14px;
    `};
    
    padding: ${({ $padding }) => $padding};
`;

<StyledComponent $size='small' $padding='12px' />
```

<a name="usage"><h2>Using modifiers</h2></a>
After initializing the modifiers and configuring the types, you can use them in stylized components.

The use of modifiers is done through Dot Notation:
```ts
${mods.size.small`
  font-size: 14px;
`};
```
This means that when the `size` property is equal to `small`, the corresponding styles will be applied.

### Applying a single modifier
```ts
export const StyledComponent = styled.div<Mod<'size'>>`
    ${mods.size.small`
        font-size: 14px;
    `};
    
    ${mods.size.medium`
        font-size: 16px;
    `};
    
    ${mods.size.large`
        font-size: 20px;
    `};
`;
```
In this example, we pass only the name of the `'size'` modifier to the `Mod` type.
This allows you to use all the values of the `'size'` modifier in the stylized component.

### Using multiple modifiers
```ts
export const StyledComponent = styled.div<Mod<'size' | 'disabled'>>`
    ${mods.size.small`
        font-size: 14px;
    `}
    
    ${mods.size.medium`
        font-size: 16px;
    `};
    
    ${mods.size.large`
        font-size: 20px;
    `};

    ${mods.disabled.true`
        color: gray;
    `}

    ${mods.disabled.false`
        color: black;
    `}
`;
```
In this example, we pass several modifier names `'size'` and `'disabled'` to the `Mod` type.
This allows to use all values of both modifiers in a stylized component.

### Sampling limit for modifiers
```ts
export const StyledComponent = styled.div<Mod<'size', 'small' | 'large'>> & Mod<'disabled', true> & Mod<'spacing', 12>>`
    ${mods.size.small`
        font-size: 14px;
    `}
    
    ${mods.size.large`
        font-size: 20px;
    `}

    ${mods.disabled.true`
        color: gray;
    `}

    ${mods.spacing[12]`
        padding: 12px;
    `}
`;
```
In this example, we limit the value selection:
- For the `'size'` modifier to only `'small'` and `'large'`,
- For the modifier `'spacing'` only the value `12`,
- For the modifier `'disabled'` only the value `true`.

This allows you to apply appropriate styles using only the specified modifier values.

### Using private modifiers
Sometimes a component needs a private modifier, which should not be put into the general `config'
for reuse in other components.

To do this, `mods` has a method `is` that can take names of any modifiers and their values,
check their consistency in Styled Component properties and apply appropriate styles, if check is successful.

```ts
export const StyledComponent = styled.div<{ big: boolean; city: 'NY' }>`
    ${mods.is('big', true)`
        font-size: 24px;
    `}
    
     ${mods.is('big', false)`
        font-size: 16px;
    `}

    ${mods.is('city', 'NY')`
        border: 4px solid orange;
    `}
`;
```

If the private modifier type is `boolean` and you want to apply styles when it is `true`,
then in `mods.is` there is no need to specify `true` value, it is applied by default:

```ts
export const StyledComponent = styled.div<{ big: boolean; }>`
    ${mods.is('big')`
        font-size: 24px;
    `}
`;
```