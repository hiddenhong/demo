export const SELECT_SERVICE = "SELECT_SERVICE";

export function selectService(service) {
  return {
    type: SELECT_SERVICE,
    service
  }
}