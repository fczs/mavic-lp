<nav class="navbar navbar-default navbar-fixed-top">
    <div class="container">
        <ul class="nav navbar-nav">
            <?regular_text_field("menu-anchors", "Задать анкоры");?>
            <?foreach (preg_split('/[\r\n]+/', g("menu-anchors")) as $anchor):?>
                <?$anchor = preg_split('/#/', $anchor);?>
                <li><a href="#<?=$anchor[1] ?>"><?=$anchor[0]?></a></li>
            <?endforeach;?>
        </ul>
    </div>
</nav>