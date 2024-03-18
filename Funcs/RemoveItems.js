import GetLocalStorageItems from "./GetLocalStorageItems.js";

const RemoveItems = () => {

    if (window.location.href == 'https://anicanis.de/warenkorb/'){

    document.body.addEventListener('click', (e)=> {
        let cart = JSON.parse(localStorage.getItem('cart'));
        const product_id = e.target.getAttribute('data-product_id');
        let removedObj;

        if(e.target.classList == 'remove'){
            //Get id of product to be removed to delete it from local storage and save it in case they click on rückgänig
            removedObj = cart.filter(item => item.Id == product_id);
            localStorage.setItem('backupCart', JSON.stringify(removedObj[0]));
            let NewArrayWithoutProduct = cart.filter(item => item.Id != product_id);
            localStorage.setItem('cart', JSON.stringify(NewArrayWithoutProduct));
            //Remove Item from Overlay
            GetLocalStorageItems();
        } else if (e.target.classList == 'restore-item'){
            let backup = JSON.parse(localStorage.getItem('backupCart'));
            cart.push(backup);
            localStorage.setItem('cart', JSON.stringify(cart));
            //Add Item to Overlay
            GetLocalStorageItems();
        }
    })
}
}

export default RemoveItems