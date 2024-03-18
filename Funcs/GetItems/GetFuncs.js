//GetValues for Recommendations ProductPage

//as the RecommendationImages are lazyloaded and can only be seen after viewing them,
//the images need to get from another source. So I am matching the titles with an alternative source of images I found
const alternativeImages = (titles) => {
    const ImageRecSelect = [...document.querySelectorAll('.swiper-slide-inner img')];
    const Images = ImageRecSelect.map((value)=>{return value.getAttribute('data-lazy-src')});
    const uniq = [...new Set(Images)];

    const urls = [];

    for(let i=0; i<8; i++){
        let result = filterItems(uniq, titles[i].slice(0,6)); 
        urls.push(result[0]);
    }

    function filterItems(uniq, query) {
        return uniq.filter((el) => el.toLowerCase().includes(query.toLowerCase()));
    }

    return urls
}

const GetImagesRec = (ChromeNodes, titles) => {

    if(window.location.href.includes('produkte')){
        const imageUrls = alternativeImages(titles);
        return imageUrls
    };

    const array = ChromeNodes.map((value)=>{return value.getAttribute('src')});
    const filteredArray = array.filter((word) => (!word.includes('B02') && !word.includes('b02')));
    return filteredArray
}

const GetPriceRec = (ChromeNodes) => {
    const array = ChromeNodes.map((value)=>{return value.innerText});
    return array
}

const GetTitlesRec = (ChromeNodes) => {
    const array = ChromeNodes.map((value)=>{return value.innerText});
    //Limit array to four items so RecommendationCounter shows correct value
    return array
}

const GetDeeplinksRec = (ChromeNodes) => {
    const array = ChromeNodes.map((value)=>{return value.href});
    return array
}

export {GetDeeplinksRec, GetTitlesRec, GetPriceRec, GetImagesRec, alternativeImages}