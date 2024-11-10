
const express=require('express');
const mysql=require('mysql2');
const app=express();
const path=require('path')
const cors=require('cors');
const bodyParser=require('body-parser');
const dotenv=require('dotenv');
const db=require('./src/config/db')
const multer=require('multer');
const cookieParser = require('cookie-parser');
const bcrypt =require('bcrypt');
const jwt=require('jsonwebtoken');
const session = require('express-session'); // Import express-session
const passport = require('passport');
require('./passport-setup')


dotenv.config({
    path:path.resolve(__dirname,'./.env')
}
);


app.use(cors({
    origin:["http://localhost:3000"],
    methods: ["POST","GET"],
    credentials: true
}));

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(session({
    secret: 'jwt-secret-key',  
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } 
}));

app.use(passport.initialize());
app.use(passport.session());

// app.use('/static', express.static(path.join(__dirname, 'public')));
// app.use(session({
    //     secret: 'jwt-secret-key', // Replace with a strong, random string
    //     resave: false,
    //     saveUninitialized: false,
    //     cookie: { secure: false } // Set to true if using HTTPS
    // }));
    
let showdate=new Date()

  let displayTodaysDate=showdate.getDate()+'/'+(showdate.getMonth()+1)+'/'+showdate.getFullYear();
  let dt=showdate.toDateString()
  let displayTime=showdate.getHours()+':'+showdate.getMinutes()+':'+showdate.getSeconds();
//   let [currentDate,currentMonth,currentYear] =displayTodaysDate.split('/');
//   let [currentHours,currentMinutes,currentsec]=displayTime.split(':');

//   console.log(displayTime,displayTodaysDate)

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/images')
    },
    filename:(req,file,cb)=>{
        cb(null, file.filename + "_" + Date.now() + path.extname(file.originalname));
    }
})

const upload=multer({

    storage: storage
})

//router

const router=require('./src/Routes/routes');
app.use(router)





app.post('/C',(req,res)=>{
  
    const lang =req.body.language;
    
    db.query(
        'select level,title,body from questions where language=?',
        [lang],
        (err,result)=>{
            if(err){
                console.log(lang)
                console.log(err);
            }
            else{
                res.send(result)
            }
        }
    )
  
});

app.post('/Python',(req,res)=>{
    
    const lang =req.body.language;
    
    db.query(
        'select level,title,body from questions where language=?',
        [lang],
        (err,result)=>{
            if(err){
                console.log(lang)
                console.log(err);
            }
            else{
                res.send(result)
            }
        }
    )
});
app.post('/Java',(req,res)=>{
    
    const lang =req.body.language;
   
    
    db.query(
        'select level,title,body from questions where language=?',
        [lang],
        (err,result)=>{
            if(err){
                console.log(lang)
                console.log(err);
            }
            else{
                res.send(result)
            }
        }
    )
});

app.post('/UIUX',(req,res)=>{
   
    const lang =req.body.language;

    db.query(
        'select level,title,body from questions where language=?',
        [lang],
        (err,result)=>{
            if(err){
                console.log(err);
            }
            else{
                res.send(result)
            }
        }
    )
});

app.post('/C/levels',(req,res)=>{
   
    const {language,level} = req.body;
   
    db.query('SELECT * FROM questions WHERE language = ? AND level = ?', [language, level], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    });
    
});

app.post('/Python/levels',(req,res)=>{
   
    const { language, level } = req.body;
   
    db.query('SELECT * FROM questions WHERE language = ? AND level = ?', [language, level], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    });
});

app.post('/Java/levels',(req,res)=>{
   
    const { language, level } = req.body;
   
    db.query('SELECT * FROM questions WHERE language = ? AND level = ?', [language, level], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    });

});

app.post('/UIUX/levels',(req,res)=>{
   
     const { language, level } = req.body;
   
    db.query('SELECT * FROM questions WHERE language = ? AND level = ?', [language, level], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.send(result);
        }   
    });

});

// app.post('/', (req, res) => {
//     const {email,password,date,time} =req.body;

//     // req.session.username=req.body.username;
//     // req.session.email=req.body.email;
//     // console.log("session datas..",req.session.username,req.session.email);        

//     db.query('SELECT * FROM users WHERE email = ? ',
//         [ email],
//         (err, result) => {
//             if (err) {
//                 console.log(err);
//                 res.status(500).send('Database error');
//             }
//             else if (result.length > 0) {
//                 db.query(`update users set date=? , time=? where email= ? `,
//                     [ date,time,email ],
//                     (err,re)=>{
//                         if(err){
//                             console.log("err while Updating data and time ",err);
//                         }
//                         else{
//                             bcrypt.compare(password.toString(),result[0].password,(err,response)=>{
//                                 if(err) return res.json({Error : "error occurs while comparing the bcrypt password" });
//                                 else if(response){
//                                     // console.log(result)
//                                     const username=result[0].username;
//                                     const emaill=result[0].email;
//                                     const token =jwt.sign({username: username, email: emaill},"jwt-secret-key",{expiresIn: "10s"});
//                                     res.cookie("token",token)
//                                     return res.send(result);

//                                 }else{
//                                     console.log(password,"response --> ",response)
//                                     return res.json({status: false});
//                                 }
//                             })
//                         }
//                     }
//                 )

//             } 
//             else {
               
//                    return res.json({status: false})      
//             }
//         }
//     );
// });
    

app.get('/posts',(req,res)=>{
    
    db.query('select * from questions',
    (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    }
    )
})

app.get('/posts/C',(req,res)=>{
    
    db.query('select id from questions where language= ?',
    ["C"],
    (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    }
    )
})

app.get('/posts/Python',(req,res)=>{
    
    db.query('select id from questions where language= ?',
    ["Python"],
    (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    }
    )
})

