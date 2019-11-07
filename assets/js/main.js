//Main
(function($) {

  "use strict";

  $(window).on('load', function() {

  /*Page Loader active
  ========================================================*/
  $('#preloader').fadeOut();

  (function ($) {
  	$.fn.countTo = function (options) {
  		options = options || {};

  		return $(this).each(function () {
  			// set options for current element
  			var settings = $.extend({}, $.fn.countTo.defaults, {
  				from:            $(this).data('from'),
  				to:              $(this).data('to'),
  				speed:           $(this).data('speed'),
  				refreshInterval: $(this).data('refresh-interval'),
  				decimals:        $(this).data('decimals')
  			}, options);

  			// how many times to update the value, and how much to increment the value on each update
  			var loops = Math.ceil(settings.speed / settings.refreshInterval),
  				increment = (settings.to - settings.from) / loops;

  			// references & variables that will change with each update
  			var self = this,
  				$self = $(this),
  				loopCount = 0,
  				value = settings.from,
  				data = $self.data('countTo') || {};

  			$self.data('countTo', data);

  			// if an existing interval can be found, clear it first
  			if (data.interval) {
  				clearInterval(data.interval);
  			}
  			data.interval = setInterval(updateTimer, settings.refreshInterval);

  			// initialize the element with the starting value
  			render(value);

  			function updateTimer() {
  				value += increment;
  				loopCount++;

  				render(value);

  				if (typeof(settings.onUpdate) == 'function') {
  					settings.onUpdate.call(self, value);
  				}

  				if (loopCount >= loops) {
  					// remove the interval
  					$self.removeData('countTo');
  					clearInterval(data.interval);
  					value = settings.to;

  					if (typeof(settings.onComplete) == 'function') {
  						settings.onComplete.call(self, value);
  					}
  				}
  			}

  			function render(value) {
  				var formattedValue = settings.formatter.call(self, value, settings);
  				$self.html(formattedValue);
  			}
  		});
  	};

  	$.fn.countTo.defaults = {
  		from: 0,               // the number the element should start at
  		to: 0,                 // the number the element should end at
  		speed: 1000,           // how long it should take to count between the target numbers
  		refreshInterval: 100,  // how often the element should be updated
  		decimals: 0,           // the number of decimal places to show
  		formatter: formatter,  // handler for formatting the value before rendering
  		onUpdate: null,        // callback method for every time the element is updated
  		onComplete: null       // callback method for when the element finishes updating
  	};

  	function formatter(value, settings) {
  		return value.toFixed(settings.decimals);
  	}
  }(jQuery));

  jQuery(function ($) {
    // custom formatting example
    $('.count-number').data('countToOptions', {
  	formatter: function (value, options) {
  	  return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
  	}
    });

    // start all the timers
    $('.timer').each(count);

    function count(options) {
  	var $this = $(this);
  	options = $.extend({}, options || {}, $this.data('countToOptions') || {});
  	$this.countTo(options);
    }
  });

  });


  $(window).on('scroll', function() {
      if ($(window).scrollTop() > 50) {
          $('.scrolling-navbar').addClass('top-nav-collapse');
      } else {
          $('.scrolling-navbar').removeClass('top-nav-collapse');
      }
  });

  $(".owl-carousel").owlCarousel({
    loop:true,
    dots: false,
    nav: true,
    items: 1,
    // animateOut: 'fadeOut'
    navText: ["<div class='owl-arrow arrow-prev'></div>","<div class='owl-arrow arrow-next'></div>"]
  });

  $('.flowing-scroll').on( 'click', function(){
      var el = $(this);
      var dest = el[0].attr('href'); // получаем направление
      if(dest !== undefined && dest !== '') { // проверяем существование
          $('html').animate({
              scrollTop: $(dest).offset().top // прокручиваем страницу к требуемому элементу
          }, 500 // скорость прокрутки
          );
      }
      return false;
  });

    // When the DOM is ready,
  $(function() {
      var toggle = $('.toggle');

      // Toggle
      toggle.on('click', function(e) {
          e.preventDefault();
          $(this).toggleClass('is-active');
      });
  });

}(jQuery));

// counter


// Multilanguage Support

window.onload = initialize;

function initialize() {

  var $dropdown = $("#country_select");    
  $.each(LanguageList, function(key, value) {
    $dropdown.
      append($("<option/>").
      val(key).
      text(value));
    });
    
  loadsLanguage("UA");
}

function loadsLanguage(lang){
  /*fills all the span tags with class=lang pattern*/ 
  $('span[class^="lang"]').each(function(){
    var LangVar = (this.className).replace('lang-','');
    var Text = window["WORDS_"+lang][LangVar];
    $(this).html(Text);        
  });
}