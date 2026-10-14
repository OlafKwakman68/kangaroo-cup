/* Tiny cloud helper for live scores (Firebase Realtime Database, REST API).
   Paste the database URL below once the Firebase project exists, e.g.
   "https://kangaroo-cup-default-rtdb.asia-southeast1.firebasedatabase.app".
   While it is empty the scorers run in local-only mode on each device. */
window.KC_DB_URL = "";
window.KC_ROOT = "kc2026";

window.KCCloud = (function () {
  function base() { return String(window.KC_DB_URL || "").replace(/\/+$/, ""); }
  function enabled() { return !!base(); }
  function url(path) { return base() + "/" + window.KC_ROOT + "/" + path + ".json"; }

  function req(method, path, body) {
    var opts = { method: method, cache: "no-store" };
    var timer = null;
    if (typeof AbortController !== "undefined") {
      var ctl = new AbortController();
      opts.signal = ctl.signal;
      timer = setTimeout(function () { ctl.abort(); }, 9000);
    }
    if (body !== undefined) {
      opts.body = JSON.stringify(body);
      opts.headers = { "Content-Type": "application/json" };
    }
    return fetch(url(path), opts).then(function (r) {
      if (timer) clearTimeout(timer);
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.json().catch(function () { return null; });
    }, function (err) {
      if (timer) clearTimeout(timer);
      throw err;
    });
  }

  return {
    enabled: enabled,
    get: function (path) { return req("GET", path); },
    put: function (path, value) {
      return (value === null || value === undefined) ? req("DELETE", path) : req("PUT", path, value);
    }
  };
})();
