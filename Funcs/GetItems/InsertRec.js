import Items from "./Items.js";

const InsertRec = (ImageRec, PriceRec, DeeplinkRec, titlesRec, Type) => {
    let cart = JSON.parse(localStorage.getItem('cart'));
    if(cart == null){cart = []}
    let undefValues = 0;

        for(let i=0; i <ImageRec.length; i++){
            let DuplicateProdut = cart.filter((el)=>{return el.ImageSel == ImageRec[i]});
            console.log(ImageRec[i]);
        if(ImageRec[i] == undefined){
            undefValues++;
            continue; 
            //Checking if item is already displayed in basket
        } else if(DuplicateProdut.length != 0){

            continue; 
        } else {
            const RecItemsParam = Items(ImageRec[i],titlesRec[i],PriceRec[i],DeeplinkRec[i],Type);
            RecItemsParam.classList = 'RecItem';
            console.log('Hallo');
        }

    }
    document.querySelector('#recommendationCounter .amount').innerHTML = `${(ImageRec.length - undefValues)}`; 
}

export default InsertRec