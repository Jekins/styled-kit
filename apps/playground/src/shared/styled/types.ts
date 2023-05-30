import { Modifiers, ModifiersConfig } from '@styled-kit/mods';
import { config } from './config';

type ModsConfig = ModifiersConfig<typeof config>;

export type Mods<
    M extends keyof ModsConfig,
    V extends ModsConfig[M] = undefined
> = Modifiers<ModsConfig, M, V>;

export type RMods<
    M extends keyof ModsConfig = keyof ModsConfig,
    V extends ModsConfig[M] = undefined
> = Required<Mods<M, V>>;
