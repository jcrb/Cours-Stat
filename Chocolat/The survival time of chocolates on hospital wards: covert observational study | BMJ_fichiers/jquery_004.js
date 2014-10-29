/*
    jQuery News Ticker is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, version 2 of the License.
 
    jQuery News Ticker is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with jQuery News Ticker.  If not, see <http://www.gnu.org/licenses/>.
*/
(function($){  
	$jq.fn.ticker = function(options) { 
		// Extend our default options with those provided.
		// Note that the first arg to extend is an empty object -
		// this is to keep from overriding our "defaults" object.
		var opts = $jq.extend({}, $jq.fn.ticker.defaults, options); 
		
		/* Get the id of the UL to get our news content from */
		var newsID = '#' + $jq(this).attr('id');

		/* Get the tag type - we will check this later to makde sure it is a UL tag */
		var tagType = $jq(this).get(0).tagName; 	

		return this.each(function() { 
			/* Internal vars */
			var settings = {				
				position: 0,
				time: 0,
				distance: 0,
				newsArr: {},
				play: true,
				paused: false,
				contentLoaded: false,
				dom: {
					contentID: '#ticker-content',
					titleID: '#ticker-title',
					titleElem: '#ticker-title SPAN',
					tickerID : '#ticker',
					wrapperID: '#ticker-wrapper',
					revealID: '#ticker-swipe',
					revealElem: '#ticker-swipe SPAN',
					controlsID: '#ticker-controls',
					prevID: '#prev',
					nextID: '#next',
					playPauseID: '#play-pause'
				}
			};

			// if we are not using a UL, display an error message and stop any further execution
			if (tagType != 'UL' && tagType != 'OL' && opts.htmlFeed === true) {
				debugError('Cannot use <' + tagType.toLowerCase() + '> type of element for this plugin - must of type <ul> or <ol>');
				return false;
			}

			// set the ticker direction
			opts.direction == 'rtl' ? opts.direction = 'right' : opts.direction = 'left';
			
			// lets go...
			initialisePage();
			/* Function to get the size of an Object*/
			function countSize(obj) {
			    var size = 0, key;
			    for (key in obj) {
			        if (obj.hasOwnProperty(key)) size++;
			    }
			    return size;
			};

			/* Function for handling debug and error messages */ 
			function debugError(obj) {
				if (opts.debugMode) {
					if (window.console && window.console.log) {
						window.console.log(obj);
					}
					else {
						alert(obj);			
					}
				}
			}	

			/* Function to setup the page */
			function initialisePage() {
				// add our HTML structure for the ticker to the DOM
				$jq(settings.dom.wrapperID).append('<div id="' + settings.dom.tickerID.replace('#', '') + '"><div id="' + settings.dom.titleID.replace('#', '') + '"><span><!-- --></span></div><p id="' + settings.dom.contentID.replace('#', '') + '"></p><div id="' + settings.dom.revealID.replace('#', '') + '"><span><!-- --></span></div></div>');
				$jq(settings.dom.wrapperID).removeClass('no-js').addClass('has-js ' + opts.direction);
				// hide the ticker
				$jq(settings.dom.tickerElem + ',' + settings.dom.contentID).hide();
				// add the controls to the DOM if required
				if (opts.controls) {
					// add related events - set functions to run on given event
					$jq(settings.dom.controlsID).live('click mouseover mousedown mouseout mouseup', function (e) {
						var button = e.target.id;
						if (e.type == 'click') {	
							switch (button) {
								case settings.dom.prevID.replace('#', ''):
									// show previous item
									settings.paused = true;
									$jq(settings.dom.playPauseID).addClass('paused');
									manualChangeContent(button);
									break;
								case settings.dom.nextID.replace('#', ''):
									// show next item
									settings.paused = true;
									$jq(settings.dom.playPauseID).addClass('paused');
									manualChangeContent(button);
									break;
								case settings.dom.playPauseID.replace('#', ''):
									// play or pause the ticker
									if (settings.play == true) {
										settings.paused = true;
										$jq(settings.dom.playPauseID).addClass('paused');
										pauseTicker();
									}
									else {
										settings.paused = false;
										$jq(settings.dom.playPauseID).removeClass('paused');
										restartTicker();
									}
									break;
							}	
						}
						else if (e.type == 'mouseover' && $jq('#' + button).hasClass('controls')) {
							$jq('#' + button).addClass('over');
						}
						else if (e.type == 'mousedown' && $jq('#' + button).hasClass('controls')) {
							$jq('#' + button).addClass('down');
						}
						else if (e.type == 'mouseup' && $jq('#' + button).hasClass('controls')) {
							$jq('#' + button).removeClass('down');
						}
						else if (e.type == 'mouseout' && $jq('#' + button).hasClass('controls')) {
							$jq('#' + button).removeClass('over');
						}
					});
					// add controls HTML to DOM
					$jq(settings.dom.wrapperID).append('<ul id="' + settings.dom.controlsID.replace('#', '') + '"><li title="Previous" id="' + settings.dom.prevID.replace('#', '') + '" class="controls"></li><li title="Pause" id="' + settings.dom.playPauseID.replace('#', '') + '" class="controls"></li><li title="Next" id="' + settings.dom.nextID.replace('#', '') + '" class="controls"></li></ul>');
				}
				if (opts.displayType != 'fade') {
                		// add mouse over on the content
                		$jq(settings.dom.contentID).mouseover(function () {
                			if (settings.paused == false) {
                				pauseTicker();
                			}
                		}).mouseout(function () {
                			if (settings.paused == false) {
                				restartTicker();
                			}
                		});
				}
				// process the content for this ticker
				processContent();
			}

			/* Start to process the content for this ticker */
			function processContent() {
				// check to see if we need to load content
				if (settings.contentLoaded == false) {
					// construct content
					if (opts.ajaxFeed) {
						if (opts.feedType == 'xml') {
							$jq.ajax({
								url: opts.feedUrl,
								cache: false,
								dataType: opts.feedType,
								async: true,
								success: function(data){
									count = 0;	
									// get the 'root' node
									for (var a = 0; a < data.childNodes.length; a++) {
										if (data.childNodes[a].nodeName == 'rss') {
											xmlContent = data.childNodes[a];
										}
									}
									// find the channel node
									for (var i = 0; i < xmlContent.childNodes.length; i++) {
										if (xmlContent.childNodes[i].nodeName == 'channel') {
											xmlChannel = xmlContent.childNodes[i];
										}		
									}
									// for each item create a link and add the article title as the link text
									for (var x = 0; x < xmlChannel.childNodes.length; x++) {
										if (xmlChannel.childNodes[x].nodeName == 'item') {
											xmlItems = xmlChannel.childNodes[x];
											var title, link = false;
											for (var y = 0; y < xmlItems.childNodes.length; y++) {
												if (xmlItems.childNodes[y].nodeName == 'title') {      												    
													title = xmlItems.childNodes[y].lastChild.nodeValue;
												}
												else if (xmlItems.childNodes[y].nodeName == 'link') {												    
													link = xmlItems.childNodes[y].lastChild.nodeValue; 
												}
												if ((title !== false && title != '') && link !== false) {
												    settings.newsArr['item-' + count] = { type: opts.titleText, content: '<a href="' + link + '">' + title + '</a>' };												    count++;												    title = false;												    link = false;
												}
											}	
										}		
									}			
									// quick check here to see if we actually have any content - log error if not
									if (countSize(settings.newsArr < 1)) {
										debugError('Couldn\'t find any content from the XML feed for the ticker to use!');
										return false;
									}
									setupContentAndTriggerDisplay();
									settings.contentLoaded = true;
								}
							});							
						}
						else {
							debugError('Code Me!');	
						}						
					}
					else if (opts.htmlFeed) { 
						if($jq(newsID + ' LI').length > 0) {
							$jq(newsID + ' LI').each(function (i) {
								// maybe this could be one whole object and not an array of objects?
								settings.newsArr['item-' + i] = { type: opts.titleText, content: $jq(this).html()};
							});		
							setupContentAndTriggerDisplay();
						}	
						else {
							debugError('Couldn\'t find HTML any content for the ticker to use!');
							return false;
						}
					}
					else {
						debugError('The ticker is set to not use any types of content! Check the settings for the ticker.');
						return false;
					}					
				}			
			}

			function setupContentAndTriggerDisplay() {

				settings.contentLoaded = true;

				// update the ticker content with the correct item
				// insert news content into DOM
				$jq(settings.dom.titleElem).html(settings.newsArr['item-' + settings.position].type);
				$jq(settings.dom.contentID).html(settings.newsArr['item-' + settings.position].content);

				// set the next content item to be used - loop round if we are at the end of the content
				if (settings.position == (countSize(settings.newsArr) -1)) {
					settings.position = 0;
				}
				else {		
					settings.position++;
				}			

				// get the values of content and set the time of the reveal (so all reveals have the same speed regardless of content size)
				distance = $jq(settings.dom.contentID).width();
				time = distance / opts.speed;

				// start the ticker animation						
				revealContent();		
			}

			// slide back cover or fade in content
			function revealContent() {
				if(settings.play) {	
					// get the width of the title element to offset the content and reveal
					var offset = $jq(settings.dom.titleElem).width() + 0;
					$jq(settings.dom.revealID).css(opts.direction, offset + 'px');
					// show the reveal element and start the animation
					if (opts.displayType == 'fade') {
						// fade in effect ticker
						$jq(settings.dom.revealID).hide(0, function () {
							$jq(settings.dom.contentID).css(opts.direction, offset + 'px').fadeIn(opts.fadeInSpeed, postReveal);
						});						
					}
					else if (opts.displayType == 'scroll') {
						// to code
					}
					else {
						// default bbc scroll effect
						$jq(settings.dom.revealElem).show(0, function () {
							$jq(settings.dom.contentID).css(opts.direction, offset + 'px').show();
							// set our animation direction
							animationAction = opts.direction == 'right' ? { marginRight: distance + 'px'} : { marginLeft: distance + 'px' };
							$jq(settings.dom.revealID).css('margin-' + opts.direction, '0px').delay(20).animate(animationAction, time, 'linear', postReveal);
						});		
					}
				}
				else {
					return false;					
				}
			};

			// here we hide the current content and reset the ticker elements to a default state ready for the next ticker item
			function postReveal() {				
				if(settings.play) {		
					// we have to separately fade the content out here to get around an IE bug - needs further investigation
					$jq(settings.dom.contentID).delay(opts.pauseOnItems).fadeOut(opts.fadeOutSpeed);
					// deal with the rest of the content, prepare the DOM and trigger the next ticker
					if (opts.displayType == 'fade') {
						$jq(settings.dom.contentID).fadeOut(opts.fadeOutSpeed, function () {
							$jq(settings.dom.wrapperID)
								.find(settings.dom.revealElem + ',' + settings.dom.contentID)
									.hide()
								.end().find(settings.dom.tickerID + ',' + settings.dom.revealID)
									.show()
								.end().find(settings.dom.tickerID + ',' + settings.dom.revealID)
									.removeAttr('style');								
							setupContentAndTriggerDisplay();						
						});
					}
					else {
						$jq(settings.dom.revealID).hide(0, function () {
							$jq(settings.dom.contentID).fadeOut(opts.fadeOutSpeed, function () {
								$jq(settings.dom.wrapperID)
									.find(settings.dom.revealElem + ',' + settings.dom.contentID)
										.hide()
									.end().find(settings.dom.tickerID + ',' + settings.dom.revealID)
										.show()
									.end().find(settings.dom.tickerID + ',' + settings.dom.revealID)
										.removeAttr('style');								
								setupContentAndTriggerDisplay();						
							});
						});	
					}
				}
				else {
					$jq(settings.dom.revealElem).hide();
				}
			}

			// pause ticker
			function pauseTicker() {				
				settings.play = false;
				// stop animation and show content - must pass "true, true" to the stop function, or we can get some funky behaviour
				$jq(settings.dom.tickerID + ',' + settings.dom.revealID + ',' + settings.dom.titleID + ',' + settings.dom.titleElem + ',' + settings.dom.revealElem + ',' + settings.dom.contentID).stop(true, true);
				$jq(settings.dom.revealID + ',' + settings.dom.revealElem).hide();
				$jq(settings.dom.wrapperID)
					.find(settings.dom.titleID + ',' + settings.dom.titleElem).show()
						.end().find(settings.dom.contentID).show();
			}

			// play ticker
			function restartTicker() {				
				settings.play = true;
				settings.paused = false;
				// start the ticker again
				postReveal();	
			}

			// change the content on user input
			function manualChangeContent(direction) {
				pauseTicker();
				switch (direction) {
					case 'prev':
						if (settings.position == 0) {
							settings.position = countSize(settings.newsArr) -2;
						}
						else if (settings.position == 1) {
							settings.position = countSize(settings.newsArr) -1;
						}
						else {
							settings.position = settings.position - 2;
						}
						$jq(settings.dom.titleElem).html(settings.newsArr['item-' + settings.position].type);
						$jq(settings.dom.contentID).html(settings.newsArr['item-' + settings.position].content);						
						break;
					case 'next':
						$jq(settings.dom.titleElem).html(settings.newsArr['item-' + settings.position].type);
						$jq(settings.dom.contentID).html(settings.newsArr['item-' + settings.position].content);
						break;
				}
				// set the next content item to be used - loop round if we are at the end of the content
				if (settings.position == (countSize(settings.newsArr) -1)) {
					settings.position = 0;
				}
				else {		
					settings.position++;
				}	
			}
		});  
	};  

	// plugin defaults - added as a property on our plugin function
	$jq.fn.ticker.defaults = {
		speed: 0.10,			
		ajaxFeed: false,
		feedUrl: '',
		feedType: 'xml',
		displayType: 'fade',
		htmlFeed: true,
		debugMode: true,
		controls: true,
		titleText: '',	
		direction: 'ltr',	
		pauseOnItems: 8000,
		fadeInSpeed: 500,
		fadeOutSpeed: 300
	};	
})(jQuery);