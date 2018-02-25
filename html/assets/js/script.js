$(document).ready(function(){
	$('ul.tabs li').click(function() {
		var tab_id = $(this).find('a').attr('data-tab');

		$('ul.tabs li a').removeClass('active');
		$('.tab-content').removeClass('current');

		$(this).find('a').addClass('active');
		$("#"+tab_id).addClass('current');
	});

	//page scroll to top
	$(".pageScollTop").click(function() {
		$("html, body").animate({ scrollTop: 0 }, "slow");
		return false;
	});

	// Date Picker
	$('.date-picker').datepicker();	
});

// google map
function mapRender() {
	var mapProp= {
		center:new google.maps.LatLng(40.7143528,-74.0059731),
		zoom:5,
	};
	var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
	var map2=new google.maps.Map(document.getElementById("googleMap2"),mapProp);

}