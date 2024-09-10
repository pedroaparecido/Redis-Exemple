import express from 'express'
import redis from 'redis'
import cors from 'cors'
import axios from 'axios'


const app = express()
const port = 3001

app.use(cors())


//criar redis-client
const client = redis.createClient({
    legacyMode: true
})

await client.connect().then(() => {
    app.get('/api/getDataFromRedis', (req, res) => {
        client.get("player", (err, data) => {
            if (err) {
                console.log(err)
            } else {
                console.log(data)
                res.json({ result: data })
            }
        })
    })

    app.get('/api/getSetData', (req, res) => {
        client.get("users",async (err, data) => {
            if (data !== null) {
                res.json({ result: data })
            } else {
                const users = await axios.get('https://jsonplaceholder.typicode.com/users/1')
                client.set("users", JSON.stringify(users.data), (err, data) => {
                    res.json({ result: data })
                })
            }
        })
    })
})

app.listen(port, () => {
    console.log('Conectado na porta 3001')
})