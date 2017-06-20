<?
function sharebuttons($url, $title){
    $buttons = array(
	"odnoklassniki" => '<a target="_blank" href="http://www.odnoklassniki.ru/dk?st.cmd=addShare&url=#url#&title=#title#"><images src="/images/social-odn.png" /></a>',
	"vk" => '<a target="_blank" href="http://vk.com/share.php?url=#url#"><images src="/images/social-vk.png" /></a>',
	"ya" => '<a target="_blank" href="http://my.ya.ru/posts_share_link.xml?url=#url#/&title=#title#"><images src="/images/social-ya.png" /></a>',
	"mail" => '<a target="_blank" href="http://connect.mail.ru/share?share_url=#url#"><images src="/images/social-mail.png" /></a>',
	"fb" => '<a target="_blank" href="http://www.facebook.com/sharer.php?u=#url#"><images src="/images/social-fb.png" /></a>',
	"tw" => '<a target="_blank" href="http://twitter.com/intent/tweet?text=#title# #url#"><images src="/images/social-tw.png" /></a>'
    );

    foreach($buttons as $key=>$val){
	$txt = $val;
	$txt = preg_replace("/#url#/", $url, $txt);
	$txt = preg_replace("/#title#/", $title, $txt);
	echo "<div class=\"item\">$txt</div>";
    }
}