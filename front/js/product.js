
const currentUrl = new URL(document.URL)
const id = currentUrl.searchParams.get("id");
const product = fetch(`http://127.0.0.1:3000/api/products/${id}`)
    .then(function (response) {
        return response.json()
    })
    .then(function (content) {
        document.getElementById('title').innerHTML = `<h1 id="title">${content.name}</h1>`;
        document.getElementById('description').innerHTML = `<p id="description">${content.description}</p>`;
        document.getElementById('price').innerHTML = `<span id="price">${content.price}</span>`;
        document.getElementsByClassName('item__img')[0].innerHTML = `<img src="${content.imageUrl}" alt="Photographie d'un canapé">`;
        document.getElementById('colors').innerHTML = `
                    <select name="color-select" id="colors">
                        <option value="">--SVP, choisissez une couleur --</option>
                        ${content.colors.map(c => {
            return `<option value="${c}">${c}</option>`;
        })}
                    </select>`;
        document.getElementById("addToCart").addEventListener("click", function () {
            const numberOfarticle = document.getElementById("quantity").value;
            const selectColor = document.getElementById("colors");
            const colorsOfArticle = selectColor.options[selectColor.selectedIndex].value;

            // gerer cas d'erreurs
            if (Math.sign(numberOfarticle) <= 0) {

                document.getElementById('errorQuantity').innerHTML = `<h4 id="errorQuantity">Veuillez saisir une quantité</h4`
                return
            }
                // nouvel article
                const newArticle = {
                    id: content._id,
                    price: content.price,
                    name: content.name,
                    url: content.imageUrl,
                    color: colorsOfArticle,
                    quantity: parseInt(numberOfarticle, 10),
                };


                const stringTabArticles = localStorage.getItem('articles');
                let tabArticles = JSON.parse(stringTabArticles) || [];

                let index = tabArticles.findIndex(e => e.id === newArticle.id && e.color === newArticle.color);
                if (index != -1) {
                    tabArticles[index] = {
                        ...newArticle,
                        quantity: newArticle.quantity + tabArticles[index].quantity,
                    }
                } else {
                    tabArticles.push(newArticle);
                }

                console.log('mon panier: ', tabArticles);

                const stringNewArticles = JSON.stringify(tabArticles);
                localStorage.setItem("articles", stringNewArticles);
            });
    })




