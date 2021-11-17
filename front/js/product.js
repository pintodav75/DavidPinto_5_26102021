const currentUrl = new URL(document.URL)
const id = currentUrl.searchParams.get("id");
const product = fetch(`http://127.0.0.1:3000/api/products/${id}`)
                .then(function(response){
                    return response.json()
                })
                .then(function(content) {
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
                    
                
                })

