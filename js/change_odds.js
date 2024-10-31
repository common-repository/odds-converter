jQuery.noConflict();
(function($) {
    $(function() {        
        $('#decimal').val('');
        $('#fractional').val('');
        $('#american').val('');     

        $("#decimal").keyup(function(){
            this.value = this.value.replace(/[^0-9\.]/g,'');
        });

        $("#fractional").keyup(function(){
            this.value = this.value.replace(/[^0-9\/]/g,'');
        });

        $("#american").keyup(function(){
            this.value = this.value.replace(/[^0-9\-]/g,'');
        });

        $("#decimal").focusin(function(){
            $("#decimal").addClass("odds_focus");
        });
        $("#fractional").focusin(function(){
            $("#fractional").addClass("odds_focus");
        });
        $("#american").focusin(function(){
            $("#american").addClass("odds_focus");
        });
        $("#decimal, #fractional, #american").focusin(function(){
            $("#decimal, #fractional, #american").removeClass("odds_selected");
        });

        $("#decimal").focusout(function(){
            $("#decimal").removeClass("odds_focus");
            var decimal = $('#decimal').val();
            if(decimal) {
                $('#fractional').val(decimalToFraction((decimal-1).toFixed(2))).addClass("odds_selected");
                $('#american').val(decimalToAmerican(decimal)).addClass("odds_selected");
            }
        });

        $("#fractional").focusout(function(){
            $("#fractional").removeClass("odds_focus");
            var fractional = $("#fractional").val();
            var arr = fractional.split("/");
            var x = arr[0];
            var y = arr[1];
            if(fractional) {
                $("#decimal").val(fractionalToDecimal(x,y)).addClass("odds_selected");
                $("#american").val(decimalToAmerican(fractionalToDecimal(x,y))).addClass("odds_selected");
            }
        });

        $("#american").focusout(function(){
            $("#american").removeClass("odds_focus");
            var american = $('#american').val();
            var decimal = americanToDecimal(american);
            if(american) {
                $('#decimal').val(americanToDecimal(american)).addClass("odds_selected");
                $('#fractional').val(decimalToFraction((decimal-1).toFixed(2))).addClass("odds_selected");
            }
        });

        function americanToDecimal(number) {
            if(number<=-100) {
                return (1 - (100/number)).toFixed(2);
            } else if(number>=100) {
                return (1+(number/100)).toFixed(2);
            }
        }

        function fractionalToDecimal(x,y) {
            return (x/y+1).toFixed(2);
        }

        function decimalToFraction(number) {
            var denominator = 0;
            var numerator;
            switch(number){
                case '0.22' :
                    return '2/9';
                    break;
                case '0.29' :
                    return '2/7';
                    break;
                case '0.33' :
                    return '1/3';
                    break;
                case '0.36' :
                    return '4/11';
                    break;
                case '0.45' :
                    return '4/9';
                    break;
                case '0.53' :
                    return '8/15';
                    break;
                case '0.57' :
                    return '4/7';
                    break;
                case '0.62' :
                    return '8/13';
                    break;
                case '0.67' :
                    return '2/3';
                    break;
                case '0.72' :
                    return '8/11';
                    break;
                case '0.83' :
                    return '5/6';
                    break;
                case '0.91' :
                    return '10/11';
                    break;
                case '1.38' :
                    return '11/8';
                    break;
                case '1.63' :
                    return '13/8';
                    break; 
                case '1.86' :
                    return '15/8';
                    break; 
                case '3.33' :
                    return '10/3';
                    break;     
            }
            for(numerator=1; numerator<1000; numerator++) {
                var temp = numerator/number;
                if(Math.ceil(temp)-temp==0) {
                    denominator = temp;
                    break;
                }
            }
            return (denominator>0) ? numerator + '/' + denominator : false;
        }

        function decimalToAmerican(number) {
            switch(number) {
                case '1.11' :
                    return '-900';
                    break;
                case '1.33' :
                    return '-300';
                    break;
            }                   
            if(number<2) {
                return Math.round((-100)/(number-1));
            } else if(number>=2) {
                return Math.round((100)*(number-1));
            }
        }
    });
})(jQuery);