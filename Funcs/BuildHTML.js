const BuildHTML = () => {

    //Adding CSS file to DOM
    const CustomCSS = document.createElement('link');
    CustomCSS.rel = 'stylesheet';
    CustomCSS.href = 'https://michi19935.github.io/Warenkorb-Overlay---Git/improvedStyles.css';
    document.head.appendChild(CustomCSS);

    //Adding JQuery to DOM
    const JQuery = document.createElement('script');
    JQuery.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js';
    document.head.appendChild(JQuery);

    const Parent = document.createElement('div');
    Parent.id = 'Parent';
    document.body.prepend(Parent);

    const TopLayer = document.createElement('div');
    TopLayer.id = 'TopLayer';
    TopLayer.innerHTML = ` <a href="${window.location.href}"><button class="WeiterShoppen"> Weiter Shoppen </button></a> `;
    Parent.appendChild(TopLayer);

    const BottomLayer = document.createElement('div');
    BottomLayer.id = 'BottomLayer';
    Parent.appendChild(BottomLayer);

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
    ProductLayer.id = 'ProductLayer';
    Parent.appendChild(ProductLayer);
    
    const CloseButton = document.createElement('button');
    CloseButton.id = 'CloseButton';
    CloseButton.textContent = 'X';
    Parent.appendChild(CloseButton);
    
    BottomLayer.addEventListener('click', (e)=> {
        jQuery(($) => {
            if(e.target.id == 'recommendations' || e.target.classList == 'Recommendations' || e.target.classList == 'amount'){
                $('.RecItem').show('fast');
                $('.BasketItem').hide();
                $('#basket').addClass('inactive');
                $('#recommendations').removeClass('inactive');
            } else if (e.target.id == 'basket' || e.target.classList == 'Basket' || e.target.classList == 'amount'){
                $('.RecItem').hide();
                $('.BasketItem').show('fast');
                $('#basket').removeClass('inactive');
                $('#recommendations').addClass('inactive');
            }
        }); 
    });

    //Close Overlay - hide overlay
    const CloseOverlay = () => {
        document.addEventListener('click', (e) => {
            if(e.target.id=='CloseButton'){
                $('#Parent').hide('fast');
            }

        });
    }
}

export default BuildHTML;