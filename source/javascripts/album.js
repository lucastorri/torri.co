(function() {

  var onMouseOutOpacity = 0.7;
  $('#thumbs ul.thumbs li, div.navigation a.pageLink').opacityrollover({
  	mouseOutOpacity:   onMouseOutOpacity,
  	mouseOverOpacity:  1.0,
  	fadeSpeed:         'fast',
  	exemptionSelector: '.selected'
  });

  var s = new Sonic({
  	width: 30,
  	height: 30,
  	stepsPerFrame: 2,
  	trailLength: .3,
  	pointDistance: .1,
  	padding: 10,
  	fillColor: '#369BD7',
  	strokeColor: '#FFF',
  	setup: function() {
  		this._.lineWidth = 20;
  	},
  	path: [
  		['line', 0, 0, 30, 0],
  		['line', 30, 0, 30, 30],
  		['line', 30, 30, 0, 30],
  		['line', 0, 30, 0, 0]
  	]
  });
  $("#loading").append(s.canvas);
  s.play();
  
  var gallery = $('#thumbs').galleriffic({
    delay:                     3000, // in milliseconds
    numThumbs:                 6, // The number of thumbnails to show page
    preloadAhead:              6, // Set to -1 to preload all images
    enableTopPager:            false,
    enableBottomPager:         true,
    maxPagesToShow:            20,  // The maximum number of pages to display in either the top or bottom pager
    imageContainerSel:         '#slideshow', // The CSS selector for the element within which the main slideshow image should be rendered
    controlsContainerSel:      '#controls', // The CSS selector for the element within which the slideshow controls should be rendered
    captionContainerSel:       '#caption', // The CSS selector for the element within which the captions should be rendered
    loadingContainerSel:       '#loading', // The CSS selector for the element within which should be shown when an image is loading
    renderSSControls:          true, // Specifies whether the slideshow's Play and Pause links should be rendered
    renderNavControls:         true, // Specifies whether the slideshow's Next and Previous links should be rendered
    playLinkText:              'Play Slideshow',
  	pauseLinkText:             'Pause Slideshow',
  	prevLinkText:              '&lsaquo; Previous Photo',
  	nextLinkText:              'Next Photo &rsaquo;',
  	nextPageLinkText:          '>',
  	prevPageLinkText:          '<',
    enableHistory:             true, // Specifies whether the url's hash and the browser's history cache should update when the current slideshow image changes
    enableKeyboardNavigation:  true, // Specifies whether keyboard navigation is enabled
    autoStart:                 false, // Specifies whether the slideshow should be playing or paused when the page first loads
    syncTransitions:           false, // Specifies whether the out and in transitions occur simultaneously or distinctly
    defaultTransitionDuration: 500, // If using the default transitions, specifies the duration of the transitions
    onPageTransitionOut:       undefined, // accepts a delegate like such: function(callback) { ... }
    onPageTransitionIn:        undefined, // accepts a delegate like such: function() { ... }
    onImageAdded:              undefined, // accepts a delegate like such: function(imageData, $li) { ... }
    onImageRemoved:            undefined,  // accepts a delegate like such: function(imageData, $li) { ... }
    onSlideChange:             function(prevIndex, nextIndex) {
  		this.find('ul.thumbs').children()
  			.eq(prevIndex).fadeTo('fast', onMouseOutOpacity).end()
  			.eq(nextIndex).fadeTo('fast', 1.0);
  		this.$captionContainer.find('div.photo-index')
  			.html('Photo '+ (nextIndex+1) +' of '+ this.data.length);
  	},
  	onPageTransitionOut:       function(callback) {
  		this.fadeTo('fast', 0.0, callback);
  	},
  	onPageTransitionIn:        function() {
  		var prevPageLink = this.find('a.prev').css('visibility', 'hidden');
  		var nextPageLink = this.find('a.next').css('visibility', 'hidden');
  		if (this.displayedPage > 0)
  			prevPageLink.css('visibility', 'visible');

  		var lastPage = this.getNumPages() - 1;
  		if (this.displayedPage < lastPage)
  			nextPageLink.css('visibility', 'visible');

  		this.fadeTo('fast', 1.0);
  	}
  });
    
  $.historyInit(function(hash) {
  	if(hash == "") {
  		gallery.gotoIndex(0);
  	} else {
  		$.galleriffic.gotoImage(hash);
  	}
  });
    
  $("a[rel='history']").live('click', function(e) {
  	if (e.button != 0) return true;

  	var hash = this.href;
  	hash = hash.replace(/^.*#/, '');
  	$.historyLoad(hash);
  	return false;
  });

  if (typeof picsLocation !== 'undefined') {

    var map = new GMaps({
      div: '#picsmap',
      lat: -30.02770410,
      lng: -51.22873460,
      zoom: 4
    });
    
    GMaps.geocode({
      address: picsLocation,
      callback: function(results, status) {
        if (status == 'OK') {
          var latlng = results[0].geometry.location;
          map.setCenter(latlng.lat(), latlng.lng());
          map.addMarker({
            lat: latlng.lat(),
            lng: latlng.lng(),
            infoWindow: {
              content: results[0].formatted_address
            }
          });
        }
      }
    });

  }

})();
