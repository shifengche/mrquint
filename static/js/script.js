function getMyBalance() {
        var ajaxURL = '/ajax/balance';
        $.getJSON(ajaxURL, function(data){
        console.log("got data");
        console.log(data);
        data='Balance is ' + data;
        $("label[for='balance']").html(data); 
        } );

    }

    $(".design-btn").on("click", function(e) {
        e.preventDefault();
        console.log($(this).attr("id"));
        var ajaxURL = '/ajax/design';
        $.getJSON(ajaxURL, {"customerID": "1234", "designID": $(this).attr("id"), "fileURL": $(this).attr("href")}, function(data){
        console.log("got data");
        console.log(data);
        });
        updateStatus($(this).next(), "NewOrder");
    });
//obj = $("#design1").next() for each of the designs "designID"
function updateStatus(obj, status) {
	function func1() {
		obj.html("Printing");
		//setTimer(obj, 5, {0: function() {obj.html("Finished")});
	}
	function func2() {
		obj.html("Finished");
	}
	switch (status) {
		case "Printing":
			obj.html(status);
			//javascript timer
			setTimer(obj, 60, {});
			break;
		case "NewOrder":
			obj.html("Searching for printer");
			window.setTimeout(func1, 2000);
			window.setTimeout(func2, 12000);
			//obj.html("Searching for printer");
			break;
		case "Finished":
		case "Error":
			obj.html(status);
	}
	
}

//window.setTimeout(updateStatus($("#design1").next(), "Printing"), 2000);

   function display( obj, str ) {

    obj.html("Printing "+str);
  }
        
  function toMinuteAndSecond( x ) {
    return Math.floor(x/60) + ":" + x%60;
  }
        
  function setTimer( obj, remain, actions ) {
    (function countdown() {
       display(obj, toMinuteAndSecond(remain));         
       actions[remain] && actions[remain]();
       (remain -= 1) >= 0 && setTimeout(arguments.callee, 1000);
    })();
  }
   
