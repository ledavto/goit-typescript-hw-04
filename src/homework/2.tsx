import React, {useReducer} from "react";

type State = {
  isRequestInProgress: boolean;
  requestStep: string;
}

enum RequestStep {
  START = 'start',
  PENDING = 'pending',
  FINISHED = 'finished',
  IDLE = 'idle'

} 

const initialState: State = {
  isRequestInProgress: false,
  requestStep: 'idle',
};

type Action = 
  | { type: 'START_REQUEST' }
  | { type: 'PENDING_REQUEST' }
  | { type: 'FINISH_REQUEST' }
  | { type: 'RESET_REQUEST' };

function requestReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'START_REQUEST':
      return { ...state, isRequestInProgress: true, requestStep: RequestStep.START };
    case 'PENDING_REQUEST':
      return { ...state, isRequestInProgress: true, requestStep: RequestStep.PENDING };
    case 'FINISH_REQUEST':
      return { ...state, isRequestInProgress: false, requestStep: RequestStep.FINISHED };
    case 'RESET_REQUEST':
      return { ...state, isRequestInProgress: false, requestStep: RequestStep.IDLE };
    default:
      return state;
  }
}

export function RequestComponent() {
  const [requestState, requestDispatch] = useReducer(requestReducer, initialState);

  const startRequest = () => {
    requestDispatch({ type: 'START_REQUEST' });
    // Імітуємо запит до сервера
    setTimeout(() => {
      requestDispatch({ type: 'PENDING_REQUEST' });
      // Імітуємо отримання відповіді від сервера
      setTimeout(() => {
        requestDispatch({ type: 'FINISH_REQUEST' });
      }, 2000);
    }, 2000);
  };

  const resetRequest = () => {
    requestDispatch({ type: 'RESET_REQUEST' });
  };

  return (
    <div>
      <button onClick={startRequest}>Почати запит</button>
      <button onClick={resetRequest}>Скинути запит</button>
      <p>Стан запиту: {requestState.requestStep}</p>
    </div>
  );
}

export default RequestComponent;
