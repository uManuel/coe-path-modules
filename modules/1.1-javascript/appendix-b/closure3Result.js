function useCalc(calc,keys) {
    return [...keys].reduce(
        function showDisplay(display,key){
            var ret = String( calc(key) );
            return (
                display +
                (
                    (ret != "" && key == "=") ?
                    "=" :
                    ""
                ) +
                ret
            );
        },
        ""
    );
}

function formatTotal(display) {
    if (Number.isFinite(display)) {
        // constrain display to max 11 chars
        let maxDigits = 11;
        // reserve space for "e+" notation?
        if (Math.abs(display) > 99999999999) {
            maxDigits -= 6;
        }
        // reserve space for "-"?
        if (display < 0) {
            maxDigits--;
        }
        // whole number?
        if (Number.isInteger(display)) {
            display = display
            .toPrecision(maxDigits)
            .replace(/\.0+$/,"");
        }
        // decimal
        else {
            // reserve space for "."
            maxDigits--;
            // reserve space for leading "0"?
            if (
                Math.abs(display) >= 0 &&
                Math.abs(display) < 1
                ) {
                maxDigits--;
            }
            display = display
            .toPrecision(maxDigits)
            .replace(/0+$/,"");
        }
    }
    else {
        display = "ERR";
    }
    return display;
}

function calculator() {
    // ..
    var enteringValues='';
    var enteredValues='';
    var operator = ''

    function calculateByOperator(n1,n2,operator){
        var result=''
        switch (operator) {
            case '+':
                result= (+n1+(+n2));
                break;
            case '-':
                result = (+n1-(+n2));
                break;
            case '*':
                result = (+n1*(+n2));
                break;
            case '/':
                result = (+n1/(+n2));
                break;
        }
        return result.toString();
    }

    return function calc(input){

        if(isNaN(input)){
            if (input ==='=') {
                if (enteredValues==='') {
                    return formatTotal(+enteringValues);
                }
                enteredValues = calculateByOperator(enteredValues,enteringValues,operator);
                enteringValues='';
                operator='=';
                return formatTotal(+enteredValues);
            } else {
                // if theres no entered values just change it.
                if(enteredValues===''){
                    enteredValues=enteringValues;
                    enteringValues='';
                    
                }else{
                    if (enteringValues!=='') {
                        enteredValues = calculateByOperator(enteredValues,enteringValues,operator);
                        enteringValues='';
                    }
                }
                operator = input
                return input;
            }

        }else{
            
            enteringValues = enteringValues+input;
            // If is entering new values after = operator reset enteredValues and operator.
            if (operator=='=') {
                enteredValues='';
                operator='';
            }
            return input
        }
    }
}


var calc = calculator();

console.log(useCalc(calc,"4+3=")) // 4+3=7
console.log(useCalc(calc,"+9="))// +9=16
console.log(useCalc(calc,"*8="))// *5=128
console.log(useCalc(calc,"7*2*3=")); // 7*2*3=42
console.log(useCalc(calc,"1/0=")) // 1/0=ERR
console.log(useCalc(calc,"+3="))// +3=ERR
console.log(useCalc(calc,"51="))// 51

// console.log(calc("4")); // 4
// console.log(calc("+")); // +
// console.log(calc("7")); // 7
// console.log(calc("3")); // 3
// console.log(calc("-")); // -
// console.log(calc("2")); // 2
// console.log(calc("=")); // 75
// console.log(calc("*")); // *
// console.log(calc("4")); // 4
// console.log(calc("="));// 300
// console.log(calc("5")); // 5
// console.log(calc("-")); // -
// console.log(calc("5")); // 5
// console.log(calc("=")); // 0