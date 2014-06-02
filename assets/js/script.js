$(document).ready(function() {
    Posts = [];
    $("article").html("<small>Fetching posts...</small>");
    fetchAndRenderPosts();
});

function fetchAndRenderPosts() {
    for (var i = Index.length - 1; i >= 0; i--) {
        (function(i) {
            var post = Index[i];
            $.get("posts/" + post, function(data) {
                Posts[i] = data;
                renderPosts();
            });
        })(i);
    };
};

function renderPosts() {
    $("article").html("");
    for (var i = Posts.length - 1; i >= 0; i--) {
        if (Posts[i]) {
            $("article").append("<section id='" + i + "'></section>");
            $("#" + i).html(markdown.toHTML(Posts[i]));
            $("#" + i).children().first().attr("onClick", "renderPost(" + i + ")");
        };
    };
};

function renderPost(id) {
    if (Posts[id]) {
        $("article").html("<section id='" + id + "'></section>");
        $("#" + id).html(markdown.toHTML(Posts[id]));
        $("#" + id).append("<small><a target='_blank' href='https://github.com/ninjadoge24/ninjadoge24.github.io/commits/master/posts/" + Index[id] + "' >history</a></small> &middot; ");
        $("#" + id).append("<small><a target='_blank' href='https://github.com/ninjadoge24/ninjadoge24.github.io/edit/master/posts/" + Index[id] + "'>edit</a></small> &middot; ");
        $("#" + id).append("<small><a target='_blank' href='https://raw.githubusercontent.com/ninjadoge24/ninjadoge24.github.io/master/posts/" + Index[id] + "'>source</a></small>");
    } else {
        $("article").html("<small>Sorry! That post doesn't exist.</small>");
    };
};
