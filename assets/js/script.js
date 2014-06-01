for (var i = Posts.length - 1; i >= 0; i--) {
	var post = Posts[i];
	$.get("posts/" + post, function(data) {
		// console.log(post);
		// console.log(data);
		$('article').append("<section><pre>" + data + "</pre></section>");
	});
};
