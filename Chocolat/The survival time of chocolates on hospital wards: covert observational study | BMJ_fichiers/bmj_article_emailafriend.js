(function ($) {

Drupal.behaviors.modalFrameEmailAfriend = function(context) {
	  $('.emailafriend a:not(.modalframe-more-help-processed)', context).addClass('modalframe-more-help-processed').click(function() {  
		  
	      var onSubmitCallback = function(args, statusMessages) {
	          if (args) {
	            // Render new status messages, if any.
	            if (statusMessages && statusMessages.length) {
	              $('.modalframe-cck-messages').html(statusMessages).show('fast');
	            }
	            if (args.reload) {
	              window.scrollTo(0, 0);
	              $('.modalframe-cck-messages').append(Drupal.theme('modalFrameCCKManageFieldsMessage', Drupal.t('Reloading page.')));
	              setTimeout(function() { window.location.reload(); }, 100);
	            }
	            else if (args.label) {
	              if (elementType == 'field') {
	                updateElement($('.secondary a[href$="'+ manageFieldsPath +'/fields/'+ elementName +'"]'), args.label);
	              }
	              updateElement($link.parents('tr:first').find('td:first span.label-'+ elementType), args.label);
	            }
	          }
	        };
		  
		  
	    Drupal.modalFrame.open({url: $(this).attr('href'), width: 800, height: 600, onSubmit: onSubmitCallback});
	    $('#modalframe-element #global-nav').hide();
	    return false;
	  });
	};
	

})(jQuery);