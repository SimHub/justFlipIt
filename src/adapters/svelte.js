import justFlipIt from '@simhub2/justflipit';
export function flip(node, options = {}) {
  const instance = justFlipIt(node, { ...options, Faces: options.Faces || { front: '[data-flip-front]', back: '[data-flip-back]' } });
  return { update(next = {}) { const { Faces, ...settings } = next; instance.update(settings); }, destroy() { instance.destroy(); } };
}
