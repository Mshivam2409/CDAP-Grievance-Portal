import multer from "multer";
import { randomBytes } from "crypto"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.env.DIR + "/data/audio/")
    },
    filename: function (req, file, cb) {
        cb(null, `${randomBytes(8).toString('hex') + Date.now().toString()}.wav`)
    }
})

const upload = multer({ storage: storage }).single('audio')

export default upload
