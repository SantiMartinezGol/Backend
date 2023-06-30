import SessionManager from "../../domain/managers/sessionManager.js";

export const login = async (req, res, next) => {
  try {
    
    const manager = new SessionManager();
    const accessToken = await manager.login(req.body)
    
    if (accessToken) {
      res.send({ message: 'Login success!', accessToken });
    }
  } catch (e) {
    next(e)
  }
};

export const current = async (req, res, next) => {
  try {
    res.status(200).send({ status: 'Success', payload: req.user });
  }
  catch (e) {
    next(e)
  }
};

export const signup = async (req, res, next) => {
  try {
    const manager = new SessionManager();
    const user = await manager.signup(req.body)
    if (user) {
      res.status(201).send({
        status: 'success', user, message: 'User created.'
      });
    }
  }
  catch (e) {
    next(e)
  }
}