import type { RefObject } from 'react';
import type { Options, FlipController } from './justFlipIt';
export function useFlip<T extends HTMLElement = HTMLDivElement>(options?: Options): { ref: RefObject<T | null>; controller: RefObject<FlipController | null> };
