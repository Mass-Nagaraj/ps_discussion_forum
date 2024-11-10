
const db=require('../config/db');


const getLanguages= async (req,res)=>{
    try{
        db.query("select * from languages",
        (err,result)=>{
            if(err) return err;
            else{
                res.status(200).send(result)
            }
        }
    )
}
catch(error) {
    console.log("Error Occurs...");
    res.status(500).send({
            message : "Error occurs while fetch language datas..",
            error   : error.message
        })
    }
} 

const getusers= async (req,res)=>{
    try{
        db.query("select * from users",
        (err,result)=>{
            if(err) return err;
            else{
                    res.status(200).send(result)
                }
            }
        )
    }
    catch(error) {
        console.log("Error Occurs...");
        res.status(500).send({
            message : "Error occurs while fetch language datas..",
            error   : error.message
        })
    }
} 

const getQuestion= (req,res)=>{
    try{
 
        const id=req.body.id;
         db.query("select * from questions where id=?",[id],
            (err,result)=>{
                if(err){
                    console.log(err);
                }else{
                    res.send(result)
                }
            }
        )
        
    }
    catch(error) {
        // console.log("Error Occurs...");
        res.status(500).send({
            message : "Error occurs while fetch language datas..",
            error   : error.message
        })
    }
} 

const Discussion= (req,res)=>{

    try{
        console.log(req.body)

        const username=req.body.username;
        const email=req.body.email;
        const language=req.body.language;
        const level=req.body.level;
        const title=req.body.title;
        const body=req.body.body;
        const date=req.body.date;
        const time =req.body.time;
        const views=req.body.views;
        const likes=req.body.likes;
        const image=req.file?  req.file.filename :null;   
    
        let=sqlquery='';
        let=queryParams= [];
    
        if(image) {
            sqlquery ='INSERT INTO questions (username,email,language,level,title,body,date,time,image,views,likes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?)';
            queryParams=  [username,email,language,level,title,body,date,time,image,views,likes];
        }
        else{
            sqlquery ='INSERT INTO questions (username,email,language,level,title,body,date,time,views,likes) VALUES (? ,? ,?, ?, ?, ?, ?, ?,?, ?)';
            queryParams=  [username,email,language,level,title,body,date,time,views,likes] ;
        }
    
            db.query(
                sqlquery,
                queryParams,
                (err, result) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).send("Error inserting question");
                    }
                    else {
                        res.send("Question added successfully");
                        
                    }
                }
            );
        
    }
    catch(error) {
        // console.log("Error Occurs...");
        res.status(500).send({
            message : "Error occurs while fetch language datas..",
            error   : error.message
        })
    }
} 

const EditDiscussion= (req,res)=>{

    try{
 
        console.log("Coming Datas..",req.body);

        const username=req.body.username;
        const email=req.body.email;
        const language=req.body.language;
        const level=req.body.level;
        const title=req.body.title;
        const body=req.body.body;
        const date=req.body.date;
        const time =req.body.time;
        const image=req.file?  req.file.filename :null;  
        const edit_id=req.body.edit_id;
        let pre_image;
        if(req.body.pre_image) {
            pre_image=req.body.pre_image
        }
        
        if(edit_id==null) {
            return res.json( { Status: "Failed becoz Edit ID is null" })
        }
    
        let=sqlquery='';
        let=queryParams= [];
    
        if(image) {
            sqlquery ='update questions set language=?,level=?,title=?,body=?,image=? where id=?';
            queryParams=  [language,level,title,body,image,edit_id];
        }
        else{
            if(pre_image!=null) {
                
                            sqlquery ='update questions set language=?,level=?,title=?,body=?,image=? where id=?';
                            queryParams=  [language,level,title,body,pre_image,edit_id] ;
    
            }else{  
    
                sqlquery ='update questions set language=?,level=?,title=?,body=?,image=? where id=?';
                queryParams=  [language,level,title,body,null,edit_id] ;
            }
        }
    
            db.query(
                sqlquery,
                queryParams,
                (err, result) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).send("Error inserting question");
                    }
                    else {
    
                        db.query("update reply_details set language=? ,level=? where post_id=?",[language,level,edit_id],
                        (err,result)=>{
                            if(err) console.log(err);
                            else{
                                res.json({Status:`${edit_id} th Question Edited successfully `,})
                                console.log(`${edit_id} th Question Edited successfully in  both questions and reply_details table..`);
                            }
                        }
                        )          
                    }
                }
            )
        
    }
    catch(error) {
        // console.log("Error Occurs...");
        res.status(500).send({
            message : "Error occurs while fetch language datas..",
            error   : error.message
        })
    }
} 

