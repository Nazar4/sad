import { Television } from "./television.entity.js";

export class Tariff {
    id: number;
    name: string;
    description?: string;
    internetSpeed: number;
    dataLimit: number;
    price: number;
    televisionOption?: Television;
}