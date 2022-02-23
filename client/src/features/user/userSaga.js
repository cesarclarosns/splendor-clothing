import {
  auth,
  googleProvider,
  createUserProfileDocument,
  getCurrentUser,
} from "../../firebase/firebase.utils";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { getDoc } from "firebase/firestore";
import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  checkUserSession,
  googleSignInStart,
  emailSignInStart,
  signOutStart,
  signUpStart,
  signInFailure,
  signInSuccess,
  signOutFailure,
  signOutSuccess,
  signUpFailure,
  signUpSuccess,
} from "./userSlice";
import { cartFetchStart, cartClearCart } from "../cart/cartSlice";

function* isUserAuthenticated() {
  try {
    const user = yield getCurrentUser();
    yield getSnapshotFromUser(user);
  } catch (error) {
    yield put(signInFailure("isUserAuthenticated failed"));
  }
}

function* getSnapshotFromUser(user) {
  try {
    const userRef = yield call(createUserProfileDocument, user);
    const userSnap = yield getDoc(userRef);
    const { displayName, email, cartId } = userSnap.data();

    yield put(cartFetchStart({ cartId }));
    yield put(signInSuccess({ displayName, email, cartId }));
  } catch (error) {
    yield put(signInFailure("getSnapshotFromUserAuth failed"));
  }
}

function* signInUserWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield signInWithEmailAndPassword(auth, email, password);
    yield getSnapshotFromUser(user);
  } catch (error) {
    yield put(signInFailure("signInUserWithEmail failed"));
  }
}

function* signInUserWithGoogle() {
  try {
    const { user } = yield signInWithPopup(auth, googleProvider);
    yield getSnapshotFromUser(user);
  } catch (error) {
    yield put(signInFailure("signInWithGoogle failed"));
  }
}

function* signOutUser() {
  try {
    yield signOut(auth);
    yield put(cartClearCart());
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure("signOutUser failed"));
  }
}

function* signUpUser({ payload: { email, password, displayName } }) {
  try {
    // createUserWithEmailAndPassword updates auth if the user was created successfully
    const { user } = yield createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    yield put(signUpSuccess());

    if (auth.currentUser) {
      yield updateProfile(auth.currentUser, { displayName: displayName });
      yield getSnapshotFromUser(user);
    }
  } catch (error) {
    yield put(signUpFailure("signUpUser failed"));
  }
}

// Watchers
function* onCheckUserSession() {
  yield takeLatest(checkUserSession, isUserAuthenticated);
}

function* onEmailSignInStart() {
  yield takeLatest(emailSignInStart, signInUserWithEmail);
}

function* onGoogleSignInStart() {
  yield takeLatest(googleSignInStart, signInUserWithGoogle);
}

function* onSignOutStart() {
  yield takeLatest(signOutStart, signOutUser);
}

function* onSignUpStart() {
  yield takeLatest(signUpStart, signUpUser);
}

export function* userSagas() {
  yield all([
    call(onCheckUserSession),
    call(onEmailSignInStart),
    call(onGoogleSignInStart),
    call(onSignOutStart),
    call(onSignUpStart),
  ]);
}
