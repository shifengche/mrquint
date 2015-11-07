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
        $.getJSON(ajaxURL, {"customerid": "1234", "url": $(this).attr("href")}, function(data){
        console.log("got data");
        console.log(data);
        } );
    });
