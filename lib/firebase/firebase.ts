import admin, { ServiceAccount } from "firebase-admin";
import { fireConfig } from "./fireConfig";

try {
  admin.initializeApp({
    credential: admin.credential.cert(fireConfig as ServiceAccount),
  });
} catch (error) {
  console.log(error);
}

export default admin;
