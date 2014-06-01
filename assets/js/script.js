Posts = []

for (var i = Index.length - 1; i >= 0; i--) {
	(function(i) {
		var post = Index[i];
		$.get("posts/" + post, function(data) {
			Posts[i] = data;
			$("article").html("");
			for (var j = Posts.length - 1; j >= 0; j--) {
				var html = "<section><pre>" + Posts[j] + "</pre></section>";
				$("article").append(html);
			};
		});
	})(i);
};
