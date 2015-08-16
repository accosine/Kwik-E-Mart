import { API_URL } from '../config';
import WebAPI from '../util/WebAPI';
import { RETRIEVED_PRODUCT } from '../constants/ActionTypes';

const api = new WebAPI(API_URL);

export function retrieveProduct(product) {
  return {
    type: RETRIEVED_PRODUCT,
    payload: {
      product
    }
  };
}

export function getProductAsync(productID) {
  return (dispatch) => {
    api.getProduct(productID, (err, response) => {
      dispatch(retrieveProduct(response.body));
    });
  };
}
