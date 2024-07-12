import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";


const CheckProductsContainer = document.querySelector('.products-checkout-section');


export function CheckoutProductDisplay() {
  console.log(cart);
  let html = '';

  
cart.forEach((cartItem) =>  {

  const productId = cartItem.productId;
  const matchingItem =  getProduct(productId)

  const {id, name, image, keywords, priceCents, rating} = matchingItem;
//console.log(name);
  html += `
  <article class="single-product-checkout">
  <h3 class="delivery-date">Delivery date: Friday, july 19</h3>
  <div class="product-description-container">
   
      <img class="product-image" src="../${image}" alt="">

      <div class="product-desc">
        <h4 class="product-name">${name}</h5>
          <h4 class="product-price">$${(priceCents/100).toFixed(2)}</h4>
          <p class="product-quantity">
            Quantity: <span class="product-quantity">0</span>
            &nbsp;
            <button class="product-update-btn">update</button>
            <input class="update-quantity-input" type="number" placeholder="0">
            &nbsp;
            <button class="product-delete-btn">delete</button>
          </p>
      </div>

      <div class="delivery-option-container">
        <h3 class="delivery-option-para">Choose a delivery option:</h3>

        <div class="shipping-container">
          <input class="shipping-input" type="radio" name="shipping" id="">
          <div class="shipping-date-charges">
            <h4 class="shipping-date">Friday July 19</h4>
            <p class="shipping-charge">FREE Shipping</p>
          </div>
        </div>

        <div class="shipping-container">
          <input class="shipping-input" type="radio" name="shipping" id="">
          <div class="shipping-date-charges">
            <h4 class="shipping-date">Monday, July 15</h4>
            <p class="shipping-charge">$4.99 - Shipping</p>
          </div>
        </div>

        <div class="shipping-container">
          <input class="shipping-input" type="radio" name="shipping" id="">
          <div class="shipping-date-charges">
            <h4 class="shipping-date">Saturday July 13</h4>
            <p class="shipping-charge">$9.99 - Shipping</p>
          </div>
        </div>

      </div>
  </div>
</article>
  `
 }) 

 CheckProductsContainer.innerHTML = html;
}

