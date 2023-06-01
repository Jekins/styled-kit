import { ObjMode } from './object-mod';
import { FnMode } from './function-mode';
import { ModsConfigStructure } from './shared';
import { StyledProps } from 'styled-components';

export * from './shared';

/**
 * Build Modifiers structure with ObjectMode and FunctionMode
 */
export type ModsStructure<
    Mods extends ModsConfigStructure,
    Not extends boolean
> = {
    [ModName in keyof Mods]: ObjMode<
        Mods,
        ModName extends string ? ModName : never,
        Not
    >;
} & FnMode<Not>;

/**
 * Initialization modifiers options
 */
export type InitModsOptions = {
    /**
     * If `true`, then modifiers with value `false` will not work when `undefined` is set
     */
    onlyFalseValues?: boolean;
};

/**
 * Type of method for initializing modifiers relative to config
 */
export type InitMods<Mods extends ModsConfigStructure> =
    | ModsStructure<Mods, false> & {
          not: ModsStructure<Mods, true>;
      };

/**
 * The ModifiersConfig allows you representing the configuration structure of modifiers
 */
export type ModifiersConfig<Mods extends ModsConfigStructure> = {
    [Key in keyof Mods]?: Mods[Key][number];
};

/**
 * The Modifiers allow you to define which properties a particular Styled Component can take.
 */
export type Modifiers<
    Mods extends ModifiersConfig<ModsConfigStructure>,
    ModName extends string,
    Values extends Mods[ModName]
> = {
    [Key in ModName]?: Values extends undefined ? Mods[Key] : Values;
};

/**
 * The StyledMods type will allow you to write Styled Component property types without the $ prefix,
 * but still have valid typing.
 * Internally, it prefixes all types passed to it with $.
 * to all the types passed to it.
 */
export type StyledMods<T> = StyledProps<{
    [K in keyof T as `$${string & K}`]: T[K];
}>;
