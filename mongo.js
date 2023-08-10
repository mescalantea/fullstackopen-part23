const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password> <name> <phone>')
    process.exit(1)
}

mongoose.connect(`mongodb+srv://fullstack:${process.argv[2]}@cluster0.legwd79.mongodb.net/phonebook?retryWrites=true&w=majority`)
const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)
if (3 === process.argv.length) {

    // list persons
    Person.find({}).then(persons => {
        console.log('phonebook:');
        persons.forEach(p => console.log(`${p.name} ${p.number}`))

        mongoose.connection.close()
        process.exit(1)
    })
}
else if (process.argv.length < 5) {
    console.log('Please provide the name and phone as arguments: node mongo.js <password> <name> <phone>')
    mongoose.connection.close()
    process.exit(1)
}
else {
    (new Person({ name: process.argv[3], number: process.argv[4] }))
        .save()
        .then(() => {
            console.log('person saved!')
            mongoose.connection.close()
        })
}