!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},o={},t=e.parcelRequired7c6;null==t&&((t=function(e){if(e in n)return n[e].exports;if(e in o){var t=o[e];delete o[e];var r={id:e,exports:{}};return n[e]=r,t.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,n){o[e]=n},e.parcelRequired7c6=t);var r=t("h6c0i"),i={form:document.querySelector(".form")};function a(e,n){return new Promise((function(o,t){var r=Math.random()>.3;setTimeout((function(){r?o({position:e,delay:n}):t({position:e,delay:n})}),n)}))}function l(e){var n=e.position,o=e.delay;r.Notify.success("✅ Fulfilled promise ".concat(n," in ").concat(o,"ms"))}function c(e){var n=e.position,o=e.delay;r.Notify.failure("❌ Rejected promise ".concat(n," in ").concat(o,"ms"))}console.log(i),i.form.addEventListener("submit",(function(e){e.preventDefault();var n=e.currentTarget.elements,o=n.delay.value,t=n.step.value,r=n.amount.value;console.log(o,t,r),function(e,n,o){for(var t=1,r=e;t<=o;t+=1,r+=n)a(t,r).then(l).catch(c)}(parseInt(o),parseInt(t),parseInt(r))}))}();
//# sourceMappingURL=03-promises.8b665868.js.map
