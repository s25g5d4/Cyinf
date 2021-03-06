<nav class="st-menu st-effect-1" id="menu-1">
    <h2 class="dr-icon dr-icon-menu">&nbsp;MENU</h2>
    <ul>
        @if( \Auth::check() )
            <li style="font-family:微軟正黑體"><a>{{ \Auth::getUser()->nick_name }}</a></li>
        @endif
        <li><a class="icon icon-shop" href="/">Home</a></li>
        <li><a class="icon icon-study" href="/search#slide-main">Search</a></li>
        <li><a class="icon icon-heart" href="/favorites">Favorite Class</a></li>
        <li><a class="icon icon-data" href="/rank">Rank</a></li>
        <!--<li><a class="icon icon-news" href="coursePK">Course P.K.</a></li> -->
        <li><a class="icon icon-user" href="/users/profile">Profile</a></li>
        <li><a class="icon icon-lab" href="/faq">F.A.Q</a></li>
        <li><a class="icon icon-mail" href="https://docs.google.com/forms/d/1LMkwDuMIwNF9aZ4yq9nTvVUmUKphklhxQP1cIpnHd6U/viewform" target="_blank">Contact</a></li>
        <li><a class="icon icon-photo" href="/about">About</a></li>
        @inject('sidebarPresenter', 'Cyinf\Presenters\SidebarPresenter')
        {!! $sidebarPresenter->viewLogInOrOut() !!}
    </ul>
</nav>

<!-- content push wrapper -->
<div class="st-pusher">
    <div class="st-content"><!-- this is the wrapper for the content -->
        <div class="st-content-inner"><!-- extra div for emulating position:fixed of the menu -->
            <div class="main clearfix">
                <div id="st-trigger-effects" class="column">
                    <a href="#" data-effect="st-effect-1" id="menuBar"><i class="dr-icon dr-icon-menu"></i></a>
                </div>
            </div><!-- /main -->
        </div><!-- /st-content-inner -->
    </div><!-- /st-content -->
</div><!-- /st-pusher -->