declare module 'aos' {
  type AosOptions = {
    duration?: number;
    easing?: string;
    once?: boolean;
    offset?: number;
    delay?: number;
    disable?: boolean | string | (() => boolean);
  };

  const aos: {
    init(options?: AosOptions): void;
    refresh(): void;
    refreshHard(): void;
  };

  export default aos;
}
