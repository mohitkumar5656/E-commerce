
import { call, put, takeEvery } from "redux-saga/effects";

import { CREATE_WISHLIST, CREATE_WISHLIST_RED, DELETE_WISHLIST, DELETE_WISHLIST_RED, GET_WISHLIST, GET_WISHLIST_RED, UPDATE_WISHLIST, UPDATE_WISHLIST_RED } from "../Constent"
import { createMultipartRecord, createRecord, deleteRecord, getRecord, updateRecord } from "./Services/index"

function* createSaga(action) {               // Worker saga
    const response = yield createRecord("wishlist", action.payload)     // if data has no file field
    // const response = yield createMultipartRecord("wishlist", action.paload)     // if data has at least 1 file field
   yield put({ type: CREATE_WISHLIST_RED, payload: response })

}


function* getSaga(action) {               // Worker saga
    const response = yield getRecord("wishlist", action.payload)     // if data has no file field

    yield put({ type: GET_WISHLIST_RED, payload: response })
}



function* updateSaga(action) {               // Worker saga
    yield updateRecord("wishlist", action.payload)              // if data has no file field
    // yield createMultipartRecord("wishlist", action.paload)     // if data has at least 1 file field
    yield put({ type: UPDATE_WISHLIST_RED, payload: action.payload })


//   in case of real backend 
    // let response =   yield updateRecord("wishlist", action.paload)              // if data has no file field
    // let response= yield createMultipartRecord("wishlist", action.paload)     // if data has at least 1 file field
    // yield put({ UPDATE_WISHLIST_RED, payload: response })
}

function* deleteSaga(action) {               // Worker saga
    yield deleteRecord("wishlist", action.payload)     // if data has no file field

    yield put({ type: DELETE_WISHLIST_RED, payload: action.payload })
}


export default function* WishlistSaga() {
    yield takeEvery(CREATE_WISHLIST, createSaga)             // watcher saga
    yield takeEvery(GET_WISHLIST, getSaga)             // watcher saga
    yield takeEvery(UPDATE_WISHLIST, updateSaga)             // watcher saga
    yield takeEvery(DELETE_WISHLIST, deleteSaga)             // watcher saga
}