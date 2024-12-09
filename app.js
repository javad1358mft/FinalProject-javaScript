

const request = new XMLHttpRequest();
request.open('GET', 'https://fakestoreapi.com/products');
request.send();
request.addEventListener('load', getProducts);
const span = document.querySelector('span');
let All_Products = [];
const BASKET = [];
const input = document.querySelector('input');




function getProducts() {
    const data = JSON.parse(request.responseText);
    All_Products = data;
    render(All_Products);
}


function render(list) {
    const root = document.getElementById('root');
    const template = list.map((item) => {
        return `
        <div class='product'>
            <img src = '${item.image}'/>
            <h3>${item.title}</h3>
            <h5>category : ${item.category}</h5>
            <p>price :${item.price}$</p>

            ${BASKET.includes(item.id)
                ?
                `<button class='added' onclick='handleRemoveFromBasket(${item.id})'>Remove From Basket</button>`
                :
                `<button onclick='handleAddToBasket(${item.id})'>Add to Cart</button>`

            }
           
        </div>
        `
    });

    root.innerHTML = template.join("");
    span.textContent = BASKET.length;
}


function handleAddToBasket(productId) {
    BASKET.push(productId);
    render(All_Products);
}

function handleRemoveFromBasket(productId) {
    const index = BASKET.indexOf(productId);
    BASKET.splice(index, 1);
    render(All_Products);
}


function handleSearch(event) {
    const value = event.target.value;
    const result = All_Products.filter((product) => {
      return  product.title.search(value) >=0;
    });
    render(result);
}


//event//

input.addEventListener('keyup', handleSearch);