$(document).ready(function() {
	var limit = 60;
	var source = $("#items-template").html();
	var template = Handlebars.compile(source);

	var $loading = $("#wrap_loading");
	var $appendLoadingbar = $("#append-loading-bar");
	var $prependLoadingbar = $("#prepend-loading-bar");
	var $footer = $(".footer");
	var $grid = $("#grid");
	var infiniteGridService = new eg.InfiniteGridService("#grid");

	function getOffset(pos) {
		var offset = 0;

		if (pos === "first") {
			offset = $("#grid").find(".item").first().data("offset");
			offset = parseInt(offset, 10) - limit;
		} else if (pos === "last") {
			offset = $("#grid").find(".item").last().data("offset");
			offset = parseInt(offset, 10) + 1;
		}
		return offset;
	};

	/*
	 아이템의 <a> 클릭시 persist 데이터를 저장
	 */
	$grid.on("click", "a", function() {
		infiniteGridService.store();
	});

	/*
	 "append" 이벤트 핸들러
	 스크롤 다운 중 최하단 아이템이 화면에 보여질 때(threshold로 보정 가능)
	 threshold가 300이면 최하단 아이템이 화면에 보여지기 300px 전에 이벤트 발생
	 로딩바를 보이고 appendAjax 메소드를 호출해 서버에 데이터를 요청함
	 응답데이터를 #grid에 append 함
	 */
	infiniteGridService.on("append", function() {
		$appendLoadingbar.show();
		var offset = getOffset("last");
		var html = template(data.getItems(offset, limit));
		infiniteGridService.append(html);
	});

	/*
	 "preppend" 이벤트 핸들러
	 스크롤 업 중 최상단 아이템이 화면에 보여질 때(threshold로 보정 가능)
	 threshold가 300이면 최하단 아이템이 화면에 보여지기 300px 전에 이벤트 발생
	 로딩바를 보이고 prependAjax 메소드를 호출해 서버에 데이터를 요청
	 응답데이터가 #grid에 preppend 되고 스크롤 위치가 보정
	 */
	infiniteGridService.on("prepend", function() {
		var offset = getOffset("first");
		if (offset > 0) {
			$prependLoadingbar.show();
			var html = template(data.getItems(offset, limit));
			infiniteGridService.prepend(html);
		}
	});

	/*
	 "layoutComplete" 이벤트 핸들러
	 append, preppend가 완료되면 발생
	 이벤트 파라미터를 통해 append인지 prepend인지 확인 가능
	 로딩바 감춤
	 */
	infiniteGridService.on("layoutComplete", function(e) {
		e.isAppend ? $appendLoadingbar.hide() : $prependLoadingbar.hide();

		$loading.hide();
		$grid.css("visibility", "visible");
		$footer.show();
	});

	/*
	 persist 데이터를 복원함
	 복원하지 못한다면 새로운 데이터 추가
	 */
	if (!infiniteGridService.restore()) {
		var html = template(data.getItems(1, limit));
		infiniteGridService.append(html);
	}
});