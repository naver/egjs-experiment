var data = {
	getItems: function(offset, limit) {
		var items = _.range(limit)
			.map(function(n) {
				return {
					offset: offset + n,
					imgSrc: "./img/" + (n + 1) + ".jpg",
					href: "http://naver.com/",
					desc: "Cras justo odio..."
				};
			});
		return {items: items};
	}
};