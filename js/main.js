var type = "a";
var times = 1;
var wrapper = document.getElementsByClassName("wrapper");
wrapper[0].style.maxHeight = "0px";
var card = document.getElementsByClassName("card");
card[0].style.backgroundColor = "transparent";
// wrapper[0].style.maxHeight = "1px";
//Once the DOM has loaded, we can start our script
document.addEventListener("DOMContentLoaded",function() {
    var wrapper = document.getElementsByClassName("wrapper");
    wrapper[0].style.transition = "all 0s";
    wrapper[0].style.transition = "all 1s cubic-bezier(1, 1, 0, 0.01) 0s";
    
    // Identify all our elements
    const measurementValue = document.querySelector('button');
    const go_button = document.getElementsByClassName('go');
    const show_button = document.getElementsByClassName('showbtn');
    var city_name = document.getElementsByClassName("city_name");
    var low = document.getElementsByClassName("low");
    var high = document.getElementsByClassName("high");
    var wrapper = document.getElementsByClassName("wrapper");
    var card = document.getElementsByClassName("card");
    
    

    // Get todays date
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    
    // 2 button listerners
    show_button[0].addEventListener("click", showhide);
    go_button[0].addEventListener("click", getAndShowWeather);
    
    
    function showhide() {
        wrapper = document.getElementsByClassName("wrapper");
        console.log(type);
        if(type == "a") {
            //Change buttone text
            this.innerHTML = "Hide";
            card = document.getElementsByClassName("card");
            // setTimeout(function() {wrapper[0].style.maxHeight = "2000px"}, 2000);
            wrapper[0].style.maxHeight = "2000px";

            for (var i = 0; i <= card.length-1; i++) {
                card[i].style.opacity = 1;
            }
            type = "b";
   
        } 
        else if (type == "b") {
            wrapper[0].style.maxHeight = "0px";
            this.innerHTML = "Show";
            card = document.getElementsByClassName("card");

            // card[0].style.maxHeight = "2000px";

            // wrapper[0].animate({maxHeight: 0 + "px"}, 2000);

            type = "a";
        }


    

        // if (card.length != 1){

        //     city_name[city_name.length - 1].innerHTML = "Launceston";
        //     high[high.length - 1].innerHTML = "High: " +  11;
        //     low[low,length - 1].innerHTML = "Low: " +  7;
            
        // }
        // else{
        //     city_name[0].innerHTML = "Launceston";
        //     high[0].innerHTML = "High: " +  Math.round(Math.random() * 100);
        //     low[0].innerHTML = "Low: " +  Math.round(Math.random() * 100);
            
        // }

        
        };
        
    //Get and show weather
    function getAndShowWeather() {
        var city_input = document.getElementsByName("city");
        var show_button = document.getElementsByClassName('showbtn');
        type = "b";
        if(city_input[0].value != "") {
            console.log(city_input[0].value);
            var val = city_input[0].value;
            var url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"+val+"?unitGroup=metric&key=C6PYA3TD5HFEKP2WAY29KTZFW&contentType=json"
            console.log(url); 
            
            var results = fetch(url).then(function(response) {
                return response.json();}).then(function(text) {
                    console.log('Request successful', text); 
                    wrapper[0].insertAdjacentHTML('afterbegin', '<div class="day-mon card"><h2 class="city_name">'+ text.address+'</h2><hr><h3 class="high">High: '+text.days[0].tempmax +'</h3><h3 class="low">Low: '+text.days[0].tempmin +'</h3><i class="wi wi-day-sunny"></i><h2 class="descr">Mostly Sunny</div>');
                    wrapper[0].style.maxHeight = 1500 + "px";
                    show_button[0].innerHTML = "Hide";
                    if(times == 1 && card.length == 2){
                        card[1].style.display = "none";
                        times = 0
                    }
                    return text;
                }).catch(function(error) {
                    console.log('Request failed', error)
                    });
        
                }
        else{
            alert("Please enter a city");
        }
    
    
        
    } 
    
});




    
