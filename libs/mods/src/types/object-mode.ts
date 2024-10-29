import {
    ComponentProps,
    ModsConfigStructure,
    ModifierValue,
    FnLiterals,
    Literals, ThemedStyledProps,
} from './shared';
import {
    DefaultTheme,
    Interpolation,
} from 'styled-components';

export type ModValueFromProps<
    ModName extends keyof any,
    Props extends ComponentProps
> = ModName extends string
    ? Required<Props>[ModName] & Required<Props>[`$${ModName}`]
    : never;

export type ObjModeFn<
    ModeName extends keyof any,
    ModValue extends ModifierValue | undefined
> = <Props extends ComponentProps, Theme extends DefaultTheme>(
    fn:
        | Literals<Props, Theme>
        | FnLiterals<
        Extract<ModValueFromProps<ModeName, Props>, ModValue>,
        Props,
        Theme
    >,
    ...interpolations: Array<Interpolation<ThemedStyledProps<Props, Theme>>>
) => Interpolation<ThemedStyledProps<Props, Theme>>;

export type ObjModeChildren<
    Mods extends ModsConfigStructure,
    ModName extends keyof Mods,
    Not extends boolean
> = Mods[ModName][number] extends boolean
    ? {
        [Key in boolean as `${Key}`]: ObjModeFn<
            ModName,
            Not extends true ? Exclude<Mods[ModName][number], Key> : Key
        >;
    }
    : {
        [Key in Exclude<Mods[ModName][number], boolean>]: ObjModeFn<
            ModName,
            Not extends true ? Exclude<Mods[ModName][number], Key> : Key
        >;
    };

/**
 * Type mode for mods.color.blue and etc
 */
export type ObjMode<
    Mods extends ModsConfigStructure,
    ModName extends keyof Mods,
    Not extends boolean
> = ObjModeChildren<Mods, ModName, Not> &
    ObjModeFn<ModName, Not extends true ? undefined : Mods[ModName][number]>;
