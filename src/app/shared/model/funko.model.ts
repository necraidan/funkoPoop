import { Exclusivity } from './exclusivity.enum';
import { Rarity } from './rarity.enum';

export interface Funko {
  guid: string;
  name: string;
  popCategory?: string;
  category: string;
  collection: string;
  number: string;
  picture: string[];
  description: string;
  tags: string[];
  owned?: boolean;
  wanted?: boolean; // deprecated
  wantedNo?: boolean;
  wantedBe?: boolean;
  rarities?: Rarity[];
  exclusivities?: Exclusivity[];
  barcode?: string;
}
