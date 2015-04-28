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
        pageTitle = $('.page-title'),
        offset = 140;

    function findTitle(titles, top) {
        titles = titles.slice(0).reverse();

        for(var i = 0; i < titles.length; i++) {
            if(titles[i].offsetTop <= top + offset) {
                return titles[i];
            }
        }

        return null;
    }

    $('.doc-nav a').toArray()
        .map(function(e) {
            return $(e);
        })
        .filter(function($e) {
            return $e.attr('href');
        })
        .forEach(function($e) {
            $e.click(function(e) {
                e.preventDefault();

                var target = $e.attr('href');
                if(!target) {
                    console.log('no target!', $e)
                } else {
                    target = target.replace(/#/, '');
                    var te = document.getElementById(target),
                        top = te.offsetTop - offset;

                    window.scrollTo(0, top);
                }
                return false;
            });
    });

    window.addEventListener('optimizedScroll', function() {
        var top = window.scrollY,
            title = findTitle(titles, top);

        if(!title) return;

        pageTitle.text( $(title).text() );
    });
});