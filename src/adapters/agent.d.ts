import type { FlipController, FlipState } from './justFlipIt';
export interface AgentCommand { id: string; action: 'state' | 'flip' | 'reset' | 'toggle' | 'setText'; text?: string }
export const flipTool: { name: string; description: string; parameters: Record<string, unknown> };
export function createAgentBridge(cards: Record<string, FlipController>): { tool: typeof flipTool; execute(command: AgentCommand): FlipState & { id: string } };
