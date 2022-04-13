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
}
var calc = calculator();


useCalc(calc,"4+3="); // 4+3=7
useCalc(calc,"+9="); // +9=16
useCalc(calc,"*8="); // *5=128
useCalc(calc,"7*2*3="); // 7*2*3=42
useCalc(calc,"1/0="); // 1/0=ERR
useCalc(calc,"+3="); // +3=ERR
useCalc(calc,"51="); // 51

// calc("4"); // 4
// calc("+"); // +
// calc("7"); // 7
// calc("3"); // 3
// calc("-"); // -
// calc("2"); // 2
// calc("="); // 75
// calc("*"); // *
// calc("4"); // 4
// calc("="); // 300
// calc("5"); // 5
// calc("-"); // -
// calc("5"); // 5
// calc("="); // 0

