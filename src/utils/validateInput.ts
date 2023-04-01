import Joi from 'joi'
import { CustomerAddress } from '../model/address'

export function phoneValidator(value: string, helper: any) {
  const temp = value.replace(/\(|\)|-| /g, '')
  const length = temp.length

  return length !== 10 ? helper.message('Phone number should be 10 digit number') : value
}

const emailSchema = Joi.string()
  .trim()
  .email({ tlds: { allow: false } })
  .label('Email')
  .messages({
    'string.empty': 'Please enter your email address',
    'string.email': 'Please enter a valid email address'
  })
const firstNameSchema = Joi.string().trim().label('First name').messages({
  'string.empty': 'Please enter a first name'
})
const lastNameSchema = Joi.string().trim().label('Last name').messages({
  'string.empty': 'Please enter a last name'
})
// const nameSchema = Joi.string().trim().label('Full name')
const addressLineSchema = Joi.string().trim().label('Address').messages({
  'string.empty': 'Please enter an address'
})

const countrySchema = Joi.string().default('United States').label('Country')

const phoneSchema = Joi.string().trim().label('Phone number').custom(phoneValidator).messages({
  'string.empty': 'Please enter a phone number'
})

const citySchema = Joi.string().trim().label('City').messages({
  'string.empty': 'Please enter a city'
})

export const addressSchema = Joi.object<CustomerAddress>({
  email: emailSchema,
  first_name: firstNameSchema.required(),
  last_name: lastNameSchema.required(),
  // name: nameSchema,
  address: addressLineSchema.required(),
  city: citySchema.required(),
  // province: provinceSchema,
  country: countrySchema,
  phone: phoneSchema.required()
})

export async function validateAddressField(field: keyof CustomerAddress, value: any) {
  const schemas = {
    email: emailSchema,
    first_name: firstNameSchema.required(),
    last_name: lastNameSchema.required(),
    address: addressLineSchema.required(),
    city: citySchema.required(),
    country: countrySchema,
    phone: phoneSchema.required()
  }
  const schema = schemas[field]

  if (schema) {
    // eslint-disable-next-line no-useless-catch
    const result = await schema.validateAsync(value)
    return result
  } else {
    throw new Error('Address schema not found!')
  }
}