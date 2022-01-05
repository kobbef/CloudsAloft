
module.exports = (  req, //Request
                    res, //Response
                    next //Next middleware/request handler
                ) => {
    
    if( req.user.credits < 1 ){
        return res.status(403).send({error:'Not enough credits!'});
    }

    next();

};