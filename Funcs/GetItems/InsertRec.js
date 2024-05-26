import Items from "./Items.js";

const InsertRec = (ImageRec, PriceRec, DeeplinkRec, titlesRec, Type, Id) => {

    
    let undefValues = 0;
        for(let i=0; i <ImageRec.length; i++){
        if(ImageRec[i] == undefined || ImageRec[i].includes('data:image/svg')){
            undefValues++;
            continue; 
            //Checking if item is already displayed in basket
        } else {

            //ignoring if item is are already in basket
            let BasketIDs = [...document.querySelectorAll('.BasketItem')];
            if(BasketIDs){
                let DuplicateValue = BasketIDs.filter(BasketID => BasketID.id == Id[i]);
                    if(DuplicateValue[0]){
                        undefValues++;
                        continue;
                    }
            }

            const RecItemsParam = Items(ImageRec[i],titlesRec[i],PriceRec[i],DeeplinkRec[i],Type,Id[i]);
            RecItemsParam.classList = 'RecItem';
        }

    }
    document.querySelector('#recommendationCounter .amount').innerHTML = `${(ImageRec.length - undefValues)}`; 
}

export default InsertRec