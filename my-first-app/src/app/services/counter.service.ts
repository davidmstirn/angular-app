import {EventEmitter, Injectable} from "@angular/core";

@Injectable({providedIn:'root'})
export class CounterService {
    activationCount: number = 0;
    deactivationCount: number = 0;

    activationChange = new EventEmitter<number>();
    deactivationChange = new EventEmitter<number>();

    constructor() {
    }

    incrementActivationCount(amount: number = 1){
        this.activationCount+=amount;
        this.activationChange.emit(this.activationCount);
    }

    incrementDeactivationCount(amount: number = 1){
        this.deactivationCount+=amount;
        this.deactivationChange.emit(this.deactivationCount);
    }
}
