require('fs').readFile('data/car_accidents/accident_2016.csv', (err, data) => {
    if (err) throw err;
    console.log(data.toString());
})
