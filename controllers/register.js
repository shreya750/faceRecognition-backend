const handleRegister= (req,res,db,bcrypt)=> {
    const { email,name,password  } = req.body;
    
    if(!email || !name || !password){
        return res.status(400).json('incoorect form submission');
    }
    const hash=bcrypt.hashSync(password);
    
    db.transaction(trx => {
        trx.insert({
            hash:hash,
            email:email
        })
        .into('smart_brain_login')
        .returning('email')
        .then(loginEmail =>{
            return trx('smart_brain_users')
            .returning('*')    
            .insert({
                email:loginEmail[0],
                name:name,
                joined:new Date()
            }).then(user => {
                res.json(user[0]);
            }) 
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err  => res.status(400).json('unable to register'))

    console.log("register request recieved");
    
}

module.exports= {
    handleRegister :handleRegister
}