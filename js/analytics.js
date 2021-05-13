//Digital Data Event
var arr = [];
var currentScrollDepth = '';

var digitalData = {};
digitalData = {
    product: [],
    trackingInfo: { GID: "D259f49db56EUK0ba77884a2a1c46cPD", tool: [{ id: "UA-38933792-10" }] },
    siteInfo: { channel: "", sitetype: "Digital 2.0" },
    page: { pageInfo: { destinationURL: "https://unilever-campaign.netlify.app/" }, category: { pageType: "Home page" } },
};

var contextualizationData = {};
var ctConstants = {};


digitalData.event = [];
var contextualizationData = {};

(digitalData.trackingInfo = {}), (digitalData.trackingInfo.tool = [{}]), (digitalData.privacy = {}), (digitalData.page.attributes = {}), (digitalData.page.dmpattributes = {}), (digitalData.privacy.accessCategories = [{}]), (digitalData.privacy.accessCategories[0].domains = []), (digitalData.platform = []); digitalData.trackingInfo.tool[0] = {};
digitalData.trackingInfo.tool[1] = {}; digitalData.page.attributes.contentType = "home";

digitalData.component = [];
if (typeof digitalData.event == 'undefined') {
    digitalData.event = [];
}
digitalData.trackEvent = function (e) {
    var eventDetails = (typeof e !== 'undefined' && e.eventInfo !== 'undefined') ? e.eventInfo : '';
    if (eventDetails) {
        var eventType = typeof eventDetails.type !== 'undefined' ? eventDetails.type : '';
        var eventAction = typeof eventDetails.eventAction !== 'undefined' ? eventDetails.eventAction : '';
        var eventName = eventType + (eventAction ? '_' + eventAction : '');
        eventName = eventName.toLowerCase().replace(/ /g, '_');

        eventProducts = (typeof digitalData.product !== 'undefined') ? digitalData.product : [];
        eventComponent = (typeof digitalData.component !== 'undefined') ? digitalData.component : [];
        eventPromotions = (typeof digitalData.promotion !== 'undefined') ? digitalData.promotion : [];
        e.product = eventProducts;
        e.component = eventComponent;
        e.promotions = eventPromotions;
        digitalData.eventList[eventName] = e;
        //alert("Event Name is =" + eventName);
        //console.log('***custome event - '+eventName, e);

        var launchEvent = document.createEvent("CustomEvent");
        launchEvent.initCustomEvent("launch_event", true, true, {
            'eventName': eventName,
            'payload': e,
            'eventProducts': eventProducts,
            'eventPromotions': eventPromotions,
            'eventComponent': eventComponent
        });
        document.body.dispatchEvent(launchEvent);
    }
}
while (e = digitalData.event.shift()) {
    digitalData.trackEvent(e);
}
digitalData.event = {
    push: digitalData.trackEvent
};

digitalData.product = [];

(function (d, u) {
    var isProdEnv = "true";
    "true" != isProdEnv
        ? ((u = ("https:" == document.location.protocol ? "https://" : "http://") + "wa-uat.unileversolutions.com"),
            (digitalData.trackingInfo.GID = "D259f49db56EUK0ba77884a2a1c46cPD"),
            (digitalData.trackingInfo.tool[0].id = "UA-40462445-1"))
        : ((u = ("https:" == document.location.protocol ? "https://" : "http://") + "wa-eu.unileversolutions.com"),
            (digitalData.trackingInfo.GID = "D259f49db56EUK0ba77884a2a1c46cPD"),
            (digitalData.trackingInfo.tool[0].id = "UA-38933792-10"),
            (digitalData.trackingInfo.tool[1].id = "unilever-magnum-uk,unilever-global-allbrands")),
        (digitalData.privacy.accessCategories[0].domains[0] = "https://unilever-campaign.netlify.app/");
})(document);

