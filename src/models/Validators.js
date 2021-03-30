import { countries } from "./countries";


const isSex = (sex) => sex === "M" || sex === "K";
const isPesel = (pesel) => pesel.toString().length() === 12;
const isMartialStatus = (status) => {
  const statuses = ["ŻONATY", "MĘŻATKA", "KAWALER", "PANNA"];
  return statuses.includes(status);
};
const isEducation = (edu) => {
  const educs = ["PODSTAWOWE", "ŚREDNIE", "WYŻSZE"];
  return educs.includes(edu);
};
const isPostal = (code) => code.length() === 6;
const isVoideShip = (voide) => {
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
  return voides.includes(voide);
};
const isCountry = (countryName) =>
  !!countries.find((country) => country.name === countryName);

export default {
  isVoideShip,
  isCountry,
  isPostal,
  isEducation,
  isMartialStatus,
  isPesel,
  isSex,
};