
    const BuildHTML = () => {

        //Adding CSS file to DOM
        const CustomCSS = document.createElement('link');
        CustomCSS.rel = 'stylesheet';
        CustomCSS.href = 'https://michi19935.github.io/Warenkorb-Overlay---Git/improvedStyles.css';
        document.head.appendChild(CustomCSS);
        document.head.prepend(CustomCSS);

        //Adding JQuery to DOM
        const JQuery = document.createElement('script');
        JQuery.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js';
        document.head.appendChild(JQuery);

        //
        const Parent = document.createElement('div');
        Parent.id = 'parent';
        document.body.prepend(parent);

        const TopLayer = document.createElement('div');
        TopLayer.id = 'TopLayer';
        TopLayer.innerHTML = ` <a href="${window.location.href}"><button class="WeiterShoppen"> Weiter Shoppen </button></a> `;
        parent.appendChild(TopLayer);

        const BottomLayer = document.createElement('div');
        BottomLayer.id = 'BottomLayer';
        parent.appendChild(BottomLayer);

        const nav = document.createElement('nav');
        nav.innerHTML = `
        <ul>
            <span id="basket"><li class="Basket">Warenkorb</li><li id="basketCounter"><div class="amount">0</div></li></span>
            <span id="recommendations" class="inactive"><li class="Recommendations">Empfehlungen</li><li id="recommendationCounter"><div class="amount">0</div></li></span>
        </ul>
        `;
        BottomLayer.appendChild(nav);    

        //Adding div that contains all items - needed for scrollbar
        const ProductLayer = document.createElement('div');
        ProductLayer.id = 'ProductLayer'
        parent.appendChild(ProductLayer);    
        
        const CloseButton = document.createElement('button');
        CloseButton.id = 'CloseButton';
        CloseButton.textContent = 'X';
        parent.appendChild(CloseButton);
        
        BottomLayer.addEventListener('click', (e)=> {
            if(e.target.classList == 'Recommendations'){
                $('.RecItem').show('fast');
                $('.BasketItem').hide();
                $('#basket').addClass('inactive');
                $('#recommendations').removeClass('inactive');
            } else if (e.target.classList == 'Basket'){
                $('.RecItem').hide();
                $('.BasketItem').show('fast');
                $('#basket').removeClass('inactive');
                $('#recommendations').addClass('inactive');
            }
        });
    }

    const Items = (PImage,Title,Price,Deeplink,Type) => {
        const items = document.createElement('div');
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
                    <a href="${Deeplink}"> <button class="ZumProdukt noHover" id="ZumProdukt" > Zum Produkt </button></a>  
                    <a href="https://anicanis.de/warenkorb/"> <button class="JetztKaufen noHover" id="JetztKaufen"> Jetzt kaufen </button> </a> 
                </div>
            </div> 
        `;
        document.querySelector('#productlayer').appendChild(items);
        return items
    }

    const addtoCartProductPages = () => {
        const addtoCartProductPages = document.querySelector('.single_add_to_cart_button');

        addtoCartProductPages.addEventListener('click', (e)=>{
            const Selectoren = ['.wd-carousel-item a img','h1.product_title','p.price','.single_add_to_cart_button'];

            const PImage = document.querySelector(Selectoren[0]).src;
            const Title = document.querySelector(Selectoren[1]).innerText;
            const Price = document.querySelector(Selectoren[2]).innerText;
            const Id = document.querySelector(Selectoren[3]).getAttribute('value');
            const Deeplink = window.location.href;

        AddtoOverlay(PImage,Price,Deeplink,Title,'BasketItem',Id);
        });
    }

    const titlesSelect = [...document.querySelectorAll('.wd-entities-title a')];
    const titles = titlesSelect.map((title)=>{return title.innerText});

    //GetValues for Recommendations ProductPage

    //as the RecommendationImages are lazyloaded and can only be seen after viewing them,
    //the images need to get from another source. So I am matching the titles with an alternative source of images I found
    const alternativeImages = (titles) => {
        const ImageRecSelect = [...document.querySelectorAll('.swiper-slide-inner img')];
        const Images = ImageRecSelect.map((value)=>{return value.getAttribute('data-lazy-src')});
        const uniq = [...new Set(Images)];

        function filterItems(uniq, query) {
            return uniq.filter((el) => el.toLowerCase().includes(query.toLowerCase()));
        }

        const url1 = filterItems(uniq, titles[0].slice(0,6)); 
        const url2 = filterItems(uniq, titles[1].slice(0,6)); 
        const url3 = filterItems(uniq, titles[2].slice(0,6)); 
        const url4 = filterItems(uniq, titles[3].slice(0,6)); 
        const url5 = filterItems(uniq, titles[4].slice(0,6)); 
        const url6 = filterItems(uniq, titles[5].slice(0,6)); 
        const url7 = filterItems(uniq, titles[6].slice(0,6)); 
        const url8 = filterItems(uniq, titles[7].slice(0,6)); 
        const alternativeImages = [url1[0],url2[0],url3[0],url4[0],url5[0],url6[0],url7[0],url8[0]];
        return alternativeImages
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

    const addtoCartAllOtherPages = () => {

        const CartSelect = document.querySelectorAll('.add_to_cart_button');

        CartSelect.forEach((button, index)=> {
            button.id = (`eventListener ${index}`);
            button.addEventListener('click',()=>{
                const productID = button.getAttribute('data-product_id');
                const titlesSelect = document.querySelector(`[data-id="${productID}"] .product-wrapper h3 a`);
                const DeeplinkSelect = document.querySelector(`[data-id="${productID}"] .product-wrapper h3 a`);
                const PriceSelect = document.querySelector(`[data-id="${productID}"] .product-wrapper span.price`);
                const ImageSelect = document.querySelector(`[data-id="${productID}"] .product-wrapper img.entered.lazyloaded`);

                const PImage = ImageSelect.src;
                const Title = titlesSelect.innerText;
                const Price = PriceSelect.innerText;
                const Deeplink = DeeplinkSelect.href;
                
                //Add Product to "Warenkorb-Section"
                AddtoOverlay(PImage,Price,Deeplink,Title,'BasketItem',productID);
            })
        })
    }

    const GetValuesRec = () => {
    
        const titlesRecSelect = [...document.querySelectorAll('.product-wrapper h3 a')];
        const DeeplinkRecSelect = [...document.querySelectorAll('.product-wrapper h3 a')];
        const PriceRecSelect = [...document.querySelectorAll('.product-wrapper span.price')];
        const ImageRecSelect = [...document.querySelectorAll('.product-wrapper img.entered.lazyloaded')];
        //Add Product to "Recommendation-Section"
        AddtoOverlay(ImageRecSelect,PriceRecSelect,DeeplinkRecSelect,titlesRecSelect,'RecommendationItem');

    }

    const AddtoOverlay = (ImageSel,PriceSel,DeeplinkSel,TitleSel,Type,Id) => {

        if (Type == 'RecommendationItem'){
            //Adding several items
            const Title = GetTitlesRec(TitleSel);
            //title is necessary to find alternative for lazy loaded images
            const PImage = GetImagesRec(ImageSel, Title);
            const Price = GetPriceRec(PriceSel);
            const Deeplink = GetDeeplinksRec(DeeplinkSel);

            InsertRec(PImage, Price, Deeplink, Title, 'RecommendationItem');
            //Hide Rec Elements per default
            document.querySelectorAll('.RecItem').forEach((el)=> {
                el.style.display = 'none';
            })

        } else if(Type == 'BasketItem') {
            
            //Store item in Local Storage
                let cart = JSON.parse(localStorage.getItem('cart'));

                const product = {
                    Id,
                    TitleSel,
                    DeeplinkSel,
                    PriceSel,
                    ImageSel,
                }
                const StringifyedArray = JSON.stringify([product]);

                const CallItemsFunc = () => {
                    const itemsParam = Items(ImageSel, TitleSel, PriceSel, DeeplinkSel,'BasketItem');
                    itemsParam.classList = Type;
                    //Reevalute cart amount Increasing Basket Counter 
                    document.querySelector('#basketCounter .amount').innerHTML = `${cart.length}`;
                }

                if (cart == null){
                        //Wenn noch kein local storage object da ist, anlegen
                        localStorage.setItem('cart', StringifyedArray);
                        cart = [];
                        cart.push(product);
                        CallItemsFunc();
                } else {
                    //Checking if item is alreaday added to the cart
                    let DuplicateCheck = cart.filter(item => item.Id == Id);
                    if(DuplicateCheck == 0){
                        cart.push(product);
                        localStorage.setItem('cart', JSON.stringify(cart));
                        CallItemsFunc();
                    }
                }       

        }

    };

    const InsertRec = (ImageRec, PriceRec, DeeplinkRec, titlesRec, Type) => {
        let undefValues = 0;
            for(i=0; i <ImageRec.length; i++){
            if(ImageRec[i] == undefined){
                undefValues++;
                continue; 
            }
            const RecItemsParam = Items(ImageRec[i],titlesRec[i],PriceRec[i],DeeplinkRec[i],Type);
            RecItemsParam.classList = 'RecItem';
        }
        document.querySelector('#recommendationCounter .amount').innerHTML = `${(ImageRec.length - undefValues)}`; 
    }

    //Warenkorb Seite Remove Item & Restore Item

    if (window.location.href == 'https://anicanis.de/warenkorb/'){

        document.body.addEventListener('click', (e)=> {
            let cart = JSON.parse(localStorage.getItem('cart'));
            const product_id = e.target.getAttribute('data-product_id');
            let removedObj;

            if(e.target.classList == 'remove'){
                //Get id of product to be removed to delete it from local storage and save it in case they click on rückgänig
                removedObj = cart.filter(item => item.Id == product_id);
                localStorage.setItem('backupCart', JSON.stringify(removedObj[0]));
                let NewArrayWithoutProduct = cart.filter(item => item.Id != product_id);
                localStorage.setItem('cart', JSON.stringify(NewArrayWithoutProduct));
            } else if (e.target.classList == 'restore-item'){
                let backup = JSON.parse(localStorage.getItem('backupCart'));
                cart.push(backup);
                localStorage.setItem('cart', JSON.stringify(cart));
            }
        })
    }

    const GetLocalStorageItems = () => {
        let cart = JSON.parse(localStorage.getItem('cart'));
        if(cart != null){
            for (i = 0; i < cart.length; i++){
                const itemsParam =  Items(cart[i].ImageSel, cart[i].TitleSel, cart[i].PriceSel, cart[i].DeeplinkSel,'BasketItem');
                console.log(cart[i].DeeplinkSelect);
                itemsParam.classList = 'BasketItem';
            }
            document.querySelector('#basketCounter .amount').innerHTML = `${cart.length}`;
        }
    }


    //Close Overlay - hide overlay
    const killOverlay = () => {
        document.addEventListener('click', (e) => {
            if(e.target.id=='CloseButton'){
                $('#parent').hide('fast');
            }
        });
    }

    const launchOverlay = () => {

        BuildHTML();
        GetLocalStorageItems();
        killOverlay();

        if(window.location.href.includes('produkte')){
            addtoCartProductPages();
            GetValuesRec();
        } else {
            GetValuesRec();
            addtoCartAllOtherPages();
        }    
    }

    // Trigger Overlay
    document.onmouseleave = () => { 
        let Newtimestamp = new Date().getTime();
        //Read All Cookies from site and turn string into object and then search for OverlayViewed Cookie
        let OldTimestamp = JSON.parse(localStorage.getItem('OldTimestamp'));
        let DurationSinceLastViewed = new Date(Newtimestamp-OldTimestamp).getSeconds();
        //Store current timestamp in cookie
        localStorage.setItem('OldTimestamp', JSON.stringify(Newtimestamp));

        if(!OldTimestamp || DurationSinceLastViewed>=0){
            // Set internal cookie
            launchOverlay();
        }
    };
        
