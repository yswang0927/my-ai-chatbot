(function(x, T) {
    typeof exports == "object" && typeof module < "u" ? T(exports) : typeof define == "function" && define.amd ? define("@bytereplay/snapshot", ["exports"], T) : (x = typeof globalThis < "u" ? globalThis : x || self,
    T(x["@bytereplay/snapshot"] = {}))
}
)(this, function(exports) {
    "use strict";
    var mr = Object.defineProperty;
    var _r = (x, T, s) => T in x ? mr(x, T, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: s
    }) : x[T] = s;
    var b = (x, T, s) => (_r(x, typeof T != "symbol" ? T + "" : T, s),
    s);
    (function() {
        try {
            if (typeof document < "u") {
                var s = document.createElement("style");
                s.appendChild(document.createTextNode("")),
                document.head.appendChild(s)
            }
        } catch (r) {
            console.error("vite-plugin-css-injected-by-js", r)
        }
    }
    )();
    var __defProp = Object.defineProperty
      , __defNormalProp = (s, r, t) => r in s ? __defProp(s, r, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
    }) : s[r] = t
      , __publicField = (s, r, t) => (__defNormalProp(s, typeof r != "symbol" ? r + "" : r, t),
    t);
    class RuntimeError extends Error {
        constructor(r, t) {
            var n;
            super(r, t),
            __publicField(this, "localizedMessage"),
            this.name = "bytereplay.core.RuntimeError",
            this.localizedMessage = (n = t == null ? void 0 : t.localizedMessage) != null ? n : r
        }
    }
    class ServerError extends RuntimeError {
        constructor(r, t) {
            super(r, t),
            __publicField(this, "_code"),
            this.name = "bytereplay.core.ServerError",
            this._code = t == null ? void 0 : t.code
        }
        get code() {
            return this._code
        }
    }
    class UnsupportedError extends RuntimeError {
        constructor(r, t) {
            super(r, t),
            this.name = "bytereplay.core.UnsupportedError"
        }
    }
    function isFunction$1(s) {
        return typeof s == "function"
    }
    function isString(s) {
        return typeof s == "string" || s instanceof String
    }
    function isEmptyString(s) {
        return s.trim() === ""
    }
    function performanceNow() {
        var s;
        return isFunction$1((s = globalThis == null ? void 0 : globalThis.performance) == null ? void 0 : s.now)
    }
    function webWorkers() {
        return !!(globalThis != null && globalThis.Worker)
    }
    function webSockets() {
        return !!(globalThis != null && globalThis.WebSocket)
    }
    function fetch$1() {
        return isFunction$1(globalThis == null ? void 0 : globalThis.fetch)
    }
    const ciu = Object.freeze(Object.defineProperty({
        __proto__: null,
        performanceNow,
        webWorkers,
        webSockets,
        fetch: fetch$1
    }, Symbol.toStringTag, {
        value: "Module"
    }));
    var commonjsGlobal = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}
      , lodash_clonedeep = {
        exports: {}
    };
    (function(s, r) {
        var t = 200
          , n = "__lodash_hash_undefined__"
          , o = 9007199254740991
          , i = "[object Arguments]"
          , c = "[object Array]"
          , l = "[object Boolean]"
          , d = "[object Date]"
          , h = "[object Error]"
          , f = "[object Function]"
          , m = "[object GeneratorFunction]"
          , g = "[object Map]"
          , v = "[object Number]"
          , S = "[object Object]"
          , E = "[object Promise]"
          , y = "[object RegExp]"
          , A = "[object Set]"
          , N = "[object String]"
          , R = "[object Symbol]"
          , L = "[object WeakMap]"
          , D = "[object ArrayBuffer]"
          , X = "[object DataView]"
          , de = "[object Float32Array]"
          , he = "[object Float64Array]"
          , pe = "[object Int8Array]"
          , fe = "[object Int16Array]"
          , me = "[object Int32Array]"
          , _e = "[object Uint8Array]"
          , ge = "[object Uint8ClampedArray]"
          , be = "[object Uint16Array]"
          , ye = "[object Uint32Array]"
          , Ge = /[\\^$.*+?()[\]{}|]/g
          , Be = /\w*$/
          , Xe = /^\[object .+?Constructor\]$/
          , Ke = /^(?:0|[1-9]\d*)$/
          , w = {};
        w[i] = w[c] = w[D] = w[X] = w[l] = w[d] = w[de] = w[he] = w[pe] = w[fe] = w[me] = w[g] = w[v] = w[S] = w[y] = w[A] = w[N] = w[R] = w[_e] = w[ge] = w[be] = w[ye] = !0,
        w[h] = w[f] = w[L] = !1;
        var qe = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal
          , Ye = typeof self == "object" && self && self.Object === Object && self
          , P = qe || Ye || Function("return this")()
          , ve = r && !r.nodeType && r
          , Se = ve && !0 && s && !s.nodeType && s
          , Qe = Se && Se.exports === ve;
        function Je(a, u) {
            return a.set(u[0], u[1]),
            a
        }
        function Ze(a, u) {
            return a.add(u),
            a
        }
        function et(a, u) {
            for (var p = -1, _ = a ? a.length : 0; ++p < _ && u(a[p], p, a) !== !1; )
                ;
            return a
        }
        function tt(a, u) {
            for (var p = -1, _ = u.length, I = a.length; ++p < _; )
                a[I + p] = u[p];
            return a
        }
        function Ee(a, u, p, _) {
            var I = -1
              , C = a ? a.length : 0;
            for (_ && C && (p = a[++I]); ++I < C; )
                p = u(p, a[I], I, a);
            return p
        }
        function rt(a, u) {
            for (var p = -1, _ = Array(a); ++p < a; )
                _[p] = u(p);
            return _
        }
        function nt(a, u) {
            return a == null ? void 0 : a[u]
        }
        function Te(a) {
            var u = !1;
            if (a != null && typeof a.toString != "function")
                try {
                    u = !!(a + "")
                } catch {}
            return u
        }
        function Re(a) {
            var u = -1
              , p = Array(a.size);
            return a.forEach(function(_, I) {
                p[++u] = [I, _]
            }),
            p
        }
        function ee(a, u) {
            return function(p) {
                return a(u(p))
            }
        }
        function we(a) {
            var u = -1
              , p = Array(a.size);
            return a.forEach(function(_) {
                p[++u] = _
            }),
            p
        }
        var st = Array.prototype
          , ot = Function.prototype
          , K = Object.prototype
          , te = P["__core-js_shared__"]
          , Ie = function() {
            var a = /[^.]+$/.exec(te && te.keys && te.keys.IE_PROTO || "");
            return a ? "Symbol(src)_1." + a : ""
        }()
          , Ae = ot.toString
          , k = K.hasOwnProperty
          , q = K.toString
          , it = RegExp("^" + Ae.call(k).replace(Ge, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$")
          , Ce = Qe ? P.Buffer : void 0
          , Oe = P.Symbol
          , xe = P.Uint8Array
          , at = ee(Object.getPrototypeOf, Object)
          , ct = Object.create
          , lt = K.propertyIsEnumerable
          , ut = st.splice
          , Ne = Object.getOwnPropertySymbols
          , dt = Ce ? Ce.isBuffer : void 0
          , ht = ee(Object.keys, Object)
          , re = W(P, "DataView")
          , G = W(P, "Map")
          , ne = W(P, "Promise")
          , se = W(P, "Set")
          , oe = W(P, "WeakMap")
          , B = W(Object, "create")
          , pt = V(re)
          , ft = V(G)
          , mt = V(ne)
          , _t = V(se)
          , gt = V(oe)
          , Me = Oe ? Oe.prototype : void 0
          , De = Me ? Me.valueOf : void 0;
        function U(a) {
            var u = -1
              , p = a ? a.length : 0;
            for (this.clear(); ++u < p; ) {
                var _ = a[u];
                this.set(_[0], _[1])
            }
        }
        function bt() {
            this.__data__ = B ? B(null) : {}
        }
        function yt(a) {
            return this.has(a) && delete this.__data__[a]
        }
        function vt(a) {
            var u = this.__data__;
            if (B) {
                var p = u[a];
                return p === n ? void 0 : p
            }
            return k.call(u, a) ? u[a] : void 0
        }
        function St(a) {
            var u = this.__data__;
            return B ? u[a] !== void 0 : k.call(u, a)
        }
        function Et(a, u) {
            var p = this.__data__;
            return p[a] = B && u === void 0 ? n : u,
            this
        }
        U.prototype.clear = bt,
        U.prototype.delete = yt,
        U.prototype.get = vt,
        U.prototype.has = St,
        U.prototype.set = Et;
        function H(a) {
            var u = -1
              , p = a ? a.length : 0;
            for (this.clear(); ++u < p; ) {
                var _ = a[u];
                this.set(_[0], _[1])
            }
        }
        function Tt() {
            this.__data__ = []
        }
        function Rt(a) {
            var u = this.__data__
              , p = Y(u, a);
            if (p < 0)
                return !1;
            var _ = u.length - 1;
            return p == _ ? u.pop() : ut.call(u, p, 1),
            !0
        }
        function wt(a) {
            var u = this.__data__
              , p = Y(u, a);
            return p < 0 ? void 0 : u[p][1]
        }
        function It(a) {
            return Y(this.__data__, a) > -1
        }
        function At(a, u) {
            var p = this.__data__
              , _ = Y(p, a);
            return _ < 0 ? p.push([a, u]) : p[_][1] = u,
            this
        }
        H.prototype.clear = Tt,
        H.prototype.delete = Rt,
        H.prototype.get = wt,
        H.prototype.has = It,
        H.prototype.set = At;
        function $(a) {
            var u = -1
              , p = a ? a.length : 0;
            for (this.clear(); ++u < p; ) {
                var _ = a[u];
                this.set(_[0], _[1])
            }
        }
        function Ct() {
            this.__data__ = {
                hash: new U,
                map: new (G || H),
                string: new U
            }
        }
        function Ot(a) {
            return Q(this, a).delete(a)
        }
        function xt(a) {
            return Q(this, a).get(a)
        }
        function Nt(a) {
            return Q(this, a).has(a)
        }
        function Mt(a, u) {
            return Q(this, a).set(a, u),
            this
        }
        $.prototype.clear = Ct,
        $.prototype.delete = Ot,
        $.prototype.get = xt,
        $.prototype.has = Nt,
        $.prototype.set = Mt;
        function j(a) {
            this.__data__ = new H(a)
        }
        function Dt() {
            this.__data__ = new H
        }
        function Lt(a) {
            return this.__data__.delete(a)
        }
        function Pt(a) {
            return this.__data__.get(a)
        }
        function Ht(a) {
            return this.__data__.has(a)
        }
        function kt(a, u) {
            var p = this.__data__;
            if (p instanceof H) {
                var _ = p.__data__;
                if (!G || _.length < t - 1)
                    return _.push([a, u]),
                    this;
                p = this.__data__ = new $(_)
            }
            return p.set(a, u),
            this
        }
        j.prototype.clear = Dt,
        j.prototype.delete = Lt,
        j.prototype.get = Pt,
        j.prototype.has = Ht,
        j.prototype.set = kt;
        function Ut(a, u) {
            var p = ce(a) || cr(a) ? rt(a.length, String) : []
              , _ = p.length
              , I = !!_;
            for (var C in a)
                (u || k.call(a, C)) && !(I && (C == "length" || sr(C, _))) && p.push(C);
            return p
        }
        function Le(a, u, p) {
            var _ = a[u];
            (!(k.call(a, u) && Ue(_, p)) || p === void 0 && !(u in a)) && (a[u] = p)
        }
        function Y(a, u) {
            for (var p = a.length; p--; )
                if (Ue(a[p][0], u))
                    return p;
            return -1
        }
        function Ft(a, u) {
            return a && Pe(u, le(u), a)
        }
        function ie(a, u, p, _, I, C, M) {
            var O;
            if (_ && (O = C ? _(a, I, C, M) : _(a)),
            O !== void 0)
                return O;
            if (!J(a))
                return a;
            var $e = ce(a);
            if ($e) {
                if (O = tr(a),
                !u)
                    return Jt(a, O)
            } else {
                var z = F(a)
                  , je = z == f || z == m;
                if (ur(a))
                    return Gt(a, u);
                if (z == S || z == i || je && !C) {
                    if (Te(a))
                        return C ? a : {};
                    if (O = rr(je ? {} : a),
                    !u)
                        return Zt(a, Ft(O, a))
                } else {
                    if (!w[z])
                        return C ? a : {};
                    O = nr(a, z, ie, u)
                }
            }
            M || (M = new j);
            var We = M.get(a);
            if (We)
                return We;
            if (M.set(a, O),
            !$e)
                var ze = p ? er(a) : le(a);
            return et(ze || a, function(ue, Z) {
                ze && (Z = ue,
                ue = a[Z]),
                Le(O, Z, ie(ue, u, p, _, Z, a, M))
            }),
            O
        }
        function Vt(a) {
            return J(a) ? ct(a) : {}
        }
        function $t(a, u, p) {
            var _ = u(a);
            return ce(a) ? _ : tt(_, p(a))
        }
        function jt(a) {
            return q.call(a)
        }
        function Wt(a) {
            if (!J(a) || ir(a))
                return !1;
            var u = Ve(a) || Te(a) ? it : Xe;
            return u.test(V(a))
        }
        function zt(a) {
            if (!ke(a))
                return ht(a);
            var u = [];
            for (var p in Object(a))
                k.call(a, p) && p != "constructor" && u.push(p);
            return u
        }
        function Gt(a, u) {
            if (u)
                return a.slice();
            var p = new a.constructor(a.length);
            return a.copy(p),
            p
        }
        function ae(a) {
            var u = new a.constructor(a.byteLength);
            return new xe(u).set(new xe(a)),
            u
        }
        function Bt(a, u) {
            var p = u ? ae(a.buffer) : a.buffer;
            return new a.constructor(p,a.byteOffset,a.byteLength)
        }
        function Xt(a, u, p) {
            var _ = u ? p(Re(a), !0) : Re(a);
            return Ee(_, Je, new a.constructor)
        }
        function Kt(a) {
            var u = new a.constructor(a.source,Be.exec(a));
            return u.lastIndex = a.lastIndex,
            u
        }
        function qt(a, u, p) {
            var _ = u ? p(we(a), !0) : we(a);
            return Ee(_, Ze, new a.constructor)
        }
        function Yt(a) {
            return De ? Object(De.call(a)) : {}
        }
        function Qt(a, u) {
            var p = u ? ae(a.buffer) : a.buffer;
            return new a.constructor(p,a.byteOffset,a.length)
        }
        function Jt(a, u) {
            var p = -1
              , _ = a.length;
            for (u || (u = Array(_)); ++p < _; )
                u[p] = a[p];
            return u
        }
        function Pe(a, u, p, _) {
            p || (p = {});
            for (var I = -1, C = u.length; ++I < C; ) {
                var M = u[I]
                  , O = _ ? _(p[M], a[M], M, p, a) : void 0;
                Le(p, M, O === void 0 ? a[M] : O)
            }
            return p
        }
        function Zt(a, u) {
            return Pe(a, He(a), u)
        }
        function er(a) {
            return $t(a, le, He)
        }
        function Q(a, u) {
            var p = a.__data__;
            return or(u) ? p[typeof u == "string" ? "string" : "hash"] : p.map
        }
        function W(a, u) {
            var p = nt(a, u);
            return Wt(p) ? p : void 0
        }
        var He = Ne ? ee(Ne, Object) : pr
          , F = jt;
        (re && F(new re(new ArrayBuffer(1))) != X || G && F(new G) != g || ne && F(ne.resolve()) != E || se && F(new se) != A || oe && F(new oe) != L) && (F = function(a) {
            var u = q.call(a)
              , p = u == S ? a.constructor : void 0
              , _ = p ? V(p) : void 0;
            if (_)
                switch (_) {
                case pt:
                    return X;
                case ft:
                    return g;
                case mt:
                    return E;
                case _t:
                    return A;
                case gt:
                    return L
                }
            return u
        }
        );
        function tr(a) {
            var u = a.length
              , p = a.constructor(u);
            return u && typeof a[0] == "string" && k.call(a, "index") && (p.index = a.index,
            p.input = a.input),
            p
        }
        function rr(a) {
            return typeof a.constructor == "function" && !ke(a) ? Vt(at(a)) : {}
        }
        function nr(a, u, p, _) {
            var I = a.constructor;
            switch (u) {
            case D:
                return ae(a);
            case l:
            case d:
                return new I(+a);
            case X:
                return Bt(a, _);
            case de:
            case he:
            case pe:
            case fe:
            case me:
            case _e:
            case ge:
            case be:
            case ye:
                return Qt(a, _);
            case g:
                return Xt(a, _, p);
            case v:
            case N:
                return new I(a);
            case y:
                return Kt(a);
            case A:
                return qt(a, _, p);
            case R:
                return Yt(a)
            }
        }
        function sr(a, u) {
            return u = u == null ? o : u,
            !!u && (typeof a == "number" || Ke.test(a)) && a > -1 && a % 1 == 0 && a < u
        }
        function or(a) {
            var u = typeof a;
            return u == "string" || u == "number" || u == "symbol" || u == "boolean" ? a !== "__proto__" : a === null
        }
        function ir(a) {
            return !!Ie && Ie in a
        }
        function ke(a) {
            var u = a && a.constructor
              , p = typeof u == "function" && u.prototype || K;
            return a === p
        }
        function V(a) {
            if (a != null) {
                try {
                    return Ae.call(a)
                } catch {}
                try {
                    return a + ""
                } catch {}
            }
            return ""
        }
        function ar(a) {
            return ie(a, !0, !0)
        }
        function Ue(a, u) {
            return a === u || a !== a && u !== u
        }
        function cr(a) {
            return lr(a) && k.call(a, "callee") && (!lt.call(a, "callee") || q.call(a) == i)
        }
        var ce = Array.isArray;
        function Fe(a) {
            return a != null && dr(a.length) && !Ve(a)
        }
        function lr(a) {
            return hr(a) && Fe(a)
        }
        var ur = dt || fr;
        function Ve(a) {
            var u = J(a) ? q.call(a) : "";
            return u == f || u == m
        }
        function dr(a) {
            return typeof a == "number" && a > -1 && a % 1 == 0 && a <= o
        }
        function J(a) {
            var u = typeof a;
            return !!a && (u == "object" || u == "function")
        }
        function hr(a) {
            return !!a && typeof a == "object"
        }
        function le(a) {
            return Fe(a) ? Ut(a) : zt(a)
        }
        function pr() {
            return []
        }
        function fr() {
            return !1
        }
        s.exports = ar
    }
    )(lodash_clonedeep, lodash_clonedeep.exports);
    const clone = lodash_clonedeep.exports;
    function deepClone(s) {
        return typeof globalThis.structuredClone == "function" ? structuredClone(s) : clone(s)
    }
    var VMutationType = (s => (s[s.AddNode = 1] = "AddNode",
    s[s.RemoveNode = 2] = "RemoveNode",
    s[s.ChangeAttributes = 3] = "ChangeAttributes",
    s[s.CharacterData = 4] = "CharacterData",
    s[s.Document = 10] = "Document",
    s[s.StyleSheetRule = 20] = "StyleSheetRule",
    s[s.StyleSheetAdopted = 21] = "StyleSheetAdopted",
    s))(VMutationType || {})
      , VNodeType = (s => (s[s.ElementNode = 1] = "ElementNode",
    s[s.TextNode = 3] = "TextNode",
    s[s.CommentNode = 8] = "CommentNode",
    s[s.DocumentNode = 9] = "DocumentNode",
    s[s.DocumentFragmentNode = 11] = "DocumentFragmentNode",
    s))(VNodeType || {});
    function isHTMLIFrameElement(s) {
        return s.tagName === "IFRAME"
    }
    function isHTMLStyleElement(s) {
        return s.tagName === "STYLE"
    }
    function isHTMLImageElement(s) {
        return s.tagName === "IMG"
    }
    function isHTMLInputElement(s) {
        return s.tagName === "INPUT"
    }
    function isHTMLLinkElement(s) {
        return s.tagName === "LINK"
    }
    function isHTMLOptionElement(s) {
        return s.tagName === "OPTION"
    }
    function isHTMLScriptElement(s) {
        return s.tagName === "SCRIPT"
    }
    function isHTMLSelectElement(s) {
        return s.tagName === "SELECT"
    }
    function isHTMLTextAreaElement(s) {
        return s.tagName === "TEXTAREA"
    }
    function isSVGUseElement(s) {
        return s.tagName === "use"
    }
    function isHTMLElement(s) {
        return s.nodeType === Node.ELEMENT_NODE
    }
    function isVNode(s) {
        return s != null && s.id != null && s.type != null && !(s instanceof Node)
    }
    function isVParentNode(s) {
        return "children"in s
    }
    function isVElement(s) {
        return s.type === VNodeType.ElementNode
    }
    function includes(s, r) {
        return s.indexOf(r) !== -1
    }
    let getRandomValues;
    const rnds8 = new Uint8Array(16);
    function rng() {
        if (!getRandomValues && (getRandomValues = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto),
        !getRandomValues))
            throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
        return getRandomValues(rnds8)
    }
    const byteToHex = [];
    for (let s = 0; s < 256; ++s)
        byteToHex.push((s + 256).toString(16).slice(1));
    function unsafeStringify(s, r=0) {
        return (byteToHex[s[r + 0]] + byteToHex[s[r + 1]] + byteToHex[s[r + 2]] + byteToHex[s[r + 3]] + "-" + byteToHex[s[r + 4]] + byteToHex[s[r + 5]] + "-" + byteToHex[s[r + 6]] + byteToHex[s[r + 7]] + "-" + byteToHex[s[r + 8]] + byteToHex[s[r + 9]] + "-" + byteToHex[s[r + 10]] + byteToHex[s[r + 11]] + byteToHex[s[r + 12]] + byteToHex[s[r + 13]] + byteToHex[s[r + 14]] + byteToHex[s[r + 15]]).toLowerCase()
    }
    const randomUUID = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto)
      , native = {
        randomUUID
    };
    function v4(s, r, t) {
        if (native.randomUUID && !r && !s)
            return native.randomUUID();
        s = s || {};
        const n = s.random || (s.rng || rng)();
        if (n[6] = n[6] & 15 | 64,
        n[8] = n[8] & 63 | 128,
        r) {
            t = t || 0;
            for (let o = 0; o < 16; ++o)
                r[t + o] = n[o];
            return r
        }
        return unsafeStringify(n)
    }
    function generateUUID() {
        return v4()
    }
    const caniuse = ciu;
    class APIError extends ServerError {
        constructor(r, t, n, o) {
            super(`Error occurs when invoking API "${r}": ${n}`, {
                ...o != null ? o : {},
                code: t
            }),
            this.path = r,
            this.name = "bytereplay.core.APIError"
        }
    }
    const FETCH_FLAG = "bytereplay";
    class APIClient {
        constructor(s) {
            __publicField(this, "_env"),
            __publicField(this, "_requestInterceptor"),
            this._env = s
        }
        get apiURL() {
            return `${this._env.baseURL}api/`
        }
        set requestInterceptor(value) {
            isString(value) ? this._requestInterceptor = eval(value) : this._requestInterceptor = value
        }
        async get(s, r, t) {
            return this._request("GET", s, r, t)
        }
        async post(s, r, t) {
            return this._request("POST", s, r, t)
        }
        async _request(s, r, t, n) {
            let o = {
                path: r,
                headers: n
            };
            if (this._requestInterceptor)
                try {
                    o = this._requestInterceptor(r, n)
                } catch {}
            const i = s === "POST"
              , c = this._makeURL(o.path);
            if (s === "GET" && t) {
                for (const [f,m] of Object.entries(t))
                    if (m != null) {
                        let g;
                        m instanceof Date ? g = m.toISOString() : g = m.toString(),
                        c.searchParams.set(f, g)
                    }
            }
            const l = {};
            let d;
            i && (t instanceof FormData ? d = t : (d = JSON.stringify(t),
            l["Content-Type"] = "application/json"));
            const h = fetch(c.href, {
                method: s,
                mode: "cors",
                body: d,
                headers: {
                    ...l,
                    ...o.headers || {}
                },
                [FETCH_FLAG]: !0
            });
            return this._dealWithResponse(o.path, h)
        }
        async _dealWithResponse(s, r) {
            let t;
            try {
                t = await r
            } catch (o) {
                throw new ServerError(`Error occurs when invoking API "${s}": ${o.message}`,{
                    cause: o
                })
            }
            let n;
            try {
                n = await t.json()
            } catch (o) {
                throw new ServerError(`Response of API "${s}" can not be parsed into JSON.`,{
                    cause: o
                })
            }
            if (n.success)
                return n.data;
            throw new APIError(s,n.code,n.message)
        }
        _makeURL(s) {
            return new URL(s,this.apiURL)
        }
    }
    function now() {
        return caniuse.performanceNow() ? globalThis.performance.now() : Date.now()
    }
    let ric = globalThis.requestIdleCallback;
    ric || (ric = function(t, n) {
        const o = now();
        return globalThis.setTimeout( () => {
            var i;
            const c = now() - o;
            t({
                didTimeout: (i = (n == null ? void 0 : n.timeout) != null && c > n.timeout) != null ? i : !1,
                timeRemaining() {
                    return Math.max(0, 7 - c)
                }
            })
        }
        )
    }
    );
    const _Retry = class {
        constructor(s) {
            __publicField(this, "_options"),
            this._options = this._normalize(s)
        }
        async attempt(s, r) {
            if (typeof s == "function")
                return this._attempt(s, this._normalize(r, this._options))
        }
        async _attempt(s, r, t=1) {
            return s().catch(n => {
                if (r.shouldRetry && !r.shouldRetry(n))
                    throw n;
                if (t < r.retries)
                    return this._delay(this._randomTimeout(t, r)).then( () => this._attempt(s, r, t + 1));
                throw n
            }
            )
        }
        _normalize(s, r=_Retry.DEFAULT_OPTIONS) {
            const t = {
                ...r
            };
            if (s) {
                const {retries: n, initialTimeout: o, maxTimeout: i, randomize: c} = s;
                n != null && n >= 0 && (t.retries = n),
                o != null && o >= 0 && (t.initialTimeout = o),
                i != null && i >= t.initialTimeout && (t.maxTimeout = i),
                c != null && c >= 1 && c <= 2 && (c < 1 ? t.randomize = 1 : c > 2 ? t.randomize = 2 : t.randomize = c),
                s != null && s.shouldRetry && (t.shouldRetry = s.shouldRetry)
            }
            return t
        }
        _delay(s) {
            return new Promise(r => {
                setTimeout( () => {
                    r()
                }
                , s)
            }
            )
        }
        _randomTimeout(s, r) {
            const {randomize: t, initialTimeout: n, maxTimeout: o, factor: i} = r;
            return Math.min(t * n * i ** s, o)
        }
    }
    ;
    let Retry = _Retry;
    __publicField(Retry, "DEFAULT_OPTIONS", {
        retries: 3,
        initialTimeout: 1e3,
        maxTimeout: 1 / 0,
        randomize: 1.5,
        factor: 1.5,
        shouldRetry: () => !0
    });
    var eventemitter3 = {
        exports: {}
    };
    (function(s) {
        var r = Object.prototype.hasOwnProperty
          , t = "~";
        function n() {}
        Object.create && (n.prototype = Object.create(null),
        new n().__proto__ || (t = !1));
        function o(d, h, f) {
            this.fn = d,
            this.context = h,
            this.once = f || !1
        }
        function i(d, h, f, m, g) {
            if (typeof f != "function")
                throw new TypeError("The listener must be a function");
            var v = new o(f,m || d,g)
              , S = t ? t + h : h;
            return d._events[S] ? d._events[S].fn ? d._events[S] = [d._events[S], v] : d._events[S].push(v) : (d._events[S] = v,
            d._eventsCount++),
            d
        }
        function c(d, h) {
            --d._eventsCount === 0 ? d._events = new n : delete d._events[h]
        }
        function l() {
            this._events = new n,
            this._eventsCount = 0
        }
        l.prototype.eventNames = function() {
            var h = [], f, m;
            if (this._eventsCount === 0)
                return h;
            for (m in f = this._events)
                r.call(f, m) && h.push(t ? m.slice(1) : m);
            return Object.getOwnPropertySymbols ? h.concat(Object.getOwnPropertySymbols(f)) : h
        }
        ,
        l.prototype.listeners = function(h) {
            var f = t ? t + h : h
              , m = this._events[f];
            if (!m)
                return [];
            if (m.fn)
                return [m.fn];
            for (var g = 0, v = m.length, S = new Array(v); g < v; g++)
                S[g] = m[g].fn;
            return S
        }
        ,
        l.prototype.listenerCount = function(h) {
            var f = t ? t + h : h
              , m = this._events[f];
            return m ? m.fn ? 1 : m.length : 0
        }
        ,
        l.prototype.emit = function(h, f, m, g, v, S) {
            var E = t ? t + h : h;
            if (!this._events[E])
                return !1;
            var y = this._events[E], A = arguments.length, N, R;
            if (y.fn) {
                switch (y.once && this.removeListener(h, y.fn, void 0, !0),
                A) {
                case 1:
                    return y.fn.call(y.context),
                    !0;
                case 2:
                    return y.fn.call(y.context, f),
                    !0;
                case 3:
                    return y.fn.call(y.context, f, m),
                    !0;
                case 4:
                    return y.fn.call(y.context, f, m, g),
                    !0;
                case 5:
                    return y.fn.call(y.context, f, m, g, v),
                    !0;
                case 6:
                    return y.fn.call(y.context, f, m, g, v, S),
                    !0
                }
                for (R = 1,
                N = new Array(A - 1); R < A; R++)
                    N[R - 1] = arguments[R];
                y.fn.apply(y.context, N)
            } else {
                var L = y.length, D;
                for (R = 0; R < L; R++)
                    switch (y[R].once && this.removeListener(h, y[R].fn, void 0, !0),
                    A) {
                    case 1:
                        y[R].fn.call(y[R].context);
                        break;
                    case 2:
                        y[R].fn.call(y[R].context, f);
                        break;
                    case 3:
                        y[R].fn.call(y[R].context, f, m);
                        break;
                    case 4:
                        y[R].fn.call(y[R].context, f, m, g);
                        break;
                    default:
                        if (!N)
                            for (D = 1,
                            N = new Array(A - 1); D < A; D++)
                                N[D - 1] = arguments[D];
                        y[R].fn.apply(y[R].context, N)
                    }
            }
            return !0
        }
        ,
        l.prototype.on = function(h, f, m) {
            return i(this, h, f, m, !1)
        }
        ,
        l.prototype.once = function(h, f, m) {
            return i(this, h, f, m, !0)
        }
        ,
        l.prototype.removeListener = function(h, f, m, g) {
            var v = t ? t + h : h;
            if (!this._events[v])
                return this;
            if (!f)
                return c(this, v),
                this;
            var S = this._events[v];
            if (S.fn)
                S.fn === f && (!g || S.once) && (!m || S.context === m) && c(this, v);
            else {
                for (var E = 0, y = [], A = S.length; E < A; E++)
                    (S[E].fn !== f || g && !S[E].once || m && S[E].context !== m) && y.push(S[E]);
                y.length ? this._events[v] = y.length === 1 ? y[0] : y : c(this, v)
            }
            return this
        }
        ,
        l.prototype.removeAllListeners = function(h) {
            var f;
            return h ? (f = t ? t + h : h,
            this._events[f] && c(this, f)) : (this._events = new n,
            this._eventsCount = 0),
            this
        }
        ,
        l.prototype.off = l.prototype.removeListener,
        l.prototype.addListener = l.prototype.on,
        l.prefixed = t,
        l.EventEmitter = l,
        s.exports = l
    }
    )(eventemitter3);
    const EventEmitter = eventemitter3.exports
      , DATA_MASK = "data-bytereplay-mask"
      , DATA_MASK_MAP = {
        ignore: "ignore",
        name: "name"
    };
    function shouldIgnore(s) {
        return !!(s && isHTMLElement(s) && s.getAttribute(DATA_MASK) === DATA_MASK_MAP.ignore)
    }
    const DEFAULT_ENV = "PROD-INTERNAL"
      , AVAILABLE_ENV_TYPE = ["BOE", "DEV", "PROD-INTERNAL", "PROD-PUBLIC", "PROD-SG", "PROD-VA", "PROD-PUBLIC-VA"];
    let _currentEnv = DEFAULT_ENV;
    function set(s) {
        const r = parse(s);
        if (r) {
            _currentEnv = r;
            return
        }
        throw new Error('Invalid environment, it must be one of the following: "BOE", "DEV", "PROD-INTERNAL" or "PROD-PUBLIC".')
    }
    function get() {
        return _currentEnv
    }
    function parse(s) {
        if (isString(s)) {
            const r = s.trim().toUpperCase();
            if (includes(AVAILABLE_ENV_TYPE, r))
                return r
        }
    }
    const e = Object.freeze(Object.defineProperty({
        __proto__: null,
        set,
        get
    }, Symbol.toStringTag, {
        value: "Module"
    }));
    class Environment {
        constructor(r) {
            __publicField(this, "_domains", ["bytedance", "zijieapi", "byteintl"]),
            __publicField(this, "DEFAULT_ENV_TYPE", "PROD-INTERNAL"),
            __publicField(this, "AVAILABLE_ENV_TYPE", ["BOE", "DEV", "PROD-INTERNAL", "PROD-PUBLIC", "PROD-SG", "PROD-VA", "PROD-PUBLIC-VA"]),
            __publicField(this, "_type", this.DEFAULT_ENV_TYPE),
            __publicField(this, "_baseURL");
            var t;
            this.baseURL = r == null ? void 0 : r.baseURL,
            this.type = (t = r == null ? void 0 : r.type) != null ? t : get()
        }
        set type(r) {
            if (r != null) {
                const t = this.parse(r);
                if (t) {
                    this._type = t;
                    return
                }
                throw new Error('Invalid environment type, it must be one of the following: "BOE", "DEV", "PROD-INTERNAL" or "PROD-PUBLIC".')
            }
        }
        get type() {
            return this._type
        }
        set baseURL(r) {
            if (r == null || isEmptyString(r))
                this._baseURL = void 0;
            else
                try {
                    this._baseURL = new URL(r).href
                } catch {
                    throw new RuntimeError("Invalid base URL: " + r)
                }
        }
        get baseURL() {
            return this._baseURL != null ? this._baseURL : this.isBOE() ? `https://bytereplay-boe.${this._domains[0]}.net/` : this.isDev() ? "http://localhost:6789/" : this.isProdPublic() ? "https://bytereplay." + this._domains[1] + ".com/" : this.isProdSG() ? "https://bytereplay-sg." + this._domains[2] + ".net/" : this.isProdVA() ? "https://bytereplay-va." + this._domains[2] + ".net/" : this.isProdPublicVA() ? "https://bytereplay-va." + this._domains[2] + "api.com/" : `https://bytereplay.${this._domains[0]}.net/`
        }
        parse(r) {
            if (isString(r)) {
                const t = r.trim().toUpperCase();
                if (includes(this.AVAILABLE_ENV_TYPE, t))
                    return t
            }
        }
        isBOE() {
            return this._type === "BOE"
        }
        isDev() {
            return this._type === "DEV"
        }
        isProdInternal() {
            return this._type === "PROD-INTERNAL"
        }
        isProdPublic() {
            return this._type === "PROD-PUBLIC"
        }
        isProdSG() {
            return this._type === "PROD-SG"
        }
        isProdVA() {
            return this._type === "PROD-VA"
        }
        isProdPublicVA() {
            return this._type === "PROD-PUBLIC-VA"
        }
        toOptions() {
            return {
                type: this.type,
                baseURL: this.baseURL
            }
        }
    }
    const version = "1.0.32.6"
      , env = e;
    var HeartbeatSignal = (s => (s.Ping = "ping",
    s.Pong = "pong",
    s))(HeartbeatSignal || {});
    const _Heartbeat = class extends EventEmitter {
        constructor(s, r) {
            super(),
            __publicField(this, "_options"),
            __publicField(this, "_timer"),
            __publicField(this, "_handleMessage", t => {
                t === HeartbeatSignal.Ping && (this._pong(),
                this._resetTimeout())
            }
            ),
            __publicField(this, "_handleTimeout", () => {
                this.stop(),
                this.emit("timeout")
            }
            ),
            this.connection = s,
            this._options = {
                ..._Heartbeat.DEFAULT_OPTIONS,
                ...r
            }
        }
        start() {
            this.connection.on("message", this._handleMessage),
            this._startTimeout()
        }
        stop() {
            this._clearTimeout(),
            this.connection.off("message", this._handleMessage)
        }
        _pong() {
            this.connection.isReady && this.connection.send(HeartbeatSignal.Pong)
        }
        _startTimeout() {
            this._resetTimeout()
        }
        _resetTimeout() {
            this._clearTimeout(),
            this._timer = setTimeout(this._handleTimeout, this._options.timeout)
        }
        _clearTimeout() {
            clearTimeout(this._timer),
            this._timer = void 0
        }
    }
    ;
    let Heartbeat = _Heartbeat;
    __publicField(Heartbeat, "DEFAULT_OPTIONS", {
        timeout: 12e3
    });
    const CustomSnapshot = Symbol("bytereplay.CustomSnapshot");
    var IFrameActionType = (s => (s.StartRecording = "startRecording",
    s.StopRecording = "stopRecording",
    s.Unload = "unload",
    s.Load = "load",
    s))(IFrameActionType || {});
    const IFrameEvent = "ReplayIFrameEvent";
    function buildIFrameEvent(s) {
        return new CustomEvent(IFrameEvent,{
            detail: s
        })
    }
    var IFrameState = (s => (s.Loading = "loading",
    s.Loaded = "loaded",
    s.Recording = "recording",
    s))(IFrameState || {})
      , TrackerEventType = (s => (s[s.HTMLSnapshot = 101] = "HTMLSnapshot",
    s[s.HTMLMutations = 102] = "HTMLMutations",
    s[s.HTMLScroll = 103] = "HTMLScroll",
    s[s.HTMLFocus = 104] = "HTMLFocus",
    s[s.HTMLBlur = 105] = "HTMLBlur",
    s[s.HTMLValueChange = 106] = "HTMLValueChange",
    s[s.HTMLResize = 110] = "HTMLResize",
    s[s.HTMLIncrementalSnapshot = 111] = "HTMLIncrementalSnapshot",
    s[s.HTMLNavigation = 115] = "HTMLNavigation",
    s[s.HTMLCanvas = 120] = "HTMLCanvas",
    s[s.HTMLImage = 122] = "HTMLImage",
    s[s.HTMLIFrame = 130] = "HTMLIFrame",
    s[s.MouseMove = 201] = "MouseMove",
    s[s.MouseDown = 202] = "MouseDown",
    s[s.MouseUp = 203] = "MouseUp",
    s[s.KeyDown = 301] = "KeyDown",
    s[s.ConsoleAssert = 401] = "ConsoleAssert",
    s[s.ConsoleDebug = 402] = "ConsoleDebug",
    s[s.ConsoleDir = 403] = "ConsoleDir",
    s[s.ConsoleDirxml = 404] = "ConsoleDirxml",
    s[s.ConsoleError = 405] = "ConsoleError",
    s[s.ConsoleInfo = 406] = "ConsoleInfo",
    s[s.ConsoleLog = 407] = "ConsoleLog",
    s[s.ConsoleTable = 408] = "ConsoleTable",
    s[s.ConsoleTrace = 409] = "ConsoleTrace",
    s[s.ConsoleWarn = 410] = "ConsoleWarn",
    s[s.ERROR_SCRIPT = 501] = "ERROR_SCRIPT",
    s[s.ERROR_RUNTIME = 502] = "ERROR_RUNTIME",
    s[s.ERROR_NOTFOUND = 503] = "ERROR_NOTFOUND",
    s[s.ERROR_PROMISEREJECTION = 504] = "ERROR_PROMISEREJECTION",
    s[s.NETWORK_SEND = 601] = "NETWORK_SEND",
    s[s.NETWORK_DONE = 602] = "NETWORK_DONE",
    s[s.NETWORK_ABORT = 603] = "NETWORK_ABORT",
    s[s.NETWORK_ERROR = 604] = "NETWORK_ERROR",
    s[s.NETWORK_TIMEOUT = 605] = "NETWORK_TIMEOUT",
    s))(TrackerEventType || {});
    class Sampler$1 {
        constructor(r=1, t) {
            __publicField(this, "_data", new Map),
            __publicField(this, "_lastTick", 0),
            __publicField(this, "_isStopped", !0),
            __publicField(this, "_handleFrameCallback", n => {
                if (n.timeRemaining() <= 0) {
                    this._nextFrame();
                    return
                }
                (this._lastTick === 0 || now() - this._lastTick >= 1e3 / this.samplingFrequency) && this._tick(),
                this._data.size > 0 ? this._nextFrame() : this.stop()
            }
            ),
            this.samplingFrequency = r,
            this.callback = t
        }
        get isStopped() {
            return this._isStopped
        }
        sample(r, t) {
            this._data.set(r, t),
            this._isStopped && this.start()
        }
        start() {
            this._lastTick = 0,
            this._isStopped = !1,
            this._nextFrame()
        }
        stop() {
            this._isStopped = !0,
            this.flush()
        }
        flush() {
            if (this._data.size) {
                for (const [r,t] of this._data.entries())
                    this.callback(r, t);
                this._data.clear()
            }
        }
        _tick() {
            this._lastTick = now(),
            this.flush()
        }
        _nextFrame() {
            ric(this._handleFrameCallback, {
                timeout: 1e3 / this.samplingFrequency
            })
        }
    }
    var extendStatics = function(s, r) {
        return extendStatics = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(t, n) {
            t.__proto__ = n
        }
        || function(t, n) {
            for (var o in n)
                Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o])
        }
        ,
        extendStatics(s, r)
    };
    function __extends(s, r) {
        if (typeof r != "function" && r !== null)
            throw new TypeError("Class extends value " + String(r) + " is not a constructor or null");
        extendStatics(s, r);
        function t() {
            this.constructor = s
        }
        s.prototype = r === null ? Object.create(r) : (t.prototype = r.prototype,
        new t)
    }
    function __values(s) {
        var r = typeof Symbol == "function" && Symbol.iterator
          , t = r && s[r]
          , n = 0;
        if (t)
            return t.call(s);
        if (s && typeof s.length == "number")
            return {
                next: function() {
                    return s && n >= s.length && (s = void 0),
                    {
                        value: s && s[n++],
                        done: !s
                    }
                }
            };
        throw new TypeError(r ? "Object is not iterable." : "Symbol.iterator is not defined.")
    }
    function __read(s, r) {
        var t = typeof Symbol == "function" && s[Symbol.iterator];
        if (!t)
            return s;
        var n = t.call(s), o, i = [], c;
        try {
            for (; (r === void 0 || r-- > 0) && !(o = n.next()).done; )
                i.push(o.value)
        } catch (l) {
            c = {
                error: l
            }
        } finally {
            try {
                o && !o.done && (t = n.return) && t.call(n)
            } finally {
                if (c)
                    throw c.error
            }
        }
        return i
    }
    function __spreadArray(s, r, t) {
        if (t || arguments.length === 2)
            for (var n = 0, o = r.length, i; n < o; n++)
                (i || !(n in r)) && (i || (i = Array.prototype.slice.call(r, 0, n)),
                i[n] = r[n]);
        return s.concat(i || Array.prototype.slice.call(r))
    }
    function isFunction(s) {
        return typeof s == "function"
    }
    function createErrorClass(s) {
        var r = function(n) {
            Error.call(n),
            n.stack = new Error().stack
        }
          , t = s(r);
        return t.prototype = Object.create(Error.prototype),
        t.prototype.constructor = t,
        t
    }
    var UnsubscriptionError = createErrorClass(function(s) {
        return function(t) {
            s(this),
            this.message = t ? t.length + ` errors occurred during unsubscription:
` + t.map(function(n, o) {
                return o + 1 + ") " + n.toString()
            }).join(`
  `) : "",
            this.name = "UnsubscriptionError",
            this.errors = t
        }
    });
    function arrRemove(s, r) {
        if (s) {
            var t = s.indexOf(r);
            0 <= t && s.splice(t, 1)
        }
    }
    var Subscription = function() {
        function s(r) {
            this.initialTeardown = r,
            this.closed = !1,
            this._parentage = null,
            this._finalizers = null
        }
        return s.prototype.unsubscribe = function() {
            var r, t, n, o, i;
            if (!this.closed) {
                this.closed = !0;
                var c = this._parentage;
                if (c)
                    if (this._parentage = null,
                    Array.isArray(c))
                        try {
                            for (var l = __values(c), d = l.next(); !d.done; d = l.next()) {
                                var h = d.value;
                                h.remove(this)
                            }
                        } catch (E) {
                            r = {
                                error: E
                            }
                        } finally {
                            try {
                                d && !d.done && (t = l.return) && t.call(l)
                            } finally {
                                if (r)
                                    throw r.error
                            }
                        }
                    else
                        c.remove(this);
                var f = this.initialTeardown;
                if (isFunction(f))
                    try {
                        f()
                    } catch (E) {
                        i = E instanceof UnsubscriptionError ? E.errors : [E]
                    }
                var m = this._finalizers;
                if (m) {
                    this._finalizers = null;
                    try {
                        for (var g = __values(m), v = g.next(); !v.done; v = g.next()) {
                            var S = v.value;
                            try {
                                execFinalizer(S)
                            } catch (E) {
                                i = i != null ? i : [],
                                E instanceof UnsubscriptionError ? i = __spreadArray(__spreadArray([], __read(i)), __read(E.errors)) : i.push(E)
                            }
                        }
                    } catch (E) {
                        n = {
                            error: E
                        }
                    } finally {
                        try {
                            v && !v.done && (o = g.return) && o.call(g)
                        } finally {
                            if (n)
                                throw n.error
                        }
                    }
                }
                if (i)
                    throw new UnsubscriptionError(i)
            }
        }
        ,
        s.prototype.add = function(r) {
            var t;
            if (r && r !== this)
                if (this.closed)
                    execFinalizer(r);
                else {
                    if (r instanceof s) {
                        if (r.closed || r._hasParent(this))
                            return;
                        r._addParent(this)
                    }
                    (this._finalizers = (t = this._finalizers) !== null && t !== void 0 ? t : []).push(r)
                }
        }
        ,
        s.prototype._hasParent = function(r) {
            var t = this._parentage;
            return t === r || Array.isArray(t) && t.includes(r)
        }
        ,
        s.prototype._addParent = function(r) {
            var t = this._parentage;
            this._parentage = Array.isArray(t) ? (t.push(r),
            t) : t ? [t, r] : r
        }
        ,
        s.prototype._removeParent = function(r) {
            var t = this._parentage;
            t === r ? this._parentage = null : Array.isArray(t) && arrRemove(t, r)
        }
        ,
        s.prototype.remove = function(r) {
            var t = this._finalizers;
            t && arrRemove(t, r),
            r instanceof s && r._removeParent(this)
        }
        ,
        s.EMPTY = function() {
            var r = new s;
            return r.closed = !0,
            r
        }(),
        s
    }()
      , EMPTY_SUBSCRIPTION = Subscription.EMPTY;
    function isSubscription(s) {
        return s instanceof Subscription || s && "closed"in s && isFunction(s.remove) && isFunction(s.add) && isFunction(s.unsubscribe)
    }
    function execFinalizer(s) {
        isFunction(s) ? s() : s.unsubscribe()
    }
    var config = {
        onUnhandledError: null,
        onStoppedNotification: null,
        Promise: void 0,
        useDeprecatedSynchronousErrorHandling: !1,
        useDeprecatedNextContext: !1
    }
      , timeoutProvider = {
        setTimeout: function(s, r) {
            for (var t = [], n = 2; n < arguments.length; n++)
                t[n - 2] = arguments[n];
            return setTimeout.apply(void 0, __spreadArray([s, r], __read(t)))
        },
        clearTimeout: function(s) {
            return clearTimeout(s)
        },
        delegate: void 0
    };
    function reportUnhandledError(s) {
        timeoutProvider.setTimeout(function() {
            throw s
        })
    }
    function noop() {}
    function errorContext(s) {
        s()
    }
    var Subscriber = function(s) {
        __extends(r, s);
        function r(t) {
            var n = s.call(this) || this;
            return n.isStopped = !1,
            t ? (n.destination = t,
            isSubscription(t) && t.add(n)) : n.destination = EMPTY_OBSERVER,
            n
        }
        return r.create = function(t, n, o) {
            return new SafeSubscriber(t,n,o)
        }
        ,
        r.prototype.next = function(t) {
            this.isStopped || this._next(t)
        }
        ,
        r.prototype.error = function(t) {
            this.isStopped || (this.isStopped = !0,
            this._error(t))
        }
        ,
        r.prototype.complete = function() {
            this.isStopped || (this.isStopped = !0,
            this._complete())
        }
        ,
        r.prototype.unsubscribe = function() {
            this.closed || (this.isStopped = !0,
            s.prototype.unsubscribe.call(this),
            this.destination = null)
        }
        ,
        r.prototype._next = function(t) {
            this.destination.next(t)
        }
        ,
        r.prototype._error = function(t) {
            try {
                this.destination.error(t)
            } finally {
                this.unsubscribe()
            }
        }
        ,
        r.prototype._complete = function() {
            try {
                this.destination.complete()
            } finally {
                this.unsubscribe()
            }
        }
        ,
        r
    }(Subscription)
      , _bind = Function.prototype.bind;
    function bind(s, r) {
        return _bind.call(s, r)
    }
    var ConsumerObserver = function() {
        function s(r) {
            this.partialObserver = r
        }
        return s.prototype.next = function(r) {
            var t = this.partialObserver;
            if (t.next)
                try {
                    t.next(r)
                } catch (n) {
                    handleUnhandledError(n)
                }
        }
        ,
        s.prototype.error = function(r) {
            var t = this.partialObserver;
            if (t.error)
                try {
                    t.error(r)
                } catch (n) {
                    handleUnhandledError(n)
                }
            else
                handleUnhandledError(r)
        }
        ,
        s.prototype.complete = function() {
            var r = this.partialObserver;
            if (r.complete)
                try {
                    r.complete()
                } catch (t) {
                    handleUnhandledError(t)
                }
        }
        ,
        s
    }()
      , SafeSubscriber = function(s) {
        __extends(r, s);
        function r(t, n, o) {
            var i = s.call(this) || this, c;
            if (isFunction(t) || !t)
                c = {
                    next: t != null ? t : void 0,
                    error: n != null ? n : void 0,
                    complete: o != null ? o : void 0
                };
            else {
                var l;
                i && config.useDeprecatedNextContext ? (l = Object.create(t),
                l.unsubscribe = function() {
                    return i.unsubscribe()
                }
                ,
                c = {
                    next: t.next && bind(t.next, l),
                    error: t.error && bind(t.error, l),
                    complete: t.complete && bind(t.complete, l)
                }) : c = t
            }
            return i.destination = new ConsumerObserver(c),
            i
        }
        return r
    }(Subscriber);
    function handleUnhandledError(s) {
        reportUnhandledError(s)
    }
    function defaultErrorHandler(s) {
        throw s
    }
    var EMPTY_OBSERVER = {
        closed: !0,
        next: noop,
        error: defaultErrorHandler,
        complete: noop
    }
      , observable = function() {
        return typeof Symbol == "function" && Symbol.observable || "@@observable"
    }();
    function identity(s) {
        return s
    }
    function pipeFromArray(s) {
        return s.length === 0 ? identity : s.length === 1 ? s[0] : function(t) {
            return s.reduce(function(n, o) {
                return o(n)
            }, t)
        }
    }
    var Observable = function() {
        function s(r) {
            r && (this._subscribe = r)
        }
        return s.prototype.lift = function(r) {
            var t = new s;
            return t.source = this,
            t.operator = r,
            t
        }
        ,
        s.prototype.subscribe = function(r, t, n) {
            var o = this
              , i = isSubscriber(r) ? r : new SafeSubscriber(r,t,n);
            return errorContext(function() {
                var c = o
                  , l = c.operator
                  , d = c.source;
                i.add(l ? l.call(i, d) : d ? o._subscribe(i) : o._trySubscribe(i))
            }),
            i
        }
        ,
        s.prototype._trySubscribe = function(r) {
            try {
                return this._subscribe(r)
            } catch (t) {
                r.error(t)
            }
        }
        ,
        s.prototype.forEach = function(r, t) {
            var n = this;
            return t = getPromiseCtor(t),
            new t(function(o, i) {
                var c = new SafeSubscriber({
                    next: function(l) {
                        try {
                            r(l)
                        } catch (d) {
                            i(d),
                            c.unsubscribe()
                        }
                    },
                    error: i,
                    complete: o
                });
                n.subscribe(c)
            }
            )
        }
        ,
        s.prototype._subscribe = function(r) {
            var t;
            return (t = this.source) === null || t === void 0 ? void 0 : t.subscribe(r)
        }
        ,
        s.prototype[observable] = function() {
            return this
        }
        ,
        s.prototype.pipe = function() {
            for (var r = [], t = 0; t < arguments.length; t++)
                r[t] = arguments[t];
            return pipeFromArray(r)(this)
        }
        ,
        s.prototype.toPromise = function(r) {
            var t = this;
            return r = getPromiseCtor(r),
            new r(function(n, o) {
                var i;
                t.subscribe(function(c) {
                    return i = c
                }, function(c) {
                    return o(c)
                }, function() {
                    return n(i)
                })
            }
            )
        }
        ,
        s.create = function(r) {
            return new s(r)
        }
        ,
        s
    }();
    function getPromiseCtor(s) {
        var r;
        return (r = s != null ? s : config.Promise) !== null && r !== void 0 ? r : Promise
    }
    function isObserver(s) {
        return s && isFunction(s.next) && isFunction(s.error) && isFunction(s.complete)
    }
    function isSubscriber(s) {
        return s && s instanceof Subscriber || isObserver(s) && isSubscription(s)
    }
    var ObjectUnsubscribedError = createErrorClass(function(s) {
        return function() {
            s(this),
            this.name = "ObjectUnsubscribedError",
            this.message = "object unsubscribed"
        }
    })
      , Subject = function(s) {
        __extends(r, s);
        function r() {
            var t = s.call(this) || this;
            return t.closed = !1,
            t.currentObservers = null,
            t.observers = [],
            t.isStopped = !1,
            t.hasError = !1,
            t.thrownError = null,
            t
        }
        return r.prototype.lift = function(t) {
            var n = new AnonymousSubject(this,this);
            return n.operator = t,
            n
        }
        ,
        r.prototype._throwIfClosed = function() {
            if (this.closed)
                throw new ObjectUnsubscribedError
        }
        ,
        r.prototype.next = function(t) {
            var n = this;
            errorContext(function() {
                var o, i;
                if (n._throwIfClosed(),
                !n.isStopped) {
                    n.currentObservers || (n.currentObservers = Array.from(n.observers));
                    try {
                        for (var c = __values(n.currentObservers), l = c.next(); !l.done; l = c.next()) {
                            var d = l.value;
                            d.next(t)
                        }
                    } catch (h) {
                        o = {
                            error: h
                        }
                    } finally {
                        try {
                            l && !l.done && (i = c.return) && i.call(c)
                        } finally {
                            if (o)
                                throw o.error
                        }
                    }
                }
            })
        }
        ,
        r.prototype.error = function(t) {
            var n = this;
            errorContext(function() {
                if (n._throwIfClosed(),
                !n.isStopped) {
                    n.hasError = n.isStopped = !0,
                    n.thrownError = t;
                    for (var o = n.observers; o.length; )
                        o.shift().error(t)
                }
            })
        }
        ,
        r.prototype.complete = function() {
            var t = this;
            errorContext(function() {
                if (t._throwIfClosed(),
                !t.isStopped) {
                    t.isStopped = !0;
                    for (var n = t.observers; n.length; )
                        n.shift().complete()
                }
            })
        }
        ,
        r.prototype.unsubscribe = function() {
            this.isStopped = this.closed = !0,
            this.observers = this.currentObservers = null
        }
        ,
        Object.defineProperty(r.prototype, "observed", {
            get: function() {
                var t;
                return ((t = this.observers) === null || t === void 0 ? void 0 : t.length) > 0
            },
            enumerable: !1,
            configurable: !0
        }),
        r.prototype._trySubscribe = function(t) {
            return this._throwIfClosed(),
            s.prototype._trySubscribe.call(this, t)
        }
        ,
        r.prototype._subscribe = function(t) {
            return this._throwIfClosed(),
            this._checkFinalizedStatuses(t),
            this._innerSubscribe(t)
        }
        ,
        r.prototype._innerSubscribe = function(t) {
            var n = this
              , o = this
              , i = o.hasError
              , c = o.isStopped
              , l = o.observers;
            return i || c ? EMPTY_SUBSCRIPTION : (this.currentObservers = null,
            l.push(t),
            new Subscription(function() {
                n.currentObservers = null,
                arrRemove(l, t)
            }
            ))
        }
        ,
        r.prototype._checkFinalizedStatuses = function(t) {
            var n = this
              , o = n.hasError
              , i = n.thrownError
              , c = n.isStopped;
            o ? t.error(i) : c && t.complete()
        }
        ,
        r.prototype.asObservable = function() {
            var t = new Observable;
            return t.source = this,
            t
        }
        ,
        r.create = function(t, n) {
            return new AnonymousSubject(t,n)
        }
        ,
        r
    }(Observable)
      , AnonymousSubject = function(s) {
        __extends(r, s);
        function r(t, n) {
            var o = s.call(this) || this;
            return o.destination = t,
            o.source = n,
            o
        }
        return r.prototype.next = function(t) {
            var n, o;
            (o = (n = this.destination) === null || n === void 0 ? void 0 : n.next) === null || o === void 0 || o.call(n, t)
        }
        ,
        r.prototype.error = function(t) {
            var n, o;
            (o = (n = this.destination) === null || n === void 0 ? void 0 : n.error) === null || o === void 0 || o.call(n, t)
        }
        ,
        r.prototype.complete = function() {
            var t, n;
            (n = (t = this.destination) === null || t === void 0 ? void 0 : t.complete) === null || n === void 0 || n.call(t)
        }
        ,
        r.prototype._subscribe = function(t) {
            var n, o;
            return (o = (n = this.source) === null || n === void 0 ? void 0 : n.subscribe(t)) !== null && o !== void 0 ? o : EMPTY_SUBSCRIPTION
        }
        ,
        r
    }(Subject);
    const CTX_API = ["arc", "arcTo", "beginPath", "bezierCurveTo", "clearRect", "clip", "closePath", "createConicGradient", "createImageData", "createLinearGradient", "createPattern", "createRadialGradient", "drawFocusIfNeeded", "drawImage", "ellipse", "fill", "fillRect", "fillText", "getContextAttributes", "getImageData", "getLineDash", "getTransform", "isContextLost", "isPointInPath", "isPointInStroke", "lineTo", "measureText", "moveTo", "putImageData", "quadraticCurveTo", "rect", "reset", "resetTransform", "restore", "rotate", "roundRect", "save", "scale", "scrollPathIntoView", "setLineDash", "setTransform", "stroke", "strokeRect", "strokeText", "transform", "translate"]
      , CTX_API_ENCODER = {
        setTransform: 0,
        lineTo: 1,
        beginPath: 2,
        fill: 3,
        setAttr: 4,
        stroke: 5,
        clip: 6,
        save: 7,
        restore: 8,
        fillText: 9,
        fillRect: 10,
        arc: 11,
        arcTo: 12,
        bezierCurveTo: 13,
        clearRect: 14,
        closePath: 15,
        createConicGradient: 16,
        createImageData: 17,
        createLinearGradient: 18,
        createPattern: 19,
        createRadialGradient: 20,
        drawFocusIfNeeded: 21,
        drawImage: 22,
        ellipse: 23,
        getContextAttributes: 24,
        getImageData: 25,
        getLineDash: 26,
        getTransform: 27,
        isContextLost: 28,
        isPointInPath: 29,
        isPointInStroke: 30,
        measureText: 31,
        moveTo: 32,
        putImageData: 33,
        quadraticCurveTo: 34,
        rect: 35,
        reset: 36,
        resetTransform: 37,
        rotate: 38,
        roundRect: 39,
        scale: 40,
        scrollPathIntoView: 41,
        setLineDash: 42,
        strokeRect: 43,
        strokeText: 44,
        transform: 45,
        translate: 46,
        snapshot: 47
    }
      , CTX_API_DECODER = Object.keys(CTX_API_ENCODER)
      , CTX_DRAWING_API = {
        arc: !1,
        arcTo: !1,
        beginPath: !0,
        bezierCurveTo: !1,
        clearRect: !0,
        clip: !1,
        closePath: !0,
        createConicGradient: !1,
        createImageData: !1,
        createLinearGradient: !1,
        createPattern: !1,
        createRadialGradient: !1,
        drawFocusIfNeeded: !1,
        drawImage: !0,
        ellipse: !1,
        fill: !0,
        fillRect: !0,
        fillText: !0,
        getContextAttributes: !1,
        getImageData: !1,
        getLineDash: !1,
        getTransform: !1,
        isContextLost: !1,
        isPointInPath: !1,
        isPointInStroke: !1,
        lineTo: !1,
        measureText: !1,
        moveTo: !1,
        putImageData: !1,
        quadraticCurveTo: !1,
        rect: !1,
        reset: !1,
        resetTransform: !1,
        restore: !1,
        rotate: !1,
        roundRect: !1,
        save: !1,
        scale: !1,
        scrollPathIntoView: !1,
        setLineDash: !1,
        setTransform: !1,
        stroke: !0,
        strokeRect: !0,
        strokeText: !0,
        transform: !1,
        translate: !1
    }
      , CTX_SETTING_API = ["resetTransform", "setLineDash", "setTransform"]
      , CTX_ATTR = ["direction", "fillStyle", "filter", "font", "globalAlpha", "globalCompositeOperation", "imageSmoothingEnabled", "imageSmoothingQuality", "lineCap", "lineDashOffset", "lineJoin", "lineWidth", "miterLimit", "shadowBlur", "shadowColor", "shadowOffsetX", "shadowOffsetY", "strokeStyle", "textAlign", "textBaseline"]
      , CTX_ATTR_ENCODER = {
        textRendering: 0,
        fillStyle: 1,
        strokeStyle: 2,
        font: 3,
        textAlign: 4,
        wordSpacing: 5,
        lineCap: 6,
        lineDashOffset: 7,
        lineJoin: 8,
        letterSpacing: 9,
        direction: 10,
        filter: 11,
        fontKerning: 12,
        fontStretch: 13,
        fontVariantCaps: 14,
        lineWidth: 15,
        globalCompositeOperation: 16,
        imageSmoothingEnabled: 17,
        imageSmoothingQuality: 18,
        miterLimit: 19,
        shadowBlur: 20,
        shadowColor: 21,
        shadowOffsetX: 22,
        shadowOffsetY: 23,
        textBaseline: 24,
        globalAlpha: 25
    }
      , CTX_ATTR_DECODER = Object.keys(CTX_ATTR_ENCODER)
      , LONG_STR_ATTR = ["fillStyle", "strokeStyle", "font", "textAlign"]
      , pi = Math.PI
      , tau = 2 * pi
      , epsilon = 1e-6
      , tauEpsilon = tau - epsilon;
    function append(s) {
        this._ += s[0];
        for (let r = 1, t = s.length; r < t; ++r)
            this._ += arguments[r] + s[r]
    }
    function appendRound(s) {
        let r = Math.floor(s);
        if (!(r >= 0))
            throw new Error(`invalid digits: ${s}`);
        if (r > 15)
            return append;
        const t = 10 ** r;
        return function(n) {
            this._ += n[0];
            for (let o = 1, i = n.length; o < i; ++o)
                this._ += Math.round(arguments[o] * t) / t + n[o]
        }
    }
    class Path {
        constructor(r) {
            this._x0 = this._y0 = this._x1 = this._y1 = null,
            this._ = "",
            this._append = r == null ? append : appendRound(r)
        }
        moveTo(r, t) {
            this._append`M${this._x0 = this._x1 = +r},${this._y0 = this._y1 = +t}`
        }
        closePath() {
            this._x1 !== null && (this._x1 = this._x0,
            this._y1 = this._y0,
            this._append`Z`)
        }
        lineTo(r, t) {
            this._append`L${this._x1 = +r},${this._y1 = +t}`
        }
        quadraticCurveTo(r, t, n, o) {
            this._append`Q${+r},${+t},${this._x1 = +n},${this._y1 = +o}`
        }
        bezierCurveTo(r, t, n, o, i, c) {
            this._append`C${+r},${+t},${+n},${+o},${this._x1 = +i},${this._y1 = +c}`
        }
        arcTo(r, t, n, o, i) {
            if (r = +r,
            t = +t,
            n = +n,
            o = +o,
            i = +i,
            i < 0)
                throw new Error(`negative radius: ${i}`);
            let c = this._x1
              , l = this._y1
              , d = n - r
              , h = o - t
              , f = c - r
              , m = l - t
              , g = f * f + m * m;
            if (this._x1 === null)
                this._append`M${this._x1 = r},${this._y1 = t}`;
            else if (g > epsilon)
                if (!(Math.abs(m * d - h * f) > epsilon) || !i)
                    this._append`L${this._x1 = r},${this._y1 = t}`;
                else {
                    let v = n - c
                      , S = o - l
                      , E = d * d + h * h
                      , y = v * v + S * S
                      , A = Math.sqrt(E)
                      , N = Math.sqrt(g)
                      , R = i * Math.tan((pi - Math.acos((E + g - y) / (2 * A * N))) / 2)
                      , L = R / N
                      , D = R / A;
                    Math.abs(L - 1) > epsilon && this._append`L${r + L * f},${t + L * m}`,
                    this._append`A${i},${i},0,0,${+(m * v > f * S)},${this._x1 = r + D * d},${this._y1 = t + D * h}`
                }
        }
        arc(r, t, n, o, i, c) {
            if (r = +r,
            t = +t,
            n = +n,
            c = !!c,
            n < 0)
                throw new Error(`negative radius: ${n}`);
            let l = n * Math.cos(o)
              , d = n * Math.sin(o)
              , h = r + l
              , f = t + d
              , m = 1 ^ c
              , g = c ? o - i : i - o;
            this._x1 === null ? this._append`M${h},${f}` : (Math.abs(this._x1 - h) > epsilon || Math.abs(this._y1 - f) > epsilon) && this._append`L${h},${f}`,
            n && (g < 0 && (g = g % tau + tau),
            g > tauEpsilon ? this._append`A${n},${n},0,1,${m},${r - l},${t - d}A${n},${n},0,1,${m},${this._x1 = h},${this._y1 = f}` : g > epsilon && this._append`A${n},${n},0,${+(g >= pi)},${m},${this._x1 = r + n * Math.cos(i)},${this._y1 = t + n * Math.sin(i)}`)
        }
        rect(r, t, n, o) {
            this._append`M${this._x0 = this._x1 = +r},${this._y0 = this._y1 = +t}h${n = +n}v${+o}h${-n}Z`
        }
        toString() {
            return this._
        }
    }
    function path() {
        return new Path
    }
    path.prototype = Path.prototype;
    function Transform(s, r, t) {
        this.k = s,
        this.x = r,
        this.y = t
    }
    Transform.prototype = {
        constructor: Transform,
        scale: function(s) {
            return s === 1 ? this : new Transform(this.k * s,this.x,this.y)
        },
        translate: function(s, r) {
            return s === 0 & r === 0 ? this : new Transform(this.k,this.x + this.k * s,this.y + this.k * r)
        },
        apply: function(s) {
            return [s[0] * this.k + this.x, s[1] * this.k + this.y]
        },
        applyX: function(s) {
            return s * this.k + this.x
        },
        applyY: function(s) {
            return s * this.k + this.y
        },
        invert: function(s) {
            return [(s[0] - this.x) / this.k, (s[1] - this.y) / this.k]
        },
        invertX: function(s) {
            return (s - this.x) / this.k
        },
        invertY: function(s) {
            return (s - this.y) / this.k
        },
        rescaleX: function(s) {
            return s.copy().domain(s.range().map(this.invertX, this).map(s.invert, s))
        },
        rescaleY: function(s) {
            return s.copy().domain(s.range().map(this.invertY, this).map(s.invert, s))
        },
        toString: function() {
            return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")"
        }
    },
    new Transform(1,0,0),
    Transform.prototype;
    class ProxyPath2D extends Path2D {
        constructor(r) {
            super(r),
            this.path = r,
            this._d3Path = path();
            const t = Object.getPrototypeOf(this)
              , n = Object.getPrototypeOf(t)
              , o = Object.getOwnPropertyDescriptors(n)
              , i = Object.getPrototypeOf(this._d3Path)
              , c = Object.getOwnPropertyDescriptors(i);
            return Object.keys(o).forEach(l => {
                Object.defineProperty(this, l, {
                    value: (...d) => (Reflect.apply(c[l].value, this._d3Path, d),
                    Reflect.apply(o[l].value, this, d))
                })
            }
            ),
            this
        }
        toJSON() {
            return {
                type: "Path2D",
                value: this._d3Path.toString()
            }
        }
    }
    class Decoder {
        constructor(r) {
            this._stringRecorder = [];
            const {canvas: t} = r;
            this._stringRecorder = [],
            this._canvas = t
        }
        decode(r) {
            const {api: t, args: n} = r
              , o = CTX_API_DECODER[t]
              , i = o === "setAttr" ? this.decodeAttr(n) : this.decodeArgs(n);
            if (o === "stroke" && i.length && !(i[0]instanceof ProxyPath2D))
                throw new Error("argument type invalid, Path2D is not ProxyPath2D");
            if (o === "drawImage" && !isValidImageArg(i[0]))
                throw new Error("argument type invalid, drawImage arg is not valid image");
            return {
                api: o,
                args: i || []
            }
        }
        decodeAttr(r) {
            const t = [];
            let n = 0;
            for (; n < r.length - 1; ) {
                const o = r[n]
                  , i = r[n + 1];
                if (LONG_STR_ATTR.includes(CTX_ATTR_DECODER[o]) && typeof i == "string" || typeof i == "number")
                    if (typeof i == "number") {
                        const c = this._stringRecorder[i];
                        t.push({
                            key: CTX_ATTR_DECODER[o],
                            value: c
                        })
                    } else
                        t.push({
                            key: CTX_ATTR_DECODER[o],
                            value: i
                        }),
                        this._stringRecorder.push(i);
                else
                    (i == null ? void 0 : i.type) === "ProxyLinearGradient" ? t.push({
                        key: CTX_ATTR_DECODER[o],
                        value: getLinearGradient(i.value, this._canvas)
                    }) : t.push({
                        key: CTX_ATTR_DECODER[o],
                        value: i
                    });
                n += 2
            }
            return t
        }
        decodeArgs(r) {
            return r != null && r.map ? r.map(t => isProxyPath2D(t) ? new ProxyPath2D(t.value) : t) : r
        }
    }
    function isProxyPath2D(s) {
        return (s == null ? void 0 : s.type) === "Path2D"
    }
    function isValidImageArg(s) {
        const r = getSupportedImageTypes();
        for (const t of r)
            if (s instanceof t)
                return !0;
        return !1
    }
    function getLinearGradient(s, r) {
        const t = r.getContext("2d");
        if (!t)
            return null;
        const n = s[0]
          , o = t.createLinearGradient(n[0], n[1], n[2], n[3]);
        for (let i = 1; i < s.length; i++) {
            const c = s[i];
            o.addColorStop(c[0], c[1])
        }
        return o
    }
    function getSupportedImageTypes() {
        const s = [];
        return globalThis.HTMLImageElement && s.push(globalThis.HTMLImageElement),
        globalThis.SVGImageElement && s.push(globalThis.SVGImageElement),
        globalThis.HTMLVideoElement && s.push(globalThis.HTMLVideoElement),
        globalThis.HTMLCanvasElement && s.push(globalThis.HTMLCanvasElement),
        globalThis.ImageBitmap && s.push(globalThis.ImageBitmap),
        globalThis.OffscreenCanvas && s.push(globalThis.OffscreenCanvas),
        s
    }
    class CanvasPlayer {
        constructor(r) {
            this._prevApi = -1,
            this._instructionsQueue = [],
            this._executePromise = null;
            const {canvas: t} = r;
            this._canvas = t,
            this._decoder = new Decoder({
                canvas: t
            })
        }
        get canvas() {
            return this._canvas
        }
        execute(r) {
            !(r != null && r.length) || (this._instructionsQueue.length ? this._instructionsQueue.push(...r) : (this._instructionsQueue.push(...r),
            this._execute()))
        }
        async _execute() {
            for (; this._instructionsQueue.length; ) {
                const r = this._instructionsQueue.shift();
                if (isAPI(r)) {
                    const n = r;
                    if (this._instructionsQueue.length > 0 && isArg(this._instructionsQueue[0])) {
                        const i = this._instructionsQueue.shift();
                        await this.executeOne({
                            api: n,
                            args: i
                        }),
                        this._executePromise = null
                    } else
                        await this.executeOne({
                            api: n,
                            args: []
                        }),
                        this._executePromise = null;
                    this._prevApi = n
                } else
                    isArg(r) ? (await this.executeOne({
                        api: this._prevApi,
                        args: r
                    }),
                    this._executePromise = null) : console.log("sth error")
            }
        }
        async executeOne(r) {
            return this._executePromise = new Promise( (t, n) => {
                var o, i;
                const c = (i = (o = this._canvas) === null || o === void 0 ? void 0 : o.getContext) === null || i === void 0 ? void 0 : i.call(o, "2d");
                if (!this._decoder || !this._canvas || !c) {
                    n(-1);
                    return
                }
                try {
                    const {api: l, args: d} = this._decoder.decode(r);
                    if (!(l != null && l.length))
                        console.log("invalid api"),
                        t(-1);
                    else if (l === "setAttr") {
                        for (let h = 0; h < d.length; h++) {
                            const {key: f, value: m} = d[h];
                            c[f] = m
                        }
                        t(1)
                    } else if (l === "snapshot") {
                        const h = new Image;
                        h.onload = async () => {
                            c.drawImage(h, 0, 0),
                            t(1)
                        }
                        ,
                        h.src = d
                    } else if (l === "lineTo") {
                        let h = 0;
                        for (; h < d.length - 1; ) {
                            const f = d[h]
                              , m = d[h + 1];
                            c[l].apply(c, [f, m]),
                            h += 2
                        }
                        t(1)
                    } else
                        c[l].apply(c, [...d]),
                        t(1)
                } catch {
                    t(-1)
                }
            }
            ),
            this._executePromise
        }
        async snapshot() {
            if (this.canvas instanceof OffscreenCanvas) {
                const r = await this.canvas.convertToBlob({
                    type: "image/png",
                    quality: 1
                });
                return await new Promise(n => {
                    const o = new FileReader;
                    o.addEventListener("load", () => n(o.result)),
                    o.readAsDataURL(r)
                }
                )
            } else
                return this.canvas.toDataURL("image/png", 1)
        }
        async decode(r) {
            const t = [];
            if (!(r != null && r.length) || !this._decoder)
                return t;
            const n = [...r];
            for (; n.length; ) {
                const o = n.shift();
                if (isAPI(o)) {
                    const c = o;
                    if (n.length > 0 && isArg(n[0])) {
                        const d = n.shift();
                        t.push(this._decoder.decode({
                            api: c,
                            args: d
                        }))
                    } else
                        t.push(this._decoder.decode({
                            api: c,
                            args: []
                        }));
                    this._prevApi = c
                } else
                    isArg(o) ? t.push(this._decoder.decode({
                        api: this._prevApi,
                        args: o
                    })) : console.log("sth error")
            }
            return t
        }
    }
    function isAPI(s) {
        return typeof s == "string" || typeof s > "u" ? !1 : CTX_API_DECODER[s] === "setAttr" || CTX_API_DECODER[s] === "snapshot" || CTX_API.includes(CTX_API_DECODER[s])
    }
    function isArg(s) {
        return !!(typeof s == "object" || typeof s == "string" && s.startsWith("data:"))
    }
    function bootstrap() {
        if (globalThis.CanvasRenderingContext2D) {
            const s = CanvasRenderingContext2D.prototype.createLinearGradient;
            CanvasRenderingContext2D.prototype.createLinearGradient = function(...r) {
                const t = s.apply(this, r)
                  , n = t.addColorStop;
                return t._values = [r],
                t._type = "ProxyLinearGradient",
                t.addColorStop = (...o) => {
                    n.apply(t, o),
                    t._values.push(o)
                }
                ,
                t
            }
        }
        globalThis.Path2D && (globalThis.Path2D = ProxyPath2D)
    }
    class Recorder {
        constructor(r) {
            this.canvas = null,
            this.callback = () => {}
            ,
            this.lastCtxAttrs = [],
            this.originApis = null,
            this.wrappedApis = null,
            this.sampler = null;
            const {canvas: t, callback: n, sampler: o} = r;
            this.canvas = t,
            this.callback = n,
            this.originApis = new Map,
            this.wrappedApis = new Map,
            this.sampler = o
        }
        observe(r) {
            if (!this.canvas)
                return;
            const t = this.canvas.getContext("2d");
            CTX_ATTR.forEach(n => {
                this.lastCtxAttrs.push({
                    key: n,
                    value: t[n]
                })
            }
            ),
            this.callback({
                api: "setAttr",
                args: this.lastCtxAttrs
            }),
            this.context2DWrapper(this.canvas),
            r != null && r.snapshot && this.callback({
                api: "snapshot",
                args: this.getSnapshot()
            })
        }
        disconnect() {
            if (!this.canvas)
                return;
            const r = this.canvas.getContext("2d");
            CTX_API.forEach(t => {
                this.wrappedApis.get(t) === r[t] && (r[t] = this.originApis.get(t))
            }
            ),
            this.sampler.close()
        }
        getSnapshot() {
            if (!!this.canvas)
                return String(this.canvas.toDataURL("image/png", 1))
        }
        context2DWrapper(r) {
            const t = this
              , n = r.getContext("2d");
            CTX_API.forEach(o => {
                const i = n[o]
                  , c = function(...l) {
                    if (CTX_DRAWING_API[o]) {
                        const h = t.getChangedAttrs(n);
                        h != null && h.length && t.callback({
                            api: "setAttr",
                            args: h
                        })
                    }
                    return t.callback({
                        api: o,
                        args: l
                    }),
                    i.apply(n, [...l])
                };
                this.originApis.set(o, i),
                this.wrappedApis.set(o, c),
                n[o] = c
            }
            )
        }
        getChangedAttrs(r) {
            const t = [];
            return CTX_ATTR.forEach(n => {
                this.lastCtxAttrs[n] !== r[n] && (t.push({
                    key: n,
                    value: r[n]
                }),
                this.lastCtxAttrs[n] = r[n])
            }
            ),
            t
        }
    }
    class Encoder {
        constructor() {
            this.stringRecorder = [],
            this.stringRecorder = []
        }
        encode(r, t) {
            var n;
            const o = CTX_API_ENCODER[r];
            if ((t == null ? void 0 : t.length) || t && ((n = Object.keys(t)) === null || n === void 0 ? void 0 : n.length)) {
                const i = r === "setAttr" ? this.encodeAttr(t) : this.encodeArgs(t);
                return [o, i]
            } else
                return [o]
        }
        encodeAttr(r) {
            const t = [];
            return r.forEach(n => {
                const {key: o, value: i} = n;
                LONG_STR_ATTR.includes(o) && typeof i == "string" ? this.stringRecorder.includes(i) ? t.push(CTX_ATTR_ENCODER[o], this.stringRecorder.indexOf(i)) : (this.stringRecorder.push(i),
                t.push(CTX_ATTR_ENCODER[o], i)) : (i == null ? void 0 : i._type) === "ProxyLinearGradient" ? t.push(CTX_ATTR_ENCODER[o], {
                    type: "ProxyLinearGradient",
                    value: i._values
                }) : t.push(CTX_ATTR_ENCODER[o], i)
            }
            ),
            t
        }
        encodeArgs(r) {
            return r != null && r.map ? r.map(t => t != null && t._d3Path ? t.toJSON() : t instanceof HTMLImageElement || t instanceof HTMLVideoElement || t instanceof Image ? {
                src: t.src,
                type: t.constructor.name
            } : t instanceof SVGAElement || t instanceof HTMLCanvasElement || t instanceof ImageBitmap || t instanceof OffscreenCanvas ? {
                type: t.constructor.name
            } : t) : r
        }
    }
    class Sampler {
        constructor(r) {
            const {callback: t, canvas: n} = r;
            this._canvas = n,
            this._records = [],
            this._callback = t,
            this._encoder = new Encoder,
            this._animationHandle = window.requestAnimationFrame(o => this.producer())
        }
        sample(r) {
            this._records.push(r)
        }
        close() {
            window.cancelAnimationFrame(this._animationHandle)
        }
        producer() {
            const r = this._sample(this._records);
            this._callback(r, this._canvas),
            this._records = [],
            this._animationHandle = window.requestAnimationFrame( () => this.producer())
        }
        _sample(r) {
            var t;
            if (!(r != null && r.length))
                return [];
            const n = [];
            let o = 0
              , i = [];
            for (; o < r.length; ) {
                const l = r[o]
                  , d = o === r.length - 1 ? {
                    api: ""
                } : r[o + 1]
                  , h = l.api === d.api && isSettingApi(l.api)
                  , f = l.api === d.api && l.api === "lineTo";
                if (!h) {
                    const m = l.api;
                    let {args: g} = l;
                    m === "clip" && typeof g[0] < "u" && typeof g[1] > "u" && (l.args = [g[0]]),
                    g = (t = g == null ? void 0 : g.map) === null || t === void 0 ? void 0 : t.call(g, v => typeof v == "number" ? toFixed2(v) : v),
                    f ? i.push(...g) : m === "lineTo" ? (n.push({
                        api: m,
                        args: [...i, ...g]
                    }),
                    i = []) : n.push({
                        api: m,
                        args: l.args
                    })
                }
                o++
            }
            const c = [];
            return n.forEach(l => {
                const {api: d, args: h} = l
                  , f = this._encoder.encode(d, h);
                c.push(...f)
            }
            ),
            c
        }
    }
    const toFixed2 = s => Number(s.toString().match(/^\d+(?:\.\d{0,2})?/))
      , isSettingApi = s => CTX_SETTING_API.includes(s);
    bootstrap();
    const DEFAULT_OBSERVE_OPTIONS = {
        snapshot: !0
    };
    class CanvasObserver {
        constructor(r) {
            this._canvasMap = new WeakMap,
            this._callback = r,
            this._canvasList = []
        }
        observe(r, t) {
            const n = this._canvasMap.get(r);
            if (n)
                n.observe();
            else {
                const o = new Sampler({
                    canvas: r,
                    callback: this._callback
                })
                  , i = new Recorder({
                    canvas: r,
                    callback: c => o.sample(c),
                    sampler: o
                });
                this._canvasMap.set(r, i),
                this._canvasList.push(r),
                i.observe({
                    ...DEFAULT_OBSERVE_OPTIONS,
                    ...t
                })
            }
        }
        disconnect(r) {
            if (!r)
                return this.disconnectAll();
            const t = this._canvasMap.get(r);
            if (t) {
                t.disconnect(),
                this._canvasMap.delete(r);
                const n = this._canvasList.indexOf(r);
                n >= 0 && this._canvasList.splice(n, 1)
            } else
                console.error("no recorder to disconnect")
        }
        disconnectAll() {
            this._canvasList.forEach(r => {
                const t = this._canvasMap.get(r);
                t && t.disconnect()
            }
            ),
            this._canvasList = [],
            this._canvasMap = new WeakMap
        }
        getSnapshot(r) {
            if (!r)
                return {};
            const t = this._canvasMap.get(r);
            return t ? {
                url: t.getSnapshot(),
                width: r.width,
                height: r.height
            } : (console.error("no recorder to getSnapshot"),
            {})
        }
    }
    class CanvasElementObserver {
        constructor(r) {
            b(this, "_canvasObserver");
            b(this, "_canvas", new WeakMap);
            b(this, "_handleCanvasChange", (r, t) => {
                if (r.length === 0)
                    return;
                const n = this._canvas.get(t)
                  , o = n == null ? void 0 : n.nodes.getNodeId(t);
                o && this.callback({
                    eventType: TrackerEventType.HTMLCanvas,
                    data: {
                        target: o,
                        data: r
                    }
                })
            }
            );
            this.callback = r,
            this._canvasObserver = new CanvasObserver(this._handleCanvasChange)
        }
        get nodeName() {
            return "CANVAS"
        }
        observe(r, t, n) {
            this._canvasObserver.observe(t, {
                snapshot: !1
            }),
            this._canvas.set(t, r),
            n.extra = {
                image: t.toDataURL("image/png", 1),
                width: t.width,
                height: t.height
            }
        }
        disconnect(r) {
            this._canvasObserver.disconnect(r),
            this._canvas.delete(r)
        }
        disconnectAll() {
            this._canvasObserver.disconnectAll()
        }
    }
    class SnapshotError extends RuntimeError {
        constructor(r, t) {
            super(r, t),
            this.name = "SnapshotError"
        }
    }
    class CapturingError extends SnapshotError {
        constructor(r, t) {
            super(r, t),
            this.name = "CapturingError"
        }
    }
    class RenderingError extends SnapshotError {
        constructor(r, t) {
            super(r, t),
            this.name = "RenderingError"
        }
    }
    function captureDocument(s, r) {
        const t = r.nodes.getNodeId(s);
        console.assert(t === 1, `Unexpected id: expected 1 but got ${t}.`);
        const n = captureElementNode(s.documentElement, r);
        return {
            id: t,
            type: VNodeType.DocumentNode,
            title: s.title,
            baseURI: s.baseURI,
            root: n,
            visibilityState: s.visibilityState,
            scrollSize: [s.documentElement.scrollWidth, s.documentElement.scrollHeight],
            offsetSize: [s.documentElement.offsetWidth, s.documentElement.offsetHeight]
        }
    }
    function captureNode(s, r, t) {
        switch (s.nodeType) {
        case VNodeType.ElementNode:
            const n = captureElementNode(s, r, t);
            return r.onNodeCapture(s, n),
            n;
        case VNodeType.DocumentFragmentNode:
            const o = captureDocumentFragmentNode(s, r, t);
            return r.onNodeCapture(s, o),
            o;
        case VNodeType.TextNode:
        case VNodeType.CommentNode:
            const i = captureBasicNode(s, r, t);
            return r.onNodeCapture(s, i),
            i;
        default:
            throw new UnsupportedError(`Unsupported node type '${s.nodeType}'.`)
        }
    }
    function captureElementNode(s, r, t) {
        const n = captureBasicNode(s, r, t);
        if (n.type = VNodeType.ElementNode,
        n.tag = s.tagName,
        captureNamespace(s, n),
        captureAttributes(s, n, t),
        n.ignored || (captureValue(s, n),
        captureChecked(s, n),
        captureScroll(s, n)),
        captureChildren(s, r, n),
        s.shadowRoot) {
            const o = captureNode(s.shadowRoot, r, n);
            o && (n.shadowRoot = o)
        }
        return n
    }
    function captureDocumentFragmentNode(s, r, t) {
        const n = captureBasicNode(s, r, t);
        return n.tag = s.nodeName,
        captureChildren(s, r, n),
        n
    }
    function captureBasicNode(s, r, t) {
        const o = {
            id: r.nodes.getNodeId(s),
            type: s.nodeType
        };
        return t ? isVNode(t) ? (o.parentId = t.id,
        t.ignored && (o.ignored = t.ignored)) : (o.parentId = captureParentNode(s, r, t),
        shouldIgnore(t) && (o.ignored = !0)) : o.parentId = captureParentNode(s, r),
        !o.ignored && s.nodeValue != null && (o.text = isHTMLScriptElement(s) ? "" : s.nodeValue),
        o
    }
    function captureParentNode(s, r, t) {
        const n = t != null ? t : s.parentNode;
        if (n) {
            const o = r.nodes.getNodeId(n, !1);
            if (o == null)
                throw new CapturingError("Parent node is not captured yet.");
            return o
        }
    }
    function captureChildren(s, r, t) {
        if (s.hasChildNodes()) {
            const n = [];
            s.childNodes.forEach(o => {
                const i = captureNode(o, r, t);
                i && n.push(i)
            }
            ),
            t.children = n
        }
    }
    function captureNamespace(s, r) {
        s.namespaceURI && !s.ownerDocument.isDefaultNamespace(s.namespaceURI) && (r.ns = s.namespaceURI)
    }
    function captureAttributes(s, r, t) {
        var o;
        if (s.hasAttributes()) {
            shouldIgnore(s) && (r.ignored = !0);
            const i = {};
            for (let c = s.attributes.length - 1; c >= 0; c--) {
                const {name: l, value: d} = s.attributes[c];
                i[l] = d
            }
            r.attrs = i
        }
        let n;
        t && (isVNode(t) ? n = (o = t == null ? void 0 : t.attrs) == null ? void 0 : o[DATA_MASK] : isHTMLElement(t) && (n = t.getAttribute(DATA_MASK))),
        n != null && (r.attrs ? r.attrs[DATA_MASK] = n : r.attrs = {
            [DATA_MASK]: n
        })
    }
    function captureValue(s, r) {
        let t, n, o = !1;
        isHTMLInputElement(s) || isHTMLSelectElement(s) ? (t = s.value,
        n = s.getAttribute("value"),
        o = s.type === "password") : isHTMLTextAreaElement(s) && (t = s.value,
        n = s.textContent),
        isString(t) && t !== n && (r.value = o ? "*".repeat(t.length) : t)
    }
    function captureChecked(s, r) {
        isHTMLInputElement(s) ? r.checked = s.checked : isHTMLOptionElement(s) && (r.checked = s.selected)
    }
    function captureScroll(s, r) {
        (s.scrollTop || s.scrollLeft) && (r.scroll = [s.scrollLeft, s.scrollTop])
    }
    function captureMutations(s, r) {
        let t = [];
        const n = new Map
          , o = new Map
          , i = new Map
          , c = new Map
          , l = (f, m) => {
            c.set(m, !0)
        }
          , d = (f, m) => {
            c.has(m) && i.set(m, !0)
        }
        ;
        r.nodes.on("nodeAdded", l),
        r.nodes.on("nodeRemoved", d);
        for (const f of s) {
            const m = r.nodes.getNodeId(f.target, !1);
            if (m === void 0) {
                console.warn("Unrecognized target node when capturing mutation.");
                continue
            }
            switch (f.type) {
            case "attributes":
                const g = captureChangedAttribute(m, f)
                  , v = n.get(m);
                v ? Object.assign(v.data, g.data) : i.has(g.target) || (n.set(m, g),
                t.push(g));
                break;
            case "childList":
                if (f.addedNodes.length) {
                    const y = captureAddedNodes(m, f, r);
                    t.push(...y)
                }
                if (f.removedNodes.length) {
                    const y = captureRemovedNodes(m, f, r);
                    t.push(...y)
                }
                break;
            case "characterData":
                const S = captureCharacterData(m, f)
                  , E = o.get(m);
                E ? E.data = S.data : i.has(m) || (o.set(m, S),
                t.push(S));
                break;
            default:
                throw new UnsupportedError(`Unsupported mutation type: ${f.type}`)
            }
        }
        const h = new Set;
        return r.nodes.off("nodeAdded", l),
        r.nodes.off("nodeRemoved", d),
        t = t.filter(f => {
            if (i.has(f.target) || h.has(f.target))
                return !1;
            if (f.type === VMutationType.RemoveNode) {
                let m;
                if (typeof f.data == "number" ? m = f.data : m = f.data.id,
                i.has(m) && h.has(m))
                    return !1
            } else if (f.type === VMutationType.AddNode && i.has(f.data.node.id))
                return visitIgnoreNode(f.data.node, h),
                !1;
            return !0
        }
        ),
        t
    }
    function visitIgnoreNode(s, r) {
        var t;
        r.add(s.id),
        (t = s.children) == null || t.forEach(n => {
            visitIgnoreNode(n, r)
        }
        )
    }
    function captureChangedAttribute(s, r) {
        const t = r.attributeName
          , n = r.target.getAttribute(t);
        return {
            type: VMutationType.ChangeAttributes,
            target: s,
            data: {
                [t]: n
            }
        }
    }
    function captureAddedNodes(s, r, t) {
        const n = [];
        let o;
        return r.nextSibling && (o = t.nodes.getNodeId(r.nextSibling)),
        r.addedNodes.forEach(i => {
            const c = i.parentNode;
            let l = s;
            if (c) {
                const d = t.nodes.getNodeId(c, !1);
                d && d !== s && (l = d,
                console.error("add node parent not matched", s, d))
            }
            if (t.nodes.has(i))
                checkChildren(i, t, n);
            else {
                const d = captureNode(i, t, r.target)
                  , h = {
                    type: VMutationType.AddNode,
                    target: l,
                    data: {
                        node: d
                    }
                };
                o && (h.data.before = o),
                n.push(h)
            }
        }
        ),
        n
    }
    function checkChildren(s, r, t) {
        if (!r.nodes.has(s))
            if (s.parentElement) {
                const o = r.nodes.getNodeId(s.parentElement, !1);
                if (o) {
                    const i = captureNode(s, r, s.parentElement);
                    t.push({
                        type: VMutationType.AddNode,
                        target: o,
                        data: {
                            node: i
                        }
                    })
                } else
                    console.warn("parent id is null", s.parentElement)
            } else
                console.warn("parent is null", s);
        s.childNodes.forEach(o => {
            checkChildren(o, r, t)
        }
        )
    }
    function captureRemovedNodes(s, r, t) {
        const n = [];
        return r.removedNodes.forEach(o => {
            const i = t.nodes.getNodeId(o, !1)
              , c = [];
            let l = s;
            if (o.parentNode) {
                const d = t.nodes.getNodeId(o.parentNode, !1);
                d && d !== s && (l = d,
                console.error("remove parent not matched", s, d))
            }
            t.onNodeRemove(o, i),
            t.nodes.removeNode(o, !0, c),
            c.length > 0 && c[c.length - 1] === i && c.pop(),
            i && n.push({
                type: VMutationType.RemoveNode,
                target: l,
                data: {
                    id: i,
                    children: c
                }
            })
        }
        ),
        n
    }
    function captureCharacterData(s, r) {
        const t = r.target.nodeValue;
        return {
            type: VMutationType.CharacterData,
            target: s,
            data: t
        }
    }
    function captureWindow(s) {
        return {
            location: s.location.href,
            size: [s.innerWidth, s.innerHeight]
        }
    }
    class DocumentObserver {
        constructor(r) {
            b(this, "_mutationObserver");
            b(this, "_context");
            b(this, "_handleMutationObserver", r => {
                if (!this._context)
                    return;
                const t = captureMutations(r, this._context);
                this.callback({
                    eventType: TrackerEventType.HTMLMutations,
                    data: t
                })
            }
            );
            b(this, "_handleDocumentVisibilityChange", () => {
                this.callback({
                    eventType: TrackerEventType.HTMLMutations,
                    data: [{
                        type: VMutationType.Document,
                        target: 1,
                        data: {
                            visibilityState: document.visibilityState
                        }
                    }]
                })
            }
            );
            this.callback = r,
            this._mutationObserver = new MutationObserver(this._handleMutationObserver)
        }
        observe(r, t) {
            this._context = r,
            this._mutationObserver.observe(t, {
                childList: !0,
                subtree: !0,
                attributes: !0,
                characterData: !0
            });
            const n = this.capture(r);
            t.addEventListener("visibilitychange", this._handleDocumentVisibilityChange),
            this.callback({
                eventType: TrackerEventType.HTMLSnapshot,
                data: n
            })
        }
        disconnect(r) {
            this._mutationObserver.disconnect(),
            r.removeEventListener("visibilitychange", this._handleDocumentVisibilityChange)
        }
        disconnectAll() {
            this.disconnect(document)
        }
        capture(r) {
            return {
                version: 1,
                window: captureWindow(window),
                document: captureDocument(document, r),
                id: generateUUID()
            }
        }
    }
    function captureEvent(s, r) {
        switch (s.type) {
        case "scroll":
            return captureScrollEvent(s, r);
        case "focus":
        case "blur":
            return captureFocusAndBlurEvent(s, r);
        case "input":
        case "change":
            return captureInputAndChangeEvent(s, r);
        case "resize":
            return captureResizeEvent()
        }
    }
    function captureScrollEvent({target: s}, r) {
        let t;
        s === document ? document.scrollingElement ? t = document.scrollingElement : t = document.documentElement : t = s;
        const n = r.nodes.getNodeId(t, !1);
        if (n != null)
            return {
                eventType: TrackerEventType.HTMLScroll,
                data: {
                    target: n,
                    scroll: [t.scrollLeft, t.scrollTop]
                }
            }
    }
    function captureFocusAndBlurEvent({target: s, type: r}, t) {
        const n = s
          , o = t.nodes.getNodeId(n, !1);
        if (o != null)
            return {
                eventType: r === "focus" ? TrackerEventType.HTMLFocus : TrackerEventType.HTMLBlur,
                data: {
                    target: o
                }
            }
    }
    function captureInputAndChangeEvent({target: s}, r) {
        const t = s
          , n = r.nodes.getNodeId(t, !1);
        if (n != null) {
            if (isHTMLInputElement(t) && t.type === "checkbox" || t.type === "radio")
                return {
                    eventType: TrackerEventType.HTMLValueChange,
                    data: {
                        target: n,
                        value: t.checked
                    }
                };
            let o = t.value;
            return isHTMLInputElement(t) && t.type === "password" && (o = "*".repeat(t.value.length)),
            {
                eventType: TrackerEventType.HTMLValueChange,
                data: {
                    target: n,
                    value: o
                }
            }
        }
    }
    function captureResizeEvent() {
        return {
            eventType: TrackerEventType.HTMLResize,
            data: {
                size: [window.innerWidth, window.innerHeight]
            }
        }
    }
    const WINDOW_EVENTS = ["focus", "blur", "change", "input"];
    class GlobalEventObserver {
        constructor(r) {
            b(this, "_context");
            b(this, "_handleEvent", r => {
                if (!this._context)
                    return;
                const t = captureEvent(r, this._context);
                t && this.callback(t)
            }
            );
            b(this, "_handleScroll", r => {
                if (!this._context)
                    return;
                const t = captureEvent(r, this._context);
                t && t.eventType === TrackerEventType.HTMLScroll && this._scrollSampler.sample(t.data.target, t.data.scroll)
            }
            );
            b(this, "_handleScrollSampleCallback", (r, t) => {
                this.callback({
                    eventType: TrackerEventType.HTMLScroll,
                    data: {
                        target: r,
                        scroll: t
                    }
                })
            }
            );
            b(this, "_scrollSampler", new Sampler$1(5,this._handleScrollSampleCallback));
            b(this, "_handleResize", r => {
                if (!this._context)
                    return;
                const t = captureEvent(r, this._context);
                t && t.eventType === TrackerEventType.HTMLResize && this._resizeSampler.sample(0, t.data.size)
            }
            );
            b(this, "_handleResizeSampleCallback", (r, t) => {
                this.callback({
                    eventType: TrackerEventType.HTMLResize,
                    data: {
                        size: t
                    }
                })
            }
            );
            b(this, "_resizeSampler", new Sampler$1(1,this._handleResizeSampleCallback));
            this.callback = r
        }
        observe(r, t) {
            this._context = r,
            t instanceof Window && WINDOW_EVENTS.forEach(n => t.addEventListener(n, this._handleEvent, !0)),
            t.addEventListener("scroll", this._handleScroll, {
                capture: !0,
                passive: !0
            }),
            t.addEventListener("resize", this._handleResize, {
                capture: !0,
                passive: !0
            })
        }
        disconnect(r) {
            WINDOW_EVENTS.forEach(t => r.removeEventListener(t, this._handleEvent, !0)),
            r.removeEventListener("scroll", this._handleScroll, !0),
            r.removeEventListener("resize", this._handleResize, !0)
        }
        disconnectAll() {
            this._context = void 0,
            this._scrollSampler.stop(),
            this._resizeSampler.stop()
        }
    }
    class ImageElementObserver {
        constructor(r, t) {
            this.options = r,
            this.callback = t
        }
        get nodeName() {
            return "IMG"
        }
        observe(r, t, n) {
            if (this.options.captureStatus && (t.decode().then( () => {
                const o = r.nodes.getNodeId(t, !1);
                o && this.callback({
                    eventType: TrackerEventType.HTMLImage,
                    data: {
                        target: o,
                        data: {
                            status: "loaded"
                        }
                    }
                })
            }
            ).catch( () => {
                const o = r.nodes.getNodeId(t, !1);
                o && this.callback({
                    eventType: TrackerEventType.HTMLImage,
                    data: {
                        target: o,
                        data: {
                            status: "failed"
                        }
                    }
                })
            }
            ),
            n.extra = {
                status: "unknown"
            }),
            this.options.captureAttributes) {
                const o = this.options.captureAttributes(t)
                  , i = n;
                i.attrs = {
                    ...i.attrs,
                    ...o
                }
            }
        }
        disconnect(r) {}
        disconnectAll() {}
    }
    class DeferredTaskQueue {
        constructor() {
            b(this, "_tasks", [])
        }
        enqueue(r) {
            this._tasks.push(r)
        }
        async executeAll() {
            for (const r of this._tasks)
                await r();
            this.clear()
        }
        clear() {
            this._tasks.splice(0, this._tasks.length)
        }
        size() {
            return this._tasks.length
        }
    }
    const DATA_NODE_ID = "__bytereplay#nodeId";
    function setNodeIdAttribute(s, r) {
        s[DATA_NODE_ID] = r
    }
    function getNodeIdAttribute(s) {
        return s[DATA_NODE_ID]
    }
    function fixSVGUse(s) {
        try {
            s.outerHTML = s.outerHTML
        } catch {}
    }
    class Id2NodeMap extends EventEmitter {
        constructor() {
            super(...arguments);
            b(this, "_map", new Map)
        }
        reset() {
            this._map.clear(),
            this.emit("nodeReset")
        }
        has(t) {
            return this._map.has(t)
        }
        getNode(t) {
            return this._map.get(t)
        }
        addNode(t, n) {
            this._map.set(t, n),
            n && this.emit("nodeAdded", n, t)
        }
        keys() {
            return this._map.keys()
        }
        size() {
            return this._map.size
        }
        removeNode(t) {
            const n = this._map.get(t);
            this._map.delete(t),
            n && this.emit("nodeRemoved", n, t)
        }
    }
    class Node2IdMap {
        constructor() {
            b(this, "_events", new EventEmitter);
            b(this, "_map", new WeakMap);
            b(this, "_sequentialId", 0);
            this.reset()
        }
        has(r) {
            return this._map.has(r)
        }
        getNodeId(r, t=!0) {
            if (this.has(r))
                return this._map.get(r);
            if (t)
                return this.addNode(r)
        }
        reset() {
            this._sequentialId = 0,
            this._map = new WeakMap
        }
        addNode(r) {
            if (this.has(r))
                throw new RuntimeError("Node already added.");
            const t = this._nextId();
            this._map.set(r, t);
            try {
                this._events.emit("nodeAdded", r, t)
            } catch {}
            return t
        }
        removeNode(r, t=!1, n=[]) {
            t && r.hasChildNodes() && r.childNodes.forEach(c => {
                this.removeNode(c, !0, n)
            }
            ),
            r instanceof Element && r.shadowRoot && this.removeNode(r.shadowRoot, !0, n);
            const o = this._map.get(r);
            if (this._map.delete(r),
            o && o >= 0) {
                n.push(o);
                try {
                    this._events.emit("nodeRemoved", r, o)
                } catch {}
            }
        }
        _nextId() {
            return ++this._sequentialId
        }
        on(r, t, n) {
            return this._events.on(r, t, n)
        }
        once(r, t, n) {
            return this._events.once(r, t, n)
        }
        off(r, t, n, o) {
            return this._events.off(r, t, n, o)
        }
        addListener(r, t, n) {
            return this._events.addListener(r, t, n)
        }
        removeListener(r, t, n, o) {
            return this._events.removeListener(r, t, n, o)
        }
    }
    class PromiseList {
        constructor() {
            b(this, "_promises", [])
        }
        add(r) {
            this._promises.push(r)
        }
        async all() {
            await Promise.all(this._promises),
            this.clear()
        }
        clear() {
            this._promises.splice(0, this._promises.length)
        }
        size() {
            return this._promises.length
        }
    }
    class ObserverContext extends EventEmitter {
        constructor(t) {
            super();
            b(this, "_map", new Node2IdMap);
            b(this, "_nodeObservers", new Map);
            b(this, "_documentObserver");
            b(this, "_globalEventObserver");
            this.callback = t,
            this._documentObserver = new DocumentObserver(this.callback),
            this._globalEventObserver = new GlobalEventObserver(this.callback)
        }
        get documentObserver() {
            return this._documentObserver
        }
        get eventsObserver() {
            return this._globalEventObserver
        }
        get nodes() {
            return this._map
        }
        getNodeId(t) {
            return this._map.getNodeId(t)
        }
        reset() {
            this.disconnectAll(),
            this._map.reset()
        }
        registerNodeObserver(t) {
            this._nodeObservers.set(t.nodeName, t)
        }
        onNodeRemove(t, n) {
            try {
                const o = this._nodeObservers.get(t.nodeName);
                o && o.disconnect(t)
            } catch {}
        }
        onNodeCapture(t, n) {
            const o = this._nodeObservers.get(t.nodeName);
            try {
                o && o.observe(this, t, n)
            } catch (i) {
                console.error(i)
            }
        }
        disconnectAll() {
            this._nodeObservers.forEach(t => {
                t.disconnectAll()
            }
            )
        }
    }
    const STYLE_SHEET_INTERCEPTOR_FLAG = Symbol.for("bytereplay.StyleSheetInterceptor")
      , RuleSheetMethodEncodes = {
        insertRule: 0,
        deleteRule: 1,
        replace: 2,
        replaceSync: 3,
        addRule: 4,
        removeRule: 5
    }
      , RuleSheetMethodDecodes = {
        0: "insertRule",
        1: "deleteRule",
        2: "replace",
        3: "replaceSync",
        4: "addRule",
        5: "removeRule"
    }
      , x = class {
        constructor(r, t) {
            b(this, "_context");
            this.host = r,
            this.callback = t
        }
        observe(r, t) {
            if (this._context || (this._context = r),
            t[STYLE_SHEET_INTERCEPTOR_FLAG] !== void 0)
                return;
            const n = this._nextSheetId()
              , o = Object.getPrototypeOf(t)
              , i = Object.getOwnPropertyDescriptors(o);
            Object.keys(i).forEach(c => {
                const l = Reflect.get(t, c);
                typeof l != "function" || l.name === "CSSStyleSheet" || Object.defineProperty(t, c, {
                    value: (...d) => {
                        const h = i[c].value;
                        if (typeof h == "function") {
                            const f = RuleSheetMethodEncodes[c];
                            if (f !== void 0 && this._context) {
                                const m = this._context.nodes.getNodeId(this.host, !1);
                                m && this.callback({
                                    eventType: TrackerEventType.HTMLMutations,
                                    data: [{
                                        type: VMutationType.StyleSheetRule,
                                        target: m,
                                        data: [f, d],
                                        sheetId: n
                                    }]
                                })
                            }
                        }
                        return Reflect.apply(h, t, d)
                    }
                })
            }
            ),
            t[STYLE_SHEET_INTERCEPTOR_FLAG] = n
        }
        captureRules(r) {
            const t = r.cssRules
              , n = [];
            if (t.length > 0)
                for (let o = 0; o < t.length; o++)
                    n.push([RuleSheetMethodEncodes.insertRule, [t[o].cssText, o]]);
            return n
        }
        static getSheetId(r) {
            return r[STYLE_SHEET_INTERCEPTOR_FLAG]
        }
        static setSheetId(r, t) {
            r[STYLE_SHEET_INTERCEPTOR_FLAG] = t
        }
        _nextSheetId() {
            return ++x._sheetId
        }
        disconnect(r) {
            this._context = void 0
        }
        disconnectAll() {
            this._context = void 0
        }
    }
    ;
    let StyleSheetObserver = x;
    b(StyleSheetObserver, "_sheetId", 0);
    const AdoptedStyleSheetsInterceptor = Symbol("bytereplya.adoptedStyleSheets");
    class ShadowRootObserver {
        constructor(r) {
            b(this, "mutationObservers", new WeakMap);
            b(this, "styleSheetObservers", new WeakMap);
            b(this, "_context");
            b(this, "_handleAdoptedStyleSheetsChange", (r, t) => {
                const n = this._context;
                if (!n)
                    return;
                const o = {
                    sheets: [],
                    rules: {}
                }
                  , i = n.nodes.getNodeId(r, !1);
                !i || (t.forEach(c => {
                    let l = StyleSheetObserver.getSheetId(c);
                    if (l !== void 0) {
                        o.sheets.push(l);
                        return
                    }
                    const d = this.styleSheetObservers.get(r);
                    if (!d)
                        return;
                    d.observe(n, c),
                    l = StyleSheetObserver.getSheetId(c),
                    o.sheets.push(l);
                    const h = d.captureRules(c);
                    o.rules[l] = h
                }
                ),
                this.callback({
                    eventType: TrackerEventType.HTMLMutations,
                    data: [{
                        type: VMutationType.StyleSheetAdopted,
                        target: i,
                        data: o
                    }]
                }))
            }
            );
            b(this, "_handleMutationObserver", r => {
                if (!this._context)
                    return;
                const t = captureMutations(r, this._context);
                this.callback({
                    eventType: TrackerEventType.HTMLMutations,
                    data: t
                })
            }
            );
            this.callback = r
        }
        get nodeName() {
            return "#document-fragment"
        }
        observe(r, t, n) {
            this._context || (this._context = r);
            const o = new MutationObserver(this._handleMutationObserver);
            o.observe(t, {
                childList: !0,
                subtree: !0,
                attributes: !0,
                characterData: !0
            }),
            this.mutationObservers.set(t, o),
            n.extra = {
                styleSheets: this._observerAdoptedStyleSheets(r, t)
            },
            r.eventsObserver.observe(r, t)
        }
        _observerAdoptedStyleSheets(r, t) {
            const n = new StyleSheetObserver(t,this.callback);
            this.styleSheetObservers.set(t, n),
            this._watchAdoptedSytleSheetsChange(t);
            const o = t.adoptedStyleSheets
              , i = {
                sheets: [],
                rules: {}
            };
            if (o.length === 0)
                return i;
            for (let c = 0; c < o.length; c++) {
                const l = o[c];
                n.observe(r, l);
                const d = StyleSheetObserver.getSheetId(l);
                if (d === void 0)
                    continue;
                const h = n.captureRules(l);
                i.sheets.push(d),
                i.rules[d] = h
            }
            return i
        }
        _watchAdoptedSytleSheetsChange(r) {
            if (r[AdoptedStyleSheetsInterceptor])
                return;
            const n = Object.getPrototypeOf(r)
              , o = Object.getOwnPropertyDescriptor(n, "adoptedStyleSheets")
              , i = this;
            Object.defineProperty(r, "adoptedStyleSheets", {
                configurable: o == null ? void 0 : o.configurable,
                enumerable: o == null ? void 0 : o.enumerable,
                get() {
                    var c;
                    return (c = o == null ? void 0 : o.get) == null ? void 0 : c.call(this)
                },
                set(c) {
                    var d;
                    const l = (d = o == null ? void 0 : o.set) == null ? void 0 : d.call(this, c);
                    try {
                        i._handleAdoptedStyleSheetsChange(r, c)
                    } catch {}
                    return l
                }
            })
        }
        disconnect(r) {
            var i;
            (i = this._context) == null || i.eventsObserver.disconnect(r),
            this._context = void 0;
            const t = this.mutationObservers.get(r);
            t == null || t.disconnect();
            const n = this.styleSheetObservers.get(r)
              , o = r.adoptedStyleSheets;
            for (let c = 0; c < o.length; c++) {
                const l = o[c];
                n == null || n.disconnect(l)
            }
        }
        disconnectAll() {
            this._context = void 0,
            this.mutationObservers = new WeakMap,
            this.styleSheetObservers = new WeakMap
        }
    }
    class StyleElementObserver {
        constructor(r) {
            b(this, "observers", new WeakMap);
            this.callback = r
        }
        get nodeName() {
            return "STYLE"
        }
        observe(r, t, n) {
            if (t.textContent === "" && t.sheet) {
                const o = new StyleSheetObserver(t,this.callback)
                  , i = o.captureRules(t.sheet);
                n.extra = {
                    commands: i
                },
                o.observe(r, t.sheet),
                this.observers.set(t, o)
            } else
                n.extra = {}
        }
        disconnect(r) {
            const t = this.observers.get(r);
            r.sheet && (t == null || t.disconnect(r.sheet))
        }
        disconnectAll() {
            this.observers = new WeakMap
        }
    }
    function takeSnapshot(s, r) {
        const {token: t, safety: n, data: o} = r
          , i = {};
        return t && (i.Authorization = t),
        s.post(n ? "snapshot/safe/take" : "snapshot/take", o, i)
    }
    class ScreenshotRenderer {
        constructor() {
            b(this, "_env");
            b(this, "_apiClient")
        }
        async render(r, t) {
            console.log(r);
            const n = JSON.stringify(r)
              , o = new TextEncoder().encode(n)
              , i = new Blob([o])
              , f = new FormData;
            
            console.log(n);

            f.append("snapshot", i);

            // TODO ...

            URL.revokeObjectURL(i);

        }
        getAPIClient(r) {
            return this._env ? (this._env.baseURL = r == null ? void 0 : r.baseURL,
            this._env.type = r == null ? void 0 : r.type) : this._env = new Environment(r),
            this._apiClient || (this._apiClient = new APIClient(this._env)),
            this._apiClient
        }
    }
    class SnapshotCapturer extends EventEmitter {
        constructor(t) {
            var n, o;
            super();
            b(this, "context");
            b(this, "_handleEventObserver", t => {
                this.emit("event", t)
            }
            );
            this.options = t,
            this.context = new ObserverContext(this._handleEventObserver),
            (n = this.options) != null && n.canvas && this.registerNodeObserver(CanvasElementObserver),
            (o = this.options) != null && o.image && this.registerNodeObserver(ImageElementObserver, this.options.image),
            this.registerNodeObserver(StyleElementObserver),
            this.registerNodeObserver(ShadowRootObserver)
        }
        get nodes() {
            return this.context.nodes
        }
        getNodeId(t) {
            return this.nodes.getNodeId(t, !1)
        }
        reset() {
            this.context.reset()
        }
        registerNodeObserver(t, ...n) {
            const o = Reflect.construct(t, [...n, this._handleEventObserver]);
            this.context.registerNodeObserver(o)
        }
        start() {
            this.context.documentObserver.observe(this.context, document),
            this.context.eventsObserver.observe(this.context, window)
        }
        stop() {
            this.context.documentObserver.disconnect(document),
            this.context.eventsObserver.disconnect(window),
            this.reset()
        }
        captureSnapshot() {
            return this.context.documentObserver.capture(this.context)
        }
        captureMutations(t) {
            return captureMutations(t, this.context)
        }
        captureEvent(t) {
            return captureEvent(t, this.context)
        }
        async screenshot(t) {
            const n = this.captureSnapshot();
            return await new ScreenshotRenderer().render(n, t)
        }
    }
    var RenderMode = (s => (s.VanillaDOM = "VanillaDOM",
    s.VirtualDOM = "VirtualDOM",
    s))(RenderMode || {});
    const T = class {
        constructor() {
            b(this, "tag", "CANVAS")
        }
        static registerPlayer(r, t, n, o) {
            const i = {
                player: new CanvasPlayer({
                    canvas: n
                }),
                order: o
            }
              , c = T.players.get(`${r}/${t}`);
            c ? c.order < i.order && T.players.set(`${r}/${t}`, i) : T.players.set(`${r}/${t}`, i)
        }
        static resolvePlayer(r, t, n) {
            const o = T.players.get(`${r}/${t}`);
            if (o && o.order <= n)
                return o.player
        }
        static removePlayer(r, t) {
            T.players.delete(`${r}/${t}`)
        }
        static resetPlayer(r) {
            const t = T.players.keys();
            Array.from(t).forEach(n => {
                n.startsWith(r) && T.players.delete(n)
            }
            )
        }
        onRender(r, t) {
            var i, c, l;
            const n = (i = t.extra) == null ? void 0 : i.image;
            if (!n)
                return;
            const o = this.getPerformOrder(r);
            if (r.isVanilla()) {
                const d = r.getNode(t.id)
                  , h = d.getContext("2d");
                r.addWaiting(new Promise(f => {
                    const m = new Image;
                    m.onload = () => {
                        h == null || h.drawImage(m, 0, 0),
                        f({
                            element: d,
                            failed: !1,
                            timeout: !1
                        })
                    }
                    ,
                    m.onerror = () => {
                        f({
                            element: d,
                            failed: !0,
                            timeout: !1
                        })
                    }
                    ,
                    m.src = n
                }
                )),
                T.registerPlayer(r.snapshotId, t.id, d, o)
            } else {
                const d = new OffscreenCanvas(parseFloat(((c = t.attrs) == null ? void 0 : c.width) || "300") || 300,parseFloat(((l = t.attrs) == null ? void 0 : l.height) || "150") || 150);
                T.registerPlayer(r.snapshotId, t.id, d, o)
            }
        }
        onRemove(r, t) {
            T.removePlayer(r.snapshotId, t)
        }
        performEvent(r, t) {
            if (t.eventType === TrackerEventType.HTMLCanvas) {
                const {target: n, data: o} = t.data
                  , i = this.getPerformOrder(r)
                  , c = T.resolvePlayer(r.snapshotId, n, i);
                c && c.execute(o)
            }
        }
        onReset(r) {
            T.resetPlayer(r.snapshotId)
        }
        onCapture(r, t) {
            if (r.isVirtual()) {
                const n = r.getNode(t);
                if (n && n.tag === this.tag) {
                    const o = this.getPerformOrder(r)
                      , i = T.resolvePlayer(r.snapshotId, t, o);
                    i && r.addWaiting(new Promise( (c, l) => {
                        i.snapshot().then(d => {
                            n.extra = {
                                image: d
                            },
                            c({
                                element: void 0,
                                failed: !1,
                                timeout: !1
                            })
                        }
                        ).catch( () => {
                            l({
                                element: void 0,
                                failed: !0,
                                timeout: !1
                            })
                        }
                        )
                    }
                    ))
                }
            }
        }
        getPerformOrder(r) {
            return r.mode === RenderMode.VanillaDOM ? 2 : r.isIncremental ? 0 : 1
        }
    }
    ;
    let CanvasElementRenderer = T;
    b(CanvasElementRenderer, "players", new Map);
    class IFrameElementRenderer {
        constructor() {
            b(this, "tag", "IFRAME")
        }
        onRender(r, t) {}
        onRemove(r, t) {}
        performEvent(r, t) {
            if (t.eventType === TrackerEventType.HTMLIFrame)
                if (r.isVanilla()) {
                    const n = r.getNode(t.data.target);
                    n && (console.log("iframe event", t),
                    n.dispatchEvent(buildIFrameEvent(t.data.action)))
                } else {
                    const {target: n, action: o} = t.data
                      , i = r.getNode(n);
                    if (!i)
                        throw new RenderingError(`Node with ID '${n}' not found.`);
                    const c = i.extra || {
                        state: IFrameState.Loaded
                    };
                    switch (o.type) {
                    case IFrameActionType.Load:
                        c.state = IFrameState.Loaded,
                        c.recordings = void 0;
                        break;
                    case IFrameActionType.Unload:
                        c.state = IFrameState.Loading,
                        c.recordings = void 0;
                        break;
                    case IFrameActionType.StartRecording:
                        c.state = IFrameState.Recording,
                        c.recordings = {
                            ...c.recordings,
                            [o.data.parentId]: o.data.recording
                        };
                        break;
                    case IFrameActionType.StopRecording:
                        c.state = IFrameState.Loaded,
                        c.recordings && delete c.recordings[o.data.parentId];
                        break
                    }
                    i.extra = c
                }
        }
    }
    class ImageElementRenderer {
        constructor(r) {
            this.options = r
        }
        get tag() {
            return "IMAGE"
        }
        onRender(r, t, n) {
            var o, i;
            if (r.isVanilla()) {
                const c = n
                  , l = t.extra;
                ((o = this.options) == null ? void 0 : o.onError) && (l == null ? void 0 : l.status) === "failed" && this.options.onError(c),
                ((i = this.options) == null ? void 0 : i.onLoad) && (l == null ? void 0 : l.status) === "loaded" && this.options.onLoad(c)
            }
        }
        onRemove(r, t) {}
        performEvent(r, t) {
            var i, c;
            if (t.eventType !== TrackerEventType.HTMLImage)
                return;
            const {target: n, data: o} = t.data;
            if (r.isVanilla()) {
                const l = r.getNode(n);
                ((i = this.options) == null ? void 0 : i.onError) && (o == null ? void 0 : o.status) === "failed" && this.options.onError(l),
                ((c = this.options) == null ? void 0 : c.onLoad) && o.status === "loaded" && this.options.onLoad(l)
            } else {
                const l = r.getNode(n);
                if (!l)
                    return;
                l.extra = {
                    ...(l == null ? void 0 : l.extra) || {},
                    status: o.status
                }
            }
        }
    }
    class RenderContext {
        constructor(r) {
            b(this, "_isIncremental", !1);
            b(this, "_snapshotId");
            b(this, "_map", new Id2NodeMap);
            b(this, "_waitList", new PromiseList);
            b(this, "_deferredTaskQueue", new DeferredTaskQueue);
            b(this, "_nodeRenderers", new Map);
            this.mode = r
        }
        get nodes() {
            return this._map
        }
        get snapshotId() {
            return this._snapshotId ? this._snapshotId : "-"
        }
        get isIncremental() {
            return this._isIncremental
        }
        setSnapshotId(r) {
            this._snapshotId = r
        }
        setIncremental(r) {
            this._isIncremental = r
        }
        getNode(r) {
            return this._map.getNode(r)
        }
        registerNodeRenderer(r) {
            this._nodeRenderers.set(r.tag, r)
        }
        onNodeRender(r, t) {
            const n = this._nodeRenderers.get(r.tag);
            try {
                n && n.onRender(this, r, t)
            } catch (o) {
                console.error(o)
            }
        }
        onNodeRemove(r) {
            const t = this.nodes.getNode(r);
            if (!t)
                return;
            let n;
            this.isVanilla() ? n = this._nodeRenderers.get(t.tagName) : n = this._nodeRenderers.get(t.tag);
            try {
                n && n.onRemove(this, r)
            } catch (o) {
                console.error(o)
            }
        }
        onPatch(r, t, n) {
            if (r === "attrs")
                Reflect.set(t, r, Object.assign({}, t[r], n[r]));
            else if (r === "extra") {
                const o = this._nodeRenderers.get(t.tag);
                o && o.onPatchExtra && o.onPatchExtra(t, n)
            }
        }
        performEvent(r) {
            this._nodeRenderers.forEach(t => {
                t.performEvent(this, r)
            }
            )
        }
        addWaiting(r) {
            this._waitList.add(r)
        }
        deferTask(r) {
            this._deferredTaskQueue.enqueue(r)
        }
        async waitAsyncTask() {
            await this._waitList.all(),
            await this._deferredTaskQueue.executeAll()
        }
        capture() {
            var r;
            for (const t of this._map.keys())
                for (const n of this._nodeRenderers.values())
                    (r = n.onCapture) == null || r.call(n, this, t)
        }
        reset() {
            this._snapshotId && this._nodeRenderers.forEach(r => {
                var t;
                (t = r.onReset) == null || t.call(r, this)
            }
            ),
            this._map.reset(),
            this._waitList.clear(),
            this._deferredTaskQueue.clear()
        }
        isVanilla() {
            return this.mode === RenderMode.VanillaDOM
        }
        isVirtual() {
            return this.mode === RenderMode.VirtualDOM
        }
    }
    const RESOURCE_LOADING_TIMEOUT = 10 * 1e3;
    function lazyLoad(s, r=0) {
        return new Promise(t => {
            setTimeout( () => {
                const n = s();
                t(n)
            }
            , r)
        }
        )
    }
    function generateLoadingContext(s) {
        const r = s;
        return new Promise(t => {
            const n = setTimeout( () => {
                r.onload = null,
                r.onerror = null,
                t({
                    failed: !0,
                    timeout: !0,
                    element: r
                })
            }
            , RESOURCE_LOADING_TIMEOUT);
            r.onload = () => {
                clearTimeout(n),
                r.onload = null,
                r.onerror = null,
                t({
                    failed: !1,
                    timeout: !1,
                    element: r
                })
            }
            ,
            r.onerror = () => {
                clearTimeout(n),
                r.onload = null,
                r.onerror = null,
                t({
                    failed: !0,
                    timeout: !1,
                    element: r
                })
            }
        }
        )
    }
    function isLoadingSupported(s) {
        return !!(isHTMLLinkElement(s) && s.href && s.rel === "stylesheet" || isHTMLImageElement(s) && s.src && !s.src.startsWith("data:") && s.loading !== "lazy")
    }
    class StyleElementRenderer {
        get tag() {
            return "STYLE"
        }
        onRender(r, t) {
            if (r.isVanilla()) {
                const n = r.getNode(t.id);
                if (n && isHTMLElement(n) && isHTMLStyleElement(n)) {
                    const o = t;
                    o.extra && r.addWaiting(new Promise(i => {
                        setTimeout( () => {
                            var d;
                            if (!n.sheet) {
                                i({
                                    failed: !1,
                                    timeout: !1,
                                    element: n
                                });
                                return
                            }
                            const c = n.sheet
                              , l = (d = o.extra) == null ? void 0 : d.commands;
                            l == null || l.forEach(h => {
                                performStyleRuleSheet(c, h)
                            }
                            ),
                            i({
                                failed: !1,
                                timeout: !1,
                                element: n
                            })
                        }
                        , 0)
                    }
                    ))
                }
            }
        }
        onPatchExtra(r, t) {
            var o, i, c;
            const n = r.extra;
            "commands"in n && ((o = n.commands) == null ? void 0 : o.length) && (n.commands = [...(c = (i = t.extra) == null ? void 0 : i.commands) != null ? c : [], ...n.commands])
        }
        onRemove(r, t) {}
        performEvent(r, t) {
            t.eventType === TrackerEventType.HTMLMutations && t.data.forEach(o => {
                var i;
                if (o.type === VMutationType.StyleSheetRule) {
                    if (r.isVanilla()) {
                        const c = r.getNode(o.target);
                        if (!c)
                            return;
                        isHTMLElement(c) && isHTMLStyleElement(c) && c.sheet && performStyleRuleSheet(c.sheet, o.data)
                    } else if (r.isVirtual()) {
                        const c = r.getNode(o.target);
                        if (!c)
                            return;
                        const l = c;
                        l.extra || (l.extra = {
                            commands: []
                        }),
                        (i = l.extra.commands) == null || i.push(o.data)
                    }
                }
            }
            )
        }
    }
    function performStyleRuleSheet(s, r) {
        const t = RuleSheetMethodDecodes[r[0]];
        if (!t)
            return;
        const n = Reflect.get(s, t);
        try {
            Reflect.apply(n, s, r[1])
        } catch (o) {
            console.warn(o)
        }
    }
    class ShadowRootRenderer {
        get tag() {
            return "#document-fragment"
        }
        onRender(r, t, n) {
            const o = t.extra
              , i = o.styleSheets.sheets;
            if (r.isVanilla()) {
                const c = n;
                c.__styles = {},
                r.addWaiting(new Promise(l => {
                    setTimeout( () => {
                        const d = [];
                        for (let h = 0; h < i.length; h++) {
                            const f = i[h]
                              , m = o.styleSheets.rules[f]
                              , g = this._createHostedStyleSheet(c, m);
                            StyleSheetObserver.setSheetId(g, f),
                            d.push(g),
                            c.__styles[f] = g
                        }
                        c.adoptedStyleSheets = [...c.adoptedStyleSheets, ...d],
                        l({
                            failed: !1,
                            timeout: !1,
                            element: c
                        })
                    }
                    , 0)
                }
                ))
            }
        }
        onPatchExtra(r, t) {
            const {sheets: n, rules: o} = t.extra.styleSheets
              , i = {
                styleSheets: {
                    sheets: [...n],
                    rules: Object.keys(o).reduce( (d, h) => ({
                        ...d,
                        [h]: [...o[Number(h)]]
                    }), {})
                }
            }
              , l = r.extra.styleSheets;
            Object.keys(l.rules).forEach(d => {
                const h = i.styleSheets.rules[Number(d)];
                h ? h.push(...l.rules[Number(d)]) : (i.styleSheets.rules[Number(d)] = [...l.rules[Number(d)]],
                i.styleSheets.sheets.push(Number(d)))
            }
            ),
            r.extra = i
        }
        performEvent(r, t) {
            t.eventType === TrackerEventType.HTMLMutations && t.data.forEach(o => {
                o.type === VMutationType.StyleSheetRule ? this._performStyleSheetRuleChange(r, o) : o.type === VMutationType.StyleSheetAdopted && this._performStyleSheetAdoptedChange(r, o)
            }
            )
        }
        _createHostedStyleSheet(r, t) {
            var i;
            const n = (i = r.host.ownerDocument) == null ? void 0 : i.defaultView;
            let o;
            return n ? o = new n.CSSStyleSheet : o = new CSSStyleSheet,
            t == null || t.forEach(c => {
                performStyleRuleSheet(o, c)
            }
            ),
            o
        }
        _performStyleSheetRuleChange(r, t) {
            var n;
            if (r.isVanilla()) {
                const o = r.getNode(t.target);
                if (!o || !(o instanceof ShadowRoot) || !t.sheetId)
                    return;
                const i = (n = o.__styles) == null ? void 0 : n[t.sheetId];
                i && performStyleRuleSheet(i, t.data)
            } else if (r.isVirtual()) {
                const o = r.getNode(t.target);
                if (!(o && o.tag === this.tag) || !t.sheetId)
                    return;
                let i = o.extra;
                if (i || (i = {
                    styleSheets: {
                        sheets: [],
                        rules: {}
                    }
                },
                o.extra = i),
                i && i.styleSheets.rules) {
                    const c = i.styleSheets.rules[t.sheetId];
                    c ? c.push(t.data) : (i.styleSheets.rules[t.sheetId] = [t.data],
                    i.styleSheets.sheets.push(t.sheetId))
                }
            }
        }
        _performStyleSheetAdoptedChange(r, t) {
            if (r.isVanilla()) {
                const n = r.getNode(t.target);
                if (!n || !(n instanceof ShadowRoot))
                    return;
                r.addWaiting(lazyLoad( () => {
                    const o = n
                      , {sheets: i, rules: c} = t.data
                      , l = i.map(d => {
                        let h = o.__styles[d];
                        return h || (h = this._createHostedStyleSheet(o, c[d])),
                        h
                    }
                    );
                    return o.adoptedStyleSheets = l,
                    {
                        failed: !1,
                        timeout: !1,
                        element: o
                    }
                }
                ))
            } else if (r.isVirtual()) {
                const n = r.getNode(t.target);
                if (!n || n.tag !== this.tag)
                    return;
                const {sheets: o, rules: i} = t.data
                  , c = n.extra
                  , l = c.styleSheets.rules;
                c.styleSheets.rules = o.reduce( (d, h) => ({
                    ...d,
                    [h]: l[h] || i[h]
                }), {}),
                c.styleSheets.sheets = o
            }
        }
        onRemove(r, t) {}
    }
    class AbstractSnapshotRenderer extends EventEmitter {
        constructor(t, n) {
            super();
            b(this, "context");
            b(this, "_suspended", !0);
            this.context = new RenderContext(t),
            this.registerNodeRenderer(StyleElementRenderer),
            this.registerNodeRenderer(IFrameElementRenderer),
            this.registerNodeRenderer(CanvasElementRenderer),
            this.registerNodeRenderer(ImageElementRenderer, n == null ? void 0 : n.image),
            this.registerNodeRenderer(ShadowRootRenderer),
            this.context.nodes.on("nodeAdded", (o, i) => {
                this.emit("nodeAdded", o, i)
            }
            ),
            this.context.nodes.on("nodeRemoved", (o, i) => {
                this.emit("nodeRemoved", o, i)
            }
            ),
            this.context.nodes.on("nodeReset", () => {
                this.emit("nodeReset")
            }
            )
        }
        get suspended() {
            return this._suspended
        }
        getNode(t) {
            return this.context.nodes.getNode(t)
        }
        reset() {
            this.context.reset()
        }
        suspend() {
            this._suspended = !0
        }
        resume() {
            this._suspended = !1
        }
        registerNodeRenderer(t, ...n) {
            const o = Reflect.construct(t, [...n]);
            this.context.registerNodeRenderer(o)
        }
        async render(t) {
            if (t.version !== 1)
                throw new UnsupportedError(`Unsupported snapshot version ${t.version}.`);
            this.context.setSnapshotId(t.id),
            this.reset();
            const n = this.suspended;
            this.suspend(),
            this.renderWindow(t.window),
            this.renderDocument(t.document),
            n || this.resume()
        }
        async performEvent(t) {
            try {
                switch (t.eventType) {
                case TrackerEventType.HTMLSnapshot:
                    await this.render(t.data);
                    return;
                case TrackerEventType.HTMLMutations:
                    this.performMutations(t.data);
                    break;
                case TrackerEventType.HTMLNavigation:
                    this.performNavigation(t.data);
                    break;
                case TrackerEventType.HTMLScroll:
                    this.performScroll(t.data);
                    break;
                case TrackerEventType.HTMLFocus:
                    this.performFocus(t.data);
                    break;
                case TrackerEventType.HTMLBlur:
                    this.performBlur(t.data);
                    break;
                case TrackerEventType.HTMLValueChange:
                    this.performValueChange(t.data);
                    break;
                case TrackerEventType.HTMLResize:
                    this.performResize(t.data);
                    break
                }
                this.context.performEvent(t),
                await this.performPostRendering()
            } catch (n) {
                console.error(n)
            }
        }
        performMutations(t) {
            for (const n of t)
                try {
                    this.performMutation(n)
                } catch (o) {
                    console.error(o)
                }
        }
        performMutation(t) {
            switch (t.type) {
            case VMutationType.AddNode:
                this.performAddNodeMutation(t);
                break;
            case VMutationType.ChangeAttributes:
                this.performChangeAttributeMutation(t);
                break;
            case VMutationType.RemoveNode:
                this.performRemoveNodeMutation(t);
                break;
            case VMutationType.CharacterData:
                this.performCharacterDataMutation(t);
                break;
            case VMutationType.Document:
                this.performDocumentMutation(t);
                break
            }
        }
        async performPostRendering() {}
        performChangeAttributeMutation(t) {
            const n = this.getNode(t.target);
            if (!n)
                throw new RenderingError(`Node with ID '${t.target}' not found.`);
            this.applyAttrs(t.data, n)
        }
        performScroll(t) {
            const n = this.getNode(t.target);
            n && this.applyScrolling(t.scroll, n)
        }
        performFocus(t) {
            const n = this.getNode(t.target);
            if (n)
                this.applyFocus(n);
            else
                throw new RenderingError(`Node with ID '${t.target}' not found.`)
        }
        performBlur(t) {
            const n = this.getNode(t.target);
            if (n)
                this.applyBlur(n);
            else
                throw new RenderingError(`Node with ID '${t.target}' not found.`)
        }
        performValueChange(t) {
            const n = this.getNode(t.target);
            n && (typeof t.value == "string" ? this.applyValue(t.value, n) : this.applyCheckedState(t.value, n))
        }
        performResize(t) {
            this.applySize(t.size)
        }
    }
    class VirtualSnapshotRenderer extends AbstractSnapshotRenderer {
        constructor(t) {
            super(RenderMode.VirtualDOM, t);
            b(this, "_contentWindow");
            b(this, "_contentDocument");
            this._createNewContent()
        }
        get contentWindow() {
            return this._contentWindow
        }
        get contentDocument() {
            return this._contentDocument
        }
        get size() {
            return this.contentWindow.size
        }
        get documentTitle() {
            return this.contentDocument.title
        }
        get documentURL() {
            return this.contentWindow.location
        }
        get documentBaseURI() {
            return this.contentDocument.baseURI
        }
        getNode(t) {
            return this.context.nodes.getNode(t)
        }
        reset() {
            super.reset(),
            this._createNewContent()
        }
        async captureSnapshot() {
            const t = {
                version: 1,
                window: this.contentWindow,
                document: this._contentDocument,
                id: this.context.snapshotId
            };
            return this.context.capture(),
            await this.context.waitAsyncTask(),
            deepClone(t)
        }
        mergeIncrementalSnapshot(t, n) {
            let i = deepClone(t);
            return n.forEach( (c, l) => {
                const d = new Map;
                this.visitVElement(i.document.root, d),
                i = this.patchIncrementalSnapshot(i, deepClone(c), d)
            }
            ),
            i
        }
        visitVElement(t, n) {
            var o;
            n.set(t.id, t),
            (o = t.children) == null || o.forEach(i => {
                this.visitVElement(i, n)
            }
            )
        }
        pathVElement(t, n) {
            var i;
            const o = n.get(t.id);
            if (o) {
                const {children: c, ...l} = o;
                Object.keys(l).forEach(d => {
                    const h = d;
                    t[h] === void 0 ? Reflect.set(t, h, o[h]) : this.context.onPatch(h, t, o)
                }
                ),
                isVParentNode(t) && ((i = t.children) == null || i.forEach(d => {
                    this.pathVElement(d, n)
                }
                ))
            }
            return t
        }
        patchIncrementalSnapshot(t, n, o) {
            const i = this.pathVElement(n.document.root, o);
            t.window = {
                ...t.window,
                ...n.window
            };
            const {visibilityState: c} = n.document;
            return t.document.root = i,
            c && (t.document.visibilityState = c),
            t
        }
        _createNewContent() {
            this._contentWindow = {
                location: "about:blank",
                size: [0, 0]
            },
            this._contentDocument = {
                type: VNodeType.DocumentNode,
                id: 1,
                baseURI: "about:blank",
                title: "",
                root: {
                    id: 2,
                    parentId: 1,
                    tag: "HTML",
                    type: VNodeType.ElementNode
                },
                visibilityState: "hidden"
            }
        }
        renderWindow(t) {
            this._contentWindow = deepClone(t)
        }
        renderDocument(t) {
            this._contentDocument = deepClone(t),
            this.renderNode(this._contentDocument.root, !1)
        }
        renderNode(t, n=!0) {
            const o = n ? deepClone(t) : t;
            return this.context.nodes.addNode(t.id, o),
            this.context.onNodeRender(t, o),
            isVElement(o) && this._renderElementNode(o),
            isVParentNode(o) && this._renderChildren(o),
            o
        }
        _renderElementNode(t) {
            t.shadowRoot && this.renderNode(t.shadowRoot, !1)
        }
        _renderChildren(t) {
            if (!!t.children)
                for (const n of t.children)
                    this.renderNode(n, !1)
        }
        performNavigation(t) {
            this._contentWindow.location = t.to,
            this.emit("navigate", t)
        }
        performAddNodeMutation(t) {
            const n = this.getNode(t.target);
            if (!n)
                throw new RenderingError(`Target with ID '${t.target}' not found.`);
            const o = this.renderNode(t.data.node);
            n.children || (n.children = []);
            let i;
            t.data.before && (i = this.getNode(t.data.before));
            let c;
            i && (c = n.children.findIndex(l => l.id === (i == null ? void 0 : i.id))) !== -1 ? n.children.splice(c, 0, o) : n.children.push(o)
        }
        performRemoveNodeMutation(t) {
            const n = this.getNode(t.target);
            if (!n)
                throw new RenderingError(`Node with ID '${t.target}' not found.`);
            let o, i = [];
            typeof t.data == "object" ? (o = t.data.id,
            i = t.data.children) : o = t.data;
            const c = this.getNode(o);
            if (!c)
                throw new RenderingError(`Node with ID '${o}' not found.`);
            if (n.children) {
                const l = n.children.findIndex(d => d.id === c.id);
                l !== -1 && n.children.splice(l, 1)
            }
            i.forEach(l => {
                this.context.onNodeRemove(l),
                this.context.nodes.removeNode(l)
            }
            ),
            this.context.onNodeRemove(o),
            this.context.nodes.removeNode(o)
        }
        performCharacterDataMutation(t) {
            const n = this.getNode(t.target);
            if (!n)
                throw new RenderingError(`Node with ID '${t.target}' not found.`);
            t.data !== null ? n.text = t.data : delete n.text
        }
        performDocumentMutation(t) {
            t.data.visibilityState && (this.contentDocument.visibilityState = t.data.visibilityState)
        }
        applyAttrs(t, n) {
            for (const [o,i] of Object.entries(t))
                i !== null ? (n.attrs || (n.attrs = {}),
                n.attrs[o] = i) : n.attrs && delete n.attrs[o]
        }
        applyScrolling(t, n) {
            n.scroll = [...t]
        }
        applyValue(t, n) {
            n.value = t
        }
        applyCheckedState(t, n) {
            n.checked = t
        }
        applySize(t, n=!0) {
            this.contentWindow.size = [...t],
            n && this.emit("resize")
        }
        applyBlur() {}
        applyFocus() {}
    }
    class IncrementalSnapshotRenderer extends VirtualSnapshotRenderer {
        constructor(t) {
            super(t);
            b(this, "_changedWindow");
            b(this, "_changedDocument");
            b(this, "_changedCount", 0);
            this.context.setIncremental(!0),
            this._initIncremental()
        }
        get size() {
            return this._changedWindow.size || super.size
        }
        get documentTitle() {
            return this._changedDocument.title || super.documentTitle
        }
        get documentURL() {
            return this._changedWindow.location || super.documentURL
        }
        get documentBaseURI() {
            return this._changedDocument.baseURI || super.documentBaseURI
        }
        reset() {
            super.reset(),
            this._initIncremental()
        }
        _initIncremental() {
            this._changedWindow = {},
            this._changedDocument = {},
            this._changedCount = 0
        }
        getIncrementalPercent() {
            return this._changedCount / this.context.nodes.size()
        }
        renderWindow(t) {
            super.renderWindow(t)
        }
        renderDocument(t) {
            super.renderDocument(t),
            this._changedDocument.root = this.renderNode(t.root, !1)
        }
        async captureIncrementalSnapshot() {
            const t = {
                version: 1,
                window: this._changedWindow,
                document: this._changedDocument,
                id: this.context.snapshotId
            };
            this.context.capture(),
            await this.context.waitAsyncTask();
            const n = deepClone(t);
            return this._initIncremental(),
            this.context.reset(),
            this._changedDocument.root = this.renderNode(t.document.root, !1),
            n
        }
        renderNode(t, n=!0) {
            const {id: o, type: i} = t
              , c = n ? deepClone(t) : {
                id: o,
                type: i
            };
            return isVParentNode(t) && (c.children = this.__renderChildren(t, n)),
            isVElement(t) && t.shadowRoot && (c.shadowRoot = this.renderNode(t.shadowRoot, n)),
            this.context.nodes.addNode(t.id, c),
            c
        }
        __renderChildren(t, n=!0) {
            if (!!t.children)
                return t.children.map(o => this.renderNode(o, n))
        }
        performAddNodeMutation(t) {
            super.performAddNodeMutation(t),
            this._changedCount++
        }
        performNavigation(t) {
            this._changedWindow.location = t.to
        }
        applyAttrs(t, n) {
            for (const [o,i] of Object.entries(t))
                n.attrs || (n.attrs = {}),
                n.attrs[o] = i
        }
        applySize(t, n) {
            this._changedWindow.size = t,
            n && this.emit("resize")
        }
    }
    class SnapshotRenderer extends AbstractSnapshotRenderer {
        constructor(t=document.createElement("iframe"), n) {
            super(RenderMode.VanillaDOM, n);
            b(this, "contentDocument");
            b(this, "_documentLocation", null);
            b(this, "_documentBaseURI", null);
            b(this, "_size", [0, 0]);
            if (this.contentFrame = t,
            this.options = n,
            this.contentFrame.setAttribute("sandbox", "allow-same-origin"),
            this.contentFrame.style.background = "white",
            this.contentFrame.style.boxSizing = "border-box",
            this.contentFrame.style.border = "none",
            this.contentFrame.style.width = "0",
            this.contentFrame.style.height = "0",
            !this.contentFrame.contentDocument)
                throw new Error("content document is null");
            this.contentDocument = this.contentFrame.contentDocument,
            this.reset()
        }
        get documentTitle() {
            return this.contentDocument.title
        }
        get documentURL() {
            return this._documentLocation
        }
        get documentBaseURI() {
            return this._documentBaseURI
        }
        get size() {
            return this._size
        }
        reset() {
            super.reset(),
            this._documentBaseURI = null,
            this._documentLocation = null,
            this._size = [0, 0],
            this._beforeDocumentDispose(),
            this._createNewContentDocument(),
            this.context.reset()
        }
        async performPostRendering() {
            await this.context.waitAsyncTask()
        }
        _createNewContentDocument() {
            var t;
            this.contentDocument.open(),
            this.contentDocument.write("<!DOCTYPE html>"),
            this.contentDocument.close(),
            (t = this.contentDocument.documentElement) == null || t.remove(),
            this.emit("documentCreated")
        }
        _beforeDocumentDispose() {
            this.emit("documentDisposing")
        }
        renderWindow(t) {
            this._documentLocation = t.location,
            this.performResize(t)
        }
        renderDocument(t) {
            var o;
            this._documentBaseURI = t.baseURI;
            const n = document.createDocumentFragment();
            this._renderNodeWithParent(t.root, n),
            this.contentDocument.appendChild(n),
            t.visibilityState && ((o = this.contentFrame.parentElement) == null || o.setAttribute("bytereplay-visibilityState", t.visibilityState)),
            this.emit("documentLoad", t)
        }
        async render(t, n) {
            await super.render(t),
            (n == null ? void 0 : n.waitUntil) === "all" && await this.performPostRendering()
        }
        renderNode(t) {
            let n;
            switch (t.type) {
            case VNodeType.ElementNode:
                const o = t;
                n = this._renderElementNode(o);
                break;
            case VNodeType.CommentNode:
            case VNodeType.TextNode:
                n = this._renderTextNode(t);
                break;
            case VNodeType.DocumentFragmentNode:
                n = this._renderShadowRoot(t);
                break;
            default:
                throw new UnsupportedError(`Unsupported node type ${t.type}.`)
            }
            return this.context.nodes.addNode(t.id, n),
            this.context.onNodeRender(t, n),
            isVElement(t) && t.shadowRoot && this.renderNode(t.shadowRoot),
            this._renderChildren(t, n),
            n
        }
        _renderNodeWithParent(t, n, o) {
            const i = this.renderNode(t);
            return o ? n.insertBefore(i, o) : n.appendChild(i),
            i
        }
        _renderElementNode(t) {
            let n;
            t.ns ? n = this.contentDocument.createElementNS(t.ns, t.tag) : n = this.contentDocument.createElement(t.tag);
            const o = this._shouldIgnore(t);
            return t.tag === "HEAD" && (this._applyGlobalStyle(n),
            this._applyBaseURI(n),
            this._applyCSPMeta(n)),
            t.attrs !== void 0 && this.applyAttrs(t.attrs, n, o),
            t.extra !== void 0 && (n[CustomSnapshot] = t.extra),
            o || (t.scroll !== void 0 && this.applyScrolling(t.scroll, n),
            t.value !== void 0 && this.applyValue(t.value, n),
            t.checked !== void 0 && this.applyCheckedState(t.checked, n),
            this._applyLoading(n),
            isSVGUseElement(n) && this._applySVGUseFixing(n)),
            this._applyIdTagging(t.id, n),
            n
        }
        _renderTextNode(t) {
            var i, c;
            let n;
            const o = this._shouldIgnore(t);
            return t.type === VNodeType.CommentNode ? n = this.contentDocument.createComment(o ? "" : (i = t.text) != null ? i : "") : n = this.contentDocument.createTextNode(o ? "" : (c = t.text) != null ? c : ""),
            n
        }
        _renderShadowRoot(t) {
            if (t.parentId) {
                const n = this.context.getNode(t.parentId);
                if (!n)
                    throw new RenderingError(`Target with ID '${t.parentId}' not found.`);
                return n.attachShadow({
                    mode: "open"
                })
            }
            throw new RenderingError(`Render shadow root error. id = '${t.id}'.`)
        }
        _renderChildren(t, n) {
            if (!!t.children)
                for (const o of t.children)
                    this._renderNodeWithParent(o, n)
        }
        performNavigation(t) {
            this._documentLocation = t.to,
            this.emit("navigate", t)
        }
        performAddNodeMutation(t) {
            const n = this.getNode(t.target);
            if (!n)
                throw new RenderingError(`Target with ID '${t.target}' not found.`);
            let o;
            t.data.before && (o = this.getNode(t.data.before)),
            this._renderNodeWithParent(t.data.node, n, o)
        }
        performRemoveNodeMutation(t) {
            const n = this.getNode(t.target);
            if (!n)
                throw new RenderingError(`Parent node with ID '${t.target}' not found.`);
            let o, i = [];
            typeof t.data == "object" ? (o = t.data.id,
            i = t.data.children) : o = t.data;
            const c = this.getNode(o);
            if (!c)
                throw new RenderingError(`Node with ID '${o}' not found.`);
            try {
                n.removeChild(c)
            } catch {}
            i.forEach(l => {
                this.context.onNodeRemove(l),
                this.context.nodes.removeNode(l)
            }
            ),
            this.context.onNodeRemove(o),
            this.context.nodes.removeNode(o)
        }
        performCharacterDataMutation(t) {
            const n = this.getNode(t.target);
            if (!n)
                throw new RenderingError(`Node with ID '${t.target}' not found.`);
            shouldIgnore(n.parentElement) || (n.nodeValue = t.data)
        }
        performDocumentMutation(t) {
            var o;
            const n = this.getNode(t.target) || this.contentDocument;
            t.data.visibilityState && (this.contentDocument.body.setAttribute("bytereplay-visibilityState", t.data.visibilityState),
            (o = this.contentFrame.parentElement) == null || o.setAttribute("bytereplay-visibilityState", t.data.visibilityState),
            n.dispatchEvent(new CustomEvent("bytereplay.visibilityState",{
                detail: t.data.visibilityState
            })))
        }
        applyAttrs(t, n, o) {
            for (const [i,c] of Object.entries(t)) {
                if ((isHTMLIFrameElement(n) || isHTMLScriptElement(n)) && i === "src") {
                    n.setAttribute("data-bytereplay-src", c != null ? c : "");
                    continue
                }
                try {
                    c !== null ? n.setAttribute(i, c) : n.removeAttribute(i)
                } catch {}
            }
            o && n.setAttribute(DATA_MASK, DATA_MASK_MAP.ignore)
        }
        applyValue(t, n) {
            isHTMLInputElement(n) && n.type === "file" || (n.value = t)
        }
        applyCheckedState(t, n) {
            isHTMLInputElement(n) ? n.checked = t : isHTMLOptionElement(n) && (n.selected = t)
        }
        applyScrolling(t, n) {
            const o = () => {
                n.scrollTo({
                    left: t[0],
                    top: t[1],
                    behavior: this.suspended ? "auto" : "smooth"
                })
            }
            ;
            this.suspended ? this.context.deferTask(o) : o()
        }
        applyFocus(t) {
            const n = () => {
                typeof t.focus == "function" && t.focus()
            }
            ;
            this.suspended ? this.context.deferTask(n) : n()
        }
        applyBlur(t) {
            const n = () => {
                typeof t.blur == "function" && t.blur()
            }
            ;
            this.suspended ? this.context.deferTask(n) : n()
        }
        applySize(t, n=!0) {
            this._size = t,
            this.contentFrame.style.width = `${t[0]}px`,
            this.contentFrame.style.height = `${t[1]}px`,
            n && this.emit("resize")
        }
        _applySVGUseFixing(t) {
            const n = () => new Promise(o => {
                requestAnimationFrame( () => {
                    fixSVGUse(t),
                    o()
                }
                )
            }
            );
            this.suspended ? this.context.deferTask(n) : n()
        }
        _applyIdTagging(t, n) {
            setNodeIdAttribute(n, t)
        }
        _applyLoading(t) {
            if (isLoadingSupported(t)) {
                const n = generateLoadingContext(t);
                this.context.addWaiting(n)
            }
        }
        _applyBaseURI(t) {
            if (this.documentBaseURI) {
                const n = this.contentDocument.createElement("base");
                n.target = "_blank";
                let o = this.documentBaseURI;
                o.startsWith("http:") && (o = "https" + o.substring(4)),
                n.href = o,
                t.appendChild(n)
            }
        }
        _applyCSPMeta(t) {
            var o;
            const n = this.contentDocument.createElement("meta");
            n.setAttribute("http-equiv", "Content-Security-Policy"),
            n.setAttribute("content", ((o = this.options) == null ? void 0 : o.csp) || "upgrade-insecure-requests"),
            t.appendChild(n)
        }
        _applyGlobalStyle(t) {
            const n = this.contentDocument.createElement("style");
            n.textContent = `
      [bytereplay-visibilitystate="hidden"] .mouse-layer { display: none; }
      [${DATA_MASK}="${DATA_MASK_MAP.ignore}"] { visibility: hidden !important; pointer-events: none !important; }
    `,
            t.appendChild(n)
        }
        _shouldIgnore(t) {
            if (t.ignored)
                return !0;
            if (t.parentId) {
                const n = this.context.getNode(t.parentId);
                return shouldIgnore(n) || n && isHTMLElement(n) && isHTMLScriptElement(n)
            }
            return !1
        }
    }
    exports.AbstractSnapshotRenderer = AbstractSnapshotRenderer,
    exports.CanvasElementObserver = CanvasElementObserver,
    exports.CanvasElementRenderer = CanvasElementRenderer,
    exports.CapturingError = CapturingError,
    exports.DATA_NODE_ID = DATA_NODE_ID,
    exports.DocumentObserver = DocumentObserver,
    exports.GlobalEventObserver = GlobalEventObserver,
    exports.ImageElementObserver = ImageElementObserver,
    exports.ImageElementRenderer = ImageElementRenderer,
    exports.IncrementalSnapshotRenderer = IncrementalSnapshotRenderer,
    exports.ObserverContext = ObserverContext,
    exports.RenderContext = RenderContext,
    exports.RenderMode = RenderMode,
    exports.RenderingError = RenderingError,
    exports.RuleSheetMethodDecodes = RuleSheetMethodDecodes,
    exports.ShadowRootObserver = ShadowRootObserver,
    exports.SnapshotCapturer = SnapshotCapturer,
    exports.SnapshotError = SnapshotError,
    exports.SnapshotRenderer = SnapshotRenderer,
    exports.StyleElementObserver = StyleElementObserver,
    exports.StyleElementRenderer = StyleElementRenderer,
    exports.StyleSheetObserver = StyleSheetObserver,
    exports.VirtualSnapshotRenderer = VirtualSnapshotRenderer,
    exports.env = env,
    exports.generateLoadingContext = generateLoadingContext,
    exports.getNodeIdAttribute = getNodeIdAttribute,
    exports.isLoadingSupported = isLoadingSupported,
    exports.lazyLoad = lazyLoad,
    exports.performStyleRuleSheet = performStyleRuleSheet,
    exports.setNodeIdAttribute = setNodeIdAttribute,
    exports.version = version,
    Object.defineProperties(exports, {
        __esModule: {
            value: !0
        },
        [Symbol.toStringTag]: {
            value: "Module"
        }
    })
});
