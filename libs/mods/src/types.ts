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
export type ModValueTypes = string | number | boolean;

/**
 * Type of object with configuration of modifiers
 */
export type ModsObj = Record<string, readonly ModValueTypes[]>;

export type Literals<
    Props extends Record<string, any>,
    Theme extends Record<string, any>
> =
    | TemplateStringsArray
    | CSSObject
    | InterpolationFunction<ThemedStyledProps<Props, Theme>>
    | FlattenInterpolation<Props>;

export type Interpolations<
    Props extends Record<string, any>,
    Theme extends Record<string, any>
> = Array<Interpolation<ThemedStyledProps<Props, Theme>>>;

/**
 * The type of data returned from the property comparison method.
 */
export type ComparisonModReturn = <
    Props extends Record<string, any>,
    Theme extends Record<string, any>
>(
    literals: Literals<Props, Theme>,
    ...interpolations: Interpolations<Props, Theme>
) => (
    props: Props
) => ReadonlyArray<Interpolation<ThemedStyledProps<Props, Theme>>>;

/**
 * Type of property comparison method
 */
type ComparisonMod = (
    modName: string,
    modValue?: ModValueTypes
) => ComparisonModReturn;

/**
 * Type of method for initializing modifiers relative to config
 */
export type InitModsResult<Mods extends ModsObj> = {
    [ModName in keyof Mods]: Mods[ModName][number] extends boolean
        ? {
              [Key in boolean as `${Key}`]: ComparisonModReturn;
          }
        : {
              [Key in Exclude<
                  Mods[ModName][number],
                  boolean
              >]: ComparisonModReturn;
          };
} & { is: ComparisonMod; has: ComparisonMod };

/**
 * The ModConfig allows you representing the configuration structure of modifiers
 */
export type ModsConfigType<Mods extends ModsObj> = {
    [Key in keyof Mods]?: Mods[Key][number];
};

/**
 * The ModsType allows you to define which properties a particular Styled Component can take.
 */
export type ModsType<
    Mods extends ModsConfigType<ModsObj>,
    ModName extends keyof Mods,
    Values extends Mods[ModName]
> = {
    [Key in ModName]?: Values extends undefined ? Mods[Key] : Values;
};

/**
 * The SCProps type will allow you to write Styled Component property types without the $ prefix,
 * but still have valid typing.
 * Internally, it prefixes all types passed to it with $.
 * to all the types passed to it.
 */
export type SCProps<T> = {
    [K in keyof T as `$${string & K}`]: T[K];
};
