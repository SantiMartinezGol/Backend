const errorHandler = (err, req, res, next) =>
{
  if (err?.message.includes('Not Found'))
  {
      return res.status(404).json({ message: err.message });
  }
  else if (err?.name.includes('ZodError'))
  {
      return res.status(400).json({ message: err.issues });
  }
  else if (err?.message.includes('Email o Password invalid format.'))
  {
      return res.status(401).json({ message: err.message });
  }
  else if (err?.message.includes('Login failed, invalid password.'))
  {
      return res.status(401).json({ message: err.message });
  }
  res.status(500).json({ message: 'Ocurrió un error' });
};

export default errorHandler;