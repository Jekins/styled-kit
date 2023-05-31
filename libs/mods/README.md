# Modifiers with autocomplete for Styled Components and Linaria

This library allows you to write modifiers for [Styled Components](https://styled-components.com/)
and [Linaria](https://linaria.dev/) via Dot Notation
and with autocomplete. As well as automatically generate for them [types](https://www.typescriptlang.org/). And that's not all :sunglasses:.

## Features

-   Quickly writing styles in relation to modifiers
-   Using modifiers via Dot Notation
-   Writing modifiers with autocomplete
-   Uniform modifiers and their values
-   Automatic type generation for modifiers
-   Possibility to use custom modifiers
-   Applying styles relative to multiple modifiers or multiple values
-   Ultra-small size (0.4 KB gzip)

## A Quick Look

### Demo

[![Live demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/interesting-monad-c954o5)

### Usage

Apply styles for any `size` property value or any `color` value:

```ts
import { mods, Mods } from '../shared/styled';

export const StyledComponent = styled.div<Mods<'size' | 'color'>>`
    // Call as literals
    ${mods.size`
        padding: 20px;
        margin: 32px;
    `};

    // Call as function
    ${mods.color(
        (value) => css`
            color: ${value};
            border: 1px solid;
        `
    )};
`;
```

```tsx
<StyledComponent color="blue" size="small" />
```

---

Apply styles for `size='small'` or `disabled={true}`:

```ts
import { mods, Mods } from '../shared/styled';

export const StyledComponent = styled.div<
    Mods<'size', 'small' | 'medium'> & Mods<'disabled'>
>`
    ${mods.size.small`
        font-size: 14px;
    `};

    ${mods.size.medium`
        font-size: 16px;
    `};

    ${mods.disabled.true`
        color: gray;
    `};
`;
```

```tsx
<StyledComponent size="small" disabled />
```

---

Apply styles if `size` is `undefined` or `color` is not `blue`:

```ts
import { mods, Mods } from '../shared/styled';

export const StyledComponent = styled.div<Mods<'size' | 'color'>>`
    ${mods.not.size`
        font-size: 14px;
    `};

    ${mods.not.color.blue`
        border: 1px solid black;
    `};
`;
```

```tsx
<StyledComponent color="green" />
```

---

Apply styles for any value of the `customProp` property:

```ts
import { mods, Mods } from '../shared/styled';

export const StyledComponent = styled.div<{ customProp: string }>`
    ${mods('customProp')`
        background: black;
    `};
`;
```

```tsx
<StyledComponent customProp="something" />
```

---

Apply styles for `customProp='customValue'`:

```ts
import { mods, Mods } from '../shared/styled';

export const StyledComponent = styled.div<{ customProp: string }>`
    ${mods('customProp', 'customValue')`
        background: black;
    `};
`;
```

```tsx
<StyledComponent customProp="customValue" />
```

---

:point_up: **These are not all possible uses of modifiers.**
**[View more options](#usage-modifiers)**

### Setup

_src/shared/styled/config.ts_

```ts
// Configure modifier names and their values
const config = {
    color: ['red', 'green', 'blue'],
    size: ['small', 'medium', 'large'],
    spacing: [8, 12],
    disabled: [true, false],
} as const;
```

_src/shared/styled/types.ts_

```ts
import { ModifiersConfig, Modifiers } from '@styled-kit/mods';

// Creating types for modifiers
type ModsConfig = ModifiersConfig<typeof config>;

export type Mods<
    N extends keyof ModsConfig = keyof ModsConfig,
    V extends ModsConfig[N] = undefined
> = Modifiers<ModsConfig, N, V>;
```

_src/shared/styled/index.ts_

```ts
import { initMods } from '@styled-kit/mods';
import { config } from './config';

// Initializing modifiers by config
export const mods = initMods(config);
export type { Mods } from './types';
```

# Documentation

-   [Installation](#installation)
-   [Setup](#setup)
    -   [Creating a modifiers configuration](#creating-a-modifiers-configuration)
    -   [Creating a types](#creating-a-types)
    -   [Initializing the modifiers](#initializing-the-modifiers)
-   [Usage types](#usage-types)
    -   [Type `Mods`](#type-mods)
    -   [Type `RMods`](#type-rmods)
    -   [Type `StyledMods`](#type-scprops)
-   [Usage modifiers](#usage-modifiers)
    -   [Using in Object mode](#using-in-object-mode)
    -   [Using in Function mode](#using-in-function-mode)
    -   [Call as a literals](#call-as-a-literals)
    -   [Call as a function](#call-as-a-function)
    -   [Using mixins](#using-mixins)
    -   [Additional features](#additional-features)
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
    color: ['red', 'green', 'blue'],
    size: ['small', 'medium', 'large'],
    spacing: [8, 12],
    disabled: [true, false],
} as const;
```

Describe in `config` what modifiers with what values you can have.
Describe those modifiers that you are going to reuse in different components.
Over time, you can add to this object as new modifiers are needed.

<b>Note:</b> In TypeScript you must specify the `as const` type for the `config` object,
to fix its values and ensure that typing works correctly.

### Creating a types

To use autocomplete and types for modifiers, you must configure the appropriate TypeScript types.

You can make type settings in any file of your project, but as an option,
you can make such a file system:

_src/shared/styled/types.ts_

```ts
import { ModifiersConfig, Modifiers } from '@styled-kit/mods';

type ModsConfig = ModifiersConfig<typeof config>;

export type Mods<
    N extends keyof ModsConfig = keyof ModsConfig,
    V extends ModsConfig[N] = undefined
> = Modifiers<ModsConfig, N, V>;

export type RMods<
    N extends keyof ModsConfig = keyof ModsConfig,
    V extends ModsConfig[N] = undefined
> = Required<Mods<N, V>>;
```

`ModsConfig` is a type representing the configuration structure of modifiers.
It is only needed to create a `Mods` type.

`Mods` is a type representing modifiers, where `N` is the name of the modifier,
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
export type { Mods, RMods } from './types';
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

---

`Mods<'size' | 'disabled'>` - returns object type with `size` and `disabled` modifiers, with all their values
from `config`:

```ts
type ComponentProps = Mods<'size' | 'disabled'>;

// ComponentProps = {
//    size?: 'small' | 'medium' | 'large';
//    disabled?: boolean;
// }
```

---

`Mods<'size', 'small' | 'large'>` – Returns the object type with the `size` modifier, with `small` and `large` values:

```ts
type ComponentProps = Mods<'size', 'small' | 'large'>;

// ComponentProps = {
//    size?: 'small' | 'large';
// }
```

---

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

You may need `RMods` if you want to make the modifier **required**:

```ts
interface ComponentProps extends RMods<'size'> {}

// interface ComponentProps {
//    size: 'small' | 'medium' | 'large';
// }
```

### Type `StyledMods`

Since version 16 of
React [all specified attributes remain on DOM elements](https://legacy.reactjs.org/blog/2017/09/08/dom-attributes-in-react-16.html)
and are not removed even if React does not recognize them. That said, if these attributes are not known to React,
you will see a `Warning' in the developer console in the browser.

To avoid these warnings, [Styled Components recommends](https://styled-components.com/docs/api#transient-props]) use
prefix `$` in front of properties that should not be included in the DOM element.

The `StyledMods` type will allow you to write Styled Component property types without the `$` prefix,
but still have valid typing. Internally, it prefixes all types passed to it with `$`.
to all the types passed to it.

_Without the `StyledMods` type:_

```ts
export const StyledComponent = styled.div<Mods<'size'> & { padding: string }>`
    ${mods.size.small`
        font-size: 14px;
    `};

    padding: ${({ padding }) => padding};
`;
```

```tsx
<StyledComponent size="small" padding="12px" />
```

---

_With the `StyledMods` type:_

```ts
import { StyledMods } from '@styled-kit/mods';

export const StyledComponent = styled.div<
    StyledMods<Mods<'size'> & { padding: string }>
>`
    ${mods.size.small`
        font-size: 14px;
    `};

    padding: ${({ $padding }) => $padding};
`;
```

```tsx
<StyledComponent $size="small" $padding="12px" />
```

:point_up: **You do not need to add the `$` prefix to the `mods` modifiers. Modifiers are automatically searched with and without the prefix.**

## Usage modifiers

The library assumes a large number of options for using modifiers. Each of them can be called as a literal, as a function, with negation, without negation, in object mode or in function mode.

Let's take a closer look at how modifiers can be used:

### Using in Object mode

The `Object mode` allows you to use Dot Notation to use modifiers that you enter in `config` beforehand.

This mode is best suited for applying styles relative to common modifiers that will be reused in other components.

The features of `Object mode` modifiers:

-   Writing modifiers with Dot Notation
-   When writing modifiers, you will have autocomplete
-   Types will be automatically generated based on your `config`, which you can use with the `Mods` type that you create when you initialize the library
-   You will get modifiers that are reused throughout the project in a single format

**Styles will be applied if:**

_`color` is not `undefined`_

```ts
export const ModsColor = styled.div<Mods<'color'>>`
    ${mods.color`
        color: blue;
    `};
`;
```

```tsx
<ModsColor color="blue" />
```

---

_`color` is `undefined`_

```ts
export const ModsNotColor = styled.div<Mods<'color'>>`
    ${mods.not.color`
        color: blue;
    `};
`;
```

```tsx
<ModsNotColor />
```

---

_`color` is `blue` and is not `undefined`_

```ts
export const ModsColorBlue = styled.div<Mods<'color'>>`
    ${mods.color.blue`
        color: blue;
    `};
`;
```

```tsx
<ModsColorBlue color="blue" />
```

---

_`color` is not `blue` and is not `undefined`_

```ts
export const ModsNotColorBlue = styled.div<Mods<'color'>>`
    ${mods.not.color.blue`
        color: white;
    `};
`;
```

```tsx
<ModsNotColorBlue color="white" />
```

### Using in Function mode

The `Function mode` allows you to apply styles using modifiers that are not in your `config`.

This mode is best suited for applying styles relative to private modifiers which will not be reused in other components.

The features of `Function mode` modifiers:

-   Using custom modifiers that are not in `config`
-   Ability to specify styles relative to multiple modifiers
-   Ability to specify styles relative to multiple modifier values
-   Types for them are written manually
-   No autocomplete when writing

**Styles will be applied if:**

_`color` is not `undefined`_

```ts
export const FnModsColor = styled.div<{ color?: string }>`
    ${mods('color')`
        color: blue;
    `};
`;
```

```tsx
<FnModsColor color="blue" />
```

---

_`color` is `undefined`_

```ts
export const FnModsNotColor = styled.div<{ color?: string }>`
    ${mods.not('color')`
        color: blue;
    `};
`;
```

```tsx
<FnModsNotColor />
```

---

_`color` is `blue` and is not `undefined`_

```ts
export const FnModsColorBlue = styled.div<{ color?: string }>`
    ${mods('color', 'blue')`
        color: blue;
    `};
`;
```

```tsx
<FnModsColorBlue color="blue" />
```

---

_`color` is not `blue` and is not `undefined`_

```ts
export const FnModsNotColorBlue = styled.div<{ color?: string }>`
    ${mods.not('color', 'blue')`
        color: black;
    `};
`;
```

```tsx
<FnModsNotColorBlue color="black" />
```

---

_`color` is `blue` or `black` and is not `undefined`_

```ts
export const FnModsColorBlueBlack = styled.div<{ color?: string }>`
    ${mods('color', ['blue', 'black'])`
        color: black;
    `};
`;
```

```tsx
<FnModsColorBlueBlack color="black" />
```

---

_`color` is not `blue` or `black` and is not `undefined`_

```ts
export const FnModsNotColorBlueBlack = styled.div<{ color?: string }>`
    ${mods.not('color', ['blue', 'black'])`
        color: white;
    `};
`;
```

```tsx
<FnModsNotColorBlueBlack color="white" />
```

---

_`color` and `bg` is not `undefined`_

```ts
export const FnModsColorBg = styled.div<{ color?: string; bg?: string }>`
    ${mods(['color', 'bg'])`
        color: black;
    `};
`;
```

```tsx
<FnModsColorBg color="black" bg="green" />
```

---

_`color` and `bg` is `undefined`_

```ts
export const FnModsNotColorBg = styled.div<{ color?: string; bg?: string }>`
    ${mods.not(['color', 'bg'])`
        color: black;
    `};
`;
```

```tsx
<FnModsNotColorBg />
```

---

_`color` and `bg` is `blue` and is not `undefined`_

```ts
export const FnModsColorBgBlue = styled.div<{ color?: string; bg?: string }>`
    ${mods(['color', 'bg'], 'blue')`
        color: black;
    `};
`;
```

```tsx
<FnModsColorBgBlue color="blue" bg="blue" />
```

---

_`color` and `bg` is not `blue` and is not `undefined`_

```ts
export const FnModsNotColorBgBlue = styled.div<{ color?: string; bg?: string }>`
    ${mods.not(['color', 'bg'], 'blue')`
        color: black;
    `};
`;
```

```tsx
<FnModsNotColorBgBlue color="black" bg="green" />
```

---

_`color` and `bg` together is `blue` or `green` and is not `undefined`_

```ts
export const FnModsColorBgBlueGreen = styled.div<{
    color?: string;
    bg?: string;
}>`
    ${mods(['color', 'bg'], ['blue', 'green'])`
        color: black;
    `};
`;
```

```tsx
<FnModsColorBgBlueGreen color="blue" bg="blue" />
```

---

_`color` and `bg` together is not `blue` or `green` and is not `undefined`_

```ts
export const FnModsNotColorBgBlueGreen = styled.div<{
    color?: string;
    bg?: string;
}>`
    ${mods.not(['color', 'bg'], ['blue', 'green'])`
        color: black;
    `};
`;
```

```tsx
<FnModsNotColorBgBlueGreen color="blue" bg="green" />
```

### Call as a literals

You can call any modifier, regardless of mode, as a literal and immediately pass the necessary styles.

#### Object mode

```ts
export const StyledComponent = styled.div<Mods<'size'>>`
    ${mods.size`
        padding: 20px;
    `};

    ${mods.size.small`
        font-size: 14px;
    `};
`;
```

```tsx
<StyledComponent size="small" />
```

---

#### Function mode

```ts
export const StyledComponent = styled.div<Mods<'size'>`
    ${mods('size')`
        font-size: 16px;
    `};

    ${mods('size', 'small')`
        font-size: 14px;
    `};
`;
```

```tsx
<StyledComponent size="small" />
```

### Call as a function

You can call any modifier, regardless of mode, as a function that will return the `css` method from `styled-components`.

The feature of this method is that you get possible values and all the properties of the styled component in the arguments of the passed callback function.

#### Object mode

```ts
export const StyledComponent = styled.div<Mods<'size'> & { padding: string }>`
    ${mods.size(
        (value, props) => css`
            font-size: ${value === 'small' ? '14px' : '16px'};
            padding: ${props.padding};
        `
    )};

    ${mods.size.small(
        (value, props) => css`
            font-size: 14px;
            padding: ${props.padding};
        `
    )};
`;
```

```tsx
<StyledComponent size="small" />
```

---

#### Function mode

```ts
export const StyledComponent = styled.div<Mods<'size'> & { padding: string }>`
    ${mods('size')(
        (value, props) => css`
            font-size: ${value === 'small' ? '14px' : '16px'};
            padding: ${props.padding};
        `
    )};

    ${mods(
        'size',
        'small'
    )(
        (value, props) => css`
            font-size: 14px;
            padding: ${props.padding};
        `
    )};
`;
```

```tsx
<StyledComponent size="small" />
```

:point_up: **IMPORTANT:**
If you use `Function mode`, use modifiers from `config` with type `Mods` and pass an array of modifiers or an array of modifier values, be sure to put `as const` after the array so that TypeScript correctly displays which properties will be available in the `value` argument passed to the callback function.

_For example:_

```ts
const config = {
    color: 'white' | 'blue' | 'black',
    bg: 'green' | 'blue' | 'black',
    ...
};

export const StyledComponent = styled.div<Mods<'color' | 'bg'>>`
    ${mods('color', ['blue', 'black'] as const)(
        (value, props) => css`
            // value: 'blue' | 'black'
        `
    )};

    ${mods.not('color', ['blue', 'black'] as const)(
        (value, props) => css`
            // value: 'white'
        `
    )};

    ${mods(['color', 'bg'] as const)(
        (value, props) => css`
            // value: { color: 'white' | 'blue' | 'black', bg: 'green' | 'blue' | 'black' }
        `
    )};

    ${mods.not(['color', 'bg'] as const)(
        (value, props) => css`
            // value: { color: undefined, bg: undefined }
        `
    )};

    ${mods(['color', 'bg'] as const, 'blue')(
        (value, props) => css`
            // value: 'blue'
        `
    )};

    ${mods.not(['color', 'bg'] as const, 'blue')(
        (value, props) => css`
            // value: { color: 'white' | 'black', bg: 'green' | 'black' }
        `
    )};

    ${mods(['color', 'bg'] as const, ['blue', 'black'] as const)(
        (value, props) => css`
            // value: { color: 'blue' | 'black', bg: 'blue' | 'black' }
        `
    )};

    ${mods.not(['color', 'bg'] as const, ['blue', 'black'] as const)(
        (value, props) => css`
            // value: { color: 'white' | 'blue' | 'black', bg: 'green' | 'blue' | 'black' }
        `
    )};
`;
```

### Using mixins

To apply a set of styles for different modifier values, you can create mixins.

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

### Additional features

You can use modifiers with `boolean` values and pass them as `string` and as `boolean`:

```ts
export const StyledComponent = styled.div<Mods<'disabled'>>`
    ${mods.disabled.true`
        color: gray;
    `};

    ${mods('disabled', true)`
        color: gray;
    `};

    ${mods('disabled', 'true')`
        color: gray;
    `};

    ${mods.disabled.false`
        color: black;
    `};

    ${mods('disabled', false)`
        color: black;
    `};

    ${mods('disabled', 'false')`
        color: black;
    `};
`;
```

```tsx
<StyledComponent disabled />
```

---

You can use modifiers with `number` values:

```ts
export const StyledComponent = styled.div<Mods<'spacing'>>`
    ${mods.spacing[12]`
        padding: 12px;
    `};

    ${mods.spacing[24]`
        padding: 24px;
    `};
`;
```

```tsx
<StyledComponent spacing={12} />
```

---

You can do any `nesting` of modifiers:

```ts
export const StyledComponent = styled.div<Mods<'spacing' | 'size'>>`
    ${mods.size.small`
        font-size: 14px;
    `};

    ${mods.spacing[12]`
        padding: 12px;
        
        ${mods.size.small`
            font-size: 16px;
        `};
    `};
`;
```

```tsx
<StyledComponent spacing={12} size="small" />
```

---

You can write `additional logic` for processing modifier values:

```ts
export const StyledComponent = styled.div<{ src: string }>`
    ${mods('src')(
        (value) => css`
            color: ${value.includes('facebook') ? 'blue' : 'orange'};
        `
    )};
`;
```

```tsx
<StyledComponent src='https://www.facebook.com/' />
<StyledComponent src='https://www.instagram.com/' />
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