const mainreplies= (req,res)=>{

    try{
 
        const username=req.body.username;
        const from_email=req.body.from_email;
        const to_email=req.body.to_email;
        const language=req.body.language;
        const level=req.body.level;
        const post_id=req.body.post_id;
        const body=req.body.body;
        const date=req.body.date;
        const time=req.body.time;
        const image=req.file?  req.file.filename :null;   
    
    
        let=sqlquery='';
        let=queryParams= [];
    
        if(image) {
            sqlquery ='INSERT INTO reply_details (username,from_email,to_email,language,level,post_id,body,image,date,time) VALUES (? ,?, ?,?, ?, ?, ?, ? ,? ,?)';
            queryParams=  [ username,from_email,to_email,language,level,post_id,body,image,date,time  ];
        }
        else{
            sqlquery ='INSERT INTO reply_details (username,from_email,to_email,language,level,post_id,body,date,time ) VALUES (? ,? ,?,? ,?,? , ? ,?, ?)';
            queryParams=   [ username,from_email,to_email,language,level,post_id,body,date,time  ];
        }
    
            db.query(
                sqlquery,
                queryParams,
                (err, result) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).send("Error inserting question");
                    }
                    else {
                        console.log(result)
    
                        res.send("Reply added successfully");
                        
                    }
                }
            );
        
    }
    catch(error) {
        
        res.status(500).send({
            message : "Error occurs while fetch language datas..",
            error   : error.message
        })
    }
} 

const EditMainReply= (req,res)=>{

    try{
 
        const editReplyId= req.body.editReplyId;
        const post_id=req.body.post_id;
        const body=req.body.body;
        const image=req.file?  req.file.filename :null; 
    
        let=sqlquery='';
        let=queryParams= [];
    
        if(image) {
            sqlquery ='update reply_details set body=? ,image=? where id=? and post_id=?';
            queryParams=  [ body,image,editReplyId,post_id  ];
        }
        else{
            sqlquery ='update reply_details set body=?,image=?  where id=? and post_id=?';
            queryParams=   [ body,null,editReplyId,post_id  ];
        }
    
            db.query(
                sqlquery,
                queryParams,
                (err, result) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).send("Error inserting question");
                    }
                    else {
                        console.log(result)
    
                        res.send({Status: "Main Reply Edited successfully.."});
                        
                    }
                }
            );
        
    }
    catch(error) {
        // console.log("Error Occurs...");
        res.status(500).send({
            message : "Error occurs while fetch language datas..",
            error   : error.message
        })
    }
} 

const favourites= (req,res)=>{

    try{
 
        const {email}=req.body;
        
        let list=[]
        db.query("select * from likes where email=?",[email],
          (err,result)=>{
            if(err){
                console.log(err);
            }else{
                // res.send(result);
                // console.log(result)
                
                Promise.all(
                    result.map((item,i)=>{
                        return new Promise((resolve,reject)=>{
                            db.query("select * from questions where id =?",[item.post_id],
                            (err,resultt)=>{
                                if(err) {
                                    console.log(err);
                                    reject(err);
                                }
                                else{
                                    // console.log(resultt);
                                    list.push(...resultt);
                                    resolve(resultt);
                                    // res.send(resultt);
                                }
                            }
                        )
                    })                       
    
                })
                ).then(()=>{
                    res.send(list);
                    list=[];
                }).catch(err=> console.log(err));
            }
        }
    )
        
    }
    catch(error) {
       
        res.status(500).send({
            message : "Error occurs while fetch language datas..",
            error   : error.message
        })
    }
} 

const ReplyFavourites= (req,res)=>{

    try{
 
        let list=[]
        const {email}=req.body;
        db.query("select * from reply_likes where email=?",[email],
            (err,result)=>{
                if(err){
                    console.log(err);
                }else{
                    // res.send(result);
                    // console.log(result)
                    Promise.all(
                        result.map((item,i)=>{
                            return new Promise((resolve,reject)=>{
                                
                                if(item?.SubReplyId==null) {
                                        db.query("select * from reply_details where id =?",[item.MainReplyId],
                                        (err,resultt)=>{
                                            if(err) {
                                                console.log(err);
                                                reject(err);
                                            }    
                                            else{
                                                list.push(...resultt);
                                                resolve(resultt);
                                            }
                                        }
                                        )
                                    }if(item?.MainReplyId==null){
                                        db.query("select * from sub_replies where id =?",[item.SubReplyId],
                                        (err,resultt)=>{
                                            if(err) {
                                                console.log(err);
                                                reject(err);
                                            }
                                            else{
                                                list.push(...resultt);
                                                resolve(resultt);
                                            }
                                        }
                                    )
                                    }
                            })
                        })
                    ).then(()=>{
                        res.send(list);
                        list=[]
                    }).catch(err=> console.log(err))
                }
            }
        )
        
    }
    catch(error) {
       
        res.status(500).send({
            message : "Error occurs while fetch language datas..",
            error   : error.message
        })
    }
} 

const fetch_saved= (req,res)=>{

    try{
      
        let list=[]
        const {email}=req.body;
        db.query("select * from saved where email=?",[email],
            (err,result)=>{
                if(err){
                    console.log(err);
                }else{
                    // res.send(result);
                    // console.log(result)
                    
                    Promise.all(
                        result.map((item,i)=>{
                            return new Promise((resolve,reject)=>{
                                db.query("select * from questions where id =?",[item.post_id],
                                (err,resultt)=>{
                                    if(err) {
                                        console.log(err);
                                        reject(err);
                                    }
                                    else{
                                        // console.log(resultt);
                                        list.push(...resultt);
                                        resolve(resultt);
                                        // res.send(resultt);
                                    }
                                }
                            )
                        })                       
        
                    })
                    ).then(()=>{
                        res.send(list);
                        list=[]
                        
                    }).catch(err=> console.log(err));
    
                }
            }
        )
        
    }
    catch(error) {
       
        res.status(500).send({
            message : "Error occurs while fetch language datas..",
            error   : error.message
        })
    }
} 

