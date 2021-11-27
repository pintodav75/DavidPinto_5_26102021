
// fonction qui ajoute l article passe en parametre
// dans le tableau d'articles du localstorage
const ajoutlesProductsToLS = (produits) => {
  const stringProduit = JSON.stringify(produits);
  localStorage.setItem("articles", stringProduit);
}

// fonction qui retorune le tableau d'articles dans le localstorage
const recupereProductsFromLS = () => {
  const strProducts = localStorage.getItem('articles');
  return JSON.parse(strProducts) || [];
}

const insertArticlesInPage = (tabArticles) => {
  const strHtml = tabArticles.map((e) => {
    return `
    <article class="cart__item" data-id="${e.id}">
                <div class="cart__item__img">
                  <img src="${e.url}" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__titlePrice">
                    <h2>${e.name}</h2>
                    <p>${e.price}</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" onchange="" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${e.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
    </article>
    `;
  })
  document.getElementById('cart__items').innerHTML = ` <section id="cart__items">${strHtml}</section>`;
    
  const totalQuantity = tabArticles.reduce((prev, curr) => prev + curr.quantity, 0)
  document.getElementById('totalQuantity').innerHTML = `<span id="totalQuantity">${totalQuantity}</span>`;

  const totalPrice = tabArticles.reduce((prev, curr) => prev + curr.quantity * curr.price, 0)
  document.getElementById('totalPrice').innerHTML = `<span id="totalPrice">${totalPrice}</span>`;
}

const deleteItem = (item, tabArticles) => {
  const newTab = tabArticles.filter(e => {
    if (e.id !== item.id) return true
    if (e.name !== item.name) return true
    if (e.color !== item.color) return true
    return false;
  });
  ajoutlesProductsToLS(newTab);
  insertArticlesInPage(newTab);
  return newTab;
}

const addListener = (tabArticles) => {
  // delete item
  let arr = document.getElementsByClassName("deleteItem");
  Array.from(arr).forEach((e, index) => {
    e.addEventListener('click', () => {
      let newTab = deleteItem(tabArticles[index], tabArticles);
      addListener(newTab);
    });
  });
  // function a trou pour la quantity
  //
}

const loadArticles = () => {
  let tabArticles = recupereProductsFromLS();
  insertArticlesInPage(tabArticles);  
  return tabArticles;  
}

let tabArticles = loadArticles();
addListener(tabArticles);
