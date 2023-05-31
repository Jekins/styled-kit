import {
    ComponentProps,
    FnProps,
    ModsConfigStructure,
    ModifierValue,
    FnLiterals,
    Interpolations,
    Literals,
} from './shared';

export type ObjModeFn<ModValue extends ModifierValue | undefined> = <
    Props extends ComponentProps,
    Theme extends ComponentProps
>(
    fn:
        | Literals<Props>
        | FnLiterals<
              // Extract<valueFromProps<ModeName, Props>, ModValue>,
              ModValue,
              Props,
              Theme
          >,
    ...interpolations: Interpolations<Props, Theme>
) => FnProps<Props, Theme>;

export type ObjModeChildren<
    Mods extends ModsConfigStructure,
    ModName extends keyof Mods,
    Not extends boolean
> = Mods[ModName][number] extends boolean
    ? {
          [Key in boolean as `${Key}`]: ObjModeFn<
              Not extends true ? Exclude<Mods[ModName][number], Key> : Key
          >;
      }
    : {
          [Key in Exclude<Mods[ModName][number], boolean>]: ObjModeFn<
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
    ObjModeFn<Not extends true ? undefined : Mods[ModName][number]>;
