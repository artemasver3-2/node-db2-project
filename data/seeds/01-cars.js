const cars = [
    {
        vin: '11111111111111111', 
        make: 'toyota', 
        model: 'prius', 
        milage: 213452, 
        title: 'clean', 
        transmission: 'manual'
    },
    {
        vin: '23145673428645789', 
        make: 'toyota', 
        model: 'corrolla', 
        milage: 5631252, 
        title: 'salvage', 
    }, 
    {
        vin: '13568904064212546', 
        make: 'ford', 
        model: 'focus', 
        milage: 1500, 
        title: 'clean', 
        transmission: 'automatic'
    },  
    {
        vin: '23451637367478562', 
        make: 'kia', 
        model: 'soul', 
        milage: 1500, 
    }, 
]

exports.seed = async function(knex) {
    await knex('cars').truncate()
    await knex('cars').insert(cars)
}