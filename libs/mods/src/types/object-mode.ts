import {
    ComponentProps,
    ModsConfigStructure,
    ModifierValue,
    FnLiterals,
    Literals,
} from './shared';
import { Interpolation } from 'styled-components';

export type ModValueFromProps<
    ModName extends PropertyKey,
    Props extends ComponentProps
> = ModName extends string
    ? Required<Props>[ModName] & Required<Props>[`$${ModName}`]
    : never;

export type ObjModeFn<
    ModeName extends PropertyKey,
    ModValue extends ModifierValue | undefined
> = <Props extends ComponentProps>(
    fn:
        | Literals<Props>
        | FnLiterals<
        Extract<ModValueFromProps<ModeName, Props>, ModValue>,
        Props
    >,
    ...interpolations: Array<Interpolation<NoInfer<Props>>>
) => Interpolation<Props>;

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
