Drupal.behaviors.allVersions = function(){
  $('ul.article-all-versions').hide();
  $('a.article-all-versions-toggle').click(function(){
    //$(this).preventDefaults();
    $(this).siblings("ul.article-all-versions").toggle().siblings("a").toggleClass("collapse").toggleClass("expand");
    return false;
  })
}
