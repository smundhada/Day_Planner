
$(document).ready(function () {
    initializeSchd();
    var userSchd; 

      function initializeSchd(){
          
          getStoredSchd();
          var currentTime = moment();
          var currentTimeHrs = currentTime.hour();

            $.each(userSchd, function( index, value ) {
            
                var divEl = $("<div class='row'></div>");
                var labelHrEl = $("<span class='hour col-1'>" + moment().hour(index).format("hA") + "</span>");
                var inputEl = $("<input class='description col-9'>");
                $(inputEl).val(value.text);
                if (index < currentTimeHrs){
                  $(inputEl).addClass("past");
                }else if (index > currentTimeHrs){
                  $(inputEl).addClass("future");
                }else{
                  $(inputEl).addClass("present");
                }
                var buttonEl = $("<button class='saveBtn col-2'>");
                $(buttonEl).val(index);
                
                $(divEl).append(labelHrEl);
                $(divEl).append(inputEl);
                $(buttonEl).text("SAVE");
                $(divEl).append(buttonEl);
                $(".container").append(divEl);
        
            });
      }

      function getStoredSchd(){
        var workingHrsCheck = JSON.parse(localStorage.getItem("userSchd"));
          if (workingHrsCheck !== null) {
            userSchd = workingHrsCheck;
          }else {
            userSchd = {
              9 : {'text' : '',},
              10 : {'text' : '',},
              11 : {'text' : '',},
              12 : {'text' : '',},
              13 : {'text' : '',},
              14 : {'text' : '',},
              15 : {'text' : '',},
              14 : {'text' : '',},
              16 : {'text' : '',},
              17 : {'text' : '',},
            }
            localStorage.setItem("userSchd", JSON.stringify(userSchd));
        }
      }

      function storeUserSchd(){
        localStorage.setItem("userSchd", JSON.stringify(userSchd));
      }

      $(".saveBtn").on("click", function () {
        event.preventDefault();
        console.log($(this));

        var schdTime = $(this)[0].value;
        var schdSubj = $(this)[0].previousSibling.value;
        userSchd[schdTime].text = schdSubj;
        storeUserSchd();
      })

      $("#clear-calendar").on("click", function () {
        window.localStorage.clear();
        userSchd = [];
        location.reload();
      });

});