if(!self.define){const s=s=>{"require"!==s&&(s+=".js");let e=Promise.resolve();return n[s]||(e=new Promise((async e=>{if("document"in self){const n=document.createElement("script");n.src=s,document.head.appendChild(n),n.onload=e}else importScripts(s),e()}))),e.then((()=>{if(!n[s])throw new Error(`Module ${s} didn’t register its module`);return n[s]}))},e=(e,n)=>{Promise.all(e.map(s)).then((s=>n(1===s.length?s[0]:s)))},n={require:Promise.resolve(e)};self.define=(e,i,c)=>{n[e]||(n[e]=Promise.resolve().then((()=>{let n={};const t={uri:location.origin+e.slice(1)};return Promise.all(i.map((e=>{switch(e){case"exports":return n;case"module":return t;default:return s(e)}}))).then((s=>{const e=c(...s);return n.default||(n.default=e),n}))})))}}define("./sw.js",["./workbox-56079563"],(function(s){"use strict";importScripts(),self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"/_next/static/PTT__fnQYi22AUSf1sxD8/_buildManifest.js",revision:"PTT__fnQYi22AUSf1sxD8"},{url:"/_next/static/PTT__fnQYi22AUSf1sxD8/_ssgManifest.js",revision:"PTT__fnQYi22AUSf1sxD8"},{url:"/_next/static/chunks/10c193e3626fbffb8dc3793a7e14df4c711d7b2c.8bad8f6ec95d985da302.js",revision:"PTT__fnQYi22AUSf1sxD8"},{url:"/_next/static/chunks/13e9eddab76fec1a6c1556af13cbe21bebcf8d0d.feee94cb6a8d88f39abe.js",revision:"PTT__fnQYi22AUSf1sxD8"},{url:"/_next/static/chunks/7dbdb3149c9f2d78372829c21233acfd4748d6ec.9464f6905fe276451d91.js",revision:"PTT__fnQYi22AUSf1sxD8"},{url:"/_next/static/chunks/820b559020c4d754106c0081db392f028ddaf367.d3c5e13d76c85672f53d.js",revision:"PTT__fnQYi22AUSf1sxD8"},{url:"/_next/static/chunks/851319c1e2019a7b6a99f098a1472f6ccd92b36f.5194491f055934f19b08.js",revision:"PTT__fnQYi22AUSf1sxD8"},{url:"/_next/static/chunks/8a887905882e5bc8fbd1ff26491a53e644115a4f.62378abd3f5b771e1c3e.js",revision:"PTT__fnQYi22AUSf1sxD8"},{url:"/_next/static/chunks/commons.52c6874f20394c777a67.js",revision:"PTT__fnQYi22AUSf1sxD8"},{url:"/_next/static/chunks/d0cf291af95ab22a564ceda338a7829dbcded0b6.b740dfccdee1f4efed5c.js",revision:"PTT__fnQYi22AUSf1sxD8"},{url:"/_next/static/chunks/e8de8f98e659bcc25d0c295c519d97dc6a35599b.8cff159ff8b473ae36d4.js",revision:"PTT__fnQYi22AUSf1sxD8"},{url:"/_next/static/chunks/framework.6fff953eb0f638171baa.js",revision:"PTT__fnQYi22AUSf1sxD8"},{url:"/_next/static/chunks/main-b1b922a1328c6f026218.js",revision:"PTT__fnQYi22AUSf1sxD8"},{url:"/_next/static/chunks/pages/404-4f32eb2abe9e814ec472.js",revision:"PTT__fnQYi22AUSf1sxD8"},{url:"/_next/static/chunks/pages/500-ec71938ef586d78a6448.js",revision:"PTT__fnQYi22AUSf1sxD8"},{url:"/_next/static/chunks/pages/_app-df147910b3c7a347a6c2.js",revision:"PTT__fnQYi22AUSf1sxD8"},{url:"/_next/static/chunks/pages/_error-051f54396651fad96a84.js",revision:"PTT__fnQYi22AUSf1sxD8"},{url:"/_next/static/chunks/pages/create-project-3494288f5e3712170b5a.js",revision:"PTT__fnQYi22AUSf1sxD8"},{url:"/_next/static/chunks/pages/index-f4c5aa3868c66c38cf75.js",revision:"PTT__fnQYi22AUSf1sxD8"},{url:"/_next/static/chunks/pages/login-0adc9b1d22cfc7ee7ad2.js",revision:"PTT__fnQYi22AUSf1sxD8"},{url:"/_next/static/chunks/pages/notifications-a1a9ccd84c65e7cc4ae5.js",revision:"PTT__fnQYi22AUSf1sxD8"},{url:"/_next/static/chunks/pages/profile-68d5a4d988f72e512c70.js",revision:"PTT__fnQYi22AUSf1sxD8"},{url:"/_next/static/chunks/pages/project/%5Bid%5D-4ad548288d9088d09810.js",revision:"PTT__fnQYi22AUSf1sxD8"},{url:"/_next/static/chunks/pages/projects-ca10863e13f082f0d9c0.js",revision:"PTT__fnQYi22AUSf1sxD8"},{url:"/_next/static/chunks/pages/projects/%5Bcategory%5D-8527f0bf4002705cc48a.js",revision:"PTT__fnQYi22AUSf1sxD8"},{url:"/_next/static/chunks/pages/settings-d75125ab832fadaa527e.js",revision:"PTT__fnQYi22AUSf1sxD8"},{url:"/_next/static/chunks/pages/signup-784738e7b93c6bfc2574.js",revision:"PTT__fnQYi22AUSf1sxD8"},{url:"/_next/static/chunks/pages/user/%5Bslug%5D-413652c45738759a2ded.js",revision:"PTT__fnQYi22AUSf1sxD8"},{url:"/_next/static/chunks/pages/users-0cab2442777ba214cb8d.js",revision:"PTT__fnQYi22AUSf1sxD8"},{url:"/_next/static/chunks/polyfills-265a51dacb3992e55d6f.js",revision:"PTT__fnQYi22AUSf1sxD8"},{url:"/_next/static/chunks/webpack-50bee04d1dc61f8adf5b.js",revision:"PTT__fnQYi22AUSf1sxD8"},{url:"/_next/static/css/108cd9feac3b91004493.css",revision:"PTT__fnQYi22AUSf1sxD8"},{url:"/_next/static/css/72b35fc9e0c06121b84a.css",revision:"PTT__fnQYi22AUSf1sxD8"},{url:"/_next/static/css/f8dad1957c2f62dc8d76.css",revision:"PTT__fnQYi22AUSf1sxD8"},{url:"/favicon.ico",revision:"7f101f768c05c8734350a201d8bd6e93"},{url:"/lp_intro.mp4",revision:"271c8845568260c545afc93f6c4734a8"},{url:"/manifest.json",revision:"cdc9b48c4f1bf05044a909aa1eb83a15"}],{ignoreURLParametersMatching:[]}),s.cleanupOutdatedCaches(),s.registerRoute("/",new s.NetworkFirst({cacheName:"start-url",plugins:[{requestWillFetch:async({request:s})=>(Request(),console.log("production"),s)}]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new s.CacheFirst({cacheName:"google-fonts",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),s.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new s.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),s.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new s.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),s.registerRoute(/\.(?:mp3|mp4)$/i,new s.StaleWhileRevalidate({cacheName:"static-media-assets",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),s.registerRoute(/\.(?:js)$/i,new s.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),s.registerRoute(/\.(?:css|less)$/i,new s.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),s.registerRoute(/\.(?:json|xml|csv)$/i,new s.NetworkFirst({cacheName:"static-data-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),s.registerRoute(/\/api\/.*$/i,new s.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),s.registerRoute(/.*/i,new s.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
