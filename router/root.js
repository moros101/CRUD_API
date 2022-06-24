import express from "express";
const router = express.Router();
import pool from "../db.js";




router.get("/",async(req,res,next)=>{

    try{
        const data = await pool.query('select * from tblEMP;');
        // res.json(data);
        res.send(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <form action="/info/get" method="GET">
                <input type="submit" value="GET">
            </form>
            <br><br>
            <form action="/info/add" method="POST">
                <label for="ID">ID:</label>
                <input type="text" name="ID" id="ID"><br><br>
                <label for="FirstName">FirstName:</label> 
                <input type="text" name="FirstName" id="FirstName"><br><br>
                <label for="LastName">LastName:</label> 
                <input type="text" name="LastName" id="LastName"><br><br>
                <label for="Email">Email:</label> 
                <input type="text" name="Email" id="Email"><br><br>
                <label for="MobileNo">MobileNo:</label> 
                <input type="text" name="MobileNo" id="MobileNo"><br><br>
                <label for="Hobbies">Hobbies:</label> 
                <input type="text" name="Hobbies" id="Hobbies"><br><br>
                <label for="Gender">Gender:</label> 
                <input type="text" name="Gender" id="Gender"><br><br>
                <label for="RegistrationDate">RegistrationDate:</label> 
                <input type="text" name="RegistrationDate" id="RegistrationDate"><br><br>
                <label for="CountryID">CountryID:</label> 
                <input type="text" name="CountryID" id="CountryID"><br><br>
                <label for="StateID">StateID:</label> 
                <input type="text" name="StateID" id="StateID"><br><br>
                <label for="CityID">CityID:</label> 
                <input type="text" name="CityID" id="CityID"><br><br>
                
                <input type="submit" value="POST DATA">    
            </form>
            <br><br>
            <form action="/info/delete" method="POST">
        
                <label for="DELETE">DELETE:</label>
                <input type="text" name="DELETE" id="DELETE">
                <input type="submit" value="DELETE DATA">
            </form>
            <br><br>
            <form action="/info/update" method="POST">
    
                <label for="oldValue">OLD VALUE:</label>
                <input type="text" name="oldValue" id="oldValue">
                <label for="newValue">NEW VALUE:</label>
                <input type="text" name="newValue" id="newValue">
                <input type="submit" value="UPDATE DATA">
            </form>
            
        </body>
        </html>`);
    }catch(err){
        console.log(err.message);
    }
      
});


//intial route
router.get("/info/get",async(req,res,next)=>{

    try{
        const data = await pool.query('select * from tblEMP;');
        // res.json(data);
        // console.log(data);
        // res.json(data);
        res.send(data.rows);
    }catch(err){
        console.log(err.message);
    }
      
});


router.post("/info/add",async (req,res)=>{
    try{    
        const {ID,FirstName ,LastName,Email,MobileNo,Hobbies,Gender ,RegistrationDate,CountryID,StateID,CityID} = req.body;
        const tblEMP = await  pool.query("INSERT INTO tblEMP(ID,FirstName, LastName, Email, MobileNo, Hobbies, Gender, RegistrationDate, CountryID, StateID, CityID) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *",[ID,FirstName ,LastName,Email,MobileNo,Hobbies,Gender ,RegistrationDate,CountryID,StateID,CityID]);
        // return res.json(tblEMP.rows)
        res.redirect('/info/get');
    }catch(err){
        console.log(err.message)
    }
});


router.post("/info/delete",async (req,res)=>{
    
    try{
    
        const del = await pool.query(`DELETE FROM tblEMP WHERE id = ${req.body.DELETE}`);
        res.redirect('/info/get')
        
    }catch(err){
        console.log(err.message);
    }
});

router.post("/info/update",async (req,res)=>{
    
    try{
        
        const upd = await pool.query(`UPDATE tblEMP SET firstname = '${req.body.newValue}' WHERE firstname = '${req.body.oldValue}'`);
        console.log(upd);
        res.redirect('/info/get');
        
    }catch(err){
        console.log(err.message);
    }
});

export default router;