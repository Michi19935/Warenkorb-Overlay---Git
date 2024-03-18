import AddtoOverlay from "./AddToOverlay.js";

const GetValuesRecommendations = () => {

    const titlesRecSelect = [...document.querySelectorAll('.product-wrapper h3 a')];
    const DeeplinkRecSelect = [...document.querySelectorAll('.product-wrapper h3 a')];
    const PriceRecSelect = [...document.querySelectorAll('.product-wrapper span.price')];
    const ImageRecSelect = [...document.querySelectorAll('.product-wrapper img.entered.lazyloaded')];
    //Add Product to "Recommendation-Section"
    AddtoOverlay(ImageRecSelect,PriceRecSelect,DeeplinkRecSelect,titlesRecSelect,'RecommendationItem');
}

export default GetValuesRecommendations