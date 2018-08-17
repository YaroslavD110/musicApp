import firebase from "firebase";
import { fireBaseConfig } from "./config";

firebase.initializeApp(fireBaseConfig);

export const databse = firebase.database();
export const storage = firebase.storage();
export const auth = firebase.auth();

export default firebase;
