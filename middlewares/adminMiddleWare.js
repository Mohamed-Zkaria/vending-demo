const AdminMiddleWare = {
    is_admin: async (req, res, next) => {
        let authorization = req.headers.authorization;
        if(process.env.ADMIN_TOKEN == authorization){
            next();
        }else{
            return res.status(401).send({msg: "Unauthorized"})
        }
    }
}

module.exports = AdminMiddleWare;