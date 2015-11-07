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
	switch (status) {
		case "Printing":
			obj.html(status);
			//javascript timer
			setTimer(obj, 60, {});
			break;
		case "NewOrder":
			obj.html("Searching for printer");
		case "Finished":
		case "Error":
			obj.html(status);
	}
}



   function display( obj, str ) {

    obj.html(obj.html()+" "+str);
  }
        
  function toMinuteAndSecond( x ) {
    return Math.floor(x/60) + ":" + x%60;
  }
        
  function setTimer( obj, remain, actions ) {
    (function countdown() {
       display(obj, toMinuteAndSecond(remain));         
       //actions[remain] && actions[remain]();
       (remain -= 1) >= 0 && setTimeout(arguments.callee, 1000);
    })();
  }
   
