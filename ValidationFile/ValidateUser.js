const hapiJoi = require("@hapi/joi");

const validateUsers = (data) => {
  const usersValidate = hapiJoi.object({
    name: hapiJoi.string(),
    email: hapiJoi.string().email(),
    password: hapiJoi.string().min(6).max(25),
  });
  return usersValidate.validate(data);
};

module.exports.validateUsers = validateUsers;

const validateSignIn = (data) => {
  const signInValidate = hapiJoi.object({
    email: hapiJoi.string().email(),
    password: hapiJoi.string().min(6).max(25),
  });
  return signInValidate.validate(data);
};

module.exports.validateSignIn = validateSignIn;