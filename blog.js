
fetch('https://raw.githubusercontent.com/bado14junior/KJ13/main/articles.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('blog-container');
    data.forEach(article => {
      const div = document.createElement('div');
      div.classList.add('article');
      div.innerHTML = `
        <h2>article.titre</h2>
        <p><strong>Par:</strong>{article.auteur} | <em>article.date</em></p>
        <p>{article.contenu}</p>
        <hr/>
      `;
      container.appendChild(div);
    });
  })
  .catch(error => {
    console.error('Erreur chargement articles:', error);document.getElementById('blog-container').innerHTML = "<p>Impossible de charger les articles.</p>";
  });
```
