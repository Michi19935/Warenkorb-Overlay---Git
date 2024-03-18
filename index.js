import BuildHTML from './Funcs/BuildHTML.js';

import Items from './Funcs/Items.js';

import addtoCartProductPages from './Funcs/addtoCartProductPages.js';

import {GetDeeplinksRec, GetTitlesRec, GetPriceRec, GetImagesRec, alternativeImages} from './Funcs/GetFuncs.js'

const addtoCartAllOtherPages = () => {

    document.body.addEventListener('click',(e)=>{

        if(e.target.classList[2] == 'add_to_cart_button'){

            console.log(e.target.classList[2]);

            let Product_id = e.target.getAttribute('data-product_id');

            const titlesSelect = document.querySelector(`[data-id="${Product_id}"] .product-wrapper h3 a`);
            const DeeplinkSelect = document.querySelector(`[data-id="${Product_id}"] .product-wrapper h3 a`);
            const PriceSelect = document.querySelector(`[data-id="${Product_id}"] .product-wrapper span.price`);
            const ImageSelect = document.querySelector(`[data-id="${Product_id}"] .product-wrapper img.entered.lazyloaded`);
    
            const PImage = ImageSelect.src;
            const Title = titlesSelect.innerText;
            const Price = PriceSelect.innerText;
            const Deeplink = DeeplinkSelect.href;

            //Add Product to "Warenkorb-Section"
            AddtoOverlay(PImage,Price,Deeplink,Title,'BasketItem',Product_id);
        } 

    })
}

const GetValuesRec = () => {

    const titlesRecSelect = [...document.querySelectorAll('.product-wrapper h3 a')];
    const DeeplinkRecSelect = [...document.querySelectorAll('.product-wrapper h3 a')];
    const PriceRecSelect = [...document.querySelectorAll('.product-wrapper span.price')];
    const ImageRecSelect = [...document.querySelectorAll('.product-wrapper img.entered.lazyloaded')];

    //Add Product to "Recommendation-Section"
    console.log('pimagesSel Get Values',ImageRecSelect);
    console.log('pimagesSel Get Values',ImageRecSelect);
    AddtoOverlay(ImageRecSelect,PriceRecSelect,DeeplinkRecSelect,titlesRecSelect,'RecommendationItem');
}

const AddtoOverlay = (ImageSel,PriceSel,DeeplinkSel,TitleSel,Type,Id) => {

    if (Type == 'RecommendationItem'){
        console.log('pimagesSel AddtoOverlay',ImageSel);
        //Adding several items
        let Title = GetTitlesRec(TitleSel);
        //title is necessary to find alternative for lazy loaded images
        let PImage = GetImagesRec(ImageSel, Title);
        console.log('title AddtoOverlay',PImage);
        let Price = GetPriceRec(PriceSel);
        let Deeplink = GetDeeplinksRec(DeeplinkSel);

        //Local Storage Items for Basket Page

        if(PImage[0]){

            let BasketPageRecItems = {Title,PImage,Price,Deeplink};
            localStorage.setItem('RecItemsForBasket', JSON.stringify(BasketPageRecItems));
            
        } else if (PImage[0] == null){

            let RecItemsForBasket = JSON.parse(localStorage.getItem('RecItemsForBasket'));
            Title = RecItemsForBasket.Title;
            PImage = RecItemsForBasket.PImage;
            Price = RecItemsForBasket.Price;
            Deeplink = RecItemsForBasket.Deeplink;

        }
    
        InsertRec(PImage, Price, Deeplink, Title, 'RecommendationItem');
        //Hide Rec Elements per default
        document.querySelectorAll('.RecItem').forEach((el)=> {
            el.style.display = 'none';
        });

    } else if(Type == 'BasketItem') {
        
        //Store item in Local Storage and add them to overlay, after that's done
        let cart = JSON.parse(localStorage.getItem('cart'));

        const product = {Id,TitleSel,DeeplinkSel,PriceSel,ImageSel}
        const StringifyedArray = JSON.stringify([product]);

        const CallItemsFunc = () => {
            const itemsParam = Items(ImageSel, TitleSel, PriceSel, DeeplinkSel,'BasketItem');
            itemsParam.classList = Type;
            //Reevalute cart amount Increasing Basket Counter 
            document.querySelector('#basketCounter .amount').innerHTML = `${cart.length}`;
        }

        if (cart == null){
                //Wenn noch kein local storage object da ist, anlegen
                localStorage.setItem('cart', StringifyedArray);
                cart = [];
                cart.push(product);
                CallItemsFunc();
        } else {
            //Checking if item is alreaday added to the cart
            let DuplicateCheck = cart.filter(item => item.Id == Id);
            if(DuplicateCheck == 0){
                cart.push(product);
                localStorage.setItem('cart', JSON.stringify(cart));
                CallItemsFunc();
            }
        }   
    }

};

const InsertRec = (ImageRec, PriceRec, DeeplinkRec, titlesRec, Type) => {
    console.log('Rec Func,',ImageRec, PriceRec, DeeplinkRec, titlesRec, Type)
    let undefValues = 0;
        for(let i=0; i <ImageRec.length; i++){
        if(ImageRec[i] == undefined){
            undefValues++;
            continue; 
        }
        const RecItemsParam = Items(ImageRec[i],titlesRec[i],PriceRec[i],DeeplinkRec[i],Type);
        RecItemsParam.classList = 'RecItem';
    }
    document.querySelector('#recommendationCounter .amount').innerHTML = `${(ImageRec.length - undefValues)}`; 
}

import GetLocalStorageItems from './Funcs/GetLocalStorageItems.js';

//Close Overlay - hide overlay
const CloseOverlay = () => {
    document.addEventListener('click', (e) => {
        if(e.target.id=='CloseButton'){
            $('#Parent').hide('fast');
        }

    });
}

//Warenkorb Seite Remove Item & Restore Item
import RemoveItems from './Funcs/RemoveItems.js';

const PrepareOverlay = () => { 

    BuildHTML();
    GetLocalStorageItems();
    CloseOverlay();
    GetValuesRec();

    if(window.location.href.includes('produkte')){
        addtoCartProductPages();
    } else if(window.location.href.includes('warenkorb')){
        RemoveItems();
    } else {
        addtoCartAllOtherPages();
    } 

    //Hide Overlay until it gets triggered by MouseLeave Func
    document.querySelector('#Parent').style.display = 'none';
}

PrepareOverlay();

const LaunchOverlay = () => {
    document.onmouseleave = () => { 
        let Newtimestamp = new Date().getTime();
        //Read All Cookies from site and turn string into object and then search for OverlayViewed Cookie
        let OldTimestamp = JSON.parse(localStorage.getItem('OldTimestamp'));
        let DurationSinceLastViewed = new Date(Newtimestamp-OldTimestamp).getSeconds();
        //Store current timestamp in cookie
        localStorage.setItem('OldTimestamp', JSON.stringify(Newtimestamp));

        let cart = JSON.parse(localStorage.getItem('cart'));
        if(cart == null){
            cart = [];
        }
    
        if(DurationSinceLastViewed>=0 && cart[0] != null){
            console.log('launch please')
            // Set internal cookie
                jQuery(($) => {
                    $('#Parent').show();
                }); 
        }
    };
}

LaunchOverlay();
        
