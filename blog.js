
// Import Firebase
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyABb6gzWkFDihJOkBG_KVga9PuLgZfuo8o",
  authDomain: "jb-plateforme-global.firebaseapp.com",
  projectId: "jb-plateforme-global",
  storageBucket: "jb-plateforme-global.appspot.com",
  messagingSenderId: "951618145795",
  appId: "1:951618145795:web:c9556e044ab8cb221e4836"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Fonction pour afficher les articles
async function chargerArticles() {
  const liste = document.getElementById("liste-articles");
  liste.innerHTML = "<p>Chargement...</p>";

  try {
    const querySnapshot = await getDocs(collection(db, "articles"));
    let html = "";
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      html += `
        <div class="article">
          <h3>data.titre</h3>
          <p>{data.contenu}</p>
          <small>${new Date(data.date.seconds * 1000).toLocaleString()}</small>
        </div>
      `;
    });liste.innerHTML = html || "<p>Aucun article trouvé.</p>";
  } catch (e) {
    liste.innerHTML = "<p>Erreur lors du chargement des articles.</p>";
    console.error(e);
  }
}

// Appeler la fonction au chargement
window.addEventListener("DOMContentLoaded", chargerArticles);
```
