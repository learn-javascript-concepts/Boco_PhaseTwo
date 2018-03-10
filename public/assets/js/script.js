setTimeout(function(){
	$('.date-picker').datepicker();
},800);

$(".pageScollTop").click(function() {
	$("html, body").animate({ scrollTop: 0 }, "slow");
	return false;
});

$('ul.tabs li').click(function() {
	var tab_id = $(this).find('a').attr('data-tab');

	$('ul.tabs li a').removeClass('active');
	$('.tab-content').removeClass('current');

	$(this).find('a').addClass('active');
	$("#"+tab_id).addClass('current');
});