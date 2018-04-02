export const IN_ROUTING = 'IN_ROUTING';

export function inRouting(isInRouting) {
  return {
    type: IN_ROUTING,
    isInRouting
  }
}