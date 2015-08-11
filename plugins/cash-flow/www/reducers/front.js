import { RETRIEVED_PRODUCT } from '../constants/ActionTypes';

export default function front(state = {}, action) {
  switch (action.type) {
  case RETRIEVED_PRODUCT:
    return action.payload.product;
  default:
    return state;
  }
}
