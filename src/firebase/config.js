import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCZAL5PtZUsCp8tn4dWzu38S5K70YaeTZg",
    authDomain: "expensetracker-ac33a.firebaseapp.com",
    projectId: "expensetracker-ac33a",
    storageBucket: "expensetracker-ac33a.appspot.com",
    messagingSenderId: "844824540827",
    appId: "1:844824540827:web:7c857c69738b45584ff83e"
  
  };
  



initializeApp(firebaseConfig);

const db = getFirestore();
export default db