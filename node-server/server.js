const express = require('express')
const app = express()
const port = 4000

const nodeBase64 = require('nodejs-base64-converter');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('SECRETKEY');
const path = require('path');
const bodyParser = require('body-parser');
const router = express.Router();
const cors = require('cors');

// Point static path to dist
const app_Path = path.join(process.cwd(), '../client/dist');
app.use(express.static(app_Path, { etag: true, maxAge: 0 }));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
app.use(cors());

console.log('\n\n ****************************************************************************************************************** ');
const message = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
console.log("\n\n Original Input");
console.log("\n", message);

loopEncodedMessage = loopEncoding(6, message);
console.log('\n\n Loop encoded message: ');
console.log('\n', loopEncodedMessage);

const encryptedMessage = cryptr.encrypt(loopEncodedMessage);
console.log('\n\n Encrypted message: ');
console.log('\n ', encryptedMessage);

const decryptedMessage = cryptr.decrypt(encryptedMessage);
console.log('\n\n Decrypted message: ');
console.log('\n ', decryptedMessage);

loopDecodedMessage = loopDecoding(6, decryptedMessage);
console.log('\n\n Loop Decoded message: ');
console.log('\n', loopDecodedMessage);
console.log('\n\n ****************************************************************************************************************** ');

app.use('/', router);

router.get('/', (req, res) => {
    res.send('Hello World!')
});
 
router.get('/encryptMsg', (req, res) => {
  const msg = req.query.message;
  console.log('EncryptedMessage: ', cryptr.encrypt(msg));
  res.json({ encryptedMsg: cryptr.encrypt(msg) });
});

router.get('/encodeMsg', (req, res) => {
  const msg = req.query.message;
  loopEncodedMessage = loopEncoding(12, msg);
  console.log('loopEncodedMessage: ', loopEncodedMessage);
  res.json({ encodedMsg: loopEncodedMessage });
});

router.get('/decodeMsg', (req, res) => {
  const msg = req.query.message;
  loopDecodedMessage = loopDecoding(12, msg);
  console.log('loopDecodedMessage: ', loopDecodedMessage)
  res.json({ decodedMsg: loopDecodedMessage });
});

router.get('/decryptMsg', (req, res) => {
  const msg = req.query.message;
  console.log('DecryptedMessage: ', cryptr.decrypt(msg));
  res.json({ decryptedMsg: cryptr.decrypt(msg) });
});

router.get('*', (req, res) => {
  res.send('Enter valid URL!')
});

function loopEncoding(iteration, message) {
    let msg = message;
    for(i=0;i<iteration;i++) {
        msg =  nodeBase64.encode(msg);
    }
    return msg;
}

function loopDecoding(iteration, encodedMessage) {
    let msg = encodedMessage;
    for(i=0;i<iteration;i++) {
        msg =  nodeBase64.decode(msg);
    }
    return msg;
}

app.listen(port, function(){
    console.log("Server has started on port: ", port);
});