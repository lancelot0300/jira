import { Component, OnInit } from '@angular/core';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { CardComponent } from './card/card.component';
import { OpenedCardComponent } from './opened-card/opened-card.component';
import { Output, EventEmitter, Input } from '@angular/core';
import { Card } from '../../../types';
import { AuthService } from 'src/app/services/auth.service';
import { CreateCardComponent } from './create-card/create-card.component';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css'],
})
export class KanbanComponent implements OnInit {
  @Input() cards: Card[] = [];
  @Input() openedCard!: Card | null;
  @Input() openedCardCreator!: boolean | null;

  todoCards: Card[] = [];
  doingCards: Card[] = [];
  reviewCards: Card[] = [];

  ngOnInit() {
    this.loadCardsFromLocalStorage(); // Load cards from local storage

    if (this.cards.length === 0) {
      // Set default cards if no cards are found in local storage
      this.cards = [
        {
          title: 'Kanban board header functionality',
          description: 'Add functionality to filter cards by status',
          task: 'Web application',
          id: 'Functionality-1',
          userPicture: '../../../assets/default_profile.jpg',
          status: 'todo',
          priority: 'medium',
        },
        {
          title: 'Kanban board card functionality 2',
          description: 'Add functionality to create cards',
          task: 'Web application',
          id: 'Functionality-2',
          userPicture: '../../../assets/default_profile.jpg',
          status: 'doing',
          priority: 'high',
        },
        {
          title: 'Kanban board card functionality 3',
          description: 'Add functionality to edit cards',
          task: 'Web application',
          id: 'Functionality-3',
          userPicture: '../../../assets/default_profile.jpg',
          status: 'review',
          priority: 'low',
        },
      ];
    }

    this.updateCardColumns();
  }

  private loadCardsFromLocalStorage() {
    const storedCards = localStorage.getItem('kanbanCards');
    if (storedCards) {
      this.cards = JSON.parse(storedCards);
    }
  }

  private saveCardsToLocalStorage() {
    localStorage.setItem('kanbanCards', JSON.stringify(this.cards));
  }

  onCardStateChange(card: Card) {
    this.openedCard = card;
    this.updateCardColumns();
  }

  handleCardClose(opened: boolean) {
    if (opened) {
      this.openedCard = null;
    }
  }

  private updateCardColumns() {
    this.todoCards = this.cards.filter((c) => c.status === 'todo');
    this.doingCards = this.cards.filter((c) => c.status === 'doing');
    this.reviewCards = this.cards.filter((c) => c.status === 'review');
    this.saveCardsToLocalStorage(); // Save cards to local storage after updating
  }

  openCardCreator() {
    this.openedCardCreator = !this.openedCardCreator;
  }

  handleCardCreatorClose() {
    this.openedCardCreator = !this.openedCardCreator;
  }

  handleCardCreate(card: Card) {
    this.cards.push(card);
    this.updateCardColumns();
  }
}
