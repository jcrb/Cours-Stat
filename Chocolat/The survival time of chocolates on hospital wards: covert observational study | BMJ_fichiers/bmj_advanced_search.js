Drupal.behaviors.advancedSearch = function(context) {

  $('.advanced-search .search-by div').click(function(){
      $('div.block-active').each(function(index, e){
        $(this).children('div').children('fieldset').children('div').children('input').each(function(i,e){
          if ($(this).val() == ''){
            $(this).parents('.block-active').addClass('block-inactive');
            $(this).parents('.block-active').removeClass('block-active');
          }
          else{
            $(this).parents('.block-inactive').addClass('block-active');
            $(this).parents('.block-inactive').removeClass('block-inactive');
            return false;
          }
          return false;
          });
      });
      if ($(this).hasClass('block-inactive')){
        $(this).removeClass('block-inactive');
        $(this).addClass('block-active');
      }
  });

  //Clear button for search-by part of the form
  $('#clear-search-by').click(function(e){
    e.preventDefault();
    $('form#highwire-search-form .search-by .form-text').each(function(){
      $(this).val('');
    });
  });
  //Clear button for filter part of the form
  $('#clear-filter').click(function(e){
    e.preventDefault();
    $('#edit-resultformat-standard').click();
    $('#edit-sort-relevance-rank').click();
    $('#edit-limit-from-year').val(Drupal.settings.advanced_search.default_values.limit_from.year);
    $('#edit-limit-from-month').val(Drupal.settings.advanced_search.default_values.limit_from.month);
    $('#edit-limit-from-day').val(Drupal.settings.advanced_search.default_values.limit_from.day);
    $('#edit-limit-to-year').val(Drupal.settings.advanced_search.default_values.limit_to.year);
    $('#edit-limit-to-month').val(Drupal.settings.advanced_search.default_values.limit_to.month);
    $('#edit-limit-to-day').val(Drupal.settings.advanced_search.default_values.limit_to.day);
    $('#edit-numresults').val(Drupal.settings.advanced_search.default_values.num_results);
    $('#edit-subject-collection-code').val(0);
    $('#edit-toc-section').val(0);
  });

  var show_menu = function(e){
    e.preventDefault();
    //console.log($(this).attr('id'));
    var menuClass = '.'+$(this).attr('id');
    if ($(menuClass).css('display') == 'none'){
      $(menuClass).css({'display':'block'});
      $(this).addClass('on');
    }
    else{
      $(menuClass).css({'display':'none'});
      $(this).removeClass('on');
    }
    return false;
  }

  var set_input =  function(e){
    e.preventDefault();

    className = '.'+$(this).parents('div').attr('class');
    idName = '#'+$(this).parents('div').attr('class');
    $('span'+className+' input').attr('value', $(this).text());
    var tmp = '<img class="search-expand" src="'+Drupal.settings.bmj_core.pixel_image+'"><span>'+$(this).text()+'</span>';
    $(this).text($('a'+idName).text());

    $('a'+idName).html(tmp);

    $(className).css({'display':'none'});
  }
  //We show the other author input when clicking the link
  $('.search-add-link').click(function(e){
    e.preventDefault();
    //var authorfield = '<div>' + $('.author-field-hidden input').html() +  $('.author-field-hidden input').html() + '</div>';
    $('.author-field-hidden input').hide();
    $('.author-field-hidden label').hide();
    $('.author-field-hidden label').insertAfter($('#edit-author1'));
    $('.author-field-hidden input').insertAfter($('#edit-author1'));
    $('#edit-author2').css('float', 'right').css('margin-top', '15px').css('margin-bottom', '5px');
    $('#edit-author2').fadeIn(600);
    $(this).fadeOut();
  });

  $('a#menu-title').click(show_menu);
  $('a#menu-abstract').click(show_menu);
  $('a#menu-text').click(show_menu);

  $('.menu-title a').click(set_input);
  $('.menu-abstract a').click(set_input);
  $('.menu-text a').click(set_input);
};

//function showSubMenu(menuid){
//    var menuId = '#'+menuid;
//    if ($(menuId).css('display') == 'none'){
//      $('#search-menu').css({'display':'block'});
//      $(this).addClass('on');
//    }
//    else{
//      $('#search-menu').css({'display':'none'});
//      $(this).removeClass('on');
//    }
//    return false;
//}

//function showSubMenu(menuId,headingId){
//  var menuId="#"+menuId;
//  var menuHeadingId="#"+headingId;
//  if(jQuery(menuId).css('display')=='none'){
//    jQuery(menuId).css({'display':'block'});
//    jQuery(menuHeadingId).addClass('on');
//  }
//  else{
//    jQuery(menuId).css({'display':'none'});
//    jQuery(menuHeadingId).removeClass('on');
//  }
//return false;}

//function setInputFormValue(searchAliasValue,searchAliasName){
//  if(jQuery("#menu-heading").attr('innerHTML')=='Search All'){
//    var currentSubMenu=jQuery("#search-menu").attr('innerHTML');
//    var subMenuReplace1=currentSubMenu.replace("setInputFormValue('"+searchAliasValue+"', '"+searchAliasName+"');","setInputFormValue('', 'Search All');");
//    var subMenuReplace2=subMenuReplace1.replace("title=\""+searchAliasName+"\"","title=\"Search Entire Site\"");
//    var subMenuReplace3=subMenuReplace2.replace(searchAliasName,"Search All");
//    jQuery("#search-menu").attr('innerHTML',subMenuReplace3);
//  }
//  else{
//    var currentTempName=jQuery("#menu-heading").attr('innerHTML');
//    var currentTempValue=jQuery("#aliasHandle").attr('value');
//    var currentSubMenu=jQuery("#search-menu").attr('innerHTML');
//    var subMenuReplace1=currentSubMenu.replace("setInputFormValue('', 'Search All');","setInputFormValue('"+currentTempValue+"', '"+currentTempName+"');");var subMenuReplace2=subMenuReplace1.replace("title=\"Search Entire Site\"","title=\""+currentTempName+"\"");var subMenuReplace3=subMenuReplace2.replace("Search All",currentTempName);var subMenuReplace4=subMenuReplace3.replace("setInputFormValue('"+searchAliasValue+"', '"+searchAliasName+"');","setInputFormValue('', 'Search All');");var subMenuReplace5=subMenuReplace4.replace("title=\""+searchAliasName+"\"","title=\"Search Entire Site\"");var subMenuReplace6=subMenuReplace5.replace(searchAliasName,"Search All");jQuery("#search-menu").attr('innerHTML',subMenuReplace6);}
//jQuery("#menu-heading").attr('innerHTML',searchAliasName);jQuery("#aliasHandle").attr('value',searchAliasValue);return false;}
