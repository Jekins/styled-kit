import {
    CSSObject,
    FlattenInterpolation,
    Interpolation,
    InterpolationFunction,
    ThemedStyledProps,
} from 'styled-components';

export type ModsObj = Record<string, readonly (string | number | boolean)[]>;

export type ModIsReturn = <
    Props extends Record<string, any>,
    Theme extends Record<string, any>
>(
    literals:
        | TemplateStringsArray
        | CSSObject
        | InterpolationFunction<ThemedStyledProps<Props, Theme>>
        | FlattenInterpolation<Props>,
    ...interpolations: Array<Interpolation<ThemedStyledProps<Props, Theme>>>
) => (
    props: Props
) => ReadonlyArray<Interpolation<ThemedStyledProps<Props, Theme>>>;

type IsMethod = (
    modName: string,
    modValue?: string | boolean | number
) => ModIsReturn;

export type InitModsResult<Mods extends ModsObj> = {
    [ModName in keyof Mods]: Mods[ModName][number] extends boolean
        ? {
              [Key in boolean as `${Key}`]: ModIsReturn;
          }
        : {
              [Key in Exclude<Mods[ModName][number], boolean>]: ModIsReturn;
          };
} & { is: IsMethod };

export type ModsConfigType<Mods extends ModsObj> = {
    [Key in keyof Mods]?: Mods[Key][number];
};

export type ModsType<
    Mods extends ModsConfigType<ModsObj>,
    ModName extends keyof Mods,
    Values extends Mods[ModName]
> = {
    [Key in ModName]?: Values extends undefined ? Mods[Key] : Values;
};