const fetch_Replysaved= (req,res)=>{

    try{
      
        let list=[]
        const {email}=req.body;
        db.query("select * from reply_saved where email=?",[email],
            (err,result)=>{
                if(err){
                    console.log(err);
                }else{
                    // res.send(result);
                    // console.log(result)
                    Promise.all(
                        result.map((item,i)=>{
                            return new Promise((resolve,reject)=>{
                                  
                                if(item?.SubReplyId==null) {
                                        db.query("select * from reply_details where id =?",[item.MainReplyId],
                                        (err,resultt)=>{
                                            if(err) {
                                                console.log(err);
                                                reject(err);
                                            }    
                                            else{
                                                list.push(...resultt);
                                                resolve(resultt);
                                            }
                                        }
                                    )
                                    }if(item?.MainReplyId==null){
                                        db.query("select * from sub_replies where id =?",[item.SubReplyId],
                                        (err,resultt)=>{
                                            if(err) {
                                                console.log(err);
                                                reject(err);
                                            }
                                            else{
                                                list.push(...resultt);
                                                resolve(resultt);
                                            }
                                        }
                                    )
                                    }
                            })
                        })
                    ).then(()=>{
                        res.send(list);
                        list=[]
                    }).catch(err=> console.log(err))
                }
            }
        )
        
    }
    catch(error) {
       
        res.status(500).send({
            message : "Error occurs while fetch language datas..",
            error   : error.message
        })
    }
} 

const subreplies= (req,res)=>{

    try{
      
    const username=req.body.username;
    const from_email=req.body.from_email;
    const to_main_replyid=req.body.to_main_replyid;
    const to_sub_replyid=req.body.to_sub_replyid;
    const post_id=req.body.post_id;
    const body=req.body.body;
    const date=req.body.date;
    const time=req.body.time;
    const image=req.file?  req.file.filename :null;   

    let=sqlquery='';
    let=queryParams= [];


    if(to_sub_replyid==null) {

            if(image) {
                sqlquery ='INSERT INTO sub_replies (username,from_email,to_main_replyid,post_id,body,image,date,time ) VALUES (? , ?, ?, ?, ?, ?, ?, ? )';
                queryParams=  [ username,from_email,to_main_replyid,post_id,body,image,date,time  ];
            }
            else{
                sqlquery ='INSERT INTO sub_replies (username, from_email, to_main_replyid ,post_id, body, date,time ) VALUES (? ,? ,? , ?, ?, ?, ? )';
                queryParams=   [ username,from_email,to_main_replyid,post_id,body,date,time  ];
            }
    }
    
    else if(to_main_replyid==null) {
        if(image) {
            sqlquery ='INSERT INTO sub_replies (username,from_email,to_sub_replyid,post_id,body,image,date,time ) VALUES (? , ?, ?, ?, ?, ?, ?, ? )';
            queryParams=  [ username,from_email,to_sub_replyid,post_id,body,image,date,time  ];
        }
        else{
            sqlquery ='INSERT INTO sub_replies (username, from_email, to_sub_replyid ,post_id, body, date,time ) VALUES (? ,? ,? , ?, ?, ?, ? )';
            queryParams=   [ username,from_email,to_sub_replyid,post_id,body,date,time  ];
        }
    }


        db.query(
            sqlquery,
            queryParams,
            (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send("Error inserting question");
                }
                else {
                    console.log(result)
                    res.send("Question added successfully");
                    
                }
            }
        )
        
    }
    catch(error) {
       
        res.status(500).send({
            message : "Error occurs while fetch language datas..",
            error   : error.message
        })
    }
} 

const Editsubreplies= (req,res)=>{

    try{
      
        const editing_sub_id=req.body.sub_id;
        const post_id=req.body.post_id;
        const body=req.body.body; 
        const image=req.file?  req.file.filename :null;   
    
        let=sqlquery='';
        let=queryParams= [];
    
    
       
        if(image) {
            sqlquery ='update sub_replies set body=?,image=? where id=? and post_id=?';
            queryParams=  [ body,image,editing_sub_id,post_id  ];
        }
        else{
            sqlquery ='update sub_replies set body=?,image=? where id=? and post_id=?';
            queryParams=  [ body,null,editing_sub_id,post_id  ];
        }
    
    
        db.query(
            sqlquery,
            queryParams,
            (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send("Error inserting question");
                }
                else {
                    console.log(result)
                    res.send({Status:"Sub Reply Edited SuccesFully..!!"});
                    
                }
            }
        )
        
    }
    catch(error) {
       
        res.status(500).send({
            message : "Error occurs while fetch language datas..",
            error   : error.message
        })
    }
} 

