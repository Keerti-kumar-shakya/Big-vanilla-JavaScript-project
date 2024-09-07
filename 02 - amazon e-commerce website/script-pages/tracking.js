import { products } from "../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export function trackingId() {
  
  const ProductId = JSON.parse(localStorage.getItem('dataId'))
  
  console.log(ProductId);

  let html = '';

  const trackingProductDisplay = document.querySelector('.tracking-order-details');

  let trackingProducts = {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    image: "images/products/athletic-cotton-socks-6-pairs.jpg",
    name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
    rating: {
      stars: 4.5,
      count: 87
    },
    priceCents: 1090,
    keywords: [
      "socks",
      "sports",
      "apparel"
    ]
  }

  products.forEach((items) => {
    if (items.id === ProductId) {
      trackingProducts = items;
    }
  })

  console.log(trackingProducts);

  let productDate = {orderTime: '2024-08-27T05:34:04.006Z'};

  const date = JSON.parse(localStorage.getItem('orders'))

  console.log(date);

  date.forEach((productId) => {
  if (productId.id === trackingProducts.id) {
    productDate.orderTime = productId.orderTime;
  }
  })

  console.log(productDate);

  const today = dayjs(productDate.orderTime);
  const dateString = today.format('MMMM D');

  const {id, image, name, rating, priceCents, keywords} = trackingProducts;
  
  html = `
  <div class="tracking-date">Arriving on ${dateString}</div>
            <p class="tracking-product-details">${name}</p>
            <div class="tracking-quantity">
              <span>Quantity: </span>
            </div>
            <img class="tracking-product-img" src="../${image}" alt="${name}">
          </div>

          <div class="tracking-shipping-delivered-container">
            <p class="tracking-preparing">preparing</p>
            <p class="tracking-shipped">shipped</p>
            <p class="tracking-delivered">delivered</p>
          </div>

          <div class="tracking-filter">
            <div class="tracking-filter-shipped"></div>
  `
  trackingProductDisplay.innerHTML = html;
}


trackingId()
