import { compose, createStore } from 'redux'
import rootReducer from '../reducer'

export default function configureStore() {
  const createStoreWithMiddleware = compose(
        typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : (f) => f
    )(createStore);

  const store = createStoreWithMiddleware(rootReducer);
  return store
}
