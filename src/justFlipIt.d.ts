export interface Options {
  Template?: string;
  Click?: boolean | string | string[];
  FlipX?: boolean;
  Duration?: number;
  Easing?: string;
  Effect?: 'flip' | 'fade' | 'scale';
  ReducedMotion?: boolean;
  Tilt?: boolean | 'only' | { max?: number; perspective?: number; scale?: number };
  Faces?: { front: string; back: string };
  preserveClasses?: boolean;
  preserveStyles?: boolean;
  Style?: { el: string; style: Partial<CSSStyleDeclaration> }[];
}
export interface FlipState { flipped: boolean; destroyed: boolean; effect: 'flip' | 'fade' | 'scale' }
export class FlipController {
  constructor(element: HTMLElement, options?: Options);
  readonly element: HTMLElement;
  readonly hoverPanel: HTMLElement;
  readonly frontWrapper: HTMLElement;
  readonly backWrapper: HTMLElement;
  readonly flipped: boolean;
  readonly destroyed: boolean;
  readonly managed: boolean;
  flip(value?: boolean): this;
  toggle(): this;
  update(options?: Omit<Options, 'Faces'>): this;
  getState(): FlipState;
  destroy(): void;
}
type Targets = string | Iterable<HTMLElement> | ArrayLike<HTMLElement>;
declare function justFlipIt(target: HTMLElement, options?: Options): FlipController;
declare function justFlipIt(target: Targets, options?: Options): FlipController[];
declare namespace justFlipIt {
  function destroy(target: HTMLElement | Targets): void;
  function get(element: HTMLElement): FlipController | undefined;
}
export default justFlipIt;
