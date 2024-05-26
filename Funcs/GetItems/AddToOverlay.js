import {GetDeeplinksRec, GetTitlesRec, GetPriceRec, GetImagesRec, GetProductId} from './GetFuncs.js';
import Items from './Items.js';
import InsertRec from './InsertRec.js';

const AddtoOverlay = (ImageSel,PriceSel,DeeplinkSel,TitleSel,Type,IdSel) => {

    if (Type == 'RecommendationItem'){
        //Adding several items
        let Title = GetTitlesRec(TitleSel);
        console.log('Add to overlay', Title);
        //title is necessary to find alternative for lazy loaded images
        let PImage = GetImagesRec(ImageSel, Title);
        let Price = GetPriceRec(PriceSel);
        let Deeplink = GetDeeplinksRec(DeeplinkSel);
        let Id = GetProductId(IdSel);

        //Local Storage Items for Pages without Recommendations Section

        if(PImage[0]){
            let BasketPageRecItems = {Title,PImage,Price,Deeplink,Id};
            localStorage.setItem('RecItemsForBasket', JSON.stringify(BasketPageRecItems));
            
        } else if (PImage[0] == null && !window.location.href.includes('produkte')){

            let RecItemsForBasket = JSON.parse(localStorage.getItem('RecItemsForBasket'));
            Title = RecItemsForBasket.Title;
            PImage = RecItemsForBasket.PImage;
            Price = RecItemsForBasket.Price;
            Deeplink = RecItemsForBasket.Deeplink;
            Id = RecItemsForBasket.Id;
        }

        InsertRec(PImage, Price, Deeplink, Title, 'RecommendationItem', Id);
        //Hide Rec Elements per default
        document.querySelectorAll('.RecItem').forEach((el)=> {
            el.style.display = 'none';
        });

    } 
    
    if(Type == 'BasketItem') {
        
        //Store item in Local Storage and add them to overlay, after that's done

        console.log('basket id', IdSel)
        let cart = JSON.parse(localStorage.getItem('cart'));

        const product = {IdSel,TitleSel,DeeplinkSel,PriceSel,ImageSel}
        const StringifyedArray = JSON.stringify([product]);

        const CallItemsFunc = () => {
            const itemsParam = Items(ImageSel, TitleSel, PriceSel, DeeplinkSel,'BasketItem',IdSel);
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
            let DuplicateCheck = cart.filter(item => item.IdSel == IdSel);
            if(DuplicateCheck == 0){
                cart.push(product);
                localStorage.setItem('cart', JSON.stringify(cart));
                CallItemsFunc();
            }
        }   
    }

};

export default AddtoOverlay