const check_likeExist= (req,res)=>{

    try{
      
        const email =req.body.email;
        const id =req.body.id;
        db.query("select email from likes where post_id=? and email=?",[id,email],(err,result)=>{
            if(err) {
                console.log(err);
            }else{
              
                    if(result.length==0) {
                        return res.json({status:"yes"})
                                
                    }
                    else{
                        res.json({status:"no"});
                        // console.log("like data found..!")
                    }
            }
                
            
        })
        
    }
    catch(error) {
       
        res.status(500).send({
            message : "Error occurs while fetch language datas..",
            error   : error.message
        })
    }
} 

const check_likeExist2= (req,res)=>{

    try{
      
        const email=req.body.email;
        const id=req.body.id;
        const MainReplyId=req.body.MainReplyId
        const SubReplyId=req.body.SubReplyId
        // console.log("SubReply and Main checking ",SubReplyId==null,MainReplyId==null)
    
        let=sqlquery='';
        let=queryParams= [];
    
        if(SubReplyId==null) {
            sqlquery="select email from reply_likes where post_id=? and email=? and MainReplyId=?";
            queryParams=[id,email,MainReplyId]
        }else if(MainReplyId==null) {
            sqlquery="select email from reply_likes where post_id=? and email=? and SubReplyId=?";
            queryParams=[id,email,SubReplyId]
        }
    
        // console.log("  ",email,id)
        db.query( sqlquery, queryParams ,(err,result)=>{
            if(err) {
                console.log(err);
            }else{
              
                    if(result.length==0) {
                        return res.json({status:"yes"})
                                
                    }
                    else{
                        // console.log("like data found..!")
                        res.json({status:"no"});
                    }
            }
                
            
        })
        
    }
    catch(error) {
       
        res.status(500).send({
            message : "Error occurs while fetch language datas..",
            error   : error.message
        })
    }
} 

const check_saveExist= (req,res)=>{

    try{
      
        const {email,id} =req.body;
        db.query("select email from saved where post_id=? and email=?",[id,email],(err,result)=>{
            if(err) {
                console.log(err);
            }else{          
                    if(result.length==0) {
                        return res.json({status:"yes"})
                                
                    }
                    else{
                        // console.log("save data found..!")
                        res.json({status:"no"});
                    }
            }
                
            
        })
        
    }
    catch(error) {
       
        res.status(500).send({
            message : "Error occurs while fetch language datas..",
            error   : error.message
        })
    }
} 

const check_saveExist2= (req,res)=>{

    try{
      
        const email=req.body.email;
        const id=req.body.id;
        const MainReplyId=req.body.MainReplyId
        const SubReplyId=req.body.SubReplyId
        
        let=sqlquery='';
        let=queryParams= [];
    
        if(SubReplyId==null) {
            sqlquery="select email from reply_saved where post_id=? and email=? and MainReplyId=?";
            queryParams=[id,email,MainReplyId]
        }else if(MainReplyId==null) {
            sqlquery="select email from reply_saved where post_id=? and email=? and SubReplyId=?";
            queryParams=[id,email,SubReplyId]
        }
    
        db.query(sqlquery ,queryParams,(err,result)=>{
            if(err) {
                console.log(err);
            }else{
              
                    if(result.length==0) {
                        return res.json({status:"yes"})
                                
                    }
                    else{
                        res.json({status:"no"});
                        // console.log("save2 data found..!")
                    }
            }
                
            
        })
        
    }
    catch(error) {
       
        res.status(500).send({
            message : "Error occurs while fetch language datas..",
            error   : error.message
        })
    }
} 

const addlike= (req,res)=>{

    try{
      
        const email=req.body.email;
        const id=req.body.id;
       
        db.query("insert into likes(email,post_id) values (?,?)",
        [email,id],
            (err,result)=>{
                if(err) {
                    console.log(err);
                    return
                }else{
                    console.log(result)
                    return res.json({status:"added"})
                }
            })
        
    }
    catch(error) {
       
        res.status(500).send({
            message : "Error occurs while fetch language datas..",
            error   : error.message
        })
    }
} 

const addlike2= (req,res)=>{

    try{
      
        const email=req.body.email;
        const id=req.body.id;
        const MainReplyId=req.body.MainReplyId
        const SubReplyId=req.body.SubReplyId
        // console.log("SubReply and Main checking ",SubReplyId,MainReplyId)
    
        let=sqlquery='';
        let=queryParams= [];
    
        if(SubReplyId==null) {
            sqlquery="insert into reply_likes(email,post_id,MainReplyId) values (?,?,?)";
            queryParams=[email,id,MainReplyId]
        }else if(MainReplyId==null) {
            sqlquery="insert into reply_likes(email,post_id,SubReplyId) values (?,?,?)";
            queryParams=[email,id,SubReplyId]
        }
       
        console.log(queryParams);
    
        db.query(sqlquery,queryParams,
            (err,result)=>{
                if(err) {
                    console.log(err);
                    return err;
                }else{
                    return res.json({status:"added"})
                }
        })
        
    }
    catch(error) {
       
        res.status(500).send({
            message : "Error occurs while fetch language datas..",
            error   : error.message
        })
    }
} 

