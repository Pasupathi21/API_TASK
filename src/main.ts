import express, { Express }  from 'express';
import { appRoutes } from './routes/app-routes';
require('dotenv').config()


const app: Express = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const routes = appRoutes(express)


app.use(routes)

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`App running on port ${port}`)
});