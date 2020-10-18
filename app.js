const express = require('express');
const path = require('path');
const bp = require('body-parser');
//const joi = require('joi');
const Joi = require('joi');
const { join } = require('path');
const app = express();
app.use('/public',express.static(__dirname + 'static'));
app.use(bp.urlencoded({extended: false}));
app.use(bp.json());

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname , 'static' , 'index.html'));
});
app.post('/',(req,res)=>{
    const schema = Joi.object({
        email: Joi.string().trim().email().required(),
        password: Joi.string().min(5).max(10).required()
    });
    
    const validation = schema.validate(req.body);
    if(validation.error){
        console.log(validation);
        res.send('An error has occurred');
    }
    else{
        console.log(req.body);
        res.send(validation);
    }    
    // Database works here
    //res.send('Data posted successfully');
    //res.json({success: true});
});
app.listen('3000');