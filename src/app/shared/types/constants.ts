export const TOKEN_KEY = 'jwt_pls';
export const REFRESH_TOKEN = 'pls_refreashtoken';
export const REMEMBER_ME = 'remember_me';

export const THEME_PREFIX = 'pls-theme';

/* STANDARD ERROR MESSAGES */
export const SERVER_ERROR_MSG = `Server Error! Please contact administrator.`;
export const VIEW_MODE_SAVE_FAIL_MSG = `Cannot save in view mode.`;
export const INVALID_EMAIL_MSG = `Please provide a valid email address.`;
export const BAD_CREDENTIAL_MSG = `Invalid email or password.`;
export const RESOLVE_ALL_ERR_MSG = `Please resolve all errors before saving.`;
export const NO_CHANGES_MADE_MSG = `No changes made to save.`;
export const LOAD_PRICING_REV = `revenue_false`;
export const ADJ_PRICING_REV = `revenue_true`;
export const LOAD_PRICING_COST = `cost_false`;
export const ADJ_PRICING_COST = `cost_true`;

// Trip Constants
export const ORIGIN = 1;
export const DESTINATION = 2;

// pricing constants

export const PricingConstants = {

    PRICING_ITEM_TYPE_ALL_IN: 1,
    PRICING_ITEM_TYPE_FUEL: 2,
    PRICING_ITEM_TYPE_LINE_HAUL: 3,
    PRICING_ITEM_TYPE_ACCEESSORIAL: 4,

    PRICING_CALC_TYPE_FLAT_RATE: 1,
    PRICING_CALC_TYPE_PER_MILE: 2,
    PRICING_CALC_TYPE_PERCENTAGE_OF_LH: 3,
    PRICING_CALC_TYPE_CWT: 4,

    PRICING_TYPE_REVENUE: 1,
    PRICING_TYPE_COST: 2

};
