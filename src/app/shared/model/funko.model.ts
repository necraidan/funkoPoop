import { Exclusivity } from './exclusivity.enum';
import { Rarity } from './rarity.enum';

export interface Funko {
  name: string;
  popCategory?: string;
  category: string;
  collection: string;
  number: string;
  picture: string[];
  description: string;
  magictag?: string[];
  owned?: boolean;
  wanted?: boolean;
  rarity?: Rarity[];
  exclusivity?: Exclusivity[];
}
