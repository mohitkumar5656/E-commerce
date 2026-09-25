
import { call, put, takeEvery } from "redux-saga/effects";

import { CREATE_PRODUCT, CREATE_PRODUCT_RED, DELETE_PRODUCT, DELETE_PRODUCT_RED, GET_PRODUCT, GET_PRODUCT_RED, UPDATE_PRODUCT, UPDATE_PRODUCT_RED } from "../Constent"
import { createMultipartRecord, createRecord, deleteRecord, getRecord, updateRecord } from "./Services/index"

function* createSaga(action) {               // Worker saga
    const response = yield createRecord("product", action.payload)     // if data has no file field
    // const response = yield createMultipartRecord("product", action.paload)     // if data has at least 1 file field
   yield put({ type: CREATE_PRODUCT_RED, payload: response })

}


function* getSaga(action) {               // Worker saga
    const response = yield getRecord("product", action.payload)     // if data has no file field

    yield put({ type: GET_PRODUCT_RED, payload: response })
}



function* updateSaga(action) {               // Worker saga
    yield updateRecord("product", action.payload)              // if data has no file field
    // yield createMultipartRecord("product", action.paload)     // if data has at least 1 file field
    yield put({ type: UPDATE_PRODUCT_RED, payload: action.payload })


//   in case of real backend 
    // let response =   yield updateRecord("product", action.paload)              // if data has no file field
    // let response= yield createMultipartRecord("product", action.paload)     // if data has at least 1 file field
    // yield put({ UPDATE_PRODUCT_RED, payload: response })
}

function* deleteSaga(action) {               // Worker saga
    yield deleteRecord("product", action.payload)     // if data has no file field

    yield put({ type: DELETE_PRODUCT_RED, payload: action.payload })
}


export default function* ProductSaga() {
    yield takeEvery(CREATE_PRODUCT, createSaga)             // watcher saga
    yield takeEvery(GET_PRODUCT, getSaga)             // watcher saga
    yield takeEvery(UPDATE_PRODUCT, updateSaga)             // watcher saga
    yield takeEvery(DELETE_PRODUCT, deleteSaga)             // watcher saga
}