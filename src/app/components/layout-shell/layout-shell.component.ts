import { Component, signal, inject, computed } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-layout-shell',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout-shell.component.html',
  styleUrl: './layout-shell.component.scss'
})
export class LayoutShellComponent {
  private themeService = inject(ThemeService);
  isDarkMode = this.themeService.darkMode;
  boardService = inject(BoardService);

  headerTitle = computed(() => 
    this.boardService.currentBoard()?.name || 'Platform Launch'
  );

  boards = this.boardService.boards;

  isSidebarHidden = signal(false);

  toggleSidebar() {
    this.isSidebarHidden.update(val => !val);
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

}
