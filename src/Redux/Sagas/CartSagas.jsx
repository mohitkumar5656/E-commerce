
import { call, put, takeEvery } from "redux-saga/effects";

import { CREATE_CART, CREATE_CART_RED, DELETE_CART, DELETE_CART_RED, GET_CART, GET_CART_RED, UPDATE_CART, UPDATE_CART_RED } from "../Constent"
import { createMultipartRecord, createRecord, deleteRecord, getRecord, updateRecord } from "./Services/index"

function* createSaga(action) {               // Worker saga
    const response = yield createRecord("cart", action.payload)     // if data has no file field
    // const response = yield createMultipartRecord("cart", action.paload)     // if data has at least 1 file field
   yield put({ type: CREATE_CART_RED, payload: response })

}


function* getSaga(action) {               // Worker saga
    const response = yield getRecord("cart", action.payload)     // if data has no file field

    yield put({ type: GET_CART_RED, payload: response })
}



function* updateSaga(action) {               // Worker saga
    yield updateRecord("cart", action.payload)              // if data has no file field
    // yield createMultipartRecord("cart", action.paload)     // if data has at least 1 file field
    yield put({ type: UPDATE_CART_RED, payload: action.payload })


//   in case of real backend 
    // let response =   yield updateRecord("cart", action.paload)              // if data has no file field
    // let response= yield createMultipartRecord("cart", action.paload)     // if data has at least 1 file field
    // yield put({ UPDATE_CART_RED, payload: response })
}

function* deleteSaga(action) {               // Worker saga
    yield deleteRecord("cart", action.payload)     // if data has no file field

    yield put({ type: DELETE_CART_RED, payload: action.payload })
}


export default function* CartSaga() {
    yield takeEvery(CREATE_CART, createSaga)             // watcher saga
    yield takeEvery(GET_CART, getSaga)             // watcher saga
    yield takeEvery(UPDATE_CART, updateSaga)             // watcher saga
    yield takeEvery(DELETE_CART, deleteSaga)             // watcher saga
}