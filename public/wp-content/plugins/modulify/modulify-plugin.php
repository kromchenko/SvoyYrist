<?php

namespace Modulify;

// Exit if accessed directly. 
if ( ! defined( 'ABSPATH' ) ) { exit; }


// Main Plugin Class
class Modulify_Plugin
{
	
	
    // Constructor
    public function __construct()
    {
        $this->add_actions();
		
    }
    
	public function modulify_fn_admin_scripts() {
		wp_enqueue_style('modulify-fn-admin-style',plugins_url( 'assets/css/admin-style.css', __FILE__ ), array(), '1.0', 'all');
	}
    
	// Add Actions
    private function add_actions()
    {
        // Add New Elementor Categories
        add_action( 'elementor/init', array( $this, 'add_elementor_category' ), 999 );
        // Register Widget Scripts
        add_action( 'elementor/frontend/after_enqueue_scripts', array( $this, 'register_widget_scripts' ) );
        // Register Widget Styles
        add_action( 'elementor/frontend/after_enqueue_styles', array( $this, 'register_widget_styles' ) );
        // Register New Widgets
        add_action( 'elementor/widgets/widgets_registered', array( $this, 'register_widgets' ), 10 );
		
		add_action( 'admin_enqueue_scripts', array($this,'modulify_fn_admin_scripts') );
    }
    
	
    // Add New Categories to Elementor
    public function add_elementor_category()
    {
        \Elementor\Plugin::instance()->elements_manager->add_category( 'modulify-elements', array(
            'title' => __( 'Modulify Elements', 'modulify' ),
        ), 1 );
    }
    
    // Register Widget Scripts
    public function register_widget_scripts()
    {
		wp_enqueue_script( 'modulify_plugins', plugins_url( 'assets/js/plugins.js', __FILE__ ), array( 'jquery' ), true, 1, 'all' );
		wp_enqueue_script( 'modulify_inito', plugins_url( 'assets/js/inito.js', __FILE__ ), array( 'jquery' ), true, 1, 'all' );
		
    }
	
    // Register Widget Styles
    public function register_widget_styles()
    {
		wp_enqueue_style( 'modulify_style', plugins_url( 'assets/css/style.css', __FILE__ ), false, 1, 'all' );
		wp_enqueue_style( 'modulify_plugins', plugins_url( 'assets/css/plugins.css', __FILE__ ), false, 1, 'all' );
		wp_enqueue_style( 'modulify_fontello', plugins_url( 'assets/css/fontello.css', __FILE__ ), false, 1, 'all' );
    }
    
	
    // Register New Widgets
    public function register_widgets()
    {
        $this->include_widgets();
		$this->include_widget_outputs();
    }
    
	
    // Include Widgets
    private function include_widgets()
    {
		foreach(glob(plugin_dir_path( __FILE__ ) . '/widgets/*.php' ) as $file ){
			$this->include_widget( $file );
		}
		
    }
	
	
	// Include and Load Widget
    private function include_widget($file)
    {
		
		$base  = basename( str_replace( '.php', '', $file ) );
		$class = ucwords( str_replace( '-', ' ', $base ) );
		$class = str_replace( ' ', '_', $class );
		$class = sprintf( 'Modulify\Widgets\%s', $class );
		
		require_once $file; // include widget php file
		
		if ( class_exists( $class ) ) {
			\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new $class ); // load widget class
		}
		
    }
	
	
	// call to widget outputs
	private function include_widget_outputs()
    {
		foreach(glob(plugin_dir_path( __FILE__ ) . '/widgets/output/*.php' ) as $file ){
			require_once $file;
		}
    }
	
	

}