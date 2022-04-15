function cachedIsPrime(){

    var cache = {};

    return isPrime;

    function isPrime(v) {
        if (v <= 3) {
            return v > 1;
        }

        if (v % 2 == 0 || v % 3 == 0) {
            return false;
        }

        var vSqrt = Math.sqrt(v);
        
        if (!(v in cache)){
            for (let i = 5; i <= vSqrt; i += 6) {
                if (v % i == 0 || v % (i + 2) == 0) {
                    cache[v]=false;
                    return cache[v];
                }
            }
            cache[v]=true;
            return cache[v];
        }
        return cache[v];
    }
}

var isPrime = cachedIsPrime();

console.log(isPrime(11));
console.log(isPrime(12));


function cachedFactorize(){
    var cache = {};

    return factorize;

    function factorize(v) {

        if (!isPrime(v)) {

            if (!(v in cache)){
                let i = Math.floor(Math.sqrt(v));
                while (v % i != 0) {
                    i--;
                }
                cache[v]=[
                    ...factorize(i),
                    ...factorize(v / i)
                ]
                return cache[v];
            }
            return cache[v]
        }

        return [v];
    }
}

var factorizeVar = cachedFactorize();

console.log(factorizeVar(11));
console.log(factorizeVar(12));