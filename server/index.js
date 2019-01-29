const express = require('express');
require('dotenv').config();
const {json} = require('body-parser');
const app = express();
const mc = require('./controllers/messagesCtrl');
const session = require('express-session');
const SESSION_SECRET = process.env.SESSION_SECRET;
app.use(json());


 function filter(request, response, next)
 {
    const badWords = ['terd', 'fool', 'internet explorer']
    if(request.body.message)
    {
        for (let i = 0; i < badWords.length; i++)
        {
            let regex = RegExp(badWords[i], 'g')
            request.body.message = request.body.message.replace(regex, '****');
        }
    }
    next();
 }


app.use(filter);
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false

}));


app.get('/api/messages', mc.getAllMessages);
app.get('/api/history', mc.getHistory);
app.post('/api/messages', mc.createMessage);




const PORT = process.env.SERVER_PORT;
app.listen(PORT, () =>
{
    console.log('im listening on port', PORT);
})