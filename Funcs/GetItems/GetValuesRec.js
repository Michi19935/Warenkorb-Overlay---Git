import AddtoOverlay from "./AddToOverlay.js";

const GetValuesRecommendations = () => {

    //Remove Old RecItems - for example when new cart Item gets added and there are duplicates
    document.querySelectorAll('.RecItem').forEach(RecItem=>RecItem.remove());

    const titlesRecSelect = [...document.querySelectorAll('.product-wrapper h3 a')];
    const DeeplinkRecSelect = [...document.querySelectorAll('.product-wrapper h3 a')];
    const PriceRecSelect = [...document.querySelectorAll('.product-wrapper span.price')];
    const ImageRecSelect = [...document.querySelectorAll('.product-wrapper img.entered.lazyloaded')];
    const Product_id = [...document.querySelectorAll('h4')];
    //Add Product to "Recommendation-Section"
    AddtoOverlay(ImageRecSelect,PriceRecSelect,DeeplinkRecSelect,titlesRecSelect,'RecommendationItem',Product_id);
}

export default GetValuesRecommendations