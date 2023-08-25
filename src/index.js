import express from 'express'
import cors from 'cors'
import rootRoute from './Routes/rootRoute.js'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const app = express()

app.use(cors({
  origin: "*"
}))

app.use(express.static("."))
app.use(express.json())

app.use('/api',rootRoute)


app.listen(8080)

const swaggerSpec = swaggerJSDoc({
  definition:{
    info: {
      title: "api",
      version: "1.0.0"
    }
  },
  apis: ["src/swagger/index.js"]
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));