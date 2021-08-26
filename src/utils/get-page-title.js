import defaultSettings from "@/js/settings";
import i18n from "@/js/lang";

const title = defaultSettings.title || "ExamReg";

export default function getPageTitle(key) {
  const hasKey = i18n.te(`route.${key}`);
  if (hasKey) {
    const pageName = i18n.t(`route.${key}`);
    return `${pageName} - ${title}`;
  }
  return `${title}`;
}
