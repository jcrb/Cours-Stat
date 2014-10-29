/**
 * Highwire OpenURL JS
 *
 * Copyright (c) 2010-2011 Board of Trustees, Leland Stanford Jr. University
 * This software is open-source licensed under the GNU Public License Version 2 or later
 * The full license is available in the LICENSE.TXT file at the root of this repository
 */

$('document').ready(function(){
	if($('.cit-ref-sprinkles-open-url').length > 0){
		$.getJSON(
			Drupal.settings.basePath + 'highwire/openurl', {nid :Drupal.settings.highwire.nid}, 
			function(data){
				if(data){
					$('.cit-ref-sprinkles-open-url').each(function(){
						$(this).attr('href', $(this).attr('href').replace("{openurl}", data.base_url));
						$(this).text(data.link_text);
						if(data.image){
							$(this).prepend('<img src="'+data.image+'"/>');
						}
					});
				} else {
					$('.cit-ref-sprinkles-open-url').remove();
				}
			}
		);
	}
});
