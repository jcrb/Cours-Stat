Drupal.behaviors.bmjChannel = function(){

var $element = $('#edit-search-text'),
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
  
  $('span.submit').click(function(){
    $(this).parents('form').submit();
    })
}