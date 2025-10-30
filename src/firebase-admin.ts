import { initializeApp, getApps, getApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

if (!process.env.FIREBASE_SERVICE_KEY) {
  throw new Error("Missing Firebase---Admin environment variables");
}

const serviceAccount = JSON.parse(
  Buffer.from(process.env.FIREBASE_SERVICE_KEY, "base64").toString("utf-8")
);

const app =
  getApps().length > 0
    ? getApp()
    : initializeApp({ credential: cert(serviceAccount) });
const adminDb = getFirestore(app);

export { app as adminApp, adminDb };
