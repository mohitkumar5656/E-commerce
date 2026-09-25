
import { call, put, takeEvery } from "redux-saga/effects";

import { CREATE_FEATURE, CREATE_FEATURE_RED, DELETE_FEATURE, DELETE_FEATURE_RED, GET_FEATURE, GET_FEATURE_RED, UPDATE_FEATURE, UPDATE_FEATURE_RED } from "../Constent"
import { createMultipartRecord, createRecord, deleteRecord, getRecord, updateRecord } from "./Services/index"

function* createSaga(action) {               // Worker saga
    const response = yield createRecord("feature", action.payload)     // if data has no file field
    // const response = yield createMultipartRecord("feature", action.paload)     // if data has at least 1 file field
   yield put({ type: CREATE_FEATURE_RED, payload: response })

}


function* getSaga(action) {               // Worker saga
    const response = yield getRecord("feature", action.payload)     // if data has no file field

    yield put({ type: GET_FEATURE_RED, payload: response })
}



function* updateSaga(action) {               // Worker saga
    yield updateRecord("feature", action.payload)              // if data has no file field
    // yield createMultipartRecord("feature", action.paload)     // if data has at least 1 file field
    yield put({ type: UPDATE_FEATURE_RED, payload: action.payload })


//   in case of real backend 
    // let response =   yield updateRecord("feature", action.paload)              // if data has no file field
    // let response= yield createMultipartRecord("feature", action.paload)     // if data has at least 1 file field
    // yield put({ UPDATE_FEATURE_RED, payload: response })
}

function* deleteSaga(action) {               // Worker saga
    yield deleteRecord("feature", action.payload)     // if data has no file field

    yield put({ type: DELETE_FEATURE_RED, payload: action.payload })
}


export default function* FeatureSaga() {
    yield takeEvery(CREATE_FEATURE, createSaga)             // watcher saga
    yield takeEvery(GET_FEATURE, getSaga)             // watcher saga
    yield takeEvery(UPDATE_FEATURE, updateSaga)             // watcher saga
    yield takeEvery(DELETE_FEATURE, deleteSaga)             // watcher saga
}