import * as ActionTypes from '../actions/TestActions';

const initialState = {
  text: ''
}

export default function ConfirmModalActionsReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.CHANGE_TEXT :
      const { text } = action
      return Object.assign({}, state, {
        isVisible: true,
        text
      })

    default :
      return state;
  }
}
