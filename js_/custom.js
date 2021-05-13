//Go to top
$(document).ready(function(){ 
    $(window).scroll(function(){ 
        if ($(this).scrollTop() > 100) { 
            $('#goto_top').fadeIn(); 
        } else { 
            $('#goto_top').fadeOut(); 
        } 
    }); 
    $('#goto_top').click(function(){ 
        $("html, body").animate({ scrollTop: 0 }, 600);
        return false; 
    }); 
});


//Product Slider
$('.owl-carousel').owlCarousel({
  loop: true,
  margin: 0,
  nav: true,
  navText: [
    "<i class='fa fa-arrow-left'></i>",
    "<i class='fa fa-arrow-right'></i>"
  ],
  autoplay: true,
  autoplayHoverPause: true,
  responsive: {
    0: {
      items: 1
    },
    576: {
      items: 2
    },
    991: {
      items: 2
    },
    992: {
      items: 3
    }
  }
})
