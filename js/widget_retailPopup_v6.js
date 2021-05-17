/*
 * @PageName: widget_retailPopup.js
 * @Company Name: STPL
 * @Author: Vishal Nigam, Ajeet Victor & Mohit Awasthi
 * @Purpose: Generate widget & Key checking process
 * @Date: 17-July-2014
 * Start Jquery initalize 
 */ 
var serverPath, cdnPath, $CW, cwAppUrl="", masterCssFilePath, cssFilePath, cwOverlayCssClass, cwStructureCss, cwConditionalCss = [], cwWidgetWrapCss, loadCheck = 1, cwData, cwButtonText, cwContainerClass, customData = 0, cwTwoOverlay = [], cwVersion, checkRefresh = 1, chkThemeID = '', variantChngChk = 1, cwWV = navigator.userAgent.indexOf('cw_WV');
var scripts = document.getElementsByTagName('script'), makeWidgetStructure, getCountryRetialer, cwSetIndex, closes, iPadMakeWidgetStructure, cwTabChange, cwShowMap, cwOpenInMap, cwGetLocation, cwBrandName=[],cwUnvailableMsg, cwBtnTxt, cwMsgTxt, cwMsgContainCl, isAvailMsg, widgetCode = [], countryCode = 0, countryChk = 0 , showAvailableOnly = [] ,showAvailableOnlyClass = [], cwPriceParentCss=[], horizontalL, cwWidCls, cntName = "", showOfferStatus,cwDisclaimerTxt, cwSelInx,discOutStock, discOutStock2="", discOutStock2="", cwCountryChk = 0, buyInStoreTxt=[], nearStoreTxt=[],postalAddTxt=[],currentLocTxt=[],searchTxt=[],nearStoresTxt=[],openInMapTxt=[],showHideTxt='',cwInitMap, cwLat, cwLong, cwMaps, cwGeocoder,cwProductEan,cwStoreListClick,cwGPStData={},cwGMChk=1,cwGeocodeLatLng,cwInfowindow,cwCurPos,cwGetLoc,cwMarker, cwGetStorePro, cwMakeGMPop, stockGPRow,cwLoc,cwMarkersArr=[],cwShStLoc,cwBounds,cwchkEAN,cwNoStoreTxt,cwNoStoreDesc,cwContactTxt,cwContactUrl,cwCloseTxt,cwResultTxt,cwImperialTxt,cwMetricTxt,initAutoComplete, cwCurPosClient = null,cwAddViewCall,cwMyIP,cwWidgetID,cwSearchCallChk=1,cwPavId,cwVarName='',cwVarID='',cwVarInx=0,cwMode=1,viewMode="",proName="",brandNm="",pId=0;
var arr = [];
/*for (var i = 0; i < scripts.length; i++) {
    var src = scripts[i].src.indexOf(jsFileName);
    if (src > 0) {
        var a = document.createElement("a");
        a.href = scripts[i].src;
        a.style.display = "none";
        var refPath = a.href.split('/');
        cdnPath = refPath[0] + '//' + refPath[2] + '/' + refPath[3] + '/' + refPath[4];
        var cwS = refPath[3].split('.');        
        if(window.location.hostname == 'cwqa.srmtechsol.com'){
            cdnPath = refPath[0]+'//'+refPath[2]+'/'+refPath[3]+'/'+refPath[4]+'/'+refPath[5];
            serverPath = 'https://cwqa.srmtechsol.com/SNWLive';
        }else{
            cdnPath = refPath[0]+'//'+refPath[2]+'/'+refPath[3]+'/'+refPath[4]+'/'+refPath[5];
            serverPath = 'https://cwqa.srmtechsol.com/SNWLive';
        }
        break;
    }
}*/
function getChildUrlData(url, cwId, ip, clientUrl, retailerId, productId, productName, category, productPrice,productVariant,retailerName,quantity,cwPriSym) {
  
  arr = { "productID": productId, "productName": unescape(productName), "price": "", "brand": cwBrandName, "quantity": "","retailerName" :retailerName}
   cwDigitalData("", "retailer_click", arr);
    if (cwId.indexOf('&') > 0) {
        cwId = cwId.split('&')[0];
    }
    if(countryList.errorCode == 5){
        var compUrl =  serverPath + "/widget_price_theme";
    }else{
        var compUrl =  serverPath + "/widget_theme";
    }
    if(productVariant == "undefined"){
        productVariant="";
    }
    cwPriSymTemp = cwPriSym+productPrice;
    if(productPrice== "null"){
        cwPriSymTemp =''; 
    }
    /* Analytic Callback Function */
    if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0) {
        var cwEvent = document.createEvent("CustomEvent");
        cwEvent.initCustomEvent('cwwidget_open', false, false,
            JSON.stringify({
                "productId":productId,
                "productName":productName,
                "category":category,
                "productPrice":cwPriSymTemp,
                "quantity":quantity,
                "brandName":cwBrandName,
                "productVariant":productVariant,
                "retailerName":retailerName,
                "country":cntName
            })
        );
        document.dispatchEvent(cwEvent); 
    }else{
        var cwEvent = new CustomEvent("cwwidget_open", {
            detail: {
                "productId":productId,
                "productName":productName,
                "category":category,
                "productPrice":cwPriSymTemp,
                "quantity":quantity,
                "brandName":cwBrandName,
                "productVariant":productVariant,
                "retailerName":retailerName,
                "country":cntName
            }
        }); 
        document.dispatchEvent(cwEvent); 
    }
    //
    $CW.ajax({
        type: "POST",
        dataType: "jsonp",
        url: compUrl + "/redirectAjax?cod=" + cwId + "&ip=" + ip + "&clientUrl=" + clientUrl + "&retailerId=" + retailerId + "&productId=" + productId + "&productName=" + productName + "&url=" + url+'&pav_name='+cwVarName+'&pav_id='+cwVarID,
        async: true,
        data: { cod: cwId, url: url, cwURL: compUrl + "/redirectAjax?cod=" + cwId + "&url=" + url + "&ip=" + ip + "&clientUrl=" + clientUrl + "&retailerId=" + retailerId + "&productName=" + productName + "&productId=" + productId + "&lang_code="+langCode },
        success: function(msg) {
            if (typeof(cwWidgetCalls) == 'object') {
                cwWidgetCalls.onClick(msg);
            }
        }
    });
}
function CTGetWidget(proId) {
    var load$ = 1, loadjQuery = 1, loadjQueryUI = 1;
    var id, resIp, clientUrl, compUrl, widgetNm = '', CTLoadChk = false;
    /*if(countryList.errorCode == 5){
        var compUrl =  serverPath +"/widget_price_theme";
    }else{
        compUrl = serverPath + "/widget_theme";
    }*/
    var compUrl =  serverPath +"/widget_price_theme";
    /*for (var i = 0; i < document.styleSheets.length; i++) {
        if (document.styleSheets[i].href == cdnPath + "/v2.0/css/" + masterCssFilePath) {
            CTLoadChk = true;
            break;
        }
    }*/
    if (!CTLoadChk) {
        var int = setInterval(function() {
            if ((typeof $) != 'undefined' || (typeof $CW) != 'undefined') {
                window.clearInterval(int);
                ready();
            }
        }, 300);
    } else {
        ready();
    }

    function ready() {
        if ((typeof $CW) == "undefined") {
            $CW = jQuery.noConflict(true);
        }
        clientUrl = encodeURIComponent(document.location.href);
        $CW(document).ready(function() {            
            loadDataWidget(compUrl, clientUrl,proId);
        }).scroll(function() {
            //widgetInCenter();
        });
    }
    function horizontalL(slide){
        if(countryCode == '0'){
            //$CW('.hr_wrapper').hide();
        }else{
            if(slide){
                //$CW('.hr_wrapper').slideDown(300);
            }else{
                //$CW('.hr_wrapper').slideUp(300);
            }
        }
    }
    makeWidgetStructure = function(vInx,proId) {
        for(r=0; r<cwData.items.length;r++){
            if(typeof(cwData.items[r][proId]) == 'object'){
                cwJsonVal = cwData.items[r][proId][0].product;
            }   
        }        
        cwVarInx = vInx,vInx = vInx+1;
        if ((cwJsonVal.length && loadCheck == 1) || cwMode == 1 || cwCountryChk) {
            loadCheck = 0, isAvailMsg = 0, widgetCode = [], showAvailableOnly = [],showAvailableOnlyClass = [],cwPriceParentCss=[];
            var widgetId = [], widgetName = [], titles = [], urls = [], isAvailMain = [], isAvail = [],cwCategoryMain=[], cwCategory=[], cwQuantityMain = [], cwQuantity = [], buyUrlMain = [], buyUrl = [], cwOfferMain = [], cwOffer = [], cwOfferDesc = [], cwOfferDescMain = [], productVariant=[], cwPriceSym = [], cwPriceMain = [], cwPrice = [], cwPriceMainCSS = [], productName = [], cwPriceCSS = [], retailerNameMain = [], retailerIdMain = [], retailerName = [], stockTxtMain = [], stockTxt = [], retailerLogoMain = [], retailerLogo = [], retailerId = [], prtpIdMain = [], iframeUrlMain = [], variantWeight = [], variantVal = [], iframeUrl = [], prtpId = [], productId = [], statusMain = [], status = [], widgetThemes = '', inx = 0, buyNowText = [], buyNowTextMain = [], cwUnvailableLi = [], cwUnvailableLiMain = [], myip = [], tblHeadTxt = [], countretailer = [], variantCount = [], cntCount = [], cntCSS = [], totalCnt, cwOuterClass, cwTitle = '', cwPreTitle = '', cwPostTitle = '', cwClosebutton, cwTitleWrap, cwImgInstock, cwPriceCSS, cwImgOutofstock, cwPointer, cwBtnWrap, cwShowDiv, cwOverlayClass, cwFooterTxt, cwICount = 0, variantDefault = [], variantTxt = [], cwSinWidCls = [], cwSinWidClsMain = [], buyInStoreTxt=[], nearStoreTxt=[], postalAddTxt=[], searchTxt=[], nearStoresTxt=[], currentLocTxt=[], showHideTxt="";
            	openInMapTxt=[];
            for (i = 0; i < cwJsonVal.length; i++) {
                widgetName.push(cwJsonVal[i].widget_name);
                titles.push(cwJsonVal[i].title);
                widgetId.push(cwJsonVal[i].widget_id);
                productId.push(cwJsonVal[i].product_id);
                cwContainerClass = cwJsonVal[i].widget_container_class;
                cwOuterClass = cwJsonVal[i].widget_outer_class;
                cwTitle = $CW.trim(cwJsonVal[i].widget_title);
                cwPreTitle = $CW.trim(cwJsonVal[i].pre_title_text);
                productName.push(cwJsonVal[i].product_name);
                productVariant.push(cwJsonVal[i].product_variant); 
                cwPostTitle = $CW.trim(cwJsonVal[i].post_title_text);
                cwTitleWrap = cwJsonVal[i].widget_title_wrap;
                cwBrandName = cwJsonVal[i].brand_name;
                cwClosebutton = cwJsonVal[i].widget_closebutton;
                cwImgInstock = cwJsonVal[i].widget_img_instock;
                cwImgOutofstock = cwJsonVal[i].widget_img_outofstock;
                cwPointer = cwJsonVal[i].widget_pointer;
                cwBtnWrap = cwJsonVal[i].widget_btn_wrap;
                cwDisabled = cwJsonVal[i].widget_disabled;
                cwUnvailableMsg = cwJsonVal[i].unvailable_msg;
                cwPriceSym.push(cwJsonVal[i].price_symbol);
                cwBtnTxt = cwJsonVal[i].btn_txt;
                cwMsgTxt = cwJsonVal[i].msg_txt;
                cwMsgContainCl = cwJsonVal[i].msg_container_class;
                myip.push(cwJsonVal[i].ip_address);
                masterCssFilePath = cwJsonVal[i].master_css;
                cssFilePath = cwJsonVal[i].css_filename;
                cwShowDiv = cwJsonVal[i].showDiv;
                cwOverlayClass = cwJsonVal[i].overlay_class;
                cwFooterTxt = cwJsonVal[i].footer_txt;
                cwDisclaimerTxt  = cwJsonVal[i].disclaimer;
                cwOverlayCssClass = cwJsonVal[i].overlay_css_class;
                cwStructureCss = cwJsonVal[i].cw_structure_css.split(',');
                cwWidgetWrapCss = cwJsonVal[i].cw_widget_wrap_css;
                showOfferStatus = cwJsonVal[i].show_country_offer_status;
                discOutStock = cwJsonVal[i].disclaimer_status;
                discOutStock1 = cwJsonVal[i].disclaimer_out_stock1;
                discOutStock2 = cwJsonVal[i].disclaimer_out_stock2;
                cwProductEan = cwJsonVal[i].product_ean;
                cwShStLoc = cwJsonVal[i].show_store_locator;
	           if (cwJsonVal[i].cw_conditional_css.indexOf(',') >= 0) {
                    cwConditionalCss = cwJsonVal[i].cw_conditional_css.split(',');
                } else {
                    cwConditionalCss[0] = '', cwConditionalCss[1] = '';
                }
                customData = cwJsonVal[i].custom_data;
                cwButtonText = cwJsonVal[i].button_txt;
                cwTwoOverlay = cwJsonVal[i].cw_two_overlay;
                cwVersion = cwJsonVal[i].cw_version;
                urls.push(cwJsonVal[i].image_url);
                widgetThemes = cwJsonVal[i].widget_theme_id;
                if ($CW('#customFields').length) {
                    $CW('#customFields').val(cwJsonVal[i].custom_fields);
                }
                countretailer.push(cwJsonVal[i].count_retailer);
                cntName = cwJsonVal[i].country_name;
                tblHeadTxt.push(cwJsonVal[i].table_header);
                variantTxt.push(cwJsonVal[i].variant_txt);
                variantCount.push(cwJsonVal[i].variant_count);
                variantDefault.push(cwJsonVal[i].variant_default);
                widgetCode.push(cwJsonVal[i].widget_code);
                showAvailableOnly.push(cwJsonVal[i].show_available_retailers);
                showAvailableOnlyClass.push(cwJsonVal[i].show_available_class);
                buyInStoreTxt.push(cwJsonVal[i].buy_in_store_txt);
                nearStoreTxt.push(cwJsonVal[i].nearest_store_txt);
                postalAddTxt.push(cwJsonVal[i].postal_address_txt);
                currentLocTxt.push(cwJsonVal[i].current_location_txt);
                searchTxt.push(cwJsonVal[i].search_txt);                
                cwPavId = cwJsonVal[i].product_variant_id;
                cwCloseTxt = cwJsonVal[i].close_txt;
                cwNoStoreTxt = cwJsonVal[i].no_store_txt;
                cwNoStoreDesc = cwJsonVal[i].no_store_desc;
                cwContactTxt = cwJsonVal[i].contact_txt;
                cwContactUrl = cwJsonVal[i].contact_url;
                cwMetricTxt = cwJsonVal[i].metric_txt;
                cwImperialTxt = cwJsonVal[i].imperial_txt;
                cwResultTxt = cwJsonVal[i].result_txt;
                nearStoresTxt.push(cwJsonVal[i].nearest_stores_txt);
                openInMapTxt.push(cwJsonVal[i].open_in_map_txt);                
                showHideTxt = cwJsonVal[i].show_hide_txt;
                totalCnt = cwJsonVal[i].countryCount.length;
                cwPriceParentCss.push(cwJsonVal[i].price_Parent_CSS);
                for (k = 0; k < totalCnt; k++) {
                    cntCount.push(cwJsonVal[i].countryCount[k].retailer);
                    //cntName.push(cwJsonVal[i].countryCount[k].country_name);
                    cntCSS.push(cwJsonVal[i].countryCount[k].cssClass);
                }
                for (y = 0; y < cwJsonVal[i].retailer.length; y++) {
                    if (!(y % countretailer)) {
                        variantWeight.push(cwJsonVal[i].retailer[y].variant_weight);
                    }
                    if (widgetThemes != chkThemeID) {
                        if (cwMode) {
                            checkRefresh = 1;
                        }
                    } else {
                        chkThemeID = widgetThemes;
                    }
                    if (checkRefresh) {
                        if (cwJsonVal[i].retailer[y].variant_type == variantDefault) {
                            variantVal.push(cwJsonVal[i].retailer[y].variant_weight);
                            prtpId.push(cwJsonVal[i].retailer[y].prtpId);
                            iframeUrl.push(cwJsonVal[i].retailer[y].iframe_url);
                            isAvail.push(cwJsonVal[i].retailer[y].is_available);
                            if (cwJsonVal[i].retailer[y].is_available == 1) {
                                isAvailMsg = 1;
                            }
                            buyUrl.push(cwJsonVal[i].retailer[y].buy_now_url);
                            cwQuantity.push(cwJsonVal[i].retailer[y].quantity);
                            cwPrice.push(cwJsonVal[i].retailer[y].price);
                            cwOffer.push(cwJsonVal[i].retailer[y].cw_offer);
                            cwOfferDesc.push(cwJsonVal[i].retailer[y].cw_offer_desc);
                            status.push(cwJsonVal[i].retailer[y].status);
                            retailerId.push(cwJsonVal[i].retailer[y].retailer_id);
                            if (cwJsonVal[i].retailer[y].retailer_id == 6) {
                                ifrmChk = 1;
                            } 
                            cwCategory.push(cwJsonVal[i].retailer[y].category);
                            retailerName.push(cwJsonVal[i].retailer[y].retailer_name);
                            stockTxt.push(cwJsonVal[i].retailer[y].stock_txt);
                            retailerLogo.push(cwJsonVal[i].retailer[y].retailer_logo);
                            buyNowText.push(cwJsonVal[i].retailer[y].buy_now_text);
                            cwUnvailableLi.push(cwJsonVal[i].retailer[y].cw_unvailable_css);
                            cwSinWidCls.push(cwJsonVal[i].retailer[y].widget_single_class);
                            cwPriceCSS.push(cwJsonVal[i].retailer[y].cw_Price_CSS);
                        }
                    } else {
                        if (cwJsonVal[i].retailer[y].variant_type == vInx) {
                            variantVal.push(cwJsonVal[i].retailer[y].variant_weight);
                            prtpId.push(cwJsonVal[i].retailer[y].prtpId);
                            iframeUrl.push(cwJsonVal[i].retailer[y].iframe_url);
                            isAvail.push(cwJsonVal[i].retailer[y].is_available);
                            if (cwJsonVal[i].retailer[y].is_available == 1) {
                                isAvailMsg = 1;
                            }
                            cwCategory.push(cwJsonVal[i].retailer[y].category);
                            buyUrl.push(cwJsonVal[i].retailer[y].buy_now_url);
                            cwQuantity.push(cwJsonVal[i].retailer[y].quantity);
                            cwPrice.push(cwJsonVal[i].retailer[y].price);
                            cwOffer.push(cwJsonVal[i].retailer[y].cw_offer);
                            cwOfferDesc.push(cwJsonVal[i].retailer[y].cw_offer_desc);
                            status.push(cwJsonVal[i].retailer[y].status);
                            retailerId.push(cwJsonVal[i].retailer[y].retailer_id);
                            retailerName.push(cwJsonVal[i].retailer[y].retailer_name);
                            retailerLogo.push(cwJsonVal[i].retailer[y].retailer_logo);
                            stockTxt.push(cwJsonVal[i].retailer[y].stock_txt);
                            buyNowText.push(cwJsonVal[i].retailer[y].buy_now_text);
                            cwUnvailableLi.push(cwJsonVal[i].retailer[y].cw_unvailable_css);
                            cwSinWidCls.push(cwJsonVal[i].retailer[y].widget_single_class);
                            cwPriceCSS.push(cwJsonVal[i].retailer[y].cw_Price_CSS);
                        }
                    }
                }
                inx = i;
                retailerNameMain[inx] = retailerName, stockTxtMain[inx] = stockTxt, retailerLogoMain[inx] = retailerLogo, retailerIdMain[inx] = retailerId, isAvailMain[inx] = isAvail, cwCategoryMain[inx] = cwCategory, cwQuantityMain[inx] = cwQuantity, buyUrlMain[inx] = buyUrl, cwOfferMain[inx] = cwOffer, cwOfferDescMain[inx] = cwOfferDesc, cwPriceMain[inx] = cwPrice, cwPriceMainCSS[inx] = cwPriceCSS, statusMain[inx] = status, prtpIdMain[inx] = prtpId, iframeUrlMain[inx] = iframeUrl, buyNowTextMain[inx] = buyNowText, cwUnvailableLiMain[inx] = cwUnvailableLi, cwSinWidClsMain[inx] = cwSinWidCls;
                retailerName = [], stockTxt=[], retailerLogo = [], retailerId = [], buyUrl = [], cwOffer=[], cwOfferDesc = [], cwPrice = [], cwPriceCSS = [], status = [], prtpId = [], buyNowText = [], cwCategory = [],cwQuantity = [];
            }            
            widgetNm = widgetName[0];
		    brandNm = cwBrandName;
            pId=productId[0];
           arr = { "productID": pId, "productName": unescape(widgetNm), "price": "", "brand": brandNm, "quantity": "" }
           cwDigitalData("", "shop_now", arr);
            var relCount = 0, js_innerblock = '', selectOpt = '';
            for (t = 0; t < titles.length; t++) {
                titlesNm = titles[t].replace(/\s+/g, '-').toLowerCase();
            }
            var stockRow = '', gettitleslength, titles1, retLength, knorrClass,cwAvailChk, cwUnAvailChk;
            if (!$CW('#dialog_cw').length) {
                createTemplate(compUrl, myip, widgetId, titlesNm);
            }
            if (checkRefresh) {
                cwSelInx = variantDefault-1;
            }else{
                cwSelInx = vInx-1;
            }
            for (i = 0; i < titles.length; i++) {
                gettitleslength = titles[i].length;
                titles1 = titles[i];
                retLength = retailerNameMain[i].length; 
                //COUNTRY DELif(!countryChk){            
                    if(showAvailableOnly=="1" && isAvailMain[i].filter(function(value){ return value == 1;}).length == 0){
                        cwOuterClass = showAvailableOnlyClass;              
                    }
                    //stockRow += '<div id="cwMainDivContainer" class="cw_gride_widget ' + cwStructureCss[3] + ' ' + cwOuterClass + '">';
                    stockRow = '<div id="cwMainDivContainer" class="cw_gride_widget">'; 
                    stockRow += '<a href="javascript:void(0)" aria-label="'+cwCloseTxt+'" onClick="closes(0,5);" class="boxClose1 '+cwClosebutton+'"><img alt="'+cwCloseTxt+'" src="'+cdnPath + '/v2.0/images_retailPopup/close_icon.png" class="cw_widget_close closebutton_cw"></a>';
                    var btnInCont = '', btnOutCont = '', closeWV = '';
                    if(cwWV != -1){
                        closeWV = 'display:none !important;';
                    }
                    for (var v = 0; v < totalCnt; v++) {    
                        if(variantChngChk == 1 && cwCountryChk == 0){  
                            //cwCountryChk = countryList.countries.length;
                            stockRow += '<div class="cw_product_title" aria-label="'+titles[v]+'">'+titles[v]+'</div>';
                            stockRow += '<div class="cw_product_wrap">';
                            stockRow += '<div class="cw_product_img">';
                            stockRow += '<div class="cw_product_img_wrap cwObj cwfirstElem" aria-label="'+widgetName[v]+'"><img src="'+urls+'" alt="'+widgetName[v]+'"></div></div>';
                            stockRow += '<div class="cw_product_content">';
                            stockRow += '<div class="cw_product_sub_title" aria-label="'+widgetName[v]+'" style="display:block">'+widgetName[v]+'</div>';
                            /*Country/
                            if(countryList.countries.length){
				                stockRow += '<div class="cwCountryListDropDown"><label>'+countryList.countryTxt+'</label><div class="cwWountry-wrap"><select id="cwCountrySelect" class="cwCountryDrop cwObj" aria-label="'+countryList.countryTxt+'" onchange="getCountryRetialer();">';
				                $CW.each(countryList.countries,function(key,val){
                                    if(key){
                                        if(val.default == 1){
    				                        stockRow += '<option selected value="'+val.id+'">'+val.name+'</option>';
                                        }else{
                                            stockRow += '<option value="'+val.id+'">'+val.name+'</option>';
                                        }
                                    }
				                });     
				                //stockRow += '</select></div><div class="hr_wrapper"></div></div>';
                                stockRow += '</select></div></div>';
				            } 
				            /*Country*/  
                            /* Variant Select Start */
                            if(variantCount > 1){                                
                                var selectOpt = '', trimTxt = '';                                
                                for (var n = 0; n < variantCount[v]; n++) {
                                    if (variantWeight[n].length >= 35) {
                                        trimTxt = $CW.trim(variantWeight[n]).substring(0, 35).trim(this) + "...";
                                    }
                                    trimTxt = variantWeight[n]; 
                                    selectOpt += '<a href="javascript:void(0);" class="cw_widget_size_btn cwObj" data-ean="'+cwProductEan.split(',')[n]+'" data-varID="'+cwPavId.split(',')[n]+'" title="'+trimTxt+'" aria-label="'+trimTxt+'" onClick="iPadMakeWidgetStructure('+parseInt(n)+');">'+trimTxt+'</a>';                                        
                                    //variantWeight[n]
                                }
                                cwVarName = variantWeight[0];
        						cwVarID = cwPavId.split(',')[0];
                            	stockRow += selectOpt;
                            }                            
                            /* Variant Select End */                                                      
                            stockRow += '</div>';
                            stockRow += '</div>';    
                            if(cwShStLoc == '0'){
                                stockRow += '<div id="cwDisclaim" style="display:none;"></div>';
                            }                        
                            //Tabs Starts
                            if(cwShStLoc == '1'){
                            	stockRow += '<ul class="tabs_list">';
								stockRow += '<li><a href="javascript:void(0);" onClick="cwTabChange(0)" aria-label="'+titles[v]+'" class="cwObj cwTabsBtn active"><img alt="'+titles[v]+'" src="' + cdnPath + '/v2.0/images/shopping_cart_icon.png">'+titles[v]+'</a></li>';
								stockRow += '<li><a href="javascript:void(0);" onClick="cwTabChange(1)" aria-label="'+buyInStoreTxt+'" class="cwObj cwTabsBtn"><img alt="'+buyInStoreTxt+'" src="' + cdnPath + '/v2.0/images/location_pin_icon.png">'+buyInStoreTxt+'</a></li>';
								stockRow += '</ul>';
                                
                                //Tabs Ends
    							/* Retailer Table Start */
    							//Tab Content Start
    							stockRow += '<div class="tabs_wrap">';
                            }else{
                                stockRow += '<div>';
                            }
							//BuyOnline Starts
							stockRow += '<div class="table_gride">';
                            if(cwShStLoc == '1'){
    							stockRow += '<div id="cwDisclaim" style="display:none;"></div>';
                            }
                            cwAvailChk = '<span id="cwRetailsTbl"><table id="cwRetailTbl"><thead><tr>';
                            cwAvailChk += '<th aria-label="'+tblHeadTxt[v].split(",")[0]+'">'+tblHeadTxt[v].split(",")[0]+'</th>';
                            if(showOfferStatus == "1"){
                            	cwAvailChk += '<th class="cwObj" style="cursor:pointer;" aria-label="'+tblHeadTxt[v].split(',')[1]+'" style="cursor:pointer;"><span class="offer_mobile">'+tblHeadTxt[v].split(',')[2]+' / </span>'+tblHeadTxt[v].split(',')[1]+' <span class="shorting_up" id="cwUpDownIcon"></th>';
                            	cwAvailChk += '<th aria-label="'+tblHeadTxt[v].split(',')[2]+'">'+tblHeadTxt[v].split(',')[2]+'</th>';
                            }else{
                            	cwAvailChk += '<th class="cwObj" style="cursor:pointer;" aria-label="'+tblHeadTxt[v].split(',')[1]+'">'+tblHeadTxt[v].split(',')[1]+' <span class="shorting_up" id="cwUpDownIcon"></th>';
                            }
                            cwAvailChk += '<th aria-label="'+tblHeadTxt[v].split(',')[3]+'">'+tblHeadTxt[v].split(',')[3]+'</th>';
                            cwAvailChk += '</tr></thead>';
                            cwAvailChk += '<tbody>';
                            cwUnAvailChk = '<table><tbody>';
                            for (j = 0; j < cntCount[v]; j++) {
                                imgURL = retailerLogoMain[i][cwICount], imgLink = "getChildUrlData('" + buyUrlMain[i][cwICount] + "','" + proId + "','" + myip + "','" + clientUrl + "','" + retailerIdMain[i][cwICount] + "','" + productId[i] + "','" + widgetName[i] + "','" + cwCategoryMain[i][cwICount] + "','" + cwPriceMain[i][cwICount] + "','" + variantWeight[cwSelInx] + "','" + retailerNameMain[i][cwICount] + "','" + cwQuantityMain[i][cwICount] + "','" + cwPriceSym[v] + "');";
                                if (retailerNameMain[i][cwICount]) {
                                    if (isAvailMain[i][cwICount] == 1 && statusMain[i][cwICount] != 2) {
                                        cwUnPrice = cwPriceSym[v]+' <span class="getPrice">'+cwPriceMain[i][cwICount]+'</span>';
                                        if(cwPriceMain[i][cwICount] == "null"){
                                            cwUnPrice = "";
                                        }
                                        cwAvailChk += '<tr>';
                                        cwAvailChk += '<td aria-label="'+retailerNameMain[i][cwICount]+'"><img src="' + cdnPath + '/v2.0/images_retailPopup/' + imgURL + '" alt="' + retailerNameMain[i][cwICount] + '" class="cw_widget_logo"></td>'; 
                                        if(showOfferStatus == "1"){
                                            cwAvailChk += '<td aria-label="'+cwPriceSym[v]+' '+cwPriceMain[i][cwICount]+stockTxtMain[i][cwICount]+'"><div class="cw_widget_price_in_stock">'+cwUnPrice+'<span class="cw_widget_stock">'+stockTxtMain[i][cwICount]+'</span></div><span class="offer_mobile offer">'+ cwOfferMain[i][cwICount] +'</span></td>';
                                        	cwAvailChk += '<td class="offer tooltip" aria-label="'+cwOfferDescMain[i][cwICount]+'" alt="'+cwOfferDescMain[i][cwICount]+'" title="'+cwOfferDescMain[i][cwICount]+'">'+ cwOfferMain[i][cwICount];
                                            if(cwOfferDescMain[i][cwICount] != ""){
                                                cwAvailChk += '<span class="cwToolTip">'+cwOfferDescMain[i][cwICount]+'</span>';
                                            }
                                            cwAvailChk += '</td>';
                                        }else{
                                        	cwAvailChk += '<td><div class="cw_widget_price_in_stock">'+cwUnPrice+'<span class="cw_widget_stock">'+stockTxtMain[i][cwICount]+'</span></div></td>';
                                        }                                        
                                        cwAvailChk += '<td><a target="_blank" href="'+buyUrlMain[i][cwICount]+'" class="cw_widget_buy_btn cwObj" aria-haspopup="true" aria-label="'+buyNowTextMain[i][cwICount]+'" onClick="' + imgLink + '" alt="' + buyNowTextMain[i][cwICount] + '" title="' + buyNowTextMain[i][cwICount] + '" rel="' + prtpIdMain[i][cwICount] + '">'+buyNowTextMain[i][cwICount]+'</a></td>';
                                        cwAvailChk += '</tr>';
                                    } else if(showAvailableOnly=="0"){ 
                                        cwUnPrice = cwPriceSym[v]+' '+cwPriceMain[i][cwICount];
                                        if(cwPriceMain[i][cwICount] == "null"){
                                            cwUnPrice = "";
                                        }
                                        cwUnAvailChk += '<tr>';
                                        cwUnAvailChk += '<td aria-label="'+retailerNameMain[i][cwICount]+'"><img src="' + cdnPath + '/v2.0/images_retailPopup/' + imgURL + '" alt="' + retailerNameMain[i][cwICount] + '" class="cw_widget_logo"></td>';
                                        if(showOfferStatus == "1"){
                                        	cwUnAvailChk += '<td aria-label="'+stockTxtMain[i][cwICount]+'"><div class="cw_widget_price_out_of_stock">'+cwUnPrice+'<span class="cw_widget_stock">'+stockTxtMain[i][cwICount]+'</span></div></td>';
                                        	cwUnAvailChk += '<td></td>';
                                        }else{
                                        	cwUnAvailChk += '<td><div class="cw_widget_price_out_of_stock">'+cwUnPrice+'<span class="cw_widget_stock">'+stockTxtMain[i][cwICount]+'</span></div></td>';
                                        }
                                        cwUnAvailChk += '<td><a aria-label="'+buyNowTextMain[i][cwICount]+'" target="_blank" href="'+buyUrlMain[i][cwICount]+'" class="cw_widget_view_btn cwObj '+ (j==cntCount[v]?"":"cwListLast")+'" onClick="' + imgLink + '" alt="' + buyNowTextMain[i][cwICount] + '" title="' + buyNowTextMain[i][cwICount] + '" rel="' + prtpIdMain[i][cwICount] + '">'+buyNowTextMain[i][cwICount]+'</a></td>';
                                        cwUnAvailChk += '</tr>';
                                    }                                
                                }
                                relCount++;
                                cwICount++;
                            }
                            cwAvailChk += '</tbody></table>'; 
                            cwUnAvailChk += '</tbody></table></span>';
                            stockRow += cwAvailChk+cwUnAvailChk;
                            /* Retialer Table End */
							//BuyOnline Ends
                            stockRow += '</div>';
                            //BuyInStore Starts
                            if(cwShStLoc == '1'){
                                stockRow += '<div class="store_wrap" style="display:none;">';
                                stockRow += '<div class="find_store">';
    						    stockRow += '<div class="store_title" aria-label="'+nearStoreTxt+'">'+nearStoreTxt+'</div>';
    						    stockRow += '<label aria-label="'+postalAddTxt+'">'+postalAddTxt+'</label>';
    						    stockRow += '<div>';
    						    stockRow += '<input type="text" id="cwMapSearch" class="textfeild cwObj" onFocus="initAutoComplete()"/>';
    						    stockRow += '<button class="search_btn cwObj search_disabled_btn" onclick="cwGetLocation(1)" aria-label="'+searchTxt+'" title="'+searchTxt+'">'+searchTxt+'</button></div>';	
                                stockRow += '<a href="javascript:void(0);" class="use_current_location cwObj" onclick="cwGetLocation(2)" aria-label="'+currentLocTxt+'"><img alt="'+currentLocTxt+'" src="' + cdnPath + '/v2.0/images/finder_icon.png"> '+currentLocTxt+'</a></div>';
                                //No Store Popup
                                stockRow += '<div class="no_stores_found" id="cwNoStore" style="display:none;">';
                                stockRow += '<div class="cwObj" aria-label="'+cwNoStoreTxt + ' '+cwNoStoreDesc+'" >';
                                stockRow += '<div class="cwNoStores">'+cwNoStoreTxt+'</div>';
                                stockRow += '<p>'+cwNoStoreDesc+'</p>';
                                stockRow += '</div>';
                                stockRow += '<p><a href="'+cwContactUrl+'" aria-label="'+cwContactTxt+'" class="contact_btn cwObj">'+cwContactTxt+'</a></p>';
                                stockRow += '</div>';
                                //No Store Popup
                                stockRow += '<div id="cwMapSH" style="display:none">';    							
    							//stockRow += '<div class="left your_nearest_stores" aria-label="'+nearStoresTxt+'">'+nearStoresTxt+'</div>';
    							stockRow += '<div class="left your_nearest_stores"></div>';                                
                                stockRow += '<div class="right"><a href="javascript:void(0);" class="show_hide_map cwObj" onClick="cwShowMap(0)" aria-label="'+showHideTxt.split(",")[0]+'"><u>'+showHideTxt.split(",")[0]+'</u><span class="shorting_down"></span></a>';
                                stockRow += '<a href="javascript:void(0);" class="show_hide_map cwObj" onClick="cwShowMap(1)" style="display:none;" aria-label="'+showHideTxt.split(",")[1]+'"><u>'+showHideTxt.split(",")[1]+'</u><span class="shorting_up"></span></a>';                          
                                stockRow += '</div></div>';
    							
    							//Map Starts
    							stockRow += '<div class="cwGMap" style="display:none;">';                            
    							//stockRow += '<div id="cwRenderMap"></div>';
    							stockRow += '<div id="cwMapDiv" style="width: 100%; height: 400px"></div>';
    							stockRow += '</div>';
    							//Map Ends
    							stockRow += '<ul id="cwStoreList" class="address_list" style="display:none;">';							
    							stockRow += '</ul>';
    							stockRow += '</div>';
                            }
                            //BuyInStore Ends
                            stockRow += '</div>';
                            /* Overlay */
                            js_builddata_divblock = '<div class="cwOuterPosition" style="background-color: #000;opacity: .5;height: 100%;left: 0;position: fixed;top: 0;width: 100%;z-index: 9999991;"><div class="' + cwOverlayClass + '"></div><div class="' + cwStructureCss[2] + '" style="display:table;height:100%;margin:0 auto;padding:0;position:relative;"><div id="dialog_cw" title="" class="widget-dialog-producte_cw ' + cwConditionalCss[0] + '" style="display:table-cell;vertical-align: middle;">'; 
                            js_builddata_divblock += '</div></div></div>';
                            /* Overlay */
                            $CW('body').append(js_builddata_divblock);
                            $CW('body').append(stockRow);
                            /*if(cwShStLoc == '1'){
                                setTimeout(function(){
                                    cwInitMap();
                                },600);
                            }*/
                            $CW('.cw_widget_size_btn.cwObj').click(function(){ 
                            	if($CW('.cwObj.cwTabsBtn').eq(1).hasClass('active') && $CW('#cwStoreList li').length){
                            		cwGetStorePro($CW(this).attr('data-ean'));
	                            }
                            });
                            $CW('#cwMapSearch').keyup(function(){ 
                            	$CW('.search_btn.cwObj').addClass('search_disabled_btn');
                                cwSearchCallChk = 1;
                                // if($CW('#cwMapSearch').val().trim() != ''){
                                //    //$CW('.search_btn.cwObj').removeClass('search_disabled_btn');
                                // }else{
                                //     $CW('.search_btn.cwObj').addClass('search_disabled_btn');
                                // }
                            }); 
                        }else{  
                            /* Retailer Table Start */
                            cwAvailChk = '<table id="cwRetailTbl"><thead><tr>';
                            cwAvailChk += '<th aria-label="'+tblHeadTxt[v].split(",")[0]+'">'+tblHeadTxt[v].split(",")[0]+'</th>';
                            if(showOfferStatus == "1"){
                            	cwAvailChk += '<th class="cwObj" style="cursor:pointer;" aria-label="'+tblHeadTxt[v].split(",")[1]+'"><span class="offer_mobile">'+tblHeadTxt[v].split(',')[2]+' / </span>'+tblHeadTxt[v].split(',')[1]+' <span class="shorting_up" id="cwUpDownIcon"></th>';
                            	cwAvailChk += '<th aria-label="'+tblHeadTxt[v].split(",")[2]+'">'+tblHeadTxt[v].split(',')[2]+'</th>';
                            }else{
                            	cwAvailChk += '<th style="cursor:pointer;" class="cwObj" aria-label="'+tblHeadTxt[v].split(",")[1]+'">'+tblHeadTxt[v].split(',')[1]+' <span class="shorting_up" id="cwUpDownIcon"></th>';
                            }
                            cwAvailChk += '<th aria-label="'+tblHeadTxt[v].split(",")[3]+'">'+tblHeadTxt[v].split(',')[3]+'</th>';
                            cwAvailChk += '</tr></thead>';
                            cwAvailChk += '<tbody>';
                            cwUnAvailChk = '<table><tbody>';
                            for (j = 0; j < cntCount[v]; j++) {
                                imgURL = retailerLogoMain[i][cwICount], imgLink = "getChildUrlData('" + buyUrlMain[i][cwICount] + "','" + CARTWIREWIDGETKEYFORCHECKING + "','" + myip + "','" + clientUrl + "','" + retailerIdMain[i][cwICount] + "','" + productId[i] + "','" + widgetName[i] + "','" + cwCategoryMain[i][cwICount] + "','" + cwPriceMain[i][cwICount] + "','" + variantWeight[cwSelInx] + "','" + retailerNameMain[i][cwICount] + "','" + cwQuantityMain[i][cwICount] + "','" + cwPriceSym[v] +"');";
                                if (retailerNameMain[i][cwICount]) {
                                    if (isAvailMain[i][cwICount] == 1 && statusMain[i][cwICount] != 2) {
                                        cwUnPrice = cwPriceSym[v]+' <span class="getPrice">'+cwPriceMain[i][cwICount]+'</span>';
                                        if(cwPriceMain[i][cwICount] == "null"){
                                            cwUnPrice = "";
                                        }
                                        cwAvailChk += '<tr>';
                                        cwAvailChk += '<td aria-label="'+retailerNameMain[i][cwICount]+'"><img src="' + cdnPath + '/v2.0/images_retailPopup/' + imgURL + '" alt="' + retailerNameMain[i][cwICount] + '" class="cw_widget_logo"></td>';
                                        if(showOfferStatus == "1"){
	                                        cwAvailChk += '<td aria-label="'+cwPriceSym[v]+' '+cwPriceMain[i][cwICount]+stockTxtMain[i][cwICount]+'"><div class="cw_widget_price_in_stock">'+cwUnPrice+'<span class="cw_widget_stock">'+stockTxtMain[i][cwICount]+'</span></div><span class="offer_mobile offer">'+ cwOfferMain[i][cwICount] +'</span></td>';
	                                        cwAvailChk += '<td  class="offer tooltip" aria-label="'+cwOfferDescMain[i][cwICount]+'">'+ cwOfferMain[i][cwICount];
                                            if(cwOfferDescMain[i][cwICount] != ""){
                                                cwAvailChk += '<span class="cwToolTip">'+cwOfferDescMain[i][cwICount]+'</span>';
                                            }
                                            cwAvailChk += '</td>';
	                                    }else{
	                                    	cwAvailChk += '<td><div class="cw_widget_price_in_stock">'+cwUnPrice+'<span class="cw_widget_stock">'+stockTxtMain[i][cwICount]+'</span></div></td>';
	                                    }                                        
                                        cwAvailChk += '<td><a aria-label="'+buyNowTextMain[i][cwICount]+'" target="_blank" href="'+buyUrlMain[i][cwICount]+'" class="cw_widget_buy_btn cwObj" onClick="' + imgLink + '" alt="' + buyNowTextMain[i][cwICount] + '" title="' + buyNowTextMain[i][cwICount] + '" rel="' + prtpIdMain[i][cwICount] + '">'+buyNowTextMain[i][cwICount]+'</a></td>';
                                        cwAvailChk += '</tr>';
                                    } else if(showAvailableOnly=="0"){ 
                                        cwUnPrice = cwPriceSym[v]+' '+cwPriceMain[i][cwICount];
                                        if(cwPriceMain[i][cwICount] == "null"){
                                            cwUnPrice = "";
                                        }
                                        cwUnAvailChk += '<tr>';
                                        cwUnAvailChk += '<td aria-label="'+retailerNameMain[i][cwICount]+'"><img src="' + cdnPath + '/v2.0/images_retailPopup/' + imgURL + '" alt="' + retailerNameMain[i][cwICount] + '" class="cw_widget_logo"></td>';
                                        if(showOfferStatus == "1"){
	                                        cwUnAvailChk += '<td aria-label="'+stockTxtMain[i][cwICount]+'"><div class="cw_widget_price_out_of_stock">'+cwUnPrice+'<span class="cw_widget_stock">'+stockTxtMain[i][cwICount]+'</span></div></td>';
	                                        cwUnAvailChk += '<td></td>';
	                                    }else{
	                                    	cwUnAvailChk += '<td><div class="cw_widget_price_out_of_stock">'+cwUnPrice+'<span class="cw_widget_stock">'+stockTxtMain[i][cwICount]+'</span></div></td>';
	                                    }                                        
                                        cwUnAvailChk += '<td><a aria-label="'+buyNowTextMain[i][cwICount]+'" target="_blank" href="'+buyUrlMain[i][cwICount]+'" class="cw_widget_view_btn cwObj '+ (j==cntCount[v]?"":"cwListLast")+'" onClick="' + imgLink + '" alt="' + buyNowTextMain[i][cwICount] + '" title="' + buyNowTextMain[i][cwICount] + '" rel="' + prtpIdMain[i][cwICount] + '">'+buyNowTextMain[i][cwICount]+'</a></td>';
                                        cwUnAvailChk += '</tr>';
                                    }                                
                                } 
                                relCount++;
                                cwICount++;
                            }
                            cwAvailChk += '</tbody></table>'; 
                            cwUnAvailChk += '</tbody></table>';                          
                            /* Retialer Table End */
                            stockRow = cwAvailChk+cwUnAvailChk;
                            // Tab content ends                            
                            $CW('#cwRetailsTbl').html(stockRow);
                        }
                        if(variantChngChk != 1){
                            $CW('.cw_widget_size_btn').removeClass('selected');
                            $CW('.cw_widget_size_btn').eq(vInx-1).addClass('selected');
                        }else{ 
                            $CW('.cw_widget_size_btn').eq(variantDefault-1).addClass('selected');
                        }
                        $CW('#cwRetailTbl th:nth-child(2)').unbind('click');
                        $CW('#cwRetailTbl th:nth-child(2)').click(function(){
                            $CW(this).toggleClass('ASC DESC');
                            $CW(this).children('#cwUpDownIcon').removeClass('shorting_down').addClass('shorting_up');
                            var thOrder = -1;
                                if($CW(this).hasClass("ASC")){
                                    thOrder = 1;
                                    $CW(this).children('#cwUpDownIcon').removeClass('shorting_up').addClass('shorting_down');
                                }
                            sortTable(document.getElementById("cwRetailTbl"),$CW(this).index(), thOrder);
                        }).on('keydown', function (e) {
                            if (e.which == 13) {
                                $CW(this).trigger('click');
                            }
                            if (e.which == 32) {
                                $CW(this).trigger('click');
                                return false;
                            }
                        });
                        $CW('.cw_widget_buy_btn, .cw_widget_view_btn').on('keydown', function (e) {
                            if (e.which == 32) {                            	
                                $CW(this).trigger('click');                                
      							window.open($CW(this).attr('href'))
                                return false;
                            }
                        });                                                
                    }
                //CONUTRY DEL}
            }
            $CW('.contact_btn.cwObj').on('keydown', function (e) {
                if (e.which == 32) {                            	
                    $CW(this).trigger('click');                                
					window.open($CW(this).attr('href'))
                    return false;
                }
            });     
            $CW('.cwTabsBtn, .open_in_map_btn.cwObj, .use_current_location.cwObj').on('keydown', function (e) {
                if (e.which == 32){ 
                    $CW(this).trigger('click');
                }
            }); 
            $CW('.search_btn.cwObj').on('keydown', function (e) {            	
                if (e.which == 32 || e.which == 13){ 
                	if(!$CW(this).hasClass('search_disabled_btn')){
	                    $CW(this).trigger('click');	                    
	                }else{
	                	return false;
	                }
                }
            }); 
            $CW('.show_hide_map.cwObj').on('keydown', function (e) {
                if (e.which == 32){
                    $CW(this).trigger('click');
                    setTimeout(function(){
                        $CW('.show_hide_map.cwObj').focus();
                    },600)
                }
            }); 
            $CW('.cw_widget_size_btn').on('keydown', function (e) {
	            if (e.which == 32 || e.which == 13) {                            	
	                var cwThis = $CW(this);
	                $CW(this).trigger('click');
	                setTimeout(function(){
	                	cwThis.focus(); 
	                },300);      							
	                return false;
	            }
	        }); 
            window.onkeydown = function(e) {            	
            	if(e.target.className.indexOf("textfeild") != 0){
					return !(e.keyCode == 32);
				}
			};
            // Set escape close
            $CW(document).on('keydown', function(event) {
                if (event.which == 32) {
                    if((document.activeElement.className).indexOf("cwCountryDrop") > -1){
                        $CW(".cwCountryDrop").trigger("mousedown");
                    }
                	if((document.activeElement.className).indexOf("boxClose1") > -1){
	                    closes(event, 1);
	                } 
                }
                if (event.which == 27) {
                    closes(event, 1);
                }
                if (event.which == 9) {
                	if(event.shiftKey) {
	                	if((document.activeElement.className).indexOf("cw_product_img_wrap") > -1){
	                	  	$CW('.boxClose1').focus();
		                	return false;
		                }
		                if((document.activeElement.className).indexOf("cwfirstElem") > -1){
	                	  	$CW('.boxClose1').focus();	                	  	
		                	return false;
		                }
		            }else{
		            	if((document.activeElement.className).indexOf("boxClose1") > -1){
	                		$CW('.cw_product_img_wrap').focus();
		                    return false;
		                }
                        if($CW('.tabs_list .cwTabsBtn').eq(0).hasClass('active')){
                            if((document.activeElement.className).indexOf("cwListLast") > -1){
                                $CW('.boxClose1').focus();
                                alert(1)
                                return false;
                            }
                        }
		            }
                }
            });
            if(discOutStock.split(",")[cwSelInx] == '0'){
                cwDisClaimCont = '<div class="cw_info" aria-label="'+discOutStock1+' '+discOutStock2+'">';
                cwDisClaimCont += '<div class="cw_info_icon"><img src="' + cdnPath + '/v2.0/images_retailPopup/cw_info_icon.png"></div>';
                cwDisClaimCont += '<div class="info_content"><span>'+discOutStock1+'</span>'+discOutStock2+'</div>';
                cwDisClaimCont += '</div>';
                $CW('#cwDisclaim').html(cwDisClaimCont).show();
            }else{
                if (cwDisclaimerTxt != '') {
                    cwDisClaimCont = '<p class="cw_pera" aria-label="'+cwDisclaimerTxt+'">'+cwDisclaimerTxt+'</p>';
                    $CW('#cwDisclaim').html(cwDisClaimCont).show();
                }
            }
            // Set index
            cwSetIndex();            
            setTimeout(function(){
	            $CW('.cwfirstElem').focus();
	        },600);
            //////////////////////////////////////                       
            horizontalL(1);
            var cssListener = setInterval(function() {
                $CW('#siteLoader_cw').fadeOut(100);
                $CW('#dialog_popup_inner_cw').fadeIn(100);
                if (variantDefault && checkRefresh) {
                    checkRefresh = 0;
                    /*if(variantChngChk){
                        $CW('#dialog_popup_inner_cw #cwVariantSelect option').eq(variantDefault-1).attr('selected', 'true');
                    }*/
                }
                clearInterval(cssListener);
            }, 300);
        } else if (loadCheck == 1) {
            loadCheck = 0;
            setTimeout(function() {
                $CW('#siteLoader_cw').fadeOut(100);
                $CW('#dialog_popup_inner_cw').fadeIn(100);
            }, 300);
            var js_builddata_divblock = '';
            /*if (!CTLoadChk) {
                 js_builddata_divblock += '<link href="' + cdnPath + '/v2.0/css/' + masterCssFilePath + '" rel="stylesheet" type="text/css" />';
                //js_builddata_divblock += '<link href="v2.0/css/' + masterCssFilePath + '" rel="stylesheet" type="text/css" />';
                if (cssFilePath != '') {
                    js_builddata_divblock += '<link href="' + cdnPath + '/v2.0/css/' + cssFilePath + '" rel="stylesheet" type="text/css" />';
                //js_builddata_divblock += '<link href="v2.0/css/' + cssFilePath + '" rel="stylesheet" type="text/css" />';
                }
            }*/
            js_builddata_divblock += '<div class="cwOuterPosition" style="height: 100%;left: 0;position: fixed;top: 0;width: 100%;z-index: 9999991;"><div class="' + cwOverlayClass + '"></div><div class="' + cwStructureCss[2] + '" style="display:table;height:100%;margin:0 auto;padding:0;position:relative;"><div id="dialog_cw" title="" class="widget-dialog-producte_cw ' + cwConditionalCss[0] + '" style="display:table-cell;vertical-align: middle;">';
            js_builddata_divblock += '<div class="widget-dialogr-pop_cw">';
            js_builddata_divblock += '<div class="dialog_popup_container_cw">';
            js_builddata_divblock += '<div style="display:none;" id="dialog_popup_inner_cw">';
            js_builddata_divblock += '<div class="cwBgSettings">';
            js_builddata_divblock += '</div>';
            js_builddata_divblock += '<div class="no-widget"><img src="' + cdnPath + '/v2.0/images/no-record.jpg" lalt="No Record Found!"</div>';
            js_builddata_divblock += '</div>';
            js_builddata_divblock += '</div></div></div>';
            $CW('body').append(js_builddata_divblock);

            loadChk = 1;
            setTimeout(function() { 
                $CW('.closebutton_cw, .closebutton_cont_cw, .' + cwStructureCss[0]).click(function(event) { closes(event) });
            }, 500);
        }
        widgetInCenter();
        countryChk = 0;
    }
    cwSetIndex = function(){
        $CW('.cwObj').each(function(i){
            $CW(this).attr('tabindex', i+1);
        });
        $CW('.boxClose1').attr('tabindex', $CW('.cwObj').length+1);
    }
    getCountryRetialer = function(e){
        $CW('#cwDisclaim').hide();
        $CW('#siteLoader_cw').fadeIn(100); 
        loadCheck = 1;
        countryCode = $CW('#cwCountrySelect').val();
        clientUrl  = encodeURIComponent(document.location.href); 
        //closes(e,1); 
        setTimeout(function(){                  
            countryChk = 1;
            checkRefresh = 1;
            loadDataWidget(compUrl, clientUrl,proId);         
        },300);
    }
    iPadMakeWidgetStructure = function(rInx) {
        cwSearchCallChk = 1;
        closes(window.event);
        setTimeout(function() {
            variantChngChk = 0;
            makeWidgetStructure(rInx);            
            if($CW('.cw_widget_size_btn').eq(rInx).hasClass('selected')){
            	cwVarName = $CW('.cw_widget_size_btn').eq(rInx).attr('title');
            	cwVarID = $CW('.cw_widget_size_btn').eq(rInx).attr('data-varid');
                cwAddViewCall('variant');
            }
        }, 300);
    }
    cwAddViewCall = function(cwAct,cwAdd,cwAdd2){
        var cwActStr = '';
        if(cwAct == 'init'){
            cwActStr = 'view=1';
        }else if(cwAct == 'buyOn'){
            cwActStr = 'view=0&buy_on_line=1&buy_in_store=0&area_search=0&area_name_search=&pav_name='+cwVarName+'&pav_id='+cwVarID;
        }else if(cwAct == 'buyIn'){
            cwActStr = 'view=0&buy_on_line=0&buy_in_store=1&area_search=0&area_name_search=&pav_name='+cwVarName+'&pav_id='+cwVarID;
        }else if(cwAct == 'address'){
            cwActStr = 'view=0&buy_on_line=0&buy_in_store=0&area_search=1&area_name_search='+cwAdd+'&pav_name='+cwVarName+'&pav_id='+cwVarID;
        }else if(cwAct == 'variant'){
        	if($CW('.cwObj.cwTabsBtn').eq(0).hasClass('active')){
        		cwActStr = 'view=0&buy_on_line=0&buy_in_store=0&area_search=0&area_name_search=&pav_name='+cwVarName+'&pav_id='+cwVarID;
        	}else if($CW('.cwObj.cwTabsBtn').eq(1).hasClass('active')){
        		cwActStr = 'view=0&buy_on_line=0&buy_in_store=0&area_search=0&area_name_search=&pav_name='+cwVarName+'&pav_id='+cwVarID;
        	}else{
        		cwActStr = 'view=0&buy_on_line=0&buy_in_store=0&area_search=0&area_name_search=&pav_name='+cwVarName+'&pav_id='+cwVarID;
        	}
            
        }
        $CW.ajax({
            dataType: "jsonp",
            url: compUrl+"/addView?clientUrl="+clientUrl+"&ip="+cwMyIP+"&widget_id=" +cwWidgetID+"&lang_code="+langCode+"&"+cwActStr,
            type: "GET",
            success: function(data) {
            }
        });
    }
    cwTabChange = function(cwTabs){
    	if(cwTabs == "1"){
            if(!$CW('.cwObj.cwTabsBtn').eq(1).hasClass('active')){
                cwAddViewCall('buyIn');
            }
    		$CW('.cwTabsBtn').eq(1).addClass('active');
    		$CW('.cwTabsBtn').eq(0).removeClass('active');
    		$CW('.store_wrap').fadeIn();
    		$CW('.table_gride').hide();
            if($CW('#cwStoreList').is(':visible')){ 
                $CW('#cwStoreList').animate({
                    scrollTop: 0
                },0);
            }            
    	}else{
            if(!$CW('.cwObj.cwTabsBtn').eq(0).hasClass('active')){
                cwAddViewCall('buyOn');
            }
    		$CW('.cwTabsBtn').eq(0).addClass('active');
    		$CW('.cwTabsBtn').eq(1).removeClass('active');
    		$CW('.store_wrap').hide();
    		$CW('.table_gride').fadeIn();
            if(discOutStock.split(",")[cwSelInx] == '0' || cwDisclaimerTxt != ''){
                $CW('#cwDisclaim').show();
            }            
    	}
    }
    cwOpenInMap = function(i,lat,long){
        $CW('.show_hide_map').eq(0).hide();
        $CW('.show_hide_map').eq(1).show();
        $CW('.cwGMap').slideDown(); 
        url = 'https://www.google.com/maps/dir/?api=1&origin='+cwCurPos.lat+','+cwCurPos.lng+'&destination='+lat+','+long;
  		window.open(url, '_blank');
    }
    cwShowMap = function(cwTabs){
    	$CW('.show_hide_map').toggle();
    	$CW('.cwGMap').slideToggle();
    	cwMaps.fitBounds(cwBounds); 
        cwMaps.panToBounds(cwBounds);
    }
    //Access Current Location Starts 
    cwMapElem = document.getElementById("cwRenderMap");
    cwStoreListClick = function(iVar){        
    	$CW('#cwStoreList li').removeClass('active');
		$CW('#cwStoreList li').eq(iVar).addClass('active');
		for (var j = 0; j < cwMarkersArr.length; j++) {
			cwMarkersArr[j].setIcon(cdnPath + '/v2.0/images/location_pin_lg.png');
		} 
		cwMarkersArr[iVar].setIcon(cdnPath + '/v2.0/images/location_pin_lg_blue.png');
        $CW('.cwGMap').slideDown(); 	
        $CW('.show_hide_map').eq(0).hide();
        $CW('.show_hide_map').eq(1).show();	
        cwMaps.fitBounds(cwBounds); 
        cwMaps.panToBounds(cwBounds);
        cwInfowindow.setContent(cwMakeGMPop(iVar));
		//setTimeout(function(){
            cwInfowindow.open(cwMaps,cwMarkersArr[iVar]);		
        //},400);		
		window.scrollTo({top: $CW('.your_nearest_stores').offset().top, behavior: 'smooth'});
    }

    cwGetStorePro = function(cwEAN,cwCrChk){     
    	$CW('#siteLoader_cw').fadeIn(100);
        cwInfowindow.close();   
        $CW.ajax({    
        	url:"https://stgproductstoredata.unileverservices.com/v1/productstores/"+cwEAN+"?lat="+cwCurPos.lat+"&long="+cwCurPos.lng+"&count=10",            
            async: true,
            type: "GET",
            success: function(cwGPData) {                      
                if(cwGPData.Items.length == 0){       
                    $CW('#cwNoStore').slideDown();
                    $CW('#cwMapSH').hide(); 
                    $CW('#cwStoreList').slideUp();
                    $CW('.cwGMap').slideUp(); 
                }else{
                    cwMarkersArr = [];
                    for (var i = 0; i < cwMarkersArr.length; i++) {
                        cwMarkersArr[i].setMap(null);
                    }
                    stockGPRow ='';
                    cwLoc = [[]];    
                    cwGPPin = cdnPath + '/v2.0/images/location_pin_lg.png';   
                    for (i = 0; i < cwGPData.Items.length; i++) {                   
                        cwGPStData[i] = {SN:cwGPData.Items[i].StoreName, SA:cwGPData.Items[i].Street, SC:cwGPData.Items[i].City, PC:cwGPData.Items[i].PostalCode, SP:cwGPData.Items[i].PhoneNumber,SLT:cwGPData.Items[i].Lat,SLG:cwGPData.Items[i].Long}
                            cwMarker = new google.maps.Marker({
                                position: {lat:parseFloat(cwGPData.Items[i].Lat), lng:parseFloat(cwGPData.Items[i].Long)},
                                map: cwMaps, 
                                icon: cwGPPin,
                                label: {color: '#fff', fontSize: '16px', fontWeight: '500', text: parseInt(i+1).toString()},
                                id: i,
                            });
                            loc = new google.maps.LatLng(cwMarker.position.lat(), cwMarker.position.lng());
                            cwBounds.extend(loc);
        					google.maps.event.addListener(cwMarker, 'click', (function(marker, i) {
        				        return function() {
        							cwInfowindow.setContent(cwMakeGMPop(i)); 
        							for (var j = 0; j < cwGPData.Items.length; j++) {
                            			cwMarkersArr[j].setIcon(cdnPath + '/v2.0/images/location_pin_lg.png');
                        			}
        							marker.setIcon(cdnPath + '/v2.0/images/location_pin_lg_blue.png');  
        							cwInfowindow.open(cwMaps, marker);
        							$CW('#cwStoreList li').removeClass('active');
        							$CW('#cwStoreList li').eq(i).addClass('active');
        				        }
        				    })(cwMarker, i));
        					cwMarkersArr.push(cwMarker);        				
							stockGPRow += '<li class="cwObj cwStRows" onClick="cwStoreListClick('+i+')">';
							stockGPRow += '<div class="cwAddLeft" aria-label="'+parseInt(i+1) +', '+ cwGPStData[i].SN +', '+ cwGPStData[i].DT +', '+ cwGPStData[i].SA +', '+ cwGPStData[i].SC +', '+ cwGPStData[i].PC +', '+ cwGPStData[i].SP+'"><div class="sr_number">'+parseInt(i+1)+'</div>';
							//stockGPRow += '<img src="' + cdnPath + '/v2.0/images/sainsburys_130x40.jpg" class="ret_logo">';
							stockGPRow += '<div class="ret_logo">'+cwGPStData[i].SN+'</div>';
							//stockGPRow += '<p>'+cwGPStData[i].DT+'</p>';
							cwPhone = '';
							if(cwGPStData[i].SP.trim() != '' && cwGPStData[i].SP.trim() != '0'){
							cwPhone = '<br><a href="tel:'+cwGPStData[i].SP+'"><img alt="'+cwGPStData[i].SP+'" src="'+cdnPath + '/v2.0/images/phone_icon.png" /> '+cwGPStData[i].SP+'</a>';
							}
							stockGPRow += '<div class="cwLiAdd">'+cwGPStData[i].SA+',</br>'+cwGPStData[i].SC+', '+cwGPStData[i].PC+cwPhone+'</div></div>';
							//Dynamic stockGPRow += '<a href="javascript:void(0);" onClick="cwOpenInMap('+i+','+cwGPStData[i].SLT+','+cwGPStData[i].SLG+')" class="open_in_map_btn cwObj" aria-label="'+openInMapTxt+'">'+openInMapTxt+'</a></li>';
							stockGPRow += '<a href="javascript:void(0);" onClick="cwOpenInMap('+i+','+parseFloat(cwGPStData[i].SLT)+','+parseFloat(cwGPStData[i].SLG)+')" class="open_in_map_btn cwObj" aria-label="'+openInMapTxt+'">'+openInMapTxt+'</a></li>';
    				}
                    cwMaps.fitBounds(cwBounds); 
                    cwMaps.panToBounds(cwBounds);
    				$CW('#cwStoreList').html(stockGPRow).removeAttr("style").animate({
                        scrollTop: 0
                    },0);
                    $CW('.cwStRows.cwObj, .open_in_map_btn.cwObj').on('keydown', function (e) {
		                if (e.which == 32){
		                    $CW(this).trigger('click');
		                }
		            });
		            //Set Radius Text
		            cwUnit = cwGPData.UnitSystem == 'METRIC' ? cwMetricTxt : cwImperialTxt;                    
                    cwResTxt = cwResultTxt.split('@')[0] +' '+cwGPData.Count+' '+cwResultTxt.split('@')[1]+' '+cwGPData.SearchRadius+' '+cwResultTxt.split('@')[2]+' '+cwUnit+' '+cwResultTxt.split('@')[3]
                    $CW('.left.your_nearest_stores').html(cwResTxt).attr('aria-label',cwResTxt);
                    //
    				cwSetIndex();
    		        $CW('#cwMapSH').show();
    		        //$CW('.cwGMap').slideDown();
                    $CW('#cwNoStore').slideUp();
    		        $CW('#cwStoreList').slideDown();
                    cwchkEAN = cwProductEan;
                } 
                $CW('#siteLoader_cw').fadeOut(100);
            }
        });
    }    
    cwMakeGMPop = function(i){ 
    	//Dynamic '<divclass="map_address"><img src="' + cdnPath + '/v2.0/images/sainsburys_130x40.jpg" class="ret_logo">'+    	
    	if(!$CW.isEmptyObject(cwGPStData)){    		
        	//return '<div class="cwMap_address"><h3 class="cwPopLogo">'+cwGPStData[i].SN+'</h3><p>'+cwGPStData[i].DT+'</p>'+'<h5>'+cwGPStData[i].SA+', '+cwGPStData[i].SC+', '+cwGPStData[i].PC+', '+cwGPStData[i].SP+'</h5>'+'<p><a href="javascript:void(0);" onClick="cwOpenInMap('+i+','+cwGPStData[i].SLT+','+cwGPStData[i].SLG+')" class="open_btn" aria-label="'+openInMapTxt+'">'+openInMapTxt+'</a></p></div>';
        	cwPhone = '';
			if(cwGPStData[i].SP.trim() != '' && cwGPStData[i].SP.trim() != '0'){
				cwPhone = '<br><a href="tel:'+cwGPStData[i].SP+'"><img alt="'+cwGPStData[i].SP+'" src="'+cdnPath + '/v2.0/images/phone_icon.png" /> '+cwGPStData[i].SP+'</a>';
			}
        	return '<div class="cwMap_address" aria-label="'+parseInt(i+1) +', '+ cwGPStData[i].SN +', '+ cwGPStData[i].DT +', '+ cwGPStData[i].SA +', '+ cwGPStData[i].SC +', '+ cwGPStData[i].PC +', '+ cwGPStData[i].SP+'"><div class="cwPopLogo" title="'+cwGPStData[i].SN+'">'+cwGPStData[i].SN+'</div><div class="cwMAdd">'+cwGPStData[i].SA+',<br>'+cwGPStData[i].SC+', '+cwGPStData[i].PC+cwPhone+'</div>'+'<p><a href="javascript:void(0);" onClick="cwOpenInMap('+i+','+parseFloat(cwGPStData[i].SLT)+','+parseFloat(cwGPStData[i].SLG)+')" class="open_btn" aria-label="'+openInMapTxt+'">'+openInMapTxt+'</a></p></div>';
    	}
    }
    let pin;
    cwGeocodeLatLng = function(gInx){
        const latlng = {
            lat: parseFloat(cwCurPos.lat),
            lng: parseFloat(cwCurPos.lng)
        };
        cwGeocoder.geocode({ location: latlng }, function(results, status)  {
            if (status === "OK") {
              if (results[0]) {
                pin ? pin.setMap(null) : false;
                pin = cwMarker = new google.maps.Marker({
                  position: latlng,
                  map: cwMaps,
                  animation: google.maps.Animation.DROP,
			      icon: cdnPath + '/v2.0/images/cwCurLocPin.png'
                });            
                if(gInx==2){
	                $CW('#cwMapSearch').val(results[3].formatted_address);
	            }
	            if(gInx!=2){
	                cwInfowindow.setContent(cwMakeGMPop(0)); 
	                cwMaps.setZoom(8); // Why 17? Because it looks good.                
	                cwInfowindow.open(cwMaps);
	            }
              } else {
                window.alert("No results found");
              }
            } else {
              window.alert("Geocoder failed due to: " + status);
            }
        }); 
        cwEanCD = cwProductEan;
        if(cwEanCD.split(',').length > 1){        	
        	cwEanCD = cwProductEan.split(',')[cwVarInx];
        }
        if(gInx!=2){
        	cwGetStorePro(cwEanCD,1);      
        }
    }
    initAutoComplete = function(){
        var input = document.getElementById('cwMapSearch');
        var options = {}
        google.maps.event.clearInstanceListeners(input);
        var autocomplete = new google.maps.places.Autocomplete(input, options);	        
        google.maps.event.addListener(autocomplete, 'place_changed', function() {
			try{

				var place = autocomplete.getPlace();
				var lat = place.geometry.location.lat();
				var lng = place.geometry.location.lng();
				cwCurPosClient =  {"lat": lat, "lng": lng}
				$CW('.search_btn.cwObj').removeClass('search_disabled_btn');

			}catch(e){
				cwCurPosClient = null;
			}
			
        });	        
    }
    cwGetLoc = function(gInx){
        cwCurPosClient = null;
        if (navigator.geolocation) {            
            navigator.geolocation.getCurrentPosition(function(position){
            const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };  
            cwCurPos = pos;            
            cwGeocodeLatLng(gInx);
            //cwInitMap();
            },function() {
                handleLocationError(true, cwInfowindow, cwMaps.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, cwInfowindow, cwMaps.getCenter());
        }   
    }
	cwGetLocation = function(gInx){  
        if(gInx == 1){      
            if($CW('#cwMapSearch').val().trim() && !$CW('.search_btn').hasClass('search_disabled_btn')){
                /*var cwSrcStr = '';
                for(i=0; i<$CW('#cwMapSearch').val().split(/ +/).length; i++){
                    cwSrcStr += $CW('#cwMapSearch').val().split(/ +/)[i]+'+';
                }*/
                if(cwCurPosClient){  
                   cwCurPos = cwCurPosClient; 
                }else{                                   
                    $CW('#cwNoStore').slideDown();
                    $CW('#cwMapSH').hide(); 
                    $CW('#cwStoreList').slideUp();
                    $CW('.cwGMap').slideUp(); 
                }  
                cwAddStr = cwCurPos.lat+'^'+cwCurPos.lng+'^'+$CW('#cwMapSearch').val().trim();
                if(cwSearchCallChk){
                    cwAddViewCall('address',cwAddStr);
                    cwSearchCallChk = 0;
                }
                cwGeocodeLatLng();                    
                cwInitMap();
            }   
        }else{ 
			cwGetLoc(gInx); 
			$CW('.search_btn.cwObj').removeClass('search_disabled_btn');
        }		        
	}
    //
    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        cwInfowindow.setPosition(pos);
        cwInfowindow.setContent(
        browserHasGeolocation
          ? "Error: The Geolocation service failed."
          : "Error: Your browser doesn't support geolocation."
        );
        cwInfowindow.open(cwMaps);
    }

	var setupClickListener;

	cwInitMap = function() {        
        cwGeocoder = new google.maps.Geocoder();
        //cwGetLoc();
		cwMaps = new google.maps.Map(document.getElementById("cwMapDiv"), {
			center: { lat: 26.894932299999997, lng: 180.9513239 },
			zoom: 8,
			disableDefaultUI: true,
			zoomControl: true,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		});

		var input = document.getElementById('cwMapSearch');
		google.maps.event.clearInstanceListeners(input);
		var autocomplete = new google.maps.places.Autocomplete(input);
        cwInfowindow = new google.maps.InfoWindow(); 
        cwBounds = new google.maps.LatLngBounds();
		//autocomplete.bindTo('bounds', cwMaps);
        //cwMarker = new google.maps.Marker(); 
        /*google.maps.event.addListener(autocomplete, 'place_changed', function () {            
              cwInfowindow.close();
              //var place = autocomplete.getPlace();
             // cwMaps.setMyLocationEnabled(false);
			  //cwMaps.getUiSettings().setMyLocationButtonEnabled(false);
              /*if (place.geometry.viewport) {
                  cwMaps.fitBounds(place.geometry.viewport);
                  //cwMaps.setZoom(4);
              } else {
                  cwMaps.setCenter(place.geometry.location);
                  //cwMaps.setZoom(4); // Why 17? Because it looks good.
              } * /
            cwEanCD = cwProductEan;
	        if(cwEanCD.split(',').length > 1){
	        	cwEanCD = cwProductEan.split(',')[0];
	        }
	        //cwGetStorePro(cwEanCD);               
			// cwMarker.setPosition(place.geometry.location);
			var address = '';
			if (place.address_components) {
				address = [(place.address_components[0] && place.address_components[0].short_name || ''), (place.address_components[1] && place.address_components[1].short_name || ''), (place.address_components[2] && place.address_components[2].short_name || '')].join(' ');
			}
			//cwInfowindow.setContent(cwMakeGMPop(0));
			//cwInfowindow.open(cwMaps);
          });*/
	}
//
	function cwShowError(error) {
	  switch(error.code) {
	    case error.PERMISSION_DENIED:
	      cwMapElem = "User denied the request for Geolocation."
	      break;
	    case error.POSITION_UNAVAILABLE:
	      cwMapElem = "Location information is unavailable."
	      break;
	    case error.TIMEOUT:
	      cwMapElem = "The request to get user location timed out."
	      break;
	    case error.UNKNOWN_ERROR:
	      cwMapElem = "An unknown error occurred."
	      break;
	  }
	}
	//Access Current Location Starts
    //
    function loadDataWidget(compUrl, clientUrl,proId) {
        var cwConutDef = countryCode;
        if(countryCode){
            $CW.each(countryList.countries,function(key,val){
                if(val.default == 1){
                    cwConutDef = val.id;
                    return false;
                }
            });
        }
        //
        langCode = 'en',cwConutDef='';
        //
        //if(countryList.errorCode == 5 && countryList.countries.length){            
            var apiURL = './myfile.json';
        /*}else if(countryList.errorCode == 5){
            var apiURL = compUrl+"/getPriceRetailDynamicForm?keyVal="+CARTWIREWIDGETKEYFORCHECKING+"&langCode="+langCode;
        }else{
            var apiURL = compUrl+"/getPriceRetailDynamicForm?keyVal="+CARTWIREWIDGETKEYFORCHECKING+"&langCode="+langCode;
        }*/
        horizontalL(0);        
        $CW('#dialog_popup_inner_cw .widgetScrollWrap').slideUp(600);
        $CW.ajax({
            url: apiURL,
            async: true,
            type: "GET",
            dataType: 'text',
            success: function(data) {
                //data = '{"items":[{"b25353904cb483c1f7f8c42856786136":[{"product":[{"show_country_price_status":"1","show_country_offer_status":"1","show_store_locator":"0","table_header":"Sold By, Price, Offers, Buy Online","price_symbol":"Â£","pdate":"March 15, 2021","totalWProduct":"1","brand_name":"ATH - UK","widget_name":"TRESemmÃ© Keratin Smooth Heat Protection Shine Spray","title":"Buy Online","image_url":"https://s3.cartwire.co/widget/v2.0/assets/UK/ATH/Brands/widget/4164.jpg","widget_id":"32068","product_id":"44373","product_variant":"","product_variant_id":"","product_ean":"","widget_theme_id":"791","widget_outer_class":"ponds-widget-wrapper tworet-widget-cont","widget_title_wrap":"widget_title_wrap_cw","widget_closebutton":"","show_price_status":"1","widget_img_instock":"retlogo_cw","widget_img_outofstock":"retlogo_cw outstock_cw_dove","widget_pointer":"","widget_btn_wrap":"btnwrap_cw","widget_disabled":"notavailable unavailableBtn","unvailable_msg":"0","msg_container_class":"","ip_address":"115.242.209.74","showDiv":"0","overlay_class":"","cw_structure_css":"knorrWgdtmainCont,knorrWgdt_overlay,knorrWgdt_outer,kwidetwrap_cw","cw_conditional_css":"CTDiaPop_cw,cwPopAlign,doveIngWidget,btnwrapdove_cw","count_retailer":"6","country_name":"United Kingdom","countryCount":[{"retailer":"6","country_name":"United Kingdom","cssClass":""}],"show_available_retailers":"0","show_available_class":"","buy_in_store_txt":"Buy In Store","nearest_store_txt":"Find your nearest store","postal_address_txt":"Postcode, town or area","current_location_txt":"Use current location","nearest_stores_txt":"Your nearest stores","show_hide_txt":"Show map, Hide map","open_in_map_txt":"Open in Maps","search_txt":"Search","close_txt":"Close Widget","no_store_txt":"No stores found near your location","no_store_desc":"Try changing your postcode, town or area. Alternatively you can buy the product online or contact us to talk to our team.","contact_txt":"Contact Us","contact_url":"https://www.colmans.co.uk/contact-us.html","metric_txt":"km","imperial_txt":"miles","result_txt":"Results @ stores within @@ radius","variant_count":"1","variant_default":"1","disclaimer":"All prices were last updated on March 15, 2021. Visit the retailers website for the latest prices and offers.","disclaimer_out_stock1":"Product information is currently unavailable.","disclaimer_out_stock2":"Please visit the retailers website for availability, price, offers.","disclaimer_status":"1","retailer":[{"prtpId":"nofollow","iframe_url":"0","is_available":" ","buy_now_url":"https://www.sainsburys.co.uk","status":"","category":"","sub_category":"","quantity":"","price":"null","sku_code":" ","product_id":"44373","retailer_id":"427","cw_offer":"","cw_offer_desc":"","retailer_name":"Sainsburys","retailer_logo":"sainsburys_130x40.jpg","pav_name":"","pav_id":"","widget_single_class":" ","product_attribute_id":"-1","variant_type":"1","stock_txt":" Out of stock","buy_now_text":"Visit site"},{"prtpId":"nofollow","iframe_url":"0","is_available":"1","buy_now_url":"https://www.superdrug.com/Hair/Hair-Treatments/Hair-Heat-Protection/TRESemme-Pro-Keratin-Smooth-Heat-Protect-Spray-200ml/p/722135","status":"1","category":"ATH","sub_category":"ATH","quantity":"","price":"2.99","sku_code":" ","product_id":"44373","retailer_id":"491","cw_offer":"Better than 1/2 price on selected tresemme","cw_offer_desc":"Better than 1/2 price on selected tresemme","retailer_name":"Superdrug","retailer_logo":"superdrug_uk_130x40.jpg","pav_name":"","pav_id":"","widget_single_class":" ","product_attribute_id":"-1","variant_type":"1","stock_txt":"In Stock","buy_now_text":"Buy"},{"prtpId":"nofollow","iframe_url":"0","is_available":"1","buy_now_url":"https://groceries.morrisons.com/products/tresemme-pro-collection-keratin-smooth-heat-protect-hair-spray-362950011","status":"1","category":"ATH","sub_category":"ATH","quantity":"","price":"3.5","sku_code":" ","product_id":"44373","retailer_id":"488","cw_offer":"","cw_offer_desc":"","retailer_name":"Morrisons","retailer_logo":"morrisons_uk_130x40.jpg","pav_name":"","pav_id":"","widget_single_class":" ","product_attribute_id":"-1","variant_type":"1","stock_txt":"In Stock","buy_now_text":"Buy"},{"prtpId":"nofollow","iframe_url":"0","is_available":"1","buy_now_url":"https://www.tesco.com/groceries/en-GB/products/297165442","status":"1","category":"ATH","sub_category":"ATH","quantity":"","price":"4.93","sku_code":" ","product_id":"44373","retailer_id":"425","cw_offer":"","cw_offer_desc":"","retailer_name":"Tesco_UK","retailer_logo":"tesco_uk_130x40.jpg","pav_name":"","pav_id":"","widget_single_class":" ","product_attribute_id":"-1","variant_type":"1","stock_txt":"In Stock","buy_now_text":"Buy"},{"prtpId":"nofollow","iframe_url":"0","is_available":"1","buy_now_url":"https://groceries.asda.com/product/910002917404","status":"1","category":"ATH","sub_category":"ATH","quantity":"","price":"5.95","sku_code":" ","product_id":"44373","retailer_id":"487","cw_offer":"","cw_offer_desc":"","retailer_name":"ASDA","retailer_logo":"asda_uk_130x40.jpg","pav_name":"","pav_id":"","widget_single_class":" ","product_attribute_id":"-1","variant_type":"1","stock_txt":"In Stock","buy_now_text":"Buy"},{"prtpId":"nofollow","iframe_url":"0","is_available":"1","buy_now_url":"https://www.boots.com/tresemme-pro-collection-keratin-smooth-heat-protect-spray-200ml-10230984","status":"1","category":"ATH","sub_category":"ATH","quantity":"","price":"5.99","sku_code":" ","product_id":"44373","retailer_id":"490","cw_offer":"2 for Â£6 on selected tresemme","cw_offer_desc":"2 for Â£6 on selected tresemme","retailer_name":"Boots","retailer_logo":"boots_uk_130x40.jpg","pav_name":"","pav_id":"","widget_single_class":" ","product_attribute_id":"-1","variant_type":"1","stock_txt":"In Stock","buy_now_text":"Buy"}]}]}]},{"9c92e921eabf27aa0c8b0c5a9c1657bb":[{"product":[{"show_country_price_status":"1","show_country_offer_status":"1","show_store_locator":"0","table_header":"Sold By, Price, Offers, Buy Online","price_symbol":"Â£","pdate":"March 15, 2021","totalWProduct":"1","brand_name":"ATH - UK","widget_name":"VO5 Freeze Hold Styling Gel","title":"Buy Online","image_url":"https://s3.cartwire.co/widget/v2.0/assets/UK/ATH/Brands/widget/4138.jpg","widget_id":"32070","product_id":"44375","product_variant":"","product_variant_id":"","product_ean":"","widget_theme_id":"791","widget_outer_class":"ponds-widget-wrapper tworet-widget-cont","widget_title_wrap":"widget_title_wrap_cw","widget_closebutton":"","show_price_status":"1","widget_img_instock":"retlogo_cw","widget_img_outofstock":"retlogo_cw outstock_cw_dove","widget_pointer":"","widget_btn_wrap":"btnwrap_cw","widget_disabled":"notavailable unavailableBtn","unvailable_msg":"0","msg_container_class":"","ip_address":"115.242.209.74","showDiv":"0","overlay_class":"","cw_structure_css":"knorrWgdtmainCont,knorrWgdt_overlay,knorrWgdt_outer,kwidetwrap_cw","cw_conditional_css":"CTDiaPop_cw,cwPopAlign,doveIngWidget,btnwrapdove_cw","count_retailer":"6","country_name":"United Kingdom","countryCount":[{"retailer":"6","country_name":"United Kingdom","cssClass":""}],"show_available_retailers":"0","show_available_class":"","buy_in_store_txt":"Buy In Store","nearest_store_txt":"Find your nearest store","postal_address_txt":"Postcode, town or area","current_location_txt":"Use current location","nearest_stores_txt":"Your nearest stores","show_hide_txt":"Show map, Hide map","open_in_map_txt":"Open in Maps","search_txt":"Search","close_txt":"Close Widget","no_store_txt":"No stores found near your location","no_store_desc":"Try changing your postcode, town or area. Alternatively you can buy the product online or contact us to talk to our team.","contact_txt":"Contact Us","contact_url":"https://www.colmans.co.uk/contact-us.html","metric_txt":"km","imperial_txt":"miles","result_txt":"Results @ stores within @@ radius","variant_count":"1","variant_default":"1","disclaimer":"All prices were last updated on March 15, 2021. Visit the retailers website for the latest prices and offers.","disclaimer_out_stock1":"Product information is currently unavailable.","disclaimer_out_stock2":"Please visit the retailers website for availability, price, offers.","disclaimer_status":"1","retailer":[{"prtpId":"nofollow","iframe_url":"0","is_available":" ","buy_now_url":"https://www.sainsburys.co.uk","status":"","category":"","sub_category":"","quantity":"","price":"null","sku_code":" ","product_id":"44375","retailer_id":"427","cw_offer":"","cw_offer_desc":"","retailer_name":"Sainsburys","retailer_logo":"sainsburys_130x40.jpg","pav_name":"","pav_id":"","widget_single_class":" ","product_attribute_id":"-1","variant_type":"1","stock_txt":" Out of stock","buy_now_text":"Visit site"},{"prtpId":"nofollow","iframe_url":"0","is_available":" ","buy_now_url":"https://groceries.asda.com","status":"","category":"","sub_category":"","quantity":"","price":"null","sku_code":" ","product_id":"44375","retailer_id":"487","cw_offer":"","cw_offer_desc":"","retailer_name":"ASDA","retailer_logo":"asda_uk_130x40.jpg","pav_name":"","pav_id":"","widget_single_class":" ","product_attribute_id":"-1","variant_type":"1","stock_txt":" Out of stock","buy_now_text":"Visit site"},{"prtpId":"nofollow","iframe_url":"0","is_available":" ","buy_now_url":"https://groceries.morrisons.com","status":"","category":"","sub_category":"","quantity":"","price":"null","sku_code":" ","product_id":"44375","retailer_id":"488","cw_offer":"","cw_offer_desc":"","retailer_name":"Morrisons","retailer_logo":"morrisons_uk_130x40.jpg","pav_name":"","pav_id":"","widget_single_class":" ","product_attribute_id":"-1","variant_type":"1","stock_txt":" Out of stock","buy_now_text":"Visit site"},{"prtpId":"nofollow","iframe_url":"0","is_available":" ","buy_now_url":"https://www.boots.com","status":"","category":"","sub_category":"","quantity":"","price":"null","sku_code":" ","product_id":"44375","retailer_id":"490","cw_offer":"","cw_offer_desc":"","retailer_name":"Boots","retailer_logo":"boots_uk_130x40.jpg","pav_name":"","pav_id":"","widget_single_class":" ","product_attribute_id":"-1","variant_type":"1","stock_txt":" Out of stock","buy_now_text":"Visit site"},{"prtpId":"nofollow","iframe_url":"0","is_available":" ","buy_now_url":"https://www.superdrug.com","status":"","category":"","sub_category":"","quantity":"","price":"null","sku_code":" ","product_id":"44375","retailer_id":"491","cw_offer":"","cw_offer_desc":"","retailer_name":"Superdrug","retailer_logo":"superdrug_uk_130x40.jpg","pav_name":"","pav_id":"","widget_single_class":" ","product_attribute_id":"-1","variant_type":"1","stock_txt":" Out of stock","buy_now_text":"Visit site"},{"prtpId":"nofollow","iframe_url":"0","is_available":"1","buy_now_url":"https://www.tesco.com/groceries/en-GB/products/262906098","status":"1","category":"ATH","sub_category":"ATH","quantity":"","price":"1.50","sku_code":" ","product_id":"44375","retailer_id":"425","cw_offer":" Any 3 for 2 clubcard price - cheapest product free...","cw_offer_desc":"Any 3 for 2 clubcard price - cheapest product free - selected travel products","retailer_name":"Tesco_UK","retailer_logo":"tesco_uk_130x40.jpg","pav_name":"","pav_id":"","widget_single_class":" ","product_attribute_id":"-1","variant_type":"1","stock_txt":"In Stock","buy_now_text":"Buy"}]}]}]}]}';
                cwData = JSON.parse(data); 
                makeWidgetStructure(0,proId);
                countryCode = 0;
            }
        });
    }

    function createTemplate(compUrl, myip, widgetId, titlesNm) {
        checkRefresh = 1;
        cdnPath = "https://s3-ap-southeast-1.amazonaws.com/www.cartwire.co/widget";//Delete
        var js_builddata_divblock = '', stockRow = '';
        if (variantChngChk) {
            //js_builddata_divblock += '<link href="' + cdnPath + '/v2.0/css/' + masterCssFilePath+'?ver='+dt.getTime()+'" rel="stylesheet" type="text/css" />';
            if(cwGMChk && cwShStLoc == '1'){
            	//js_builddata_divblock += '<script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>';
            	//js_builddata_divblock += '<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDgpRnMFee5_GFm7pbX_PiuiAg_R_8oCSs&callback=cwInitMap&libraries=places&v=weekly&language='+langCode+'" defer></script>';
            	cwGMChk = 0;
        	}
            //js_builddata_divblock += '<link href="resources/css/cw_gride_widget_main.css" rel="stylesheet" type="text/css" />';
            /*if (cssFilePath != '') {
                js_builddata_divblock += '<link href="' + cdnPath + '/v2.0/css/' + cssFilePath+'?ver='+dt.getTime()+'" rel="stylesheet" type="text/css" />';
                //js_builddata_divblock += '<link href="resources/css/cw_gride_widget.css" rel="stylesheet" type="text/css" />';
            }*/
        
            if ($CW.trim(customData) != '') {
                js_builddata_divblock += '<style type="text/css" id="cwCustomStyle">' + customData + '</style>';
            }
            if (cwMode) {
                js_builddata_divblock += '<div class="' + cwOverlayCssClass + '"><div class="cwOverlayBacks" id="cwOverlayBacksMod"></div><div class="' + cwStructureCss[2] + '"><div id="dialog_cw" class="widget-dialog-producte_cw ' + cwConditionalCss[0] + ' ' + cwConditionalCss[1] + '">';
            } else {
                 js_builddata_divblock += '<div class="cwOuterPosition ' + cwStructureCss[0] + ' ' + cwOverlayCssClass + ' ' + cwWidgetWrapCss + '" style="height: 100%;left: 0;position: fixed;top: 0;width: 100%;z-index: 9999991;"><div class="' + cwStructureCss[1] + '" id="cwOverlayBacksMod"></div><div class="' + cwStructureCss[2] + '"><div id="dialog_cw"  class="widget-dialog-producte_cw ' + cwConditionalCss[0] + ' ' + cwConditionalCss[1] + '">';
            }
            js_builddata_divblock += '<div class="widget-dialogr-pop_cw">';
            var widgetNmS = widgetNm.substr(0, 25);
            var getwidgetNamelength = widgetNm.length;
            if (getwidgetNamelength <= 25) {
                var widgetNameS = widgetNm;
            } else {
                var widgetNameS = widgetNm.substr(0, 25) + '...';
            }
            var classMore = '';
            var classWidget = 'single_widget';
            js_builddata_divblock += '<div class="dialog_popup_loaderWrap_cw" style="display:none;"><span class="loaderWrapinnerwrap_cw" style=""></span></div><div class="dialog_popup_container_cw ' + classMore + '">';
            js_builddata_divblock += '<div style="display:none;" id="dialog_popup_inner_cw">';
            js_builddata_divblock += '<div class="cwBgSettings ' + cwContainerClass + '">';
            js_builddata_divblock += '</div>';
            js_endblock = '</div>';
            js_endblock += '</div>';
            js_endblock += '</div>';
            js_endblock += '</div></div></div>';
            if (cwMode) {
                $CW('#widgetPre').append(js_builddata_divblock + js_endblock);
            } else if ($CW('#cwWidgetEmb').length) {
                $CW('#cwWidgetEmb').append(js_builddata_divblock + js_endblock);
            } else {
                $CW('body').append(js_builddata_divblock + js_endblock);
            }
            if (typeof(btnDisable) != "undefined") {
                btnDisable.disabled = false;
            }
            loadChk = 1; 
            if (viewMode != 'preview') {
                cwMyIP=myip,cwWidgetID=widgetId[0];
                cwAddViewCall('init');                
            }
            setTimeout(function() {
                $CW('.closebutton_cw, .closebutton_cont_cw, .cwOuterPosition, .' + cwStructureCss[0]).click(function(event) { closes(event); });
            }, 500);
        }
    }
    closes = function(e,esc){ 
        loadCheck = 1, loadChk = 1, variantChngChk = 1, cwCountryChk = 0;
        if(cwWV != -1){
            return false;
        }  
        cwElem = '';
        if(typeof(e) != "undefined" && typeof(e.target) != "undefined"){
            cwElem = e.target.className; 
        }
        if (cwElem == cwStructureCss[1] || cwElem.indexOf(cwConditionalCss[0]) > 0 || cwElem.indexOf('closebutton_cw') != -1 || cwElem.indexOf('closebutton_cont_cw') != -1 || cwElem.indexOf('cwOuterPosition') != -1 || esc == '1' || esc =='5') {
            jsVals = 0;
            if ($CW('#cwCustomStyle').length) {
                $CW('#cwCustomStyle').remove();
            }
            //$CW('#siteLoader_cw, #cwMainDivContainer, .' + cwStructureCss[0]).remove();
            $CW('#siteLoader_cw, #cwMainDivContainer, .cwOuterPosition, .pac-container.pac-logo, .' + cwStructureCss[0]).remove();                
            if (typeof(btnDisable) != "undefined") {
                btnDisable.disabled = false;
            }
            //$CW("link[href='" + cdnPath + "/v2.0/css/" + masterCssFilePath + "']").remove();
            /*if (cssFilePath) {
                $CW("link[href='" + cdnPath + "/v2.0/css/" + cssFilePath + "']").remove();
            }*/
            checkRefresh = 1;
            /*setTimeout(function(){                    
                $CW(cwBtnObject).focus();
            },300);*/
        } 
    }
    // Sorting Start
    function sortTable(table, col, reverse) {
        var tb = table.tBodies[0], // use `<tbody>` to ignore `<thead>` and `<tfoot>` rows
            tr = Array.prototype.slice.call(tb.rows, 0), // put rows into array
            i;
        reverse = -((+reverse) || -1);
        tr = tr.sort(function (a, b) { // sort rows
            // console.log(a.cells[col].getElementsByClassName("getPrice")[0].textContent.trim());
            return reverse // `-1 *` if want opposite order
                //* (a.cells[col].textContent.trim().localeCompare(b.cells[col].textContent.trim()));
                * (a.cells[col].getElementsByClassName("getPrice")[0].textContent.trim()-b.cells[col].getElementsByClassName("getPrice")[0].textContent.trim());
        });
        for(i = 0; i < tr.length; ++i) tb.appendChild(tr[i]); // append each row in order
        cwSetIndex();
    }
    // Sorting End
    function widgetInCenter() {
        setTimeout(function() {
            /*if (window.innerHeight <= $CW('#cwMainDivContainer').height() || $CW('body').height() <= $CW('#cwMainDivContainer').height()) {
                $CW('#cwMainDivContainer').css({ 'top': $CW('.cwOuterPosition').position().top, 'position': 'absolute' });
            }else if (/iPad/.test(navigator.userAgent)) {
                $CW('#cwOverlayBacksMod').css({ 'height': '20000px', 'width': '1025px' });
                $CW('#cwMainDivContainer').css({'top':$CW('.cwOuterPosition').position().top, 'position':'absolute'});
            }else if(widgetCode == "0001" && (/Mobi/.test(navigator.userAgent) || (/Android/.test(navigator.userAgent)))){  
                $CW('#cwMainDivContainer').css({ 'top': $CW('.cwOuterPosition').position().top, 'position': 'absolute' });
            } else {
                
                setTimeout(function(){
                    $CW('#cwMainDivContainer').css({ 'top': $CW(window).scrollTop(), 'position': 'absolute' });
                },500)
            }*/
            $CW('#cwMainDivContainer').css({ 'top': $CW(window).scrollTop(), 'position': 'absolute' });
        }, 0);
    }
}