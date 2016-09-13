
(function() {
    'use strict';
    
    // set column width to 350px, default value is too small
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '.custom-list-wrapper-width{width: 350px}';
    document.getElementsByTagName('head')[0].appendChild(style);
    $('.list-wrapper').addClass('custom-list-wrapper-width');
    
    var bodyEl = document.getElementsByTagName('body')[0];
    // set new observer to watch modifications on lateral menu 
    // its content is created when user opens it
    var obs = new MutationObserver(function(mutations, observer){

        function saveBackgroundDelayed(){
            setTimeout(function(){
                var obj = {};
                // selecting a background affects classes + background-image of the body tag
                // so we need to save both when we change the background
                obj.classes = bodyEl.className;
                obj.style = bodyEl.style.cssText;
                saveObjectInLocalStorage('trelloTheme', obj);
            }, 500); // wait a few milliseconds so the dom gets fully created
        }

        if( mutations[0].addedNodes.length || mutations[0].removedNodes.length ){
            // remove disabled class from locked backgrounds
            $('.board-backgrounds-list').removeClass('disabled');
            // remove the premium overlay
            $('.product-promo-button-overlay').remove();
            // add event listeners on every background div to save user preference to localstorage
            $('.board-background-select').off('click', saveBackgroundDelayed);
            $('.board-background-select').on('click', saveBackgroundDelayed);
        }
    });
    obs.observe( document.getElementsByClassName('board-menu-content')[0], { childList:true, subtree:true });
    
    // when script is called, load user preference from localstorage
    var prefs = restoreObjectFromLocalStorage('trelloTheme');
    if(prefs){
        // selecting a background affects classes + background-image of the body tag
        // so we need to restore both
        bodyEl.className = prefs.classes;
        bodyEl.style.cssText = prefs.style;
    }
    
    // utility functions
    function saveObjectInLocalStorage(key, obj){
        localStorage.setItem(key, JSON.stringify(obj));
    }
    function restoreObjectFromLocalStorage(key){
        return JSON.parse(localStorage.getItem(key));
    }
})();
