<?php

//System
$_SERVER['DOCUMENT_ROOT'] = dirname(__FILE__);
define('CMS', 1);

//Core JS libs
define('JQUERY', '//yastatic.net/jquery/2.1.4/jquery.min.js');
define('JQUERYFORM', 'components/jquery.form.js');
define('YAMAP', "//api-maps.yandex.ru/2.1/?lang=ru_RU");
define('JQUERYUI_JS', '//code.jquery.com/ui/1.11.4/jquery-ui.min.js');
define('BOOTSTRAP_JS', '//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js');
define('FANCYBOX_JS', "//yandex.st/jquery/fancybox/2.1.4/jquery.fancybox.min.js");

//Core CSS libs
define('JQUERYUI_CSS', '//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css');
define('BOOTSTRAP_CSS', '//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css');
define('FANCYBOX_CSS', "//yandex.st/jquery/fancybox/2.1.4/jquery.fancybox.css");

//Source JS files
define('SRC_SELECT_JS', "src/js/bootstrap-select.min.js");
define('SRC_VALIDATION_JS', "src/js/jquery.validation.min.js");
define('SRC_CAROUSEL_JS', "src/js/owl.carousel.min.js");
define('SRC_HEADHEASIVE_JS', "src/js/headheasive.js");
define('SRC_MASK_JS', "src/js/jquery-mask.js");
define('SRC_WOW_JS', "src/js/wow.min.js");
define('SRC_MAIN_JS', "src/js/main.js");

//Source CSS files
define('SRC_SELECT_CSS', "src/css/bootstrap-select.min.css");
define('SRC_NONRESPONSIVE_CSS', "src/css/non-responsive.css");
define('SRC_CAROUSEL_CSS', "src/css/owl.carousel.css");
define('SRC_ANIMATE_CSS', "src/css/animate.min.css");
define('SRC_STYLES_CSS', "src/css/main.css");
define('SRC_FONTS_CSS', "src/css/fonts.css");
define('SRC_ICONS_CSS', "src/css/icons.css");

//Production CSS and JS
define('MAIN_JS', "templates/universal/js/main.min.js");
define('STYLES_CSS', "templates/universal/css/styles.min.css");