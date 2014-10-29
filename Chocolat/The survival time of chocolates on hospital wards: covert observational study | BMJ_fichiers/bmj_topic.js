//
//
Drupal.behaviors.bmj_topic_dropdownInit = function (context) {

  Drupal.bmj_topic_dropdown = {

    toggleActiveClass: function() {
      var topic_dropdown_button = $('#topics-dropdown-open');
      var dropdown = $('#topic-list-dropdown');

      if (dropdown.css('display') == 'block') {
        $(topic_dropdown_button).prev('a').addClass('hover');
      }
      else {
        $(topic_dropdown_button).prev('a').removeClass('hover');
      }


    }
  }

  // Add button to menu item.
  // TODO: Remove the xxx to make button appear.
  var topics_link = $("div#nav ul a[href='/specialties']");
  //topics_link.after('<a id="topics-dropdown-open" href="#"><img src="' + Drupal.settings.bmj_topic.open_dropdown_img + '" /></a>');
  topics_link.after('<button id="topics-dropdown-open" class="ui-button slate expand"><img class="ui-button-nav-drop-down" alt="" src="'+Drupal.settings.bmj_core.pixel_image+'"><span class="ui-button-content">Drop down</span></button>');



  var topics_link_li = topics_link.parent();
  topics_link_li.addClass('topic-link-li');

  var topic_dropdown_button = $('#topics-dropdown-open');

  // add mouseover
  topic_dropdown_button.mouseover(function(){
    $(this).prev('a').addClass('hover');
  });

  // add mouseout
  topic_dropdown_button.mouseout(function(){

    var dropdown = $('#topic-list-dropdown');
    if (dropdown.css('display') != 'block') {
      $(this).prev('a').removeClass('hover');
    }

  });

  // add click event
  topic_dropdown_button.click(function(e){

    var dropdown = $('#topic-list-dropdown');
    var button = $('#topics-dropdown-open');
    if (!dropdown.length) {
      $.get('/bmj_specialties/dropdown', function(data) {

        $('div#header').after(data);
        var dropdown = $('#topic-list-dropdown');
        dropdown.slideToggle('400', function(){
          Drupal.bmj_topic_dropdown.toggleActiveClass();
        });

        // close button
        $('#topic-list-dropdown-close').click(function(e2){
          dropdown.slideUp('400', function(){
            Drupal.bmj_topic_dropdown.toggleActiveClass();
          });
          //return false;
        });

        button.removeClass('expand');
        button.addClass('open');
      });
    }
    else {

      dropdown.slideToggle('400', function(e2){
      Drupal.bmj_topic_dropdown.toggleActiveClass();
      button.removeClass('open');
      button.addClass('expand');
      });
    }
    //return false;
  });


};
