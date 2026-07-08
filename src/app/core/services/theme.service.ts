import { Injectable, signal, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'light';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private readonly THEME_KEY = 'fb-theme-preference';
    theme = signal<Theme>('light');

    constructor(@Inject(PLATFORM_ID) private platformId: object) {
        if (isPlatformBrowser(this.platformId)) {
            this.setTheme('light');
        }
    }

    toggleTheme() {
        this.setTheme('light');
    }

    setTheme(_theme: Theme) {
        this.theme.set('light');
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem(this.THEME_KEY, 'light');
            document.documentElement.classList.remove('dark');
        }
    }
}
