import { useEffect, useRef } from 'react';
import justFlipIt from '@simhub2/justflipit';
const faces = { front: '[data-flip-front]', back: '[data-flip-back]' };
export function useFlip(options = {}) {
  const ref = useRef(null), controller = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const instance = justFlipIt(ref.current, { ...options, Faces: options.Faces || faces });
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
  }, []);
  useEffect(() => { const { Faces, ...settings } = options; controller.current?.update(settings); }, [options]);
  return { ref, controller };
}
