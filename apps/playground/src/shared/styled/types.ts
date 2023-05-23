import { ModsConfigType, ModsType } from '@styled-kit/mods';
import { config } from './config';

type ModsConfig = ModsConfigType<typeof config>;

export type Mods<
    M extends keyof ModsConfig,
    V extends ModsConfig[M] = undefined
> = ModsType<ModsConfig, M, V>;

export type RMods<
    M extends keyof ModsConfig = keyof ModsConfig,
    V extends ModsConfig[M] = undefined
> = Required<Mods<M, V>>;