const saved= (req,res)=>{

    try{
      
    const {email,id} =req.body;
    // console.log("  ",email,id)
   
    db.query("insert into saved(email,post_id) values (?,?) ",
    [email,id],
        (err,result)=>{
            if(err) {
                console.log(err);
                return
            }else{
                return res.json({status:"added"})
            }
        })
        
    }
    catch(error) {
       
        res.status(500).send({
            message : "Error occurs while fetch language datas..",
            error   : error.message
        })
    }
} 

const saved2= (req,res)=>{

    try{
      
      
        const email=req.body.email;
        const id=req.body.id;
        const MainReplyId=req.body.MainReplyId
        const SubReplyId=req.body.SubReplyId
        // console.log("SubReply and Main checking ",SubReplyId==null,MainReplyId==null)
    
        let=sqlquery='';
        let=queryParams= [];
    
        if(SubReplyId==null) {
            sqlquery="insert into reply_saved(email,post_id,MainReplyId) values (?,?,?) ";
            queryParams=[email,id,MainReplyId]
        }else if(MainReplyId==null) {
            sqlquery="insert into reply_saved(email,post_id,SubReplyId) values (?,?,?) ";
            queryParams=[email,id,SubReplyId]
        }
       
        db.query(sqlquery, queryParams,
            (err,result)=>{
                if(err) {
                    console.log(err);
                    return err;
                }else{
                    return res.json({status:"save added"})
                }
            })
        
    }
    catch(error) {
       
        res.status(500).send({
            message : "Error occurs while fetch language datas..",
            error   : error.message
        })
    }
} 

const post_likes= (req,res)=>{

    try{
          
        const id=req.body.post_id;
        db.query("select * from likes where post_id=? ",[id],
            (err,result)=>{
                if(err) {
                    console.log(err);
                }else{
                    res.send(result)
                }
            }
        )
        
    }
    catch(error) {
       
        res.status(500).send({
            message : "Error occurs while fetch language datas..",
            error   : error.message
        })
    }
} 

const delLike= (req,res)=>{

    try{
          
        const {email,id} =req.body;
        db.query("delete from likes where email=? and post_id=? ",[email,id],
            (err,result) =>{
                if(err) {
                    console.log(err);
                }else{
                    console.log("like deleted SuccessFully");
                    return res.json({status:"delect SuccessFully..!"})
                }
            }
        )
            
    }
    catch(error) {
       
        res.status(500).send({
            message : "Error occurs while fetch language datas..",
            error   : error.message
        })
    }
} 

const delLike2= (req,res)=>{

    try{
          
    const email=req.body.email;
    const id=req.body.id;
    const MainReplyId=req.body.MainReplyId
    const SubReplyId=req.body.SubReplyId
    console.log("SubReply and Main checking ",SubReplyId==null,MainReplyId==null)

    console.log("delete details", email,id,MainReplyId,SubReplyId)
    let=sqlquery='';
    let=queryParams= [];

    if(SubReplyId==null) {
        sqlquery="delete from reply_likes where email=? and post_id=? and MainReplyId=? ";
        queryParams=[email,id,MainReplyId]
    }else if(MainReplyId==null) {
        sqlquery="delete from reply_likes where email=? and post_id=? and SubReplyId=? ";
        queryParams=[email,id,SubReplyId]
    }

    db.query(sqlquery,queryParams,
        (err,result) =>{
            if(err) {
                console.log(err);
            }else{
                return res.json({status:"Delete SuccesFully"})
            }
        }
    )
            
    }
    catch(error) {
       
        res.status(500).send({
            message : "Error occurs while fetch language datas..",
            error   : error.message
        })
    }
} 

const delSave= (req,res)=>{

    try{
          
        const {email,id}=req.body;

        db.query("delete from saved where email=? and post_id=? ",[email,id],
            (err,result) =>{
                if(err) {
                    console.log(err);
                }else{
                    console.log("save deleted SuccessFully");
                    return res.json({status:"Save deleted SuccessFully..!"})
                }
            }
        )
            
    }
    catch(error) {
       
        res.status(500).send({
            message : "Error occurs while fetch language datas..",
            error   : error.message
        })
    }
} 

const delSave2= (req,res)=>{

    try{
          
        const email=req.body.email;
        const id=req.body.id;
        const MainReplyId=req.body.MainReplyId
        const SubReplyId=req.body.SubReplyId
        // console.log("SubReply and Main checking ",SubReplyId==null,MainReplyId==null)
    
        console.log("delete details", email,id,MainReplyId,SubReplyId)
        let=sqlquery='';
        let=queryParams= [];
    
        if(SubReplyId==null) {
            sqlquery="delete from reply_saved where email=? and post_id=? and MainReplyId=? ";
            queryParams=[email,id,MainReplyId]
        }else if(MainReplyId==null) {
            sqlquery="delete from reply_saved where email=? and post_id=? and SubReplyId=? ";
            queryParams=[email,id,SubReplyId]
        }
    
        db.query(sqlquery,queryParams,
            (err,result) =>{
                if(err) {
                    console.log(err);
                }else{
                    console.log("save2 deleted SuccessFully");
                    return res.json({status:"Save deleted SuccessFully..!"})
    
                }
            }
        )
            
    }
    catch(error) {
       
        res.status(500).send({
            message : "Error occurs while fetch language datas..",
            error   : error.message
        })
    }
} 

