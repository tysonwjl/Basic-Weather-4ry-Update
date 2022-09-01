

// Todo
// c and f degree icons, convert all values to required values
// cap multimple word cities

// Completed: Fixed opacity on load, Added auto capitalization to returned city




// Global variables
var type = "a";
var type_two = "a";
var times = 1;
var wrapper = document.getElementsByClassName("wrapper");
var card = document.getElementsByClassName("card");
var ftoc = document.getElementsByClassName('ftoc')

// Styles on load
wrapper[0].style.maxHeight = "0px";
card[0].style.backgroundColor = "transparent";
card[0].style.opacity = "0";


//Once the DOM has loaded, we can start our script
document.addEventListener("DOMContentLoaded",function() {
    var wrapper = document.getElementsByClassName("wrapper");
    wrapper[0].style.transition = "all 0s";
    wrapper[0].style.transition = "all 1s cubic-bezier(1, 1, 0, 0.01) 0s";
    
    // Identify all our elements on load
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
    
    // 3 button listerners
    show_button[0].addEventListener("click", showhide);
    go_button[0].addEventListener("click", getAndShowWeather);
    ftoc[0].addEventListener("click", changeType);
    
    
    function showhide() {
        wrapper = document.getElementsByClassName("wrapper");
        console.log(type);
        if(type == "a") {
            //Change buttone text
            this.innerHTML = "Hide";
            card = document.getElementsByClassName("card");
            // setTimeout(function() {wrapper[0].style.maxHeight = "2000px"}, 2000);
            wrapper[0].style.maxHeight = "2000px";
            if(card.length != 1){
                for (var i = 0; i <= card.length-1; i++) {
                    card[i].style.opacity = 1;
                }
                type = "b";
            }
            else{
                card[0].style.opacity = 0
                type = "b"
            }
   
        } 
        else if (type == "b") {
            wrapper[0].style.maxHeight = "0px";
            this.innerHTML = "Show";
            card = document.getElementsByClassName("card");

            // card[0].style.maxHeight = "2000px";

            // wrapper[0].animate({maxHeight: 0 + "px"}, 2000);

            type = "a";
        }
    };
    // Declaring variables   
    var high = 1;
    var low = 1;
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
                    var end_word = "";
                    const input = text.address;
                    const words = input.split(" ");
                    
                    for (let i = 0; i < words.length; i++) {
                        words[i] = words[i][0].toUpperCase().substr(0,1) + words[i].substr(1);
                        end_word += words[i] + " ";
                        console.log(words[i]);
                    }
                    
                    words.join(" ");

                    
                    // Fix repeating value bug

                    high = text.days[0].tempmax;
                    low = text.days[0].tempmin

                    console.log(end_word);
                    console.log(high);
                    console.log(low);
                    console.log(text.days.length);
                    

            

                    wrapper[0].insertAdjacentHTML('afterbegin', '<div class="day-mon card"><h2 class="city_name">'+ end_word +'</h2><hr><div class="vals"><div class="group"><h3 class="high">High:<h3 class="val_h"> '+high+'<i>&deg;C</i></h3></h3></div><div class="group"><h3 class="low">Low:<h3 class="val_l"> '+low +'<i>&deg;C</i></h3></h3></div><i class="wi wi-day-sunny"></i></div><h2 class="descr">Mostly Sunny</div>');
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
    
    //Change visible values from C to F and vice versa
    function changeType() {
        if(type_two == "a") {;
            this.innerHTML = "&deg;F";
            type_two = "b";
            var high_t = document.getElementsByClassName("val_h");
            var low_t = document.getElementsByClassName("val_l");

            console.log(high_t);
            console.log(low_t);


            // console.log(high[0].innerHTML);
            // console.log(high);
        }
        else if (type_two == "b") {
            this.innerHTML = "&deg;C";
            type_two = "a";
        }
    }
    
});




    
