import vi from "vee-validate/dist/locale/vi";
import en from "vee-validate/dist/locale/en";

export default {
  en: {
    messages: en.messages,
    attributes: window.i18n.t("validation.attributes", "en")
  },
  vi: {
    messages: vi.messages,
    attributes: window.i18n.t("validation.attributes", "vi")
  }
};
