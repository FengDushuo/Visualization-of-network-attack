window.onload=function(){
    $(document).ready(function () {
        $('.alonelabel .drop .option').click(function () {
            var val = $(this).attr('data-value'), $drop = $('.alonelabel .drop'), prevActive = $('.alonelabel .drop .option.active').attr('data-value'), options = $('.alonelabel .drop .option').length;
            $drop.find('.option.active').addClass('mini-hack');
            $drop.toggleClass('visible');
            $drop.removeClass('withBG');
            $(this).css('top');
            $drop.toggleClass('opacity');
            $('.mini-hack').removeClass('mini-hack');
            if ($drop.hasClass('visible')) {
                setTimeout(function () {
                    $drop.addClass('withBG');
                }, 400 + options * 100);
            }
            triggerAnimation1();
            if (val !== 'placeholder' || prevActive === 'placeholder') {
                $('.alonelabel .drop .option').removeClass('active');
                $(this).addClass('active');
                var choosethis = document.getElementById("choosethis")
                choosethis.innerHTML = val;
            }
            ;
        });
        function triggerAnimation1() {
            var finalWidth = $('.alonelabel .drop').hasClass('visible') ? 22 : 20;
            $('.alonelabel .drop').css('width', '24em');
            setTimeout(function () {
                $('.alonelabel .drop').css('width', finalWidth + 'em');
            }, 400);
        };
        $('.firstlabel .drop .option').click(function () {
            var val = $(this).attr('data-value'), $drop = $('.firstlabel .drop'), prevActive = $('.firstlabel .drop .option.active').attr('data-value'), options = $('.firstlabel .drop .option').length;
            $drop.find('.option.active').addClass('mini-hack');
            $drop.toggleClass('visible');
            $drop.removeClass('withBG');
            $(this).css('top');
            $drop.toggleClass('opacity');
            $('.mini-hack').removeClass('mini-hack');
            if ($drop.hasClass('visible')) {
                setTimeout(function () {
                    $drop.addClass('withBG');
                }, 400 + options * 100);
            }
            triggerAnimation2();
            if (val !== 'placeholder' || prevActive === 'placeholder') {
                $('.firstlabel .drop .option').removeClass('active');
                $(this).addClass('active');
                var choosefirst = document.getElementById("choosefirst");
                choosefirst.innerHTML = val;
            }
            ;
        });
        function triggerAnimation2() {
            var finalWidth = $('.firstlabel .drop').hasClass('visible') ? 22 : 20;
            $('.firstlabel .drop').css('width', '24em');
            setTimeout(function () {
                $('.firstlabel .drop').css('width', finalWidth + 'em');
            }, 400);
        };
        $('.secondlabel .drop .option').click(function () {
            var val = $(this).attr('data-value'), $drop = $('.secondlabel .drop'), prevActive = $('.secondlabel .drop .option.active').attr('data-value'), options = $('.secondlabel .drop .option').length;
            $drop.find('.option.active').addClass('mini-hack');
            $drop.toggleClass('visible');
            $drop.removeClass('withBG');
            $(this).css('top');
            $drop.toggleClass('opacity');
            $('.mini-hack').removeClass('mini-hack');
            if ($drop.hasClass('visible')) {
                setTimeout(function () {
                    $drop.addClass('withBG');
                }, 400 + options * 100);
            }
            triggerAnimation3();
            if (val !== 'placeholder' || prevActive === 'placeholder') {
                $('.secondlabel .drop .option').removeClass('active');
                $(this).addClass('active');
            }
            ;
        });
        function triggerAnimation3() {
            var finalWidth = $('.secondlabel .drop').hasClass('visible') ? 22 : 20;
            $('.secondlabel .drop').css('width', '24em');
            setTimeout(function () {
                $('.secondlabel .drop').css('width', finalWidth + 'em');
            }, 400);
        };

        
        $("#onelabelsubmit").click(function(){
            var chosedlabel = document.getElementById("choosethis").innerHTML;
            var timestamplabel = "Timestamp";
            var filename = document.getElementById("fileurl").innerHTML;
            var postdata = {"timestamp":timestamplabel,"chooselabel":chosedlabel,"filename":filename};
            $.ajax({
                type:"post",
                url:"/inputdatashow_timestamp_onelabel",
                data:postdata,
                cache:false,
                success:function(evt){
                    window.location.href="/inputdatashow_timestamp_onelabel?csvoutputfile="+evt["csvoutputfile"]+"&timestamp_format="+evt["timestamp_format"]+"&chosedlabel="+evt["chosedlabel"];
                },
                error:function(){
                    alert("error!");
                },
            });
        });
    
    
        $("#twolabelssubmit").click(function(){
            var chosedlabel1 = document.getElementById("choosefirst").innerHTML;
            var chosedlabel2 = $('.secondlabel .drop').find('.option.active').data("value");
            var timestamplabel = "Timestamp";
            var filename = document.getElementById("fileurl").innerHTML;
            var postdata = {"timestamp":timestamplabel,"chooselabel1":chosedlabel1,"chooselabel2":chosedlabel2,"filename":filename};
            $.ajax({
                type:"post",
                url:"/inputdatashow_timestamp_twolabel",
                data:postdata,
                cache:false,
                success:function(evt){
                    window.location.href="/inputdatashow_timestamp_twolabel?csvoutputfile="+evt["csvoutputfile"]+"&timestamp_format="+evt["timestamp_format"]+"&chosedlabel1="+evt["chosedlabel1"]+"&chosedlabel2="+evt["chosedlabel2"];
                },
                error:function(){
                    alert("error!");
                },
            });
        });
        
    });
}