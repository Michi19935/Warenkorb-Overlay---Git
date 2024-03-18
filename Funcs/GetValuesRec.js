import AddtoOverlay from "./AddToOverlay.js";

const GetValuesRec = () => {

    const titlesRecSelect = [...document.querySelectorAll('.product-wrapper h3 a')];
    const DeeplinkRecSelect = [...document.querySelectorAll('.product-wrapper h3 a')];
    const PriceRecSelect = [...document.querySelectorAll('.product-wrapper span.price')];
    const ImageRecSelect = [...document.querySelectorAll('.product-wrapper img.entered.lazyloaded')];

    //Add Product to "Recommendation-Section"
    console.log('pimagesSel Get Values',ImageRecSelect);
    console.log('pimagesSel Get Values',ImageRecSelect);
    AddtoOverlay(ImageRecSelect,PriceRecSelect,DeeplinkRecSelect,titlesRecSelect,'RecommendationItem');
}

export default GetValuesRec