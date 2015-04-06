$(document).ready(function() {
    Posts = [];
    Selected = window.location.hash.substr(1);

    for (var i = Index.length - 1; i >= 0; i--) {
        $("article").append("<section class='markdown-body' id='" + Index[i] + "'></section>");
    };

    window.onhashchange = function() {
        Selected = window.location.hash.substr(1);
        load();
    };

    load();
});

function load()
{
    if (Index.length == 0) {
        $(".info").html("There aren't any posts yet! Come back later.");
    } else if (Selected != "" && Index.indexOf(Selected) == -1) {
        document.title = "ninjadoge24's blog";
        $(".info").html("Sorry! That post doesn't exist.");
        $("section").html("");
    } else if (Posts.length == 0) {
        fetch(render);
    } else {
        render();
    }
}

function fetch(callback) {
    $(".info").html("Fetching posts&hellip;");
    for (var i = Index.length - 1; i >= 0; i--) {
        (function(i) {
            var slug = Index[i] + ".md";
            $.get("posts/" + slug, function(content) {
                Posts[i] = content;
                Posts[i] += "\n[permalink](#" + Index[i] + ")";
                Posts[i] += "\n[history](https://github.com/ninjadoge24/ninjadoge24.github.io/commits/master/posts/" + slug + ")";
                Posts[i] += "\n[edit](https://github.com/ninjadoge24/ninjadoge24.github.io/edit/master/posts/" + slug + ")";
                callback();
            });
        })(i);
    };
};

function render() {
    if (location.hash) {
        setTimeout(function() {
            window.scrollTo(0, 0);
        }, 100);
    }
    if (Selected != "" && Posts[Index.indexOf(Selected)]) {
        var i = Index.indexOf(Selected);
        var id = "#" + Selected;
        $(".info, section").html("");
        $(id).html(marked(Posts[i]));
        var title = $(id).children().first().html();
        var link = "<a href='" + id + "'>" + title + "</a>";
        document.title = title + " - ninjadoge24's blog";
        $(id).children().first().html(link);
    } else if (Selected == "") {
        $(".info").html("");
        document.title = "ninjadoge24's blog";
        for (var i = Posts.length - 1; i >= 0; i--) {
            var id = "#" + Index[i];
            if ($(id).html() == "") {
                $(id).html(marked(Posts[i]));
                var title = $(id).children().first().html();
                var link = "<a href='" + id + "'>" + title + "</a>";
                $(id).children().first().html(link);
            };
        };
    };
};
