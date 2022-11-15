function when_prime() {
    const functionExecution = Tick.wrap(function* myFunction() {
        yield Promise.resolve(true);
    });
    console.log(`${index} its prime`)
    last_prime = index
    divisor = 1;
    have_prime = true;
    ++current_generated_primes;
    ++prime_quant;
    ++index;
    promises.push(functionExecution);
}

async function update_data() {
    list.LastPrime = last_prime
    list.NumbersOfPrimes = prime_quant
    list.lastGeneratedPrimes = last_generated_primes
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
    console.log(`Foram gerados ${last_generated_primes} na ultima execução`)
    console.log(`Primos per minute ${last_generated_primes}`);

    // After all ticks are finished
    Promise.all(promises).then(() => {
        // display the results
        var results = t.timers.myFunction;
        // console.clear()
        console.log(results.parse(results.duration())); // total duration of all ticks
        console.log(results.parse(results.min())); // minimal tick duration
        console.log(results.parse(results.max())); // maximal tick duration
        console.log(results.parse(results.mean())); // mean tick duration
        console.log(results.parse(results.median())); // median tick duration
    })
}