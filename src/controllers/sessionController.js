
import SessionManager from "../managers/sessionManager.js";
import { createHash, isValidPassword } from "../utils/index.js";

export const login = async (req, res) => {
  const manager = new SessionManager();
  const user = await manager.login(req.body)
  console.log(user);
  //req.session.user = user;
  if (user) {
    res.send({ message: 'Login success!' });
  } else {
    return res.status(401).send({ message: 'Login failed, invalid password.' })
  }
};

export const login2 = async (req, res) => {
  if (!req.user) return res.status(400).send({ status: 'error', message: 'Invalid credentials' });

  req.session.user = {
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    email: req.user.email,
  };

  res.send({ status: 'success', message: 'Login success' });
}

export const logout = async (req, res) => {
  const manager = new SessionManager();
  manager.logout()
  res.send({ message: 'Logout ok!'})


};

export const signup = async (req, res) => {
  const manager = new SessionManager();
  const user = await manager.signup(req.body)
  if (user) {
    res.status(201).send({
      status: 'success', user, message: 'User created.'
    });
  }
}

export const register = async (req, res) => {
  res.send({ status: 'success', message: 'User registered' });
}

export const forgetPassword = async (req, res) => {
  const manager = new SessionManager();
  const user = manager.forgetPassword(req.body)
  if(user)
  res.status(200).send({ status: 'success', user, message: 'User change password.' });
 
};

export const fail = async (req, res) => {
  console.log('Failed strategy');
  res.status(400).send({ error: 'Failed' });
};