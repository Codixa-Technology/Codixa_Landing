import type { SiteContent } from "../types";
import { common, form, notFound } from "./common";
import { home } from "./home";
import { about, contact, privacy, work } from "./pages";
import { services, servicesIndex } from "./services";

export const en: SiteContent = {
  common,
  form,
  home,
  servicesIndex,
  services,
  about,
  contact,
  work,
  privacy,
  notFound,
};
