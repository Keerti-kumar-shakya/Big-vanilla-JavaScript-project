import { products } from "../data/products.js";

export let cart = [

    {
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
     
    }, {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      
    }
  
];
   

export function checkoutItems(productId) {
 
 //console.log(productId);
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

checkoutProducts(cart)
}



function checkoutProducts(cart) {
  let checkoutProduct = [];
//console.log(cart);

cart.forEach((items) => {
  products.forEach((product) => {

    if (items.productId === product.id) {
    
      checkoutProduct.push({
        product
      });
     
    }
  })
})
  //console.log(checkoutProduct);
  CheckoutProductDisplay(checkoutProduct)
}

function CheckoutProductDisplay(product) {
  let html = '';
  let displayData = [];

  if (product === undefined) {
    cart.forEach((items) => {
      products.forEach((product) => {
    
        if (items.productId === product.id) {
        
          displayData.push({
            product
          });
         
        }
      })
    })
  }
  else{
    displayData = product;
  }
  
  html +=
}

CheckoutProductDisplay()

