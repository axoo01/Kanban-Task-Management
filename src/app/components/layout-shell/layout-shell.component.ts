import { Component, signal, inject, computed, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { BoardService } from '../../services/board.service';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-layout-shell',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './layout-shell.component.html',
  styleUrl: './layout-shell.component.scss'
})
export class LayoutShellComponent {
  private themeService = inject(ThemeService);
  isDarkMode = this.themeService.darkMode;
  boardService = inject(BoardService);

  isMobileView = signal(window.innerWidth <= 768);
  isMobileSidebarOpen = signal(false);
  isSidebarHidden = signal(false);

  headerTitle = computed(() => 
    this.boardService.currentBoard()?.name || 'Platform Launch'
  );

  
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const isMobile = event.target.innerWidth <= 768;
    this.isMobileView.set(isMobile);
   
    if (!isMobile) this.isMobileSidebarOpen.set(false);
  }

  toggleMobileSidebar() {
    if (this.isMobileView()) {
      this.isMobileSidebarOpen.update(val => !val);
    }
  }

  toggleSidebar() {
    this.isSidebarHidden.update(val => !val);
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}