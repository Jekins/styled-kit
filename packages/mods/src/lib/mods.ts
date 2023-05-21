import { InitModsResult, ModIsReturn, ModsObj } from './types';
import { css } from 'styled-components';

const modIs =
    <ModName extends string, ModValue extends string | boolean | number>(
        modName: ModName,
        modValue?: ModValue
    ): ModIsReturn =>
    (literals, ...interpolations) =>
    (props) => {
        const preparedTargetValue = props[`$` + modName] || props[modName];
        const targetValue = String(preparedTargetValue) ?? 'false';

        // FIXME: Remove `as TemplateStringsArray` but keep using: mods.size.medium(css``)
        return targetValue === String(modValue ?? 'true')
            ? css(literals as TemplateStringsArray, ...interpolations)
            : css``;
    };

export const initMods = <Mods extends ModsObj>(
    mods: Mods
): InitModsResult<Mods> => {
    const result = {
        is: modIs,
    } as InitModsResult<Mods>;

    for (const modName in mods) {
        const modValues = mods[modName];

        for (const modValue of modValues) {
            const value = modValue;

            result[modName] = {
                ...result[modName],
                [`${value}`]: modIs(modName, String(value)),
            };
        }
    }

    return result;
};
