import { cart, loadFromStorage, updateDeliveryOptions } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { saveToStorage } from "../../data/cart.js";
import { getDeliveryOption, deliveryOptions } from "../../data/deliveryOptionData.js";
import { OrderSummary } from "./paymentSummary.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';


const CheckProductsContainer = document.querySelector('.products-checkout-section');


export function CheckoutProductDisplay() {
  OrderSummary()
  saveToStorage()
  loadFromStorage()
  let html = '';

cart.forEach((cartItem) =>  {
  const productId = cartItem.productId;
  const matchingItem =  getProduct(productId);
  const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId)
  const productQuantity = cartItem.quantity;
 
  const {id, name, image, keywords, priceCents, rating} = matchingItem;

  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
  const dateString = deliveryDate.format('dddd, MMMM D')
  const productPrice = ((cartItem.quantity *priceCents)/100).toFixed(2)
//console.log(name);
  html += `
  <article class="single-product-checkout js-single-product-checkout-${id}"
  >
  <h3 class="delivery-date">Delivery date: ${dateString}</h3>
  <div class="product-description-container">
   
      <img class="product-image" src="../${image}" alt="">

      <div class="product-desc">
        <h4 class="product-name">${name}</h5>
          <h4 class="product-price">$${productPrice}</h4>
          <p class="product-quantity">
            Quantity: <span class="product-quantity">${productQuantity}</span>
            &nbsp;
            <button class="product-update-btn js-update-product"
            data-id = "${id}"
            >update</button>

            <input class="update-quantity-input js-quantity-input-${id}"
            data-id = "${id}"
             type="number" placeholder="0">
            &nbsp;
            <button class="product-delete-btn js-delete-btn"
            data-id = "${id}"
            >delete</button>
          </p>
          <button class = "remove-container js-remove-container"
          data-id = "${id}"
          >remove all</button>
      </div>

      <div class="delivery-option-container">
        <h3 class="delivery-option-para">Choose a delivery option:</h3>

        ${deliveryOptionCheckout(matchingItem, cartItem)}
      </div>
  </div>
</article>
  `
 }) 

 CheckProductsContainer.innerHTML = html;

const updateValue = document.querySelectorAll('.js-update-product');

 // Add input part
updateValue.forEach( (value) =>{
  value.addEventListener('click', (e) =>{
    location.reload();
    const productId = e.currentTarget.dataset.id;
    console.log(productId);

    const inputAdded = document.querySelector(`.js-quantity-input-${productId}`);

    console.log(inputAdded);

    const quantity = parseInt(inputAdded.value);
    console.log(typeof quantity);
    console.log(!quantity);
    if (!quantity) {
      return
    }
   cart.forEach((items) => {
    
      if (items.productId === productId) {
        console.log(items.productId);
        items.quantity += quantity;
        console.log(cart);
        saveToStorage()
        loadFromStorage()
        location.reload();
      } 
      
   })
  
  })
})

 // delete quantity by 1

const inputDelete = document.querySelectorAll(`.js-delete-btn`);
//console.log(inputDelete);

inputDelete.forEach( (deleteQuantity) =>{
  deleteQuantity.addEventListener('click', (e) =>{
    const productId = e.currentTarget.dataset.id;
    console.log(productId);
   const containerRemove = document.querySelector(`.js-single-product-checkout-${productId}`);

   console.log(containerRemove);

    cart.forEach((items, index) => {

      if (items.productId === productId) {
        if(items.quantity === 1){
          cart.splice(index, 1)
          CheckoutProductDisplay()
        } 
      }
      
    
      if (items.productId === productId) {
        console.log(items.productId);
        items.quantity--;
        console.log(cart);
        saveToStorage()
        loadFromStorage()
        CheckoutProductDisplay()
      }  
      
   })

  })
})

// remove full container
document.querySelectorAll('.js-remove-container').forEach(component => {
  component.addEventListener('click', (e) =>{
     const productId = e.currentTarget.dataset.id;
   console.log(productId);
   
  cart.forEach( (items, index) =>{
    if (items.productId === productId) {
      
        cart.splice(index, 1)
      
    }
  })
  saveToStorage()
  console.log(cart);
  CheckoutProductDisplay()
  })
});

// delivery option

  function deliveryOptionCheckout(matchingProduct, cartItem) {
    let html = '';
 
    deliveryOptions.forEach((options) => {
      const {id, deliveryDays, priceCents} = options;
      const today = dayjs();
      const deliveryDate = today.add(deliveryDays, 'days');
      const dateString = deliveryDate.format('dddd, MMMM D')
      const priceString = priceCents === 0? 'FREE' : `$${priceCents/100}`;
      const isChecked = id === cartItem.deliveryOptionId;
     html += `
     
   <div class="shipping-container js-shipping-container"
   data-product-id = "${matchingProduct.id}"
    data-delivery-option-id = "${id}"
   >
     <input class="shipping-input" 
     type="radio" 
     name="shipping js-shipping-${matchingProduct.id}" 
     ${isChecked? 'checked' : ''}
     >
     <div class="shipping-date-charges">
       <h4 class="shipping-date">${dateString}</h4>
       <p class="shipping-charge">${priceString} Shipping</p>
     </div>
    </div>    
     `
    })
    return html;   
  }

  document.querySelectorAll('.js-shipping-container').forEach((element) =>{
    element.addEventListener('click', () => {
      const {productId, deliveryOptionId} = element.dataset;
      updateDeliveryOptions(productId, deliveryOptionId);
      CheckoutProductDisplay()
      console.log(cart);
    });
   });
}

