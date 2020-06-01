// @ts-ignore
const $gridContainer = document.getElementById('grid');
// @ts-ignore
const $cartHeader = document.getElementById('cart');
// @ts-ignore
const $itemsListModal = document.getElementById('items-list-toast');
// @ts-ignore
const cart = document.createElement('h5');


var data = [
    { title: 'Benjerry', img: 'https://www.lasirena.es/37602/tarrina-benjerry-s-chunky-monkey.jpg', price: 5.95, qtty: 0, id: 0 },
    { title: 'Caffelatte', img: 'https://a2.soysuper.com/5ec45878c57c2172b7e99c84fdf938ff.1024.0.0.0.wmark.68b18c8e.jpg', price: 1.27, qtty: 0, id: 1 },
    { title: 'Calippo', img: 'https://www.lasirena.es/5481/calippo-lima-limon-frigo.jpg', price: 4.10, qtty: 0, id: 2 },
    { title: 'Evax', img: 'https://maspanales.es/4163-large_default/compresas-evax-cottonlike-alas-normal-16-uds.jpg', price: 2.40, qtty: 0, id: 3 },
    { title: 'Pizza', img: 'https://como-contactar.com/wp-content/uploads/2017/12/Dr.-Oetker-1.jpg', price: 4.95, qtty: 0, id: 4 },
    { title: 'Scottex', img: 'https://images-na.ssl-images-amazon.com/images/I/81UfcNiTRTL._AC_SL1500_.jpg', price: 4.50, qtty: 0, id: 5 },
    { title: 'Spaghetti', img: 'https://jumbocolombiafood.vteximg.com.br/arquivos/ids/3486173-750-750/8076800195057.jpg?v=637183430225000000', price: 1.25, qtty: 0, id: 6 },
    { title: 'Triangulos', img: 'https://static.condisline.com/resize_395x416/images/catalog/large/121822.jpg', price: 2.35, qtty: 0, id: 7 },
    { title: 'Xibeca', img: 'https://www.caprabo.ad/server/Portal_0022444/img/products/xibeca-cervesa-llauna-33cl_5697359.jpg', price: 3.75, qtty: 0, id: 8 },
    { title: 'ChipsAhoy', img: 'https://www.supermercadosmas.com/media/catalog/product/cache/e4d64343b1bc593f1c5348fe05efa4a6/i/m/import_aecoc_images_08410000001013_08410000001013_c1r1_131.jpg', price: 2.20, qtty: 0, id: 9 }
];

// @ts-ignore
var cartProducts = [];
var totalPriceCart = 0;

// @ts-ignore
function addItem(item) {
    let itemId = item.target.id.replace('card-add-', '');
    // @ts-ignore
    let product = data.find((prod) => prod.id == Number(itemId));
    console.log(product);
    // @ts-ignore
    cartProducts.push(product.id);
    // @ts-ignore
    totalPriceCart += product.price;
    render_cart_header();

    data.map((prod) => {
        if (prod.id == Number(itemId)) {
            prod.qtty++;
        }
    });
    render_quantity_items(itemId);
    render_modal_bottom_cart();
}
// @ts-ignore
function removeItem(item) {
    let itemId = item.target.id.replace('card-remove-', '');
    // @ts-ignore
    if (cartProducts.indexOf(Number(itemId)) != -1) {
        // @ts-ignore
        let product = data.find((prod) => prod.id == Number(itemId));
        console.log(product);
        // @ts-ignore
        cartProducts.splice(cartProducts.indexOf(Number(itemId)), 1);

        // @ts-ignore
        totalPriceCart -= product.price;
        render_cart_header();

        data.map((prod) => {
            if (prod.id == Number(itemId)) {
                prod.qtty--;
            }
        });
        render_quantity_items(itemId);
        render_modal_bottom_cart();
        return;
    }
    console.log('Product not added to the cart yet.');
}

// @ts-ignore
function render_quantity_items(id) {
    let product = data.find((item) => item.id == id);
    // @ts-ignore
    let item = document.getElementById(`item-qtty-${id}`);
    // @ts-ignore
    item.innerHTML = `QUANTITY: ${product.qtty} u.`;
}

function render_modal_bottom_cart() {
    $itemsListModal.innerHTML = '';
    // @ts-ignore
    let unList = document.createElement('ul');
    // @ts-ignore
    for (let items of data) {
        // @ts-ignore
        let itemList = document.createElement('h6');
        if (items.qtty > 0) {
            if (items.qtty > 1) {
                itemList.innerHTML = `${items.title} | ${items.price}$ x ${items.qtty}u. `;
            } else {
                itemList.innerHTML = `${items.title} | ${items.price}$`;
            }
        } else {
            itemList.innerHTML = '';
        }
        unList.appendChild(itemList);
    }
    $itemsListModal.appendChild(unList);
}


function render_cart_header() {
    cart.innerHTML = `PRODUCTS: ${cartProducts.length} | PRICE: ${Number(totalPriceCart.toFixed(2)) > 0 ? totalPriceCart.toFixed(2) : 0}$`;
    $cartHeader.appendChild(cart);
}

function render_list_of_items() {
    for (let item of data) {
        // @ts-ignore
        let card = document.createElement('div');
        card.setAttribute('class', 'card mb-3');
        card.innerHTML = `<h3 class="card-header">${item.title}</h3>
        <div class="card-body">
          <h5 class="card-title">Special Subtitle treatment</h5>
        </div>
        <img
          style="height: 200px; width: 70%; display: block;"
          src="${item.img}"
          alt="Card image"
        />
        <div class="card-body">
          <p class="card-text">
            Some quick example text to build on the card title and make up the bulk of the card's
            content.
          </p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">PRICE: ${item.price}$</li>
          <li class="list-group-item" id="item-qtty-${item.id}">QUANTITY: ${item.qtty} u.</li>
        </ul>
        <div class="card-body">
          <button id="card-add-${item.id}" type="button" class="btn btn-success">ADD</button>
          <button id="card-remove-${item.id}" type="button" class="btn btn-warning">REMOVE</button>
        </div>
        <div class="card-footer text-muted">`;

        $gridContainer.appendChild(card);
        // @ts-ignore
        document.getElementById(`card-add-${item.id}`).addEventListener('click', addItem);
        // @ts-ignore
        document.getElementById(`card-remove-${item.id}`).addEventListener('click', removeItem);
    }
}

render_list_of_items();
render_cart_header();