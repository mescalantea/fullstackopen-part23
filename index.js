const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 2
    },
    {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 3
    },
    {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 4
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)

    if (!person) {
        return response.status(404).end()
    }

    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const total = persons.length;
    persons = persons.filter(p => p.id !== id)

    const status = total === persons.length ? 404 : 204

    return response.status(status).end()
})

const randomId = (min = 1, max = 999999999) => {
    return Math.round(Math.random() * (max - min) + min)
}

app.post('/api/persons', (request, response) => {

    // validation
    if (!request.body.name) {
        return response.status(400).json({
            error: 'name is empty'
        })
    }
    if (!request.body.number) {
        return response.status(400).json({
            error: 'number is empty'
        })
    }

    if (persons.find(p => p.name === request.body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const newPerson = {
        ...request.body,
        id: randomId()
    }
    persons.push(newPerson)

    return response.status(201).json(newPerson)
})


app.get('/info', (request, response) => {
    const datetime = new Date()

    response.send(`
    <p>Phonebook has info for ${persons.length} peope</p>
    <p>${datetime}</p>
    `)
})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})