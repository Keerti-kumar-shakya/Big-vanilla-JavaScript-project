import { cart } from "../data/cart.js";
import { deliveryOptions } from "../data/deliveryOptionData.js";
import { products } from "../data/products.js";
import moneyFormat from "../utils/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

const newCart = JSON.parse(localStorage.getItem('newCart')) || [];

export const orders = JSON.parse(localStorage.getItem('orders')) || [ 
{id: "347f2a74-68ed-4ad3-a6a8-7327ea109b21",  
orderTime: "2024-08-23T06:52:41.602Z",
products: [{
estimatedDeliveryTime: "2024-08-30T06:52:41.600Z",
productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
quantity: 2,
variation:null}],
totalCostCents: 5251
}
];

document.addEventListener('DOMContentLoaded', () => {
  orderDetails();
});

export function addOrder(order) {

  orders.unshift(order);

  newCart.push(cart);
  localStorage.setItem('newCart', JSON.stringify(newCart));
  
  cart.splice(0, cart.length);
  localStorage.setItem('cart', JSON.stringify(cart));

  
  saveToStorage();
  console.log(order);
 
}

 function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));

}

export function orderDetails() {

  let html = '';

  //console.log(JSON.parse(orders));
  console.log(orders);

  orders.forEach((product)  => {

    const {id, orderTime, products, totalCostCents} = product;

    const today = dayjs(orderTime);
    //const OrderPlacedDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = today.format('MMMM D')

    html += `
    <div class="single-order-placed-container">

    <div class="order-date-total-order-id-container">

      <div class="order-placed-date">
        <div class="order-para">Order Placed:</div>
        <div class="order-date">${dateString}</div>
      </div>

      <div class="order-placed-total">
        <div class="total-para">Total:</div>
        <div class="order-price">$${moneyFormat(totalCostCents)}</div>
      </div>

      <div class="order-placed-id">
        <div class="total-para">Order ID:</div>
        <div class="order-id">${id}</div>
      </div>

    </div>
  

    <div class="order-product-arriving-tracking-container">
      <div class="tracking-placed-order-container">
        <div class="tracking-placed-single-order-container">
         ${orderProduct(products, orderTime)}
        </div>
      </div>
    </div>

  </div>
          `
  })
  
 document.querySelector('.order-placed-container').innerHTML = html;
}



function orderProduct(productOrder, orderTime) {

let html = '';

console.log(productOrder);

  

 const newOrders = productOrder.map((items) => {
  let orderValues = []
  products.map((product) => {
   if ( product.id === items.productId) {
    orderValues = product;
   }   
  })
  return orderValues
}) 
console.log(newOrders); 

  newOrders.forEach((items) => {
    productOrder.forEach((product) => {
      items.quantity = product.quantity;
     
    })
  });

  /**************** arriving date ********************/

  const newFlatCart = newCart.flat();
  
  console.log(newFlatCart);
  
  const deliveryDay = newFlatCart.map((items) => {
    let deliveryTime = []
    deliveryOptions.map((delivery) => {
      if (items.deliveryOptionId === delivery.id) {
        return deliveryTime =delivery.deliveryDays;      
      }
    })
    return deliveryTime;
  });
  
  console.log(deliveryDay);
  
  deliveryDay.map((days) => {
    newOrders.map((product) => {
      product.shippingDays = days;
    })
  })
  
  saveToStorage()

  newOrders.map((product) => {
    //const shippingTime = deliveryDay.map(num => num)
    
    const {id, image, name, rating, priceCents, keywords, quantity, shippingDays} = product;
    console.log(shippingDays);
    const today = dayjs(orderTime);
    const OrderPlacedDate = today.add(3, 'days');
    const dateString = OrderPlacedDate.format('MMMM D')
    console.log(image);
    html +=`
    <div class = "tracking-image-placed-order-btn-container">
    <div class = "tracking-image-placed-order">
    <img class="tracking-product-image" src="/${image}" alt="">
    
    <div class="tracking-placed-single-order-details-container">
    <div class="tracking-placed-order-product-name">${name}</div>
    <div class="tracking-arriving-date"><span>Arriving on: </span>${dateString}</div>
    <div class="tracking-arriving-quantity"><span>Quantity: ${quantity}</span></div>
    <button class="tracking-img-btn"> 
    <img class="track-img" src="../images/icons/buy-again.png" alt="">
    <span>Buy it again</span>
    </button>
    </div>
    </div>
    <button class="tracking-placed-order-button">track package</button>  
    </div>
    `
  });
  
  
  return html;
  
 }

