
const productToHtml = (p) => {
    return `
    <a href="./product.html?id=${p._id}">
        <article>
            <img src="${p.imageUrl}" alt="${p.altTxt}">
            <h3 class="productName">${p.name}</h3>
            <h4>${p.price}€</h4>
            <p class="productDescription">${p.description}</p>
        </article>
    </a>
    `;  
};

  const products = fetch('http://127.0.0.1:3000/api/products')
  .then((response) => {
       return response.json() 
    })
  .then((content) => { 
    const finalHtml = content.map(productToHtml);
    document.getElementById('items').innerHTML = finalHtml.join('');
   })
   .catch((err) => {
    document.getElementById('items').innerHTML = `<h4>Errror lors du fetch des produits</h4>`;
   })
