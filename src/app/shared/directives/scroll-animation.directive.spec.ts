import { ScrollAnimationDirective } from './scroll-animation.directive';

describe('ScrollAnimationDirective', () => {
  it('should create an instance', () => {
    const directive = new ScrollAnimationDirective({
      nativeElement: document.createElement('div')
    });
    expect(directive).toBeTruthy();
  });
});
