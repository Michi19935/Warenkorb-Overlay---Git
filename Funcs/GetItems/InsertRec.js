import Items from "./Items.js";

const InsertRec = (ImageRec, PriceRec, DeeplinkRec, titlesRec, Type, Id) => {

    let itemamount = 10;

        for(let i=0; i <10; i++){

            //ignoring if item is are already in basket
        let BasketIDs = [...document.querySelectorAll('.BasketItem')];
        if(BasketIDs){
            let DuplicateValue = BasketIDs.filter(BasketID => BasketID.id == Id[i]);
                if(DuplicateValue[0]){
                    itemamount -= 1;
                    continue;
                }
        if(ImageRec[i] != undefined){
            const RecItemsParam = Items(ImageRec[i],titlesRec[i],PriceRec[i],DeeplinkRec[i],Type,Id[i]);
            RecItemsParam.classList = 'RecItem';
            itemamount -= 1;
        }

    }
}
    document.querySelector('#recommendationCounter .amount').innerHTML = `${itemamount}`; 
}

export default InsertRec