import {
    CSSObject,
    FlattenInterpolation,
    Interpolation,
    InterpolationFunction,
    ThemedStyledProps,
} from 'styled-components';

/**
 * Possible types of modifier values
 */
export type ModifierValue = string | number | boolean;

/**
 * Type of component props
 */
export type ComponentProps = ThemedStyledProps<Record<string, any>, any>;

/**
 * Type of object with configuration of modifiers
 */
export type ModsConfigStructure = Record<string, ReadonlyArray<ModifierValue>>;

/**
 * Mode name for fn mode
 */
export type ModNameFn = string | ReadonlyArray<string>;

/**
 * Mode value for fn mode
 */
export type ModValueFn = ModifierValue | ReadonlyArray<ModifierValue>;

/**
 * Type of literals from styled components
 */
export type Literals<
    Props extends ComponentProps,
    Theme extends ComponentProps
> =
    | TemplateStringsArray
    | CSSObject
    | FlattenInterpolation<Props>
    | Interpolations<Props, Theme>;

/**
 * Type of interpolations from styled components
 */
export type Interpolations<
    Props extends ComponentProps,
    Theme extends ComponentProps
> = ReadonlyArray<Interpolation<ThemedStyledProps<Props, Theme>>>;

/**
 * Call Literals as a function
 */
export type FnLiterals<
    ModValue extends
        | ModValueFn
        | { [ModName: string]: ModifierValue | undefined }
        | undefined,
    Props extends ComponentProps,
    Theme extends ComponentProps
> = (
    value: ModValue,
    props: Props
) => Interpolation<ThemedStyledProps<Props, Theme>>;
