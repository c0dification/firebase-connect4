import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'
import firebase from 'firebase/app'

const config = {} // PLACE FIREBASE CONFIG HERE

firebase.initializeApp(config)

export const auth = firebase.auth()
export const googleProvider = new firebase.auth.GoogleAuthProvider()
export const db = firebase.firestore()
export const dbFieldValue = firebase.firestore.FieldValue
export const functions = firebase.functions()
