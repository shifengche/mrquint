function getMyBalance() {
        var ajaxURL = '/ajax/balance';
        $.getJSON(ajaxURL, function(data){
        console.log("got data");
        console.log(data);
        data='Balance is ' + data;
        $("label[for='balance']").html(data); 
        } );

    }

    $(".design").on("click", function(e) {
        e.preventDefault();
        console.log($(this).attr("id"));
        var ajaxURL = '/ajax/design';
        $.getJSON(ajaxURL, {"customerID": "1234", "fileURL": $(this).attr("href")}, function(data){
        console.log("got data");
        console.log(data);
        });
        updateStatus($(this).next(), "NewOrder");
    });

function updateStatus(obj, status) {
	switch (status) {
		case "Printing":
			obj.html(status);
			//add javascript timer here
			break;
		case "NewOrder":
			obj.html("New Order");
		case "Finished":
		case "Error":
			obj.html(status);
	}
}
