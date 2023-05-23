# Modifiers with autocomplete for Styled Components and Linaria

This library allows you to write modifiers for [Styled Components](https://styled-components.com/)
and [Linaria](https://linaria.dev/) via Dot Notation
and with autocomplete. As well as automatically generate for them [types](https://www.typescriptlang.org/).

## Features

-   Quickly write styles with respect to modifiers
-   Using modifiers via Dot Notation
-   Writing modifiers with autocomplete
-   Uniform modifiers and their values
-   Automatic types of modifiers
-   Possibility to use private modifiers
-   Ultra-small size

## A Quick Look

### Setup

_src/shared/styled/config.ts_

```ts
// Configure modifier names and their values
const config = {
    size: ['small', 'medium', 'large'],
    spacing: [8, 12],
    disabled: [true, false],
} as const;
```

_src/shared/styled/types.ts_

```ts
import { ModsConfigType, ModsType } from '@styled-kit/mods';

// Creating types for modifiers
type ModsConfig = ModsConfigType<typeof config>;

export type Mods<
    M extends keyof ModsConfig = keyof ModsConfig,
    V extends ModsConfig[M] = undefined
> = ModsType<ModsConfig, M, V>;
```

_src/shared/styled/index.ts_

```ts
import { initMods } from '@styled-kit/mods';
import { config } from './config';

// Initializing modifiers by config
export const mods = initMods(config);
export type { Mods } from './types';
```

### Usage

Apply the styles if the `size` property is `small`:

```ts
import { mods, Mods } from '../shared/styled';

export const StyledComponent = styled.div<Mods<'size'>>`
    ${mods.size.small`
        font-size: 14px;
    `};
`;
```

Apply the styles if the `disabled` property is `true`:

```ts
import { mods, Mods } from '../shared/styled';

export const StyledComponent = styled.div<Mods<'disabled'>>`
    ${mods.disabled.true`
        color: gray;
    `};
`;
```

Apply styles if the custom property `customProp` is equal to `customValue`:

```ts
import { mods, Mods } from '../shared/styled';

export const StyledComponent = styled.div<{ customProp: string }>`
    ${mods.is('customProp', 'customValue')`
        background: black;
    `};
`;
```

Apply the styles if the custom property `customProp` is not `null` or `undefined`:

```ts
import { mods, Mods } from '../shared/styled';

export const StyledComponent = styled.div<{ customProp: string }>`
    ${mods.has('customProp')`
        background: black;
    `};
`;
```

## Demo

[![Live demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/withered-firefly-zfltek)

# Documentation

-   [Installation](#installation)
-   [Setup](#setup)
    -   [Creating a modifiers configuration](#creating-a-modifiers-configuration)
    -   [Creating a types](#creating-a-types)
    -   [Initializing the modifiers](#initializing-the-modifiers)
-   [Usage types](#usage-types)
    -   [Type `Mods`](#type-mod)
    -   [Type `RMods`](#type-rmods)
    -   [Type `SCProps`](#type-scprops)
-   [Usage modifiers](#usage-modifiers)
    -   [Using a single modifier](#using-a-single-modifier)
    -   [Using multiple modifiers](#using-multiple-modifiers)
    -   [Sampling limit for modifiers](#sampling-limit-for-modifiers)
    -   [Using multiple conditions](#using-multiple-conditions)
    -   [Using private modifiers](#using-private-modifiers)
        -   [Method `mods.is`](#method-modsis)
        -   [Method `mods.has`](#method-modshas)
-   [Highlight syntax](#highlight-syntax)
    -   [Editor Plugins](#editor-plugins)
        -   [VS Code](#vs-code)
        -   [WebStorm](#webstorm)
        -   [Atom](#atom)
        -   [Sublime text](#sublime-text)

## Installation

You can install the library using the `npm` or `Yarn` package manager.

Installation example using `npm`:

```
npm install @styled-kit/mods
```

An example installation using `Yarn`:

```
yarn add @styled-kit/mods
```

## Setup

To be able to use modifiers via Dot Notation,
you must define in advance what they can be and what their values are.

### Creating a modifiers configuration

To configure modifiers, create a `config` configuration object.

You can create this object in any file in your project, but as an option,
you can make such a file system:

_src/shared/styled/config.ts_

```ts
const config = {
    size: ['small', 'medium', 'large'],
    spacing: [8, 12],
    disabled: [true, false],
} as const;
```

Describe in `config` what modifiers with what values you can have.
Over time, you can add to this object as new modifiers are needed.

<b>Note:</b> In TypeScript you must specify the `as const` type for the `config` object,
to fix its values and ensure that typing works correctly.

### Creating a types

To use autocomplete and types for modifiers, you must configure the appropriate TypeScript types.

You can make type settings in any file of your project, but as an option,
you can make such a file system:

_src/shared/styled/types.ts_

```ts
import { ModsConfigType, ModsType } from '@styled-kit/mods';

type ModsConfig = ModsConfigType<typeof config>;

export type Mods<
    M extends keyof ModsConfig = keyof ModsConfig,
    V extends ModsConfig[M] = undefined
> = ModsType<ModsConfig, M, V>;

export type RMods<
    M extends keyof ModsConfig = keyof ModsConfig,
    V extends ModsConfig[M] = undefined
> = Required<Mods<M, V>>;
```

`ModsConfig` is a type representing the configuration structure of modifiers.
It is only needed to create a `Mods` type.

`Mods` is a type representing modifiers, where `M` is the name of the modifier,
and `V` is the value of the modifier _(optional)_. All modifiers can be `undefined`.

`RMods` This is a copy of `Mods`, but all modifiers `Required` and cannot be `undefined`.

### Initializing the modifiers

You can initialize the modifiers in any file of your project, but
it is important that the initialization is done only once at application startup.
The `mods` object can then be reused in components of your application.

_src/shared/styled/index.ts_

```ts
import { initMods } from '@styled-kit/mods';
import { config } from './config';

export const mods = initMods(config);
export type { Mods } from './types';
```

## Usage types

### Type `Mods`

This type allows you to define which properties a particular Styled Component can take.

`Mods<'size'>` - returns the type of object with the `size` modifier, with all its values from `config`:

```ts
type ComponentProps = Mods<'size'>;

// ComponentProps = {
//    size?: 'small' | 'medium' | 'large';
// }
```

`Mods<'size' | 'disabled'>` - returns object type with `size` and `disabled` modifiers, with all their values
from `config`:

```ts
type ComponentProps = Mods<'size' | 'disabled'>;

// ComponentProps = {
//    size?: 'small' | 'medium' | 'large';
//    disabled?: boolean;
// }
```

`Mods<'size', 'small' | 'large'>` – Returns the object type with the `size` modifier, with `small` and `large` values:

```ts
type ComponentProps = Mods<'size', 'small' | 'large'>;

// ComponentProps = {
//    size?: 'small' | 'large';
// }
```

`Mods<'size', 'small'> & Mods<'disabled', true> & Mods<'spacing', 12>` – returns the object type with `size`, `disabled`
and `spacing` modifiers, with the selected values:

```ts
type ComponentProps = Mods<'size', 'small'> &
    Mods<'disabled', true> &
    Mods<'spacing', 12>;

// ComponentProps = {
//    size?: 'small';
//    disabled?: true;
//    spacing?: 12;
// }
```

### Type `RMods`

As stated earlier, this is a copy of the `Mods` type, but wrapped in `Required`. This removes the possibility of passing
a `undefined` value to the modifier.

You may need `RMods` if you want to make the modifier required or describe `mixin`:

```ts
type ComponentProps = RMods<'size'>;

// ComponentProps = {
//    size: 'small' | 'medium' | 'large';
// }
```

Creating a `mixin`:

```ts
const sizeMixin = (
    spacing: RMods['spacing'],
    fontSize: RMods['fontSize']
) => css`
    padding: ${spacing}px;
    font-size: ${fontSize}px;
`;

const StyledComponen = styled.div<Mods<'size'>>`
    ${mods.size.small(sizeMixin(12, 16))};
    ${mods.size.medium(sizeMixin(16, 20))};
    ${mods.size.large(sizeMixin(20, 24))};
`;
```

### Type `SCProps`

Since version 16 of
React [all specified attributes remain on DOM elements](https://legacy.reactjs.org/blog/2017/09/08/dom-attributes-in-react-16.html)
and are not removed even if React does not recognize them. That said, if these attributes are not known to React,
you will see a `Warning' in the developer console in the browser.

To avoid these warnings, [Styled Components recommends](https://styled-components.com/docs/api#transient-props]) use
prefix `$` in front of properties that should not be included in the DOM element.

The `SCProps` type will allow you to write Styled Component property types without the `$` prefix,
but still have valid typing. Internally, it prefixes all types passed to it with `$`.
to all the types passed to it.

_Without the `SCProps` type:_

```ts
export const StyledComponent = styled.div<Mods<'size'> & { padding: string }>`
    ${mods.size.small`
        font-size: 14px;
    `};

    padding: ${({ padding }) => padding};
`;

<StyledComponent size="small" padding="12px" />;
```

_With the `SCProps` type:_

```ts
import { SCProps } from '@styled-kit/mods';

export const StyledComponent = styled.div<
    SCProps<Mods<'size'> & { padding: string }>
>`
    ${mods.size.small`
        font-size: 14px;
    `};

    padding: ${({ $padding }) => $padding};
`;

<StyledComponent $size="small" $padding="12px" />;
```

## Usage modifiers

After initializing the modifiers and configuring the types, you can use them in stylized components.

The use of modifiers is done through Dot Notation:

```ts
${mods.size.small`
    font-size: 14px;
`};
```

This means that when the `size` property is equal to `small`, the corresponding styles will be applied.

### Using a single modifier

```ts
export const StyledComponent = styled.div<Mods<'size'>>`
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

In this example, we pass only the name of the `'size'` modifier to the `Mods` type.
This allows you to use all the values of the `'size'` modifier in the stylized component.

### Using multiple modifiers

```ts
export const StyledComponent = styled.div<Mods<'size' | 'disabled'>>`
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

In this example, we pass several modifier names `'size'` and `'disabled'` to the `Mods` type.
This allows using all values of both modifiers in a stylized component.

### Sampling limit for modifiers

```ts
export const StyledComponent = styled.div<
    Mods<'size', 'small' | 'large'>> &
    Mods<'disabled', true> &
    Mods<'spacing', 12>
>`
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

-   For the `'size'` modifier to only `'small'` and `'large'`,
-   For the modifier `'spacing'` only the value `12`,
-   For the modifier `'disabled'` only the value `true`.

This allows you to apply appropriate styles using only the specified modifier values.

### Using multiple conditions

```ts
export const StyledComponent = styled.div<Mods<'size' | 'disabled'>>`
    ${mods.disabled.true`
        color: gray;
    `}

    ${mods.size.small`
        font-size: 14px;

        ${mods.disabled.true`
            color: black;
        `}
    `}
`;
```

You can apply multiple conditions to display styles.
Simply nest the modifiers one inside the other.

### Using private modifiers

Sometimes a component needs a private modifier, which should not be put into the general `config'
for reuse in other components.

#### Method `mods.is`

`mods` has a method `is` that can take names of any modifiers and their values,
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
export const StyledComponent = styled.div<{ big: boolean }>`
    ${mods.is('big')`
        font-size: 24px;
    `}
`;
```

#### Method `mods.has`

The `mods` has a method `has` that can take names of any modifiers,
check their presence in Styled Component properties and apply appropriate styles if they are not `null` or `undefined`.

```ts
export const StyledComponent = styled.div<{ title?: string }>`
    display: none;

    ${mods.has('title')`
        display: block;
    `}
`;
```

## Highlight syntax

In order to make syntax highlighting in the IDE, you need to install the styled-components [plugin](#editor-plugins).

In most of the plugins for styled-components it is possible to add a keyword in relation to which the syntax
highlighting will be performed.

For example, [plugin for IDE WebStorm](https://plugins.jetbrains.com/plugin/9997-styled-components--styled-jsx).

After installing the plugin, go to `WebStorm/Preferences/Languages & Frameworks/JavaScript/Styled Components`,
click on `+` and add the keyword `mods`.

After that, the CSS syntax will be highlighted in the styles defined in `mods`.

### Editor Plugins

#### VS Code

-   Syntax Highlighting - [language-babel](https://marketplace.visualstudio.com/items?itemName=mgmcdermott.vscode-language-babel)
-   Autocompletion - [vscode-styled-components](https://marketplace.visualstudio.com/items?itemName=styled-components.vscode-styled-components)
-   Linting - [stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)

#### WebStorm

-   Syntax Highlighting &
    Autocompletion - [webstorm-styled-components](https://plugins.jetbrains.com/plugin/9997-styled-components--styled-jsx)

#### Atom

-   Syntax Highlighting and Autocompletion - [language-babel](https://atom.io/packages/language-babel)

#### Sublime Text

-   Syntax Highlighting & Autocompletion - [Naomi](https://packagecontrol.io/packages/Naomi), [JSCustom](https://packagecontrol.io/packages/JSCustom) (
    refer to document on how to turn on Styled Component syntax)
-   Linting - [SublimeLinter-stylelint](https://packagecontrol.io/packages/SublimeLinter-stylelint), [LSP Stylelint](https://packagecontrol.io/packages/LSP-stylelint)
