import { initializeApp, getApps } from "firebase/app"
import { getDocs, query, orderBy, collection, getFirestore, doc, setDoc, collectionGroup, where  } from 'firebase/firestore'
import { getAuth } from "firebase/auth"
import { uniqBy, concat } from 'lodash'

export const firebaseConfig = {
  apiKey: "AIzaSyCVnZBdNZXuY9NTsHE9RZB4YFXmBqnaG7E",
  authDomain: "chefjoy-web.firebaseapp.com",
  projectId: "chefjoy-web",
  storageBucket: "chefjoy-web.appspot.com",
  messagingSenderId: "676908557269",
  appId: "1:676908557269:web:43d506405f6240ab73535c",
  measurementId: "G-HYEFRS7PK4"
};

export let app = null

export let db = null

export let auth = null

export const initApp = () => {
  app = initializeApp(firebaseConfig)
  db = getFirestore(app);
  auth = getAuth(app);
}

export const AddMessage = (dataVal) => {
  const date = new Date().getTime()
  setDoc(doc(db, 'conversations', `${dataVal.id}`, 'chatInfo', `${date}`), { ...dataVal, timeStamp: date})
  return true
}

export const getRealTimeConversations = async (orderId) => {
  const docRef = query(collection(db, "conversations", orderId, "chatInfo"), orderBy('timeStamp'));
  const docSnap = await getDocs(docRef);
  let data = []

  docSnap.forEach((doc) => {
    data.push({
      ...doc.data(),
      timeStamp: doc.id
    })
  });

  return {query: docRef, data: data}
}

export const FetchMessagesAPI = async (_id) => {
  const docRef = query(collectionGroup(db, "chatInfo"), where('senderId', '==', _id));
  const recieverRef = query(collectionGroup(db, "chatInfo"), where('receiver', '==', _id));
  const [ docSnap, recSnap ] = await Promise.all([getDocs(docRef), getDocs(recieverRef)]);
  let messages = []
  docSnap.forEach((doc) => {
    messages.push(doc.data())
  });
  recSnap.forEach((doc) => {
    messages.push(doc.data())
  });
  messages = uniqBy(messages, v => [v.receiver, v.senderId].join())
  return messages
}