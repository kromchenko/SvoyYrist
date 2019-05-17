<?php

namespace Modulify;

// Exit if accessed directly. 
if ( ! defined( 'ABSPATH' ) ) { exit; }


// Helper Class
class Modulify_Helper
{
	
	public static function modulify_open_wrap(){
		return '<div class="modulify_wrapper">';
	}
	public static function modulify_close_wrap(){
		return '</div>';
	}
}
