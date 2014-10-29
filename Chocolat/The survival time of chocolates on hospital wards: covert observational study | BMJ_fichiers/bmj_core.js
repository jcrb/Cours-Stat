/* To make the content box widget collapsable and expandable */
Drupal.behaviors.bmjBoxes = function() {
  //getBMJCookie('boxes');
  var cookie = $.cookie('bmj_boxes');

  if (cookie == null){
    cookie = 'services=collapse&alerts=collapse&citations=collapse&social=expand';
    $.cookie('bmj_boxes', cookie, {expires: 365, path: '/'});
  }
  var query = cookie ? cookie.split('&') : [];
  for (var i in query) {
    // Extra check to avoid js errors in Chrome, IE and Safari when
    // combined with JS like twitter's widget.js.
    // See http://drupal.org/node/798764.
    if (typeof(query[i]) == 'string' && query[i].indexOf('=') != -1) {
      var values = query[i].split('=');
      if (values.length === 2) {
        $("div.pane-bmj-article-side-links div#"+values[0]+" h4").addClass(values[1]);
      }
    }
  }

  //alert(cookie);
  $('#aside .content-box h4').css("cursor", "pointer")
  $('#aside .content-box h4.expand').siblings('ul').hide();
  $('#aside .content-box h4').click(function() {
    $(this).siblings("ul").toggle().siblings("h4").toggleClass("collapse").toggleClass("expand");

    var id = $(this).parent('div').attr('id');
    var cookie = $.cookie('bmj_boxes');
    var query = cookie ? cookie.split('&') : [];
    var query_aux = [];
    for (var i in query) {
      var values = query[i].split('=');
      if (values[0] == id)
        query_aux.push(id+'='+$(this).attr('class'));
      else
        query_aux.push(query[i]);
    }
    $.cookie('bmj_boxes', query_aux.join('&'), {expires: 365, path: '/'});
  });
}
