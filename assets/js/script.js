$("article").html("<small>Fetching posts...</small>");
var posts = [];
for (var i = Index.length - 1; i >= 0; i--) {
	(function(i) {
		var post = Index[i];
		$.get("posts/" + post, function(data) {
			posts[i] = data;
			$("article").html("");
			for (var j = posts.length - 1; j >= 0; j--) {
				if (posts[j]) {
					$("article").append("<section id='" + j + "'></section>");
					$("#" + j).html("<pre>" + posts[j] + "</pre>");
				};
			};
		});
	})(i);
};
