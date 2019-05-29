import funkoJson from '../assets/funko.json';
import { Exclusivity } from './shared/model/exclusivity.enum';
import { Rarity } from './shared/model/rarity.enum';

/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  const filter = JSON.parse(data).filter;

  // FIX: Type Funko[] does not work
  const res = funkoJson.filter((funko: any) => {
    return (
      funko.name.toLowerCase().includes(filter) ||
      funko.category.toLowerCase().includes(filter) ||
      funko.collection.toLowerCase().includes(filter) ||
      funko.number.toLowerCase().includes(filter) ||
      (funko.tags && funko.tags.length && funko.tags.includes(filter)) ||
      (funko.rarities && funko.rarities.length && funko.rarities.includes(filter as Rarity)) ||
      (funko.exclusivities && funko.exclusivities.length && funko.exclusivities.includes(filter as Exclusivity)) ||
      (funko.barcode && funko.barcode.includes(filter))
    );
  });

  postMessage(JSON.stringify(res));
});
