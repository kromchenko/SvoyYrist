<?php
/**
 * Plugin Name: Modulify
 * Plugin URI:  https://codecanyon.net/item/modulify/
 * Description: Brand new addon for Elementor Page builder. It provides the set of modules to create different kinds of content, adds custom modules to your website and applies attractive styles in the matter of several clicks!
 * Version:     1.1
 * Author:      Frenify
 * Author URI:  https://codecanyon.net/user/frenify/portfolio
 * Text Domain: modulify
 * License:     GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 * Domain Path: /languages
 */

// Exit if accessed directly. 
if ( ! defined( 'ABSPATH' ) ) { exit; }


if ( ! class_exists( 'Modulify_Core' ) ) 
{
	
	class Modulify_Core {
		
		// ---------------------------------------------------------
		// VARIABLES
		// ---------------------------------------------------------
		private static $instance = null;
		
		public $version = '1.0';
		
		private $plugin_path = null;
		
		
		// ---------------------------------------------------------
		// FUNCTIONS
		// ---------------------------------------------------------
		
		// Disable class cloning
		public function __clone() 
		{

			// Cloning instances of the class is forbidden
			_doing_it_wrong( __FUNCTION__, esc_html__( 'Cheatin&#8217; huh?', 'modulify' ));

		}
		
		
		// Disable unserializing the class.
		public function __wakeup() 
		{

			// Unserializing instances of the class is forbidden.
			_doing_it_wrong( __FUNCTION__, esc_html__( 'Cheatin&#8217; huh?', 'modulify' ));

		}
		
		
		public function __construct() 
		{
			
			$this->includes();
			$this->init_hooks();
			
			
			define ('MODULIFY_PLUGIN_URL', plugin_dir_url(__FILE__));
			define ('MODULIFY_PLACEHOLDERS_URL', plugin_dir_url(__FILE__).'assets/img/placeholders/');
		
		}
		
		
		// Includes
		public function includes() 
		{

			require_once( __DIR__ . '/modulify-plugin.php' );
			require_once( __DIR__ . '/includes/modulify-helper.php' );
		}
		
		
		// Hook into actions and filters.
		private function init_hooks() 
		{

			add_action( 'init', [ $this, 'translation' ] );
			add_action( 'plugins_loaded', [ $this, 'init' ] );

		}
		
		
		// Check if elementor exists
		public function init() 
		{
			
			// Check if Elementor installed and actived
			if ( ! did_action( 'elementor/loaded' ) ) {
				add_action( 'admin_notices', [ $this, 'admin_notice_missing_main_plugin' ] );
				return;
			}
			
			// Modulify Classes
			new \Modulify\Modulify_Plugin();
		}
		
		
		// Warning when the site doesn't have Elementor installed or activated.
		public function admin_notice_missing_main_plugin() 
		{
			$message = sprintf(
				/* translators: 1: Modulify 2: Elementor */
				esc_html__( '"%1$s" requires "%2$s" to be installed and activated.', 'modulify' ),
				'<strong>' . esc_html__( 'Modulify', 'modulify' ) . '</strong>',
				'<strong>' . esc_html__( 'Elementor', 'modulify' ) . '</strong>'
			);
			printf( '<div class="notice notice-warning is-dismissible"><p>%1$s</p></div>', $message );

		}

		
		// Load text domain
		public function translation() 
		{
			load_plugin_textdomain( 'modulify', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );
		}
		
		
		
		
		
		// Returns the instance.
		public static function get_instance() 
		{
			// If the single instance hasn't been set, set it now.
			if ( null == self::$instance ) {
				self::$instance = new self;
			}
			return self::$instance;
		}
		
	}
	
}


if ( ! function_exists( 'modulify_load' ) ) 
{
	// Returns instanse of the plugin class.
	function Modulify_load() 
	{
		return modulify_Core::get_instance();
	}
	
	modulify_load();
}

