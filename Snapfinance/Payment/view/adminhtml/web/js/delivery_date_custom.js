define([
    'jquery',
    'jquery/validate',
    'mage/translate',
    'mage/calendar'
], function ($) {
    "use strict";
    console.log('load delivery date');
    
        $('#delivery_date').calendar({
            dateFormat: 'm/d/yy',
            changeMonth: true,
            changeYear: true,
            showButtonPanel: true,
            minDate: currentDate(),            
            showWeek: true
        });
        
        function currentDate() {
          var today = new Date();
          var dd = String(today.getDate()).padStart(2, '0');
          var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
          var yyyy = today.getFullYear();
          today = mm + '/' + dd + '/' + yyyy;
          return today;
      }
    
        var ele_delivery_date = document.getElementById('delivery_date');    
        if(ele_delivery_date) {
            document.getElementById('delivery_date').addEventListener('keydown', function (e) {
               if (e.which != 8) {
                   e.preventDefault();
                   return false;
               }
           }, false);
        }
    
        //Update the delivery date once via ajax controller
         $("#form_delivery_date_value").submit(function () {
            var delivery_date = $("input[name='delivery_date']").val();
            var order_id = $("input[name='order_id']").val();
            var url = $("input[name='ajax_updatedeliverydate_url']").val();
            $.ajax({
                url: url,
                type: "POST",
                data: {delivery_date: delivery_date, order_id: order_id},
                showLoader: true,
                cache: false,
                success: function (response) {
                    var res = JSON.parse(JSON.stringify(response.data));
                    console.log(res.status);
                    console.log(res.msg);
                    if (res.status == 1) {
                        $(".ajax_message_success").text(res.msg);
                        //success error message display
                        $(".success").css("display", "block");
                        $(".error").css("display", "none");
                    } else {
                        $(".ajax_message_error").text(res.msg);
                        $(".error").css("display", "block");
                        $(".success").css("display", "none");
                    }
                    setTimeout(hide_error_message, 5000);
                }
            });
            return false;
        });
       
        function hide_error_message() {
            $(".success").css("display", "none");
            $(".error").css("display", "none");
        }
    
});