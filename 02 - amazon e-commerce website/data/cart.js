import { CheckoutProductDisplay } from "../script-pages/checkout/orderSummary.js";

export let cart;

loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart')) || [
    {
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1'
    }, {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '2'
    }
  ];
}


export function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}


  export function checkoutItems(productId) {

    let matchingItem;
    
    cart.forEach((cartItem) => {
    
      if (cartItem.productId === productId) {
        matchingItem = cartItem
        //console.log(matchingItem);
      }
    }) 
    
      if (matchingItem) {
        matchingItem.quantity++;
      }else{
        cart.push({
          productId:productId,
          quantity: 1
        })
      }  
      saveToStorage()
    }






  
   



