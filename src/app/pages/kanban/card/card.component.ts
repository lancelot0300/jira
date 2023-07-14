import { Component, Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Card } from 'src/types';

@Component({
  selector: 'kanban-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})

export class CardComponent {
  @Input() card!: Card;
  @Input() openedCard!: boolean;
  @Output() openCardEvent = new EventEmitter<boolean>();
  @Output() cardState = new EventEmitter<Card>();

  openCard() {
    this.openCardEvent.emit(!this.openedCard);
    this.cardState.emit(this.card);
  }
}