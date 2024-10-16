function extractProductDetails(tab) {
  let productNameElement, productPriceElement, productImageElement;

  if (window.location.href.includes('croma.com')) {
      productNameElement = document.querySelector('.pd-title.pd-title-normal');
      productPriceElement = document.getElementById('pdp-product-price');
      productImageElement = document.getElementById('0prod_img');
  } else if (window.location.href.includes('flipkart.com')) {
      productNameElement = document.querySelector('._6EBuvT');
      productPriceElement = document.querySelector('.Nx9bqj.CxhGGd');
      productImageElement = document.querySelector('.DByuf4.IZexXJ.jLEJ7H');
  }else if(window.location.href.includes('amazon.in')){
    productNameElement = document.getElementById('productTitle');
    productPriceElement = document.querySelector('.a-offscreen');
    productImageElement = document.getElementById('landingImage');
  }

  const productName = productNameElement ? productNameElement.innerText : 'N/A';
  const productPrice = productPriceElement ? productPriceElement.innerText : 'N/A';
  const productImage = productImageElement ? productImageElement.src : '';

  console.log('Product Name:', productName);
  console.log('Product Price:', productPrice);
  console.log('Product Image:', productImage);

  return {
      name: productName,
      price: productPrice,
      image: productImage
  };
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getProductDetails") {
      const productDetails = extractProductDetails(sender.tab);
      sendResponse(productDetails);
  }
});

