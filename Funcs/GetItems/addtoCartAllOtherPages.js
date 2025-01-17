import AddtoOverlay from "./AddToOverlay.js";
import GetValuesRecommendations from "./GetValuesRec.js";

const addtoCartAllOtherPages = () => {

    document.body.addEventListener('click',(e)=>{

        if(e.target.classList[2] == 'add_to_cart_button'){

            const Product_id = e.target.getAttribute('data-product_id');

            const titlesSelect = document.querySelector(`[data-id="${Product_id}"] .product-wrapper h3 a`);
            const DeeplinkSelect = document.querySelector(`[data-id="${Product_id}"] .product-wrapper h3 a`);
            const PriceSelect = document.querySelector(`[data-id="${Product_id}"] .product-wrapper span.price`);
            const ImageSelect = document.querySelector(`[data-id="${Product_id}"] .product-wrapper img`);
    
            const PImage = ImageSelect.src;
            const Title = titlesSelect.innerText;
            const Price = PriceSelect.innerText;
            const Deeplink = DeeplinkSelect.href;

            //Add Product to "Warenkorb-Section"
            AddtoOverlay(PImage,Price,Deeplink,Title,'BasketItem',Product_id);
            GetValuesRecommendations();
        } 

    })
}

export default addtoCartAllOtherPages