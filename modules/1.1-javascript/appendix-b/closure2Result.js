function toggle(...arguments){
    var i=-1;
    var savedArguments = arguments;
    return function shift(){
        i++;
        if(i===savedArguments.length){
            i=0;
        }
        console.log(savedArguments[i]);
    }
}

var hello = toggle('hello');
var onOff = toggle('on','off');
var speed = toggle('slow','medium','fast');

hello(); // "hello"
hello(); // "hello"


onOff(); // "on"
onOff(); // "off"
onOff(); // "on"

speed(); // "slow"
speed(); // "medium"
speed(); // "fast"
speed(); // "slow"


