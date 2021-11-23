
const currentUrl = new URL(document.URL)
const id = currentUrl.searchParams.get("id");
const product = fetch(`http://127.0.0.1:3000/api/products/${id}`)
    .then(function (response) {
        return response.json()
    })
    .then(function (content) {
        console.log(content);
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
                    </select>
                    `;
        // maintenant on recupere au moment du "valid Panier" les informations
        // sur l articler a ajouter au panier qui est dans notre localStorage
        document.getElementById("addToCart").addEventListener("click", function() {
            const numberOfarticle = document.getElementById("quantity").value;
            const selectColor = document.getElementById("colors");
            const colorsOfArticle = selectColor.options[selectColor.selectedIndex].value;

            // handle error case here

        
            console.log('Color: ', colorsOfArticle);
            console.log('quantity: ', numberOfarticle);
            console.log('id: ', id);

            const currentTab = localStorage.getItem("tab");

            const currentObject = JSON.parse(currentTab) || [];

            const newOject = {
                id: id,
                title: content.name,
                price: content.price,
                color: colorsOfArticle,
                quantity: numberOfarticle,
            };

            

            const strTab = JSON.stringify(tab);

            // save article in localstorage
            localStorage.setItem("tab", strTab)

            //  cart.js
            // const tabRes = localStorage.getItem("tab");
            // const resObject = JSON.parse(tabRes);
            // console.log(resObject);
        });
    })



