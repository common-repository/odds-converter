<?php 
/*
Plugin Name: Oddsconverter
Plugin URI: http://www.modulout.com
Description: Odds converter
Author: Modulout
Version: 1.0.1
Author URI: http://www.modulout.com
*/
include_once 'BSoddsConverter.php';
function bs_oddsconvert_scripts() {
    wp_enqueue_script('custom-script', plugins_url("js/change_odds.js", __FILE__), array( 'jquery' ));
}
add_action( 'wp_enqueue_scripts', 'bs_oddsconvert_scripts' );