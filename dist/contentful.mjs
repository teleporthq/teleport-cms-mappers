var P = Function.prototype.toString, m = Object.create, E = Object.defineProperty, M = Object.getOwnPropertyDescriptor, w = Object.getOwnPropertyNames, k = Object.getOwnPropertySymbols, C = Object.getPrototypeOf, S = Object.prototype, B = S.hasOwnProperty, R = S.propertyIsEnumerable, _ = typeof k == "function", T = typeof WeakMap == "function", j = function() {
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
      return r.prototype.has = function(n) {
        return !!~this._keys.indexOf(n);
      }, r.prototype.get = function(n) {
        return this._values[this._keys.indexOf(n)];
      }, r.prototype.set = function(n, t) {
        this._keys.push(n), this._values.push(t);
      }, r;
    }()
  );
  return function() {
    return new e();
  };
}(), I = function(e, r) {
  var n = e.__proto__ || C(e);
  if (!n)
    return m(null);
  var t = n.constructor;
  if (t === r.Object)
    return n === r.Object.prototype ? {} : m(n);
  if (~P.call(t).indexOf("[native code]"))
    try {
      return new t();
    } catch {
    }
  return m(n);
}, z = function(e, r, n, t) {
  var f = I(e, r);
  t.set(e, f);
  for (var s in e)
    B.call(e, s) && (f[s] = n(e[s], t));
  if (_)
    for (var i = k(e), o = 0, l = i.length, a = void 0; o < l; ++o)
      a = i[o], R.call(e, a) && (f[a] = n(e[a], t));
  return f;
}, b = function(e, r, n, t) {
  var f = I(e, r);
  t.set(e, f);
  for (var s = _ ? w(e).concat(k(e)) : w(e), i = 0, o = s.length, l = void 0, a = void 0; i < o; ++i)
    if (l = s[i], l !== "callee" && l !== "caller")
      if (a = M(e, l), a) {
        !a.get && !a.set && (a.value = n(e[l], t));
        try {
          E(f, l, a);
        } catch {
          f[l] = a.value;
        }
      } else
        f[l] = n(e[l], t);
  return f;
}, U = function(e) {
  var r = "";
  return e.global && (r += "g"), e.ignoreCase && (r += "i"), e.multiline && (r += "m"), e.unicode && (r += "u"), e.sticky && (r += "y"), r;
}, W = Array.isArray, F = Object.getPrototypeOf, K = function() {
  return typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : (console && console.error && console.error('Unable to locate global object, returning "this".'), this);
}();
function O(e, r) {
  var n = !!(r && r.isStrict), t = r && r.realm || K, f = n ? b : z, s = function(i, o) {
    if (!i || typeof i != "object")
      return i;
    if (o.has(i))
      return o.get(i);
    var l = i.__proto__ || F(i), a = l && l.constructor;
    if (!a || a === t.Object)
      return f(i, t, s, o);
    var u;
    if (W(i)) {
      if (n)
        return b(i, t, s, o);
      u = new a(), o.set(i, u);
      for (var c = 0, v = i.length; c < v; ++c)
        u[c] = s(i[c], o);
      return u;
    }
    if (i instanceof t.Date)
      return new a(i.getTime());
    if (i instanceof t.RegExp)
      return u = new a(i.source, i.flags || U(i)), u.lastIndex = i.lastIndex, u;
    if (t.Map && i instanceof t.Map)
      return u = new a(), o.set(i, u), i.forEach(function(d, L) {
        u.set(L, s(d, o));
      }), u;
    if (t.Set && i instanceof t.Set)
      return u = new a(), o.set(i, u), i.forEach(function(d) {
        u.add(s(d, o));
      }), u;
    if (t.Blob && i instanceof t.Blob)
      return i.slice(0, i.size, i.type);
    if (t.Buffer && t.Buffer.isBuffer(i))
      return u = t.Buffer.allocUnsafe ? t.Buffer.allocUnsafe(i.length) : new a(i.length), o.set(i, u), i.copy(u), u;
    if (t.ArrayBuffer) {
      if (t.ArrayBuffer.isView(i))
        return u = new a(i.buffer.slice(0)), o.set(i, u), u;
      if (i instanceof t.ArrayBuffer)
        return u = i.slice(0), o.set(i, u), u;
    }
    return (
      // promise-like
      typeof i.then == "function" || // errors
      i instanceof Error || // weakmaps
      t.WeakMap && i instanceof t.WeakMap || // weaksets
      t.WeakSet && i instanceof t.WeakSet ? i : f(i, t, s, o)
    );
  };
  return s(e, j());
}
O.default = O;
O.strict = function(r, n) {
  return O(r, {
    isStrict: !0,
    realm: n ? n.realm : void 0
  });
};
var N = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
  return typeof e;
} : function(e) {
  return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, D = function() {
  function e(r, n) {
    var t = [], f = !0, s = !1, i = void 0;
    try {
      for (var o = r[Symbol.iterator](), l; !(f = (l = o.next()).done) && (t.push(l.value), !(n && t.length === n)); f = !0)
        ;
    } catch (a) {
      s = !0, i = a;
    } finally {
      try {
        !f && o.return && o.return();
      } finally {
        if (s)
          throw i;
      }
    }
    return t;
  }
  return function(r, n) {
    if (Array.isArray(r))
      return r;
    if (Symbol.iterator in Object(r))
      return e(r, n);
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  };
}();
function g(e) {
  if (Array.isArray(e)) {
    for (var r = 0, n = Array(e.length); r < e.length; r++)
      n[r] = e[r];
    return n;
  } else
    return Array.from(e);
}
var p = {}, V = function(r) {
  return r && r.sys && r.sys.type === "Link";
}, Z = function(r) {
  return r && r.sys && r.sys.type === "ResourceLink";
}, G = function(r) {
  return r.space ? [r.type + "!" + r.id, r.space.sys.id + "!" + r.type + "!" + r.id] : [r.type + "!" + r.id];
}, A = function(r, n) {
  var t = n.entryId, f = n.linkType, s = n.spaceId;
  return s ? r.get(s + "!" + f + "!" + t) : r.get(f + "!" + t);
}, H = function(r, n) {
  var t = n.sys, f = t.type, s = t.linkType;
  if (f === "ResourceLink") {
    var i = n.sys.urn, o = /.*:spaces\/([A-Za-z0-9]*)\/entries\/([A-Za-z0-9]*)/;
    if (!o.test(i))
      return p;
    var l = i.match(o), a = D(l, 3);
    a[0];
    var u = a[1], c = a[2], v = s.split(":")[1];
    return A(r, { linkType: v, entryId: c, spaceId: u }) || p;
  }
  var d = n.sys.id;
  return A(r, { linkType: s, entryId: d }) || p;
}, Y = function(r) {
  if (Array.isArray(r))
    return r.filter(function(t) {
      return t !== p;
    });
  for (var n in r)
    r[n] === p && delete r[n];
  return r;
}, q = function e(r, n, t, f) {
  if (n(r))
    return t(r);
  if (r && (typeof r > "u" ? "undefined" : N(r)) === "object") {
    for (var s in r)
      r.hasOwnProperty(s) && (r[s] = e(r[s], n, t, f));
    f && (r = Y(r));
  }
  return r;
}, J = function(r, n, t) {
  var f = H(r, n);
  return f === p ? t ? f : n : f;
}, Q = function(r, n) {
  if (!Array.isArray(n))
    return r;
  var t = Object.keys(r).filter(function(f) {
    return n.indexOf(f) !== -1;
  });
  return t.reduce(function(f, s) {
    return f[s] = r[s], f;
  }, {});
}, X = function(r, n) {
  if (n = n || {}, !r.items)
    return [];
  var t = O(r), f = Object.keys(t.includes || {}).reduce(function(o, l) {
    return [].concat(g(o), g(r.includes[l]));
  }, []), s = [].concat(g(t.items), g(f)).filter(function(o) {
    return !!o.sys;
  }), i = new Map(s.reduce(function(o, l) {
    var a = G(l.sys).map(function(u) {
      return [u, l];
    });
    return o.push.apply(o, g(a)), o;
  }, []));
  return s.forEach(function(o) {
    var l = Q(o, n.itemEntryPoints);
    Object.assign(o, q(l, function(a) {
      return V(a) || Z(a);
    }, function(a) {
      return J(i, a, n.removeUnresolved);
    }, n.removeUnresolved));
  }), t.items;
};
const y = (e) => {
  var r, n;
  return Array.isArray(e) ? e.map((t) => y(t)) : typeof e != "object" ? e : (r = Object.keys(e.fields || {})) != null && r.length && ((n = Object.keys(e.sys || {})) != null && n.length) ? h(e) : Object.keys(e).reduce((t, f) => Array.isArray(e[f]) ? (t[f] = e[f].map((s) => y(s)), t) : typeof e[f] == "object" ? (t[f] = { ...h(e[f]) }, t) : (t[f] = e[f], t), {});
}, h = (e) => {
  let r = {}, n = {}, t = {};
  return e.fields && (r = y(e.fields), r.file && (t = {
    ...t,
    ...y(r.file)
  })), e.sys && (n = y(e.sys)), e.file && (t = { ...t, ...y(e.file) }), {
    ...r,
    ...n,
    ...t,
    ...e
  };
}, $ = (e) => ({
  meta: {
    pagination: {
      ..."limit" in e && { limit: e.limit },
      ..."total" in e && { total: e.total },
      ..."skip" in e && { skip: e.skip },
      ..."limit" in e && "total" in e && { pages: Math.ceil(e.total / e.limit) }
    }
  },
  data: X(y(e))
});
export {
  $ as normalize
};
