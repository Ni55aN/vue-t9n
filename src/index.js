import Translator from './translator';
import { deepComponentChild } from './utils';

export default {
    install(Vue, { directive = 't9n' } = {}) {
        const translator = new Translator();

        Vue.directive(directive, {
            inserted(el, binding, vnode) {
                translator.translateNode(vnode, Object.keys(binding.modifiers)[0])
            },
            componentUpdated(el, binding, vnode) {
                translator.translateNode(vnode, Object.keys(binding.modifiers)[0]);
            },
        });

        Vue.prototype.$t = text => translator.replaceSentences(text);
        Vue.prototype.$setTranslations = function(list) {
            translator.setTranslations(list);
            deepComponentChild(this, c => c.$forceUpdate())
        }
        Vue.prototype.$setLocale = function(locale) {
            translator.setLocale(locale);
            deepComponentChild(this, c => c.$forceUpdate())
        }
    }
}