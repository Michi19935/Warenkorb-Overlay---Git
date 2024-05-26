import Items from "./Items.js";

const InsertRec = (ImageRec, PriceRec, DeeplinkRec, titlesRec, Type, Id) => {

    let itemamount = 0;

        for(let i=0; i <10; i++){

            //ignoring if item is are already in basket
        let BasketIDs = [...document.querySelectorAll('.BasketItem')];
        if(BasketIDs){
            let DuplicateValue = BasketIDs.filter(BasketID => BasketID.id == Id[i]);
                if(DuplicateValue[0]){
                    continue;
                }
        if(ImageRec[i] != undefined && (!ImageRec[i].includes('data') && titlesRec[i] != undefined)){
            const RecItemsParam = Items(ImageRec[i],titlesRec[i],PriceRec[i],DeeplinkRec[i],Type,Id[i]);
            RecItemsParam.classList = 'RecItem';
            itemamount++;
        }

    }
}
    document.querySelector('#recommendationCounter .amount').innerHTML = `${itemamount}`; 
}

export default InsertRec