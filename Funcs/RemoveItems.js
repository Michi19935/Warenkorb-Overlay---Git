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

        if(e.target.name == 'update_cart'){
            console.log('clicked on cart update button');
            //Get all cart items
            const amountNodes = [...document.querySelectorAll('.input-text.qty.text')];
            //Filter by value == 0
            const filteredNodes = amountNodes.filter(x => x.value == 0);

            const GetProductID = (x) => {
                return x.parentNode.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.querySelector('.remove').getAttribute('data-product_id')
            }   
            //Get PIDs from all that are now 0;
            const PIDs = filteredNodes.map((x)=>GetProductID(x));
            console.log('PIDs', PIDs);

            //Filter Array by PIDs
            let [...filtercart] = cart;
            console.log('newarrayfromcar initally',NewArrayWithoutProducts);
            for (let i = 0; i<PIDs.length; i++){
                filtercart = filtercart.filter(item => item.Id != PIDs[i]);
            }

            console.log('outside', filtercart);

            localStorage.setItem('cart', JSON.stringify(filtercart));
            //Remove Item from Overlay
            GetLocalStorageItems();
        }

    })
}
}

export default RemoveItems