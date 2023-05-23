import {
    InitModsResult,
    ComparisonModReturn,
    ModsObj,
    ModValueTypes,
    Literals,
    Interpolations,
} from './types';
import { css } from 'styled-components';

/**
 * It tries to return the value of mod from props, checking its presence with and without the prefix `$`
 * @param modName
 * @param props
 */
const getModValueFromProps = <
    ModName extends string,
    Props extends Record<string, any>
>(
    modName: ModName,
    props: Props
) => props[`$` + modName] || props[modName];

/**
 * Returns styles if the condition is met
 * @param condition
 * @param literals
 * @param interpolations
 */
const returnStylesByCondition = <
    L extends Literals<any, any>,
    I extends Interpolations<any, any>
>(
    condition: boolean,
    literals: L,
    interpolations: I
) => {
    if (!condition) return css``;

    if (interpolations.length)
        return css(literals as TemplateStringsArray, ...interpolations);

    return css`
        ${literals};
    `;
};

/**
 * Applies styles if a component is given the appropriate modifier and its value
 * @param modName
 * @param modValue
 */
export const isMod =
    <ModName extends string, ModValue extends ModValueTypes>(
        modName: ModName,
        modValue?: ModValue
    ): ComparisonModReturn =>
    (literals, ...interpolations) =>
    (props) => {
        const preparedTargetValue = getModValueFromProps(modName, props);
        const condition =
            String(preparedTargetValue ?? false) === String(modValue ?? true);

        return returnStylesByCondition(condition, literals, interpolations);
    };

/**
 * Applies styles if a component is given the appropriate modifier and has any value other than `null` and `undefined`
 * @param modName
 */
export const hasMod =
    <ModName extends string>(modName: ModName): ComparisonModReturn =>
    (literals, ...interpolations) =>
    (props) => {
        const preparedTargetValue = getModValueFromProps(modName, props);
        const condition =
            preparedTargetValue !== undefined && preparedTargetValue != null;

        return returnStylesByCondition(condition, literals, interpolations);
    };

/**
 * Turns an object with modifiers and their values into an object with modifiers and values
 * that can handle component properties and return css styles.
 * @param mods
 */
export const initMods = <Mods extends ModsObj>(
    mods: Mods
): InitModsResult<Mods> => {
    const result = {
        is: isMod,
        has: hasMod,
    } as InitModsResult<Mods>;

    for (const modName in mods) {
        const modValues = mods[modName];

        for (const modValue of modValues) {
            const value = modValue;

            result[modName] = {
                ...result[modName],
                [`${value}`]: isMod(modName, String(value)),
            };
        }
    }

    return result;
};
