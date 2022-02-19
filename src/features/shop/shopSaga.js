import { takeLatest, call, put, all } from "redux-saga/effects";

import {
  db,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";
import { getDocs, query, collection } from "firebase/firestore";

import {
  fetchCollectionsStart,
  fetchCollectionsSuccess,
  fetchCollectionsFailure,
} from "./shopSlice";

function* fetchCollectionsAsync() {
  try {
    const q = yield query(collection(db, "collections"));
    const querySnapshot = yield getDocs(q);
    const collectionsMap = yield call(
      convertCollectionsSnapshotToMap,
      querySnapshot
    );

    if (!Object.keys(collectionsMap).length) {
      throw new Error();
    }

    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (e) {
    yield put(fetchCollectionsFailure());
  }
}

function* onFetchCollectionsStart() {
  yield takeLatest(fetchCollectionsStart, fetchCollectionsAsync);
}

export function* shopSagas() {
  yield all([call(onFetchCollectionsStart)]);
}
