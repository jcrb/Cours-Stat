(function ($) {

Drupal.behaviors.modalFrameForward = function() {
  $('.modalframe-forward-child:not(.modalframe-forward-processed)').addClass('modalframe-forward-processed').click(function() {
    var element = this;
    // This is the onSubmit callback that will be called from the child window
    // when it is requested by a call to modalframe_close_dialog() performed
    // from server-side submit handlers.
    function onSubmitCallbackForward(args, statusMessages) {

      if (args && args.message) {
        // Provide a simple feedback alert deferred a little.
        setTimeout(function() { alert(args.message); }, 500);
      }
    }

    // Build modal frame options.
    var modalOptions = {
      url: $(element).attr('href'),
      autoFit: true,
      onSubmit: onSubmitCallbackForward
    };

    // Try to obtain the dialog size from the className of the element.
    var regExp = /^.*modalframe-forward-size\[\s*([0-9]*\s*,\s*[0-9]*)\s*\].*$/;
    if (typeof element.className == 'string' && regExp.test(element.className)) {
      var size = element.className.replace(regExp, '$1').split(',');
      modalOptions.width = parseInt(size[0].replace(/ /g, ''));
      modalOptions.height = parseInt(size[1].replace(/ /g, ''));
    }

    // Open the modal frame dialog.
    Drupal.modalFrame.open(modalOptions);

    // Prevent default action of the link click event.
    return false;
  });
};

})(jQuery);