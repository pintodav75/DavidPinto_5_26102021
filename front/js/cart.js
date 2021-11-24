const stringTabArticles = localStorage.getItem('articles');
let tabArticles = JSON.parse(stringTabArticles) || [];

console.log(tabArticles);

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

document.getElementById('cart__items').innerHTML = `
<section id="cart__items">
    ${strHtml}
</section>
`;




const totalQuantity = tabArticles.reduce((prev, curr) => prev + curr.quantity, 0)
document.getElementById('totalQuantity').innerHTML = `<span id="totalQuantity">${totalQuantity}</span>`;

const totalPrice = tabArticles.reduce((prev, curr) => prev + curr.quantity * curr.price, 0)
document.getElementById('totalPrice').innerHTML = `<span id="totalPrice">${totalPrice}</span>`;

console.log(totalQuantity)