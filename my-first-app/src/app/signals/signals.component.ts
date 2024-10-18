import { NgFor } from '@angular/common';
import {Component, computed, effect, signal} from '@angular/core';

@Component({
  selector: 'app-signals',
  templateUrl: './signals.component.html',
  standalone: true,
  imports: [NgFor],
})
export class SignalsComponent {
  actions = signal<string[]>([]);
  counter = signal<number>(0);
  doubleCounter = computed(() => this.counter() * 2);

  constructor() {
    effect(() => console.log(this.counter()));
  }

  increment() {
    // this.counter.update((c) => c + 1);
    this.counter.set(this.counter() + 1);
    this.actions.mutate((a) => a.push('INCREMENT'));
  }

  decrement() {
    this.counter.update((c) => c - 1);
    this.actions.update((a) => [...a, 'DECREMENT']);
  }
}
