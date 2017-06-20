<? include(TEMPLATE_DIR . "/include/workers/up_btn.php"); ?>

<? include(TEMPLATE_DIR . "/include/workers/modal_callback.php"); ?>

<? include(TEMPLATE_DIR . "/include/workers/modal_success.php"); ?>

<?
cms_footer();
//src_scripts 
addfooterjs(SRC_VALIDATION_JS, "any");
addfooterjs(SRC_MASK_JS, "any");
addfooterjs(SRC_CAROUSEL_JS, "any");
addfooterjs(SRC_WOW_JS, "any");
addfooterjs(SRC_MAIN_JS, "any");
add_footer_js();
?>

</body>
</html>