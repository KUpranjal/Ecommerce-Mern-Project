

const isSeller = async(req, res, next) =>{
    try {
        
        if(req.user.role != "seller" )
        {
            throw new Error("Access Denied / only seller can do this operation!")
        }

        next()
    } catch (error) {
        res.status(400).json({error : error.message})
    }
}


module.exports = {
    isSeller
}