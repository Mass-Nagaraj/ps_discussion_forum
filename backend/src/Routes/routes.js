const { getLanguages, getusers,getQuestion,Discussion,EditDiscussion,EditMainReply,favourites,ReplyFavourites,fetch_saved, fetch_Replysaved,subreplies,Editsubreplies,check_likeExist,
    check_likeExist2,check_saveExist,check_saveExist2,addlike,addlike2,saved,saved2,post_likes,delLike,
    delLike2,delSave,delSave2,replyLikes, 
    getreplies,
    getSubreplies1,
    getAccUsername,
    getmainreplies,
    delt,
    deltReply,
    edit,
    EditReply,
    EditSubReply,
    getlevel,
    getlang_reply,
    getsubreplies,
    getRecentPosts,
    getallreplies,
    getRecentReplies,
    view,
    postViewData,
    profile,
    mainreplies} = require('../Controllers/DiscussControllers');


const multer = require('multer');
const path=require('path')
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


const router=require('express').Router();

router.get('/getLanguages',getLanguages)

router.get('/users',getusers)

router.post('/QuestionId',getQuestion);

router.post('/Discussion',upload?.single('image'),Discussion)

router.post('/EditDiscussion',upload?.single('image'),EditDiscussion)

router.post('/mainreplies',upload?.single('image'),mainreplies);

router.post('/EditMainReply',upload?.single('image'),EditMainReply)

router.post('/favourites',favourites)

router.post('/ReplyFavourites',ReplyFavourites)

router.post('/fetch_saved',fetch_saved)

router.post('/fetch_Replysaved',fetch_Replysaved)

router.post('/subreplies',upload?.single('image'),subreplies)

router.post('/Editsubreplies',upload?.single('image'),Editsubreplies)

router.post('/check_likeExist',check_likeExist)

router.post('/check_likeExist2',check_likeExist2)

router.post('/check_saveExist',check_saveExist)

router.post('/check_saveExist2',check_saveExist2)

router.post('/addlike',addlike)

router.post('/addlike2',addlike2)

router.post('/saved',saved)

router.post('/saved2',saved2)

router.post('/post_likes',post_likes)

router.post('/delLike',delLike)

router.post('/delLike2',delLike2)

router.post('/delSave',delSave)

router.post('/delSave2',delSave2)

router.post('/replyLikes',replyLikes)

router.get('/getreplies',getreplies)

router.post('/getSubreplies1',getSubreplies1)

router.post('/getAccUsername',getAccUsername)

router.post('/getmainreplies',getmainreplies)

router.post('/delt',delt)

router.post('/deltReply',deltReply)

router.post('/edit',edit)

router.post('/EditReply',EditReply)

router.post('/EditSubReply',EditSubReply)

router.post('/getlevel',getlevel)

router.post('/getlang_reply',getlang_reply)

router.post('/getsubreplies',getsubreplies)

router.post('/getallreplies',getallreplies)

router.get('/getRecentPosts',getRecentPosts)

router.post('/getRecentReplies',getRecentReplies)

router.post('/view',view)

router.post('/postViewData',postViewData)

router.post('/profile',profile)




module.exports=router


