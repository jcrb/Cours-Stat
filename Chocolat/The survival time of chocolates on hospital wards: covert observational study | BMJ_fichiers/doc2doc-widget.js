/**
 * @projectDescription Standalone version of widget code for embedding.
 * @author             James Skinner
 * @version            0.1
 */

(function() { // closure to prevent namespace pollution

  /**
   * Processes a Trimpath template against a data object and returns the result.
   * @param {String} tmpl Trimpath template definition 
   * @param {Object} data Data to pass to the template.
   * @return {String} Output of template execution
   */
  function doTemplate(tmpl, data) {
    var tt = TrimPath.parseTemplate(tmpl);
    return tt.process(data);
  }

  /**
   * Simpler function which allows us to get data from any server by
   * wrapping it in a Javascript function 
   * @param {Object} opt Widget options object. 
   * @param {Function} callback Method to pass final discussion list to.
   */
  function loadFeedFile(opt, callback) {
    window[opt.source.callback] = function(data) {
      var disclist = data.slice(0, opt.maxItems);
      callback(disclist);
    }
    
    var url = opt.source.url + "?callback=?";
    jQuery.getJSON(url, function(d) { });
  }


  /**
   * Default set of styles to add to the document.
   */
  var defaultStyles = [ ].join("\n");

  /**
   * A very basic template for generating the main body of the widget.
   */
  var defaultWidgetTemplate = 
    "<div class='doc2docwidget'>" +
    "  <a href='http://doc2doc.bmj.com'><div class='d2dw-header'></div></a>" +
    "  <div class='d2dw-items'><div style='height: 68px; background: url(http://doc2doc.bmj.com/images/indicator.gif) center no-repeat;'><a href='http://doc2doc.bmj.com/forumhome.html'></a></div></div>" +
    "  <div class='d2dw-link'>Read these and other forums on <a href='http://doc2doc.bmj.com/forumhome.html'>doc2doc</a>, BMJ Group's global clinical community</div>" +
    "</div>";
  
  /**
   * A very basic template for generating the list of items within the widget.
   */
  var defaultWidgetItemsTemplate = "<div class='d2dw-item'><a href='{URL}'>{TITLE}</a></div>";


  /**
   * Default options for widget, gets overriden by properties of object passed
   * to jQuery.fn.doc2docWidget()
   */
  var defaultOptions = {
    
    // Url of script file containing list of discussions from doc2doc, and name
    // of the callback function that the script will call.
    source: {
      url: "http://doc2doc.bmj.com/server/open.js",
      callback: "displayDiscussions"
    },
    
    // Template strings for main widget body and the list of discussions inside.
    bodyTemplate: defaultWidgetTemplate,
    itemTemplate: defaultWidgetItemsTemplate,
    
    // Contains default CSS rules for widgets, can be overriden.
    defaultCSSRules: defaultStyles,

    // If true a style tag is generated from the value of defaultStyles and
    // inserted before the widget itself.
    addDefaultCSS: true,
    
    // This is added to the end of the <style> tag for the widget. 
    extraCSSRules: "",
    
    // Maximum number of discussions to show.
    maxItems: 9
  };
  
  /**
   * Include a new doc2doc widget inside the selected node(s), can take
   * an optional object to override default settings.
   * @param {Object} options Property bag for overriding default options.
   */
  jQuery.fn.doc2docWidget = function() {
    var self = this, opt = jQuery.fn.doc2docWidget.options;
    //jQuery.extend({}, defaultOptions, options);
    
    // Insert default styles if options.addDefaultCSS is true or
    // options.extraCSSRules has content.
    if (opt.addDefaultCSS || (opt.extraCSSRules && opt.extraCSSRules.length)) {
      var rules = (opt.addDefaultCSS ? opt.defaultCSSRules : "")
        + "\n" + opt.extraCSSRules + "\n";
      jQuery(this).append("<style type='text/css'>" + rules + "</style>");
    }

    // Build widget body on element.
    jQuery(this).append(opt.bodyTemplate);

    // Load JSON source file to get an array of doc2doc discussion objects, and
    // then use those to generate the list of discussions inside the widget.
    loadFeedFile(opt, 
      function(discussions) {  // callback function
        jQuery(".d2dw-items", self)
          .empty()
          .each(function() {
            var $el = jQuery(this);
            
            for (var i = 0; i < discussions.length; i++) {
              var cur = discussions[i];
              var html = opt.itemTemplate
                .replace("{URL}", cur.DiscussionUrl + "&q=w_")
                .replace("{TITLE}", cur.DiscussionTitle);
              $el.append(html);
            }
          })
          .find(".d2dw-item:even")
            .addClass("d2dw-alt");
      });

    return this;
  }
  
  jQuery.fn.doc2docWidget.options = jQuery.extend({}, defaultOptions);
  
  /**
   * Overrides the current settings for the doc2doc widget using
   * the supplied object's key:value pairs.
   * @param {Object} options Property bag with new options.
   * @return {Object} Updated options for the widget.
   */
  jQuery.fn.doc2docWidget.setOptions = function(options) {
    jQuery.extend(jQuery.fn.doc2docWidget.options, options);
    //jQuery.bmj.log("doc2docWidget: new options = " + jQuery.fn.doc2docWidget.options.toString());
    return jQuery.fn.doc2docWidget.options;
  }
  
  /*
   * On page load look for element with id='doc2doc-widget' and append the widget to that.
   */
  jQuery(function() {
    jQuery("#doc2doc-widget").doc2docWidget();
  });

})(); // end closure