//End Digital Data Event
$(document).ready(function () {
    var launchblock = document.createElement('script');


    launchblock.src = "https://assets.adobedtm.com/launch-ENfabe4aff7fd348db959a23445bf6f6da.js"
    launchblock.async = "async";
    launchblock.id = "launch";
    //launchblock.setAttribute("data-cookiescript", "accepted");
    //launchblock.setAttribute("data-cookiecategory", "analytics");
    launchblock.type = "text/javascript";
    //launchblock.className = "optanon-category-C0004";
    //launchblock.className = "optanon-category-C0004";
    document.getElementsByTagName("head")[0].appendChild(launchblock);
    //document.getElementsByTagName("head")[0].append(<script async type=\"text/plain\" data-cookiecategory=\"analytics\" data-cookiescript=\"accepted\" src=\"https://assets.adobedtm.com/launch-ENfabe4aff7fd348db959a23445bf6f6da.js\"></script>);          
    var right_click = document.getElementsByClassName("MS-right");
    var left_click = document.getElementsByClassName("MS-left");
    var arrow_click = document.getElementsByClassName("arrows");
    if (right_click) {
        for (var i = 0; i < right_click.length; i++) {
            right_click[i].onclick = function () { cwDigitalData("", "image_right_scroll_click", "") };
        }
    }
    if (left_click) {
        for (var i = 0; i < left_click.length; i++) {
            left_click[i].onclick = function () { cwDigitalData("", "image_left_scroll_click", "") };
        }



    }
    if (arrow_click) {
        for (var i = 0; i < arrow_click.length; i++) {
            arrow_click[i].onclick = function () { cwDigitalData("", "carousel_click", "") };
        }



    }

    $('img').bind('click', function (evt) {
        if ($(this).attr('title') == 'Go To Top') {
            cwDigitalData("", "anchor_click", "")
        }

    });

}).scroll(function () {
    var wintop = $(window).scrollTop(), docheight = $(document).height(), winheight = $(window).height();
    // console.log('%scrolled='+(wintop/(docheight-winheight))*100);
    var scrollDepth = [25, 50, 75, 100];
    currentScrollDepth = Math.round((wintop / (docheight - winheight)) * 100);
    if (scrollDepth.includes(currentScrollDepth)) {

        arr = { "scrollDepth": currentScrollDepth };
        cwDigitalData("", "page_scroll", arr);
    }




});


