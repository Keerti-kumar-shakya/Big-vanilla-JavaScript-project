import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { deliveryOptions } from "../../data/deliveryOptionData.js";
import moneyFormat from "../../utils/money.js";
import { addOrder } from "../order.js";

const orderSummaryContainer = document.querySelector('.products-order-summary-section');


export function OrderSummary() {
 
  let html = '';
  let price = 0;
  let shipping = 0;
 
  cart.forEach((cartItem) =>  {

    const productId = cartItem.productId;
    const matchingItem = getProduct(productId)

    // total item
    const TotalCartQuantity = cart.reduce((initialQuantity, items) =>{
      return initialQuantity + items.quantity;
    }, 0)

    document.querySelector('.js-checkout-total').innerHTML = TotalCartQuantity;
    // total price
  let  totalPrice = matchingItem.priceCents * cartItem.quantity;
  price += totalPrice;
    


   // shipping summary

    deliveryOptions.forEach((options) => {{
      if (options.id === cartItem.deliveryOptionId) {
        shipping += options.priceCents
      } 
   }})
   
 
      // total before tax
      const totalBeforeTax = price + shipping;
    

      // Estimated tax
      const estimatedTax = (totalBeforeTax*10/100)

      // Order total
      const orderTotal = totalBeforeTax + estimatedTax;

   html = `
   <h3 class="summary-para">Order Summary</h3>
 
           <div class="product-details-container">
 
             <div class="items-container">

               <p class="items-para">Items(${TotalCartQuantity})</p>
               <p class="items-price">$${moneyFormat(price)}</p>
 
             </div>
   
             <div class="shipping-handling-container">
               <p class="shipping-para">Shipping & handling:</p>
               <p class="shipping-price">$${moneyFormat(shipping)}</p>
             </div>
 
           </div>
 
           <div class="taxation-container">
 
             <div class="before-tax-container">
               <p class="before-tax-para">Total before tax:</p>
               <p class="before-tax-price">$${moneyFormat(totalBeforeTax)}</p>
             </div>
 
             <div class="after-tax-container">
               <p class="after-tax-para">Estimated tax (10%):</p>
               <p class="after-tax-price">$${moneyFormat(estimatedTax)}</p>
             </div>
           </div>
 
           <div class="order-total-container">
             <p class="order-total-para">Order total:</p>
             <p class="order-total-price">$${moneyFormat(orderTotal)}</p>
           </div>
 
           <button class="place-your-order-btn js-place-order">place your order</button>
   `
   orderSummaryContainer.innerHTML = html;


    let delivery = [];

    console.log(delivery);

    deliveryOptions.forEach((options) => {
      if (cart.deliveryOptionId == options.deliveryDays) {
        delivery = options.deliveryDays;
      }
    })

   document.querySelector('.js-place-order').addEventListener('click', async() =>{
    
    try {

      const response = await fetch('https://supersimplebackend.dev/orders' , {
        method: 'POST',
        headers:{
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          cart
        })
      });

      const order = await response.json();
      addOrder(order)
      
    } catch (error) {
      console.log('Unexpected error. Try again later.');
    }
     window.location.href = '/html-pages/order.html'; 
     
   })

  });
  

}
