import { countries } from "./countries";
const isSex = function (sex) {
  if (sex === "M" || sex === "K") {
    return true;
  } else {
    return false;
  }
};
const isPesel = function (pesel) {
  if (pesel.toString().length() === 12) {
    return true;
  } else {
    return false;
  }
};
const isMartialStatus = function (status) {
  const statuses = ["ŻONATY", "MĘŻATKA", "KAWALER", "PANNA"];
  if (statuses.includes(status)) {
    return true;
  } else {
    return false;
  }
};
const isEducation = function (edu) {
  const educs = ["PODSTAWOWE", "ŚREDNIE", "WYŻSZE"];
  if (educs.includes(edu)) {
    return true;
  } else {
    return false;
  }
};
const isPostal = function (code) {
  if (code.length() === 6) {
    return true;
  } else {
    return false;
  }
};
const isVoideShip = function (voide) {
  const voides = [
    "dolnośląskie",
    "kujawsko-pomorskie",
    "lubelskie",
    "lubuskie",
    "łódzkie",
    "małopolskie",
    "mazowieckie",
    "opolskie",
    "podkarpackie",
    "podlaskie",
    "pomorskie",
    "śląskie",
    "świętokrzyskie",
    "warmińsko-mazurskie",
    "wielkopolskie",
    "zachodniopomorskie",
  ];
  if (voides.includes(voide)) {
    return true;
  } else {
    return false;
  }
};
const isCountry = function (country) {
  const countries_name = countries.map((c) => c.name);
  if (countries_name.includes(country)) {
    return true;
  } else {
    return false;
  }
};
export default {
  isVoideShip,
  isCountry,
  isPostal,
  isEducation,
  isMartialStatus,
  isPesel,
  isSex,
};
/*
const isEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
*/
