export const UPDATE_STATUS = 'UPDATE_STATUS';

export function updateStatus(hasError, statusText, status){
  return {
    type: UPDATE_STATUS,
    payload: {
      isFailure: hasError,
      isSuccess: !hasError,
      statusText: statusText,
      status: status
    }
  }
}

export function clearStatus(){
  return {
    type: UPDATE_STATUS,
    payload: {
      isFailure: false,
      isSuccess: false,
      statusText: "",
      status: "",
    }
  }
}