
        const parent = document.createElement('div');
        parent.id = 'parent';
        document.body.prepend(parent);

        //Adding CSS file to DOM
        const CustomCSS = document.createElement('link');
        CustomCSS.rel = 'stylesheet';
        CustomCSS.href = 'https://michi19935.github.io/Warenkorb-Overlay---Git/improvedStyles.css';
        document.head.appendChild(CustomCSS);
        document.head.prepend(CustomCSS);

        const TopLayerImage = document.createElement('div');
        TopLayerImage.id = 'TopLayerImage';
        parent.appendChild(TopLayerImage);

        const BottomLayer = document.createElement('div');
        BottomLayer.id = 'BottomLayer';
        parent.appendChild(BottomLayer);

        const CloseButton = document.createElement('button');
        CloseButton.id = 'CloseButton';
        CloseButton.textContent = 'X';
        parent.appendChild(CloseButton);

        //Adding JQuery to DOM
        const JQuery = document.createElement('script');
        JQuery.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js';
        document.head.appendChild(JQuery);

        const nav = document.createElement('nav');
        nav.innerHTML = `
        <ul>
            <span id="basket"><li class="Basket">Warenkorb</li><li id="basketCounter"></li></span>
            <span id="recommendations" class="inactive"><li class="Recommendations">Empfehlungen</li><li id="recommendationCounter"></li></span>
        </ul>
        `;
        BottomLayer.appendChild(nav);    

        //Adding div that contains all items - needed for scrollbar
        const productLayer = document.createElement('div');
        productLayer.id = 'productlayer'
        parent.appendChild(productLayer);   
        
        const Items = (PImage,Title,Price,Deeplink,Type) => {
           const items = document.createElement('div');
           //Backup fürs Erste

           items.id = Type;
           items.innerHTML =  `  
            
            <div class="productImage">
                    <img src="${PImage}" alt="">
                </div>
                <div class="productDetails">
                    <div class="productTitle">${Title}</div>
                    <div class="productPrice"><b>${Price}</b></div>
                    <div class="CTAs">
                        <button class="ZumProdukt" id="ZumnProdukt"> <a href="${Deeplink}"> Zum Produkt </a>  </button>
                        <button class="JetztKaufen" id="JetztKaufen"> <a href="https://anicanis.de/warenkorb/"> Jetzt kaufen </a> </button>
                    </div>
                </div> 
            `;
            document.querySelector('#productlayer').appendChild(items);
            return items
        }

        // BottomLayer.appendChild(nav); 

        const GoogleFontsPoppins = document.createElement('div');
        GoogleFontsPoppins.innerHTML = `
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap" rel="stylesheet">`;
        document.head.appendChild(GoogleFontsPoppins);
  
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
                    const Deeplink = window.location.href;
                    
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

            } else if(Type == 'BasketItem') {
                
                //Adding only one item
                const itemsParam = Items(ImageSel,TitleSel,PriceSel,DeeplinkSel,'BasketItem');
                itemsParam.classList = Type;

                //Store item in Local Storage
                    let cart = JSON.parse(localStorage.getItem('cart'));

                    const product = {
                        Id,
                        TitleSel,
                        DeeplinkSel,
                        PriceSel,
                        ImageSel,
                    }

                    const StringifyedObject = JSON.stringify(product);
                    const StringifyedArray = JSON.stringify([product]);

                    let DuplicateCheck = [];

                    if (cart == null){
                        //Wenn noch kein local storage object da ist, anlegen
                        localStorage.setItem('cart', StringifyedArray);
                    } else {
                        // let cart = JSON.parse(localStorage.getItem('cart'));
                        //Checking if item is alreaday added to the cart
                        DuplicateCheck = cart.filter(item => item.Id != Id);
                        if(DuplicateCheck[0] != null){
                            DuplicateCheck.push(product);
                            localStorage.setItem('cart', JSON.stringify(DuplicateCheck));
                        }
                    }

                    //Increasing Basket Counter +1 
                    document.querySelector('#basketCounter').innerHTML = `<p>${cart.length+1}</p>`;

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
            document.querySelector('#recommendationCounter').innerHTML = `<p>${(ImageRec.length - undefValues)}</p>`;  
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
                        AddtoOverlay(cart[i].ImageSel,cart[i].PriceSel,cart[i].DeeplinkSelect,cart[i].TitleSel,'BasketItem',cart[i].Id);
                }
            }
            
        }


        BottomLayer.addEventListener('click', (e)=> {
            if(e.target.classList == 'Recommendations'){
                $('.RecItem').show();
                $('.BasketItem').hide();
                $('#basket').addClass('inactive');
                $('#recommendations').removeClass('inactive');
            } else if (e.target.classList == 'Basket'){
                $('.RecItem').hide();
                $('.BasketItem').show();
                $('#basket').removeClass('inactive');
                $('#recommendations').addClass('inactive');
            }
        });

        //Close Overlay - hide overlay
        document.addEventListener('click', (e) => {
            if(e.target.id=='CloseButton'){
                $(parent).hide();
            }
        })

        if(window.location.href.includes('produkte')){
            GetLocalStorageItems();
            addtoCartProductPages();
            GetValuesRec();
        } else {
            GetLocalStorageItems();
            GetValuesRec();
            addtoCartAllOtherPages();
        }
        
