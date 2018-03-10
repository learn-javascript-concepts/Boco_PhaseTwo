setTimeout(function(){
	$('.date-picker').datepicker();
},800);

$(".pageScollTop").click(function() {
	$("html, body").animate({ scrollTop: 0 }, "slow");
	return false;
});