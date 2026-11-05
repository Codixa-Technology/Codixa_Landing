/**
 * Inline script that runs before first paint (kept tiny and dependency-free):
 *  - adds html.js so scroll-reveal styles apply only when JavaScript runs;
 *  - marks repeat visits in the same tab session (html.intro-done) so the
 *    brand reveal plays once per session;
 *  - removes html.js again if the reveal observer has not booted within 4s,
 *    so content can never stay hidden.
 */
export const headScript = `(function(){var d=document.documentElement;d.classList.add('js');try{if(sessionStorage.getItem('cx-intro')){d.classList.add('intro-done')}else{sessionStorage.setItem('cx-intro','1')}}catch(e){d.classList.add('intro-done')}setTimeout(function(){if(!window.__cxReveal){d.classList.remove('js')}},4000)})();`;
