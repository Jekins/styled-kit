import { initMods } from '@styled-kit/mods';
import { config } from './config';

export const mods = initMods(config, { onlyFalseValues: false });
export type { Mods, RMods } from './types';
