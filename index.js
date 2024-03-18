import BuildHTML from './Funcs/BuildHTML.js';

import Items from './Funcs/Items.js';

import addtoCartProductPages from './Funcs/addtoCartProductPages.js';

import {GetDeeplinksRec, GetTitlesRec, GetPriceRec, GetImagesRec, alternativeImages} from './Funcs/GetFuncs.js';

import addtoCartAllOtherPages from './Funcs/addtoCartAllOtherPages.js';

import GetValuesRec from './Funcs/GetValuesRec.js';

import AddtoOverlay from './Funcs/AddToOverlay.js';

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
        
