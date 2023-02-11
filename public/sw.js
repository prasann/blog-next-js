if (!self.define) {
  let e,
    s = {};
  const a = (a, i) => (
    (a = new URL(a + ".js", i).href),
    s[a] ||
      new Promise((s) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = a), (e.onload = s), document.head.appendChild(e);
        } else (e = a), importScripts(a), s();
      }).then(() => {
        let e = s[a];
        if (!e) throw new Error(`Module ${a} didn’t register its module`);
        return e;
      })
  );
  self.define = (i, n) => {
    const c =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (s[c]) return;
    let t = {};
    const r = (e) => a(e, c),
      o = { module: { uri: c }, exports: t, require: r };
    s[c] = Promise.all(i.map((e) => o[e] || r(e))).then((e) => (n(...e), t));
  };
}
define(["./workbox-588899ac"], function (e) {
  "use strict";
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: "/_next/static/chunks/203.6d05b8f967fb99ab.js",
          revision: "6d05b8f967fb99ab",
        },
        {
          url: "/_next/static/chunks/2cca2479-badc1d6ac18b8cfd.js",
          revision: "badc1d6ac18b8cfd",
        },
        {
          url: "/_next/static/chunks/802-9b22bce38ea4822e.js",
          revision: "9b22bce38ea4822e",
        },
        {
          url: "/_next/static/chunks/894.660dfc1aa8ffe475.js",
          revision: "660dfc1aa8ffe475",
        },
        {
          url: "/_next/static/chunks/framework-73b8966a3c579ab0.js",
          revision: "73b8966a3c579ab0",
        },
        {
          url: "/_next/static/chunks/main-e5a89c70a15479ad.js",
          revision: "e5a89c70a15479ad",
        },
        {
          url: "/_next/static/chunks/pages/_app-efddd3fd4aafd8fb.js",
          revision: "efddd3fd4aafd8fb",
        },
        {
          url: "/_next/static/chunks/pages/_error-9c7a64dc41a16fc5.js",
          revision: "9c7a64dc41a16fc5",
        },
        {
          url: "/_next/static/chunks/pages/blog-a53b3ac5378aad4c.js",
          revision: "a53b3ac5378aad4c",
        },
        {
          url: "/_next/static/chunks/pages/index-d172cc97e168bdbb.js",
          revision: "d172cc97e168bdbb",
        },
        {
          url: "/_next/static/chunks/pages/posts/%5Bslug%5D-44b1f4c399c210f2.js",
          revision: "44b1f4c399c210f2",
        },
        {
          url: "/_next/static/chunks/pages/talks-6cdd4d368f77d2fb.js",
          revision: "6cdd4d368f77d2fb",
        },
        {
          url: "/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",
          revision: "837c0df77fd5009c9e46d446188ecfd0",
        },
        {
          url: "/_next/static/chunks/webpack-8c752be815820985.js",
          revision: "8c752be815820985",
        },
        {
          url: "/_next/static/css/1c224f515a6cacb2.css",
          revision: "1c224f515a6cacb2",
        },
        {
          url: "/_next/static/media/blog.863ff3aa.jpg",
          revision: "ac35043d4f98ae4bfef7bfe6bb2cf931",
        },
        {
          url: "/_next/static/media/logo.c1944eac.png",
          revision: "d1b7929e34db914a69d6d46efb248865",
        },
        {
          url: "/_next/static/media/profile.a27ccddc.jpg",
          revision: "9e01551752d5c84c8168e01134d938f4",
        },
        {
          url: "/_next/static/media/profile.b09f475a.jpeg",
          revision: "b8ba99d8edf30686a10ad290f7914aee",
        },
        {
          url: "/_next/static/media/speak.b59d5757.jpg",
          revision: "44142cf86e891dcae7335b9b6d78fba5",
        },
        {
          url: "/_next/static/xYawPdtGCy0e3EY5L3JYk/_buildManifest.js",
          revision: "8b991a82a01cf508ac20e653c266dfd9",
        },
        {
          url: "/_next/static/xYawPdtGCy0e3EY5L3JYk/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933",
        },
        {
          url: "/assets/favicons/android-chrome-192x192.png",
          revision: "637798b271f070228a6ba5fc26c0668a",
        },
        {
          url: "/assets/favicons/android-chrome-512x512.png",
          revision: "03b88507e6b5afbc06e092527c9daae5",
        },
        {
          url: "/assets/favicons/apple-icon-180x180.png",
          revision: "625d272083ec104252fcea67e44adbe9",
        },
        {
          url: "/assets/favicons/favicon-32x32.png",
          revision: "3ad703b90b4ea87c40a7cf5379b4fdef",
        },
        {
          url: "/assets/favicons/icon-48x48.png",
          revision: "f8d47493ce9a0f9bf6285c7b20593476",
        },
        {
          url: "/assets/favicons/icon-96x96.png",
          revision: "ab5cf241cb0bce0f4108a242dd4d8cee",
        },
        {
          url: "/assets/logo.png",
          revision: "d1b7929e34db914a69d6d46efb248865",
        },
        {
          url: "/assets/posts/images/android-edittext.png",
          revision: "6eaf349184e108a639df8851939c4010",
        },
        {
          url: "/assets/posts/images/saga-patterns/booking-flow.png",
          revision: "12287a69e505740c4a7c310332083482",
        },
        {
          url: "/assets/posts/images/saga-patterns/cancel-flow.png",
          revision: "9ebbd69bae889a1e1fa23c72d6d15912",
        },
        {
          url: "/assets/posts/images/saga-patterns/choreography.png",
          revision: "af6100aef23ab7ef2cb971fcc148d5ae",
        },
        {
          url: "/assets/posts/images/saga-patterns/legend.png",
          revision: "09a5e69eb39e7e5dae873fedd4c93d09",
        },
        {
          url: "/assets/posts/images/saga-patterns/orchestration.png",
          revision: "d523bc81bb86c917db33202ba79ecb46",
        },
        {
          url: "/assets/posts/images/scaling-microfrontends/Twitter_post_-_1.png",
          revision: "dcea9a214f90a5d581ffd31f378f9d32",
        },
        {
          url: "/assets/posts/images/scaling-microfrontends/Twitter_post_-_2.png",
          revision: "04d6c359f40f0bcce3609c6c14ac83a6",
        },
        {
          url: "/assets/posts/images/scaling-microfrontends/Twitter_post_-_3.png",
          revision: "44df98385af2eb394f375017a0f1daae",
        },
        {
          url: "/assets/posts/images/scaling-microfrontends/Twitter_post_-_4.png",
          revision: "4b9e25a824b3ffff673f86f228edce14",
        },
        {
          url: "/assets/posts/images/scaling-microfrontends/Twitter_post_-_5.png",
          revision: "12309f98c2127d257e245550ae52f0cc",
        },
        {
          url: "/assets/posts/images/scaling-microfrontends/Twitter_post_-_6.png",
          revision: "17c6802b76dc82207a2cfc3ef9315cc2",
        },
        {
          url: "/assets/posts/images/scaling-microfrontends/Twitter_post_-_7.png",
          revision: "5e0d3f19f6dba5d943a8d61da9c9b4cb",
        },
        {
          url: "/assets/posts/images/scaling-microfrontends/build-time-composition.png",
          revision: "f0fb4d7cc463922016f9fde7b1fd9e2a",
        },
        {
          url: "/assets/posts/images/scaling-microfrontends/functional_tests_6cdcf7c24a.png",
          revision: "dab360aa311fc2a773dc2bb2ef1973c4",
        },
        {
          url: "/assets/posts/images/scaling-microfrontends/run_time_frontend_composition_f5076854e1.png",
          revision: "5b84655c8d4cb2a3556246094e69d7f8",
        },
        {
          url: "/assets/posts/images/scaling-microfrontends/sample_of_frames_contract_025a143c30.png",
          revision: "b11b57517a25633c91a872e0891a38d3",
        },
        {
          url: "/assets/posts/images/scaling-microfrontends/state_management_tools_604f976fa9.png",
          revision: "7862b94899384ad8287a5e271739d360",
        },
        {
          url: "/assets/posts/images/scaling-microfrontends/testing_strategy_1776956c37.png",
          revision: "344056a225a00025dc16a9442ae63499",
        },
        {
          url: "/assets/posts/images/scaling-microfrontends/window_events_46783b22ad.png",
          revision: "0c13d93eb503d7bbe1a37e2138088e47",
        },
        {
          url: "/assets/posts/images/soap-primer.png",
          revision: "7d9ce5ab887476bc5832d0fe1d924a35",
        },
        {
          url: "/assets/posts/images/strangler-with-cdc/img-initial-setup.png",
          revision: "d1cda340e2b7f967c9cf411736c81430",
        },
        {
          url: "/assets/posts/images/strangler-with-cdc/img-stock-service.png",
          revision: "a43c1fa13590fb63f65c15c348d87dbe",
        },
        {
          url: "/assets/profile.jpg",
          revision: "9e01551752d5c84c8168e01134d938f4",
        },
        {
          url: "/feeds/atom.xml",
          revision: "cf3b3389cea0bfbccc343b2889af1d1f",
        },
        {
          url: "/feeds/feed.json",
          revision: "b74579872675c5a945146214e882e356",
        },
        {
          url: "/feeds/feed.xml",
          revision: "831f67f06ec8c258287170a90d6029dd",
        },
        { url: "/manifest.json", revision: "1bfb73d8141af060b4194d81e7194f4d" },
        { url: "/robots.txt", revision: "50483c0bacdee5c60b1c677f3f811858" },
        { url: "/sitemap-0.xml", revision: "464f9a1c46fa3fc6c4bdd96174bdbec3" },
        { url: "/sitemap.xml", revision: "21e8d1abfa03fd662ebd04c557e7c357" },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: a,
              state: i,
            }) =>
              s && "opaqueredirect" === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: "OK",
                    headers: s.headers,
                  })
                : s,
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: "static-audio-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: "static-video-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith("/api/auth/") && !!s.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "others",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      "GET"
    );
});
