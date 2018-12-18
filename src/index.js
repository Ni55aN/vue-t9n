import Translator from './translator';
import { deepComponentChild } from './utils';

export default {
    install(Vue, { directive = 't9n' } = {}) {
        const translator = new Translator();

        Vue.directive(directive, {
            inserted(el, binding, vnode) {
                translator.translateNode(vnode, binding.value, binding.modifiers.deep)
            },
            componentUpdated(el, binding, vnode) {
                Vue.nextTick(() => { // wait for componentInstance initialization 
                    translator.translateNode(vnode, binding.value, binding.modifiers.deep);
                });
            },
        });

        Vue.prototype.$t = text => translator.replaceSentences(text);
        Vue.prototype.$setTranslations = function(list) {
            translator.setTranslations(list);
            deepComponentChild(this.$root, c => c.$forceUpdate())
        }
        Vue.prototype.$setLocale = function(locale) {
            translator.setLocale(locale);
            deepComponentChild(this.$root, c => c.$forceUpdate())
        }
    }
}