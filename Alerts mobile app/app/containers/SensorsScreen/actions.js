export function getSensors(realm) {
  return {
    type: 'GET_SENSORS_REQUEST',
    payload: { realm },
  };
}

export function setLoading(isLoading) {
  return {
    type: 'SET_LOADING',
    isLoading,
  };
}
