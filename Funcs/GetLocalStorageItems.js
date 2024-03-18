import Items from "./Items.js";

const GetLocalStorageItems = () => {
    let cart = JSON.parse(localStorage.getItem('cart'));
    if(cart != null){
        document.querySelectorAll('.BasketItem').forEach((e)=> {e.remove()});
        for (let i = 0; i < cart.length; i++){
            const itemsParam =  Items(cart[i].ImageSel, cart[i].TitleSel, cart[i].PriceSel, cart[i].DeeplinkSel,'BasketItem');
            itemsParam.classList = 'BasketItem';
        }
        document.querySelector('#basketCounter .amount').innerHTML = `${cart.length}`;
    } else {
        document.querySelectorAll('.BasketItem').forEach((e)=> {e.remove()});
    }
}

export default GetLocalStorageItems;