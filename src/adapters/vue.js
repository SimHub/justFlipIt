import justFlipIt from '@simhub2/justflipit';
export const vFlip = {
  mounted(element, binding) { const options = binding.value || {}; justFlipIt(element, { ...options, Faces: options.Faces || { front: '[data-flip-front]', back: '[data-flip-back]' } }); },
  updated(element, binding) { const { Faces, ...settings } = binding.value || {}; justFlipIt.get(element)?.update(settings); },
  beforeUnmount(element) { justFlipIt.destroy(element); }
};
