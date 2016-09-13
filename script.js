
(function() {
    'use strict';
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '.custom-list-wrapper-width{width: 350px}';
    document.getElementsByTagName('head')[0].appendChild(style);
    $('.list-wrapper').addClass('custom-list-wrapper-width');
    //$('body').addClass('body-board-view body-custom-board-background body-custom-board-background-tiled body-dark-board-background');
    var bodyEl = document.getElementsByTagName('body')[0];
    //bodyEl.style.backgroundImage = 'url("https://d78fikflryjgj.cloudfront.net/images/backgrounds/c9f15836db29df79c2a0092a6758d81e/subtle-irongrip.png")';
    var obs = new MutationObserver(function(mutations, observer){

        function saveBackgroundDelayed(){
            //console.log('clicked !!!');
            setTimeout(function(){
                var obj = {};
                obj.classes = bodyEl.className;
                obj.style = bodyEl.style.cssText;
                saveObjectInLocalStorage('trelloTheme', obj);
            }, 500);
        }

        if( mutations[0].addedNodes.length || mutations[0].removedNodes.length ){
            $('.board-backgrounds-list').removeClass('disabled');
            $('.product-promo-button-overlay').remove();
            $('.board-background-select').off('click', saveBackgroundDelayed);
            $('.board-background-select').on('click', saveBackgroundDelayed);
        }
    });
    // have the observer observe foo for changes in children
    obs.observe( document.getElementsByClassName('board-menu-content')[0], { childList:true, subtree:true });

    var prefs = restoreObjectFromLocalStorage('trelloTheme');
    if(prefs){
        bodyEl.className = prefs.classes;
        bodyEl.style.cssText = prefs.style;
    }

    function saveObjectInLocalStorage(key, obj){
        localStorage.setItem(key, JSON.stringify(obj));
    }
    function restoreObjectFromLocalStorage(key){
        return JSON.parse(localStorage.getItem(key));
    }
})();