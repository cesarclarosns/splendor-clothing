import { takeLatest, call, put, all, select } from "redux-saga/effects";
import {
  cartFetchStart,
  cartFetchSuccess,
  cartFetchFailure,
  cartAddItem,
  cartRemoveItem,
  cartClearItem,
} from "./cartSlice";
import { selectIsFetched, selectCartItems } from "./cartSelectors";
import { selectCartId } from "../user/userSelectors";

import {
  doc,
  collection,
  getDoc,
  updateDoc,
  query,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase/firebase.utils";

function* fetchCartAsync({ payload: { cartId } }) {
  const isFetched = yield select(selectIsFetched);
  if (isFetched) return;

  try {
    // Fetch cartItems from Firebase and
    const cartRef = yield doc(db, "carts", cartId);
    const cartSnap = yield getDoc(cartRef);

    const q = yield query(collection(db, "collections"));
    const querySnap = yield getDocs(q);

    const collectionsMap = {};
    querySnap.forEach((collection) => {
      collectionsMap[collection.id] = collection.data();
    });

    const cartItems = cartSnap.data().cartItems.map((cartItem) => {
      const { collectionId, id, quantity } = cartItem;
      const collectionItem = collectionsMap[collectionId]["items"].find(
        (item) => id === item.id
      );
      return { ...collectionItem, collectionId, quantity };
    });

    console.log(cartItems);

    yield put(cartFetchSuccess(cartItems));
  } catch (e) {
    yield put(cartFetchFailure());
  }
}

function* saveCartAsync() {
  const cartItems = yield select(selectCartItems);
  const cartId = yield select(selectCartId);

  try {
    const userCart = cartItems.map((item) => {
      const processedItem = {};
      processedItem.id = item.id;
      processedItem.collectionId = item.collectionId;
      processedItem.quantity = item.quantity;
      return processedItem;
    });
    const cartRef = yield doc(db, "carts", cartId);
    yield updateDoc(cartRef, {
      cartItems: userCart,
    });
  } catch (e) {
    console.log(e);
  }
}

function* onFetchCartStart() {
  yield takeLatest(cartFetchStart, fetchCartAsync);
}

function* onSaveCartStart() {
  yield takeLatest(cartAddItem, saveCartAsync);
  yield takeLatest(cartRemoveItem, saveCartAsync);
  yield takeLatest(cartClearItem, saveCartAsync);
}

export function* cartSagas() {
  yield all([call(onFetchCartStart), call(onSaveCartStart)]);
}
