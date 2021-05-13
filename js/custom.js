//var AWSURL = 'https://s3-ap-southeast-1.amazonaws.com/www.cartwire.co/widget/cw';
var elms = $(".cw_container");
//$(document.body).on('touchmove', onScroll); // for mobile
//$(window).on('scroll', onScroll); 
var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);


$(document).ready(function () {
	//$(".cw_container").hide();
	//$(".cw_container").css("opacity", 0);
	//$(".cw_container").css("transition", "opacity 2s");
	if (isMobile) {
		//$(".cw_container").hide();
		//$(".cw_container").css("opacity", 0);
		//$(".cw_container").css("transition", "opacity 2s");
		//elms[0].style.display = "block";

	} else {
	
	}
	$(".cw_container").hide();
	$(".cw_container").css("opacity", 0);
	$(".cw_container").css("transition", "opacity 2s");
	var n = elms.length;
	var win = $(window);
	var i = 0;

	if (window.matchMedia("(max-width: 767px)").matches) {
		// The viewport is less than 768 pixels wide
		$(".exampleSlider .item:first").addClass('active');
		$(".cw_product_list li").addClass('active');
	} else {
		// The viewport is at least 768 pixels wide
		//alert("This is a tablet or desktop.");
	}

	//$(document.body).touchmove(function () {

	//	if ($(document).height() - win.height() <= win.scrollTop()) {
	//		loadsWidget(n, i);
	//		i++;

	//	}
	//});
	$(".cw_banner").on('swipeleft', function () {
		alert(123456);
	});

	$(window).scroll(function () {
		if ($(window).scrollTop() <= $(document).height() - window.visualViewport.height) {
			loadsWidget(n, i);
			i++;
		}

	});

	//$(window).on('scroll', (function () {
	//		if ($(document).height() - win.height() <= win.scrollTop()) {
	//			loadsWidget(n, i);
	//			i++;

	//		}
	//	})
	//		);

	$(".cw_btn_load").click(function () {
		$(this).parents(".cw_container").children(".cw_product_list").children('li').removeClass("cw_hide");
		$(this).hide();
	});

});

function cwWidgetLoader() {
	var cwLoaderContainer = document.getElementById('siteLoader_cw');
	if (cwLoaderContainer != null) {
		cwLoaderContainer.parentNode.removeChild(cwLoaderContainer);
	}
	var loader = document.createElement("div");
	loader.id = "siteLoader_cw";
	loader.innerHTML = '';
	//loader.innerHTML = '<div class="dialog_popup_loaderWrap_cw" style="position:fixed;top:0;left:0;height:100%;width:100%;background:rgba(15, 15, 15, 0.8);opacity:.5;text-align:center;vertical-align:middle;z-index:999999999;text-align:center;"><span style="background:url(' + AWSURL + '/v2.0/images/processing.gif) no-repeat 0 0;width:60px;height:60px;display:block;position: absolute;top: 0;left: 0;right: 0;bottom: 0;margin: auto;"></span></div>';
	loader.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; display: block; shape-rendering: auto;" width="150px" height="150px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">		<circle cx = "84" cy = "50" r = "10" fill = "#b83128" >    <animate attributeName="r" repeatCount="indefinite" dur="0.25s" calcMode="spline" keyTimes="0;1" values="10;0" keySplines="0 0.5 0.5 1" begin="0s"></animate>    <animate attributeName="fill" repeatCount="indefinite" dur="1s" calcMode="discrete" keyTimes="0;0.25;0.5;0.75;1" values="#b83128;#fefefe;#e9b6ae;#ce6260;#b83128" begin="0s"></animate></circle ><circle cx="16" cy="50" r="10" fill="#b83128">  <animate attributeName="r" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="0s"></animate>  <animate attributeName="cx" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="0s"></animate></circle><circle cx="50" cy="50" r="10" fill="#ce6260">  <animate attributeName="r" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.25s"></animate>  <animate attributeName="cx" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.25s"></animate></circle><circle cx="84" cy="50" r="10" fill="#e9b6ae">  <animate attributeName="r" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.5s"></animate>  <animate attributeName="cx" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.5s"></animate></circle><circle cx="16" cy="50" r="10" fill="#fefefe">  <animate attributeName="r" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.75s"></animate>  <animate attributeName="cx" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.75s"></animate></circle>';
	document.body.appendChild(loader);
}
function loadsWidget(n, i) {
	cwWidgetLoader();
	if (n <= i) {
		$("#siteLoader_cw").hide();
	}

	setTimeout(function () {
		if (n > i) {

			elms[i].style.display = "block";
			window.setTimeout(function () {
				elms[i].style.opacity = 1;

				elms[i].style.transition = "opacity 2s";
			}, 0);

			clearTimeout(loadsWidget);
			$("#siteLoader_cw").hide();
		}
	}, 1000);
}
//loadsWidget();