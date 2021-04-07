<?php
header('Content-Type: text/html; charset=utf-8');
if (!defined('BASEPATH')) exit('No direct script access allowed');
include ("connect.php");

class Widget_standalone_theme extends CI_Controller
{

	var $multiLang = 0; 

	public function __construct(){
		
		parent::__construct();
		$this->load->library('session');
		$this->load->model('user_model');
		$this->load->model('login_model');
		$this->load->model('widget_standalone_theme_model');
		$this->load->library('pagination');
		$this->load->library('geoplugin');
		$this->load->model('page_model');				
		$this->load->helper('form');
  	    $this->load->helper('url');
		
	}

	/*
	* @created : Nov 24, 2021
	* @author  : Deepak Verma
	* @access  : private
	* @Purpose : This function is use to return brand image for widget
	* @params  : int(product_id)
	* @return  : image url
	*/
	

	function getStandaloneWidgetDetails()
	{
		$wStandAloneCWCode 	 = $_GET['cwCode'];
		$wStandAlonecwUrl 	 = $_GET['brandURL'];
		$LangCodes 			 = 'en';
		$widgetTheme   		 = $this->widget_standalone_theme_model->getCssFilenameCustom($wStandAloneCWCode);
		$domainName          = $widgetTheme[0]->domain_name;
		$brandName           = explode('-',$domainName);
		$brandArr            = array('LBP' => 'Love Beauty And Planet','Hellmanns' => 'Hellmann\'s','GB' => 'GB Glace','Clear' => 'Ultrex','frisko' =>'heartbrand','sharehappy' => 'heartbrand');
        $brandStr            = trim($brandName[0]);
        $brandVal            = $brandArr[$brandStr];
		if(!empty($brandVal)){
          $brand = $brandVal;
		}else{
          $brand = $brandStr;
		}
		$errormsg 			 = $this->widget_standalone_theme_model->validateWidget($wStandAloneCWCode,$LangCodes,$wStandAlonecwUrl);
		$arrStandAloneCWData = '';
		$arrStandAloneCWData.= '{"StandAloneCW" : [ {';
		if($errormsg != "")
		{
		  $arrStandAloneCWData .= '"'."errMsg".'"'.":"." ".'"'.$errormsg.'"';						
		}
		else
		{
			$arrStandAloneCWData .= '"'."country_name".'"'.":"." ".'"'.$widgetTheme[0]->country.'"'.",";
			$arrStandAloneCWData .= '"'."brand_name".'"'.":"." ".'"'.strtolower($brand).'"'.",";
			$arrStandAloneCWData .= '"'."brand_id".'"'.":"." ".'"'.$widgetTheme[0]->brand_id.'"'.",";
			$arrStandAloneCWData .= '"'."brand_logo".'"'.":"." ".'"'.trim($widgetTheme[0]->brand_logo).'"'.",";
			$arrStandAloneCWData .= '"'."locale".'"'.":"." ".'"'.$widgetTheme[0]->locale.'"'.",";
			$arrStandAloneCWData .= '"'."latitude".'"'.":"." ".'"'.$widgetTheme[0]->latitude.'"'.",";
			$arrStandAloneCWData .= '"'."longitude".'"'.":"." ".'"'.$widgetTheme[0]->longitude.'"'.",";
			$arrStandAloneCWData .= '"'."theme_name".'"'.":"." ".'"'.$widgetTheme[0]->theme_name.'"'.",";
			$arrStandAloneCWData .= '"'."store_loc_txt".'"'.":"." ".'"'.$widgetTheme[0]->store_loc_txt.'"'.",";
			$arrStandAloneCWData .= '"'."store_loc_desc".'"'.":"." ".'"'.$widgetTheme[0]->store_loc_desc.'"'.",";
			$arrStandAloneCWData .= '"'."enter_loc_txt".'"'.":"." ".'"'.$widgetTheme[0]->enter_loc_txt.'"'.",";
			$arrStandAloneCWData .= '"'."search_button_txt".'"'.":"." ".'"'.$widgetTheme[0]->search_button_txt.'"'.",";
			$arrStandAloneCWData .= '"'."show_hide_txt".'"'.":"." ".'"'.$widgetTheme[0]->show_hide_txt.'"'.",";
			$arrStandAloneCWData .= '"'."buy_now_txt".'"'.":"." ".'"'.$widgetTheme[0]->buy_now_txt.'"'.",";
			$arrStandAloneCWData .= '"'."step_2_action".'"'.":"." ".'"'.$widgetTheme[0]->step_2_action.'"'.",";
			$arrStandAloneCWData .= '"'."ch_prod_txt".'"'.":"." ".'"'.$widgetTheme[0]->ch_prod_txt.'"'.",";
			$arrStandAloneCWData .= '"'."find_store_txt".'"'.":"." ".'"'.$widgetTheme[0]->find_store_txt.'"'.",";
			$arrStandAloneCWData .= '"'."button_txt".'"'.":"." ".'"'.$widgetTheme[0]->button_txt.'"'.",";
			$arrStandAloneCWData .= '"'."edit_txt".'"'.":"." ".'"'.$widgetTheme[0]->edit_txt.'"'.",";
			$arrStandAloneCWData .= '"'."open_in_maps_txt".'"'.":"." ".'"'.$widgetTheme[0]->open_in_maps_txt.'"'.",";
			$arrStandAloneCWData .= '"'."master_css".'"'.":"." ".'"'.$widgetTheme[0]->master_css.'"'.",";
			$arrStandAloneCWData .= '"'."child_css".'"'.":"." ".'"'.$widgetTheme[0]->child_css.'"'.",";
			$arrStandAloneCWData .= '"'."keyword_txt".'"'.":"." ".'"'.$widgetTheme[0]->keyword_txt.'"'.",";
			$arrStandAloneCWData .= '"'."current_location_txt".'"'.":"." ".'"'.$widgetTheme[0]->current_location_txt.'"'.",";
			$arrStandAloneCWData .= '"'."no_product_filter".'"'.":"." ".'"'.$widgetTheme[0]->no_product_filter.'"'.",";
			$arrStandAloneCWData .= '"'."no_store_txt".'"'.":"." ".'"'.$widgetTheme[0]->no_store_txt.'"'.",";
			$arrStandAloneCWData .= '"'."no_store_desc".'"'.":"." ".'"'.$widgetTheme[0]->no_store_desc.'"'.",";
			$arrStandAloneCWData .= '"'."contact_txt".'"'.":"." ".'"'.$widgetTheme[0]->contact_txt.'"'.",";
			$arrStandAloneCWData .= '"'."contact_url".'"'.":"." ".'"'.$widgetTheme[0]->contact_url.'"'.",";
			$arrStandAloneCWData .= '"'."imperial_txt".'"'.":"." ".'"'.$widgetTheme[0]->imperial_txt.'"'.",";
			$arrStandAloneCWData .= '"'."metric_txt".'"'.":"." ".'"'.$widgetTheme[0]->metric_txt.'"'.",";
			$arrStandAloneCWData .= '"'."result_txt".'"'.":"." ".'"'.$widgetTheme[0]->result_txt.'"'.",";
			$arrStandAloneCWData .= '"'."search_button_txt".'"'.":"." ".'"'.$widgetTheme[0]->search_button_txt.'"'.",";
		}
		$arrStandAloneCWData .= "} ]"."}";
		echo $_GET['callback']."(".($arrStandAloneCWData).")";
  	}
}
