import axios from "axios";
import ParameterError from "../errors/spoonacularErrors";

const api_key = "b9e99ea2a6a642a58c1f5a7d59bb9fc0";

const TYPES = {
  string: "string",
  boolean: "boolean",
  number: "number",
};

const RANGES = {
  percent: [...Array(101).keys()],
  offset: [...Array(991).keys()],
  number: Array.from({ length: 100 }, (_, i) => i + 1),
  general: [...Array(999999).keys()],
};

const UNITS = ["", "piece", "slice", "fruit", "g", "oz", "cup", "serving"];

const INTOLERANCES = [
  "",
  "Dairy",
  "Egg",
  "Gluten",
  "Grain",
  "Peanut",
  "Seafood",
  "Sesame",
  "Shellfish",
  "Soy",
  "Sulfite",
  "Tree Nut",
  "Wheat",
];

const SORT_DIRECTION = ["", "asc", "dec"];

const SORT_OPTIONS = [
  "",
  "meta-score",
  "popularity",
  "healthiness",
  "price",
  "time",
  "random",
  "max-used-ingredients",
  "alcohol",
  "caffeine",
  "copper",
  "energy",
  "calories",
  "calcium",
  "carbohydrates",
  "carbs",
  "choline",
  "cholesterol",
  "total-fat",
  "fluoride",
  "trans-fat",
  "saturated-fat",
  "mono-unsaturated-fat",
  "poly-unsaturated-fat",
  "fiber",
  "folate",
  "folic-acid",
  "iodine",
  "iron",
  "magnesium",
  "manganese",
  "vitamin-b3",
  "niacin",
  "vitamin-b5",
  "pantothenic-acid",
  "phosphorus",
  "potassium",
  "protein",
  "vitamin-b2",
  "riboflavin",
  "selenium",
  "sodium",
  "vitamin-b1",
  "thiamin",
  "vitamin-a",
  "vitamin-b6",
  "vitamin-b12",
  "vitamin-c",
  "vitamin-d",
  "vitamin-e",
  "vitamin-k",
  "sugar",
  "zinc",
];

// Define default parameters for API endpoints
const ingredient_search_params = {
  addChildren: true,
  minProteinPercent: 0,
  maxProteinPercent: 100,
  minFatPercent: 0,
  maxFatPercent: 100,
  minCarbsPercent: 0,
  maxCarbsPercent: 100,
  metaInformation: false,
  intolerances: "",
  sort: "",
  sortDirection: "",
  offset: 0,
  number: 100,
};

const ingredient_information_params = {
  amount: 1,
  unit: "serving",
};

export { ingredient_search_params, ingredient_information_params };

export async function ingredientSearch(search_term, params) {
  // Check Params to make sure they are the correct types and are within the proper range if specified

  for (const [key, value] of Object.entries(params)) {
    switch (key) {
      case "addChildren":
        validate_params(key, value, TYPES.boolean, null, null);
        break;
      case "minProteinPercent":
        validate_params(key, value, TYPES.number, RANGES.percent, null);
        break;
      case "maxProteinPercent":
        validate_params(key, value, TYPES.number, RANGES.percent, null);
        break;
      case "minFatPercent":
        validate_params(key, value, TYPES.number, RANGES.percent, null);
        break;
      case "maxFatPercent":
        validate_params(key, value, TYPES.number, RANGES.percent, null);
        break;
      case "minCarbsPercent":
        validate_params(key, value, TYPES.number, RANGES.percent, null);
        break;
      case "maxCarbsPercent":
        validate_params(key, value, TYPES.number, RANGES.percent, null);
        break;
      case "metaInformation":
        validate_params(key, value, TYPES.boolean, null, null);
        break;
      case "intolerances":
        validate_params(key, value, TYPES.string, null, INTOLERANCES);
        break;
      case "sort":
        validate_params(key, value, TYPES.string, null, SORT_OPTIONS);
        break;
      case "sortDirection":
        validate_params(key, value, TYPES.string, null, SORT_DIRECTION);
        break;
      case "offset":
        validate_params(key, value, TYPES.number, RANGES.offset, null);
        break;
      case "number":
        validate_params(key, value, TYPES.number, RANGES.number, null);
        break;
      default:
        throw new ParameterError(
          `Parameter Key: ${key} is not a valid parameter.`
        );
    }
  }

  // Add API Key and search term to Params
  params.apiKey = api_key;
  params.query = search_term;
  // Make call to API searching for ingredients
  return await axios.get(
    "https://api.spoonacular.com/food/ingredients/search",
    {
      params: params,
    }
  );
}

export async function ingredientInformation(id, params) {
  // Check Params to make sure they are the correct types and are within the proper range if specified

  for (const [key, value] of Object.entries(params)) {
    switch (key) {
      case "amount":
        validate_params(key, value, TYPES.number, RANGES.general, null);
        break;
      case "unit":
        validate_params(key, value, TYPES.string, null, UNITS);
        break;
      default:
        throw new ParameterError(
          `Parameter Key: ${key} is not a valid parameter.`
        );
    }
  }

  // Add API Key and search term to Params
  params.apiKey = api_key;
  // Make call to API searching for ingredients
  return await axios.get(
    `https://api.spoonacular.com/food/ingredients/${id}/information`,
    {
      params: params,
    }
  );
}

// Function to help validate params
function validate_params(key, value, value_type, number_range, string_array) {
  switch (value_type) {
    case TYPES.boolean:
      if (typeof value !== TYPES.boolean) {
        throw new ParameterError(`Parameter Key: ${key} is not a boolean.`);
      }
      break;
    case TYPES.number:
      if (typeof value !== TYPES.number) {
        throw new ParameterError(`Parameter Key: ${key} is not a number.`);
      } else if (!number_range.includes(value)) {
        throw new ParameterError(
          `Parameter value: ${value} for key: ${key} is not in the range: 
          ${number_range[0]} - ${number_range[number_range.length - 1]}.`
        );
      }
      break;
    case TYPES.string:
      if (typeof value !== TYPES.string) {
        throw new ParameterError(`Parameter Key: ${key} is not a string.`);
      } else if (!string_array.includes(value)) {
        throw new ParameterError(
          `Parameter value: ${value} for key: ${key} is not in the string array.`
        );
      }
      break;
    default:
      throw new ParameterError(
        `Parameter value: ${value} is not a valid type.`
      );
  }
  return true;
}
