const Items = (PImage,Title,Price,Deeplink,Type) => {
    const items = document.createElement('div');
    items.classList = Type;
    //Backup fürs Erste
    items.id = Type;
    items.innerHTML =  `  
    
    <div class="productImage">
        <a href="${Deeplink}"><img src="${PImage}" alt="Exit Intent Overlay"></a>
        </div>
        <div class="productDetails">
            <div class="productTitle">${Title}</div>
            <div class="productPrice"><b>${Price}</b></div>
            <div class="CTAs">
                <a href="${Deeplink}"> <button class="ZumProdukt" id="ZumProdukt">Zum Produkt</button></a>  
                <a href="https://anicanis.de/warenkorb/"> <button class="JetztKaufen" id="JetztKaufen"> Jetzt kaufen </button> </a> 
            </div>
        </div> 
    `;
    document.querySelector('#ProductLayer').appendChild(items);
    return items
}

export default Items