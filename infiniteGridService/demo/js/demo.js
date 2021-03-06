$(document).ready(function() {
	// 컨텐츠의 위치를 찾는 함수
	function getOffset(pos) {
		var offset = 0;
		if (pos === "first") {
			offset = $grid.find(".item").first().data("offset");
			offset = parseInt(offset, 10) - limit;
		} else if (pos === "last") {
			offset = $grid.find(".item").last().data("offset");
			offset = parseInt(offset, 10) + 1;
		}
		return offset;
	};

	var limit = 60;
	var template = Handlebars.compile($("#items-template").html());
	var $loading = $("#wrap_loading");
	var $grid = $("#grid");
	var infiniteGridService = new eg.InfiniteGridService($grid).on({
		/*
		 "append" 이벤트 핸들러
		 스크롤 다운 중 최하단 아이템이 화면에 보여질 때(threshold로 보정 가능)
		 threshold가 300이면 최하단 아이템이 화면에 보여지기 300px 전에 이벤트 발생
		 응답데이터를 #grid에 append 함
		 */
		"append" : function() {
			var html = template(data.getItems(getOffset("last"), limit));
			infiniteGridService.append(html);
		},
		/*
		 "preppend" 이벤트 핸들러
		 스크롤 업 중 최상단 아이템이 화면에 보여질 때(threshold로 보정 가능)
		 threshold가 300이면 최하단 아이템이 화면에 보여지기 300px 전에 이벤트 발생
		 응답데이터가 #grid에 preppend 되고 스크롤 위치가 보정
		 */
		"prepend" : function() {
			var offset = getOffset("first");
			if (offset > 0) {
				var html = template(data.getItems(offset, limit));
				infiniteGridService.prepend(html);
			}
		},
		/*
		 "layoutComplete" 이벤트 핸들러
		 append, preppend가 완료되면 발생
		 이벤트 파라미터를 통해 append인지 prepend인지 확인 가능
		 로딩바 감춤
		 */
		"layoutComplete" : function(e) {
			$loading.hide();
		}
	});

	/*
	 아이템의 <a> 클릭시 persist 데이터를 저장
	 */
	$grid.on("click", "a", function() {
		infiniteGridService.store();
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