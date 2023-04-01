import express from 'express'
import chalk from 'chalk'
import cors from 'cors'
import uploadRoutes from './uploadRoutes.js'

const app = express()

const PAYPAL_CLIENT_ID = 'ATngXdphPho9msckiEPa0rD1PCunfyGlBMKYgBnUZxvogf6pappDOgScSb_DQVp4F4z5Xti60VsSxtOf'

app.use(cors())

app.use('/api/uploads', uploadRoutes);
app.get('/', async (req, res) => {
    res.status(200).json('Hello World')
})

app.get('/api/config/paypal', (req, res) => res.send(PAYPAL_CLIENT_ID));

app.listen(5000, console.log(chalk.blue.bgRed.bold(`Server started in dev mode on port 5000`)))