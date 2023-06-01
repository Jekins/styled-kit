import { Modifiers, ModifiersConfig } from '@styled-kit/mods';
import { config } from './config';

type ModsConfig = ModifiersConfig<typeof config>;

export type Mods<
    Name extends keyof ModsConfig,
    Value extends ModsConfig[Name] = undefined
> = Modifiers<ModsConfig, Name, Value>;

export type RMods<
    Name extends keyof ModsConfig = keyof ModsConfig,
    Value extends ModsConfig[Name] = undefined
> = Required<Mods<Name, Value>>;
