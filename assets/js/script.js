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
            $("#" + i).html("<pre>" + Posts[i] + "</pre>");
        };
    };
};
