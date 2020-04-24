import { MapRow } from './map-row';

export class MapResponse {
  destination_addresses: string[];
  origin_addresses: string[];
  rows: MapRow[];
  status: string;
}
