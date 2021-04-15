import { countries } from "./countries";

export const isSex = (sex) => sex === "M" || sex === "K";

export const isPesel = (pesel) => pesel.toString().length === 12;
export const isMartialStatus = (status) => {
  const statuses = ["ŻONATY", "MĘŻATKA", "KAWALER", "PANNA"];
  return statuses.includes(status);
};
export const isEducation = (edu) => {
  const educs = ["PODSTAWOWE", "ŚREDNIE", "WYŻSZE"];
  return educs.includes(edu);
};
export const isPostal = (code) => code.length === 6;
export const isVoideShip = (voide) => {
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
export const isCountry = (countryName) =>
  !!countries.find((country) => country.name_pl === countryName);
