

import BuildHTML from './Funcs/BuildHTML.js';

const Items = (PImage,Title,Price,Deeplink,Type) => {
    const items = document.createElement('div');
    items.classList = Type;
    //Backup fürs Erste
    items.id = Type;
    items.innerHTML =  `  
    
    <div class="productImage">
        <a href="${Deeplink}"><img src="${PImage}" alt="Exit Intent Overlay"></a>
        </div>
        <div class="productDetails">
            <div class="productTitle">${Title}</div>
            <div class="productPrice"><b>${Price}</b></div>
            <div class="CTAs">
                <a href="${Deeplink}"> <button class="ZumProdukt" id="ZumProdukt">Zum Produkt</button></a>  
                <a href="https://anicanis.de/warenkorb/"> <button class="JetztKaufen" id="JetztKaufen"> Jetzt kaufen </button> </a> 
            </div>
        </div> 
    `;
    document.querySelector('#ProductLayer').appendChild(items);
    return items
}

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

//GetValues for Recommendations ProductPage

//as the RecommendationImages are lazyloaded and can only be seen after viewing them,
//the images need to get from another source. So I am matching the titles with an alternative source of images I found
const alternativeImages = (titles) => {
    const ImageRecSelect = [...document.querySelectorAll('.swiper-slide-inner img')];
    const Images = ImageRecSelect.map((value)=>{return value.getAttribute('data-lazy-src')});
    const uniq = [...new Set(Images)];

    const urls = [];

    for(i=0; i<8; i++){
        let result = filterItems(uniq, titles[i].slice(0,6)); 
        urls.push(result[0]);
    }

    function filterItems(uniq, query) {
        return uniq.filter((el) => el.toLowerCase().includes(query.toLowerCase()));
    }

    return urls
}

const GetImagesRec = (ChromeNodes, titles) => {

    if(window.location.href.includes('produkte')){
        const imageUrls = alternativeImages(titles);
        return imageUrls
    };

    const array = ChromeNodes.map((value)=>{return value.getAttribute('src')});
    const filteredArray = array.filter((word) => (!word.includes('B02') && !word.includes('b02')));
    return filteredArray
}

const GetPriceRec = (ChromeNodes) => {
    const array = ChromeNodes.map((value)=>{return value.innerText});
    return array
}

const GetTitlesRec = (ChromeNodes) => {
    const array = ChromeNodes.map((value)=>{return value.innerText});
    //Limit array to four items so RecommendationCounter shows correct value
    return array
}

const GetDeeplinksRec = (ChromeNodes) => {
    const array = ChromeNodes.map((value)=>{return value.href});
    return array
}

const addtoCartAllOtherPages = () => {

    document.body.addEventListener('click',(e)=>{

        if(e.target.classList[2] == 'add_to_cart_button'){

            Product_id = e.target.getAttribute('data-product_id');

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

console.log('test',[...document.querySelectorAll('.product-wrapper img.entered.lazyloaded')]);

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
        for(i=0; i <ImageRec.length; i++){
        if(ImageRec[i] == undefined){
            undefValues++;
            continue; 
        }
        const RecItemsParam = Items(ImageRec[i],titlesRec[i],PriceRec[i],DeeplinkRec[i],Type);
        RecItemsParam.classList = 'RecItem';
    }
    document.querySelector('#recommendationCounter .amount').innerHTML = `${(ImageRec.length - undefValues)}`; 
}

const GetLocalStorageItems = () => {
    let cart = JSON.parse(localStorage.getItem('cart'));
    if(cart != null){
        document.querySelectorAll('.BasketItem').forEach((e)=> {e.remove()});
        for (i = 0; i < cart.length; i++){
            const itemsParam =  Items(cart[i].ImageSel, cart[i].TitleSel, cart[i].PriceSel, cart[i].DeeplinkSel,'BasketItem');
            itemsParam.classList = 'BasketItem';
        }
        document.querySelector('#basketCounter .amount').innerHTML = `${cart.length}`;
    } else {
        document.querySelectorAll('.BasketItem').forEach((e)=> {e.remove()});
    }
}

//Close Overlay - hide overlay
const CloseOverlay = () => {
    document.addEventListener('click', (e) => {
        if(e.target.id=='CloseButton'){
            $('#Parent').hide('fast');
        }

    });
}

//Warenkorb Seite Remove Item & Restore Item
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
            // Set internal cookie
                jQuery(($) => {
                    $('#Parent').show();
                }); 
        }
    };
}

LaunchOverlay();
        
