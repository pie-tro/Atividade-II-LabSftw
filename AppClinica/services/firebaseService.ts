import { initializeApp } from "firebase/app";
import { getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  serverTimestamp, 
  doc, 
  deleteDoc, 
  updateDoc 
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCiUYTFzUrRlOAE__BxD77fYE5CViTTuvA",
  authDomain: "appclinica-724ba.firebaseapp.com",
  projectId: "appclinica-724ba",
  storageBucket: "appclinica-724ba.firebasestorage.app",
  messagingSenderId: "893564521158",
  appId: "1:893564521158:web:8268b1ec4abe9ee8e925c7",
  measurementId: "G-2CQKNQJ5EF"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const colecao = 'clientes';

export const adicionarCliente = async (dados: any) => {
  return await addDoc(collection(db, colecao), {
    ...dados,
    criadoEm: serverTimestamp(),
  });
};

export const listarClientes = async () => {
  const q = query(collection(db, colecao), orderBy("criadoEm", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const atualizarCliente = async (id: string, dados: any) => {
  const docRef = doc(db, colecao, id);
  return await updateDoc(docRef, dados);
};

export const deletarCliente = async (id: string) => {
  return await deleteDoc(doc(db, colecao, id));
};


export const salvarConsulta = async (dados: any) => {
  return await addDoc(collection(db, 'consultas'), {
    ...dados,
    criadoEm: serverTimestamp(),
  });
};