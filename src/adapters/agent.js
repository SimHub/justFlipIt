export const flipTool = {
  name: 'control_flip_card',
  description: 'Inspect or control a registered flip card. Content is plain text.',
  parameters: { type: 'object', properties: { id: { type: 'string' }, action: { type: 'string', enum: ['state', 'flip', 'reset', 'toggle', 'setText'] }, text: { type: 'string' } }, required: ['id', 'action'], additionalProperties: false }
};
export function createAgentBridge(cards) {
  const registry = new Map(Object.entries(cards));
  return {
    tool: flipTool,
    execute(command) {
      if (!command || typeof command !== 'object' || Object.keys(command).some(key => !['id', 'action', 'text'].includes(key))) throw new TypeError('Invalid command');
      const card = registry.get(command.id);
      if (!card || card.destroyed) throw new Error('Unknown or destroyed card');
      switch (command.action) {
        case 'state': break;
        case 'flip': card.flip(true); break;
        case 'reset': card.flip(false); break;
        case 'toggle': card.toggle(); break;
        case 'setText':
          if (card.managed) throw new Error('Update framework content through application state');
          if (typeof command.text !== 'string' || command.text.length > 100000) throw new TypeError('Expected text up to 100000 characters');
          card.backWrapper.textContent = command.text; break;
        default: throw new TypeError('Unknown action');
      }
      return { id: command.id, ...card.getState() };
    }
  };
}
