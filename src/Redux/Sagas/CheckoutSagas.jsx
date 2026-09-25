
import { call, put, takeEvery } from "redux-saga/effects";

import { CREATE_CHECKOUT, CREATE_CHECKOUT_RED, DELETE_CHECKOUT, DELETE_CHECKOUT_RED, GET_CHECKOUT, GET_CHECKOUT_RED, UPDATE_CHECKOUT, UPDATE_CHECKOUT_RED } from "../Constent"
import { createMultipartRecord, createRecord, deleteRecord, getRecord, updateRecord } from "./Services/index"

function* createSaga(action) {               // Worker saga
    const response = yield createRecord("checkout", action.payload)     // if data has no file field
    // const response = yield createMultipartRecord("checkout", action.paload)     // if data has at least 1 file field
   yield put({ type: CREATE_CHECKOUT_RED, payload: response })

}


function* getSaga(action) {               // Worker saga
    const response = yield getRecord("checkout", action.payload)     // if data has no file field

    yield put({ type: GET_CHECKOUT_RED, payload: response })
}



function* updateSaga(action) {               // Worker saga
    yield updateRecord("checkout", action.payload)              // if data has no file field
    // yield createMultipartRecord("checkout", action.paload)     // if data has at least 1 file field
    yield put({ type: UPDATE_CHECKOUT_RED, payload: action.payload })


//   in case of real backend 
    // let response =   yield updateRecord("checkout", action.paload)              // if data has no file field
    // let response= yield createMultipartRecord("checkout", action.paload)     // if data has at least 1 file field
    // yield put({ UPDATE_CHECKOUT_RED, payload: response })
}

function* deleteSaga(action) {               // Worker saga
    yield deleteRecord("checkout", action.payload)     // if data has no file field

    yield put({ type: DELETE_CHECKOUT_RED, payload: action.payload })
}


export default function* CheckoutSaga() {
    yield takeEvery(CREATE_CHECKOUT, createSaga)             // watcher saga
    yield takeEvery(GET_CHECKOUT, getSaga)             // watcher saga
    yield takeEvery(UPDATE_CHECKOUT, updateSaga)             // watcher saga
    yield takeEvery(DELETE_CHECKOUT, deleteSaga)             // watcher saga
}