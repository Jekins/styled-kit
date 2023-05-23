import { InitModsResult, IsModReturn, ModsObj, ModValueTypes } from './types';
import { css } from 'styled-components';

/**
 * The method compares the property, and its value passed to it with those passed to the Styled Component,
 * and if they are equal, it returns the passed styles.
 * @param modName
 * @param modValue
 */
export const isMod =
    <ModName extends string, ModValue extends ModValueTypes>(
        modName: ModName,
        modValue?: ModValue
    ): IsModReturn =>
    (literals, ...interpolations) =>
    (props) => {
        const preparedTargetValue = props[`$` + modName] || props[modName];
        const targetValue = String(preparedTargetValue ?? false);
        const isApplyStyles = targetValue === String(modValue ?? true);

        if (isApplyStyles) {
            if (interpolations.length) {
                return css(literals as TemplateStringsArray, ...interpolations);
            }

            return css`
                ${literals};
            `;
        }

        return css``;
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
