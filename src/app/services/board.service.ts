import { Injectable, signal, computed } from '@angular/core';
import data from '../../../public/data.json'; 

@Injectable({ providedIn: 'root' })
export class BoardService {
  private boardsSignal = signal(data.boards);
  boards = this.boardsSignal.asReadonly();

  activeBoardId = signal<string>('');

  // The Header Title will listen to this specific signal
  currentBoard = computed(() => {
    const id = this.activeBoardId();
    return this.boards().find(b => b.name.toLowerCase().replace(/ /g, '-') === id);
  });

  setActiveBoard(id: string) {
    this.activeBoardId.set(id);
  }

  getBoardById(id: string) {
    return this.boards().find(b => b.name.toLowerCase().replace(/ /g, '-') === id);
  }
}