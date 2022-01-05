
module.exports = (  req, //Request
                    res, //Response
                    next //Next middleware/request handler
                ) => {
    
    if( !req.user ){
        return res.status(401).send({error:'You must be logged in!'});
    }

    next();

};