cwDigitalData = function (t, e, p) {
    digitalData.component = [];
    digitalData.eventList = [];
    digitalData.product = [];

    if (typeof digitalData.event == 'undefined') {
        digitalData.event = [];
    }
    digitalData.trackEvent = function (e) {
        var eventDetails = (typeof e !== 'undefined' && e.eventInfo !== 'undefined') ? e.eventInfo : '';
        if (eventDetails) {
            var eventType = typeof eventDetails.type !== 'undefined' ? eventDetails.type : '';
            var eventAction = typeof eventDetails.eventAction !== 'undefined' ? eventDetails.eventAction : '';
            var eventName = eventType + (eventAction ? '_' + eventAction : '');
            eventName = eventName.toLowerCase().replace(/ /g, '_');

            eventProducts = (typeof digitalData.product !== 'undefined') ? digitalData.product : [];
            eventComponent = (typeof digitalData.component !== 'undefined') ? digitalData.component : [];
            eventPromotions = (typeof digitalData.promotion !== 'undefined') ? digitalData.promotion : [];
            e.product = eventProducts;
            e.component = eventComponent;
            e.promotions = eventPromotions;
            digitalData.eventList[eventName] = e;
            var launchEvent = document.createEvent("CustomEvent");
            launchEvent.initCustomEvent("launch_event", true, true, {
                'eventName': eventName,
                'payload': e,
                'eventProducts': eventProducts,
                'eventPromotions': eventPromotions,
                'eventComponent': eventComponent
            });
            document.body.dispatchEvent(launchEvent);
        }
    }

    switch (e) {
        case "country_list":
            var ev = {};
            ev.eventInfo = {
                'type': ctConstants.trackEvent,
                'eventAction': ctConstants.linkClick,
                'eventLabel': "Online-CountryClick",// eLabel,
                'eventValue': 1,
            };
            ev.category = { 'primaryCategory': ctConstants.conversion }
            ev.subcategory = "Lead";
            digitalData.event.push(ev);
            // while (e = digitalData.event.shift()) {
            digitalData.trackEvent(e);
            //}
            digitalData.event = {
                push: digitalData.trackEvent
            };
            break;
        case "product_click":
            digitalData.product.push(
                {
                    'productInfo': {
                        'productID': p.productID,
                        'productName': p.productName,
                        'price': "",
                        'brand': p.brand,
                        'quantity': "1"
                    }
                });
            var ev = {};
            ev.eventInfo = {
                'type': ctConstants.trackEvent,
                'eventAction': ctConstants.productclick,
                'eventLabel': "Online-" + p.productName,// eLabel,
                'eventValue': 1,
            };
            ev.category = { 'primaryCategory': ctConstants.conversion }
            ev.subcategory = "Lead";
            digitalData.event.push(ev);
            // while (e = digitalData.event.shift()) {
            digitalData.trackEvent(e);
            //}
            digitalData.event = {
                push: digitalData.trackEvent
            };

            break;

        case "carousel_click":

            var ev = {};
            ev.eventInfo = {
                'type': ctConstants.trackEvent,
                'eventAction': ctConstants.carouselClick,
                'eventLabel': "Online-CarouselClick",// eLabel,
                'eventValue': 1,
            };
            ev.category = { 'primaryCategory': ctConstants.engagement }
            ev.subcategory = "Interest";
            digitalData.event.push(ev);
            // while (e = digitalData.event.shift()) {
            digitalData.trackEvent(e);
            //}
            digitalData.event = {
                push: digitalData.trackEvent
            };

            break;


        case "image_right_scroll_click":

            var ev = {};
            ev.eventInfo = {
                'type': ctConstants.trackEvent,
                'eventAction': ctConstants.imagerightscrollclick,
                'eventLabel': "Online-ImageRightScrollClick",// eLabel,
                'eventValue': 1,
            };
            ev.category = { 'primaryCategory': ctConstants.engagement }
            ev.subcategory = "Interest";
            digitalData.event.push(ev);
            digitalData.trackEvent(e);
            digitalData.event = {
                push: digitalData.trackEvent
            };

            break;
        case "image_left_scroll_click":

            var ev = {};
            ev.eventInfo = {
                'type': ctConstants.trackEvent,
                'eventAction': ctConstants.imageleftscrollclick,
                'eventLabel': "Online-ImageLeftScrollClick",// eLabel,
                'eventValue': 1,
            };
            ev.category = { 'primaryCategory': ctConstants.engagement }
            ev.subcategory = "Interest";
            digitalData.event.push(ev);
            digitalData.trackEvent(e);
            digitalData.event = {
                push: digitalData.trackEvent
            };

            break;
        case "page_scroll":

            var ev = {};
            ev.eventInfo = {
                'type': ctConstants.trackEvent,
                'eventAction': ctConstants.pageScroll,
                'eventLabel': "Scroll Depth - " + p.scrollDepth + '%',// eLabel,
                'eventValue': 1,
            };
            ev.attributes = {
                'nonInteractive': {
                    'nonInteraction': 1
                }
            };
            ev.category = { 'primaryCategory': ctConstants.custom }
            ev.subcategory = "";
            digitalData.event.push(ev);
            digitalData.trackEvent(e);
            digitalData.event = {
                push: digitalData.trackEvent
            };

            break;
        case "anchor_click":

            var ev = {};
            ev.eventInfo = {
                'type': ctConstants.trackEvent,
                'eventAction': ctConstants.anchorLinkClicked,
                'eventLabel': "Online-AnchorLinkClicked",// eLabel,
                'eventValue': 1,
            };
            ev.category = { 'primaryCategory': ctConstants.engagement }
            ev.subcategory = "Interest";
            digitalData.event.push(ev);
            digitalData.trackEvent(e);
            digitalData.event = {
                push: digitalData.trackEvent
            };

            break;
        case "shop_now":
            digitalData.product.push(
                {
                    'productInfo': {
                        'productID': p.productID,
                        'productName': p.productName,
                        'price': "",
                        'brand': p.brand,
                        'quantity': "1"
                    }
                });
            var ev = {};
            ev.eventInfo = {
                'type': ctConstants.trackEvent,
                'eventAction': ctConstants.purchase,
                'eventLabel': "Online-" + p.productName,// eLabel,
                'eventValue': 1,
            };
            ev.category = { 'primaryCategory': ctConstants.conversion }
            ev.subcategory = "Lead";
            digitalData.event.push(ev);

            digitalData.trackEvent(e);

            digitalData.event = {
                push: digitalData.trackEvent
            };

            break;
        case "retailer_click":
            digitalData.product.push(
                {
                    'productInfo': {
                        'productID': p.productID,
                        'productName': p.productName,
                        'price': "",
                        'brand': p.brand,
                        'quantity': "1"
                    }
                });
            var ev = {};
            ev.eventInfo = {
                'type': ctConstants.trackEvent,
                'eventAction': ctConstants.retailerClick,
                'eventLabel': "Online-" + p.productName + "|" + p.retailerName,// eLabel,
                'eventValue': 1,
            };
            ev.category = { 'primaryCategory': ctConstants.conversion }
            ev.subcategory = "Lead";
            digitalData.event.push(ev);

            digitalData.trackEvent(e);

            digitalData.event = {
                push: digitalData.trackEvent
            };

            break;
    }
}

