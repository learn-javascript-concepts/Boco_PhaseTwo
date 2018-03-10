$(document).ready(function(){
	$('ul.tabs li').click(function() {
		var tab_id = $(this).find('a').attr('data-tab');

		$('ul.tabs li a').removeClass('active');
		$('.tab-content').removeClass('current');

		$(this).find('a').addClass('active');
		$("#"+tab_id).addClass('current');

		//DatePicker init after tab shown
		setTimeout(function(){
			$('.date-picker').datepicker();
			$(".autoComplete").easyAutocomplete(options);
		},800);

	});

	//page scroll to top
	$(".pageScollTop").click(function() {
		$("html, body").animate({ scrollTop: 0 }, "slow");
		return false;
	});

	// Date Picker
	$('.date-picker').datepicker();

	//EasyAutoComplete init
	$(".autoComplete").easyAutocomplete(options);

	//Toast Notifications
	$.toast({
		heading: 'Information',
		text: 'Now you can add icons to the toasts as well.',
		icon: 'success',
		position: 'top-right',
		showHideTransition: 'slide'
	});
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

var options = {
	data: [
		"Customer #001", 
		"Customer #002",
		"Customer #003",
		"Customer #004",
		"Customer #005"
	]
};