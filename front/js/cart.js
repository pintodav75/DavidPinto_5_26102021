
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
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${e.quantity}">
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
  return tabArticles.filter(e => JSON.stringify(e) !== JSON.stringify(item))
}

const changeQuantity = (index, value, tabArticles) => {
  tabArticles[index].quantity = value;
  ajoutlesProductsToLS(tabArticles);
  insertArticlesInPage(tabArticles);
  return tabArticles;
}

const addListener = (tabArticles) => {
  // delete item
  let arr = document.getElementsByClassName("deleteItem");
  Array.from(arr).forEach((e, index) => {
    e.addEventListener('click', () => {
      let newTab = deleteItem(tabArticles[index], tabArticles);
      ajoutlesProductsToLS(newTab);
      main()
    });
  }); 

  let arr2 = document.getElementsByClassName("itemQuantity");
  Array.from(arr2).forEach((e, index) => {
    e.addEventListener('input', () => {
      if (isNaN(e.value) || e.value === '')
        e.value = '1';
      const newQuantity = parseInt(e.value, 10);
      let newTab;
      if (newQuantity <= 0)
        newTab = deleteItem(tabArticles[index], tabArticles);
      else
        newTab = changeQuantity(index, newQuantity, tabArticles);
      ajoutlesProductsToLS(newTab);
      main()
    });
  }); 

}

const order = document.getElementById('order');
let firstName = document.getElementById('firstName');
let lastName = document.getElementById('lastName');
let address = document.getElementById('address');
let city = document.getElementById('city');
let email = document.getElementById('email');

// REGEX
const isAlpha = str => /^[a-zA-Z]*$/.test(str);
const isEmail = email => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);


order.addEventListener('click', (e) => {
  e.preventDefault();
  if (!isAlpha(firstName.value) == true || lastName.value.length == 0) {
    firstNameErrorMsg.innerHTML = `Veuillez saisir votre prenom`;
    return
  }
  if (!isAlpha(lastName.value) == true || lastName.value.length == 0) {
    lastNameErrorMsg.innerHTML = `Veuillez saisir votre nom`;
    return
  }
  if (address.value.length == 0) {
    addressErrorMsg.innerHTML = `Veuillez saisir votre adresse`;
  return
  }
  if (!isNaN(city.value) == true || lastName.value.length == 0) {
    cityErrorMsg.innerHTML = `Veuillez saisir votre ville`;
    return
  }
  if (isEmail(email.value) == false || lastName.value.length == 0) {
    emailErrorMsg.innerHTML = `Veuillez saisir votre adresse email !`;
    return
  }

  const contact = {
      firstName: firstName.value,
      lastName: lastName.value,
      address: address.value,
      city: city.value,
      email: email.value,
  };

 const  pannier =  recupereProductsFromLS();
 const tabId = pannier.map(e => e.id);

 fetch("http://127.0.0.1:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify({ contact, products: tabId }),
    headers: { "Content-Type": "application/json" },
})
.then(response => response.json())
.then(json => {
  localStorage.clear();
document.location.href = `confirmation.html?orderId=${json.orderId}`;
return

})
.catch(error => {
  console.log(error)
  
}) 
})
const main = () => {
  let tabArticles = recupereProductsFromLS();
  insertArticlesInPage(tabArticles);  
  addListener(tabArticles);
}

main()