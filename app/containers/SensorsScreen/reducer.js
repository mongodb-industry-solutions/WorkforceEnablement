/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';

// The initial state of the App
export const initialState = {
  sensors: [],
};

/* eslint-disable default-case, no-param-reassign */
const sensorReducer = (state = initialState, action) =>
  produce(state, draft => {
    console.log('action: sensorReducer', action);

    switch (action.type) {
      case 'GET_SENSORS':
        draft.sensors = action.response;
        break;
      case 'GET_SENSORS_REQUEST':
        return {
          ...state,
        };
    }
  });

export default sensorReducer;
