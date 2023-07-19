var P = Function.prototype.toString, m = Object.create, E = Object.defineProperty, C = Object.getOwnPropertyDescriptor, w = Object.getOwnPropertyNames, k = Object.getOwnPropertySymbols, M = Object.getPrototypeOf, _ = Object.prototype, B = _.hasOwnProperty, R = _.propertyIsEnumerable, h = typeof k == "function", T = typeof WeakMap == "function", j = function() {
  if (T)
    return function() {
      return /* @__PURE__ */ new WeakMap();
    };
  var e = (
    /** @class */
    function() {
      function r() {
        this._keys = [], this._values = [];
      }
      return r.prototype.has = function(t) {
        return !!~this._keys.indexOf(t);
      }, r.prototype.get = function(t) {
        return this._values[this._keys.indexOf(t)];
      }, r.prototype.set = function(t, n) {
        this._keys.push(t), this._values.push(n);
      }, r;
    }()
  );
  return function() {
    return new e();
  };
}(), I = function(e, r) {
  var t = e.__proto__ || M(e);
  if (!t)
    return m(null);
  var n = t.constructor;
  if (n === r.Object)
    return t === r.Object.prototype ? {} : m(t);
  if (~P.call(n).indexOf("[native code]"))
    try {
      return new n();
    } catch {
    }
  return m(t);
}, z = function(e, r, t, n) {
  var o = I(e, r);
  n.set(e, o);
  for (var a in e)
    B.call(e, a) && (o[a] = t(e[a], n));
  if (h)
    for (var i = k(e), f = 0, l = i.length, s = void 0; f < l; ++f)
      s = i[f], R.call(e, s) && (o[s] = t(e[s], n));
  return o;
}, b = function(e, r, t, n) {
  var o = I(e, r);
  n.set(e, o);
  for (var a = h ? w(e).concat(k(e)) : w(e), i = 0, f = a.length, l = void 0, s = void 0; i < f; ++i)
    if (l = a[i], l !== "callee" && l !== "caller")
      if (s = C(e, l), s) {
        !s.get && !s.set && (s.value = t(e[l], n));
        try {
          E(o, l, s);
        } catch {
          o[l] = s.value;
        }
      } else
        o[l] = t(e[l], n);
  return o;
}, U = function(e) {
  var r = "";
  return e.global && (r += "g"), e.ignoreCase && (r += "i"), e.multiline && (r += "m"), e.unicode && (r += "u"), e.sticky && (r += "y"), r;
}, W = Array.isArray, F = Object.getPrototypeOf, K = function() {
  return typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : (console && console.error && console.error('Unable to locate global object, returning "this".'), this);
}();
function O(e, r) {
  var t = !!(r && r.isStrict), n = r && r.realm || K, o = t ? b : z, a = function(i, f) {
    if (!i || typeof i != "object")
      return i;
    if (f.has(i))
      return f.get(i);
    var l = i.__proto__ || F(i), s = l && l.constructor;
    if (!s || s === n.Object)
      return o(i, n, a, f);
    var u;
    if (W(i)) {
      if (t)
        return b(i, n, a, f);
      u = new s(), f.set(i, u);
      for (var c = 0, v = i.length; c < v; ++c)
        u[c] = a(i[c], f);
      return u;
    }
    if (i instanceof n.Date)
      return new s(i.getTime());
    if (i instanceof n.RegExp)
      return u = new s(i.source, i.flags || U(i)), u.lastIndex = i.lastIndex, u;
    if (n.Map && i instanceof n.Map)
      return u = new s(), f.set(i, u), i.forEach(function(d, L) {
        u.set(L, a(d, f));
      }), u;
    if (n.Set && i instanceof n.Set)
      return u = new s(), f.set(i, u), i.forEach(function(d) {
        u.add(a(d, f));
      }), u;
    if (n.Blob && i instanceof n.Blob)
      return i.slice(0, i.size, i.type);
    if (n.Buffer && n.Buffer.isBuffer(i))
      return u = n.Buffer.allocUnsafe ? n.Buffer.allocUnsafe(i.length) : new s(i.length), f.set(i, u), i.copy(u), u;
    if (n.ArrayBuffer) {
      if (n.ArrayBuffer.isView(i))
        return u = new s(i.buffer.slice(0)), f.set(i, u), u;
      if (i instanceof n.ArrayBuffer)
        return u = i.slice(0), f.set(i, u), u;
    }
    return (
      // promise-like
      typeof i.then == "function" || // errors
      i instanceof Error || // weakmaps
      n.WeakMap && i instanceof n.WeakMap || // weaksets
      n.WeakSet && i instanceof n.WeakSet ? i : o(i, n, a, f)
    );
  };
  return a(e, j());
}
O.default = O;
O.strict = function(r, t) {
  return O(r, {
    isStrict: !0,
    realm: t ? t.realm : void 0
  });
};
var N = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
  return typeof e;
} : function(e) {
  return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, D = function() {
  function e(r, t) {
    var n = [], o = !0, a = !1, i = void 0;
    try {
      for (var f = r[Symbol.iterator](), l; !(o = (l = f.next()).done) && (n.push(l.value), !(t && n.length === t)); o = !0)
        ;
    } catch (s) {
      a = !0, i = s;
    } finally {
      try {
        !o && f.return && f.return();
      } finally {
        if (a)
          throw i;
      }
    }
    return n;
  }
  return function(r, t) {
    if (Array.isArray(r))
      return r;
    if (Symbol.iterator in Object(r))
      return e(r, t);
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  };
}();
function g(e) {
  if (Array.isArray(e)) {
    for (var r = 0, t = Array(e.length); r < e.length; r++)
      t[r] = e[r];
    return t;
  } else
    return Array.from(e);
}
var p = {}, V = function(r) {
  return r && r.sys && r.sys.type === "Link";
}, Z = function(r) {
  return r && r.sys && r.sys.type === "ResourceLink";
}, G = function(r) {
  return r.space ? [r.type + "!" + r.id, r.space.sys.id + "!" + r.type + "!" + r.id] : [r.type + "!" + r.id];
}, A = function(r, t) {
  var n = t.entryId, o = t.linkType, a = t.spaceId;
  return a ? r.get(a + "!" + o + "!" + n) : r.get(o + "!" + n);
}, H = function(r, t) {
  var n = t.sys, o = n.type, a = n.linkType;
  if (o === "ResourceLink") {
    var i = t.sys.urn, f = /.*:spaces\/([A-Za-z0-9]*)\/entries\/([A-Za-z0-9]*)/;
    if (!f.test(i))
      return p;
    var l = i.match(f), s = D(l, 3);
    s[0];
    var u = s[1], c = s[2], v = a.split(":")[1];
    return A(r, { linkType: v, entryId: c, spaceId: u }) || p;
  }
  var d = t.sys.id;
  return A(r, { linkType: a, entryId: d }) || p;
}, Y = function(r) {
  if (Array.isArray(r))
    return r.filter(function(n) {
      return n !== p;
    });
  for (var t in r)
    r[t] === p && delete r[t];
  return r;
}, q = function e(r, t, n, o) {
  if (t(r))
    return n(r);
  if (r && (typeof r > "u" ? "undefined" : N(r)) === "object") {
    for (var a in r)
      r.hasOwnProperty(a) && (r[a] = e(r[a], t, n, o));
    o && (r = Y(r));
  }
  return r;
}, J = function(r, t, n) {
  var o = H(r, t);
  return o === p ? n ? o : t : o;
}, Q = function(r, t) {
  if (!Array.isArray(t))
    return r;
  var n = Object.keys(r).filter(function(o) {
    return t.indexOf(o) !== -1;
  });
  return n.reduce(function(o, a) {
    return o[a] = r[a], o;
  }, {});
}, X = function(r, t) {
  if (t = t || {}, !r.items)
    return [];
  var n = O(r), o = Object.keys(n.includes || {}).reduce(function(f, l) {
    return [].concat(g(f), g(r.includes[l]));
  }, []), a = [].concat(g(n.items), g(o)).filter(function(f) {
    return !!f.sys;
  }), i = new Map(a.reduce(function(f, l) {
    var s = G(l.sys).map(function(u) {
      return [u, l];
    });
    return f.push.apply(f, g(s)), f;
  }, []));
  return a.forEach(function(f) {
    var l = Q(f, t.itemEntryPoints);
    Object.assign(f, q(l, function(s) {
      return V(s) || Z(s);
    }, function(s) {
      return J(i, s, t.removeUnresolved);
    }, t.removeUnresolved));
  }), n.items;
};
const y = (e) => Array.isArray(e) ? e.map((r) => y(r)) : typeof e != "object" ? e : Object.keys(e.fields || {})?.length && Object.keys(e.sys || {})?.length ? S(e) : Object.keys(e).reduce((r, t) => Array.isArray(e[t]) ? (r[t] = e[t].map((n) => y(n)), r) : typeof e[t] == "object" ? (r[t] = { ...S(e[t]) }, r) : (r[t] = e[t], r), {}), S = (e) => {
  let r = {}, t = {}, n = {};
  return e.fields && (r = y(e.fields), r.file && (n = {
    ...n,
    ...y(r.file)
  })), e.sys && (t = y(e.sys)), e.file && (n = { ...n, ...y(e.file) }), {
    ...r,
    ...t,
    ...n,
    ...e
  };
}, $ = (e) => ({
  meta: {
    pagination: {
      ..."limit" in e && { limit: e.limit },
      ..."total" in e && { total: e.total },
      ..."skip" in e && { skip: e.skip }
    }
  },
  data: X(y(e))
});
export {
  $ as normalize
};
