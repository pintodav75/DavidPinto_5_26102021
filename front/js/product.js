
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


// function qui prend en parametre l'URL courant
// GET le produit avec un call api au back et return le produit
const recupProduct = async (url) => {
    const currentUrl = new URL(url)
    const id = currentUrl.searchParams.get("id");
    const product = await fetch(`http://127.0.0.1:3000/api/products/${id}`)
    const productJson = await product.json()

    return productJson;
}

// function qui prend un produit en parametre
// et l'insert dans la page html product.html
const InsertProductInHtml = (product) => {
    document.getElementById('title').innerHTML = `<h1 id="title">${product.name}</h1>`;
    document.getElementById('description').innerHTML = `<p id="description">${product.description}</p>`;
    document.getElementById('price').innerHTML = `<span id="price">${product.price}</span>`;
    document.getElementsByClassName('item__img')[0].innerHTML = `<img src="${product.imageUrl}" alt="Photographie d'un canapé">`;
    document.getElementById('colors').innerHTML = `
        <select name="color-select" id="colors">
            <option value="">--SVP, choisissez une couleur --</option>
            ${product.colors.map(c => {
                    return `<option value="${c}">${c}</option>`;
                })}
        </select>`;
}

// function qui prend un produit en parametre et l'ajoute comme il faut
// dans le tableau de produits deja present
const addProductInList = (product, products) => {
    let index = products.findIndex(e => e.id === product.id && e.color === product.color);
    if (index != -1) {
        products[index] = {
            ...product,
            quantity: product.quantity + products[index].quantity,
        }
    } else {
        products.push(product);
    }

    return products;
}

// fonction ajoute un addEventListener sur le bouton qui sera declancher lorsque le user clique sur Ajouter au panier
// prend le produit en parametre, recupere le valeur dans le html et insert
// le produit final dans le tableau de produit qui se trouve dans le localstorage
const addOnClickPanier = (product) => {
    document.getElementById("addToCart").addEventListener("click", function () {
        const numberOfarticle = document.getElementById("quantity").value;
        const selectColor = document.getElementById("colors");
        const colorsOfArticle = selectColor.options[selectColor.selectedIndex].value;

            // nouvel article
            const newArticle = {
                id: product._id,
                price: product.price,
                name: product.name,
                url: product.imageUrl,
                color: colorsOfArticle,
                quantity: parseInt(numberOfarticle, 10),
            };

            let tabArticles = recupereProductsFromLS();
            tabArticles = addProductInList(newArticle, tabArticles)
            ajoutlesProductsToLS(tabArticles);
        });
}

const main = async () => {
    const product = await recupProduct(document.URL);
    
    InsertProductInHtml(product);
    addOnClickPanier(product);
}

main()
