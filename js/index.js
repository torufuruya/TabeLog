(function() {
	$(".submit").bind('click', function() {
		getCurrentPosition();
	});

	function getCurrentPosition() {
		navigator.geolocation.getCurrentPosition(
			function(position) {
				request(position);
			}, function(err) {
				console.log(err.message);
			}
		);
	}

	function request(position) {
		$.ajax({
			url: 'http://localhost/tabelog/server/index.php',
			type: 'POST',
			//data: getCurrentPosition(),
			data: {
				'latitude': position.coords.latitude,
				'longitude': position.coords.longitude
			},
			success: function(data) {
				var data = JSON.parse(data);
				appendData(data.Item);
			}
		})
		.done(function() {
			console.log("success");
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
	}

	function appendData(data) {
		var source = $("#entry-template").html();
        var template = Handlebars.compile(source);
        var content = {
            'list': data
        };
        var html = template(content);
		$(".contents").append(html)
	}
})();