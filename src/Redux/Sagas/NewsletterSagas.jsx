
import { call, put, takeEvery } from "redux-saga/effects";

import { CREATE_NEWSLETTER, CREATE_NEWSLETTER_RED, DELETE_NEWSLETTER, DELETE_NEWSLETTER_RED, GET_NEWSLETTER, GET_NEWSLETTER_RED, UPDATE_NEWSLETTER, UPDATE_NEWSLETTER_RED } from "../Constent"
import { createMultipartRecord, createRecord, deleteRecord, getRecord, updateRecord } from "./Services/index"

function* createSaga(action) {               // Worker saga
    const response = yield createRecord("newsletter", action.payload)     // if data has no file field
    // const response = yield createMultipartRecord("newsletter", action.paload)     // if data has at least 1 file field
   yield put({ type: CREATE_NEWSLETTER_RED, payload: response })

}


function* getSaga(action) {               // Worker saga
    const response = yield getRecord("newsletter", action.payload)     // if data has no file field

    yield put({ type: GET_NEWSLETTER_RED, payload: response })
}



function* updateSaga(action) {               // Worker saga
    yield updateRecord("newsletter", action.payload)              // if data has no file field
    // yield createMultipartRecord("newsletter", action.paload)     // if data has at least 1 file field
    yield put({ type: UPDATE_NEWSLETTER_RED, payload: action.payload })


//   in case of real backend 
    // let response =   yield updateRecord("newsletter", action.paload)              // if data has no file field
    // let response= yield createMultipartRecord("newsletter", action.paload)     // if data has at least 1 file field
    // yield put({ UPDATE_NEWSLETTER_RED, payload: response })
}

function* deleteSaga(action) {               // Worker saga
    yield deleteRecord("newsletter", action.payload)     // if data has no file field

    yield put({ type: DELETE_NEWSLETTER_RED, payload: action.payload })
}


export default function* NewsletterSaga() {
    yield takeEvery(CREATE_NEWSLETTER, createSaga)             // watcher saga
    yield takeEvery(GET_NEWSLETTER, getSaga)             // watcher saga
    yield takeEvery(UPDATE_NEWSLETTER, updateSaga)             // watcher saga
    yield takeEvery(DELETE_NEWSLETTER, deleteSaga)             // watcher saga
}