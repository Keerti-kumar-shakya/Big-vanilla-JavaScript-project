import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";


const orderSummaryContainer = document.querySelector('.products-order-summary-section');

console.log(orderSummaryContainer);


export function OrderSummary() {
  let html = '';
  let price = []
 
  cart.forEach((cartItem) =>  {
    const productId = cartItem.productId;
    const matchingItem = getProduct(productId)

    // total item
    const TotalCartQuantity = cart.reduce((initialQuantity, items) =>{
      return initialQuantity + items.quantity;
    }, 0)
    console.log(TotalCartQuantity);

    // total price
    const totalPrice = matchingItem.priceCents * cartItem.quantity;
    price.push(totalPrice);
    
    const priceDisplay = price.reduce((initialPrice, ItemsPrice) => initialPrice + ItemsPrice , 0)
   console.log(priceDisplay);
   html = `
   <h3 class="summary-para">Order Summary</h3>
 
           <div class="product-details-container">
 
             <div class="items-container">

               <p class="items-para">Items</p>
               <p class="items-price">$${(priceDisplay/100).toFixed(2)}</p>
 
             </div>
   
             <div class="shipping-handling-container">
               <p class="shipping-para">Shipping & handling:</p>
               <p class="shipping-price">$0.00</p>
             </div>
 
           </div>
 
           <div class="taxation-container">
 
             <div class="before-tax-container">
               <p class="before-tax-para">Total before tax:</p>
               <p class="before-tax-price">$0.00</p>
             </div>
 
             <div class="after-tax-container">
               <p class="after-tax-para">Estimated tax (10%):</p>
               <p class="after-tax-price">$0.00</p>
             </div>
           </div>
 
           <div class="order-total-container">
             <p class="order-total-para">Order total:</p>
             <p class="order-total-price">$194.55</p>
           </div>
 
           <button class="place-your-order-btn">place your order</button>
   `
   orderSummaryContainer.innerHTML = html;

    
  });

  

 
}

