// import { edspLogLang } from "../../src/index";
import elementEnLocale from 'element-ui/lib/locale/lang/en'; // element-ui lang
import elementThLocale from 'element-ui/lib/locale/lang/th';
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'; // element-ui lang
import public_zh from './zh/public';
import public_en from './en/public';
import login_en from './en/login';
import login_zh from './zh/login';
import packages_zh from './zh/packages';
import packages_en from './en/packages';
import Vue from 'vue';
import VueI18n, { LocaleMessages } from 'vue-i18n';

const elementLang = {} as LocaleMessages;
const localeLanguage = {} as LocaleMessages;

elementLang.zh = elementZhLocale;
elementLang.en = elementEnLocale;
elementLang.th = elementThLocale;
localeLanguage["zh"] = { ...elementZhLocale };
localeLanguage["en"] = { ...elementEnLocale };
// localeLanguage["zh"] = { ...elementZhLocale, ...edspLogLang["zh-CN"] };
// localeLanguage["en"] = { ...elementEnLocale, ...edspLogLang.en };
localeLanguage['th'] = { ...elementThLocale };
localeLanguage.zh = Object.assign(localeLanguage.zh, public_zh, login_en, packages_en);
localeLanguage.en = Object.assign(localeLanguage.en, public_en, login_zh, packages_zh);

Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: localStorage.getItem('LANGUAGE_STYLE') || 'zh',
  messages: localeLanguage, // set locale messages
  silentTranslationWarn: false,
});

export default i18n;
