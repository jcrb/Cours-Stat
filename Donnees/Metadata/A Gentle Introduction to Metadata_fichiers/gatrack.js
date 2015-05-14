// New asynchronous ga tracking code, replacing the old urchin.js.
//
// The original code can be found from the google analytics web site.
// - click "Analytics Settings"
// - locate website profile for www.l-a.org and click "Edit"
// - click "Check Status"
//
// To use, create the following <script> element as a subelement of the
// <head> element of the HTML page to be tracked.
//
//   <script type="text/javascript" src="/js/gatrack.js"> </script>
//

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-427085-3']);
_gaq.push(['_trackPageview']);

(function() {
    var ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    if (document.location.protocol == 'https:')
        ga.src = 'https://ssl.google-analytics.com/ga.js';
    else
        ga.src = 'http://www.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s); 
})();

