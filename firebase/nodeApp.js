import * as admin from "firebase-admin";

const serviceAccount = require("./serviceAccountKey.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  // admin.initializeApp({
  //   credential: admin.credential.cert({
  //     projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  //     clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  //     privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  //   }),
  //   databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  // })
}

export default admin;
