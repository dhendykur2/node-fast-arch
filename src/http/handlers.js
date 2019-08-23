const Joi = require('joi');
const validator = require('express-joi-validator');

const NUMBER = Joi.number();
const STRING = Joi.string();
const DATE = Joi.date();

const postMethodSchema = {
  EXAMPLE: {
    params: {
      id: NUMBER.required()
    },
    body: {
      A: STRING.required(),
      B: NUMBER.required()
    }
  }
};

const getMethodSchema = {
  GET_BY_ID: {
    params: {
      id: NUMBER.required()
    }
  }
};

const putMethodSchema = {
};

const schema = { ...postMethodSchema, ...getMethodSchema, ...putMethodSchema };

exports.validate = (endpoint) => validator(schema[endpoint]);
