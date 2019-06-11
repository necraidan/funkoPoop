import funkoJson from '../assets/funko.json';
import { Exclusivity } from './shared/model/exclusivity.enum';
import { Rarity } from './shared/model/rarity.enum';

/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  // FIX: Type Funko does not work
  const res = funkoJson.filter((funko: any) => {
    return (
      funko.name.toLowerCase().includes(data) ||
      funko.category.toLowerCase().includes(data) ||
      funko.collection.toLowerCase().includes(data) ||
      funko.number.toLowerCase().includes(data) ||
      (funko.tags && funko.tags.length && funko.tags.includes(data)) ||
      (funko.rarities && funko.rarities.length && funko.rarities.includes(data as Rarity)) ||
      (funko.exclusivities && funko.exclusivities.length && funko.exclusivities.includes(data as Exclusivity)) ||
      (funko.barcode && funko.barcode.includes(data))
    );
  });

  postMessage(res);
});
