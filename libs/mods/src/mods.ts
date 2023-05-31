import {
    InitMods,
    ModsConfigStructure,
    ModifierValue,
    Interpolations,
    Literals,
    ComponentProps,
    ModNameFn,
    ModValueFn,
} from './types';
import { css } from 'styled-components';
import { FnMode } from './types/function-mode';
import { ObjModeFn } from './types/object-mod';

/**
 * It tries to return the value of mod from props, checking its presence with and without the prefix `$`
 * @param name
 * @param props
 */
const getValueFromProps = <
    ModName extends keyof any,
    Props extends ComponentProps
>(
    name: ModName,
    props: Props
) => {
    const stringName = String(name);

    return props[`$${stringName}`] || props[stringName];
};

/**
 * Checks if two values are equal
 * @param value
 * @param valueProps
 */
const isValueEqualValueProps = (
    value: ModifierValue,
    valueProps?: ModifierValue
) => {
    return String(value) === String(valueProps ?? false);
};

/**
 * Returns styles in css from styled components
 * @param literals
 * @param interpolations
 */
const returnStyles = <
    L extends Literals<any, any>,
    I extends Interpolations<any, any>
>(
    literals?: L,
    interpolations?: I
) => {
    if (Array.isArray(interpolations) && interpolations.length) {
        return css(literals as TemplateStringsArray, ...interpolations);
    }

    return css`
        ${literals};
    `;
};

/**
 * A method for object mode to get styles by modifiers
 * @param not
 */
export const getObjMode =
    (not?: boolean) =>
    <ModName extends keyof any, ModValue extends ModifierValue | undefined>(
        name: ModName,
        value?: ModValue
    ): ObjModeFn<ModName, ModValue> => {
        return (literalsAndFnLiterals, ...interpolations) => {
            return (props) => {
                const modValueFromProps = getValueFromProps(name, props);
                const isModUndefined = modValueFromProps === undefined;

                /**
                 * For `mods.color.blue`
                 * For `mods.not.color.blue`
                 * For `mods.color`
                 * For `mods.not.color`
                 */
                if (
                    value !== undefined || !not
                        ? isModUndefined
                        : !isModUndefined
                ) {
                    return css``;
                }

                if (value !== undefined) {
                    /**
                     * For `mods.color.blue`
                     * For `mods.not.color.blue`
                     */
                    const isValuesEqual = isValueEqualValueProps(
                        value,
                        modValueFromProps
                    );

                    if (not ? isValuesEqual : !isValuesEqual) {
                        return css``;
                    }
                }

                const literals =
                    typeof literalsAndFnLiterals === 'function'
                        ? literalsAndFnLiterals(modValueFromProps, props)
                        : literalsAndFnLiterals;

                return returnStyles(literals, interpolations);
            };
        };
    };

/**
 * A method for function mode to get styles by modifiers
 * @param not
 */
