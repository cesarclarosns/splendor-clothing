import { takeLatest, call, put, all, select } from "redux-saga/effects";
import {
  cartFetchStart,
  cartFetchSuccess,
  cartFetchFailure,
  cartSaveCart,
} from "./cartSlice";
import { selectIsFetched } from "./cartSelectors";

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

function* saveCartAsync({ payload: { cartItems, hasChanged, cartId } }) {
  if (!hasChanged) return;

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
  yield takeLatest(cartSaveCart, saveCartAsync);
}

export function* cartSagas() {
  yield all([call(onFetchCartStart), call(onSaveCartStart)]);
}
