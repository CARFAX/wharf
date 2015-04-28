document.addEventListener('DOMContentLoaded', function() {
    (function() {
        var throttle = function(type, name, obj) {
            var obj = obj || window;
            var running = false;
            var func = function() {
                if (running) { return; }
                running = true;
                requestAnimationFrame(function() {
                    obj.dispatchEvent(new CustomEvent(name));
                    running = false;
                });
            };
            obj.addEventListener(type, func);
        };

        /* init - you can init any event */
        throttle ('scroll', 'optimizedScroll');
    })();

    var titles = $('.object-header'),
        pageTitle = $('.page-title');

    function findTitle(titles, top) {
        titles = titles.slice(0).reverse();
        var offset = 140;

        for(var i = 0; i < titles.length; i++) {
            if(titles[i].offsetTop <= top + offset) {
                return titles[i];
            }
        }

        return null;
    }

    window.addEventListener('optimizedScroll', function() {
        var top = window.scrollY,
            title = findTitle(titles, top);

        if(!title) return;

        pageTitle.text( $(title).text() );
    });
});