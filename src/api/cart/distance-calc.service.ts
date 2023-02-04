import fs from 'fs';
import path from 'path';
import { TarrifProType, TarrifType } from '../../types/tarrif.types';
import readJsonFile from '../../util/read-json-file';

type parcelDetails = {
    /**
     * weight total order items weight
     */
    weight: number, 

    /**
     * Total distance from warehouse.
     * km unit used here.
     * distance=5 refers 5km distance
     */
    distance: number
}

export default class ShippingCostFinder {

    private static instance: ShippingCostFinder;
    private tarrifs: TarrifType[];

    private constructor() { }

    public static getInstance(): ShippingCostFinder {
        if (!ShippingCostFinder.instance) {
            ShippingCostFinder.instance = new ShippingCostFinder();
            ShippingCostFinder.instance.loadShippingTarrifs();
        }

        return ShippingCostFinder.instance;
    }

    /**
     * 
     * @param details 
     */
    public findShippingCost(dimension: parcelDetails) {
        return this.calculateShippingCost(dimension);
    }

    private isLessThan = (given: number, inTarrif: number): boolean => given < inTarrif;

    private isGreaterThan = (given: number, inTarrif: number): boolean => given > inTarrif;

    private isRangeBetween = (given: number, min: number, max: number): boolean => this.isGreaterThan(given, min) && this.isLessThan(given, max);

    private calculateShippingCost(dimension: parcelDetails): number {
        let price = 0;
        for(const tarrif of this.tarrifs) {
            const {weight, distance, price: cost} = tarrif;
            const weightMatched = this.applyComparision(weight, dimension.weight);
            if(!weightMatched) continue;
            const distanceMatched = this.applyComparision(distance, dimension.distance);
            console.log(tarrif, { result: weightMatched && distanceMatched });
            if(weightMatched && distanceMatched) {
                price = cost;
                break;
            }
        }
        return price;
    }

    private applyComparision(dimension: TarrifProType, value: number): boolean {
        const { operator } = dimension;
        let matched = false;

        if(operator == "<") {
            matched = this.isLessThan(value, dimension.value as number);
        }else if(operator == ">") {
            matched = this.isGreaterThan(value, dimension.value as number);
        }else if(operator == "range") {
            const {min, max} = dimension;
            matched = this.isRangeBetween(value, min, max);
        }

        return matched;
    }

    private loadShippingTarrifs() {
        const { tarrifs }: { tarrifs: TarrifType[] } = readJsonFile("./distance.json");
        this.tarrifs = tarrifs;
    }

}
