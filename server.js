import express from 'express'
import chalk from 'chalk'
import cors from 'cors'
import uploadRoutes from './uploadRoutes.js'

const app = express()

app.use(cors())


// const __dirname = path.resolve();

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, path.join(__dirname + 'public/images/products/'));
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${file.fieldname}-${path.extname(file.originalname)}`)
//     }
// })

// function checkFileType(file, cb){
//     const filetypes = /jpeg|jpg|png/;

//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = filetypes.test(file.mimetype);

//     if(extname && mimetype){
//         return cb(null, true);
//     } else {
//         cb('Error: Images Only!');
//     }
// }

// const upload = multer({
//     storage: storage,
//     fileFilter: function(req, file, cb) {
//         checkFileType(file, cb);
//     }
// })

app.use('/api/uploads', uploadRoutes);
app.get('/', async (req, res) => {
    res.status(200).json('Hello World')
})

app.listen(5000, console.log(chalk.blue.bgRed.bold(`Server started in dev mode on port 5000`)))