app.get('/posts/Java',(req,res)=>{
    
    db.query('select id from questions where language= ?',
    ["Java"],
    (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    }
)
});

app.get('/posts/UIUX',(req,res)=>{
    
    db.query('select id from questions where language= ?',
    ["UIUX"],
    (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    }
    )
})


app.get('/getLanguages',(req,res)=>{

    db.query(`select * from languages`,
        (err,result)=>{
            if(err){
                console.log(err);
            }
            else{
                res.send(result);
            }
        }
    )
})


app.get('/success',(req,res)=>{
    const [displayName,email,pic] =req.user
    // res.sendFile((path.join(__dirname,'./public/success','Success.js')));
    res.redirect(`http://localhost:3000/success`)
});


app.get('/failed',(req,res)=>{
   
    req.session.destroy((err) => {
        if (err) {
            console.log('Error destroying session:', err);
            return res.status(500).json({ error: 'Failed to destroy session' });
        }

    })
        res.clearCookie('token'); 
    res.redirect(`http://localhost:3000/`);

});



const hash_digits=10;

const VerifyUser= (req,res,next) =>{
    const token=req.cookies.token;
    if(!token) {
        return res.json({Error:"You are not Authenticated"})
    }
    else{
        const user= jwt.verify(token,"jwt-secret-key",(err,decoded)=>{
            if(err) {
                // console.log({Error:"Secret Key is Not Okay..!"});
                return "token expired"
            }else{
                console.log("Result :",decoded)
                req.username = decoded.username;
                req.email = decoded.email;
                next();
            }
        })
        console.log(user);
        if(user == "token expired") {
           
            db.query('update users set date=?,time=? where email=?',[displayTodaysDate,displayTime, req.email ],(err,resultt)=>{
                if(err) {
                    console.log(err);
                    return res.status(500).send('Server error');

                }else{
                    console.log("Date and time Updated after token Expired !")
                }
           })

            res.json({status:"expirederror" ,data:"token expired"})
        }        

    }
}


app.get("/protected", VerifyUser, (req,res)=>{
    return res.json({status:"success", name: req.username,email: req.email })
})




app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], prompt: 'select_account' }));

app.get('/callback', passport.authenticate('google', {
    failureRedirect: '/failed'
  }),function (req, res) {

    const userEmail=req.user?.emails[0].value;
    const userName=req.user?.displayName ?? req.user?.given_name
    db.query("select email from users where email=? ",[userEmail],(err,result)=>{
        if(err) {
            console.log(err);
            return res.status(500).send('Server error');
        }
        else{
            if(result.length>0) {   

               db.query('update users set date=?,time=? where email=?',[displayTodaysDate,displayTime,userEmail],(err,resultt)=>{
                    if(err) {
                        console.log(err);
                        return res.status(500).send('Server error');

                    }else{
                        console.log("Date and time Updated ")
                    }
               })

                const token =jwt.sign({username: userName, email:  userEmail},"jwt-secret-key",{expiresIn: "1d"});
                res.cookie("token",token)
                // res.send(result);
                
                console.log("Matched Results : ",result)
                return res.redirect("http://localhost:3000/Home");
            }else{
                return res.redirect("http://localhost:3000/failed");
            }
        }
    })
    // res.redirect('/success');
    // res.sendFile(`<div>Success</div>`);
});


app.get("/logout", (req, res) => {
    // Destroy the session
    const email=req.query.email
    db.query('update users set date=?,time=? where email=?',[displayTodaysDate,displayTime, email ],(err,resultt)=>{
        if(err) {
            console.log(err);
            return res.status(500).send('Server error');

        }else{
            console.log(`Date and time Updated after logout for email =${email}!`)
        }
   })

    req.session.destroy((err) => {
        if (err) {
            console.log('Error destroying session:', err);
            return res.status(500).json({ error: 'Failed to destroy session' });
        }
        // sessionStorage.clear();
        res.clearCookie('token')
        res.clearCookie('Ac_select')
        res.send("logout")
    
    })
});




app.get("/clear-Acc-Option",(req,res)=>{
    res.clearCookie('Ac_select');
})

app.listen(2000,()=>{
    console.log("Server is Listening On Port 2000..!")
});




// app.post('/upload',upload.single('image'), (req,res)=>{

//     // console.log(req.file);
//     const image =req.file.filename;
//     db.query('update questions set image =?',
//         [image],
//         (err,result)=>{
//             if(err){
//                 console.log(err);
//                 res.json({Status:"Failed"});
//             }
//             else{
//                 res.json({Status:"Success"})
//             }
//         }
//     )
// })



// app.post('/register', (req, res) => {
//     const {username,email,password} =req.body;

//     // req.session.username=req.body.username;
//     // req.session.email=req.body.email;

//     // console.log("session datas..",req.session.username,req.session.email);        

//         db.query('SELECT email FROM users WHERE email = ?',
//         [ email ],
//         (err, result) => {
//             if (err) {
//                 console.log(err);
//                 res.status(500).send('Database error');
//             } 
//             else if (result.length > 0) {
//                 res.send( {status : true} )
//             }
//             else {
//                     // bcrypt.hash(password.toString(),hash_digits,(err,hashed)=>{
//                         // if(err) return res.json({ Error: "Error occurs while Hashing Password"});
                        
//                         db.query(
//                             'INSERT INTO users (username,email,password) VALUES (?, ?, ?)',
//                             [username,email,password],
//                             // [username,email,hashed],
//                             (err, result) => {
//                                 if (err) {
//                                     console.log(err);
//                                     res.status(500).send('Database error');
//                                 } else {
//                                     res.send('User registered Successfully..!');
//                                 }
//                             }
//                         );    
                                              
//                     // })
                              
//             }
//         }
//     );
// });
