import {
    CSSObject,
    DefaultTheme,
    ExecutionContext,
    Interpolation,
} from 'styled-components';

/**
 * Possible types of modifier values
 */
export type ModifierValue = string | number | boolean;

/**
 * Type of component props
 */
export type ComponentProps = Record<string, any>;

/**
 * Kept for backward source compatibility. In styled-components v6 `theme` is
 * provided to style functions via `ExecutionContext`, so this alias is no
 * longer used internally — but external types that referenced it still work.
 */
export type ThemedStyledProps<
    Props extends ComponentProps,
    Theme extends DefaultTheme
> = Props & { theme: Theme };

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
 * Type of literals from styled components.
 *
 * Note: in styled-components v6 `Interpolation<P>` itself is a union that
 * contains `StyleFunction<P>` (a 1-arg callable). If `Interpolation<P>` were
 * left in this union, a callback expression like `(value) => css`...``
 * would be ambiguous: TypeScript could match it to either the 1-arg
 * `StyleFunction<P>` or to `FnLiterals` (2-arg), and inference for `value`
 * would fail. We therefore restrict the static (non-function) variants to
 * `RuleSet`-shaped arrays so the callable case is exclusively handled by
 * `FnLiterals`.
 */
export type Literals<Props extends ComponentProps> =
    | TemplateStringsArray
    | CSSObject
    | Interpolation<Props>[];

/**
 * Type of interpolations from styled components
 */
export type Interpolations<Props extends ComponentProps> = Interpolation<Props>;

/**
 * Call Literals as a function. The `props` argument matches what
 * styled-components v6 hands to a style function: `ExecutionContext & Props`,
 * which already exposes `theme: DefaultTheme`.
 */
export type FnLiterals<
    ModValue extends
            | ModValueFn
        | { [ModName: string]: ModifierValue | undefined }
        | undefined,
    Props extends ComponentProps
> = (
    value: ModValue,
    props: ExecutionContext & Props
) => Interpolation<Props>;
