import express from 'express'
import chalk from 'chalk'
import cors from 'cors'
import uploadRoutes from './uploadRoutes.js'

const app = express()

app.use(cors())

app.use('/api/uploads', uploadRoutes);
app.get('/', async (req, res) => {
    res.status(200).json('Hello World')
})

app.listen(5000, console.log(chalk.blue.bgRed.bold(`Server started in dev mode on port 5000`)))