const replyLikes= (req,res)=>{

    try{
          
        const id=req.body.id;
    const MainReplyId=req.body.MainReplyId;
    const SubReplyId=req.body.SubReplyId;

    if(SubReplyId==null) {
        sqlquery="select * from reply_likes where post_id=? and MainReplyId =? ";
        queryParams=[id,MainReplyId]
    }else if(MainReplyId==null) {
        sqlquery="select * from reply_likes where post_id=? and SubReplyId =? ";
        queryParams=[id,SubReplyId]
    }


    db.query(sqlquery,queryParams,
        (err,result)=>{
            if(err) {
                console.log(err);
            }else{
                res.send(result)
            }
        }
    )
            
    }
    catch(error) {
       
        res.status(500).send({
            message : "Error occurs while fetch language datas..",
            error   : error.message
        })
    }
} 

const getreplies= (req,res)=>{

    try{
      
        db.query("select * from reply_details",
        (err,result)=>{
                if(err) {
                    console.log(err)
                }
                else{
                    // console.log(result)
                    res.send(result)
                }
            }
        )
            
    }
    catch(error) {
       
        res.status(500).send({
            message : "Error occurs while fetch language datas..",
            error   : error.message
        })
    }
} 

const getSubreplies1= (req,res)=>{

    try{
      
        let id;
        let sqlquery;
        
        if(req.body.SubReplyId==null) {
            
            id=req.body.MainReplyId;
            sqlquery="select * from sub_replies where to_main_replyid=? ";
        }
        else if(req.body.MainReplyId==null){
    
            id=req.body.SubReplyId;
            sqlquery="select * from sub_replies where to_sub_replyid=? ";
            
        }
    
        db.query(sqlquery,[id],
        (err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.send(result)
            }
        })
            
    }
    catch(error) {
       
        res.status(500).send({
            message : "Error occurs while fetch language datas..",
            error   : error.message
        })
    }
} 

const getAccUsername= (req,res)=>{

    try{
      
        const {email}=req.body;
        db.query("select * from users where email=?",[email],
            (err,result)=>{
                if(err) console.log(err);
                else{
                    res.send(result)
                }
            }
        )
            
    }
    catch(error) {
       
        res.status(500).send({
            message : "Error occurs while fetch language datas..",
            error   : error.message
        })
    }
} 

const getmainreplies= (req,res)=>{

    try{
      
        const post_id=req.body.post_id;

        db.query("select * from reply_details where post_id =?",
        [post_id],
        (err,result)=>{
                if(err) {
                    console.log(err)
                }
                else{
                    // console.log(result)
                    res.send(result)
                }
            }
        )
            
    }
    catch(error) {
       
        res.status(500).send({
            message : "Error occurs while fetch language datas..",
            error   : error.message
        })
    }
} 

