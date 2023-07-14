import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Card } from 'src/types';

@Component({
  selector: 'kanban-opened-card',
  templateUrl: './opened-card.component.html',
  styleUrls: ['./opened-card.component.css']
})
export class OpenedCardComponent {
  @Input() card!: Card;
  @Input() openedCard!: boolean;
  @Output() closeCardEvent = new EventEmitter<boolean>();
  @Output() cardState = new EventEmitter<Card>();

  closeCard() {
    this.closeCardEvent.emit(!this.openedCard);
  }

  handleChangeStatus(e: any) {
    this.card.status = e.target.value;
    this.cardState.emit(this.card);
  }

  handleChangePriority(e: any) {
    this.card.priority = e.target.value;
    this.cardState.emit(this.card);
  }
}
