
(function($, fnFrontend){
	"use strict";
	
	
	
	var Modulify = {
		
		init: function() {

			var widgets = {
				'modulify-all-widgets.default' : Modulify.modulify_all_functions,
			};

			$.each( widgets, function( widget, callback ) {
				fnFrontend.hooks.addAction( 'frontend/element_ready/' + widget, callback );
			});
		},
		
		modulify_all_functions: function(){
			Modulify.carouselFullAll();
			Modulify.allDataBgImg();
			Modulify.extendableButtonHover();
			Modulify.carouselFullBetaItemOnHover();
			Modulify.carouselFullInteractive();
			Modulify.carouselSquareAllVersion();
			Modulify.miniTriggerTopOffset();
			Modulify.carouselCircleAllFunctions();
			Modulify.carouselWithContentAllFunctions();
			Modulify.listAllFunctions();
			Modulify.listJustifiedFunction();
			Modulify.sliderAlphaFunction();
			Modulify.sliderBetaFunction();
			Modulify.sliderGammaFunction();
			Modulify.sliderDeltaFunction();
			Modulify.sliderEpsilonFunction();
			Modulify.sliderZetaFunction();
			Modulify.modulify_fn_lightbox();
		},
		carouselFullAll: function(){
			var carousel	= $('.full_carousel_version .owl-carousel');
			carousel.each(function(){
				var el = $(this);
				var autoPlaySwitch 	= el.parent().data('autoplay-switch');
				var autoPlayTime;
				if(autoPlaySwitch === 'enabled'){
					autoPlaySwitch 	= true;
					autoPlayTime 	= el.parent().data('autoplay-time');
				}else{
					autoPlaySwitch 	= false;
					autoPlayTime 	= 3000;
				}
				var loopBoolean;
				var parentOfEl = el.parent();
				if(parentOfEl.hasClass('modulify_carousel_full_interactive')){
					loopBoolean = false;
				}else{
					loopBoolean = true;
				}
				var col = parentOfEl.data('columns-number');
				var extraMax, max, extraMedium, medium, small;
				if(col!==5 && col!==4 && col!==3 && col!==2){
					col = 4;
				}
				switch(col){
					case 5: extraMax=5;max=4; extraMedium=3;medium=2;small=1;
						break;
					case 4: extraMax=4;max=4; extraMedium=3;medium=2;small=1;
						break;
					case 3: extraMax=3;max=3; extraMedium=3;medium=2;small=1;
						break;
					case 2: extraMax=2;max=2; extraMedium=2;medium=2;small=1;
				}
				el.owlCarousel({
					margin:0,
					loop:loopBoolean,
					autoWidth:false,
					items: extraMax,
					dots: false,
					nav: false,
					autoplay: autoPlaySwitch,
					autoplayTimeout: autoPlayTime,
					slideBy:1,
					responsiveClass:true,
					responsive:{
						0:{items:small},
						768:{items:medium},
						1041:{items:extraMedium},
						1350:{items:max},
						1400:{items:extraMax},
					}
				});
				
				/************* PREVIOUS NEXT BUTTONS ***************/
				var prev = el.parent().find('.owl_control .fn_prev');
				var next = el.parent().find('.owl_control .fn_next');
				prev.on('click',function(){
					el.trigger('prev.owl');
					return false;
				});
				next.on('click',function(){
					el.trigger('next.owl');
					return false;
				});
				/****************************************************/
			});
		},
		
		allDataBgImg: function(){
			
			var div = $('*[data-bg-img]');
			
			div.each(function(){
				var element = $(this);
				var attrBg	= element.attr('data-bg-img');
				var bgImg	= element.data('bg-img');
				if(typeof(attrBg) !== 'undefined'){
					element.css({backgroundImage:'url('+bgImg+')'});
				}
			});
		},
		
		
		extendableButtonHover: function(){
			var button = $('div[data-link-types="extendable"] a.simple_read_more');
			button.each(function(){
				var btn 	= $(this);
				var span 	= btn.find('span');
				var spanW 	= span.width();
				var spanH 	= span.height();
				btn.on('mouseenter', function(){
					span.css({textIndent:10,opacity:1});
					btn.css({width:spanW+spanH+24});
				}).on('mouseleave', function(){
					span.css({textIndent:-spanW,opacity:0});
					btn.css({width:24});
				});
			});
			
		},
		
		carouselFullBetaItemOnHover: function(){
			var betas	= $('.modulify_carousel_full_beta[data-title-holder-animation="dynamic"]');
			betas.each(function(){
				var beta 	= $(this);
				var items 	= beta.find('.owl-carousel .item');
				items.each(function(){
					var item 	= $(this);
					var img 	= item.find('.img_holder');
					var title 	= item.find('.title_holder');
					var titleH 	= title.outerHeight();
					if(beta.data('title-holder-position') === 'bottom'){
						item.on('mouseenter',function(){
							title.css({transform:'translate3d(0px,'+((-1)*titleH)+'px,0px)'});
							img.css({top:((-1)*titleH/2)});
						}).on('mouseleave', function(){
							title.css({transform:'translate3d(0px,0px,0px)'});
							img.css({top:'0px'});
						});
					}else if(beta.data('title-holder-position') === 'top'){
						item.on('mouseenter',function(){
							title.css({transform:'translate3d(0px,'+titleH+'px,0px)'});
							img.css({top:(titleH/2)});
						}).on('mouseleave', function(){
							title.css({transform:'translate3d(0px,0px,0px)'});
							img.css({top:'0px'});
						});
					}
						
				});
			});
				
		},
		
		carouselFullInteractive: function(){

			var element = jQuery('.modulify_carousel_full_interactive');
			
			if(element.length){
				
				element.each(function(){
					var el 		= $(this);
					var item 	= el.find('.item');
					var div 	= el.find('.interactive_overlay > div');
					
					item.on('mouseenter',function(){
						var eachItem		= $(this);
						var attrClass		= eachItem.attr('data-interactive');		
						var overlayChild	= el.find('.interactive_overlay .' + attrClass);
						item.removeClass('hovered');
						eachItem.addClass('hovered');
						div.removeClass('hovered');
						overlayChild.addClass('hovered');
					});
					
				});
			}
		},
		carouselSquareAllVersion: function(){
			var carouselAlpha = $('.modulify_carousel_square.alpha .owl-carousel');
			carouselAlpha.each(function(){
				var element = $(this);
				element.owlCarousel({
					margin:0,
					loop:true,
					autoWidth:false,
					items: 3,
					dots: false,
					nav: false,
					autoplay:false,
					center:true,
					responsiveClass:true,
					responsive:{
						0:{items:1},
						480:{items:1},
						481:{items:3},
					}
				});
				/************* PREVIOUS NEXT BUTTONS ***************/
				var prev = element.parent().find('.owl_control .fn_prev');
				var next = element.parent().find('.owl_control .fn_next');
				prev.on('click',function(){
					element.trigger('prev.owl');
					return false;
				});
				next.on('click',function(){
					element.trigger('next.owl');
					return false;
				});
			});
			
			var carouselBeta = $('.modulify_carousel_square.beta .owl-carousel');
			carouselBeta.each(function(){
				var element = $(this);
				element.owlCarousel({
					margin:40,
					loop:true,
					autoWidth:false,
					items: 3,
					dots: false,
					nav: false,
					autoplay:false,
					responsiveClass:true,
					responsive:{
						0:{items:1,margin:0},
						480:{items:1,margin:20},
						481:{items:1,margin:20},
						1040:{items:2,margin:20},
						1041:{items:4,margin:40}
					}
				});
				/************* PREVIOUS NEXT BUTTONS ***************/
				var prev = element.parent().find('.owl_control .fn_prev');
				var next = element.parent().find('.owl_control .fn_next');
				prev.on('click',function(){
					element.trigger('prev.owl');
					return false;
				});
				next.on('click',function(){
					element.trigger('next.owl');
					return false;
				});
			});
			
			var carouselGamma = $('.modulify_carousel_square.gamma .owl-carousel');
			carouselGamma.each(function(){
				var element = $(this);
				element.owlCarousel({
					margin:0,
					loop:true,
					autoWidth:false,
					items: 3,
					dots: false,
					nav: false,
					autoplay:false,
					responsiveClass:true,
					responsive:{
						0:{items:1},
						480:{items:1},
						768:{items:2},
						1040:{items:2},
						1200:{items:3},
					}
				});
				/************* PREVIOUS NEXT BUTTONS ***************/
				var prev = element.parent().find('.owl_control .fn_prev');
				var next = element.parent().find('.owl_control .fn_next');
				prev.on('click',function(){
					element.trigger('prev.owl');
					return false;
				});
				next.on('click',function(){
					element.trigger('next.owl');
					return false;
				});
			});
			
			var carouselMini = $('.modulify_carousel_square.mini .owl-carousel');
			carouselMini.each(function(){
				var element = $(this);
				element.owlCarousel({
					margin:10,
					loop:true,
					autoWidth:false,
					items: 5,
					dots: false,
					nav: false,
					autoplay:false,
					responsiveClass:true,
					responsive:{
						0:{items:1},
						480:{items:1},
						768:{items:2},
						1040:{items:3},
						1200:{items:4},
						1300:{items:5},
					}
				});
				/************* PREVIOUS NEXT BUTTONS ***************/
				var prev = element.parent().find('.owl_control .fn_prev');
				var next = element.parent().find('.owl_control .fn_next');
				prev.on('click',function(){
					element.trigger('prev.owl');
					return false;
				});
				next.on('click',function(){
					element.trigger('next.owl');
					return false;
				});
			});
			
			var carouselNumbered = $('.modulify_carousel_square.numbered .owl-carousel');
			carouselNumbered.each(function(){
				var element = $(this);
				element.owlCarousel({
					margin:0,
					loop:false,
					autoWidth:false,
					items: 5,
					dots: false,
					nav: false,
					autoplay:false,
					responsiveClass:true,
					responsive:{
						0:{items:1},
						480:{items:2},
						768:{items:2},
						1040:{items:3},
						1200:{items:4},
						1300:{items:5},
					}
				});
				/************* PREVIOUS NEXT BUTTONS ***************/
				var prev = element.parent().find('.numbered_control .n_prev');
				var next = element.parent().find('.numbered_control .n_next');
				prev.on('click',function(){
					element.trigger('prev.owl');
					return false;
				});
				next.on('click',function(){
					element.trigger('next.owl');
					return false;
				});
			});

		},
		miniTriggerTopOffset: function(){
			var carouselMini = $('.modulify_carousel_square.mini');
			carouselMini.each(function(){
				var element = $(this);
				var prev = element.find('.owl_control .fn_prev');
				var next = element.find('.owl_control .fn_next');
				var imgH = element.find('.mini_img_holder img').height()/2;
				prev.css({top:imgH});
				next.css({top:imgH});
			});
		},
		carouselCircleAllFunctions: function(){
			$('.modulify_carousel_circle.alpha').each(function(){
				var images 			= $(this).find('.img-slider');
				var content 		= $(this).find('.content-slider');
				
				var imagesSlider 	= new Freniwiper(images, {
					centeredSlides: true,
					slideToClickedSlide: true,
					slidesPerView: 1,
					spaceBetween: 0,
					preloadImages: false,
					lazyLoading: true,
					freeModeSticky: true,
					initialSlide:2
				});
				var contentSlider = new Freniwiper( content, {
					slidesPerView: 1,
					initialSlide:2,
					slideToClickedSlide: true,
					spaceBetween: 0,
					centeredSlides: true,
					autoplayDisableOnInteraction: true,
					effect: 'fade',
					nextButton: content.find('.fn_next'),
					prevButton: content.find('.fn_prev'),
				});
				contentSlider.params.control = imagesSlider;
				imagesSlider.params.control = contentSlider;
			});
			
			$('.modulify_carousel_circle.beta').each(function(){
				var images 			= $(this).find('.img-slider');
				var content 		= $(this).find('.content-slider');
				
				var imagesSlider 	= new Freniwiper(images, {
					centeredSlides: true,
					slideToClickedSlide: true,
					slidesPerView: 5,
					spaceBetween: 0,
					preloadImages: false,
					lazyLoading: true,
					freeModeSticky: true,
					initialSlide:2, // start from 3rd slide
					nextButton: images.find('.fn_next'),
					prevButton: images.find('.fn_prev'),
					breakpoints: {
					480: {
					  	slidesPerView: 1,
						spaceBetween: 20,
					},
					1200: {
					  	slidesPerView: 3
					}
				  }
				});
				var contentSlider = new Freniwiper( content, {
					slidesPerView: 1,
					initialSlide:2,
					slideToClickedSlide: true,
					spaceBetween: 0,
					centeredSlides: true,
					autoplayDisableOnInteraction: true,
					effect: 'slide',
				});
				contentSlider.params.control = imagesSlider;
				imagesSlider.params.control = contentSlider;
			});
			
			$('.modulify_carousel_circle.gamma').each(function(){
				var images 			= $(this).find('.img-slider');
				var content 		= $(this).find('.content-slider');
				
				var imagesSlider 	= new Freniwiper(images, {
					centeredSlides: true,
					slideToClickedSlide: true,
					slidesPerView: 1,
					spaceBetween: 0,
					preloadImages: false,
					lazyLoading: true,
					freeModeSticky: true,
					initialSlide:0,
					nextButton: images.find('.fn_next'),
					prevButton: images.find('.fn_prev'),
				});
				var contentSlider = new Freniwiper( content, {
					slidesPerView: 1,
					initialSlide:0,
					slideToClickedSlide: true,
					spaceBetween: 0,
					centeredSlides: true,
					autoplayDisableOnInteraction: true,
				});
				contentSlider.params.control = imagesSlider;
				imagesSlider.params.control = contentSlider;
			});
			
			$('.modulify_carousel_circle.numbered').each(function(){
				var images 			= $(this).find('.img_slider_in');
				var content 		= $(this).find('.content-slider');
				
				var imagesSlider 	= new Freniwiper(images, {
					centeredSlides: true,
					slideToClickedSlide: true,
					slidesPerView: 5,
					spaceBetween: 0,
					preloadImages: false,
					lazyLoading: true,
					initialSlide:2,
					nextButton: images.find('.fn_next'),
					prevButton: images.find('.fn_prev'),
					breakpoints: {
						480: {
							slidesPerView: 1,
						},
						1200: {
							slidesPerView: 3,
						},
						3000: {
							slidesPerView: 5,
						},
					}
				});
				var contentSlider = new Freniwiper( content, {
					slidesPerView: 1,
					initialSlide:2,
					slideToClickedSlide: true,
					spaceBetween: 0,
					centeredSlides: true,
				});
				contentSlider.params.control = imagesSlider;
				imagesSlider.params.control = contentSlider;
			});
			
			$('.modulify_carousel_circle.numbered2').each(function(){
				var images 			= $(this).find('.img_slider_in');
				var content 		= $(this).find('.content-slider');
				
				var imagesSlider 	= new Freniwiper(images, {
					centeredSlides: true,
					slideToClickedSlide: true,
					slidesPerView: 5,
					spaceBetween: 0,
					preloadImages: false,
					lazyLoading: true,
					initialSlide:2,
					nextButton: images.find('.fn_next'),
					prevButton: images.find('.fn_prev'),
					breakpoints: {
						480: {
							slidesPerView: 1,
						},
						1200: {
							slidesPerView: 3,
						},
						3000: {
							slidesPerView: 5,
						},
					}
				});
				var contentSlider = new Freniwiper( content, {
					slidesPerView: 1,
					initialSlide:2,
					slideToClickedSlide: true,
					spaceBetween: 0,
					centeredSlides: true,
				});
				contentSlider.params.control = imagesSlider;
				imagesSlider.params.control = contentSlider;
			});
		},
		carouselWithContentAllFunctions: function(){
			$('.modulify_carousel_with_content').each(function(){
				var images 			= $(this).find('.img-slider');

				var imagesSlider 	= new Freniwiper(images, {
					centeredSlides: false,
					slideToClickedSlide: true,
					slidesPerView: 'auto',
					spaceBetween: 30,
					preloadImages: false,
					lazyLoading: false,
					initialSlide:0,
					nextButton: images.find('.fn_next'),
					prevButton: images.find('.fn_prev'),
					breakpoints: {
						768: {
							slidesPerView: 1,
						},
						769: {
							slidesPerView: 'auto'
						}
					}
				});
			});
		},
		listAllFunctions: function(){
			if(jQuery().isotope) {
				var listWrap = $('.modulify_all_list_wrap');
				listWrap.each(function(){
					var listContent = $(this);
					var list 		= listContent.find('.modulify_list');
					var filter 		= listContent.find('.modulify_filter');

					// Run Isotope  
					list.isotope({
						filter				: '*',
						layoutMode   		: 'masonry',
						animationOptions	: {
							duration			: 750,
							easing				: 'linear',
							queue				: false
						}
					});	
					list.isotope( 'reloadItems' );

					if(filter.length){
						// Isotope Filter 
						filter.find('a').on('click', function(){
							var selector = $(this).attr('data-filter');
							list.isotope({ 
								filter				: selector,
								animationOptions	: {
									duration			: 750,
									easing				: 'linear',
									queue				: false
								}
							});
							return false;
						});	

						// Change active element class
						filter.find('a').on('click', function() {
							filter.find('a').removeClass('current');
							$(this).addClass('current');
							return false;
						});	
					}
				});

			}
		},
		listJustifiedFunction: function(){
			var justified = $(".modulify_justified_images");
			justified.each(function(){
				var element 	= $(this);
				var justHeight	= element.attr('data-img-height');
				var justGutter	= element.attr('data-img-gutter');
				if(typeof(justHeight) !== 'undefined' && typeof(justGutter) !== 'undefined'){
					if(justHeight !== ''){justHeight = justHeight;}
					if(justGutter !== ''){justGutter = justGutter;}
				}else{justHeight = 250;justGutter = 20;}
				element.justifiedGallery({
					rowHeight : justHeight,
					lastRow : 'nojustify',
					margins : justGutter,
					refreshTime: 500,
					refreshSensitivity: 0,
					maxRowHeight: null,
					border: 0,
					captions: true,
					randomize: false
				});
			});	
		},
		sliderAlphaFunction: function(){
			$('.modulify_slider_alpha').each(function(){
				var images 			= $(this);
				var autoplaySwitch 	= images.data('autoplay-switch');
				var autoplayTime;
				if(autoplaySwitch === 'enabled'){
					autoplayTime = images.data('autoplay-time');
				}else{
					autoplayTime = false;
				}
				var imagesSlider 	= new Freniwiper(images, {
					centeredSlides: false,
					slideToClickedSlide: true,
					slidesPerView: 1,
					spaceBetween: 0,
					preloadImages: false,
					lazyLoading: false,
					autoplay: autoplayTime,
        			autoplayDisableOnInteraction: false,
					initialSlide:0,
					nextButton: images.find('.fn_next'),
					prevButton: images.find('.fn_prev'),
					effect: 'fade',
					loop: true
				});
			});
		},
		sliderBetaFunction: function(){
			$('.slider_version').each(function(){
				var images 				= $(this).find('.modulify_slider_beta');
				var autoplaySwitch 	= images.data('autoplay-switch');
				var autoplayTime;
				if(autoplaySwitch === 'enabled'){
					autoplayTime = images.data('autoplay-time');
				}else{
					autoplayTime = false;
				}
				var imagesSlider 		= new Freniwiper(images, {
					centeredSlides: false,
					slideToClickedSlide: true,
					slidesPerView: 1,
					spaceBetween: 0,
					nextButton: images.find('.fn_next'),
					prevButton: images.find('.fn_prev'),
					effect: 'fade',
					loop: false,
					autoplay: autoplayTime
					
				});
				var pagination			= $(this).find('.beta_pagination');
				var paginationSlider 	= new Freniwiper(pagination, {
					centeredSlides: false,
					slideToClickedSlide: true,
					slidesPerView: 1,
					spaceBetween: 0,
					loop: false,
				});
				
				paginationSlider.params.control = imagesSlider;
				imagesSlider.params.control = paginationSlider;
			});
		},
		sliderGammaFunction: function(){
			$('.slider_version').each(function(){
				var images 				= $(this).find('.modulify_slider_gamma');
				var autoplaySwitch 	= images.data('autoplay-switch');
				var autoplayTime;
				if(autoplaySwitch === 'enabled'){
					autoplayTime = images.data('autoplay-time');
				}else{
					autoplayTime = false;
				}
				var imagesSlider 		= new Freniwiper(images, {
					centeredSlides: false,
					slideToClickedSlide: true,
					slidesPerView: 1,
					spaceBetween: 0,
					nextButton: images.find('.fn_next'),
					prevButton: images.find('.fn_prev'),
					effect: 'fade',
					loop: false,
					autoplay: autoplayTime
				});
				var pagination			= $(this).find('.gamma_pagination');
				var paginationSlider 	= new Freniwiper(pagination, {
					centeredSlides: false,
					slideToClickedSlide: true,
					slidesPerView: 1,
					spaceBetween: 0,
					loop: false,
					
				});
				
				paginationSlider.params.control = imagesSlider;
				imagesSlider.params.control = paginationSlider;
			});
		},
		sliderDeltaFunction: function(){
			$('.slider_version').each(function(){
				var images 				= $(this).find('.modulify_slider_delta');
				var autoplaySwitch 	= images.data('autoplay-switch');
				var autoplayTime;
				if(autoplaySwitch === 'enabled'){
					autoplayTime = images.data('autoplay-time');
				}else{
					autoplayTime = false;
				}
				var imagesSlider 		= new Freniwiper(images, {
					centeredSlides: false,
					slideToClickedSlide: true,
					slidesPerView: 1,
					spaceBetween: 0,
					nextButton: images.find('.fn_next'),
					prevButton: images.find('.fn_prev'),
					effect: 'fade',
					loop: false,
					autoplay: autoplayTime
				});
				var pagination			= $(this).find('.delta_pagination');
				var paginationSlider 	= new Freniwiper(pagination, {
					centeredSlides: false,
					slideToClickedSlide: true,
					slidesPerView: 1,
					spaceBetween: 0,
					loop: false,
				});
				
				paginationSlider.params.control = imagesSlider;
				imagesSlider.params.control = paginationSlider;
			});
		},
		sliderEpsilonFunction: function(){
			$('.slider_version').each(function(){
				var images 				= $(this).find('.modulify_slider_epsilon');
				var autoplaySwitch 	= images.data('autoplay-switch');
				var autoplayTime;
				if(autoplaySwitch === 'enabled'){
					autoplayTime = images.data('autoplay-time');
				}else{
					autoplayTime = false;
				}
				var imagesSlider 		= new Freniwiper(images, {
					centeredSlides: false,
					slideToClickedSlide: true,
					slidesPerView: 1,
					spaceBetween: 0,
					nextButton: images.find('.fn_next'),
					prevButton: images.find('.fn_prev'),
					effect: 'fade',
					loop: false,
					autoplay: autoplayTime
				});
				var pagination			= $(this).find('.epsilon_pagination');
				var paginationSlider 	= new Freniwiper(pagination, {
					centeredSlides: false,
					slideToClickedSlide: true,
					slidesPerView: 1,
					spaceBetween: 0,
					loop: false,
					
				});
				
				paginationSlider.params.control = imagesSlider;
				imagesSlider.params.control = paginationSlider;
			});
		},
		sliderZetaFunction: function(){
			$('.slider_version').each(function(){
				var images 				= $(this).find('.modulify_slider_zeta');
				var autoplaySwitch 	= images.data('autoplay-switch');
				var autoplayTime;
				if(autoplaySwitch === 'enabled'){
					autoplayTime = images.data('autoplay-time');
				}else{
					autoplayTime = false;
				}
				var imagesSlider 		= new Freniwiper(images, {
					centeredSlides: false,
					slideToClickedSlide: true,
					slidesPerView: 1,
					spaceBetween: 0,
					nextButton: images.find('.fn_next'),
					prevButton: images.find('.fn_prev'),
					effect: 'fade',
					loop: false,
					autoplay: autoplayTime
				});
				var zetaPagination		= $(this).find('.zeta_pagination');
				var paginationSlider 	= new Freniwiper(zetaPagination, {
					centeredSlides: false,
					slideToClickedSlide: true,
					slidesPerView: 1,
					spaceBetween: 0,
					loop: false,
				});
				
				paginationSlider.params.control = imagesSlider;
				imagesSlider.params.control = paginationSlider;
			});
		},
		modulify_fn_lightbox: function(){
			if(jQuery().lightGallery){
				// FIRST WE SHOULD DESTROY LIGHTBOX FOR NEW SET OF IMAGES

				var gallery = jQuery('.modulify_fn_lightbox');

				gallery.each(function(){
					var element = jQuery(this);
					element.lightGallery(); // binding
					if(element.length){element.data('lightGallery').destroy(true); }// destroying
					jQuery(this).lightGallery({
						selector: ".lightbox",
						thumbnail: 1,
						loadYoutubeThumbnail: !1,
						loadVimeoThumbnail: !1,
						showThumbByDefault: !1,
						mode: "lg-fade",
						download:!1,
						getCaptionFromTitleOrAlt:!1,
					});
				});
			}	

		}
		
	};
	
	$( window ).on( 'elementor/frontend/init', Modulify.init );
	$(window).on('resize',function(){Modulify.miniTriggerTopOffset();});
	$(window).on('load',function(){Modulify.miniTriggerTopOffset();Modulify.listAllFunctions();});
	
	
})(jQuery, window.elementorFrontend);