const delt= (req,res)=>{

    try{
      
        const {id}=req.body;
        db.query("delete from questions where id=?",[id],
            (err,result)=>{
                if(err) {
                    console.log(err);
                    res.status(500).send(err);
                }
                else{
                    console.log("Question deleted Success in questions")
                }
            }
        )
        
        db.query("select id from view_details where view_id=?",[id],(err,resultt)=>{
            if(err) return res.status(500).send(err);
            else{
                if(resultt.length>0) {
                    
                    db.query(`delete from view_details where id in (${resultt.map(item=> item.id).join(', ')} )`,
                   (err,result)=>{
                       if(err) {
                           console.log(err);
                           res.status(500).send(err);
                       }
                       else{
                           console.log("Question deleted in view_details")
                       }
                   }
                   )
                }
            }
        })
    
    
        db.query("select id from reply_details where post_id=?",[id],(err,resultt)=>{
            if(err) return res.status(500).send(err);
            else{
                if(resultt.length>0) {
                    
                    db.query(`delete from reply_details where id in (${resultt.map(item=> item.id).join(', ')} ) `,
                   (err,result)=>{
                       if(err) {
                           console.log(err);
                           res.status(500).send(err);
                       }
                       else{
                           console.log("Question deleted in reply_details")
                       }
                   }
                   )
                }
    
            }
        })
    
        db.query("select id from sub_replies where post_id=?",[id],(err,resultt)=>{
            if(err) return res.status(500).send(err);
            else{
    
                if(resultt.length>0) {
                    
                    db.query(`delete from sub_replies where id in (${resultt.map(item=> item.id).join(', ')} )`,
                   (err,result)=>{
                       if(err) {
                           console.log(err);
                           res.status(500).send(err);
                       }
                       else{
                           console.log("Question deleted in sub_replies")
                       }
                   }
                   )
                }
            }
        })
    
    
        db.query("select id from likes where post_id=?",[id],(err,resultt)=>{
            if(err) return res.status(500).send(err);
            else{
                if(resultt.length>0) {
                    
                    db.query(`delete from likes where id in (${resultt.map(item=> item.id).join(', ')} )`,
                   (err,result)=>{
                       if(err) {
                           console.log(err);
                           res.status(500).send(err);
                       }
                       else{
                           console.log("Question deleted in likes")
                       }
                   }
                   )
                }
    
            }
        })
    
        db.query("select id from reply_likes where post_id=?",[id],(err,resultt)=>{
            if(err) return res.status(500).send(err);
            else{
                if(resultt.length>0) {
                    
                    db.query(`delete from reply_likes where id in (${resultt.map(item=> item.id).join(', ')} ) `,
                   (err,result)=>{
                       if(err) {
                           console.log(err);
                           res.status(500).send(err);
                       }
                       else{
                           console.log("Question deleted in reply_likes")
                       }
                   }
                   )
                }
            }
        })
        
        db.query("select id from saved where post_id=?",[id],(err,resultt)=>{
            if(err) return res.status(500).send(err);
            else{
                if(resultt.length>0) {
                    
                    db.query(`delete from saved where id in (${resultt.map(item=> item.id).join(', ')} )`,
                   (err,result)=>{
                       if(err) {
                           console.log(err);
                           res.status(500).send(err);
                       }
                       else{
                           console.log("Question deleted in saved")
                       }
                   }
                   )
                }
            }
        })
    
        db.query("select id from reply_saved where post_id=?",[id],(err,resultt)=>{
            if(err) return res.status(500).send(err);
            else{
                if(resultt.length>0) {
                    
                    db.query(`delete from reply_saved where id in (${resultt.map(item=> item.id).join(', ')} )`,
                   (err,result)=>{
                       if(err) {
                           console.log(err);
                           res.status(500).send(err);
                       }
                       else{
                           console.log("Question deleted in reply_saved")
                       }
                   }
                   )
                }
            }
        })
        
        res.send({Status:"Post Deleted SuccessFully.."})
            
    }
    catch(error) {
       
        res.status(500).send({
            message : "Error occurs while fetch language datas..",
            error   : error.message
        })
    }
} 

const deltReply= (req,res)=>{

    try{
        
        let id;
        let sqlquery;
        let queryParams;
        
        if(req.body.SubReplyId==null) {
            
            id=req.body.MainReplyId;
            sqlquery="delete from reply_details where id=?";
            queryParams=[id];
        }
        else if(req.body.MainReplyId==null){
    
            id=req.body.SubReplyId;
            sqlquery="delete from sub_replies where id=? ";
            queryParams=[id];
        }
    
        db.query(sqlquery,queryParams,
        (err,result)=>{
            if(err) {
                console.log(err);
                res.status(500).send(err);
            }
            else{
                console.log("Reply deleted Success in Repl_details")
            }
        }
        )
        db.query("select id from reply_likes where MainReplyId=?",[id],(err,resultt)=>{
            if(err) return res.status(500).send(err);
            else{
                if(resultt.length>0) {
                    
                    db.query(`delete from reply_likes where id in (${resultt.map(item=> item.id).join(', ')} )`,
                    (err,result)=>{
                        if(err) {
                            console.log(err);
                            res.status(500).send(err);
                        }
                        else{
                            console.log("Reply deleted in reply_likes")
                        }
                    }
                    )
                }
            }
        })
        db.query("select id from reply_saved where MainReplyId=?",[id],(err,resultt)=>{
            if(err) return res.status(500).send(err);
            else{
                if(resultt.length>0) {
                    
                    db.query(`delete from reply_saved where id in (${resultt.map(item=> item.id).join(', ')} )`,
                    (err,result)=>{
                        if(err) {
                            console.log(err);
                            res.status(500).send(err);
                        }
                        else{
                            console.log("Reply deleted in reply_saved")
                        }
                    }
                    )
                }
            }
        })
        
       
            
    }
    catch(error) {
       
        res.status(500).send({
            message : "Error occurs while fetch language datas..",
            error   : error.message
        })
    }
} 

const edit= (req,res)=>{

    try{

        const {id}=req.body;
        db.query("select * from questions where id=?",[id],
            (err,result)=>{
                if(err)  console.log(err);
                else{
                    res.send(result);
                }
            }
        )       
       
            
    }
    catch(error) {
       
        res.status(500).send({
            message : "Error occurs while fetch language datas..",
            error   : error.message
        })
    }
} 

const EditReply= (req,res)=>{

    try{

        const id=req.body.id;
        db.query("select * from reply_details where id=?",[id],
            (err,result)=>{
                if(err)  console.log(err);
                else{
                    res.send(result);
                }
            }
        )
       
            
    }
    catch(error) {
       
        res.status(500).send({
            message : "Error occurs while fetch language datas..",
            error   : error.message
        })
    }
} 

const EditSubReply= (req,res)=>{

    try{

        const id=req.body.id;
        db.query("select * from sub_replies where id=?",[id],
            (err,result)=>{
                if(err)  console.log(err);
                else{
                    res.send(result);
                }
            }
        )
       
            
    }
    catch(error) {
       
        res.status(500).send({
            message : "Error occurs while fetch language datas..",
            error   : error.message
        })
    }
} 

