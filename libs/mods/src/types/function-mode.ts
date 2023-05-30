import {
    ComponentProps,
    FnProps,
    ModifierValue,
    FnLiterals,
    Interpolations,
    Literals,
    ModNameFn,
    ModValueFn,
} from './shared';

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

type FnLiteralsNoModValue<
    ModName extends ModNameFn,
    ModValue extends ModValueFn | undefined,
    Props extends ComponentProps
> = ModName extends string
    ? ModValue extends undefined
        ? undefined
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
              ? undefined
              : ModValueFromProps<Key, Props>;
      };

export type FnModeReturn<
    ModName extends ModNameFn,
    ModValue extends ModValueFn | undefined,
    No extends boolean
> = <Props extends ComponentProps, Theme extends ComponentProps>(
    fn:
        | Literals<Props>
        | FnLiterals<
              No extends true
                  ? FnLiteralsNoModValue<ModName, ModValue, Props>
                  : FnLiteralsModValue<ModName, ModValue, Props>,
              Props,
              Theme
          >,
    ...interpolations: Interpolations<Props, Theme>
) => FnProps<Props, Theme>;

/**
 * Type mode for mods('color', 'blue') and etc
 */
export type FnMode<No extends boolean> = <
    ModName extends ModNameFn,
    ModValue extends ModValueFn | undefined = undefined
>(
    name: ModName,
    value?: ModValue
) => FnModeReturn<ModName, ModValue, No>;
