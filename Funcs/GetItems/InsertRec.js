import Items from "./Items.js";

const InsertRec = (ImageRec, PriceRec, DeeplinkRec, titlesRec, Type, Id) => {

        for(let i=0; i <=10; i++){

    //         //ignoring if item is are already in basket
        let BasketIDs = [...document.querySelectorAll('.BasketItem')];
        if(BasketIDs){
            let DuplicateValue = BasketIDs.filter(BasketID => BasketID.id == Id[i]);
                if(DuplicateValue[0]){
                    continue;
                }

        const RecItemsParam = Items(ImageRec[i],titlesRec[i],PriceRec[i],DeeplinkRec[i],Type,Id[i]);
        RecItemsParam.classList = 'RecItem';

    }
}
    document.querySelector('#recommendationCounter .amount').innerHTML = `${10}`; 
}

export default InsertRec