const getlevel= (req,res)=>{

    try{

        const level=req.body.level;
        const lang=req.body.language;
        db.query("select * from reply_details where level=? and language=?",
        [level,lang],
        (err,result)=>{
                if(err) {
                    console.log(err)
                }
                else{
                    
                    res.send(result)
                }
            }
        )
       
            
    }
    catch(error) {
       
        res.status(500).send({
            message : "Error occurs while fetch language datas..",
            error   : error.message
        })
    }
} 

const getlang_reply= (req,res)=>{

    try{

        const language=req.body.language;

        db.query("select * from reply_details where language =?",
        [language],
        (err,result)=>{
                if(err) {
                    console.log(err)
                }
                else{
                    // console.log(result)
                    res.send(result)
                }
            }
        )
       
            
    }
    catch(error) {
       
        res.status(500).send({
            message : "Error occurs while fetch language datas..",
            error   : error.message
        })
    }
} 

const getsubreplies= (req,res)=>{

    try{

    const {post_id}=req.body;
    db.query("select * from sub_replies where post_id=?",
        [post_id],(err,result)=>{
            if(err) {
                console.log(err);
            }else{
                res.send(result)
            }
        }
    )
       
            
    }
    catch(error) {
       
        res.status(500).send({
            message : "Error occurs while fetch language datas..",
            error   : error.message
        })
    }
} 

const getallreplies= (req,res)=>{

    try{

        const from_email=req.body.email;

        db.query("select * from reply_details where from_email=?",
        [from_email],
        (err,result)=>{
                if(err) {
                    console.log(err)
                }
                else{
                    // console.log(result)
                    res.send(result)
                }
            }
        )
       
            
    }
    catch(error) {
       
        res.status(500).send({
            message : "Error occurs while fetch language datas..",
            error   : error.message
        })
    }
} 

const getRecentPosts= (req,res)=>{

    try{

        db.query("select * from questions",(err,result)=>{
            if(err) return err;
            else{
                res.send(result)
            }
        })      
    }
    catch(error) {
       
        res.status(500).send({
            message : "Error occurs while fetch language datas..",
            error   : error.message
        })
    }
} 

const getRecentReplies= (req,res)=>{

    try{

        const {language} =req.body;
        db.query('select * from questions where language= ?',
        [language],
        (err,result)=>{
            if(err){
                console.log(err);
            }
            else{
                res.send(result);
            }
        }
        )
       
            
    }
    catch(error) {
       
        res.status(500).send({
            message : "Error occurs while fetch language datas..",
            error   : error.message
        })
    }
} 

const view= (req,res)=>{

    try{

        const {views,id,email,date}=req.body;
        db.query(`update questions set views=? where id=? `,
            [views,id],
            (err,result)=>{
                if(err){
                    console.log(err);
                }
                else{
                    res.send(result);
                }
            }
        )
            
    }
    catch(error) {
       
        res.status(500).send({
            message : "Error occurs while fetch language datas..",
            error   : error.message
        })
    }
} 

const postViewData= (req,res)=>{

    try{

        const {username,email,view_id,view_date}=req.body;

    db.query('select * from view_details where email=? and view_id=?',
    [email,view_id],
    (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
           
            if((result.length===0)){
                
                console.log("data is empty");
                db.query('insert into view_details(username,email,view_id,view_date) values (?,?,?,?)',
                [username,email,view_id,view_date],
                (err,resultt)=>{
                    if(err){
                        return console.log(err);
                    }    
                    else{
                        
                        return res.json({Status:"Success"});
                    
                    }
                })
            }
            else {
                               
                console.log("data found");
                return res.json({Status:"Failed"});
                
            }
        }
    });
            
    }
    catch(error) {
       
        res.status(500).send({
            message : "Error occurs while fetch language datas..",
            error   : error.message
        })
    }
} 

const profile= (req,res)=>{

    try{

        const email=req.body.email;
        db.query('select * from questions where email =?',
            [email],
            (err,result)=>{
                if(err){
                    console.log(err);
                }
                else{
                    res.send(result)
                }
            }
        )
            
    }
    catch(error) {
       
        res.status(500).send({
            message : "Error occurs while fetch language datas..",
            error   : error.message
        })
    }
} 




module.exports={
    getLanguages,
    getusers,
    getQuestion,
    Discussion,
    EditDiscussion,
    EditMainReply,
    favourites,
    ReplyFavourites,
    fetch_saved,
    fetch_Replysaved,
    subreplies,
    Editsubreplies,
    check_likeExist,check_likeExist2,check_saveExist,check_saveExist2,
    addlike,addlike2,saved,saved2,post_likes,delLike,delLike2,delSave,delSave2,replyLikes,getreplies,getSubreplies1,
    getAccUsername,getmainreplies,delt,deltReply,edit,
    EditReply,
    EditSubReply,
    getlevel,
    getlang_reply,
    getsubreplies,
    getallreplies,
    getRecentPosts,
    getRecentReplies,
    getLanguages,
    view,
    postViewData,
    profile,
    mainreplies

    
}
