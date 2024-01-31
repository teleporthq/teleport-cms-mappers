import { c as H, g as ye } from "./_commonjsHelpers-10dfc225.mjs";
var U = { exports: {} };
U.exports;
(function(i, a) {
  var o = 200, s = "__lodash_hash_undefined__", f = 9007199254740991, g = "[object Arguments]", l = "[object Array]", d = "[object Boolean]", I = "[object Date]", nt = "[object Error]", $ = "[object Function]", it = "[object GeneratorFunction]", P = "[object Map]", ot = "[object Number]", K = "[object Object]", at = "[object Promise]", st = "[object RegExp]", M = "[object Set]", ct = "[object String]", ft = "[object Symbol]", W = "[object WeakMap]", ut = "[object ArrayBuffer]", G = "[object DataView]", lt = "[object Float32Array]", pt = "[object Float64Array]", ht = "[object Int8Array]", dt = "[object Int16Array]", gt = "[object Int32Array]", _t = "[object Uint8Array]", yt = "[object Uint8ClampedArray]", bt = "[object Uint16Array]", mt = "[object Uint32Array]", Xt = /[\\^$.*+?()[\]{}|]/g, Yt = /\w*$/, Zt = /^\[object .+?Constructor\]$/, zt = /^(?:0|[1-9]\d*)$/, c = {};
  c[g] = c[l] = c[ut] = c[G] = c[d] = c[I] = c[lt] = c[pt] = c[ht] = c[dt] = c[gt] = c[P] = c[ot] = c[K] = c[st] = c[M] = c[ct] = c[ft] = c[_t] = c[yt] = c[bt] = c[mt] = !0, c[nt] = c[$] = c[W] = !1;
  var Qt = typeof H == "object" && H && H.Object === Object && H, kt = typeof self == "object" && self && self.Object === Object && self, y = Qt || kt || Function("return this")(), vt = a && !a.nodeType && a, Tt = vt && !0 && i && !i.nodeType && i, Vt = Tt && Tt.exports === vt;
  function tr(t, r) {
    return t.set(r[0], r[1]), t;
  }
  function rr(t, r) {
    return t.add(r), t;
  }
  function er(t, r) {
    for (var e = -1, n = t ? t.length : 0; ++e < n && r(t[e], e, t) !== !1; )
      ;
    return t;
  }
  function nr(t, r) {
    for (var e = -1, n = r.length, u = t.length; ++e < n; )
      t[u + e] = r[e];
    return t;
  }
  function At(t, r, e, n) {
    var u = -1, p = t ? t.length : 0;
    for (n && p && (e = t[++u]); ++u < p; )
      e = r(e, t[u], u, t);
    return e;
  }
  function ir(t, r) {
    for (var e = -1, n = Array(t); ++e < t; )
      n[e] = r(e);
    return n;
  }
  function or(t, r) {
    return t?.[r];
  }
  function wt(t) {
    var r = !1;
    if (t != null && typeof t.toString != "function")
      try {
        r = !!(t + "");
      } catch {
      }
    return r;
  }
  function jt(t) {
    var r = -1, e = Array(t.size);
    return t.forEach(function(n, u) {
      e[++r] = [u, n];
    }), e;
  }
  function q(t, r) {
    return function(e) {
      return t(r(e));
    };
  }
  function Ot(t) {
    var r = -1, e = Array(t.size);
    return t.forEach(function(n) {
      e[++r] = n;
    }), e;
  }
  var ar = Array.prototype, sr = Function.prototype, F = Object.prototype, J = y["__core-js_shared__"], Ct = function() {
    var t = /[^.]+$/.exec(J && J.keys && J.keys.IE_PROTO || "");
    return t ? "Symbol(src)_1." + t : "";
  }(), St = sr.toString, m = F.hasOwnProperty, B = F.toString, cr = RegExp(
    "^" + St.call(m).replace(Xt, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), xt = Vt ? y.Buffer : void 0, Et = y.Symbol, It = y.Uint8Array, fr = q(Object.getPrototypeOf, Object), ur = Object.create, lr = F.propertyIsEnumerable, pr = ar.splice, Pt = Object.getOwnPropertySymbols, hr = xt ? xt.isBuffer : void 0, dr = q(Object.keys, Object), X = C(y, "DataView"), x = C(y, "Map"), Y = C(y, "Promise"), Z = C(y, "Set"), z = C(y, "WeakMap"), E = C(Object, "create"), gr = A(X), _r = A(x), yr = A(Y), br = A(Z), mr = A(z), Mt = Et ? Et.prototype : void 0, Gt = Mt ? Mt.valueOf : void 0;
  function v(t) {
    var r = -1, e = t ? t.length : 0;
    for (this.clear(); ++r < e; ) {
      var n = t[r];
      this.set(n[0], n[1]);
    }
  }
  function vr() {
    this.__data__ = E ? E(null) : {};
  }
  function Tr(t) {
    return this.has(t) && delete this.__data__[t];
  }
  function Ar(t) {
    var r = this.__data__;
    if (E) {
      var e = r[t];
      return e === s ? void 0 : e;
    }
    return m.call(r, t) ? r[t] : void 0;
  }
  function wr(t) {
    var r = this.__data__;
    return E ? r[t] !== void 0 : m.call(r, t);
  }
  function jr(t, r) {
    var e = this.__data__;
    return e[t] = E && r === void 0 ? s : r, this;
  }
  v.prototype.clear = vr, v.prototype.delete = Tr, v.prototype.get = Ar, v.prototype.has = wr, v.prototype.set = jr;
  function b(t) {
    var r = -1, e = t ? t.length : 0;
    for (this.clear(); ++r < e; ) {
      var n = t[r];
      this.set(n[0], n[1]);
    }
  }
  function Or() {
    this.__data__ = [];
  }
  function Cr(t) {
    var r = this.__data__, e = D(r, t);
    if (e < 0)
      return !1;
    var n = r.length - 1;
    return e == n ? r.pop() : pr.call(r, e, 1), !0;
  }
  function Sr(t) {
    var r = this.__data__, e = D(r, t);
    return e < 0 ? void 0 : r[e][1];
  }
  function xr(t) {
    return D(this.__data__, t) > -1;
  }
  function Er(t, r) {
    var e = this.__data__, n = D(e, t);
    return n < 0 ? e.push([t, r]) : e[n][1] = r, this;
  }
  b.prototype.clear = Or, b.prototype.delete = Cr, b.prototype.get = Sr, b.prototype.has = xr, b.prototype.set = Er;
  function j(t) {
    var r = -1, e = t ? t.length : 0;
    for (this.clear(); ++r < e; ) {
      var n = t[r];
      this.set(n[0], n[1]);
    }
  }
  function Ir() {
    this.__data__ = {
      hash: new v(),
      map: new (x || b)(),
      string: new v()
    };
  }
  function Pr(t) {
    return R(this, t).delete(t);
  }
  function Mr(t) {
    return R(this, t).get(t);
  }
  function Gr(t) {
    return R(this, t).has(t);
  }
  function Fr(t, r) {
    return R(this, t).set(t, r), this;
  }
  j.prototype.clear = Ir, j.prototype.delete = Pr, j.prototype.get = Mr, j.prototype.has = Gr, j.prototype.set = Fr;
  function O(t) {
    this.__data__ = new b(t);
  }
  function Br() {
    this.__data__ = new b();
  }
  function Dr(t) {
    return this.__data__.delete(t);
  }
  function Rr(t) {
    return this.__data__.get(t);
  }
  function Lr(t) {
    return this.__data__.has(t);
  }
  function Nr(t, r) {
    var e = this.__data__;
    if (e instanceof b) {
      var n = e.__data__;
      if (!x || n.length < o - 1)
        return n.push([t, r]), this;
      e = this.__data__ = new j(n);
    }
    return e.set(t, r), this;
  }
  O.prototype.clear = Br, O.prototype.delete = Dr, O.prototype.get = Rr, O.prototype.has = Lr, O.prototype.set = Nr;
  function Hr(t, r) {
    var e = V(t) || ue(t) ? ir(t.length, String) : [], n = e.length, u = !!n;
    for (var p in t)
      (r || m.call(t, p)) && !(u && (p == "length" || ae(p, n))) && e.push(p);
    return e;
  }
  function Ft(t, r, e) {
    var n = t[r];
    (!(m.call(t, r) && Lt(n, e)) || e === void 0 && !(r in t)) && (t[r] = e);
  }
  function D(t, r) {
    for (var e = t.length; e--; )
      if (Lt(t[e][0], r))
        return e;
    return -1;
  }
  function Ur(t, r) {
    return t && Bt(r, tt(r), t);
  }
  function Q(t, r, e, n, u, p, _) {
    var h;
    if (n && (h = p ? n(t, u, p, _) : n(t)), h !== void 0)
      return h;
    if (!L(t))
      return t;
    var Ut = V(t);
    if (Ut) {
      if (h = ne(t), !r)
        return te(t, h);
    } else {
      var S = T(t), $t = S == $ || S == it;
      if (pe(t))
        return Xr(t, r);
      if (S == K || S == g || $t && !p) {
        if (wt(t))
          return p ? t : {};
        if (h = ie($t ? {} : t), !r)
          return re(t, Ur(h, t));
      } else {
        if (!c[S])
          return p ? t : {};
        h = oe(t, S, Q, r);
      }
    }
    _ || (_ = new O());
    var Kt = _.get(t);
    if (Kt)
      return Kt;
    if (_.set(t, h), !Ut)
      var Wt = e ? ee(t) : tt(t);
    return er(Wt || t, function(rt, N) {
      Wt && (N = rt, rt = t[N]), Ft(h, N, Q(rt, r, e, n, N, t, _));
    }), h;
  }
  function $r(t) {
    return L(t) ? ur(t) : {};
  }
  function Kr(t, r, e) {
    var n = r(t);
    return V(t) ? n : nr(n, e(t));
  }
  function Wr(t) {
    return B.call(t);
  }
  function qr(t) {
    if (!L(t) || ce(t))
      return !1;
    var r = Ht(t) || wt(t) ? cr : Zt;
    return r.test(A(t));
  }
  function Jr(t) {
    if (!Rt(t))
      return dr(t);
    var r = [];
    for (var e in Object(t))
      m.call(t, e) && e != "constructor" && r.push(e);
    return r;
  }
  function Xr(t, r) {
    if (r)
      return t.slice();
    var e = new t.constructor(t.length);
    return t.copy(e), e;
  }
  function k(t) {
    var r = new t.constructor(t.byteLength);
    return new It(r).set(new It(t)), r;
  }
  function Yr(t, r) {
    var e = r ? k(t.buffer) : t.buffer;
    return new t.constructor(e, t.byteOffset, t.byteLength);
  }
  function Zr(t, r, e) {
    var n = r ? e(jt(t), !0) : jt(t);
    return At(n, tr, new t.constructor());
  }
  function zr(t) {
    var r = new t.constructor(t.source, Yt.exec(t));
    return r.lastIndex = t.lastIndex, r;
  }
  function Qr(t, r, e) {
    var n = r ? e(Ot(t), !0) : Ot(t);
    return At(n, rr, new t.constructor());
  }
  function kr(t) {
    return Gt ? Object(Gt.call(t)) : {};
  }
  function Vr(t, r) {
    var e = r ? k(t.buffer) : t.buffer;
    return new t.constructor(e, t.byteOffset, t.length);
  }
  function te(t, r) {
    var e = -1, n = t.length;
    for (r || (r = Array(n)); ++e < n; )
      r[e] = t[e];
    return r;
  }
  function Bt(t, r, e, n) {
    e || (e = {});
    for (var u = -1, p = r.length; ++u < p; ) {
      var _ = r[u], h = n ? n(e[_], t[_], _, e, t) : void 0;
      Ft(e, _, h === void 0 ? t[_] : h);
    }
    return e;
  }
  function re(t, r) {
    return Bt(t, Dt(t), r);
  }
  function ee(t) {
    return Kr(t, tt, Dt);
  }
  function R(t, r) {
    var e = t.__data__;
    return se(r) ? e[typeof r == "string" ? "string" : "hash"] : e.map;
  }
  function C(t, r) {
    var e = or(t, r);
    return qr(e) ? e : void 0;
  }
  var Dt = Pt ? q(Pt, Object) : ge, T = Wr;
  (X && T(new X(new ArrayBuffer(1))) != G || x && T(new x()) != P || Y && T(Y.resolve()) != at || Z && T(new Z()) != M || z && T(new z()) != W) && (T = function(t) {
    var r = B.call(t), e = r == K ? t.constructor : void 0, n = e ? A(e) : void 0;
    if (n)
      switch (n) {
        case gr:
          return G;
        case _r:
          return P;
        case yr:
          return at;
        case br:
          return M;
        case mr:
          return W;
      }
    return r;
  });
  function ne(t) {
    var r = t.length, e = t.constructor(r);
    return r && typeof t[0] == "string" && m.call(t, "index") && (e.index = t.index, e.input = t.input), e;
  }
  function ie(t) {
    return typeof t.constructor == "function" && !Rt(t) ? $r(fr(t)) : {};
  }
  function oe(t, r, e, n) {
    var u = t.constructor;
    switch (r) {
      case ut:
        return k(t);
      case d:
      case I:
        return new u(+t);
      case G:
        return Yr(t, n);
      case lt:
      case pt:
      case ht:
      case dt:
      case gt:
      case _t:
      case yt:
      case bt:
      case mt:
        return Vr(t, n);
      case P:
        return Zr(t, n, e);
      case ot:
      case ct:
        return new u(t);
      case st:
        return zr(t);
      case M:
        return Qr(t, n, e);
      case ft:
        return kr(t);
    }
  }
  function ae(t, r) {
    return r = r ?? f, !!r && (typeof t == "number" || zt.test(t)) && t > -1 && t % 1 == 0 && t < r;
  }
  function se(t) {
    var r = typeof t;
    return r == "string" || r == "number" || r == "symbol" || r == "boolean" ? t !== "__proto__" : t === null;
  }
  function ce(t) {
    return !!Ct && Ct in t;
  }
  function Rt(t) {
    var r = t && t.constructor, e = typeof r == "function" && r.prototype || F;
    return t === e;
  }
  function A(t) {
    if (t != null) {
      try {
        return St.call(t);
      } catch {
      }
      try {
        return t + "";
      } catch {
      }
    }
    return "";
  }
  function fe(t) {
    return Q(t, !0, !0);
  }
  function Lt(t, r) {
    return t === r || t !== t && r !== r;
  }
  function ue(t) {
    return le(t) && m.call(t, "callee") && (!lr.call(t, "callee") || B.call(t) == g);
  }
  var V = Array.isArray;
  function Nt(t) {
    return t != null && he(t.length) && !Ht(t);
  }
  function le(t) {
    return de(t) && Nt(t);
  }
  var pe = hr || _e;
  function Ht(t) {
    var r = L(t) ? B.call(t) : "";
    return r == $ || r == it;
  }
  function he(t) {
    return typeof t == "number" && t > -1 && t % 1 == 0 && t <= f;
  }
  function L(t) {
    var r = typeof t;
    return !!t && (r == "object" || r == "function");
  }
  function de(t) {
    return !!t && typeof t == "object";
  }
  function tt(t) {
    return Nt(t) ? Hr(t) : Jr(t);
  }
  function ge() {
    return [];
  }
  function _e() {
    return !1;
  }
  i.exports = fe;
})(U, U.exports);
var be = U.exports;
const me = /* @__PURE__ */ ye(be), ve = 4, Te = (i) => {
  const a = Object.keys(i.includes || {}).reduce(
    (s, f) => (i.includes[f].forEach((l) => {
      s[l.sys.id] = l;
    }), s),
    {}
  ), o = [...i.items].filter(
    (s) => !!s.sys
  );
  return o.forEach((s) => {
    a[s.sys.id] = s;
  }), o.map((s) => {
    const f = Jt(s, a, ve, 0);
    Object.assign(s, f);
  }), o;
}, Jt = (i, a, o, s) => {
  const f = me(i);
  return Object.keys(f.fields).forEach((g) => {
    const l = f.fields[g];
    if (Array.isArray(l))
      return f.fields[g] = l.map((d) => d.sys && d.sys.type === "Link" ? et(d, a, o, s + 1) : d), [];
    if (l.nodeType === "document" && l.content.length > 0) {
      f.fields[g].content = l.content.map((d) => {
        if (d.nodeType === "embedded-asset-block") {
          const I = et(
            d.data.target,
            a,
            o,
            s + 1
          );
          return {
            ...d,
            data: {
              ...d.data,
              target: I
            }
          };
        }
        return d;
      });
      return;
    }
    if (!l.sys) {
      f.fields[g] = l;
      return;
    }
    if (l.sys.type === "Link") {
      f.fields[g] = et(l, a, o, s + 1);
      return;
    }
    return l;
  }), f;
}, et = (i, a, o, s) => {
  if (i.sys.linkType === "Asset")
    return a[i.sys.id] ?? i;
  if (i.sys.linkType === "Entry") {
    if (s >= o)
      return i;
    const f = a[i.sys.id];
    return f ? Jt(f, a, o, s) : i;
  }
}, w = (i) => Array.isArray(i) ? i.map((a) => w(a)) : typeof i != "object" ? i : Object.keys(i.fields || {})?.length && Object.keys(i.sys || {})?.length ? qt(i) : Object.keys(i).reduce((a, o) => Array.isArray(i[o]) ? (a[o] = i[o].map((s) => w(s)), a) : typeof i[o] == "object" ? (a[o] = { ...qt(i[o]) }, a) : (a[o] = i[o], a), {}), qt = (i) => {
  let a = {}, o = {}, s = {};
  i.fields && (a = w(i.fields), a.file && (s = {
    ...s,
    ...w(a.file)
  })), i.sys && (o = w(i.sys), o.contentType?.id && (o = {
    ...o,
    typeId: o.contentType.id
  })), i.file && (s = { ...s, ...w(i.file) });
  const f = {
    ...a,
    ...o,
    ...s,
    ...i
  };
  return delete f.fields, f;
}, we = (i) => {
  let a = 0, o = 1;
  i.total && i.limit && (a = Math.ceil(i.total / i.limit)), i.skip && i.limit && (o = i.skip / i.limit + 1);
  const s = o < a, f = o >= 2, g = Te(i);
  return {
    meta: {
      pagination: {
        ..."limit" in i && { limit: i.limit },
        ..."total" in i && { total: i.total },
        ..."skip" in i && { skip: i.skip },
        hasNextPage: s,
        hasPrevPage: f,
        page: o,
        pages: a
      }
    },
    data: w(g)
  };
};
export {
  we as normalize
};
