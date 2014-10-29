/* A function which open a pop-up window for OOP registration when the there is a refrence 'rel="external" with the A tag'  */
function popUp(){

    $('A[rel="external"]').click(function(){
        window.open($(this).attr('href'), '', 'status=yes,scrollbars=yes,resizable=yes,width=700,height=550');
        return false;
    });
}

$(function() {

/* AJAX tabbed widget fix to support BMJ design tabbed widget design */
$(".drupal-tabs ul.tabNav li.ui-tabs-selected a").addClass("active current");

$(".drupal-tabs ul.tabNav li a").click(function () {
	$(this).parent().siblings().children("a").removeClass("active current");
	$(this).addClass("active current");
  });



/* Make author affiliation list collapse */
$('.contributors .affiliation-list').wrap('<div class="author-affiliation"></div>');
$('.contributors .author-affiliation').prepend('<p class="affiliation-list-reveal">Author Affiliations</p>');
$('.contributors .author-affiliation p').css('color','#006990').css("cursor", "pointer");
$('.contributors .author-affiliation .affiliation-list').hide();
$('.contributors .author-affiliation p.affiliation-list-reveal').click(function() {
	$(this).siblings().toggle();
	});

/* Make topics collection pane on top of the article page work with a more and close link */
$('.more-topics p.show-topics').siblings().hide();
$('.more-topics p.show-topics');
$('.more-topics p.show-topics').click(function() {
	$(this).hide();
	$(this).siblings().toggle();
	});

$('.more-topics p.close-topics').click(function() {
	$(this).hide();
	$(this).siblings().toggle();
	});

popUp(); /* all A tags with a reference 'rel="external"' will be opened in a pop-up window */


/* To enable style switcher on article page, we need the following div to be injected by jQuery */
temp = '<div class="easy-read-controls"><ul><li class="first"><a onclick="setActiveStyleSheet(\'default\'); return false;" title="Close Easy Read" class="close" href="#"><span>Change style to default</span></a></li><li><a title="Decrease font size" class="decrease-font" href="#"><span>Decrease font size</span></a></li><li><a title="Increase font size" class="increase-font" href="#"><span>Increase font size</span></a></li><li><a title="Slimmer page" class="slimmer" href="#"><span>Slimmer page</span></a></li><li><a title="Wider page" class="wider" href="#"><span>Wider page</span></a></li><li class="last"><a title="Print page" class="print-page" onclick="window.print();return false" href="#"><span>Print</span></a></li></ul></div>';
$('.node-type-highwire-article').prepend(temp);

})

Drupal.behaviors.BmjSearch = function(){
  var $element = $('#edit-keywords'),
  value = $element.siblings('label').text();
  value = value.substr(0, value.search(':'));
  // Add focus/blur label behavior to search box.
  $element.bind('focus', function () {
    if ($element.val() === value) {
      $element.val('').addClass('has-value');
    }
  });
  $element.bind('blur', function () {
    if ($element.val() === '' || $element.val() === value) {
      $element.val(value).removeClass('has-value');
    }
    else {
      $element.addClass('has-value');
    }
  });
  $element.trigger('blur');

  $('#header-search span.submit').click(function(){
    $(this).parents('form').submit();
    })
}
