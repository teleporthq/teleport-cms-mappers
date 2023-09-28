var M = Function.prototype.toString, m = Object.create, C = Object.defineProperty, T = Object.getOwnPropertyDescriptor, S = Object.getOwnPropertyNames, w = Object.getOwnPropertySymbols, B = Object.getPrototypeOf, I = Object.prototype, R = I.hasOwnProperty, z = I.propertyIsEnumerable, L = typeof w == "function", U = typeof WeakMap == "function", W = function() {
  if (U)
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
}(), b = function(e, r) {
  var t = e.__proto__ || B(e);
  if (!t)
    return m(null);
  var n = t.constructor;
  if (n === r.Object)
    return t === r.Object.prototype ? {} : m(t);
  if (~M.call(n).indexOf("[native code]"))
    try {
      return new n();
    } catch {
    }
  return m(t);
}, F = function(e, r, t, n) {
  var f = b(e, r);
  n.set(e, f);
  for (var s in e)
    R.call(e, s) && (f[s] = t(e[s], n));
  if (L)
    for (var i = w(e), o = 0, l = i.length, a = void 0; o < l; ++o)
      a = i[o], z.call(e, a) && (f[a] = t(e[a], n));
  return f;
}, _ = function(e, r, t, n) {
  var f = b(e, r);
  n.set(e, f);
  for (var s = L ? S(e).concat(w(e)) : S(e), i = 0, o = s.length, l = void 0, a = void 0; i < o; ++i)
    if (l = s[i], l !== "callee" && l !== "caller")
      if (a = T(e, l), a) {
        !a.get && !a.set && (a.value = t(e[l], n));
        try {
          C(f, l, a);
        } catch {
          f[l] = a.value;
        }
      } else
        f[l] = t(e[l], n);
  return f;
}, N = function(e) {
  var r = "";
  return e.global && (r += "g"), e.ignoreCase && (r += "i"), e.multiline && (r += "m"), e.unicode && (r += "u"), e.sticky && (r += "y"), r;
}, K = Array.isArray, V = Object.getPrototypeOf, Z = function() {
  return typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : (console && console.error && console.error('Unable to locate global object, returning "this".'), this);
}();
function O(e, r) {
  var t = !!(r && r.isStrict), n = r && r.realm || Z, f = t ? _ : F, s = function(i, o) {
    if (!i || typeof i != "object")
      return i;
    if (o.has(i))
      return o.get(i);
    var l = i.__proto__ || V(i), a = l && l.constructor;
    if (!a || a === n.Object)
      return f(i, n, s, o);
    var u;
    if (K(i)) {
      if (t)
        return _(i, n, s, o);
      u = new a(), o.set(i, u);
      for (var c = 0, v = i.length; c < v; ++c)
        u[c] = s(i[c], o);
      return u;
    }
    if (i instanceof n.Date)
      return new a(i.getTime());
    if (i instanceof n.RegExp)
      return u = new a(i.source, i.flags || N(i)), u.lastIndex = i.lastIndex, u;
    if (n.Map && i instanceof n.Map)
      return u = new a(), o.set(i, u), i.forEach(function(d, E) {
        u.set(E, s(d, o));
      }), u;
    if (n.Set && i instanceof n.Set)
      return u = new a(), o.set(i, u), i.forEach(function(d) {
        u.add(s(d, o));
      }), u;
    if (n.Blob && i instanceof n.Blob)
      return i.slice(0, i.size, i.type);
    if (n.Buffer && n.Buffer.isBuffer(i))
      return u = n.Buffer.allocUnsafe ? n.Buffer.allocUnsafe(i.length) : new a(i.length), o.set(i, u), i.copy(u), u;
    if (n.ArrayBuffer) {
      if (n.ArrayBuffer.isView(i))
        return u = new a(i.buffer.slice(0)), o.set(i, u), u;
      if (i instanceof n.ArrayBuffer)
        return u = i.slice(0), o.set(i, u), u;
    }
    return (
      // promise-like
      typeof i.then == "function" || // errors
      i instanceof Error || // weakmaps
      n.WeakMap && i instanceof n.WeakMap || // weaksets
      n.WeakSet && i instanceof n.WeakSet ? i : f(i, n, s, o)
    );
  };
  return s(e, W());
}
O.default = O;
O.strict = function(r, t) {
  return O(r, {
    isStrict: !0,
    realm: t ? t.realm : void 0
  });
};
var G = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
  return typeof e;
} : function(e) {
  return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, H = function() {
  function e(r, t) {
    var n = [], f = !0, s = !1, i = void 0;
    try {
      for (var o = r[Symbol.iterator](), l; !(f = (l = o.next()).done) && (n.push(l.value), !(t && n.length === t)); f = !0)
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
var p = {}, Y = function(r) {
  return r && r.sys && r.sys.type === "Link";
}, q = function(r) {
  return r && r.sys && r.sys.type === "ResourceLink";
}, J = function(r) {
  return r.space ? [r.type + "!" + r.id, r.space.sys.id + "!" + r.type + "!" + r.id] : [r.type + "!" + r.id];
}, h = function(r, t) {
  var n = t.entryId, f = t.linkType, s = t.spaceId;
  return s ? r.get(s + "!" + f + "!" + n) : r.get(f + "!" + n);
}, Q = function(r, t) {
  var n = t.sys, f = n.type, s = n.linkType;
  if (f === "ResourceLink") {
    var i = t.sys.urn, o = /.*:spaces\/([A-Za-z0-9]*)\/entries\/([A-Za-z0-9]*)/;
    if (!o.test(i))
      return p;
    var l = i.match(o), a = H(l, 3);
    a[0];
    var u = a[1], c = a[2], v = s.split(":")[1];
    return h(r, { linkType: v, entryId: c, spaceId: u }) || p;
  }
  var d = t.sys.id;
  return h(r, { linkType: s, entryId: d }) || p;
}, X = function(r) {
  if (Array.isArray(r))
    return r.filter(function(n) {
      return n !== p;
    });
  for (var t in r)
    r[t] === p && delete r[t];
  return r;
}, $ = function e(r, t, n, f) {
  if (t(r))
    return n(r);
  if (r && (typeof r > "u" ? "undefined" : G(r)) === "object") {
    for (var s in r)
      r.hasOwnProperty(s) && (r[s] = e(r[s], t, n, f));
    f && (r = X(r));
  }
  return r;
}, D = function(r, t, n) {
  var f = Q(r, t);
  return f === p ? n ? f : t : f;
}, j = function(r, t) {
  if (!Array.isArray(t))
    return r;
  var n = Object.keys(r).filter(function(f) {
    return t.indexOf(f) !== -1;
  });
  return n.reduce(function(f, s) {
    return f[s] = r[s], f;
  }, {});
}, x = function(r, t) {
  if (t = t || {}, !r.items)
    return [];
  var n = O(r), f = Object.keys(n.includes || {}).reduce(function(o, l) {
    return [].concat(g(o), g(r.includes[l]));
  }, []), s = [].concat(g(n.items), g(f)).filter(function(o) {
    return !!o.sys;
  }), i = new Map(s.reduce(function(o, l) {
    var a = J(l.sys).map(function(u) {
      return [u, l];
    });
    return o.push.apply(o, g(a)), o;
  }, []));
  return s.forEach(function(o) {
    var l = j(o, t.itemEntryPoints);
    Object.assign(o, $(l, function(a) {
      return Y(a) || q(a);
    }, function(a) {
      return D(i, a, t.removeUnresolved);
    }, t.removeUnresolved));
  }), n.items;
};
const y = (e) => Array.isArray(e) ? e.map((r) => y(r)) : typeof e != "object" ? e : Object.keys(e.fields || {})?.length && Object.keys(e.sys || {})?.length ? P(e) : Object.keys(e).reduce((r, t) => Array.isArray(e[t]) ? (r[t] = e[t].map((n) => y(n)), r) : typeof e[t] == "object" ? (r[t] = { ...P(e[t]) }, r) : (r[t] = e[t], r), {});
function k(e, r = 0, t = 40) {
  if (e === null || typeof e != "object")
    return e;
  const n = Array.isArray(e) ? [] : {};
  if (Array.isArray(e)) {
    for (let f = 0; f < e.length; f++)
      r < t && (n[f] = k(e[f], r + 1, t));
    return n;
  }
  for (const f in e)
    Object.prototype.hasOwnProperty.call(e, f) && r < t && (n[f] = k(e[f], r + 1, t));
  return n;
}
function A(e, r = 40, t = 0) {
  if (t > r)
    return !0;
  if (e === null || typeof e != "object")
    return !1;
  if (Array.isArray(e)) {
    for (let n = 0; n < e.length; n++)
      if (A(e[n], r, t + 1))
        return !0;
  } else
    for (const n in e)
      if (Object.prototype.hasOwnProperty.call(e, n) && A(e[n], r, t + 1))
        return !0;
  return !1;
}
const P = (e) => {
  let r = {}, t = {}, n = {};
  return e.fields && (r = y(e.fields), r.file && (n = {
    ...n,
    ...y(r.file)
  })), e.sys && (t = y(e.sys), t.contentType?.id && (t = {
    ...t,
    typeId: t.contentType.id
  })), e.file && (n = { ...n, ...y(e.file) }), {
    ...r,
    ...t,
    ...n,
    ...e
  };
}, rr = (e) => {
  let r = 0, t = 1;
  e.total && e.limit && (r = Math.ceil(e.total / e.limit)), e.skip && e.limit && (t = e.skip / e.limit + 1);
  const n = t < r, f = t >= 2;
  let s = x(e);
  return A(s) && (s = k(s)), {
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
    data: y(s)
  };
};
export {
  rr as normalize
};
