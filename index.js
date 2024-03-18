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



