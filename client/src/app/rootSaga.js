import { all, call } from "redux-saga/effects";

import { userSagas } from "../features/user/userSaga";
import { shopSagas } from "../features/shop/shopSaga";
import { cartSagas } from "../features/cart/cartSaga";

export default function* rootSaga() {
  yield all([call(userSagas), call(shopSagas), call(cartSagas)]);
}
