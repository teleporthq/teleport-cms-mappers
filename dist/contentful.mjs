var L = Function.prototype.toString, m = Object.create, E = Object.defineProperty, M = Object.getOwnPropertyDescriptor, w = Object.getOwnPropertyNames, k = Object.getOwnPropertySymbols, C = Object.getPrototypeOf, S = Object.prototype, B = S.hasOwnProperty, R = S.propertyIsEnumerable, _ = typeof k == "function", T = typeof WeakMap == "function", j = function() {
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
}(), P = function(e, r) {
  var t = e.__proto__ || C(e);
  if (!t)
    return m(null);
  var n = t.constructor;
  if (n === r.Object)
    return t === r.Object.prototype ? {} : m(t);
  if (~L.call(n).indexOf("[native code]"))
    try {
      return new n();
    } catch {
    }
  return m(t);
}, z = function(e, r, t, n) {
  var f = P(e, r);
  n.set(e, f);
  for (var a in e)
    B.call(e, a) && (f[a] = t(e[a], n));
  if (_)
    for (var i = k(e), o = 0, l = i.length, s = void 0; o < l; ++o)
      s = i[o], R.call(e, s) && (f[s] = t(e[s], n));
  return f;
}, b = function(e, r, t, n) {
  var f = P(e, r);
  n.set(e, f);
  for (var a = _ ? w(e).concat(k(e)) : w(e), i = 0, o = a.length, l = void 0, s = void 0; i < o; ++i)
    if (l = a[i], l !== "callee" && l !== "caller")
      if (s = M(e, l), s) {
        !s.get && !s.set && (s.value = t(e[l], n));
        try {
          E(f, l, s);
        } catch {
          f[l] = s.value;
        }
      } else
        f[l] = t(e[l], n);
  return f;
}, U = function(e) {
  var r = "";
  return e.global && (r += "g"), e.ignoreCase && (r += "i"), e.multiline && (r += "m"), e.unicode && (r += "u"), e.sticky && (r += "y"), r;
}, W = Array.isArray, F = Object.getPrototypeOf, N = function() {
  return typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : (console && console.error && console.error('Unable to locate global object, returning "this".'), this);
}();
function O(e, r) {
  var t = !!(r && r.isStrict), n = r && r.realm || N, f = t ? b : z, a = function(i, o) {
    if (!i || typeof i != "object")
      return i;
    if (o.has(i))
      return o.get(i);
    var l = i.__proto__ || F(i), s = l && l.constructor;
    if (!s || s === n.Object)
      return f(i, n, a, o);
    var u;
    if (W(i)) {
      if (t)
        return b(i, n, a, o);
      u = new s(), o.set(i, u);
      for (var c = 0, v = i.length; c < v; ++c)
        u[c] = a(i[c], o);
      return u;
    }
    if (i instanceof n.Date)
      return new s(i.getTime());
    if (i instanceof n.RegExp)
      return u = new s(i.source, i.flags || U(i)), u.lastIndex = i.lastIndex, u;
    if (n.Map && i instanceof n.Map)
      return u = new s(), o.set(i, u), i.forEach(function(d, I) {
        u.set(I, a(d, o));
      }), u;
    if (n.Set && i instanceof n.Set)
      return u = new s(), o.set(i, u), i.forEach(function(d) {
        u.add(a(d, o));
      }), u;
    if (n.Blob && i instanceof n.Blob)
      return i.slice(0, i.size, i.type);
    if (n.Buffer && n.Buffer.isBuffer(i))
      return u = n.Buffer.allocUnsafe ? n.Buffer.allocUnsafe(i.length) : new s(i.length), o.set(i, u), i.copy(u), u;
    if (n.ArrayBuffer) {
      if (n.ArrayBuffer.isView(i))
        return u = new s(i.buffer.slice(0)), o.set(i, u), u;
      if (i instanceof n.ArrayBuffer)
        return u = i.slice(0), o.set(i, u), u;
    }
    return (
      // promise-like
      typeof i.then == "function" || // errors
      i instanceof Error || // weakmaps
      n.WeakMap && i instanceof n.WeakMap || // weaksets
      n.WeakSet && i instanceof n.WeakSet ? i : f(i, n, a, o)
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
var K = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
  return typeof e;
} : function(e) {
  return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, D = function() {
  function e(r, t) {
    var n = [], f = !0, a = !1, i = void 0;
    try {
      for (var o = r[Symbol.iterator](), l; !(f = (l = o.next()).done) && (n.push(l.value), !(t && n.length === t)); f = !0)
        ;
    } catch (s) {
      a = !0, i = s;
    } finally {
      try {
        !f && o.return && o.return();
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
  var n = t.entryId, f = t.linkType, a = t.spaceId;
  return a ? r.get(a + "!" + f + "!" + n) : r.get(f + "!" + n);
}, H = function(r, t) {
  var n = t.sys, f = n.type, a = n.linkType;
  if (f === "ResourceLink") {
    var i = t.sys.urn, o = /.*:spaces\/([A-Za-z0-9]*)\/entries\/([A-Za-z0-9]*)/;
    if (!o.test(i))
      return p;
    var l = i.match(o), s = D(l, 3);
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
}, q = function e(r, t, n, f) {
  if (t(r))
    return n(r);
  if (r && (typeof r > "u" ? "undefined" : K(r)) === "object") {
    for (var a in r)
      r.hasOwnProperty(a) && (r[a] = e(r[a], t, n, f));
    f && (r = Y(r));
  }
  return r;
}, J = function(r, t, n) {
  var f = H(r, t);
  return f === p ? n ? f : t : f;
}, Q = function(r, t) {
  if (!Array.isArray(t))
    return r;
  var n = Object.keys(r).filter(function(f) {
    return t.indexOf(f) !== -1;
  });
  return n.reduce(function(f, a) {
    return f[a] = r[a], f;
  }, {});
}, X = function(r, t) {
  if (t = t || {}, !r.items)
    return [];
  var n = O(r), f = Object.keys(n.includes || {}).reduce(function(o, l) {
    return [].concat(g(o), g(r.includes[l]));
  }, []), a = [].concat(g(n.items), g(f)).filter(function(o) {
    return !!o.sys;
  }), i = new Map(a.reduce(function(o, l) {
    var s = G(l.sys).map(function(u) {
      return [u, l];
    });
    return o.push.apply(o, g(s)), o;
  }, []));
  return a.forEach(function(o) {
    var l = Q(o, t.itemEntryPoints);
    Object.assign(o, q(l, function(s) {
      return V(s) || Z(s);
    }, function(s) {
      return J(i, s, t.removeUnresolved);
    }, t.removeUnresolved));
  }), n.items;
};
const y = (e) => Array.isArray(e) ? e.map((r) => y(r)) : typeof e != "object" ? e : Object.keys(e.fields || {})?.length && Object.keys(e.sys || {})?.length ? h(e) : Object.keys(e).reduce((r, t) => Array.isArray(e[t]) ? (r[t] = e[t].map((n) => y(n)), r) : typeof e[t] == "object" ? (r[t] = { ...h(e[t]) }, r) : (r[t] = e[t], r), {}), h = (e) => {
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
}, $ = (e) => {
  let r = 0, t = 1;
  e.total && e.limit && (r = Math.ceil(e.total / e.limit)), e.skip && e.limit && (t = e.skip / e.limit + 1);
  const n = t < r, f = t >= 2;
  return {
    meta: {
      pagination: {
        ..."limit" in e && { limit: e.limit },
        ..."total" in e && { total: e.total },
        ..."skip" in e && { skip: e.skip },
        hasNextPage: n,
        hasPrevPage: f,
        page: t,
        pages: r
      }
    },
    data: X(y(e))
  };
};
export {
  $ as normalize
};
