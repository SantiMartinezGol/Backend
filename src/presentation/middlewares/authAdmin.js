const authAdmin = (permission) => {
    return async (req, res, next) => {
        const user = req.user;

        if (user.isAdmin) 
        {
            return res.status(401).send({ message: 'Not authorization!' });
        }
        next();
    }
}

export default authAdmin;