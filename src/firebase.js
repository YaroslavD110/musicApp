import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import "firebase/auth";

import { fireBaseConfig } from "./config";

firebase.initializeApp(fireBaseConfig);

export const database = firebase.database();
export const storage = firebase.storage();
export const auth = firebase.auth();

export default firebase;
