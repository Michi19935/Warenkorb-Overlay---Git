import Items from "./Items.js";

const InsertRec = (ImageRec, PriceRec, DeeplinkRec, titlesRec, Type) => {

    
    let undefValues = 0;

        for(let i=0; i <ImageRec.length; i++){
        if(ImageRec[i] == undefined){
            undefValues++;
            continue; 
            //Checking if item is already displayed in basket
        } else {
            const RecItemsParam = Items(ImageRec[i],titlesRec[i],PriceRec[i],DeeplinkRec[i],Type);
            RecItemsParam.classList = 'RecItem';
        }

    }
    document.querySelector('#recommendationCounter .amount').innerHTML = `${(ImageRec.length - undefValues)}`; 
}

export default InsertRec