import {
    ComponentProps,
    ModifierValue,
    FnLiterals,
    Literals,
    ModNameFn,
    ModValueFn,
} from './shared';
import {
    Interpolation,
    InterpolationFunction,
    ThemedStyledProps,
} from 'styled-components';

export type ModValueFromFn<ModValue extends ModValueFn | undefined> =
    ModValue extends ReadonlyArray<ModifierValue> ? ModValue[number] : ModValue;

export type ModValueFromProps<
    ModName extends ModNameFn,
    Props extends ComponentProps,
    RequiredMode extends boolean = true
> = RequiredMode extends true
    ? ModName extends string
        ? Required<Props>[ModName] & Required<Props>[`$${ModName}`]
        : Required<Props>[ModName[number]] &
              Required<Props>[`$${ModName[number]}`]
    : ModName extends string
    ? Props[ModName] & Props[`$${ModName}`]
    : Props[ModName[number]] & Props[`$${ModName[number]}`];

export type FnLiteralsModValue<
    ModName extends ModNameFn,
    ModValue extends ModValueFn | undefined,
    Props extends ComponentProps
> = ModName extends string
    ? ModValue extends undefined
        ? ModValueFromProps<ModName, Props>
        : Extract<ModValueFromProps<ModName, Props>, ModValueFromFn<ModValue>>
    : ModValue extends ModifierValue
    ? ModValue
    : {
          [Key in ModName[number]]: ModValue extends undefined
              ? ModValueFromProps<Key, Props>
              : Extract<
                    ModValueFromProps<Key, Props>,
                    ModValueFromFn<ModValue>
                >;
      };

type FnLiteralsNotModValue<
    ModName extends ModNameFn,
    ModValue extends ModValueFn | undefined,
    Props extends ComponentProps
> = ModName extends string
    ? ModValue extends undefined
        ? never
        : Exclude<ModValueFromProps<ModName, Props>, ModValueFromFn<ModValue>>
    : ModValue extends ModifierValue
    ? {
          [Key in ModName[number]]: Exclude<
              ModValueFromProps<Key, Props>,
              ModValue
          >;
      }
    : {
          [Key in ModName[number]]: ModValue extends undefined
              ? never
              : ModValueFromProps<Key, Props>;
      };

export type FnModeReturn<
    ModName extends ModNameFn,
    ModValue extends ModValueFn | undefined,
    Not extends boolean
> = <Props extends ComponentProps, Theme extends ComponentProps>(
    fn:
        | Literals<Props, Theme>
        | FnLiterals<
              Not extends true
                  ? FnLiteralsNotModValue<ModName, ModValue, Props>
                  : FnLiteralsModValue<ModName, ModValue, Props>,
              Props,
              Theme
          >,
    ...interpolations: Array<Interpolation<ThemedStyledProps<Props, Theme>>>
) => InterpolationFunction<Props>;

/**
 * Type mode for mods('color', 'blue') and etc
 */
export type FnMode<Not extends boolean> = <
    ModName extends ModNameFn,
    ModValue extends ModValueFn | undefined = undefined
>(
    name: ModName,
    value?: ModValue
) => FnModeReturn<ModName, ModValue, Not>;
