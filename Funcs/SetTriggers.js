//This function is used to hide and show the overlay
const SetTriggers = () => {
    document.onmouseleave = () => { 
        let Newtimestamp = new Date().getTime();
        //Read All Cookies from site and turn string into object and then search for OverlayViewed Cookie
        let OldTimestamp = JSON.parse(localStorage.getItem('OldTimestamp'));
        let DurationSinceLastViewed = new Date(Newtimestamp-OldTimestamp).getSeconds();
        //Store current timestamp in cookie
        localStorage.setItem('OldTimestamp', JSON.stringify(Newtimestamp));

        let cart = JSON.parse(localStorage.getItem('cart'));
        if(cart == null){
            cart = [];
        }
    
        if(DurationSinceLastViewed>=0 && cart[0] != null){
            // Set internal cookie
                jQuery(($) => {
                    $('#Parent').show();
                    $('#Background').show();
                }); 
        }
    };
}

export default SetTriggers