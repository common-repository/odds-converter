<?php
class BSoddsConverter extends WP_Widget {
    public function __construct() {
        parent::__construct(
                'BSoddsConverter', 'Modulout - Odds converter', array('description' => __('Odds converter on your site', "OddsConverter"),)
        );
    }
    
    public static function ts_register_widget() {
        return register_widget("BSoddsConverter");
    }
    
    public function form($instance) {
        $title = (isset($instance['title']))?$instance['title']:__('Title', 'OddsConverter');
        $description = (isset($instance['description']))?$instance['description']:__('Odds converter will convert odds between decimal (separated with .), fractional (example: 1/2) and american (example: -200 or 120).', 'OddsConverter' );
        ?>
        <p>
            <label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php _e( 'Title:' ); ?></label> 
            <input class="widefat" id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" type="text" value="<?php echo esc_attr($title); ?>">
        </p>
        <textarea class="widefat" rows="16" cols="20" id="<?php echo $this->get_field_id('description'); ?>" name="<?php echo $this->get_field_name('description'); ?>"><?php echo esc_attr($description); ?></textarea>
        <?php 
    }
    function update($new_instance, $old_instance) {
        $instance = $old_instance;
        $instance['title'] = $new_instance['title'];
        $instance['description'] = $new_instance['description'];
        return $instance;
    }
    function widget($args, $instance) {
        extract($args, EXTR_SKIP);
        $title = $instance['title'];
        $description = $instance['description'];
        echo $before_widget;
        if (!empty($title)) {
            echo $args['before_title'] . $title . $args['after_title'];
        }
        ?>
        <p>
            <label for="decimal"><?php _e('Decimal', "OddsConverter"); ?></label>
            <input type="text" name="decimal" id="decimal" />
        </p>
        <p>
            <label for="fractional"><?php _e("Fractional", "OddsConverter"); ?></label>
            <input type="text" name="fractional" id="fractional" />
        </p>
        <p>
            <label for="american"><?php _e("American", "OddsConverter"); ?></label>
            <input type="text" name="american" id="american" />
        </p>
        <div class="textwidget"><?php echo $description; ?></div>
        <?php
        echo $after_widget;
    }

}
add_action( 'widgets_init', array('BSoddsConverter', 'ts_register_widget') );