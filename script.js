const express = require('express')

const app = express()

app.use(express.json())

let db = { numbers: [] }

//1 - CurrentDate

app.get('/currentDate', (req, res) => {
  const fechaActual = Date.now()
  res.json(fechaActual)
})

//2 - Greet

app.get('/greet', (req, res) => {
  res.json('Hello world')
})

//3 - Greet Someone

app.get('/greet/:name', (req, res) => {
  res.send('Hello' + ' ' + req.params.name)
})

//4 y 5 - Check Number

app.get('/CheckEvenNumber/:number', (req, res) => {
  const number = req.params.number

  if (number % 2 == 0) {
    res.status(200)
    res.send('Tu numero es par')
  } else if (number !== +req.params.number) {
    res.status(400)
    res.send('Lo que intentas introducir no es un numero')
  } else {
    res.status(400)
    res.send('Tu numero es impar')
  }
})

//6 - Suma

app.get('/add/:number/:number2', (req, res) => {
  const number = parseInt(req.params.number)
  const number2 = parseInt(req.params.number2)
  const result = number + number2
  res.send('El resultado es:' + ' ' + result)
})

//7 - POST /number/1 -> Guarda un numero en un array declarado en el scope global con cada request y return todos los números guardados.
// POST /number/1 -> [1]
// POST /number/2 -> [1,2]
// POST /number/5 -> [1,2,5]

app.post('/number/:number', (req, res) => {
  db.numbers.push(+req.params.number)

  res.send(db.numbers)
})

//8 - DELETE /number/1 -> ahora elimina un número de un array y devuelve todos
//  - DELETE /number/1 -> [2,5]
//  - DELETE /number/2 → [5]

app.delete('/number/:number', (req, res) => {
  const numberDeleted = req.params.number

  const newDB = db.numbers.filter(number => number !== numberDeleted)

  db = newDB

  res.send(db)
})

//9 - PUT /number/5/10 => cambia el número en el array => [5]

app.put('/number/:number', (req, res) => {
  const updatedNumber = +req.params.number

  db.numbers.forEach(number => {
    if (number === updatedNumber) {
      db.numbers.push(updatedNumber)
      res.send(db.numbers)
    }
  })
})

app.listen(3000, () => console.log('Server on..'))
