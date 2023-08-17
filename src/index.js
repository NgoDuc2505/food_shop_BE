import express from 'express'
import cors from 'cors'
import rootRoute from './Routes/rootRoute.js'
const app = express()

app.use(cors({
  origin: "*"
}))

app.use(express.static("."))
app.use(express.json())

app.use('/api',rootRoute)


app.listen(8080)