export const getFnMode =
    (not?: boolean): FnMode<false> =>
    (name, value) => {
        return (literalsAndFnLiterals, ...interpolations) => {
            return (props) => {
                const names: ModNameFn = Array.isArray(name) ? name : [name];
                const values: ModValueFn = Array.isArray(value)
                    ? value
                    : value === undefined
                    ? []
                    : [value];

                const modValueFromProps = names.reduce((acc, targetName) => {
                    acc[targetName] = getValueFromProps(targetName, props);

                    return acc;
                }, {} as Record<string, ReturnType<typeof getValueFromProps>>);

                /**
                 * If some mod is not defined in the props
                 */
                const isSomeModUndefined = Object.values(
                    modValueFromProps
                ).some((targetModValue) => targetModValue === undefined);

                if (not && names.length > 1 && values.length === 1) {
                    /*
                     * For mods.not(['color', 'bg'], 'blue')
                     */
                    const isSomeValueEqualSomePropsValue = values.some(
                        (targetValue) => {
                            return Object.values<ModifierValue>(
                                modValueFromProps
                            ).some((targetValueProps) =>
                                isValueEqualValueProps(
                                    targetValue,
                                    targetValueProps
                                )
                            );
                        }
                    );

                    if (isSomeValueEqualSomePropsValue) return css``;
                } else if (values.length) {
                    /**
                     * For mods('color', 'bg')
                     * For mods('color', ['blue', 'black'])
                     * For mods(['color', 'bg'], 'blue')
                     * For mods(['color', 'bg'], ['blue', 'black'])
                     * and
                     * For mods.not('color', 'bg')
                     * For mods.not('color', ['blue', 'black'])
                     * For mods.not(['color', 'bg'], ['blue', 'black'])
                     */
                    const isSomeValueEqualEveryPropsValue = values.some(
                        (targetValue) => {
                            return Object.values<ModifierValue>(
                                modValueFromProps
                            ).every((targetValueProps) =>
                                isValueEqualValueProps(
                                    targetValue,
                                    targetValueProps
                                )
                            );
                        }
                    );

                    if (
                        not
                            ? isSomeValueEqualEveryPropsValue
                            : !isSomeValueEqualEveryPropsValue
                    ) {
                        return css``;
                    }
                }

                /**
                 * For mods.not(['color', 'bg'])
                 */
                if (not && name.length > 1 && !values.length) {
                    const isEveryModUndefined = Object.values(
                        modValueFromProps
                    ).every((targetModValue) => targetModValue === undefined);

                    if (!isEveryModUndefined) return css``;
                }

                /**
                 * For mods('color', 'bg')
                 * For mods('color', ['blue', 'black'])
                 * For mods(['color', 'bg'], 'blue')
                 * For mods(['color', 'bg'], ['blue', 'black'])
                 * For mods('color')
                 * For mods(['color', 'bg'])
                 * and
                 * For mods.not('color', 'bg')
                 * For mods.not('color', ['blue', 'black'])
                 * For mods.not(['color', 'bg'], 'blue')
                 * For mods.not(['color', 'bg'], ['blue', 'black'])
                 */
                if (
                    values.length || !not
                        ? isSomeModUndefined
                        : !isSomeModUndefined
                ) {
                    return css``;
                }

                const literals =
                    typeof literalsAndFnLiterals === 'function'
                        ? literalsAndFnLiterals(
                              names.length > 1 && (not || values.length !== 1)
                                  ? modValueFromProps
                                  : modValueFromProps[names[0]],
                              props
                          )
                        : literalsAndFnLiterals;

                return returnStyles(literals, interpolations);
            };
        };
    };

/**
 * Creating a modifier structure for an object mode
 * @param name
 * @param values
 * @param not
 */
const createModsObject = <Mods extends ModsConfigStructure>(
    name: keyof Mods,
    values: ReadonlyArray<ModifierValue>,
    not?: boolean
) => {
    const valuesObject = values.reduce((acc, value) => {
        const preparedValue = typeof value === 'number' ? value : String(value);

        return {
            ...acc,
            [preparedValue]: getObjMode(not)(name, value),
        };
    }, {});

    return Object.assign(getObjMode(not)(name), valuesObject);
};

/**
 * Creates a complete structure of modifiers for object mode and for function mode
 * @param mods
 */
export const initMods = <Mods extends ModsConfigStructure>(
    mods: Mods
): InitMods<Mods> => {
    const structureForObjMode = Object.entries(mods).map(([name, values]) => {
        return [name, createModsObject(name, values, false)];
    });
    const objMode = Object.fromEntries(structureForObjMode);

    const structureForObjModeWithNo = Object.entries(mods).map(
        ([name, values]) => {
            return [name, createModsObject(name, values, true)];
        }
    );

    const objModeNo = Object.fromEntries(structureForObjModeWithNo);

    return Object.assign(getFnMode(false), objMode, {
        not: Object.assign(getFnMode(true), objModeNo),
    });
};
