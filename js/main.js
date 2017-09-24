
$(document).ready(DocReady);

function DocReady()
{       
	slider();

	homeSlider();

	portfolioItems();
	topFooterSlider();

	portfolioFilters();

	
}
$(function () {
	$('ul#services>li').mouseenter(function() {
		var val = $(this).children('.come').html();
		$('.content>.come').html(val);
	});
})
function slider(){	
	var ie7 = (document.all && !window.opera && window.XMLHttpRequest) ? true : false;

	var slider = $('#slider-container');
	var currentClass = false;
	var instanced = false;	
	
	$('.button-close').click(function() {		
		if(ie7)
			$('.portfolio-item').hide();
			
		slider.slideUp('normal');
	});
	
	$('.left-arrow').click(function() {
		var self = $(this);
		
		var parent = self.parent().parent().parent();
		var prevItem = parent.prev();
		var lastChild = $('#portfolio-items-slider > div').last();
				
		$('#portfolio-items-slider .portfolio-item').hide();
		
		slider.slideUp('normal', function(){
			slider.slideDown('normal', function(){
				if(prevItem.length)
				{
					prevItem.show();
				} 
				else
				{
					lastChild.show();
				}			
			});
		});
		
		if(!instanced) 
		{
			instanced = true;
			setUpSlider()
		}
		
		goToPorfolio();	
	});
	
	$('.right-arrow').click(function() {
		var self = $(this);
		
		var parent = self.parent().parent().parent();
		var nextItem = parent.next();
		var firstChild = $('#portfolio-items-slider > div').first();			
		
		$('#portfolio-items-slider .portfolio-item').hide();
		
		slider.slideUp('normal', function(){
			slider.slideDown('normal', function() {
				if(nextItem.length)
				{
					nextItem.show();
				} 
				else
				{
					firstChild.show();
				}			
			});
		});
		
		if(!instanced) 
		{
			instanced = true;
			setUpSlider()
		}
		
		goToPorfolio();	
	});	
	
	$('ul#portfolio-items li a').click(function() {
		var slider = $('#slider-container');
		var clickedClass = $(this).attr('class');
		
		$('#portfolio-items-slider .portfolio-item').hide();
		
		if(slider.is(':hidden'))
		{
			slider.slideDown('normal', function(){
				$('#portfolio-items-slider .' + clickedClass).fadeIn();
				goToPorfolio();			
			});
		} else {
			slider.slideUp('normal', function(){
				slider.slideDown('normal', function(){
					$('#portfolio-items-slider .' + clickedClass).fadeIn();
				});				
			});
			goToPorfolio();
		}
		
		if(!instanced) 
		{
			instanced = true;
			setUpSlider()
		}

		currentClass = clickedClass;	
	});
}
function setUpSlider()
{
	$('.portfolio-slider-containter').slides({
		container: 'portfolio-slides',
		paginationClass: 'portfolio-item-pagination',
		autoHeight: false,
		preload: false,
		generatePagination: true,
		effect: 'slide',
		slideSpeed: 650,
		play: 3000,
		pause: 2000,
		hoverPause: true
	});	
}

function portfolioFilters(){
	var container = $('#portfolio-items');
	container.isotope({
		animationEngine : 'jquery',
		animationOptions: {
			duration: 600,
			easing: 'linear',
			queue: false
		}
	});

	// filter items when filter link is clicked
	$('ul#filters a').click(function() {
		var self = $(this);
		var selectClass = 'selected';

		$('ul#filters .' + selectClass).removeClass(selectClass);
		self.parent().addClass(selectClass);

		var filterVal = self.attr('data-filter');
		container.isotope({ filter: filterVal });
			
		return false;
	});
}

function homeSlider(){
	var homeSlider = $('#home-slider');

	if(homeSlider.length != 0)
	{
		homeSlider.bxSlider({
			'auto'     : true,
			'nextText' : '',
			'prevText' : ''
		});
	}	
}
function portfolioItems(){
	var portfolioItemsImgs = $('#portfolio-items li a');
	
	if(portfolioItemsImgs.length != 0)
	{
		portfolioItemsImgs.BlackAndWhite();
	}
}

function topFooterSlider(){
	var footerContainer = $('#top-footer');
	var arrowUp         = $('.top-footer-up');
	var arrowDown       = $('.top-footer-down');

	arrowDown.click(function() {
		$(this).slideUp('normal', function() {
			footerContainer.slideDown('normal');
		});
	});
	arrowUp.click(function() {
		footerContainer.slideUp('normal', function() {
			arrowDown.slideDown('normal');
		});
	});	
}

function goToPorfolio(){
     	$('html,body').animate({scrollTop: ($("#slider-container").offset().top)},'slow');
}
