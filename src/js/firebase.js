import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
const firebaseConfig = {
  apiKey: 'AIzaSyDFHAvKB9QXSX4mZY2LibH7sp2Ay5G_HqE',
  authDomain: 'notballs-db693.firebaseapp.com',
  projectId: 'notballs-db693',
  storageBucket: 'notballs-db693.appspot.com',
  messagingSenderId: '38582946259',
  appId: '1:38582946259:web:4d4ada0cddcecf08e40726'
}

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)

export {
    db
}
