import {products} from '../data/products.js'
import { checkoutItems, saveToStorage } from '../data/cart.js';
import { cart } from '../data/cart.js';


const product_container = document.querySelector('.home-products-container');

productHomeDisplay()

function productHomeDisplay() {
  let html = '';

  products.forEach((product) => {
    const {id, name, image, rating, priceCents, keywords, sizeChartLink} = product;
  
    html += `
    <article class="home-single-product-container">
    <img class="image-products" src="${image}" alt="image-products">
    <div class="product-name">${name}</div>

    <div class="rating-count-container">
      <span class="rating">
        <img class="rating-img" src="./images/ratings/rating-${rating.stars*10}.png" alt="rating-img">
      </span>
      <span class="count">${rating.count}</span>
    </div>

    <div class="product-price">$${(priceCents/100).toFixed(2)}</div>

    <select class="cart-select-items">
      <option selected value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
      <option value="9">9</option>
      <option value="10">10</option>
    </select>

    
    <div class="size-chart">
      ${sizeChartLink? `<a href="${ sizeChartLink}" target="_blank">Size chart</a>` : ''}
    </div>
    
    <div class="cart-added js-cart-add-${id}">
      <span>
        <img class="checkmark-img" src="./images/icons/checkmark.png" alt="cart-checkmark-icon">
      </span>
      <span class="product-added-par">Added</span>
    </div>

    <button class="add-to-cart-btn js-add-to-cart-btn"
    data-id ="${id}"
    >add to cart</button>
  </article>

    `
  })
  product_container.innerHTML = html;


  const addToCart = document.querySelectorAll(`.js-add-to-cart-btn`);
  //console.log(addTOCart);

  addToCart.forEach(function (button) {
    //console.log(button);
    button.addEventListener('click', function () {

      const productId = button.dataset.id;
      //console.log(productId);
      checkoutItems(productId)

      const addedItem = document.querySelector(`.js-cart-add-${productId}`);
      //console.log(addedItem);

     let setPrevTime;

      clearTimeout(setPrevTime)
      addedItem.classList.add('cart-added-visible');
        setPrevTime = setTimeout(() => {
          addedItem.classList.remove('cart-added-visible');
        }, 2000); 
        
        updateCartQuantity()
    })
  })


  function updateCartQuantity() {
    const TotalCartQuantity = cart.reduce((initialQuantity, items) =>{
      return initialQuantity + items.quantity;
    }, 0)
  
    console.log(TotalCartQuantity);
   document.querySelector('.js-order-total').innerHTML = TotalCartQuantity;
   saveToStorage()

  }
  updateCartQuantity()
}





