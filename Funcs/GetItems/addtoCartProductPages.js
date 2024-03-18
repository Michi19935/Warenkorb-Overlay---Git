import AddtoOverlay from "./AddToOverlay.js";

const addtoCartProductPages = () => {
    const addtoCartProductPages = document.querySelector('.single_add_to_cart_button');

    addtoCartProductPages.addEventListener('click', ()=>{
        const Selectoren = ['.wd-carousel-item a img','h1.product_title','p.price','.single_add_to_cart_button'];

        const PImage = document.querySelector(Selectoren[0]).src;
        const Title = document.querySelector(Selectoren[1]).innerText;
        const Price = document.querySelector(Selectoren[2]).innerText;
        const Id = document.querySelector(Selectoren[3]).getAttribute('value');
        const Deeplink = window.location.href;

    AddtoOverlay(PImage,Price,Deeplink,Title,'BasketItem',Id);
    });
}

export default addtoCartProductPages