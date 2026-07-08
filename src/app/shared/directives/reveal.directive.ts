import { isPlatformBrowser } from '@angular/common';
import { Directive, Input, ElementRef, OnDestroy, OnInit, Inject, PLATFORM_ID } from '@angular/core';

type RevealVariant = 'up' | 'fade' | 'left' | 'right' | 'scale-up' | 'blur-up';

@Directive({ selector: '[fbReveal]', standalone: true })
export class RevealDirective implements OnInit, OnDestroy {
    @Input('fbReveal') variant: RevealVariant = 'up';
    @Input() revealDelay = 0;
    @Input() revealDuration = 700;

    private observer: IntersectionObserver | null = null;
    private fallbackTimer: number | null = null;

    constructor(
        private el: ElementRef<HTMLElement>,
        @Inject(PLATFORM_ID) private platformId: object
    ) { }

    ngOnInit() {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }

        const el = this.el.nativeElement;

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        el.classList.add('fb-reveal');
        el.style.setProperty('--fb-reveal-delay', `${this.revealDelay}ms`);
        el.style.setProperty('--fb-reveal-duration', `${this.revealDuration}ms`);

        this.observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) {
                    return;
                }

                this.reveal();
            },
            { threshold: 0.01, rootMargin: '0px 0px -24px 0px' }
        );

        this.observer.observe(el);

        this.fallbackTimer = window.setTimeout(() => {
            if (this.isElementInViewport()) {
                this.reveal();
            }
        }, 300);
    }

    ngOnDestroy() {
        this.observer?.disconnect();
        if (this.fallbackTimer !== null) {
            window.clearTimeout(this.fallbackTimer);
        }
    }

    private reveal(): void {
        const el = this.el.nativeElement;

        el.classList.add('fb-reveal-visible');
        this.observer?.disconnect();

        if (this.fallbackTimer !== null) {
            window.clearTimeout(this.fallbackTimer);
            this.fallbackTimer = null;
        }

        window.setTimeout(() => {
            el.classList.add('fb-reveal-done');
        }, this.revealDuration + this.revealDelay + 120);
    }

    private isElementInViewport(): boolean {
        const rect = this.el.nativeElement.getBoundingClientRect();
        const height = window.innerHeight || document.documentElement.clientHeight;

        return rect.top < height - 24 && rect.bottom > 0;
    }
}
