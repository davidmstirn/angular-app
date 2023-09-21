import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css'],
})
export class GameControlComponent {
  ref: NodeJS.Timeout;
  lastNumber = 0;

  @Output() gameTick = new EventEmitter<number>();
  @Output() gameStart = new EventEmitter<void>();
  @Output() gameEnd = new EventEmitter<void>();

  onStartGame() {
    this.resetGame();

    this.ref = setInterval(() => this.gameTick.emit(++this.lastNumber), 1000);
    this.gameStart.emit();
  }

  onEndGame() {
    clearTimeout(this.ref);
    this.gameEnd.emit();
  }

  private resetGame() {
    this.lastNumber = 0;
    if (this.ref) {
      clearTimeout(this.ref);
    }
  }
}
