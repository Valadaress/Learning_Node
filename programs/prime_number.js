const fs = require('fs')

//! Time stats declaration
var t = require("exectimer");
const Tick = t.Tick;
const promises = [];
const functionExecution = Tick.wrap(function* myFunction() {
    yield Promise.resolve(true);
});
promises.push(functionExecution);
var list = { "LastPrime": 0, "NumbersOfPrimes": 0, "lastGeneratedPrimes": 0 };

// require('./prime_functions')

if (!fs.existsSync('./programs/primeData.json')) {
    createJson();
} else {



    var divisor = 1
    var current_generated_primes = 0
    var have_prime = false
    const max_num = 13110000

    // Json Variables
    const prime_json = require('./primeData.json')
    var index = prime_json.LastPrime + 1
    var prime_quant = prime_json.NumbersOfPrimes
    var last_prime = prime_json.LastPrime
    var last_generated_primes = prime_json.lastGeneratedPrimes


    while (index <= max_num) {
        while (true) {
            // if a it is a prime number
            if ((index % divisor != 0 || (divisor == 1 || index == divisor || divisor == 0) && (index % 2 != 0) || index == 2) && index != 1) {
                if (divisor >= (index / 2)) {
                    when_prime()
                    break
                }
                ++divisor
            } else {
                // console.log(`${index} It is not prime`)
                divisor = 1;
                ++index
                break
            }
        }
    }
    update_data()
    show_info()
}


function when_prime() {

    console.log(`${index} its prime`)
    last_prime = index
    divisor = 1;
    have_prime = true;
    ++current_generated_primes;
    ++prime_quant;
    ++index;

}

async function update_data() {
    list.LastPrime = last_prime
    list.NumbersOfPrimes = prime_quant
    list.lastGeneratedPrimes = current_generated_primes
    createJson()
}




function createJson() {
    fs.writeFile("./programs/primeData.json", JSON.stringify(list, null, 2), function(err) {
        if (err)
            console.log('Error: ', err);
    });
}

function show_info() {

    // console.clear()
    console.log(`O Ultimo número primo foi: ${last_prime}`)
    console.log(`Ao todo foi encontrado ${prime_quant} números`)
    console.log(`Foram gerados ${current_generated_primes} na execução atual`)
    console.log(`Foram gerados ${last_generated_primes} na execução anterior`)


    // After all ticks are finished
    Promise.all(promises).then(() => {
        // display the results
        var results = t.timers.myFunction;
        console.log(results.parse(results.duration())); // total duration of all ticks
        console.log(`Primos per minute ${prime_quant / results.parse(results.duration())}`);
        console.log('-----FINISHED-----')
            // // console.log(results.parse(results.min())); // minimal tick duration
            // // console.log(results.parse(results.max())); // maximal tick duration
            // // console.log(results.parse(results.mean())); // mean tick duration
            // // console.log(results.parse(results.median())); // median tick duration
    })
}