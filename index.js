import BuildHTML from './Funcs/BuildHTML.js';
import addtoCartProductPages from './Funcs/GetItems/addtoCartProductPages.js';
import addtoCartAllOtherPages from './Funcs/GetItems/addtoCartAllOtherPages.js';
import GetValuesRecommendations from './Funcs/GetItems/GetValuesRec.js';
import GetLocalStorageItems from './Funcs/GetLocalStorageItems.js';
import RemoveItems from './Funcs/RemoveItems.js';
import SetTriggers from './Funcs/SetTriggers.js';

const PrepareOverlay = () => { 

    BuildHTML();
    GetLocalStorageItems();
    GetValuesRecommendations();

    if(window.location.href.includes('produkte')){
        addtoCartProductPages();
    } else if(window.location.href.includes('warenkorb')){
        RemoveItems();
    } else {
        addtoCartAllOtherPages();
    } 
    //Hide Overlay until it gets launched by SeTTriggers Func
    document.querySelector('#Parent').style.display = 'none';
    document.querySelector('#Background').style.display = 'none';
    //Launch Overlay when basket >= 1 and durtions since last shown >= 10 seconds
    SetTriggers();
}

PrepareOverlay();


//Adding File to Dev-Tools
const Overlay = document.createElement('script');
Overlay.src = 'https://michaelgruener.github.io/Warenkorb-Overlay---Git/index.js';
Overlay.type = 'module';
document.body.prepend(Overlay);

const RecTitles = [...document.querySelectorAll('#RecommendationItem .productTitle')].map((value)=>{return value.innerText});
const BasketTitles = [...document.querySelectorAll('#BasketItem .productTitle')].map((value)=>{return value.innerText});

DuplicateCheckArray = [];

for(let i=0; i < RecTitles; i++) {
    DuplicateCheck = RecTitles.filter((el)=>{return el == BasketTitles[i]});
    DuplicateCheckArray.push(DuplicateCheck0);
}

console.log(DuplicateCheckArray);



