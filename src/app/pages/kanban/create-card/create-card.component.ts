import { Component } from '@angular/core';
import { Card } from 'src/types';
import { Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'kanban-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.css']
})
export class CreateCardComponent {
  @Input() card!: Card;
  @Input() openedCard!: boolean;
  @Input() cardsLength: number = 0;
  @Output() closeCardEvent = new EventEmitter<boolean>();
  @Output() cardState = new EventEmitter<Card>();

  title: string = '';
  description: string = '';
  status: string = 'todo';
  priority: string = 'low';
  id: string = '';

  @Output() createCardEvent = new EventEmitter<Card>();

  closeCard() {
    this.closeCardEvent.emit(!this.openedCard);
  }

  createCard() {
    const card: Card = {
      title: this.title,
      description: this.description,
      status: this.status,
      priority: this.priority,
      task: 'Web application',
      id: "TKS-" + this.cardsLength.toString(),
      userPicture: '../../../assets/default_profile.jpg',
    };
    this.createCardEvent.emit(card);
    this.closeCard();
  }
}