import Joi from "joi";

const customerSchema = Joi.object({
  customer: Joi.object({
    autoProvCountStationary: Joi.string().valid("0", "1").required(),
    autoProvisionCount: Joi.string().valid("0").required(),
    autoProvisionCountMobile: Joi.string().valid("0", "2").required(),
    customerId: Joi.string()
      .regex(/^\[MAP\d{3}\]$/)
      .required(),
    favoritesEnabled: Joi.string().valid("Y", "N").required(),
    firstName: Joi.string().min(1).required(),
    hasVod: Joi.string().valid("Y", "N").required(),
    lastName: Joi.string().min(1).required(),
    localizationId: Joi.string().valid("71").required(),
    pin: Joi.string().min(4).max(4).required(),
    status: Joi.string().valid("A").required(),
    displayTimeout: Joi.string().valid("10").required(),
    multicastTunein: Joi.string().valid("Y", "N").required(),
    multicastenabled: Joi.string().valid("Y", "N").required(),
  }).required(),

  customerAccount: Joi.object({
    effectiveDt: Joi.string()
      .pattern(/^\d{2}\/\d{2}\/\d{4}$/)
      .required(),
    expireDt: Joi.string().allow(""),
    primaryAudioLanguage: Joi.string().valid("spa").required(),
    secondaryAudioLanguage: Joi.string().valid("eng").required(),
    primarySubtitleLanguage: Joi.string().valid("spa").required(),
    secondarySubtitleLanguage: Joi.string().valid("eng").required(),
    login: Joi.string()
      .regex(/^\[MAP\d{3}\]$/)
      .required(),
    password: Joi.string().min(6).required(),
  }).required(),

  customerInfo: Joi.object({
    address1: Joi.string().min(1).required(),
    address2: Joi.string().allow(""),
    address3: Joi.string().allow(""),
    city: Joi.string().min(1).required(),
    easLocationCode: Joi.string().allow(""),
    email: Joi.string().email().required(),
    homePhone: Joi.string().allow(""),
    mobilePhone: Joi.string().allow(""),
    note: Joi.string().allow(""),
    state: Joi.string().min(1).required(),
    workPhone: Joi.string().allow(""),
    zipcode: Joi.string()
      .regex(/^\d{8}$/)
      .required(),
  }).required(),

  subscribeService: Joi.array()
    .items(
      Joi.object({
        effectiveDt: Joi.string()
          .pattern(/^\d{2}\/\d{2}\/\d{4}$/)
          .required(),
        expireDt: Joi.string().allow(""),
        serviceMenu: Joi.object({
          serviceMenuId: Joi.string()
            .valid("6212", "6213", "6214", "6215")
            .required(),
        }).required(),
      })
    )
    .required(),
});

export const validateCustomerData = (customerData) => {
  const { error } = customerSchema.validate(customerData);
  if (error) {
    throw new Error(
      `Invalid data: ${error.details.map((x) => x.message).join(", ")}`
    );
  }
};
