import {
  require_Draft
} from "./chunk-AO7GMGER.js";
import "./chunk-S7NTK4BX.js";
import "./chunk-NK66VB5V.js";
import {
  require_react
} from "./chunk-SOSU2OUM.js";
import {
  __commonJS,
  __esm,
  __export,
  __toCommonJS
} from "./chunk-2LSFTFF7.js";

// node_modules/immutable/dist/immutable.es.js
var immutable_es_exports = {};
__export(immutable_es_exports, {
  Collection: () => Collection,
  Iterable: () => Iterable,
  List: () => List,
  Map: () => Map,
  OrderedMap: () => OrderedMap,
  OrderedSet: () => OrderedSet,
  PairSorting: () => PairSorting,
  Range: () => Range,
  Record: () => Record,
  Repeat: () => Repeat,
  Seq: () => Seq,
  Set: () => Set,
  Stack: () => Stack,
  default: () => immutable_es_default,
  fromJS: () => fromJS,
  get: () => get,
  getIn: () => getIn$1,
  has: () => has,
  hasIn: () => hasIn$1,
  hash: () => hash,
  is: () => is,
  isAssociative: () => isAssociative,
  isCollection: () => isCollection,
  isImmutable: () => isImmutable,
  isIndexed: () => isIndexed,
  isKeyed: () => isKeyed,
  isList: () => isList,
  isMap: () => isMap,
  isOrdered: () => isOrdered,
  isOrderedMap: () => isOrderedMap,
  isOrderedSet: () => isOrderedSet,
  isPlainObject: () => isPlainObject,
  isRecord: () => isRecord,
  isSeq: () => isSeq,
  isSet: () => isSet,
  isStack: () => isStack,
  isValueObject: () => isValueObject,
  merge: () => merge,
  mergeDeep: () => mergeDeep$1,
  mergeDeepWith: () => mergeDeepWith$1,
  mergeWith: () => mergeWith,
  remove: () => remove,
  removeIn: () => removeIn,
  set: () => set,
  setIn: () => setIn$1,
  update: () => update$1,
  updateIn: () => updateIn$1,
  version: () => version
});
function MakeRef() {
  return { value: false };
}
function SetRef(ref) {
  if (ref) {
    ref.value = true;
  }
}
function OwnerID() {
}
function ensureSize(iter) {
  if (iter.size === void 0) {
    iter.size = iter.__iterate(returnTrue);
  }
  return iter.size;
}
function wrapIndex(iter, index) {
  if (typeof index !== "number") {
    var uint32Index = index >>> 0;
    if ("" + uint32Index !== index || uint32Index === 4294967295) {
      return NaN;
    }
    index = uint32Index;
  }
  return index < 0 ? ensureSize(iter) + index : index;
}
function returnTrue() {
  return true;
}
function wholeSlice(begin, end, size) {
  return (begin === 0 && !isNeg(begin) || size !== void 0 && begin <= -size) && (end === void 0 || size !== void 0 && end >= size);
}
function resolveBegin(begin, size) {
  return resolveIndex(begin, size, 0);
}
function resolveEnd(end, size) {
  return resolveIndex(end, size, size);
}
function resolveIndex(index, size, defaultIndex) {
  return index === void 0 ? defaultIndex : isNeg(index) ? size === Infinity ? size : Math.max(0, size + index) | 0 : size === void 0 || size === index ? index : Math.min(size, index) | 0;
}
function isNeg(value) {
  return value < 0 || value === 0 && 1 / value === -Infinity;
}
function isCollection(maybeCollection) {
  return Boolean(maybeCollection && maybeCollection[IS_COLLECTION_SYMBOL]);
}
function isKeyed(maybeKeyed) {
  return Boolean(maybeKeyed && maybeKeyed[IS_KEYED_SYMBOL]);
}
function isIndexed(maybeIndexed) {
  return Boolean(maybeIndexed && maybeIndexed[IS_INDEXED_SYMBOL]);
}
function isAssociative(maybeAssociative) {
  return isKeyed(maybeAssociative) || isIndexed(maybeAssociative);
}
function isSeq(maybeSeq) {
  return Boolean(maybeSeq && maybeSeq[IS_SEQ_SYMBOL]);
}
function isRecord(maybeRecord) {
  return Boolean(maybeRecord && maybeRecord[IS_RECORD_SYMBOL]);
}
function isImmutable(maybeImmutable) {
  return isCollection(maybeImmutable) || isRecord(maybeImmutable);
}
function isOrdered(maybeOrdered) {
  return Boolean(maybeOrdered && maybeOrdered[IS_ORDERED_SYMBOL]);
}
function iteratorValue(type, k, v, iteratorResult) {
  var value = type === 0 ? k : type === 1 ? v : [k, v];
  iteratorResult ? iteratorResult.value = value : iteratorResult = {
    value,
    done: false
  };
  return iteratorResult;
}
function iteratorDone() {
  return { value: void 0, done: true };
}
function hasIterator(maybeIterable) {
  if (Array.isArray(maybeIterable)) {
    return true;
  }
  return !!getIteratorFn(maybeIterable);
}
function isIterator(maybeIterator) {
  return maybeIterator && typeof maybeIterator.next === "function";
}
function getIterator(iterable) {
  var iteratorFn = getIteratorFn(iterable);
  return iteratorFn && iteratorFn.call(iterable);
}
function getIteratorFn(iterable) {
  var iteratorFn = iterable && (REAL_ITERATOR_SYMBOL && iterable[REAL_ITERATOR_SYMBOL] || iterable[FAUX_ITERATOR_SYMBOL]);
  if (typeof iteratorFn === "function") {
    return iteratorFn;
  }
}
function isEntriesIterable(maybeIterable) {
  var iteratorFn = getIteratorFn(maybeIterable);
  return iteratorFn && iteratorFn === maybeIterable.entries;
}
function isKeysIterable(maybeIterable) {
  var iteratorFn = getIteratorFn(maybeIterable);
  return iteratorFn && iteratorFn === maybeIterable.keys;
}
function isArrayLike(value) {
  if (Array.isArray(value) || typeof value === "string") {
    return true;
  }
  return value && typeof value === "object" && Number.isInteger(value.length) && value.length >= 0 && (value.length === 0 ? (
    // Only {length: 0} is considered Array-like.
    Object.keys(value).length === 1
  ) : (
    // An object is only Array-like if it has a property where the last value
    // in the array-like may be found (which could be undefined).
    value.hasOwnProperty(value.length - 1)
  ));
}
function emptySequence() {
  return EMPTY_SEQ || (EMPTY_SEQ = new ArraySeq([]));
}
function keyedSeqFromValue(value) {
  var seq = maybeIndexedSeqFromValue(value);
  if (seq) {
    return seq.fromEntrySeq();
  }
  if (typeof value === "object") {
    return new ObjectSeq(value);
  }
  throw new TypeError(
    "Expected Array or collection object of [k, v] entries, or keyed object: " + value
  );
}
function indexedSeqFromValue(value) {
  var seq = maybeIndexedSeqFromValue(value);
  if (seq) {
    return seq;
  }
  throw new TypeError(
    "Expected Array or collection object of values: " + value
  );
}
function seqFromValue(value) {
  var seq = maybeIndexedSeqFromValue(value);
  if (seq) {
    return isEntriesIterable(value) ? seq.fromEntrySeq() : isKeysIterable(value) ? seq.toSetSeq() : seq;
  }
  if (typeof value === "object") {
    return new ObjectSeq(value);
  }
  throw new TypeError(
    "Expected Array or collection object of values, or keyed object: " + value
  );
}
function maybeIndexedSeqFromValue(value) {
  return isArrayLike(value) ? new ArraySeq(value) : hasIterator(value) ? new CollectionSeq(value) : void 0;
}
function isMap(maybeMap) {
  return Boolean(maybeMap && maybeMap[IS_MAP_SYMBOL]);
}
function isOrderedMap(maybeOrderedMap) {
  return isMap(maybeOrderedMap) && isOrdered(maybeOrderedMap);
}
function isValueObject(maybeValue) {
  return Boolean(
    maybeValue && typeof maybeValue.equals === "function" && typeof maybeValue.hashCode === "function"
  );
}
function is(valueA, valueB) {
  if (valueA === valueB || valueA !== valueA && valueB !== valueB) {
    return true;
  }
  if (!valueA || !valueB) {
    return false;
  }
  if (typeof valueA.valueOf === "function" && typeof valueB.valueOf === "function") {
    valueA = valueA.valueOf();
    valueB = valueB.valueOf();
    if (valueA === valueB || valueA !== valueA && valueB !== valueB) {
      return true;
    }
    if (!valueA || !valueB) {
      return false;
    }
  }
  return !!(isValueObject(valueA) && isValueObject(valueB) && valueA.equals(valueB));
}
function smi(i32) {
  return i32 >>> 1 & 1073741824 | i32 & 3221225471;
}
function hash(o) {
  if (o == null) {
    return hashNullish(o);
  }
  if (typeof o.hashCode === "function") {
    return smi(o.hashCode(o));
  }
  var v = valueOf(o);
  if (v == null) {
    return hashNullish(v);
  }
  switch (typeof v) {
    case "boolean":
      return v ? 1108378657 : 1108378656;
    case "number":
      return hashNumber(v);
    case "string":
      return v.length > STRING_HASH_CACHE_MIN_STRLEN ? cachedHashString(v) : hashString(v);
    case "object":
    case "function":
      return hashJSObj(v);
    case "symbol":
      return hashSymbol(v);
    default:
      if (typeof v.toString === "function") {
        return hashString(v.toString());
      }
      throw new Error("Value type " + typeof v + " cannot be hashed.");
  }
}
function hashNullish(nullish) {
  return nullish === null ? 1108378658 : (
    /* undefined */
    1108378659
  );
}
function hashNumber(n) {
  if (n !== n || n === Infinity) {
    return 0;
  }
  var hash2 = n | 0;
  if (hash2 !== n) {
    hash2 ^= n * 4294967295;
  }
  while (n > 4294967295) {
    n /= 4294967295;
    hash2 ^= n;
  }
  return smi(hash2);
}
function cachedHashString(string) {
  var hashed = stringHashCache[string];
  if (hashed === void 0) {
    hashed = hashString(string);
    if (STRING_HASH_CACHE_SIZE === STRING_HASH_CACHE_MAX_SIZE) {
      STRING_HASH_CACHE_SIZE = 0;
      stringHashCache = {};
    }
    STRING_HASH_CACHE_SIZE++;
    stringHashCache[string] = hashed;
  }
  return hashed;
}
function hashString(string) {
  var hashed = 0;
  for (var ii = 0; ii < string.length; ii++) {
    hashed = 31 * hashed + string.charCodeAt(ii) | 0;
  }
  return smi(hashed);
}
function hashSymbol(sym) {
  var hashed = symbolMap[sym];
  if (hashed !== void 0) {
    return hashed;
  }
  hashed = nextHash();
  symbolMap[sym] = hashed;
  return hashed;
}
function hashJSObj(obj) {
  var hashed;
  if (usingWeakMap) {
    hashed = weakMap.get(obj);
    if (hashed !== void 0) {
      return hashed;
    }
  }
  hashed = obj[UID_HASH_KEY];
  if (hashed !== void 0) {
    return hashed;
  }
  if (!canDefineProperty) {
    hashed = obj.propertyIsEnumerable && obj.propertyIsEnumerable[UID_HASH_KEY];
    if (hashed !== void 0) {
      return hashed;
    }
    hashed = getIENodeHash(obj);
    if (hashed !== void 0) {
      return hashed;
    }
  }
  hashed = nextHash();
  if (usingWeakMap) {
    weakMap.set(obj, hashed);
  } else if (isExtensible !== void 0 && isExtensible(obj) === false) {
    throw new Error("Non-extensible objects are not allowed as keys.");
  } else if (canDefineProperty) {
    Object.defineProperty(obj, UID_HASH_KEY, {
      enumerable: false,
      configurable: false,
      writable: false,
      value: hashed
    });
  } else if (obj.propertyIsEnumerable !== void 0 && obj.propertyIsEnumerable === obj.constructor.prototype.propertyIsEnumerable) {
    obj.propertyIsEnumerable = function() {
      return this.constructor.prototype.propertyIsEnumerable.apply(
        this,
        arguments
      );
    };
    obj.propertyIsEnumerable[UID_HASH_KEY] = hashed;
  } else if (obj.nodeType !== void 0) {
    obj[UID_HASH_KEY] = hashed;
  } else {
    throw new Error("Unable to set a non-enumerable property on object.");
  }
  return hashed;
}
function getIENodeHash(node) {
  if (node && node.nodeType > 0) {
    switch (node.nodeType) {
      case 1:
        return node.uniqueID;
      case 9:
        return node.documentElement && node.documentElement.uniqueID;
    }
  }
}
function valueOf(obj) {
  return obj.valueOf !== defaultValueOf && typeof obj.valueOf === "function" ? obj.valueOf(obj) : obj;
}
function nextHash() {
  var nextHash2 = ++_objHashUID;
  if (_objHashUID & 1073741824) {
    _objHashUID = 0;
  }
  return nextHash2;
}
function flipFactory(collection) {
  var flipSequence = makeSequence(collection);
  flipSequence._iter = collection;
  flipSequence.size = collection.size;
  flipSequence.flip = function() {
    return collection;
  };
  flipSequence.reverse = function() {
    var reversedSequence = collection.reverse.apply(this);
    reversedSequence.flip = function() {
      return collection.reverse();
    };
    return reversedSequence;
  };
  flipSequence.has = function(key) {
    return collection.includes(key);
  };
  flipSequence.includes = function(key) {
    return collection.has(key);
  };
  flipSequence.cacheResult = cacheResultThrough;
  flipSequence.__iterateUncached = function(fn, reverse3) {
    var this$1$1 = this;
    return collection.__iterate(function(v, k) {
      return fn(k, v, this$1$1) !== false;
    }, reverse3);
  };
  flipSequence.__iteratorUncached = function(type, reverse3) {
    if (type === ITERATE_ENTRIES) {
      var iterator = collection.__iterator(type, reverse3);
      return new Iterator(function() {
        var step = iterator.next();
        if (!step.done) {
          var k = step.value[0];
          step.value[0] = step.value[1];
          step.value[1] = k;
        }
        return step;
      });
    }
    return collection.__iterator(
      type === ITERATE_VALUES ? ITERATE_KEYS : ITERATE_VALUES,
      reverse3
    );
  };
  return flipSequence;
}
function mapFactory(collection, mapper, context) {
  var mappedSequence = makeSequence(collection);
  mappedSequence.size = collection.size;
  mappedSequence.has = function(key) {
    return collection.has(key);
  };
  mappedSequence.get = function(key, notSetValue) {
    var v = collection.get(key, NOT_SET);
    return v === NOT_SET ? notSetValue : mapper.call(context, v, key, collection);
  };
  mappedSequence.__iterateUncached = function(fn, reverse3) {
    var this$1$1 = this;
    return collection.__iterate(
      function(v, k, c) {
        return fn(mapper.call(context, v, k, c), k, this$1$1) !== false;
      },
      reverse3
    );
  };
  mappedSequence.__iteratorUncached = function(type, reverse3) {
    var iterator = collection.__iterator(ITERATE_ENTRIES, reverse3);
    return new Iterator(function() {
      var step = iterator.next();
      if (step.done) {
        return step;
      }
      var entry = step.value;
      var key = entry[0];
      return iteratorValue(
        type,
        key,
        mapper.call(context, entry[1], key, collection),
        step
      );
    });
  };
  return mappedSequence;
}
function reverseFactory(collection, useKeys) {
  var this$1$1 = this;
  var reversedSequence = makeSequence(collection);
  reversedSequence._iter = collection;
  reversedSequence.size = collection.size;
  reversedSequence.reverse = function() {
    return collection;
  };
  if (collection.flip) {
    reversedSequence.flip = function() {
      var flipSequence = flipFactory(collection);
      flipSequence.reverse = function() {
        return collection.flip();
      };
      return flipSequence;
    };
  }
  reversedSequence.get = function(key, notSetValue) {
    return collection.get(useKeys ? key : -1 - key, notSetValue);
  };
  reversedSequence.has = function(key) {
    return collection.has(useKeys ? key : -1 - key);
  };
  reversedSequence.includes = function(value) {
    return collection.includes(value);
  };
  reversedSequence.cacheResult = cacheResultThrough;
  reversedSequence.__iterate = function(fn, reverse3) {
    var this$1$12 = this;
    var i = 0;
    reverse3 && ensureSize(collection);
    return collection.__iterate(
      function(v, k) {
        return fn(v, useKeys ? k : reverse3 ? this$1$12.size - ++i : i++, this$1$12);
      },
      !reverse3
    );
  };
  reversedSequence.__iterator = function(type, reverse3) {
    var i = 0;
    reverse3 && ensureSize(collection);
    var iterator = collection.__iterator(ITERATE_ENTRIES, !reverse3);
    return new Iterator(function() {
      var step = iterator.next();
      if (step.done) {
        return step;
      }
      var entry = step.value;
      return iteratorValue(
        type,
        useKeys ? entry[0] : reverse3 ? this$1$1.size - ++i : i++,
        entry[1],
        step
      );
    });
  };
  return reversedSequence;
}
function filterFactory(collection, predicate, context, useKeys) {
  var filterSequence = makeSequence(collection);
  if (useKeys) {
    filterSequence.has = function(key) {
      var v = collection.get(key, NOT_SET);
      return v !== NOT_SET && !!predicate.call(context, v, key, collection);
    };
    filterSequence.get = function(key, notSetValue) {
      var v = collection.get(key, NOT_SET);
      return v !== NOT_SET && predicate.call(context, v, key, collection) ? v : notSetValue;
    };
  }
  filterSequence.__iterateUncached = function(fn, reverse3) {
    var this$1$1 = this;
    var iterations = 0;
    collection.__iterate(function(v, k, c) {
      if (predicate.call(context, v, k, c)) {
        iterations++;
        return fn(v, useKeys ? k : iterations - 1, this$1$1);
      }
    }, reverse3);
    return iterations;
  };
  filterSequence.__iteratorUncached = function(type, reverse3) {
    var iterator = collection.__iterator(ITERATE_ENTRIES, reverse3);
    var iterations = 0;
    return new Iterator(function() {
      while (true) {
        var step = iterator.next();
        if (step.done) {
          return step;
        }
        var entry = step.value;
        var key = entry[0];
        var value = entry[1];
        if (predicate.call(context, value, key, collection)) {
          return iteratorValue(type, useKeys ? key : iterations++, value, step);
        }
      }
    });
  };
  return filterSequence;
}
function countByFactory(collection, grouper, context) {
  var groups = Map().asMutable();
  collection.__iterate(function(v, k) {
    groups.update(grouper.call(context, v, k, collection), 0, function(a) {
      return a + 1;
    });
  });
  return groups.asImmutable();
}
function groupByFactory(collection, grouper, context) {
  var isKeyedIter = isKeyed(collection);
  var groups = (isOrdered(collection) ? OrderedMap() : Map()).asMutable();
  collection.__iterate(function(v, k) {
    groups.update(
      grouper.call(context, v, k, collection),
      function(a) {
        return a = a || [], a.push(isKeyedIter ? [k, v] : v), a;
      }
    );
  });
  var coerce = collectionClass(collection);
  return groups.map(function(arr) {
    return reify(collection, coerce(arr));
  }).asImmutable();
}
function partitionFactory(collection, predicate, context) {
  var isKeyedIter = isKeyed(collection);
  var groups = [[], []];
  collection.__iterate(function(v, k) {
    groups[predicate.call(context, v, k, collection) ? 1 : 0].push(
      isKeyedIter ? [k, v] : v
    );
  });
  var coerce = collectionClass(collection);
  return groups.map(function(arr) {
    return reify(collection, coerce(arr));
  });
}
function sliceFactory(collection, begin, end, useKeys) {
  var originalSize = collection.size;
  if (wholeSlice(begin, end, originalSize)) {
    return collection;
  }
  var resolvedBegin = resolveBegin(begin, originalSize);
  var resolvedEnd = resolveEnd(end, originalSize);
  if (resolvedBegin !== resolvedBegin || resolvedEnd !== resolvedEnd) {
    return sliceFactory(collection.toSeq().cacheResult(), begin, end, useKeys);
  }
  var resolvedSize = resolvedEnd - resolvedBegin;
  var sliceSize;
  if (resolvedSize === resolvedSize) {
    sliceSize = resolvedSize < 0 ? 0 : resolvedSize;
  }
  var sliceSeq = makeSequence(collection);
  sliceSeq.size = sliceSize === 0 ? sliceSize : collection.size && sliceSize || void 0;
  if (!useKeys && isSeq(collection) && sliceSize >= 0) {
    sliceSeq.get = function(index, notSetValue) {
      index = wrapIndex(this, index);
      return index >= 0 && index < sliceSize ? collection.get(index + resolvedBegin, notSetValue) : notSetValue;
    };
  }
  sliceSeq.__iterateUncached = function(fn, reverse3) {
    var this$1$1 = this;
    if (sliceSize === 0) {
      return 0;
    }
    if (reverse3) {
      return this.cacheResult().__iterate(fn, reverse3);
    }
    var skipped = 0;
    var isSkipping = true;
    var iterations = 0;
    collection.__iterate(function(v, k) {
      if (!(isSkipping && (isSkipping = skipped++ < resolvedBegin))) {
        iterations++;
        return fn(v, useKeys ? k : iterations - 1, this$1$1) !== false && iterations !== sliceSize;
      }
    });
    return iterations;
  };
  sliceSeq.__iteratorUncached = function(type, reverse3) {
    if (sliceSize !== 0 && reverse3) {
      return this.cacheResult().__iterator(type, reverse3);
    }
    if (sliceSize === 0) {
      return new Iterator(iteratorDone);
    }
    var iterator = collection.__iterator(type, reverse3);
    var skipped = 0;
    var iterations = 0;
    return new Iterator(function() {
      while (skipped++ < resolvedBegin) {
        iterator.next();
      }
      if (++iterations > sliceSize) {
        return iteratorDone();
      }
      var step = iterator.next();
      if (useKeys || type === ITERATE_VALUES || step.done) {
        return step;
      }
      if (type === ITERATE_KEYS) {
        return iteratorValue(type, iterations - 1, void 0, step);
      }
      return iteratorValue(type, iterations - 1, step.value[1], step);
    });
  };
  return sliceSeq;
}
function takeWhileFactory(collection, predicate, context) {
  var takeSequence = makeSequence(collection);
  takeSequence.__iterateUncached = function(fn, reverse3) {
    var this$1$1 = this;
    if (reverse3) {
      return this.cacheResult().__iterate(fn, reverse3);
    }
    var iterations = 0;
    collection.__iterate(
      function(v, k, c) {
        return predicate.call(context, v, k, c) && ++iterations && fn(v, k, this$1$1);
      }
    );
    return iterations;
  };
  takeSequence.__iteratorUncached = function(type, reverse3) {
    var this$1$1 = this;
    if (reverse3) {
      return this.cacheResult().__iterator(type, reverse3);
    }
    var iterator = collection.__iterator(ITERATE_ENTRIES, reverse3);
    var iterating = true;
    return new Iterator(function() {
      if (!iterating) {
        return iteratorDone();
      }
      var step = iterator.next();
      if (step.done) {
        return step;
      }
      var entry = step.value;
      var k = entry[0];
      var v = entry[1];
      if (!predicate.call(context, v, k, this$1$1)) {
        iterating = false;
        return iteratorDone();
      }
      return type === ITERATE_ENTRIES ? step : iteratorValue(type, k, v, step);
    });
  };
  return takeSequence;
}
function skipWhileFactory(collection, predicate, context, useKeys) {
  var skipSequence = makeSequence(collection);
  skipSequence.__iterateUncached = function(fn, reverse3) {
    var this$1$1 = this;
    if (reverse3) {
      return this.cacheResult().__iterate(fn, reverse3);
    }
    var isSkipping = true;
    var iterations = 0;
    collection.__iterate(function(v, k, c) {
      if (!(isSkipping && (isSkipping = predicate.call(context, v, k, c)))) {
        iterations++;
        return fn(v, useKeys ? k : iterations - 1, this$1$1);
      }
    });
    return iterations;
  };
  skipSequence.__iteratorUncached = function(type, reverse3) {
    var this$1$1 = this;
    if (reverse3) {
      return this.cacheResult().__iterator(type, reverse3);
    }
    var iterator = collection.__iterator(ITERATE_ENTRIES, reverse3);
    var skipping = true;
    var iterations = 0;
    return new Iterator(function() {
      var step;
      var k;
      var v;
      do {
        step = iterator.next();
        if (step.done) {
          if (useKeys || type === ITERATE_VALUES) {
            return step;
          }
          if (type === ITERATE_KEYS) {
            return iteratorValue(type, iterations++, void 0, step);
          }
          return iteratorValue(type, iterations++, step.value[1], step);
        }
        var entry = step.value;
        k = entry[0];
        v = entry[1];
        skipping && (skipping = predicate.call(context, v, k, this$1$1));
      } while (skipping);
      return type === ITERATE_ENTRIES ? step : iteratorValue(type, k, v, step);
    });
  };
  return skipSequence;
}
function concatFactory(collection, values2) {
  var isKeyedCollection = isKeyed(collection);
  var iters = [collection].concat(values2).map(function(v) {
    if (!isCollection(v)) {
      v = isKeyedCollection ? keyedSeqFromValue(v) : indexedSeqFromValue(Array.isArray(v) ? v : [v]);
    } else if (isKeyedCollection) {
      v = KeyedCollection(v);
    }
    return v;
  }).filter(function(v) {
    return v.size !== 0;
  });
  if (iters.length === 0) {
    return collection;
  }
  if (iters.length === 1) {
    var singleton = iters[0];
    if (singleton === collection || isKeyedCollection && isKeyed(singleton) || isIndexed(collection) && isIndexed(singleton)) {
      return singleton;
    }
  }
  var concatSeq = new ArraySeq(iters);
  if (isKeyedCollection) {
    concatSeq = concatSeq.toKeyedSeq();
  } else if (!isIndexed(collection)) {
    concatSeq = concatSeq.toSetSeq();
  }
  concatSeq = concatSeq.flatten(true);
  concatSeq.size = iters.reduce(function(sum, seq) {
    if (sum !== void 0) {
      var size = seq.size;
      if (size !== void 0) {
        return sum + size;
      }
    }
  }, 0);
  return concatSeq;
}
function flattenFactory(collection, depth, useKeys) {
  var flatSequence = makeSequence(collection);
  flatSequence.__iterateUncached = function(fn, reverse3) {
    if (reverse3) {
      return this.cacheResult().__iterate(fn, reverse3);
    }
    var iterations = 0;
    var stopped = false;
    function flatDeep(iter, currentDepth) {
      iter.__iterate(function(v, k) {
        if ((!depth || currentDepth < depth) && isCollection(v)) {
          flatDeep(v, currentDepth + 1);
        } else {
          iterations++;
          if (fn(v, useKeys ? k : iterations - 1, flatSequence) === false) {
            stopped = true;
          }
        }
        return !stopped;
      }, reverse3);
    }
    flatDeep(collection, 0);
    return iterations;
  };
  flatSequence.__iteratorUncached = function(type, reverse3) {
    if (reverse3) {
      return this.cacheResult().__iterator(type, reverse3);
    }
    var iterator = collection.__iterator(type, reverse3);
    var stack = [];
    var iterations = 0;
    return new Iterator(function() {
      while (iterator) {
        var step = iterator.next();
        if (step.done !== false) {
          iterator = stack.pop();
          continue;
        }
        var v = step.value;
        if (type === ITERATE_ENTRIES) {
          v = v[1];
        }
        if ((!depth || stack.length < depth) && isCollection(v)) {
          stack.push(iterator);
          iterator = v.__iterator(type, reverse3);
        } else {
          return useKeys ? step : iteratorValue(type, iterations++, v, step);
        }
      }
      return iteratorDone();
    });
  };
  return flatSequence;
}
function flatMapFactory(collection, mapper, context) {
  var coerce = collectionClass(collection);
  return collection.toSeq().map(function(v, k) {
    return coerce(mapper.call(context, v, k, collection));
  }).flatten(true);
}
function interposeFactory(collection, separator) {
  var interposedSequence = makeSequence(collection);
  interposedSequence.size = collection.size && collection.size * 2 - 1;
  interposedSequence.__iterateUncached = function(fn, reverse3) {
    var this$1$1 = this;
    var iterations = 0;
    collection.__iterate(
      function(v) {
        return (!iterations || fn(separator, iterations++, this$1$1) !== false) && fn(v, iterations++, this$1$1) !== false;
      },
      reverse3
    );
    return iterations;
  };
  interposedSequence.__iteratorUncached = function(type, reverse3) {
    var iterator = collection.__iterator(ITERATE_VALUES, reverse3);
    var iterations = 0;
    var step;
    return new Iterator(function() {
      if (!step || iterations % 2) {
        step = iterator.next();
        if (step.done) {
          return step;
        }
      }
      return iterations % 2 ? iteratorValue(type, iterations++, separator) : iteratorValue(type, iterations++, step.value, step);
    });
  };
  return interposedSequence;
}
function sortFactory(collection, comparator, mapper) {
  if (!comparator) {
    comparator = defaultComparator;
  }
  var isKeyedCollection = isKeyed(collection);
  var index = 0;
  var entries3 = collection.toSeq().map(function(v, k) {
    return [k, v, index++, mapper ? mapper(v, k, collection) : v];
  }).valueSeq().toArray();
  entries3.sort(function(a, b) {
    return comparator(a[3], b[3]) || a[2] - b[2];
  }).forEach(
    isKeyedCollection ? function(v, i) {
      entries3[i].length = 2;
    } : function(v, i) {
      entries3[i] = v[1];
    }
  );
  return isKeyedCollection ? KeyedSeq(entries3) : isIndexed(collection) ? IndexedSeq(entries3) : SetSeq(entries3);
}
function maxFactory(collection, comparator, mapper) {
  if (!comparator) {
    comparator = defaultComparator;
  }
  if (mapper) {
    var entry = collection.toSeq().map(function(v, k) {
      return [v, mapper(v, k, collection)];
    }).reduce(function(a, b) {
      return maxCompare(comparator, a[1], b[1]) ? b : a;
    });
    return entry && entry[0];
  }
  return collection.reduce(function(a, b) {
    return maxCompare(comparator, a, b) ? b : a;
  });
}
function maxCompare(comparator, a, b) {
  var comp = comparator(b, a);
  return comp === 0 && b !== a && (b === void 0 || b === null || b !== b) || comp > 0;
}
function zipWithFactory(keyIter, zipper, iters, zipAll2) {
  var zipSequence = makeSequence(keyIter);
  var sizes = new ArraySeq(iters).map(function(i) {
    return i.size;
  });
  zipSequence.size = zipAll2 ? sizes.max() : sizes.min();
  zipSequence.__iterate = function(fn, reverse3) {
    var iterator = this.__iterator(ITERATE_VALUES, reverse3);
    var step;
    var iterations = 0;
    while (!(step = iterator.next()).done) {
      if (fn(step.value, iterations++, this) === false) {
        break;
      }
    }
    return iterations;
  };
  zipSequence.__iteratorUncached = function(type, reverse3) {
    var iterators = iters.map(
      function(i) {
        return i = Collection(i), getIterator(reverse3 ? i.reverse() : i);
      }
    );
    var iterations = 0;
    var isDone = false;
    return new Iterator(function() {
      var steps;
      if (!isDone) {
        steps = iterators.map(function(i) {
          return i.next();
        });
        isDone = zipAll2 ? steps.every(function(s) {
          return s.done;
        }) : steps.some(function(s) {
          return s.done;
        });
      }
      if (isDone) {
        return iteratorDone();
      }
      return iteratorValue(
        type,
        iterations++,
        zipper.apply(
          null,
          steps.map(function(s) {
            return s.value;
          })
        )
      );
    });
  };
  return zipSequence;
}
function reify(iter, seq) {
  return iter === seq ? iter : isSeq(iter) ? seq : iter.constructor(seq);
}
function validateEntry(entry) {
  if (entry !== Object(entry)) {
    throw new TypeError("Expected [K, V] tuple: " + entry);
  }
}
function collectionClass(collection) {
  return isKeyed(collection) ? KeyedCollection : isIndexed(collection) ? IndexedCollection : SetCollection;
}
function makeSequence(collection) {
  return Object.create(
    (isKeyed(collection) ? KeyedSeq : isIndexed(collection) ? IndexedSeq : SetSeq).prototype
  );
}
function cacheResultThrough() {
  if (this._iter.cacheResult) {
    this._iter.cacheResult();
    this.size = this._iter.size;
    return this;
  }
  return Seq.prototype.cacheResult.call(this);
}
function defaultComparator(a, b) {
  if (a === void 0 && b === void 0) {
    return 0;
  }
  if (a === void 0) {
    return 1;
  }
  if (b === void 0) {
    return -1;
  }
  return a > b ? 1 : a < b ? -1 : 0;
}
function arrCopy(arr, offset) {
  offset = offset || 0;
  var len = Math.max(0, arr.length - offset);
  var newArr = new Array(len);
  for (var ii = 0; ii < len; ii++) {
    newArr[ii] = arr[ii + offset];
  }
  return newArr;
}
function invariant(condition, error) {
  if (!condition) {
    throw new Error(error);
  }
}
function assertNotInfinite(size) {
  invariant(
    size !== Infinity,
    "Cannot perform this action with an infinite size."
  );
}
function coerceKeyPath(keyPath) {
  if (isArrayLike(keyPath) && typeof keyPath !== "string") {
    return keyPath;
  }
  if (isOrdered(keyPath)) {
    return keyPath.toArray();
  }
  throw new TypeError(
    "Invalid keyPath: expected Ordered Collection or Array: " + keyPath
  );
}
function isPlainObject(value) {
  if (!value || typeof value !== "object" || toString2.call(value) !== "[object Object]") {
    return false;
  }
  var proto = Object.getPrototypeOf(value);
  if (proto === null) {
    return true;
  }
  var parentProto = proto;
  var nextProto = Object.getPrototypeOf(proto);
  while (nextProto !== null) {
    parentProto = nextProto;
    nextProto = Object.getPrototypeOf(parentProto);
  }
  return parentProto === proto;
}
function isDataStructure(value) {
  return typeof value === "object" && (isImmutable(value) || Array.isArray(value) || isPlainObject(value));
}
function quoteString(value) {
  try {
    return typeof value === "string" ? JSON.stringify(value) : String(value);
  } catch (_ignoreError) {
    return JSON.stringify(value);
  }
}
function has(collection, key) {
  return isImmutable(collection) ? collection.has(key) : isDataStructure(collection) && hasOwnProperty.call(collection, key);
}
function get(collection, key, notSetValue) {
  return isImmutable(collection) ? collection.get(key, notSetValue) : !has(collection, key) ? notSetValue : typeof collection.get === "function" ? collection.get(key) : collection[key];
}
function shallowCopy(from) {
  if (Array.isArray(from)) {
    return arrCopy(from);
  }
  var to = {};
  for (var key in from) {
    if (hasOwnProperty.call(from, key)) {
      to[key] = from[key];
    }
  }
  return to;
}
function remove(collection, key) {
  if (!isDataStructure(collection)) {
    throw new TypeError(
      "Cannot update non-data-structure value: " + collection
    );
  }
  if (isImmutable(collection)) {
    if (!collection.remove) {
      throw new TypeError(
        "Cannot update immutable value without .remove() method: " + collection
      );
    }
    return collection.remove(key);
  }
  if (!hasOwnProperty.call(collection, key)) {
    return collection;
  }
  var collectionCopy = shallowCopy(collection);
  if (Array.isArray(collectionCopy)) {
    collectionCopy.splice(key, 1);
  } else {
    delete collectionCopy[key];
  }
  return collectionCopy;
}
function set(collection, key, value) {
  if (!isDataStructure(collection)) {
    throw new TypeError(
      "Cannot update non-data-structure value: " + collection
    );
  }
  if (isImmutable(collection)) {
    if (!collection.set) {
      throw new TypeError(
        "Cannot update immutable value without .set() method: " + collection
      );
    }
    return collection.set(key, value);
  }
  if (hasOwnProperty.call(collection, key) && value === collection[key]) {
    return collection;
  }
  var collectionCopy = shallowCopy(collection);
  collectionCopy[key] = value;
  return collectionCopy;
}
function updateIn$1(collection, keyPath, notSetValue, updater) {
  if (!updater) {
    updater = notSetValue;
    notSetValue = void 0;
  }
  var updatedValue = updateInDeeply(
    isImmutable(collection),
    collection,
    coerceKeyPath(keyPath),
    0,
    notSetValue,
    updater
  );
  return updatedValue === NOT_SET ? notSetValue : updatedValue;
}
function updateInDeeply(inImmutable, existing, keyPath, i, notSetValue, updater) {
  var wasNotSet = existing === NOT_SET;
  if (i === keyPath.length) {
    var existingValue = wasNotSet ? notSetValue : existing;
    var newValue = updater(existingValue);
    return newValue === existingValue ? existing : newValue;
  }
  if (!wasNotSet && !isDataStructure(existing)) {
    throw new TypeError(
      "Cannot update within non-data-structure value in path [" + keyPath.slice(0, i).map(quoteString) + "]: " + existing
    );
  }
  var key = keyPath[i];
  var nextExisting = wasNotSet ? NOT_SET : get(existing, key, NOT_SET);
  var nextUpdated = updateInDeeply(
    nextExisting === NOT_SET ? inImmutable : isImmutable(nextExisting),
    nextExisting,
    keyPath,
    i + 1,
    notSetValue,
    updater
  );
  return nextUpdated === nextExisting ? existing : nextUpdated === NOT_SET ? remove(existing, key) : set(
    wasNotSet ? inImmutable ? emptyMap() : {} : existing,
    key,
    nextUpdated
  );
}
function setIn$1(collection, keyPath, value) {
  return updateIn$1(collection, keyPath, NOT_SET, function() {
    return value;
  });
}
function setIn(keyPath, v) {
  return setIn$1(this, keyPath, v);
}
function removeIn(collection, keyPath) {
  return updateIn$1(collection, keyPath, function() {
    return NOT_SET;
  });
}
function deleteIn(keyPath) {
  return removeIn(this, keyPath);
}
function update$1(collection, key, notSetValue, updater) {
  return updateIn$1(collection, [key], notSetValue, updater);
}
function update(key, notSetValue, updater) {
  return arguments.length === 1 ? key(this) : update$1(this, key, notSetValue, updater);
}
function updateIn(keyPath, notSetValue, updater) {
  return updateIn$1(this, keyPath, notSetValue, updater);
}
function merge$1() {
  var iters = [], len = arguments.length;
  while (len--)
    iters[len] = arguments[len];
  return mergeIntoKeyedWith(this, iters);
}
function mergeWith$1(merger) {
  var iters = [], len = arguments.length - 1;
  while (len-- > 0)
    iters[len] = arguments[len + 1];
  if (typeof merger !== "function") {
    throw new TypeError("Invalid merger function: " + merger);
  }
  return mergeIntoKeyedWith(this, iters, merger);
}
function mergeIntoKeyedWith(collection, collections, merger) {
  var iters = [];
  for (var ii = 0; ii < collections.length; ii++) {
    var collection$1 = KeyedCollection(collections[ii]);
    if (collection$1.size !== 0) {
      iters.push(collection$1);
    }
  }
  if (iters.length === 0) {
    return collection;
  }
  if (collection.toSeq().size === 0 && !collection.__ownerID && iters.length === 1) {
    return collection.constructor(iters[0]);
  }
  return collection.withMutations(function(collection2) {
    var mergeIntoCollection = merger ? function(value, key) {
      update$1(
        collection2,
        key,
        NOT_SET,
        function(oldVal) {
          return oldVal === NOT_SET ? value : merger(oldVal, value, key);
        }
      );
    } : function(value, key) {
      collection2.set(key, value);
    };
    for (var ii2 = 0; ii2 < iters.length; ii2++) {
      iters[ii2].forEach(mergeIntoCollection);
    }
  });
}
function merge(collection) {
  var sources = [], len = arguments.length - 1;
  while (len-- > 0)
    sources[len] = arguments[len + 1];
  return mergeWithSources(collection, sources);
}
function mergeWith(merger, collection) {
  var sources = [], len = arguments.length - 2;
  while (len-- > 0)
    sources[len] = arguments[len + 2];
  return mergeWithSources(collection, sources, merger);
}
function mergeDeep$1(collection) {
  var sources = [], len = arguments.length - 1;
  while (len-- > 0)
    sources[len] = arguments[len + 1];
  return mergeDeepWithSources(collection, sources);
}
function mergeDeepWith$1(merger, collection) {
  var sources = [], len = arguments.length - 2;
  while (len-- > 0)
    sources[len] = arguments[len + 2];
  return mergeDeepWithSources(collection, sources, merger);
}
function mergeDeepWithSources(collection, sources, merger) {
  return mergeWithSources(collection, sources, deepMergerWith(merger));
}
function mergeWithSources(collection, sources, merger) {
  if (!isDataStructure(collection)) {
    throw new TypeError(
      "Cannot merge into non-data-structure value: " + collection
    );
  }
  if (isImmutable(collection)) {
    return typeof merger === "function" && collection.mergeWith ? collection.mergeWith.apply(collection, [merger].concat(sources)) : collection.merge ? collection.merge.apply(collection, sources) : collection.concat.apply(collection, sources);
  }
  var isArray = Array.isArray(collection);
  var merged = collection;
  var Collection3 = isArray ? IndexedCollection : KeyedCollection;
  var mergeItem = isArray ? function(value) {
    if (merged === collection) {
      merged = shallowCopy(merged);
    }
    merged.push(value);
  } : function(value, key) {
    var hasVal = hasOwnProperty.call(merged, key);
    var nextVal = hasVal && merger ? merger(merged[key], value, key) : value;
    if (!hasVal || nextVal !== merged[key]) {
      if (merged === collection) {
        merged = shallowCopy(merged);
      }
      merged[key] = nextVal;
    }
  };
  for (var i = 0; i < sources.length; i++) {
    Collection3(sources[i]).forEach(mergeItem);
  }
  return merged;
}
function deepMergerWith(merger) {
  function deepMerger(oldValue, newValue, key) {
    return isDataStructure(oldValue) && isDataStructure(newValue) && areMergeable(oldValue, newValue) ? mergeWithSources(oldValue, [newValue], deepMerger) : merger ? merger(oldValue, newValue, key) : newValue;
  }
  return deepMerger;
}
function areMergeable(oldDataStructure, newDataStructure) {
  var oldSeq = Seq(oldDataStructure);
  var newSeq = Seq(newDataStructure);
  return isIndexed(oldSeq) === isIndexed(newSeq) && isKeyed(oldSeq) === isKeyed(newSeq);
}
function mergeDeep() {
  var iters = [], len = arguments.length;
  while (len--)
    iters[len] = arguments[len];
  return mergeDeepWithSources(this, iters);
}
function mergeDeepWith(merger) {
  var iters = [], len = arguments.length - 1;
  while (len-- > 0)
    iters[len] = arguments[len + 1];
  return mergeDeepWithSources(this, iters, merger);
}
function mergeIn(keyPath) {
  var iters = [], len = arguments.length - 1;
  while (len-- > 0)
    iters[len] = arguments[len + 1];
  return updateIn$1(this, keyPath, emptyMap(), function(m) {
    return mergeWithSources(m, iters);
  });
}
function mergeDeepIn(keyPath) {
  var iters = [], len = arguments.length - 1;
  while (len-- > 0)
    iters[len] = arguments[len + 1];
  return updateIn$1(
    this,
    keyPath,
    emptyMap(),
    function(m) {
      return mergeDeepWithSources(m, iters);
    }
  );
}
function withMutations(fn) {
  var mutable = this.asMutable();
  fn(mutable);
  return mutable.wasAltered() ? mutable.__ensureOwner(this.__ownerID) : this;
}
function asMutable() {
  return this.__ownerID ? this : this.__ensureOwner(new OwnerID());
}
function asImmutable() {
  return this.__ensureOwner();
}
function wasAltered() {
  return this.__altered;
}
function mapIteratorValue(type, entry) {
  return iteratorValue(type, entry[0], entry[1]);
}
function mapIteratorFrame(node, prev) {
  return {
    node,
    index: 0,
    __prev: prev
  };
}
function makeMap(size, root, ownerID, hash2) {
  var map2 = Object.create(MapPrototype);
  map2.size = size;
  map2._root = root;
  map2.__ownerID = ownerID;
  map2.__hash = hash2;
  map2.__altered = false;
  return map2;
}
function emptyMap() {
  return EMPTY_MAP || (EMPTY_MAP = makeMap(0));
}
function updateMap(map2, k, v) {
  var newRoot;
  var newSize;
  if (!map2._root) {
    if (v === NOT_SET) {
      return map2;
    }
    newSize = 1;
    newRoot = new ArrayMapNode(map2.__ownerID, [[k, v]]);
  } else {
    var didChangeSize = MakeRef();
    var didAlter = MakeRef();
    newRoot = updateNode(
      map2._root,
      map2.__ownerID,
      0,
      void 0,
      k,
      v,
      didChangeSize,
      didAlter
    );
    if (!didAlter.value) {
      return map2;
    }
    newSize = map2.size + (didChangeSize.value ? v === NOT_SET ? -1 : 1 : 0);
  }
  if (map2.__ownerID) {
    map2.size = newSize;
    map2._root = newRoot;
    map2.__hash = void 0;
    map2.__altered = true;
    return map2;
  }
  return newRoot ? makeMap(newSize, newRoot) : emptyMap();
}
function updateNode(node, ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
  if (!node) {
    if (value === NOT_SET) {
      return node;
    }
    SetRef(didAlter);
    SetRef(didChangeSize);
    return new ValueNode(ownerID, keyHash, [key, value]);
  }
  return node.update(
    ownerID,
    shift,
    keyHash,
    key,
    value,
    didChangeSize,
    didAlter
  );
}
function isLeafNode(node) {
  return node.constructor === ValueNode || node.constructor === HashCollisionNode;
}
function mergeIntoNode(node, ownerID, shift, keyHash, entry) {
  if (node.keyHash === keyHash) {
    return new HashCollisionNode(ownerID, keyHash, [node.entry, entry]);
  }
  var idx1 = (shift === 0 ? node.keyHash : node.keyHash >>> shift) & MASK;
  var idx2 = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
  var newNode;
  var nodes = idx1 === idx2 ? [mergeIntoNode(node, ownerID, shift + SHIFT, keyHash, entry)] : (newNode = new ValueNode(ownerID, keyHash, entry), idx1 < idx2 ? [node, newNode] : [newNode, node]);
  return new BitmapIndexedNode(ownerID, 1 << idx1 | 1 << idx2, nodes);
}
function createNodes(ownerID, entries3, key, value) {
  if (!ownerID) {
    ownerID = new OwnerID();
  }
  var node = new ValueNode(ownerID, hash(key), [key, value]);
  for (var ii = 0; ii < entries3.length; ii++) {
    var entry = entries3[ii];
    node = node.update(ownerID, 0, void 0, entry[0], entry[1]);
  }
  return node;
}
function packNodes(ownerID, nodes, count2, excluding) {
  var bitmap = 0;
  var packedII = 0;
  var packedNodes = new Array(count2);
  for (var ii = 0, bit = 1, len = nodes.length; ii < len; ii++, bit <<= 1) {
    var node = nodes[ii];
    if (node !== void 0 && ii !== excluding) {
      bitmap |= bit;
      packedNodes[packedII++] = node;
    }
  }
  return new BitmapIndexedNode(ownerID, bitmap, packedNodes);
}
function expandNodes(ownerID, nodes, bitmap, including, node) {
  var count2 = 0;
  var expandedNodes = new Array(SIZE);
  for (var ii = 0; bitmap !== 0; ii++, bitmap >>>= 1) {
    expandedNodes[ii] = bitmap & 1 ? nodes[count2++] : void 0;
  }
  expandedNodes[including] = node;
  return new HashArrayMapNode(ownerID, count2 + 1, expandedNodes);
}
function popCount(x) {
  x -= x >> 1 & 1431655765;
  x = (x & 858993459) + (x >> 2 & 858993459);
  x = x + (x >> 4) & 252645135;
  x += x >> 8;
  x += x >> 16;
  return x & 127;
}
function setAt(array, idx, val, canEdit) {
  var newArray = canEdit ? array : arrCopy(array);
  newArray[idx] = val;
  return newArray;
}
function spliceIn(array, idx, val, canEdit) {
  var newLen = array.length + 1;
  if (canEdit && idx + 1 === newLen) {
    array[idx] = val;
    return array;
  }
  var newArray = new Array(newLen);
  var after = 0;
  for (var ii = 0; ii < newLen; ii++) {
    if (ii === idx) {
      newArray[ii] = val;
      after = -1;
    } else {
      newArray[ii] = array[ii + after];
    }
  }
  return newArray;
}
function spliceOut(array, idx, canEdit) {
  var newLen = array.length - 1;
  if (canEdit && idx === newLen) {
    array.pop();
    return array;
  }
  var newArray = new Array(newLen);
  var after = 0;
  for (var ii = 0; ii < newLen; ii++) {
    if (ii === idx) {
      after = 1;
    }
    newArray[ii] = array[ii + after];
  }
  return newArray;
}
function isList(maybeList) {
  return Boolean(maybeList && maybeList[IS_LIST_SYMBOL]);
}
function iterateList(list, reverse3) {
  var left = list._origin;
  var right = list._capacity;
  var tailPos = getTailOffset(right);
  var tail = list._tail;
  return iterateNodeOrLeaf(list._root, list._level, 0);
  function iterateNodeOrLeaf(node, level, offset) {
    return level === 0 ? iterateLeaf(node, offset) : iterateNode(node, level, offset);
  }
  function iterateLeaf(node, offset) {
    var array = offset === tailPos ? tail && tail.array : node && node.array;
    var from = offset > left ? 0 : left - offset;
    var to = right - offset;
    if (to > SIZE) {
      to = SIZE;
    }
    return function() {
      if (from === to) {
        return DONE;
      }
      var idx = reverse3 ? --to : from++;
      return array && array[idx];
    };
  }
  function iterateNode(node, level, offset) {
    var values2;
    var array = node && node.array;
    var from = offset > left ? 0 : left - offset >> level;
    var to = (right - offset >> level) + 1;
    if (to > SIZE) {
      to = SIZE;
    }
    return function() {
      while (true) {
        if (values2) {
          var value = values2();
          if (value !== DONE) {
            return value;
          }
          values2 = null;
        }
        if (from === to) {
          return DONE;
        }
        var idx = reverse3 ? --to : from++;
        values2 = iterateNodeOrLeaf(
          array && array[idx],
          level - SHIFT,
          offset + (idx << level)
        );
      }
    };
  }
}
function makeList(origin, capacity, level, root, tail, ownerID, hash2) {
  var list = Object.create(ListPrototype);
  list.size = capacity - origin;
  list._origin = origin;
  list._capacity = capacity;
  list._level = level;
  list._root = root;
  list._tail = tail;
  list.__ownerID = ownerID;
  list.__hash = hash2;
  list.__altered = false;
  return list;
}
function emptyList() {
  return EMPTY_LIST || (EMPTY_LIST = makeList(0, 0, SHIFT));
}
function updateList(list, index, value) {
  index = wrapIndex(list, index);
  if (index !== index) {
    return list;
  }
  if (index >= list.size || index < 0) {
    return list.withMutations(function(list2) {
      index < 0 ? setListBounds(list2, index).set(0, value) : setListBounds(list2, 0, index + 1).set(index, value);
    });
  }
  index += list._origin;
  var newTail = list._tail;
  var newRoot = list._root;
  var didAlter = MakeRef();
  if (index >= getTailOffset(list._capacity)) {
    newTail = updateVNode(newTail, list.__ownerID, 0, index, value, didAlter);
  } else {
    newRoot = updateVNode(
      newRoot,
      list.__ownerID,
      list._level,
      index,
      value,
      didAlter
    );
  }
  if (!didAlter.value) {
    return list;
  }
  if (list.__ownerID) {
    list._root = newRoot;
    list._tail = newTail;
    list.__hash = void 0;
    list.__altered = true;
    return list;
  }
  return makeList(list._origin, list._capacity, list._level, newRoot, newTail);
}
function updateVNode(node, ownerID, level, index, value, didAlter) {
  var idx = index >>> level & MASK;
  var nodeHas = node && idx < node.array.length;
  if (!nodeHas && value === void 0) {
    return node;
  }
  var newNode;
  if (level > 0) {
    var lowerNode = node && node.array[idx];
    var newLowerNode = updateVNode(
      lowerNode,
      ownerID,
      level - SHIFT,
      index,
      value,
      didAlter
    );
    if (newLowerNode === lowerNode) {
      return node;
    }
    newNode = editableVNode(node, ownerID);
    newNode.array[idx] = newLowerNode;
    return newNode;
  }
  if (nodeHas && node.array[idx] === value) {
    return node;
  }
  if (didAlter) {
    SetRef(didAlter);
  }
  newNode = editableVNode(node, ownerID);
  if (value === void 0 && idx === newNode.array.length - 1) {
    newNode.array.pop();
  } else {
    newNode.array[idx] = value;
  }
  return newNode;
}
function editableVNode(node, ownerID) {
  if (ownerID && node && ownerID === node.ownerID) {
    return node;
  }
  return new VNode(node ? node.array.slice() : [], ownerID);
}
function listNodeFor(list, rawIndex) {
  if (rawIndex >= getTailOffset(list._capacity)) {
    return list._tail;
  }
  if (rawIndex < 1 << list._level + SHIFT) {
    var node = list._root;
    var level = list._level;
    while (node && level > 0) {
      node = node.array[rawIndex >>> level & MASK];
      level -= SHIFT;
    }
    return node;
  }
}
function setListBounds(list, begin, end) {
  if (begin !== void 0) {
    begin |= 0;
  }
  if (end !== void 0) {
    end |= 0;
  }
  var owner = list.__ownerID || new OwnerID();
  var oldOrigin = list._origin;
  var oldCapacity = list._capacity;
  var newOrigin = oldOrigin + begin;
  var newCapacity = end === void 0 ? oldCapacity : end < 0 ? oldCapacity + end : oldOrigin + end;
  if (newOrigin === oldOrigin && newCapacity === oldCapacity) {
    return list;
  }
  if (newOrigin >= newCapacity) {
    return list.clear();
  }
  var newLevel = list._level;
  var newRoot = list._root;
  var offsetShift = 0;
  while (newOrigin + offsetShift < 0) {
    newRoot = new VNode(
      newRoot && newRoot.array.length ? [void 0, newRoot] : [],
      owner
    );
    newLevel += SHIFT;
    offsetShift += 1 << newLevel;
  }
  if (offsetShift) {
    newOrigin += offsetShift;
    oldOrigin += offsetShift;
    newCapacity += offsetShift;
    oldCapacity += offsetShift;
  }
  var oldTailOffset = getTailOffset(oldCapacity);
  var newTailOffset = getTailOffset(newCapacity);
  while (newTailOffset >= 1 << newLevel + SHIFT) {
    newRoot = new VNode(
      newRoot && newRoot.array.length ? [newRoot] : [],
      owner
    );
    newLevel += SHIFT;
  }
  var oldTail = list._tail;
  var newTail = newTailOffset < oldTailOffset ? listNodeFor(list, newCapacity - 1) : newTailOffset > oldTailOffset ? new VNode([], owner) : oldTail;
  if (oldTail && newTailOffset > oldTailOffset && newOrigin < oldCapacity && oldTail.array.length) {
    newRoot = editableVNode(newRoot, owner);
    var node = newRoot;
    for (var level = newLevel; level > SHIFT; level -= SHIFT) {
      var idx = oldTailOffset >>> level & MASK;
      node = node.array[idx] = editableVNode(node.array[idx], owner);
    }
    node.array[oldTailOffset >>> SHIFT & MASK] = oldTail;
  }
  if (newCapacity < oldCapacity) {
    newTail = newTail && newTail.removeAfter(owner, 0, newCapacity);
  }
  if (newOrigin >= newTailOffset) {
    newOrigin -= newTailOffset;
    newCapacity -= newTailOffset;
    newLevel = SHIFT;
    newRoot = null;
    newTail = newTail && newTail.removeBefore(owner, 0, newOrigin);
  } else if (newOrigin > oldOrigin || newTailOffset < oldTailOffset) {
    offsetShift = 0;
    while (newRoot) {
      var beginIndex = newOrigin >>> newLevel & MASK;
      if (beginIndex !== newTailOffset >>> newLevel & MASK) {
        break;
      }
      if (beginIndex) {
        offsetShift += (1 << newLevel) * beginIndex;
      }
      newLevel -= SHIFT;
      newRoot = newRoot.array[beginIndex];
    }
    if (newRoot && newOrigin > oldOrigin) {
      newRoot = newRoot.removeBefore(owner, newLevel, newOrigin - offsetShift);
    }
    if (newRoot && newTailOffset < oldTailOffset) {
      newRoot = newRoot.removeAfter(
        owner,
        newLevel,
        newTailOffset - offsetShift
      );
    }
    if (offsetShift) {
      newOrigin -= offsetShift;
      newCapacity -= offsetShift;
    }
  }
  if (list.__ownerID) {
    list.size = newCapacity - newOrigin;
    list._origin = newOrigin;
    list._capacity = newCapacity;
    list._level = newLevel;
    list._root = newRoot;
    list._tail = newTail;
    list.__hash = void 0;
    list.__altered = true;
    return list;
  }
  return makeList(newOrigin, newCapacity, newLevel, newRoot, newTail);
}
function getTailOffset(size) {
  return size < SIZE ? 0 : size - 1 >>> SHIFT << SHIFT;
}
function makeOrderedMap(map2, list, ownerID, hash2) {
  var omap = Object.create(OrderedMap.prototype);
  omap.size = map2 ? map2.size : 0;
  omap._map = map2;
  omap._list = list;
  omap.__ownerID = ownerID;
  omap.__hash = hash2;
  omap.__altered = false;
  return omap;
}
function emptyOrderedMap() {
  return EMPTY_ORDERED_MAP || (EMPTY_ORDERED_MAP = makeOrderedMap(emptyMap(), emptyList()));
}
function updateOrderedMap(omap, k, v) {
  var map2 = omap._map;
  var list = omap._list;
  var i = map2.get(k);
  var has5 = i !== void 0;
  var newMap;
  var newList;
  if (v === NOT_SET) {
    if (!has5) {
      return omap;
    }
    if (list.size >= SIZE && list.size >= map2.size * 2) {
      newList = list.filter(function(entry, idx) {
        return entry !== void 0 && i !== idx;
      });
      newMap = newList.toKeyedSeq().map(function(entry) {
        return entry[0];
      }).flip().toMap();
      if (omap.__ownerID) {
        newMap.__ownerID = newList.__ownerID = omap.__ownerID;
      }
    } else {
      newMap = map2.remove(k);
      newList = i === list.size - 1 ? list.pop() : list.set(i, void 0);
    }
  } else if (has5) {
    if (v === list.get(i)[1]) {
      return omap;
    }
    newMap = map2;
    newList = list.set(i, [k, v]);
  } else {
    newMap = map2.set(k, list.size);
    newList = list.set(list.size, [k, v]);
  }
  if (omap.__ownerID) {
    omap.size = newMap.size;
    omap._map = newMap;
    omap._list = newList;
    omap.__hash = void 0;
    omap.__altered = true;
    return omap;
  }
  return makeOrderedMap(newMap, newList);
}
function isStack(maybeStack) {
  return Boolean(maybeStack && maybeStack[IS_STACK_SYMBOL]);
}
function makeStack(size, head, ownerID, hash2) {
  var map2 = Object.create(StackPrototype);
  map2.size = size;
  map2._head = head;
  map2.__ownerID = ownerID;
  map2.__hash = hash2;
  map2.__altered = false;
  return map2;
}
function emptyStack() {
  return EMPTY_STACK || (EMPTY_STACK = makeStack(0));
}
function isSet(maybeSet) {
  return Boolean(maybeSet && maybeSet[IS_SET_SYMBOL]);
}
function isOrderedSet(maybeOrderedSet) {
  return isSet(maybeOrderedSet) && isOrdered(maybeOrderedSet);
}
function deepEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (!isCollection(b) || a.size !== void 0 && b.size !== void 0 && a.size !== b.size || a.__hash !== void 0 && b.__hash !== void 0 && a.__hash !== b.__hash || isKeyed(a) !== isKeyed(b) || isIndexed(a) !== isIndexed(b) || isOrdered(a) !== isOrdered(b)) {
    return false;
  }
  if (a.size === 0 && b.size === 0) {
    return true;
  }
  var notAssociative = !isAssociative(a);
  if (isOrdered(a)) {
    var entries3 = a.entries();
    return b.every(function(v, k) {
      var entry = entries3.next().value;
      return entry && is(entry[1], v) && (notAssociative || is(entry[0], k));
    }) && entries3.next().done;
  }
  var flipped = false;
  if (a.size === void 0) {
    if (b.size === void 0) {
      if (typeof a.cacheResult === "function") {
        a.cacheResult();
      }
    } else {
      flipped = true;
      var _ = a;
      a = b;
      b = _;
    }
  }
  var allEqual = true;
  var bSize = b.__iterate(function(v, k) {
    if (notAssociative ? !a.has(v) : flipped ? !is(v, a.get(k, NOT_SET)) : !is(a.get(k, NOT_SET), v)) {
      allEqual = false;
      return false;
    }
  });
  return allEqual && a.size === bSize;
}
function mixin(ctor, methods) {
  var keyCopier = function(key) {
    ctor.prototype[key] = methods[key];
  };
  Object.keys(methods).forEach(keyCopier);
  Object.getOwnPropertySymbols && Object.getOwnPropertySymbols(methods).forEach(keyCopier);
  return ctor;
}
function toJS(value) {
  if (!value || typeof value !== "object") {
    return value;
  }
  if (!isCollection(value)) {
    if (!isDataStructure(value)) {
      return value;
    }
    value = Seq(value);
  }
  if (isKeyed(value)) {
    var result$1 = {};
    value.__iterate(function(v, k) {
      result$1[k] = toJS(v);
    });
    return result$1;
  }
  var result = [];
  value.__iterate(function(v) {
    result.push(toJS(v));
  });
  return result;
}
function updateSet(set3, newMap) {
  if (set3.__ownerID) {
    set3.size = newMap.size;
    set3._map = newMap;
    return set3;
  }
  return newMap === set3._map ? set3 : newMap.size === 0 ? set3.__empty() : set3.__make(newMap);
}
function makeSet(map2, ownerID) {
  var set3 = Object.create(SetPrototype);
  set3.size = map2 ? map2.size : 0;
  set3._map = map2;
  set3.__ownerID = ownerID;
  return set3;
}
function emptySet() {
  return EMPTY_SET || (EMPTY_SET = makeSet(emptyMap()));
}
function getIn$1(collection, searchKeyPath, notSetValue) {
  var keyPath = coerceKeyPath(searchKeyPath);
  var i = 0;
  while (i !== keyPath.length) {
    collection = get(collection, keyPath[i++], NOT_SET);
    if (collection === NOT_SET) {
      return notSetValue;
    }
  }
  return collection;
}
function getIn(searchKeyPath, notSetValue) {
  return getIn$1(this, searchKeyPath, notSetValue);
}
function hasIn$1(collection, keyPath) {
  return getIn$1(collection, keyPath, NOT_SET) !== NOT_SET;
}
function hasIn(searchKeyPath) {
  return hasIn$1(this, searchKeyPath);
}
function toObject() {
  assertNotInfinite(this.size);
  var object = {};
  this.__iterate(function(v, k) {
    object[k] = v;
  });
  return object;
}
function reduce(collection, reducer, reduction, context, useFirst, reverse3) {
  assertNotInfinite(collection.size);
  collection.__iterate(function(v, k, c) {
    if (useFirst) {
      useFirst = false;
      reduction = v;
    } else {
      reduction = reducer.call(context, reduction, v, k, c);
    }
  }, reverse3);
  return reduction;
}
function keyMapper(v, k) {
  return k;
}
function entryMapper(v, k) {
  return [k, v];
}
function not(predicate) {
  return function() {
    return !predicate.apply(this, arguments);
  };
}
function neg(predicate) {
  return function() {
    return -predicate.apply(this, arguments);
  };
}
function defaultZipper() {
  return arrCopy(arguments);
}
function defaultNegComparator(a, b) {
  return a < b ? 1 : a > b ? -1 : 0;
}
function hashCollection(collection) {
  if (collection.size === Infinity) {
    return 0;
  }
  var ordered = isOrdered(collection);
  var keyed = isKeyed(collection);
  var h = ordered ? 1 : 0;
  var size = collection.__iterate(
    keyed ? ordered ? function(v, k) {
      h = 31 * h + hashMerge(hash(v), hash(k)) | 0;
    } : function(v, k) {
      h = h + hashMerge(hash(v), hash(k)) | 0;
    } : ordered ? function(v) {
      h = 31 * h + hash(v) | 0;
    } : function(v) {
      h = h + hash(v) | 0;
    }
  );
  return murmurHashOfSize(size, h);
}
function murmurHashOfSize(size, h) {
  h = imul(h, 3432918353);
  h = imul(h << 15 | h >>> -15, 461845907);
  h = imul(h << 13 | h >>> -13, 5);
  h = (h + 3864292196 | 0) ^ size;
  h = imul(h ^ h >>> 16, 2246822507);
  h = imul(h ^ h >>> 13, 3266489909);
  h = smi(h ^ h >>> 16);
  return h;
}
function hashMerge(a, b) {
  return a ^ b + 2654435769 + (a << 6) + (a >> 2) | 0;
}
function makeOrderedSet(map2, ownerID) {
  var set3 = Object.create(OrderedSetPrototype);
  set3.size = map2 ? map2.size : 0;
  set3._map = map2;
  set3.__ownerID = ownerID;
  return set3;
}
function emptyOrderedSet() {
  return EMPTY_ORDERED_SET || (EMPTY_ORDERED_SET = makeOrderedSet(emptyOrderedMap()));
}
function throwOnInvalidDefaultValues(defaultValues) {
  if (isRecord(defaultValues)) {
    throw new Error(
      "Can not call `Record` with an immutable Record as default values. Use a plain javascript object instead."
    );
  }
  if (isImmutable(defaultValues)) {
    throw new Error(
      "Can not call `Record` with an immutable Collection as default values. Use a plain javascript object instead."
    );
  }
  if (defaultValues === null || typeof defaultValues !== "object") {
    throw new Error(
      "Can not call `Record` with a non-object as default values. Use a plain javascript object instead."
    );
  }
}
function makeRecord(likeRecord, values2, ownerID) {
  var record = Object.create(Object.getPrototypeOf(likeRecord));
  record._values = values2;
  record.__ownerID = ownerID;
  return record;
}
function recordName(record) {
  return record.constructor.displayName || record.constructor.name || "Record";
}
function recordSeq(record) {
  return keyedSeqFromValue(record._keys.map(function(k) {
    return [k, record.get(k)];
  }));
}
function setProp(prototype, name) {
  try {
    Object.defineProperty(prototype, name, {
      get: function() {
        return this.get(name);
      },
      set: function(value) {
        invariant(this.__ownerID, "Cannot set on an immutable record.");
        this.set(name, value);
      }
    });
  } catch (error) {
  }
}
function fromJS(value, converter) {
  return fromJSWith(
    [],
    converter || defaultConverter,
    value,
    "",
    converter && converter.length > 2 ? [] : void 0,
    { "": value }
  );
}
function fromJSWith(stack, converter, value, key, keyPath, parentValue) {
  if (typeof value !== "string" && !isImmutable(value) && (isArrayLike(value) || hasIterator(value) || isPlainObject(value))) {
    if (~stack.indexOf(value)) {
      throw new TypeError("Cannot convert circular structure to Immutable");
    }
    stack.push(value);
    keyPath && key !== "" && keyPath.push(key);
    var converted = converter.call(
      parentValue,
      key,
      Seq(value).map(
        function(v, k) {
          return fromJSWith(stack, converter, v, k, keyPath, value);
        }
      ),
      keyPath && keyPath.slice()
    );
    stack.pop();
    keyPath && keyPath.pop();
    return converted;
  }
  return value;
}
function defaultConverter(k, v) {
  return isIndexed(v) ? v.toList() : isKeyed(v) ? v.toMap() : v.toSet();
}
var DELETE, SHIFT, SIZE, MASK, NOT_SET, IS_COLLECTION_SYMBOL, IS_KEYED_SYMBOL, IS_INDEXED_SYMBOL, Collection, KeyedCollection, IndexedCollection, SetCollection, IS_SEQ_SYMBOL, IS_RECORD_SYMBOL, IS_ORDERED_SYMBOL, ITERATE_KEYS, ITERATE_VALUES, ITERATE_ENTRIES, REAL_ITERATOR_SYMBOL, FAUX_ITERATOR_SYMBOL, ITERATOR_SYMBOL, Iterator, hasOwnProperty, Seq, KeyedSeq, IndexedSeq, SetSeq, ArraySeq, ObjectSeq, CollectionSeq, EMPTY_SEQ, IS_MAP_SYMBOL, imul, defaultValueOf, isExtensible, canDefineProperty, usingWeakMap, weakMap, symbolMap, _objHashUID, UID_HASH_KEY, STRING_HASH_CACHE_MIN_STRLEN, STRING_HASH_CACHE_MAX_SIZE, STRING_HASH_CACHE_SIZE, stringHashCache, ToKeyedSequence, ToIndexedSequence, ToSetSequence, FromEntriesSequence, toString2, Map, MapPrototype, ArrayMapNode, BitmapIndexedNode, HashArrayMapNode, HashCollisionNode, ValueNode, MapIterator, EMPTY_MAP, MAX_ARRAY_MAP_SIZE, MAX_BITMAP_INDEXED_SIZE, MIN_HASH_ARRAY_MAP_SIZE, IS_LIST_SYMBOL, List, ListPrototype, VNode, DONE, EMPTY_LIST, OrderedMap, EMPTY_ORDERED_MAP, IS_STACK_SYMBOL, Stack, StackPrototype, EMPTY_STACK, IS_SET_SYMBOL, Set, SetPrototype, EMPTY_SET, Range, EMPTY_RANGE, CollectionPrototype, KeyedCollectionPrototype, IndexedCollectionPrototype, SetCollectionPrototype, OrderedSet, OrderedSetPrototype, EMPTY_ORDERED_SET, PairSorting, Record, RecordPrototype, Repeat, EMPTY_REPEAT, version, Immutable, Iterable, immutable_es_default;
var init_immutable_es = __esm({
  "node_modules/immutable/dist/immutable.es.js"() {
    DELETE = "delete";
    SHIFT = 5;
    SIZE = 1 << SHIFT;
    MASK = SIZE - 1;
    NOT_SET = {};
    IS_COLLECTION_SYMBOL = "@@__IMMUTABLE_ITERABLE__@@";
    IS_KEYED_SYMBOL = "@@__IMMUTABLE_KEYED__@@";
    IS_INDEXED_SYMBOL = "@@__IMMUTABLE_INDEXED__@@";
    Collection = function Collection2(value) {
      return isCollection(value) ? value : Seq(value);
    };
    KeyedCollection = function(Collection3) {
      function KeyedCollection2(value) {
        return isKeyed(value) ? value : KeyedSeq(value);
      }
      if (Collection3)
        KeyedCollection2.__proto__ = Collection3;
      KeyedCollection2.prototype = Object.create(Collection3 && Collection3.prototype);
      KeyedCollection2.prototype.constructor = KeyedCollection2;
      return KeyedCollection2;
    }(Collection);
    IndexedCollection = function(Collection3) {
      function IndexedCollection2(value) {
        return isIndexed(value) ? value : IndexedSeq(value);
      }
      if (Collection3)
        IndexedCollection2.__proto__ = Collection3;
      IndexedCollection2.prototype = Object.create(Collection3 && Collection3.prototype);
      IndexedCollection2.prototype.constructor = IndexedCollection2;
      return IndexedCollection2;
    }(Collection);
    SetCollection = function(Collection3) {
      function SetCollection2(value) {
        return isCollection(value) && !isAssociative(value) ? value : SetSeq(value);
      }
      if (Collection3)
        SetCollection2.__proto__ = Collection3;
      SetCollection2.prototype = Object.create(Collection3 && Collection3.prototype);
      SetCollection2.prototype.constructor = SetCollection2;
      return SetCollection2;
    }(Collection);
    Collection.Keyed = KeyedCollection;
    Collection.Indexed = IndexedCollection;
    Collection.Set = SetCollection;
    IS_SEQ_SYMBOL = "@@__IMMUTABLE_SEQ__@@";
    IS_RECORD_SYMBOL = "@@__IMMUTABLE_RECORD__@@";
    IS_ORDERED_SYMBOL = "@@__IMMUTABLE_ORDERED__@@";
    ITERATE_KEYS = 0;
    ITERATE_VALUES = 1;
    ITERATE_ENTRIES = 2;
    REAL_ITERATOR_SYMBOL = typeof Symbol === "function" && Symbol.iterator;
    FAUX_ITERATOR_SYMBOL = "@@iterator";
    ITERATOR_SYMBOL = REAL_ITERATOR_SYMBOL || FAUX_ITERATOR_SYMBOL;
    Iterator = function Iterator2(next) {
      this.next = next;
    };
    Iterator.prototype.toString = function toString() {
      return "[Iterator]";
    };
    Iterator.KEYS = ITERATE_KEYS;
    Iterator.VALUES = ITERATE_VALUES;
    Iterator.ENTRIES = ITERATE_ENTRIES;
    Iterator.prototype.inspect = Iterator.prototype.toSource = function() {
      return this.toString();
    };
    Iterator.prototype[ITERATOR_SYMBOL] = function() {
      return this;
    };
    hasOwnProperty = Object.prototype.hasOwnProperty;
    Seq = function(Collection3) {
      function Seq2(value) {
        return value === void 0 || value === null ? emptySequence() : isImmutable(value) ? value.toSeq() : seqFromValue(value);
      }
      if (Collection3)
        Seq2.__proto__ = Collection3;
      Seq2.prototype = Object.create(Collection3 && Collection3.prototype);
      Seq2.prototype.constructor = Seq2;
      Seq2.prototype.toSeq = function toSeq3() {
        return this;
      };
      Seq2.prototype.toString = function toString5() {
        return this.__toString("Seq {", "}");
      };
      Seq2.prototype.cacheResult = function cacheResult() {
        if (!this._cache && this.__iterateUncached) {
          this._cache = this.entrySeq().toArray();
          this.size = this._cache.length;
        }
        return this;
      };
      Seq2.prototype.__iterate = function __iterate2(fn, reverse3) {
        var cache = this._cache;
        if (cache) {
          var size = cache.length;
          var i = 0;
          while (i !== size) {
            var entry = cache[reverse3 ? size - ++i : i++];
            if (fn(entry[1], entry[0], this) === false) {
              break;
            }
          }
          return i;
        }
        return this.__iterateUncached(fn, reverse3);
      };
      Seq2.prototype.__iterator = function __iterator2(type, reverse3) {
        var cache = this._cache;
        if (cache) {
          var size = cache.length;
          var i = 0;
          return new Iterator(function() {
            if (i === size) {
              return iteratorDone();
            }
            var entry = cache[reverse3 ? size - ++i : i++];
            return iteratorValue(type, entry[0], entry[1]);
          });
        }
        return this.__iteratorUncached(type, reverse3);
      };
      return Seq2;
    }(Collection);
    KeyedSeq = function(Seq2) {
      function KeyedSeq2(value) {
        return value === void 0 || value === null ? emptySequence().toKeyedSeq() : isCollection(value) ? isKeyed(value) ? value.toSeq() : value.fromEntrySeq() : isRecord(value) ? value.toSeq() : keyedSeqFromValue(value);
      }
      if (Seq2)
        KeyedSeq2.__proto__ = Seq2;
      KeyedSeq2.prototype = Object.create(Seq2 && Seq2.prototype);
      KeyedSeq2.prototype.constructor = KeyedSeq2;
      KeyedSeq2.prototype.toKeyedSeq = function toKeyedSeq3() {
        return this;
      };
      return KeyedSeq2;
    }(Seq);
    IndexedSeq = function(Seq2) {
      function IndexedSeq2(value) {
        return value === void 0 || value === null ? emptySequence() : isCollection(value) ? isKeyed(value) ? value.entrySeq() : value.toIndexedSeq() : isRecord(value) ? value.toSeq().entrySeq() : indexedSeqFromValue(value);
      }
      if (Seq2)
        IndexedSeq2.__proto__ = Seq2;
      IndexedSeq2.prototype = Object.create(Seq2 && Seq2.prototype);
      IndexedSeq2.prototype.constructor = IndexedSeq2;
      IndexedSeq2.of = function of() {
        return IndexedSeq2(arguments);
      };
      IndexedSeq2.prototype.toIndexedSeq = function toIndexedSeq2() {
        return this;
      };
      IndexedSeq2.prototype.toString = function toString5() {
        return this.__toString("Seq [", "]");
      };
      return IndexedSeq2;
    }(Seq);
    SetSeq = function(Seq2) {
      function SetSeq2(value) {
        return (isCollection(value) && !isAssociative(value) ? value : IndexedSeq(value)).toSetSeq();
      }
      if (Seq2)
        SetSeq2.__proto__ = Seq2;
      SetSeq2.prototype = Object.create(Seq2 && Seq2.prototype);
      SetSeq2.prototype.constructor = SetSeq2;
      SetSeq2.of = function of() {
        return SetSeq2(arguments);
      };
      SetSeq2.prototype.toSetSeq = function toSetSeq2() {
        return this;
      };
      return SetSeq2;
    }(Seq);
    Seq.isSeq = isSeq;
    Seq.Keyed = KeyedSeq;
    Seq.Set = SetSeq;
    Seq.Indexed = IndexedSeq;
    Seq.prototype[IS_SEQ_SYMBOL] = true;
    ArraySeq = function(IndexedSeq2) {
      function ArraySeq2(array) {
        this._array = array;
        this.size = array.length;
      }
      if (IndexedSeq2)
        ArraySeq2.__proto__ = IndexedSeq2;
      ArraySeq2.prototype = Object.create(IndexedSeq2 && IndexedSeq2.prototype);
      ArraySeq2.prototype.constructor = ArraySeq2;
      ArraySeq2.prototype.get = function get11(index, notSetValue) {
        return this.has(index) ? this._array[wrapIndex(this, index)] : notSetValue;
      };
      ArraySeq2.prototype.__iterate = function __iterate2(fn, reverse3) {
        var array = this._array;
        var size = array.length;
        var i = 0;
        while (i !== size) {
          var ii = reverse3 ? size - ++i : i++;
          if (fn(array[ii], ii, this) === false) {
            break;
          }
        }
        return i;
      };
      ArraySeq2.prototype.__iterator = function __iterator2(type, reverse3) {
        var array = this._array;
        var size = array.length;
        var i = 0;
        return new Iterator(function() {
          if (i === size) {
            return iteratorDone();
          }
          var ii = reverse3 ? size - ++i : i++;
          return iteratorValue(type, ii, array[ii]);
        });
      };
      return ArraySeq2;
    }(IndexedSeq);
    ObjectSeq = function(KeyedSeq2) {
      function ObjectSeq2(object) {
        var keys2 = Object.keys(object).concat(
          Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(object) : []
        );
        this._object = object;
        this._keys = keys2;
        this.size = keys2.length;
      }
      if (KeyedSeq2)
        ObjectSeq2.__proto__ = KeyedSeq2;
      ObjectSeq2.prototype = Object.create(KeyedSeq2 && KeyedSeq2.prototype);
      ObjectSeq2.prototype.constructor = ObjectSeq2;
      ObjectSeq2.prototype.get = function get11(key, notSetValue) {
        if (notSetValue !== void 0 && !this.has(key)) {
          return notSetValue;
        }
        return this._object[key];
      };
      ObjectSeq2.prototype.has = function has5(key) {
        return hasOwnProperty.call(this._object, key);
      };
      ObjectSeq2.prototype.__iterate = function __iterate2(fn, reverse3) {
        var object = this._object;
        var keys2 = this._keys;
        var size = keys2.length;
        var i = 0;
        while (i !== size) {
          var key = keys2[reverse3 ? size - ++i : i++];
          if (fn(object[key], key, this) === false) {
            break;
          }
        }
        return i;
      };
      ObjectSeq2.prototype.__iterator = function __iterator2(type, reverse3) {
        var object = this._object;
        var keys2 = this._keys;
        var size = keys2.length;
        var i = 0;
        return new Iterator(function() {
          if (i === size) {
            return iteratorDone();
          }
          var key = keys2[reverse3 ? size - ++i : i++];
          return iteratorValue(type, key, object[key]);
        });
      };
      return ObjectSeq2;
    }(KeyedSeq);
    ObjectSeq.prototype[IS_ORDERED_SYMBOL] = true;
    CollectionSeq = function(IndexedSeq2) {
      function CollectionSeq2(collection) {
        this._collection = collection;
        this.size = collection.length || collection.size;
      }
      if (IndexedSeq2)
        CollectionSeq2.__proto__ = IndexedSeq2;
      CollectionSeq2.prototype = Object.create(IndexedSeq2 && IndexedSeq2.prototype);
      CollectionSeq2.prototype.constructor = CollectionSeq2;
      CollectionSeq2.prototype.__iterateUncached = function __iterateUncached(fn, reverse3) {
        if (reverse3) {
          return this.cacheResult().__iterate(fn, reverse3);
        }
        var collection = this._collection;
        var iterator = getIterator(collection);
        var iterations = 0;
        if (isIterator(iterator)) {
          var step;
          while (!(step = iterator.next()).done) {
            if (fn(step.value, iterations++, this) === false) {
              break;
            }
          }
        }
        return iterations;
      };
      CollectionSeq2.prototype.__iteratorUncached = function __iteratorUncached(type, reverse3) {
        if (reverse3) {
          return this.cacheResult().__iterator(type, reverse3);
        }
        var collection = this._collection;
        var iterator = getIterator(collection);
        if (!isIterator(iterator)) {
          return new Iterator(iteratorDone);
        }
        var iterations = 0;
        return new Iterator(function() {
          var step = iterator.next();
          return step.done ? step : iteratorValue(type, iterations++, step.value);
        });
      };
      return CollectionSeq2;
    }(IndexedSeq);
    IS_MAP_SYMBOL = "@@__IMMUTABLE_MAP__@@";
    imul = typeof Math.imul === "function" && Math.imul(4294967295, 2) === -2 ? Math.imul : function imul2(a, b) {
      a |= 0;
      b |= 0;
      var c = a & 65535;
      var d = b & 65535;
      return c * d + ((a >>> 16) * d + c * (b >>> 16) << 16 >>> 0) | 0;
    };
    defaultValueOf = Object.prototype.valueOf;
    isExtensible = Object.isExtensible;
    canDefineProperty = function() {
      try {
        Object.defineProperty({}, "@", {});
        return true;
      } catch (e) {
        return false;
      }
    }();
    usingWeakMap = typeof WeakMap === "function";
    if (usingWeakMap) {
      weakMap = /* @__PURE__ */ new WeakMap();
    }
    symbolMap = /* @__PURE__ */ Object.create(null);
    _objHashUID = 0;
    UID_HASH_KEY = "__immutablehash__";
    if (typeof Symbol === "function") {
      UID_HASH_KEY = Symbol(UID_HASH_KEY);
    }
    STRING_HASH_CACHE_MIN_STRLEN = 16;
    STRING_HASH_CACHE_MAX_SIZE = 255;
    STRING_HASH_CACHE_SIZE = 0;
    stringHashCache = {};
    ToKeyedSequence = function(KeyedSeq2) {
      function ToKeyedSequence2(indexed, useKeys) {
        this._iter = indexed;
        this._useKeys = useKeys;
        this.size = indexed.size;
      }
      if (KeyedSeq2)
        ToKeyedSequence2.__proto__ = KeyedSeq2;
      ToKeyedSequence2.prototype = Object.create(KeyedSeq2 && KeyedSeq2.prototype);
      ToKeyedSequence2.prototype.constructor = ToKeyedSequence2;
      ToKeyedSequence2.prototype.get = function get11(key, notSetValue) {
        return this._iter.get(key, notSetValue);
      };
      ToKeyedSequence2.prototype.has = function has5(key) {
        return this._iter.has(key);
      };
      ToKeyedSequence2.prototype.valueSeq = function valueSeq2() {
        return this._iter.valueSeq();
      };
      ToKeyedSequence2.prototype.reverse = function reverse3() {
        var this$1$1 = this;
        var reversedSequence = reverseFactory(this, true);
        if (!this._useKeys) {
          reversedSequence.valueSeq = function() {
            return this$1$1._iter.toSeq().reverse();
          };
        }
        return reversedSequence;
      };
      ToKeyedSequence2.prototype.map = function map2(mapper, context) {
        var this$1$1 = this;
        var mappedSequence = mapFactory(this, mapper, context);
        if (!this._useKeys) {
          mappedSequence.valueSeq = function() {
            return this$1$1._iter.toSeq().map(mapper, context);
          };
        }
        return mappedSequence;
      };
      ToKeyedSequence2.prototype.__iterate = function __iterate2(fn, reverse3) {
        var this$1$1 = this;
        return this._iter.__iterate(function(v, k) {
          return fn(v, k, this$1$1);
        }, reverse3);
      };
      ToKeyedSequence2.prototype.__iterator = function __iterator2(type, reverse3) {
        return this._iter.__iterator(type, reverse3);
      };
      return ToKeyedSequence2;
    }(KeyedSeq);
    ToKeyedSequence.prototype[IS_ORDERED_SYMBOL] = true;
    ToIndexedSequence = function(IndexedSeq2) {
      function ToIndexedSequence2(iter) {
        this._iter = iter;
        this.size = iter.size;
      }
      if (IndexedSeq2)
        ToIndexedSequence2.__proto__ = IndexedSeq2;
      ToIndexedSequence2.prototype = Object.create(IndexedSeq2 && IndexedSeq2.prototype);
      ToIndexedSequence2.prototype.constructor = ToIndexedSequence2;
      ToIndexedSequence2.prototype.includes = function includes3(value) {
        return this._iter.includes(value);
      };
      ToIndexedSequence2.prototype.__iterate = function __iterate2(fn, reverse3) {
        var this$1$1 = this;
        var i = 0;
        reverse3 && ensureSize(this);
        return this._iter.__iterate(
          function(v) {
            return fn(v, reverse3 ? this$1$1.size - ++i : i++, this$1$1);
          },
          reverse3
        );
      };
      ToIndexedSequence2.prototype.__iterator = function __iterator2(type, reverse3) {
        var this$1$1 = this;
        var iterator = this._iter.__iterator(ITERATE_VALUES, reverse3);
        var i = 0;
        reverse3 && ensureSize(this);
        return new Iterator(function() {
          var step = iterator.next();
          return step.done ? step : iteratorValue(
            type,
            reverse3 ? this$1$1.size - ++i : i++,
            step.value,
            step
          );
        });
      };
      return ToIndexedSequence2;
    }(IndexedSeq);
    ToSetSequence = function(SetSeq2) {
      function ToSetSequence2(iter) {
        this._iter = iter;
        this.size = iter.size;
      }
      if (SetSeq2)
        ToSetSequence2.__proto__ = SetSeq2;
      ToSetSequence2.prototype = Object.create(SetSeq2 && SetSeq2.prototype);
      ToSetSequence2.prototype.constructor = ToSetSequence2;
      ToSetSequence2.prototype.has = function has5(key) {
        return this._iter.includes(key);
      };
      ToSetSequence2.prototype.__iterate = function __iterate2(fn, reverse3) {
        var this$1$1 = this;
        return this._iter.__iterate(function(v) {
          return fn(v, v, this$1$1);
        }, reverse3);
      };
      ToSetSequence2.prototype.__iterator = function __iterator2(type, reverse3) {
        var iterator = this._iter.__iterator(ITERATE_VALUES, reverse3);
        return new Iterator(function() {
          var step = iterator.next();
          return step.done ? step : iteratorValue(type, step.value, step.value, step);
        });
      };
      return ToSetSequence2;
    }(SetSeq);
    FromEntriesSequence = function(KeyedSeq2) {
      function FromEntriesSequence2(entries3) {
        this._iter = entries3;
        this.size = entries3.size;
      }
      if (KeyedSeq2)
        FromEntriesSequence2.__proto__ = KeyedSeq2;
      FromEntriesSequence2.prototype = Object.create(KeyedSeq2 && KeyedSeq2.prototype);
      FromEntriesSequence2.prototype.constructor = FromEntriesSequence2;
      FromEntriesSequence2.prototype.entrySeq = function entrySeq2() {
        return this._iter.toSeq();
      };
      FromEntriesSequence2.prototype.__iterate = function __iterate2(fn, reverse3) {
        var this$1$1 = this;
        return this._iter.__iterate(function(entry) {
          if (entry) {
            validateEntry(entry);
            var indexedCollection = isCollection(entry);
            return fn(
              indexedCollection ? entry.get(1) : entry[1],
              indexedCollection ? entry.get(0) : entry[0],
              this$1$1
            );
          }
        }, reverse3);
      };
      FromEntriesSequence2.prototype.__iterator = function __iterator2(type, reverse3) {
        var iterator = this._iter.__iterator(ITERATE_VALUES, reverse3);
        return new Iterator(function() {
          while (true) {
            var step = iterator.next();
            if (step.done) {
              return step;
            }
            var entry = step.value;
            if (entry) {
              validateEntry(entry);
              var indexedCollection = isCollection(entry);
              return iteratorValue(
                type,
                indexedCollection ? entry.get(0) : entry[0],
                indexedCollection ? entry.get(1) : entry[1],
                step
              );
            }
          }
        });
      };
      return FromEntriesSequence2;
    }(KeyedSeq);
    ToIndexedSequence.prototype.cacheResult = ToKeyedSequence.prototype.cacheResult = ToSetSequence.prototype.cacheResult = FromEntriesSequence.prototype.cacheResult = cacheResultThrough;
    toString2 = Object.prototype.toString;
    Map = function(KeyedCollection2) {
      function Map2(value) {
        return value === void 0 || value === null ? emptyMap() : isMap(value) && !isOrdered(value) ? value : emptyMap().withMutations(function(map2) {
          var iter = KeyedCollection2(value);
          assertNotInfinite(iter.size);
          iter.forEach(function(v, k) {
            return map2.set(k, v);
          });
        });
      }
      if (KeyedCollection2)
        Map2.__proto__ = KeyedCollection2;
      Map2.prototype = Object.create(KeyedCollection2 && KeyedCollection2.prototype);
      Map2.prototype.constructor = Map2;
      Map2.of = function of() {
        var keyValues = [], len = arguments.length;
        while (len--)
          keyValues[len] = arguments[len];
        return emptyMap().withMutations(function(map2) {
          for (var i = 0; i < keyValues.length; i += 2) {
            if (i + 1 >= keyValues.length) {
              throw new Error("Missing value for key: " + keyValues[i]);
            }
            map2.set(keyValues[i], keyValues[i + 1]);
          }
        });
      };
      Map2.prototype.toString = function toString5() {
        return this.__toString("Map {", "}");
      };
      Map2.prototype.get = function get11(k, notSetValue) {
        return this._root ? this._root.get(0, void 0, k, notSetValue) : notSetValue;
      };
      Map2.prototype.set = function set3(k, v) {
        return updateMap(this, k, v);
      };
      Map2.prototype.remove = function remove3(k) {
        return updateMap(this, k, NOT_SET);
      };
      Map2.prototype.deleteAll = function deleteAll(keys2) {
        var collection = Collection(keys2);
        if (collection.size === 0) {
          return this;
        }
        return this.withMutations(function(map2) {
          collection.forEach(function(key) {
            return map2.remove(key);
          });
        });
      };
      Map2.prototype.clear = function clear2() {
        if (this.size === 0) {
          return this;
        }
        if (this.__ownerID) {
          this.size = 0;
          this._root = null;
          this.__hash = void 0;
          this.__altered = true;
          return this;
        }
        return emptyMap();
      };
      Map2.prototype.sort = function sort2(comparator) {
        return OrderedMap(sortFactory(this, comparator));
      };
      Map2.prototype.sortBy = function sortBy2(mapper, comparator) {
        return OrderedMap(sortFactory(this, comparator, mapper));
      };
      Map2.prototype.map = function map2(mapper, context) {
        var this$1$1 = this;
        return this.withMutations(function(map3) {
          map3.forEach(function(value, key) {
            map3.set(key, mapper.call(context, value, key, this$1$1));
          });
        });
      };
      Map2.prototype.__iterator = function __iterator2(type, reverse3) {
        return new MapIterator(this, type, reverse3);
      };
      Map2.prototype.__iterate = function __iterate2(fn, reverse3) {
        var this$1$1 = this;
        var iterations = 0;
        this._root && this._root.iterate(function(entry) {
          iterations++;
          return fn(entry[1], entry[0], this$1$1);
        }, reverse3);
        return iterations;
      };
      Map2.prototype.__ensureOwner = function __ensureOwner2(ownerID) {
        if (ownerID === this.__ownerID) {
          return this;
        }
        if (!ownerID) {
          if (this.size === 0) {
            return emptyMap();
          }
          this.__ownerID = ownerID;
          this.__altered = false;
          return this;
        }
        return makeMap(this.size, this._root, ownerID, this.__hash);
      };
      return Map2;
    }(KeyedCollection);
    Map.isMap = isMap;
    MapPrototype = Map.prototype;
    MapPrototype[IS_MAP_SYMBOL] = true;
    MapPrototype[DELETE] = MapPrototype.remove;
    MapPrototype.removeAll = MapPrototype.deleteAll;
    MapPrototype.setIn = setIn;
    MapPrototype.removeIn = MapPrototype.deleteIn = deleteIn;
    MapPrototype.update = update;
    MapPrototype.updateIn = updateIn;
    MapPrototype.merge = MapPrototype.concat = merge$1;
    MapPrototype.mergeWith = mergeWith$1;
    MapPrototype.mergeDeep = mergeDeep;
    MapPrototype.mergeDeepWith = mergeDeepWith;
    MapPrototype.mergeIn = mergeIn;
    MapPrototype.mergeDeepIn = mergeDeepIn;
    MapPrototype.withMutations = withMutations;
    MapPrototype.wasAltered = wasAltered;
    MapPrototype.asImmutable = asImmutable;
    MapPrototype["@@transducer/init"] = MapPrototype.asMutable = asMutable;
    MapPrototype["@@transducer/step"] = function(result, arr) {
      return result.set(arr[0], arr[1]);
    };
    MapPrototype["@@transducer/result"] = function(obj) {
      return obj.asImmutable();
    };
    ArrayMapNode = function ArrayMapNode2(ownerID, entries3) {
      this.ownerID = ownerID;
      this.entries = entries3;
    };
    ArrayMapNode.prototype.get = function get2(shift, keyHash, key, notSetValue) {
      var entries3 = this.entries;
      for (var ii = 0, len = entries3.length; ii < len; ii++) {
        if (is(key, entries3[ii][0])) {
          return entries3[ii][1];
        }
      }
      return notSetValue;
    };
    ArrayMapNode.prototype.update = function update2(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
      var removed = value === NOT_SET;
      var entries3 = this.entries;
      var idx = 0;
      var len = entries3.length;
      for (; idx < len; idx++) {
        if (is(key, entries3[idx][0])) {
          break;
        }
      }
      var exists = idx < len;
      if (exists ? entries3[idx][1] === value : removed) {
        return this;
      }
      SetRef(didAlter);
      (removed || !exists) && SetRef(didChangeSize);
      if (removed && entries3.length === 1) {
        return;
      }
      if (!exists && !removed && entries3.length >= MAX_ARRAY_MAP_SIZE) {
        return createNodes(ownerID, entries3, key, value);
      }
      var isEditable = ownerID && ownerID === this.ownerID;
      var newEntries = isEditable ? entries3 : arrCopy(entries3);
      if (exists) {
        if (removed) {
          idx === len - 1 ? newEntries.pop() : newEntries[idx] = newEntries.pop();
        } else {
          newEntries[idx] = [key, value];
        }
      } else {
        newEntries.push([key, value]);
      }
      if (isEditable) {
        this.entries = newEntries;
        return this;
      }
      return new ArrayMapNode(ownerID, newEntries);
    };
    BitmapIndexedNode = function BitmapIndexedNode2(ownerID, bitmap, nodes) {
      this.ownerID = ownerID;
      this.bitmap = bitmap;
      this.nodes = nodes;
    };
    BitmapIndexedNode.prototype.get = function get3(shift, keyHash, key, notSetValue) {
      if (keyHash === void 0) {
        keyHash = hash(key);
      }
      var bit = 1 << ((shift === 0 ? keyHash : keyHash >>> shift) & MASK);
      var bitmap = this.bitmap;
      return (bitmap & bit) === 0 ? notSetValue : this.nodes[popCount(bitmap & bit - 1)].get(
        shift + SHIFT,
        keyHash,
        key,
        notSetValue
      );
    };
    BitmapIndexedNode.prototype.update = function update3(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
      if (keyHash === void 0) {
        keyHash = hash(key);
      }
      var keyHashFrag = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
      var bit = 1 << keyHashFrag;
      var bitmap = this.bitmap;
      var exists = (bitmap & bit) !== 0;
      if (!exists && value === NOT_SET) {
        return this;
      }
      var idx = popCount(bitmap & bit - 1);
      var nodes = this.nodes;
      var node = exists ? nodes[idx] : void 0;
      var newNode = updateNode(
        node,
        ownerID,
        shift + SHIFT,
        keyHash,
        key,
        value,
        didChangeSize,
        didAlter
      );
      if (newNode === node) {
        return this;
      }
      if (!exists && newNode && nodes.length >= MAX_BITMAP_INDEXED_SIZE) {
        return expandNodes(ownerID, nodes, bitmap, keyHashFrag, newNode);
      }
      if (exists && !newNode && nodes.length === 2 && isLeafNode(nodes[idx ^ 1])) {
        return nodes[idx ^ 1];
      }
      if (exists && newNode && nodes.length === 1 && isLeafNode(newNode)) {
        return newNode;
      }
      var isEditable = ownerID && ownerID === this.ownerID;
      var newBitmap = exists ? newNode ? bitmap : bitmap ^ bit : bitmap | bit;
      var newNodes = exists ? newNode ? setAt(nodes, idx, newNode, isEditable) : spliceOut(nodes, idx, isEditable) : spliceIn(nodes, idx, newNode, isEditable);
      if (isEditable) {
        this.bitmap = newBitmap;
        this.nodes = newNodes;
        return this;
      }
      return new BitmapIndexedNode(ownerID, newBitmap, newNodes);
    };
    HashArrayMapNode = function HashArrayMapNode2(ownerID, count2, nodes) {
      this.ownerID = ownerID;
      this.count = count2;
      this.nodes = nodes;
    };
    HashArrayMapNode.prototype.get = function get4(shift, keyHash, key, notSetValue) {
      if (keyHash === void 0) {
        keyHash = hash(key);
      }
      var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
      var node = this.nodes[idx];
      return node ? node.get(shift + SHIFT, keyHash, key, notSetValue) : notSetValue;
    };
    HashArrayMapNode.prototype.update = function update4(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
      if (keyHash === void 0) {
        keyHash = hash(key);
      }
      var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
      var removed = value === NOT_SET;
      var nodes = this.nodes;
      var node = nodes[idx];
      if (removed && !node) {
        return this;
      }
      var newNode = updateNode(
        node,
        ownerID,
        shift + SHIFT,
        keyHash,
        key,
        value,
        didChangeSize,
        didAlter
      );
      if (newNode === node) {
        return this;
      }
      var newCount = this.count;
      if (!node) {
        newCount++;
      } else if (!newNode) {
        newCount--;
        if (newCount < MIN_HASH_ARRAY_MAP_SIZE) {
          return packNodes(ownerID, nodes, newCount, idx);
        }
      }
      var isEditable = ownerID && ownerID === this.ownerID;
      var newNodes = setAt(nodes, idx, newNode, isEditable);
      if (isEditable) {
        this.count = newCount;
        this.nodes = newNodes;
        return this;
      }
      return new HashArrayMapNode(ownerID, newCount, newNodes);
    };
    HashCollisionNode = function HashCollisionNode2(ownerID, keyHash, entries3) {
      this.ownerID = ownerID;
      this.keyHash = keyHash;
      this.entries = entries3;
    };
    HashCollisionNode.prototype.get = function get5(shift, keyHash, key, notSetValue) {
      var entries3 = this.entries;
      for (var ii = 0, len = entries3.length; ii < len; ii++) {
        if (is(key, entries3[ii][0])) {
          return entries3[ii][1];
        }
      }
      return notSetValue;
    };
    HashCollisionNode.prototype.update = function update5(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
      if (keyHash === void 0) {
        keyHash = hash(key);
      }
      var removed = value === NOT_SET;
      if (keyHash !== this.keyHash) {
        if (removed) {
          return this;
        }
        SetRef(didAlter);
        SetRef(didChangeSize);
        return mergeIntoNode(this, ownerID, shift, keyHash, [key, value]);
      }
      var entries3 = this.entries;
      var idx = 0;
      var len = entries3.length;
      for (; idx < len; idx++) {
        if (is(key, entries3[idx][0])) {
          break;
        }
      }
      var exists = idx < len;
      if (exists ? entries3[idx][1] === value : removed) {
        return this;
      }
      SetRef(didAlter);
      (removed || !exists) && SetRef(didChangeSize);
      if (removed && len === 2) {
        return new ValueNode(ownerID, this.keyHash, entries3[idx ^ 1]);
      }
      var isEditable = ownerID && ownerID === this.ownerID;
      var newEntries = isEditable ? entries3 : arrCopy(entries3);
      if (exists) {
        if (removed) {
          idx === len - 1 ? newEntries.pop() : newEntries[idx] = newEntries.pop();
        } else {
          newEntries[idx] = [key, value];
        }
      } else {
        newEntries.push([key, value]);
      }
      if (isEditable) {
        this.entries = newEntries;
        return this;
      }
      return new HashCollisionNode(ownerID, this.keyHash, newEntries);
    };
    ValueNode = function ValueNode2(ownerID, keyHash, entry) {
      this.ownerID = ownerID;
      this.keyHash = keyHash;
      this.entry = entry;
    };
    ValueNode.prototype.get = function get6(shift, keyHash, key, notSetValue) {
      return is(key, this.entry[0]) ? this.entry[1] : notSetValue;
    };
    ValueNode.prototype.update = function update6(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
      var removed = value === NOT_SET;
      var keyMatch = is(key, this.entry[0]);
      if (keyMatch ? value === this.entry[1] : removed) {
        return this;
      }
      SetRef(didAlter);
      if (removed) {
        SetRef(didChangeSize);
        return;
      }
      if (keyMatch) {
        if (ownerID && ownerID === this.ownerID) {
          this.entry[1] = value;
          return this;
        }
        return new ValueNode(ownerID, this.keyHash, [key, value]);
      }
      SetRef(didChangeSize);
      return mergeIntoNode(this, ownerID, shift, hash(key), [key, value]);
    };
    ArrayMapNode.prototype.iterate = HashCollisionNode.prototype.iterate = function(fn, reverse3) {
      var entries3 = this.entries;
      for (var ii = 0, maxIndex = entries3.length - 1; ii <= maxIndex; ii++) {
        if (fn(entries3[reverse3 ? maxIndex - ii : ii]) === false) {
          return false;
        }
      }
    };
    BitmapIndexedNode.prototype.iterate = HashArrayMapNode.prototype.iterate = function(fn, reverse3) {
      var nodes = this.nodes;
      for (var ii = 0, maxIndex = nodes.length - 1; ii <= maxIndex; ii++) {
        var node = nodes[reverse3 ? maxIndex - ii : ii];
        if (node && node.iterate(fn, reverse3) === false) {
          return false;
        }
      }
    };
    ValueNode.prototype.iterate = function(fn, reverse3) {
      return fn(this.entry);
    };
    MapIterator = function(Iterator3) {
      function MapIterator2(map2, type, reverse3) {
        this._type = type;
        this._reverse = reverse3;
        this._stack = map2._root && mapIteratorFrame(map2._root);
      }
      if (Iterator3)
        MapIterator2.__proto__ = Iterator3;
      MapIterator2.prototype = Object.create(Iterator3 && Iterator3.prototype);
      MapIterator2.prototype.constructor = MapIterator2;
      MapIterator2.prototype.next = function next() {
        var type = this._type;
        var stack = this._stack;
        while (stack) {
          var node = stack.node;
          var index = stack.index++;
          var maxIndex = void 0;
          if (node.entry) {
            if (index === 0) {
              return mapIteratorValue(type, node.entry);
            }
          } else if (node.entries) {
            maxIndex = node.entries.length - 1;
            if (index <= maxIndex) {
              return mapIteratorValue(
                type,
                node.entries[this._reverse ? maxIndex - index : index]
              );
            }
          } else {
            maxIndex = node.nodes.length - 1;
            if (index <= maxIndex) {
              var subNode = node.nodes[this._reverse ? maxIndex - index : index];
              if (subNode) {
                if (subNode.entry) {
                  return mapIteratorValue(type, subNode.entry);
                }
                stack = this._stack = mapIteratorFrame(subNode, stack);
              }
              continue;
            }
          }
          stack = this._stack = this._stack.__prev;
        }
        return iteratorDone();
      };
      return MapIterator2;
    }(Iterator);
    MAX_ARRAY_MAP_SIZE = SIZE / 4;
    MAX_BITMAP_INDEXED_SIZE = SIZE / 2;
    MIN_HASH_ARRAY_MAP_SIZE = SIZE / 4;
    IS_LIST_SYMBOL = "@@__IMMUTABLE_LIST__@@";
    List = function(IndexedCollection2) {
      function List2(value) {
        var empty = emptyList();
        if (value === void 0 || value === null) {
          return empty;
        }
        if (isList(value)) {
          return value;
        }
        var iter = IndexedCollection2(value);
        var size = iter.size;
        if (size === 0) {
          return empty;
        }
        assertNotInfinite(size);
        if (size > 0 && size < SIZE) {
          return makeList(0, size, SHIFT, null, new VNode(iter.toArray()));
        }
        return empty.withMutations(function(list) {
          list.setSize(size);
          iter.forEach(function(v, i) {
            return list.set(i, v);
          });
        });
      }
      if (IndexedCollection2)
        List2.__proto__ = IndexedCollection2;
      List2.prototype = Object.create(IndexedCollection2 && IndexedCollection2.prototype);
      List2.prototype.constructor = List2;
      List2.of = function of() {
        return this(arguments);
      };
      List2.prototype.toString = function toString5() {
        return this.__toString("List [", "]");
      };
      List2.prototype.get = function get11(index, notSetValue) {
        index = wrapIndex(this, index);
        if (index >= 0 && index < this.size) {
          index += this._origin;
          var node = listNodeFor(this, index);
          return node && node.array[index & MASK];
        }
        return notSetValue;
      };
      List2.prototype.set = function set3(index, value) {
        return updateList(this, index, value);
      };
      List2.prototype.remove = function remove3(index) {
        return !this.has(index) ? this : index === 0 ? this.shift() : index === this.size - 1 ? this.pop() : this.splice(index, 1);
      };
      List2.prototype.insert = function insert(index, value) {
        return this.splice(index, 0, value);
      };
      List2.prototype.clear = function clear2() {
        if (this.size === 0) {
          return this;
        }
        if (this.__ownerID) {
          this.size = this._origin = this._capacity = 0;
          this._level = SHIFT;
          this._root = this._tail = this.__hash = void 0;
          this.__altered = true;
          return this;
        }
        return emptyList();
      };
      List2.prototype.push = function push() {
        var values2 = arguments;
        var oldSize = this.size;
        return this.withMutations(function(list) {
          setListBounds(list, 0, oldSize + values2.length);
          for (var ii = 0; ii < values2.length; ii++) {
            list.set(oldSize + ii, values2[ii]);
          }
        });
      };
      List2.prototype.pop = function pop() {
        return setListBounds(this, 0, -1);
      };
      List2.prototype.unshift = function unshift() {
        var values2 = arguments;
        return this.withMutations(function(list) {
          setListBounds(list, -values2.length);
          for (var ii = 0; ii < values2.length; ii++) {
            list.set(ii, values2[ii]);
          }
        });
      };
      List2.prototype.shift = function shift() {
        return setListBounds(this, 1);
      };
      List2.prototype.concat = function concat2() {
        var arguments$1 = arguments;
        var seqs = [];
        for (var i = 0; i < arguments.length; i++) {
          var argument = arguments$1[i];
          var seq = IndexedCollection2(
            typeof argument !== "string" && hasIterator(argument) ? argument : [argument]
          );
          if (seq.size !== 0) {
            seqs.push(seq);
          }
        }
        if (seqs.length === 0) {
          return this;
        }
        if (this.size === 0 && !this.__ownerID && seqs.length === 1) {
          return this.constructor(seqs[0]);
        }
        return this.withMutations(function(list) {
          seqs.forEach(function(seq2) {
            return seq2.forEach(function(value) {
              return list.push(value);
            });
          });
        });
      };
      List2.prototype.setSize = function setSize(size) {
        return setListBounds(this, 0, size);
      };
      List2.prototype.map = function map2(mapper, context) {
        var this$1$1 = this;
        return this.withMutations(function(list) {
          for (var i = 0; i < this$1$1.size; i++) {
            list.set(i, mapper.call(context, list.get(i), i, this$1$1));
          }
        });
      };
      List2.prototype.slice = function slice3(begin, end) {
        var size = this.size;
        if (wholeSlice(begin, end, size)) {
          return this;
        }
        return setListBounds(
          this,
          resolveBegin(begin, size),
          resolveEnd(end, size)
        );
      };
      List2.prototype.__iterator = function __iterator2(type, reverse3) {
        var index = reverse3 ? this.size : 0;
        var values2 = iterateList(this, reverse3);
        return new Iterator(function() {
          var value = values2();
          return value === DONE ? iteratorDone() : iteratorValue(type, reverse3 ? --index : index++, value);
        });
      };
      List2.prototype.__iterate = function __iterate2(fn, reverse3) {
        var index = reverse3 ? this.size : 0;
        var values2 = iterateList(this, reverse3);
        var value;
        while ((value = values2()) !== DONE) {
          if (fn(value, reverse3 ? --index : index++, this) === false) {
            break;
          }
        }
        return index;
      };
      List2.prototype.__ensureOwner = function __ensureOwner2(ownerID) {
        if (ownerID === this.__ownerID) {
          return this;
        }
        if (!ownerID) {
          if (this.size === 0) {
            return emptyList();
          }
          this.__ownerID = ownerID;
          this.__altered = false;
          return this;
        }
        return makeList(
          this._origin,
          this._capacity,
          this._level,
          this._root,
          this._tail,
          ownerID,
          this.__hash
        );
      };
      return List2;
    }(IndexedCollection);
    List.isList = isList;
    ListPrototype = List.prototype;
    ListPrototype[IS_LIST_SYMBOL] = true;
    ListPrototype[DELETE] = ListPrototype.remove;
    ListPrototype.merge = ListPrototype.concat;
    ListPrototype.setIn = setIn;
    ListPrototype.deleteIn = ListPrototype.removeIn = deleteIn;
    ListPrototype.update = update;
    ListPrototype.updateIn = updateIn;
    ListPrototype.mergeIn = mergeIn;
    ListPrototype.mergeDeepIn = mergeDeepIn;
    ListPrototype.withMutations = withMutations;
    ListPrototype.wasAltered = wasAltered;
    ListPrototype.asImmutable = asImmutable;
    ListPrototype["@@transducer/init"] = ListPrototype.asMutable = asMutable;
    ListPrototype["@@transducer/step"] = function(result, arr) {
      return result.push(arr);
    };
    ListPrototype["@@transducer/result"] = function(obj) {
      return obj.asImmutable();
    };
    VNode = function VNode2(array, ownerID) {
      this.array = array;
      this.ownerID = ownerID;
    };
    VNode.prototype.removeBefore = function removeBefore(ownerID, level, index) {
      if (index === level ? 1 << level : this.array.length === 0) {
        return this;
      }
      var originIndex = index >>> level & MASK;
      if (originIndex >= this.array.length) {
        return new VNode([], ownerID);
      }
      var removingFirst = originIndex === 0;
      var newChild;
      if (level > 0) {
        var oldChild = this.array[originIndex];
        newChild = oldChild && oldChild.removeBefore(ownerID, level - SHIFT, index);
        if (newChild === oldChild && removingFirst) {
          return this;
        }
      }
      if (removingFirst && !newChild) {
        return this;
      }
      var editable = editableVNode(this, ownerID);
      if (!removingFirst) {
        for (var ii = 0; ii < originIndex; ii++) {
          editable.array[ii] = void 0;
        }
      }
      if (newChild) {
        editable.array[originIndex] = newChild;
      }
      return editable;
    };
    VNode.prototype.removeAfter = function removeAfter(ownerID, level, index) {
      if (index === (level ? 1 << level : 0) || this.array.length === 0) {
        return this;
      }
      var sizeIndex = index - 1 >>> level & MASK;
      if (sizeIndex >= this.array.length) {
        return this;
      }
      var newChild;
      if (level > 0) {
        var oldChild = this.array[sizeIndex];
        newChild = oldChild && oldChild.removeAfter(ownerID, level - SHIFT, index);
        if (newChild === oldChild && sizeIndex === this.array.length - 1) {
          return this;
        }
      }
      var editable = editableVNode(this, ownerID);
      editable.array.splice(sizeIndex + 1);
      if (newChild) {
        editable.array[sizeIndex] = newChild;
      }
      return editable;
    };
    DONE = {};
    OrderedMap = function(Map2) {
      function OrderedMap2(value) {
        return value === void 0 || value === null ? emptyOrderedMap() : isOrderedMap(value) ? value : emptyOrderedMap().withMutations(function(map2) {
          var iter = KeyedCollection(value);
          assertNotInfinite(iter.size);
          iter.forEach(function(v, k) {
            return map2.set(k, v);
          });
        });
      }
      if (Map2)
        OrderedMap2.__proto__ = Map2;
      OrderedMap2.prototype = Object.create(Map2 && Map2.prototype);
      OrderedMap2.prototype.constructor = OrderedMap2;
      OrderedMap2.of = function of() {
        return this(arguments);
      };
      OrderedMap2.prototype.toString = function toString5() {
        return this.__toString("OrderedMap {", "}");
      };
      OrderedMap2.prototype.get = function get11(k, notSetValue) {
        var index = this._map.get(k);
        return index !== void 0 ? this._list.get(index)[1] : notSetValue;
      };
      OrderedMap2.prototype.clear = function clear2() {
        if (this.size === 0) {
          return this;
        }
        if (this.__ownerID) {
          this.size = 0;
          this._map.clear();
          this._list.clear();
          this.__altered = true;
          return this;
        }
        return emptyOrderedMap();
      };
      OrderedMap2.prototype.set = function set3(k, v) {
        return updateOrderedMap(this, k, v);
      };
      OrderedMap2.prototype.remove = function remove3(k) {
        return updateOrderedMap(this, k, NOT_SET);
      };
      OrderedMap2.prototype.__iterate = function __iterate2(fn, reverse3) {
        var this$1$1 = this;
        return this._list.__iterate(
          function(entry) {
            return entry && fn(entry[1], entry[0], this$1$1);
          },
          reverse3
        );
      };
      OrderedMap2.prototype.__iterator = function __iterator2(type, reverse3) {
        return this._list.fromEntrySeq().__iterator(type, reverse3);
      };
      OrderedMap2.prototype.__ensureOwner = function __ensureOwner2(ownerID) {
        if (ownerID === this.__ownerID) {
          return this;
        }
        var newMap = this._map.__ensureOwner(ownerID);
        var newList = this._list.__ensureOwner(ownerID);
        if (!ownerID) {
          if (this.size === 0) {
            return emptyOrderedMap();
          }
          this.__ownerID = ownerID;
          this.__altered = false;
          this._map = newMap;
          this._list = newList;
          return this;
        }
        return makeOrderedMap(newMap, newList, ownerID, this.__hash);
      };
      return OrderedMap2;
    }(Map);
    OrderedMap.isOrderedMap = isOrderedMap;
    OrderedMap.prototype[IS_ORDERED_SYMBOL] = true;
    OrderedMap.prototype[DELETE] = OrderedMap.prototype.remove;
    IS_STACK_SYMBOL = "@@__IMMUTABLE_STACK__@@";
    Stack = function(IndexedCollection2) {
      function Stack2(value) {
        return value === void 0 || value === null ? emptyStack() : isStack(value) ? value : emptyStack().pushAll(value);
      }
      if (IndexedCollection2)
        Stack2.__proto__ = IndexedCollection2;
      Stack2.prototype = Object.create(IndexedCollection2 && IndexedCollection2.prototype);
      Stack2.prototype.constructor = Stack2;
      Stack2.of = function of() {
        return this(arguments);
      };
      Stack2.prototype.toString = function toString5() {
        return this.__toString("Stack [", "]");
      };
      Stack2.prototype.get = function get11(index, notSetValue) {
        var head = this._head;
        index = wrapIndex(this, index);
        while (head && index--) {
          head = head.next;
        }
        return head ? head.value : notSetValue;
      };
      Stack2.prototype.peek = function peek() {
        return this._head && this._head.value;
      };
      Stack2.prototype.push = function push() {
        var arguments$1 = arguments;
        if (arguments.length === 0) {
          return this;
        }
        var newSize = this.size + arguments.length;
        var head = this._head;
        for (var ii = arguments.length - 1; ii >= 0; ii--) {
          head = {
            value: arguments$1[ii],
            next: head
          };
        }
        if (this.__ownerID) {
          this.size = newSize;
          this._head = head;
          this.__hash = void 0;
          this.__altered = true;
          return this;
        }
        return makeStack(newSize, head);
      };
      Stack2.prototype.pushAll = function pushAll(iter) {
        iter = IndexedCollection2(iter);
        if (iter.size === 0) {
          return this;
        }
        if (this.size === 0 && isStack(iter)) {
          return iter;
        }
        assertNotInfinite(iter.size);
        var newSize = this.size;
        var head = this._head;
        iter.__iterate(
          function(value) {
            newSize++;
            head = {
              value,
              next: head
            };
          },
          /* reverse */
          true
        );
        if (this.__ownerID) {
          this.size = newSize;
          this._head = head;
          this.__hash = void 0;
          this.__altered = true;
          return this;
        }
        return makeStack(newSize, head);
      };
      Stack2.prototype.pop = function pop() {
        return this.slice(1);
      };
      Stack2.prototype.clear = function clear2() {
        if (this.size === 0) {
          return this;
        }
        if (this.__ownerID) {
          this.size = 0;
          this._head = void 0;
          this.__hash = void 0;
          this.__altered = true;
          return this;
        }
        return emptyStack();
      };
      Stack2.prototype.slice = function slice3(begin, end) {
        if (wholeSlice(begin, end, this.size)) {
          return this;
        }
        var resolvedBegin = resolveBegin(begin, this.size);
        var resolvedEnd = resolveEnd(end, this.size);
        if (resolvedEnd !== this.size) {
          return IndexedCollection2.prototype.slice.call(this, begin, end);
        }
        var newSize = this.size - resolvedBegin;
        var head = this._head;
        while (resolvedBegin--) {
          head = head.next;
        }
        if (this.__ownerID) {
          this.size = newSize;
          this._head = head;
          this.__hash = void 0;
          this.__altered = true;
          return this;
        }
        return makeStack(newSize, head);
      };
      Stack2.prototype.__ensureOwner = function __ensureOwner2(ownerID) {
        if (ownerID === this.__ownerID) {
          return this;
        }
        if (!ownerID) {
          if (this.size === 0) {
            return emptyStack();
          }
          this.__ownerID = ownerID;
          this.__altered = false;
          return this;
        }
        return makeStack(this.size, this._head, ownerID, this.__hash);
      };
      Stack2.prototype.__iterate = function __iterate2(fn, reverse3) {
        var this$1$1 = this;
        if (reverse3) {
          return new ArraySeq(this.toArray()).__iterate(
            function(v, k) {
              return fn(v, k, this$1$1);
            },
            reverse3
          );
        }
        var iterations = 0;
        var node = this._head;
        while (node) {
          if (fn(node.value, iterations++, this) === false) {
            break;
          }
          node = node.next;
        }
        return iterations;
      };
      Stack2.prototype.__iterator = function __iterator2(type, reverse3) {
        if (reverse3) {
          return new ArraySeq(this.toArray()).__iterator(type, reverse3);
        }
        var iterations = 0;
        var node = this._head;
        return new Iterator(function() {
          if (node) {
            var value = node.value;
            node = node.next;
            return iteratorValue(type, iterations++, value);
          }
          return iteratorDone();
        });
      };
      return Stack2;
    }(IndexedCollection);
    Stack.isStack = isStack;
    StackPrototype = Stack.prototype;
    StackPrototype[IS_STACK_SYMBOL] = true;
    StackPrototype.shift = StackPrototype.pop;
    StackPrototype.unshift = StackPrototype.push;
    StackPrototype.unshiftAll = StackPrototype.pushAll;
    StackPrototype.withMutations = withMutations;
    StackPrototype.wasAltered = wasAltered;
    StackPrototype.asImmutable = asImmutable;
    StackPrototype["@@transducer/init"] = StackPrototype.asMutable = asMutable;
    StackPrototype["@@transducer/step"] = function(result, arr) {
      return result.unshift(arr);
    };
    StackPrototype["@@transducer/result"] = function(obj) {
      return obj.asImmutable();
    };
    IS_SET_SYMBOL = "@@__IMMUTABLE_SET__@@";
    Set = function(SetCollection2) {
      function Set2(value) {
        return value === void 0 || value === null ? emptySet() : isSet(value) && !isOrdered(value) ? value : emptySet().withMutations(function(set3) {
          var iter = SetCollection2(value);
          assertNotInfinite(iter.size);
          iter.forEach(function(v) {
            return set3.add(v);
          });
        });
      }
      if (SetCollection2)
        Set2.__proto__ = SetCollection2;
      Set2.prototype = Object.create(SetCollection2 && SetCollection2.prototype);
      Set2.prototype.constructor = Set2;
      Set2.of = function of() {
        return this(arguments);
      };
      Set2.fromKeys = function fromKeys(value) {
        return this(KeyedCollection(value).keySeq());
      };
      Set2.intersect = function intersect(sets) {
        sets = Collection(sets).toArray();
        return sets.length ? SetPrototype.intersect.apply(Set2(sets.pop()), sets) : emptySet();
      };
      Set2.union = function union(sets) {
        sets = Collection(sets).toArray();
        return sets.length ? SetPrototype.union.apply(Set2(sets.pop()), sets) : emptySet();
      };
      Set2.prototype.toString = function toString5() {
        return this.__toString("Set {", "}");
      };
      Set2.prototype.has = function has5(value) {
        return this._map.has(value);
      };
      Set2.prototype.add = function add(value) {
        return updateSet(this, this._map.set(value, value));
      };
      Set2.prototype.remove = function remove3(value) {
        return updateSet(this, this._map.remove(value));
      };
      Set2.prototype.clear = function clear2() {
        return updateSet(this, this._map.clear());
      };
      Set2.prototype.map = function map2(mapper, context) {
        var this$1$1 = this;
        var didChanges = false;
        var newMap = updateSet(
          this,
          this._map.mapEntries(function(ref) {
            var v = ref[1];
            var mapped = mapper.call(context, v, v, this$1$1);
            if (mapped !== v) {
              didChanges = true;
            }
            return [mapped, mapped];
          }, context)
        );
        return didChanges ? newMap : this;
      };
      Set2.prototype.union = function union() {
        var iters = [], len = arguments.length;
        while (len--)
          iters[len] = arguments[len];
        iters = iters.filter(function(x) {
          return x.size !== 0;
        });
        if (iters.length === 0) {
          return this;
        }
        if (this.size === 0 && !this.__ownerID && iters.length === 1) {
          return this.constructor(iters[0]);
        }
        return this.withMutations(function(set3) {
          for (var ii = 0; ii < iters.length; ii++) {
            if (typeof iters[ii] === "string") {
              set3.add(iters[ii]);
            } else {
              SetCollection2(iters[ii]).forEach(function(value) {
                return set3.add(value);
              });
            }
          }
        });
      };
      Set2.prototype.intersect = function intersect() {
        var iters = [], len = arguments.length;
        while (len--)
          iters[len] = arguments[len];
        if (iters.length === 0) {
          return this;
        }
        iters = iters.map(function(iter) {
          return SetCollection2(iter);
        });
        var toRemove = [];
        this.forEach(function(value) {
          if (!iters.every(function(iter) {
            return iter.includes(value);
          })) {
            toRemove.push(value);
          }
        });
        return this.withMutations(function(set3) {
          toRemove.forEach(function(value) {
            set3.remove(value);
          });
        });
      };
      Set2.prototype.subtract = function subtract() {
        var iters = [], len = arguments.length;
        while (len--)
          iters[len] = arguments[len];
        if (iters.length === 0) {
          return this;
        }
        iters = iters.map(function(iter) {
          return SetCollection2(iter);
        });
        var toRemove = [];
        this.forEach(function(value) {
          if (iters.some(function(iter) {
            return iter.includes(value);
          })) {
            toRemove.push(value);
          }
        });
        return this.withMutations(function(set3) {
          toRemove.forEach(function(value) {
            set3.remove(value);
          });
        });
      };
      Set2.prototype.sort = function sort2(comparator) {
        return OrderedSet(sortFactory(this, comparator));
      };
      Set2.prototype.sortBy = function sortBy2(mapper, comparator) {
        return OrderedSet(sortFactory(this, comparator, mapper));
      };
      Set2.prototype.wasAltered = function wasAltered3() {
        return this._map.wasAltered();
      };
      Set2.prototype.__iterate = function __iterate2(fn, reverse3) {
        var this$1$1 = this;
        return this._map.__iterate(function(k) {
          return fn(k, k, this$1$1);
        }, reverse3);
      };
      Set2.prototype.__iterator = function __iterator2(type, reverse3) {
        return this._map.__iterator(type, reverse3);
      };
      Set2.prototype.__ensureOwner = function __ensureOwner2(ownerID) {
        if (ownerID === this.__ownerID) {
          return this;
        }
        var newMap = this._map.__ensureOwner(ownerID);
        if (!ownerID) {
          if (this.size === 0) {
            return this.__empty();
          }
          this.__ownerID = ownerID;
          this._map = newMap;
          return this;
        }
        return this.__make(newMap, ownerID);
      };
      return Set2;
    }(SetCollection);
    Set.isSet = isSet;
    SetPrototype = Set.prototype;
    SetPrototype[IS_SET_SYMBOL] = true;
    SetPrototype[DELETE] = SetPrototype.remove;
    SetPrototype.merge = SetPrototype.concat = SetPrototype.union;
    SetPrototype.withMutations = withMutations;
    SetPrototype.asImmutable = asImmutable;
    SetPrototype["@@transducer/init"] = SetPrototype.asMutable = asMutable;
    SetPrototype["@@transducer/step"] = function(result, arr) {
      return result.add(arr);
    };
    SetPrototype["@@transducer/result"] = function(obj) {
      return obj.asImmutable();
    };
    SetPrototype.__empty = emptySet;
    SetPrototype.__make = makeSet;
    Range = function(IndexedSeq2) {
      function Range2(start, end, step) {
        if (!(this instanceof Range2)) {
          return new Range2(start, end, step);
        }
        invariant(step !== 0, "Cannot step a Range by 0");
        start = start || 0;
        if (end === void 0) {
          end = Infinity;
        }
        step = step === void 0 ? 1 : Math.abs(step);
        if (end < start) {
          step = -step;
        }
        this._start = start;
        this._end = end;
        this._step = step;
        this.size = Math.max(0, Math.ceil((end - start) / step - 1) + 1);
        if (this.size === 0) {
          if (EMPTY_RANGE) {
            return EMPTY_RANGE;
          }
          EMPTY_RANGE = this;
        }
      }
      if (IndexedSeq2)
        Range2.__proto__ = IndexedSeq2;
      Range2.prototype = Object.create(IndexedSeq2 && IndexedSeq2.prototype);
      Range2.prototype.constructor = Range2;
      Range2.prototype.toString = function toString5() {
        if (this.size === 0) {
          return "Range []";
        }
        return "Range [ " + this._start + "..." + this._end + (this._step !== 1 ? " by " + this._step : "") + " ]";
      };
      Range2.prototype.get = function get11(index, notSetValue) {
        return this.has(index) ? this._start + wrapIndex(this, index) * this._step : notSetValue;
      };
      Range2.prototype.includes = function includes3(searchValue) {
        var possibleIndex = (searchValue - this._start) / this._step;
        return possibleIndex >= 0 && possibleIndex < this.size && possibleIndex === Math.floor(possibleIndex);
      };
      Range2.prototype.slice = function slice3(begin, end) {
        if (wholeSlice(begin, end, this.size)) {
          return this;
        }
        begin = resolveBegin(begin, this.size);
        end = resolveEnd(end, this.size);
        if (end <= begin) {
          return new Range2(0, 0);
        }
        return new Range2(
          this.get(begin, this._end),
          this.get(end, this._end),
          this._step
        );
      };
      Range2.prototype.indexOf = function indexOf2(searchValue) {
        var offsetValue = searchValue - this._start;
        if (offsetValue % this._step === 0) {
          var index = offsetValue / this._step;
          if (index >= 0 && index < this.size) {
            return index;
          }
        }
        return -1;
      };
      Range2.prototype.lastIndexOf = function lastIndexOf2(searchValue) {
        return this.indexOf(searchValue);
      };
      Range2.prototype.__iterate = function __iterate2(fn, reverse3) {
        var size = this.size;
        var step = this._step;
        var value = reverse3 ? this._start + (size - 1) * step : this._start;
        var i = 0;
        while (i !== size) {
          if (fn(value, reverse3 ? size - ++i : i++, this) === false) {
            break;
          }
          value += reverse3 ? -step : step;
        }
        return i;
      };
      Range2.prototype.__iterator = function __iterator2(type, reverse3) {
        var size = this.size;
        var step = this._step;
        var value = reverse3 ? this._start + (size - 1) * step : this._start;
        var i = 0;
        return new Iterator(function() {
          if (i === size) {
            return iteratorDone();
          }
          var v = value;
          value += reverse3 ? -step : step;
          return iteratorValue(type, reverse3 ? size - ++i : i++, v);
        });
      };
      Range2.prototype.equals = function equals3(other) {
        return other instanceof Range2 ? this._start === other._start && this._end === other._end && this._step === other._step : deepEqual(this, other);
      };
      return Range2;
    }(IndexedSeq);
    Collection.isIterable = isCollection;
    Collection.isKeyed = isKeyed;
    Collection.isIndexed = isIndexed;
    Collection.isAssociative = isAssociative;
    Collection.isOrdered = isOrdered;
    Collection.Iterator = Iterator;
    mixin(Collection, {
      // ### Conversion to other types
      toArray: function toArray() {
        assertNotInfinite(this.size);
        var array = new Array(this.size || 0);
        var useTuples = isKeyed(this);
        var i = 0;
        this.__iterate(function(v, k) {
          array[i++] = useTuples ? [k, v] : v;
        });
        return array;
      },
      toIndexedSeq: function toIndexedSeq() {
        return new ToIndexedSequence(this);
      },
      toJS: function toJS$1() {
        return toJS(this);
      },
      toKeyedSeq: function toKeyedSeq() {
        return new ToKeyedSequence(this, true);
      },
      toMap: function toMap() {
        return Map(this.toKeyedSeq());
      },
      toObject,
      toOrderedMap: function toOrderedMap() {
        return OrderedMap(this.toKeyedSeq());
      },
      toOrderedSet: function toOrderedSet() {
        return OrderedSet(isKeyed(this) ? this.valueSeq() : this);
      },
      toSet: function toSet() {
        return Set(isKeyed(this) ? this.valueSeq() : this);
      },
      toSetSeq: function toSetSeq() {
        return new ToSetSequence(this);
      },
      toSeq: function toSeq() {
        return isIndexed(this) ? this.toIndexedSeq() : isKeyed(this) ? this.toKeyedSeq() : this.toSetSeq();
      },
      toStack: function toStack() {
        return Stack(isKeyed(this) ? this.valueSeq() : this);
      },
      toList: function toList() {
        return List(isKeyed(this) ? this.valueSeq() : this);
      },
      // ### Common JavaScript methods and properties
      toString: function toString3() {
        return "[Collection]";
      },
      __toString: function __toString(head, tail) {
        if (this.size === 0) {
          return head + tail;
        }
        return head + " " + this.toSeq().map(this.__toStringMapper).join(", ") + " " + tail;
      },
      // ### ES6 Collection methods (ES6 Array and Map)
      concat: function concat() {
        var values2 = [], len = arguments.length;
        while (len--)
          values2[len] = arguments[len];
        return reify(this, concatFactory(this, values2));
      },
      includes: function includes(searchValue) {
        return this.some(function(value) {
          return is(value, searchValue);
        });
      },
      entries: function entries() {
        return this.__iterator(ITERATE_ENTRIES);
      },
      every: function every(predicate, context) {
        assertNotInfinite(this.size);
        var returnValue = true;
        this.__iterate(function(v, k, c) {
          if (!predicate.call(context, v, k, c)) {
            returnValue = false;
            return false;
          }
        });
        return returnValue;
      },
      filter: function filter(predicate, context) {
        return reify(this, filterFactory(this, predicate, context, true));
      },
      partition: function partition(predicate, context) {
        return partitionFactory(this, predicate, context);
      },
      find: function find(predicate, context, notSetValue) {
        var entry = this.findEntry(predicate, context);
        return entry ? entry[1] : notSetValue;
      },
      forEach: function forEach(sideEffect, context) {
        assertNotInfinite(this.size);
        return this.__iterate(context ? sideEffect.bind(context) : sideEffect);
      },
      join: function join(separator) {
        assertNotInfinite(this.size);
        separator = separator !== void 0 ? "" + separator : ",";
        var joined = "";
        var isFirst = true;
        this.__iterate(function(v) {
          isFirst ? isFirst = false : joined += separator;
          joined += v !== null && v !== void 0 ? v.toString() : "";
        });
        return joined;
      },
      keys: function keys() {
        return this.__iterator(ITERATE_KEYS);
      },
      map: function map(mapper, context) {
        return reify(this, mapFactory(this, mapper, context));
      },
      reduce: function reduce$1(reducer, initialReduction, context) {
        return reduce(
          this,
          reducer,
          initialReduction,
          context,
          arguments.length < 2,
          false
        );
      },
      reduceRight: function reduceRight(reducer, initialReduction, context) {
        return reduce(
          this,
          reducer,
          initialReduction,
          context,
          arguments.length < 2,
          true
        );
      },
      reverse: function reverse() {
        return reify(this, reverseFactory(this, true));
      },
      slice: function slice(begin, end) {
        return reify(this, sliceFactory(this, begin, end, true));
      },
      some: function some(predicate, context) {
        assertNotInfinite(this.size);
        var returnValue = false;
        this.__iterate(function(v, k, c) {
          if (predicate.call(context, v, k, c)) {
            returnValue = true;
            return false;
          }
        });
        return returnValue;
      },
      sort: function sort(comparator) {
        return reify(this, sortFactory(this, comparator));
      },
      values: function values() {
        return this.__iterator(ITERATE_VALUES);
      },
      // ### More sequential methods
      butLast: function butLast() {
        return this.slice(0, -1);
      },
      isEmpty: function isEmpty() {
        return this.size !== void 0 ? this.size === 0 : !this.some(function() {
          return true;
        });
      },
      count: function count(predicate, context) {
        return ensureSize(
          predicate ? this.toSeq().filter(predicate, context) : this
        );
      },
      countBy: function countBy(grouper, context) {
        return countByFactory(this, grouper, context);
      },
      equals: function equals(other) {
        return deepEqual(this, other);
      },
      entrySeq: function entrySeq() {
        var collection = this;
        if (collection._cache) {
          return new ArraySeq(collection._cache);
        }
        var entriesSequence = collection.toSeq().map(entryMapper).toIndexedSeq();
        entriesSequence.fromEntrySeq = function() {
          return collection.toSeq();
        };
        return entriesSequence;
      },
      filterNot: function filterNot(predicate, context) {
        return this.filter(not(predicate), context);
      },
      findEntry: function findEntry(predicate, context, notSetValue) {
        var found = notSetValue;
        this.__iterate(function(v, k, c) {
          if (predicate.call(context, v, k, c)) {
            found = [k, v];
            return false;
          }
        });
        return found;
      },
      findKey: function findKey(predicate, context) {
        var entry = this.findEntry(predicate, context);
        return entry && entry[0];
      },
      findLast: function findLast(predicate, context, notSetValue) {
        return this.toKeyedSeq().reverse().find(predicate, context, notSetValue);
      },
      findLastEntry: function findLastEntry(predicate, context, notSetValue) {
        return this.toKeyedSeq().reverse().findEntry(predicate, context, notSetValue);
      },
      findLastKey: function findLastKey(predicate, context) {
        return this.toKeyedSeq().reverse().findKey(predicate, context);
      },
      first: function first(notSetValue) {
        return this.find(returnTrue, null, notSetValue);
      },
      flatMap: function flatMap(mapper, context) {
        return reify(this, flatMapFactory(this, mapper, context));
      },
      flatten: function flatten(depth) {
        return reify(this, flattenFactory(this, depth, true));
      },
      fromEntrySeq: function fromEntrySeq() {
        return new FromEntriesSequence(this);
      },
      get: function get7(searchKey, notSetValue) {
        return this.find(function(_, key) {
          return is(key, searchKey);
        }, void 0, notSetValue);
      },
      getIn,
      groupBy: function groupBy(grouper, context) {
        return groupByFactory(this, grouper, context);
      },
      has: function has2(searchKey) {
        return this.get(searchKey, NOT_SET) !== NOT_SET;
      },
      hasIn,
      isSubset: function isSubset(iter) {
        iter = typeof iter.includes === "function" ? iter : Collection(iter);
        return this.every(function(value) {
          return iter.includes(value);
        });
      },
      isSuperset: function isSuperset(iter) {
        iter = typeof iter.isSubset === "function" ? iter : Collection(iter);
        return iter.isSubset(this);
      },
      keyOf: function keyOf(searchValue) {
        return this.findKey(function(value) {
          return is(value, searchValue);
        });
      },
      keySeq: function keySeq() {
        return this.toSeq().map(keyMapper).toIndexedSeq();
      },
      last: function last(notSetValue) {
        return this.toSeq().reverse().first(notSetValue);
      },
      lastKeyOf: function lastKeyOf(searchValue) {
        return this.toKeyedSeq().reverse().keyOf(searchValue);
      },
      max: function max(comparator) {
        return maxFactory(this, comparator);
      },
      maxBy: function maxBy(mapper, comparator) {
        return maxFactory(this, comparator, mapper);
      },
      min: function min(comparator) {
        return maxFactory(
          this,
          comparator ? neg(comparator) : defaultNegComparator
        );
      },
      minBy: function minBy(mapper, comparator) {
        return maxFactory(
          this,
          comparator ? neg(comparator) : defaultNegComparator,
          mapper
        );
      },
      rest: function rest() {
        return this.slice(1);
      },
      skip: function skip(amount) {
        return amount === 0 ? this : this.slice(Math.max(0, amount));
      },
      skipLast: function skipLast(amount) {
        return amount === 0 ? this : this.slice(0, -Math.max(0, amount));
      },
      skipWhile: function skipWhile(predicate, context) {
        return reify(this, skipWhileFactory(this, predicate, context, true));
      },
      skipUntil: function skipUntil(predicate, context) {
        return this.skipWhile(not(predicate), context);
      },
      sortBy: function sortBy(mapper, comparator) {
        return reify(this, sortFactory(this, comparator, mapper));
      },
      take: function take(amount) {
        return this.slice(0, Math.max(0, amount));
      },
      takeLast: function takeLast(amount) {
        return this.slice(-Math.max(0, amount));
      },
      takeWhile: function takeWhile(predicate, context) {
        return reify(this, takeWhileFactory(this, predicate, context));
      },
      takeUntil: function takeUntil(predicate, context) {
        return this.takeWhile(not(predicate), context);
      },
      update: function update7(fn) {
        return fn(this);
      },
      valueSeq: function valueSeq() {
        return this.toIndexedSeq();
      },
      // ### Hashable Object
      hashCode: function hashCode() {
        return this.__hash || (this.__hash = hashCollection(this));
      }
      // ### Internal
      // abstract __iterate(fn, reverse)
      // abstract __iterator(type, reverse)
    });
    CollectionPrototype = Collection.prototype;
    CollectionPrototype[IS_COLLECTION_SYMBOL] = true;
    CollectionPrototype[ITERATOR_SYMBOL] = CollectionPrototype.values;
    CollectionPrototype.toJSON = CollectionPrototype.toArray;
    CollectionPrototype.__toStringMapper = quoteString;
    CollectionPrototype.inspect = CollectionPrototype.toSource = function() {
      return this.toString();
    };
    CollectionPrototype.chain = CollectionPrototype.flatMap;
    CollectionPrototype.contains = CollectionPrototype.includes;
    mixin(KeyedCollection, {
      // ### More sequential methods
      flip: function flip() {
        return reify(this, flipFactory(this));
      },
      mapEntries: function mapEntries(mapper, context) {
        var this$1$1 = this;
        var iterations = 0;
        return reify(
          this,
          this.toSeq().map(function(v, k) {
            return mapper.call(context, [k, v], iterations++, this$1$1);
          }).fromEntrySeq()
        );
      },
      mapKeys: function mapKeys(mapper, context) {
        var this$1$1 = this;
        return reify(
          this,
          this.toSeq().flip().map(function(k, v) {
            return mapper.call(context, k, v, this$1$1);
          }).flip()
        );
      }
    });
    KeyedCollectionPrototype = KeyedCollection.prototype;
    KeyedCollectionPrototype[IS_KEYED_SYMBOL] = true;
    KeyedCollectionPrototype[ITERATOR_SYMBOL] = CollectionPrototype.entries;
    KeyedCollectionPrototype.toJSON = toObject;
    KeyedCollectionPrototype.__toStringMapper = function(v, k) {
      return quoteString(k) + ": " + quoteString(v);
    };
    mixin(IndexedCollection, {
      // ### Conversion to other types
      toKeyedSeq: function toKeyedSeq2() {
        return new ToKeyedSequence(this, false);
      },
      // ### ES6 Collection methods (ES6 Array and Map)
      filter: function filter2(predicate, context) {
        return reify(this, filterFactory(this, predicate, context, false));
      },
      findIndex: function findIndex(predicate, context) {
        var entry = this.findEntry(predicate, context);
        return entry ? entry[0] : -1;
      },
      indexOf: function indexOf(searchValue) {
        var key = this.keyOf(searchValue);
        return key === void 0 ? -1 : key;
      },
      lastIndexOf: function lastIndexOf(searchValue) {
        var key = this.lastKeyOf(searchValue);
        return key === void 0 ? -1 : key;
      },
      reverse: function reverse2() {
        return reify(this, reverseFactory(this, false));
      },
      slice: function slice2(begin, end) {
        return reify(this, sliceFactory(this, begin, end, false));
      },
      splice: function splice(index, removeNum) {
        var numArgs = arguments.length;
        removeNum = Math.max(removeNum || 0, 0);
        if (numArgs === 0 || numArgs === 2 && !removeNum) {
          return this;
        }
        index = resolveBegin(index, index < 0 ? this.count() : this.size);
        var spliced = this.slice(0, index);
        return reify(
          this,
          numArgs === 1 ? spliced : spliced.concat(arrCopy(arguments, 2), this.slice(index + removeNum))
        );
      },
      // ### More collection methods
      findLastIndex: function findLastIndex(predicate, context) {
        var entry = this.findLastEntry(predicate, context);
        return entry ? entry[0] : -1;
      },
      first: function first2(notSetValue) {
        return this.get(0, notSetValue);
      },
      flatten: function flatten2(depth) {
        return reify(this, flattenFactory(this, depth, false));
      },
      get: function get8(index, notSetValue) {
        index = wrapIndex(this, index);
        return index < 0 || this.size === Infinity || this.size !== void 0 && index > this.size ? notSetValue : this.find(function(_, key) {
          return key === index;
        }, void 0, notSetValue);
      },
      has: function has3(index) {
        index = wrapIndex(this, index);
        return index >= 0 && (this.size !== void 0 ? this.size === Infinity || index < this.size : this.indexOf(index) !== -1);
      },
      interpose: function interpose(separator) {
        return reify(this, interposeFactory(this, separator));
      },
      interleave: function interleave() {
        var collections = [this].concat(arrCopy(arguments));
        var zipped = zipWithFactory(this.toSeq(), IndexedSeq.of, collections);
        var interleaved = zipped.flatten(true);
        if (zipped.size) {
          interleaved.size = zipped.size * collections.length;
        }
        return reify(this, interleaved);
      },
      keySeq: function keySeq2() {
        return Range(0, this.size);
      },
      last: function last2(notSetValue) {
        return this.get(-1, notSetValue);
      },
      skipWhile: function skipWhile2(predicate, context) {
        return reify(this, skipWhileFactory(this, predicate, context, false));
      },
      zip: function zip() {
        var collections = [this].concat(arrCopy(arguments));
        return reify(this, zipWithFactory(this, defaultZipper, collections));
      },
      zipAll: function zipAll() {
        var collections = [this].concat(arrCopy(arguments));
        return reify(this, zipWithFactory(this, defaultZipper, collections, true));
      },
      zipWith: function zipWith(zipper) {
        var collections = arrCopy(arguments);
        collections[0] = this;
        return reify(this, zipWithFactory(this, zipper, collections));
      }
    });
    IndexedCollectionPrototype = IndexedCollection.prototype;
    IndexedCollectionPrototype[IS_INDEXED_SYMBOL] = true;
    IndexedCollectionPrototype[IS_ORDERED_SYMBOL] = true;
    mixin(SetCollection, {
      // ### ES6 Collection methods (ES6 Array and Map)
      get: function get9(value, notSetValue) {
        return this.has(value) ? value : notSetValue;
      },
      includes: function includes2(value) {
        return this.has(value);
      },
      // ### More sequential methods
      keySeq: function keySeq3() {
        return this.valueSeq();
      }
    });
    SetCollectionPrototype = SetCollection.prototype;
    SetCollectionPrototype.has = CollectionPrototype.includes;
    SetCollectionPrototype.contains = SetCollectionPrototype.includes;
    SetCollectionPrototype.keys = SetCollectionPrototype.values;
    mixin(KeyedSeq, KeyedCollectionPrototype);
    mixin(IndexedSeq, IndexedCollectionPrototype);
    mixin(SetSeq, SetCollectionPrototype);
    OrderedSet = function(Set2) {
      function OrderedSet2(value) {
        return value === void 0 || value === null ? emptyOrderedSet() : isOrderedSet(value) ? value : emptyOrderedSet().withMutations(function(set3) {
          var iter = SetCollection(value);
          assertNotInfinite(iter.size);
          iter.forEach(function(v) {
            return set3.add(v);
          });
        });
      }
      if (Set2)
        OrderedSet2.__proto__ = Set2;
      OrderedSet2.prototype = Object.create(Set2 && Set2.prototype);
      OrderedSet2.prototype.constructor = OrderedSet2;
      OrderedSet2.of = function of() {
        return this(arguments);
      };
      OrderedSet2.fromKeys = function fromKeys(value) {
        return this(KeyedCollection(value).keySeq());
      };
      OrderedSet2.prototype.toString = function toString5() {
        return this.__toString("OrderedSet {", "}");
      };
      return OrderedSet2;
    }(Set);
    OrderedSet.isOrderedSet = isOrderedSet;
    OrderedSetPrototype = OrderedSet.prototype;
    OrderedSetPrototype[IS_ORDERED_SYMBOL] = true;
    OrderedSetPrototype.zip = IndexedCollectionPrototype.zip;
    OrderedSetPrototype.zipWith = IndexedCollectionPrototype.zipWith;
    OrderedSetPrototype.zipAll = IndexedCollectionPrototype.zipAll;
    OrderedSetPrototype.__empty = emptyOrderedSet;
    OrderedSetPrototype.__make = makeOrderedSet;
    PairSorting = {
      LeftThenRight: -1,
      RightThenLeft: 1
    };
    Record = function Record2(defaultValues, name) {
      var hasInitialized;
      throwOnInvalidDefaultValues(defaultValues);
      var RecordType = function Record3(values2) {
        var this$1$1 = this;
        if (values2 instanceof RecordType) {
          return values2;
        }
        if (!(this instanceof RecordType)) {
          return new RecordType(values2);
        }
        if (!hasInitialized) {
          hasInitialized = true;
          var keys2 = Object.keys(defaultValues);
          var indices = RecordTypePrototype._indices = {};
          RecordTypePrototype._name = name;
          RecordTypePrototype._keys = keys2;
          RecordTypePrototype._defaultValues = defaultValues;
          for (var i = 0; i < keys2.length; i++) {
            var propName = keys2[i];
            indices[propName] = i;
            if (RecordTypePrototype[propName]) {
              typeof console === "object" && console.warn && console.warn(
                "Cannot define " + recordName(this) + ' with property "' + propName + '" since that property name is part of the Record API.'
              );
            } else {
              setProp(RecordTypePrototype, propName);
            }
          }
        }
        this.__ownerID = void 0;
        this._values = List().withMutations(function(l) {
          l.setSize(this$1$1._keys.length);
          KeyedCollection(values2).forEach(function(v, k) {
            l.set(this$1$1._indices[k], v === this$1$1._defaultValues[k] ? void 0 : v);
          });
        });
        return this;
      };
      var RecordTypePrototype = RecordType.prototype = Object.create(RecordPrototype);
      RecordTypePrototype.constructor = RecordType;
      if (name) {
        RecordType.displayName = name;
      }
      return RecordType;
    };
    Record.prototype.toString = function toString4() {
      var str = recordName(this) + " { ";
      var keys2 = this._keys;
      var k;
      for (var i = 0, l = keys2.length; i !== l; i++) {
        k = keys2[i];
        str += (i ? ", " : "") + k + ": " + quoteString(this.get(k));
      }
      return str + " }";
    };
    Record.prototype.equals = function equals2(other) {
      return this === other || isRecord(other) && recordSeq(this).equals(recordSeq(other));
    };
    Record.prototype.hashCode = function hashCode2() {
      return recordSeq(this).hashCode();
    };
    Record.prototype.has = function has4(k) {
      return this._indices.hasOwnProperty(k);
    };
    Record.prototype.get = function get10(k, notSetValue) {
      if (!this.has(k)) {
        return notSetValue;
      }
      var index = this._indices[k];
      var value = this._values.get(index);
      return value === void 0 ? this._defaultValues[k] : value;
    };
    Record.prototype.set = function set2(k, v) {
      if (this.has(k)) {
        var newValues = this._values.set(
          this._indices[k],
          v === this._defaultValues[k] ? void 0 : v
        );
        if (newValues !== this._values && !this.__ownerID) {
          return makeRecord(this, newValues);
        }
      }
      return this;
    };
    Record.prototype.remove = function remove2(k) {
      return this.set(k);
    };
    Record.prototype.clear = function clear() {
      var newValues = this._values.clear().setSize(this._keys.length);
      return this.__ownerID ? this : makeRecord(this, newValues);
    };
    Record.prototype.wasAltered = function wasAltered2() {
      return this._values.wasAltered();
    };
    Record.prototype.toSeq = function toSeq2() {
      return recordSeq(this);
    };
    Record.prototype.toJS = function toJS$12() {
      return toJS(this);
    };
    Record.prototype.entries = function entries2() {
      return this.__iterator(ITERATE_ENTRIES);
    };
    Record.prototype.__iterator = function __iterator(type, reverse3) {
      return recordSeq(this).__iterator(type, reverse3);
    };
    Record.prototype.__iterate = function __iterate(fn, reverse3) {
      return recordSeq(this).__iterate(fn, reverse3);
    };
    Record.prototype.__ensureOwner = function __ensureOwner(ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      var newValues = this._values.__ensureOwner(ownerID);
      if (!ownerID) {
        this.__ownerID = ownerID;
        this._values = newValues;
        return this;
      }
      return makeRecord(this, newValues, ownerID);
    };
    Record.isRecord = isRecord;
    Record.getDescriptiveName = recordName;
    RecordPrototype = Record.prototype;
    RecordPrototype[IS_RECORD_SYMBOL] = true;
    RecordPrototype[DELETE] = RecordPrototype.remove;
    RecordPrototype.deleteIn = RecordPrototype.removeIn = deleteIn;
    RecordPrototype.getIn = getIn;
    RecordPrototype.hasIn = CollectionPrototype.hasIn;
    RecordPrototype.merge = merge$1;
    RecordPrototype.mergeWith = mergeWith$1;
    RecordPrototype.mergeIn = mergeIn;
    RecordPrototype.mergeDeep = mergeDeep;
    RecordPrototype.mergeDeepWith = mergeDeepWith;
    RecordPrototype.mergeDeepIn = mergeDeepIn;
    RecordPrototype.setIn = setIn;
    RecordPrototype.update = update;
    RecordPrototype.updateIn = updateIn;
    RecordPrototype.withMutations = withMutations;
    RecordPrototype.asMutable = asMutable;
    RecordPrototype.asImmutable = asImmutable;
    RecordPrototype[ITERATOR_SYMBOL] = RecordPrototype.entries;
    RecordPrototype.toJSON = RecordPrototype.toObject = CollectionPrototype.toObject;
    RecordPrototype.inspect = RecordPrototype.toSource = function() {
      return this.toString();
    };
    Repeat = function(IndexedSeq2) {
      function Repeat2(value, times) {
        if (!(this instanceof Repeat2)) {
          return new Repeat2(value, times);
        }
        this._value = value;
        this.size = times === void 0 ? Infinity : Math.max(0, times);
        if (this.size === 0) {
          if (EMPTY_REPEAT) {
            return EMPTY_REPEAT;
          }
          EMPTY_REPEAT = this;
        }
      }
      if (IndexedSeq2)
        Repeat2.__proto__ = IndexedSeq2;
      Repeat2.prototype = Object.create(IndexedSeq2 && IndexedSeq2.prototype);
      Repeat2.prototype.constructor = Repeat2;
      Repeat2.prototype.toString = function toString5() {
        if (this.size === 0) {
          return "Repeat []";
        }
        return "Repeat [ " + this._value + " " + this.size + " times ]";
      };
      Repeat2.prototype.get = function get11(index, notSetValue) {
        return this.has(index) ? this._value : notSetValue;
      };
      Repeat2.prototype.includes = function includes3(searchValue) {
        return is(this._value, searchValue);
      };
      Repeat2.prototype.slice = function slice3(begin, end) {
        var size = this.size;
        return wholeSlice(begin, end, size) ? this : new Repeat2(
          this._value,
          resolveEnd(end, size) - resolveBegin(begin, size)
        );
      };
      Repeat2.prototype.reverse = function reverse3() {
        return this;
      };
      Repeat2.prototype.indexOf = function indexOf2(searchValue) {
        if (is(this._value, searchValue)) {
          return 0;
        }
        return -1;
      };
      Repeat2.prototype.lastIndexOf = function lastIndexOf2(searchValue) {
        if (is(this._value, searchValue)) {
          return this.size;
        }
        return -1;
      };
      Repeat2.prototype.__iterate = function __iterate2(fn, reverse3) {
        var size = this.size;
        var i = 0;
        while (i !== size) {
          if (fn(this._value, reverse3 ? size - ++i : i++, this) === false) {
            break;
          }
        }
        return i;
      };
      Repeat2.prototype.__iterator = function __iterator2(type, reverse3) {
        var this$1$1 = this;
        var size = this.size;
        var i = 0;
        return new Iterator(
          function() {
            return i === size ? iteratorDone() : iteratorValue(type, reverse3 ? size - ++i : i++, this$1$1._value);
          }
        );
      };
      Repeat2.prototype.equals = function equals3(other) {
        return other instanceof Repeat2 ? is(this._value, other._value) : deepEqual(other);
      };
      return Repeat2;
    }(IndexedSeq);
    version = "4.3.4";
    Immutable = {
      version,
      Collection,
      // Note: Iterable is deprecated
      Iterable: Collection,
      Seq,
      Map,
      OrderedMap,
      List,
      Stack,
      Set,
      OrderedSet,
      PairSorting,
      Record,
      Range,
      Repeat,
      is,
      fromJS,
      hash,
      isImmutable,
      isCollection,
      isKeyed,
      isIndexed,
      isAssociative,
      isOrdered,
      isValueObject,
      isPlainObject,
      isSeq,
      isList,
      isMap,
      isOrderedMap,
      isStack,
      isSet,
      isOrderedSet,
      isRecord,
      get,
      getIn: getIn$1,
      has,
      hasIn: hasIn$1,
      merge,
      mergeDeep: mergeDeep$1,
      mergeWith,
      mergeDeepWith: mergeDeepWith$1,
      remove,
      removeIn,
      set,
      setIn: setIn$1,
      update: update$1,
      updateIn: updateIn$1
    };
    Iterable = Collection;
    immutable_es_default = Immutable;
  }
});

// node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.js
var require_react_draft_wysiwyg = __commonJS({
  "node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.js"(exports, module) {
    !function(t, e) {
      "object" == typeof exports && "object" == typeof module ? module.exports = e(require_react(), require_Draft(), (init_immutable_es(), __toCommonJS(immutable_es_exports))) : "function" == typeof define && define.amd ? define(["react", "draft-js", "immutable"], e) : "object" == typeof exports ? exports.reactDraftWysiwyg = e(require_react(), require_Draft(), (init_immutable_es(), __toCommonJS(immutable_es_exports))) : t.reactDraftWysiwyg = e(t.react, t["draft-js"], t.immutable);
    }(window, function(n, o, r) {
      return a = {}, i.m = c = [function(t, e, n2) {
        t.exports = n2(10)();
      }, function(t, e) {
        t.exports = n;
      }, function(t, e, n2) {
        var o2;
        !function() {
          "use strict";
          var c2 = {}.hasOwnProperty;
          function a2() {
            for (var t2 = [], e2 = 0; e2 < arguments.length; e2++) {
              var n3 = arguments[e2];
              if (n3) {
                var o3 = typeof n3;
                if ("string" == o3 || "number" == o3)
                  t2.push(n3);
                else if (Array.isArray(n3) && n3.length) {
                  var r2 = a2.apply(null, n3);
                  r2 && t2.push(r2);
                } else if ("object" == o3)
                  for (var i2 in n3)
                    c2.call(n3, i2) && n3[i2] && t2.push(i2);
              }
            }
            return t2.join(" ");
          }
          t.exports ? (a2.default = a2, t.exports = a2) : void 0 === (o2 = (function() {
            return a2;
          }).apply(e, [])) || (t.exports = o2);
        }();
      }, function(t, e) {
        t.exports = o;
      }, function(t, e, n2) {
        function r2(t2) {
          if (a2[t2])
            return a2[t2].exports;
          var e2 = a2[t2] = { i: t2, l: false, exports: {} };
          return c2[t2].call(e2.exports, e2, e2.exports, r2), e2.l = true, e2.exports;
        }
        var o2, i2, c2, a2;
        window, t.exports = (o2 = n2(3), i2 = n2(5), a2 = {}, r2.m = c2 = [function(t2, e2) {
          t2.exports = o2;
        }, function(t2, e2) {
          t2.exports = i2;
        }, function(t2, e2, n3) {
          t2.exports = n3(3);
        }, function(t2, e2, n3) {
          "use strict";
          n3.r(e2);
          var M = n3(0), i3 = n3(1);
          function j(t3) {
            var e3 = t3.getSelection(), n4 = t3.getCurrentContent(), o4 = e3.getStartKey(), r4 = e3.getEndKey(), i4 = n4.getBlockMap();
            return i4.toSeq().skipUntil(function(t4, e4) {
              return e4 === o4;
            }).takeUntil(function(t4, e4) {
              return e4 === r4;
            }).concat([[r4, i4.get(r4)]]);
          }
          function u(t3) {
            return j(t3).toList();
          }
          function l(t3) {
            if (t3)
              return u(t3).get(0);
          }
          function o3(t3) {
            if (t3) {
              var n4 = l(t3), e3 = t3.getCurrentContent().getBlockMap().toSeq().toList(), o4 = 0;
              if (e3.forEach(function(t4, e4) {
                t4.get("key") === n4.get("key") && (o4 = e4 - 1);
              }), -1 < o4)
                return e3.get(o4);
            }
          }
          function r3(t3) {
            return t3 ? t3.getCurrentContent().getBlockMap().toList() : new i3.List();
          }
          function c3(t3) {
            var e3 = u(t3);
            if (!e3.some(function(t4) {
              return t4.type !== e3.get(0).type;
            }))
              return e3.get(0).type;
          }
          function a3(t3) {
            var e3 = M.RichUtils.tryToRemoveBlockStyle(t3);
            return e3 ? M.EditorState.push(t3, e3, "change-block-type") : t3;
          }
          function s(t3) {
            var e3 = "", n4 = t3.getSelection(), o4 = n4.getAnchorOffset(), r4 = n4.getFocusOffset(), i4 = u(t3);
            if (0 < i4.size) {
              if (n4.getIsBackward()) {
                var c4 = o4;
                o4 = r4, r4 = c4;
              }
              for (var a4 = 0; a4 < i4.size; a4 += 1) {
                var l2 = 0 === a4 ? o4 : 0, s2 = a4 === i4.size - 1 ? r4 : i4.get(a4).getText().length;
                e3 += i4.get(a4).getText().slice(l2, s2);
              }
            }
            return e3;
          }
          function p(t3) {
            var e3 = t3.getCurrentContent(), n4 = t3.getSelection(), o4 = M.Modifier.removeRange(e3, n4, "forward"), r4 = o4.getSelectionAfter(), i4 = o4.getBlockForKey(r4.getStartKey());
            return o4 = M.Modifier.insertText(o4, r4, "\n", i4.getInlineStyleAt(r4.getStartOffset()), null), M.EditorState.push(t3, o4, "insert-fragment");
          }
          function d(t3) {
            var e3 = M.Modifier.splitBlock(t3.getCurrentContent(), t3.getSelection());
            return a3(M.EditorState.push(t3, e3, "split-block"));
          }
          function f(t3) {
            var e3 = t3.getCurrentContent().getBlockMap().toList(), n4 = t3.getSelection().merge({ anchorKey: e3.first().get("key"), anchorOffset: 0, focusKey: e3.last().get("key"), focusOffset: e3.last().getLength() }), o4 = M.Modifier.removeRange(t3.getCurrentContent(), n4, "forward");
            return M.EditorState.push(t3, o4, "remove-range");
          }
          function y(t3, e3) {
            var n4 = M.Modifier.setBlockData(t3.getCurrentContent(), t3.getSelection(), e3);
            return M.EditorState.push(t3, n4, "change-block-data");
          }
          function m(t3) {
            var o4 = new i3.Map({}), e3 = u(t3);
            if (e3 && 0 < e3.size)
              for (var n4 = function(t4) {
                var n5 = e3.get(t4).getData();
                if (!n5 || 0 === n5.size)
                  return o4 = o4.clear(), "break";
                if (0 === t4)
                  o4 = n5;
                else if (o4.forEach(function(t5, e4) {
                  n5.get(e4) && n5.get(e4) === t5 || (o4 = o4.delete(e4));
                }), 0 === o4.size)
                  return o4 = o4.clear(), "break";
              }, r4 = 0; r4 < e3.size && "break" !== n4(r4); r4 += 1)
                ;
            return o4;
          }
          var g = Object(i3.Map)({ code: { element: "pre" } }), b = M.DefaultDraftBlockRenderMap.merge(g);
          function h(t3) {
            if (t3) {
              var e3 = t3.getType();
              return "unordered-list-item" === e3 || "ordered-list-item" === e3;
            }
            return false;
          }
          function v(t3, e3, n4) {
            var o4, r4 = t3.getSelection();
            o4 = r4.getIsBackward() ? r4.getFocusKey() : r4.getAnchorKey();
            var i4 = t3.getCurrentContent(), c4 = i4.getBlockForKey(o4), a4 = c4.getType();
            if ("unordered-list-item" !== a4 && "ordered-list-item" !== a4)
              return t3;
            var l2 = i4.getBlockBefore(o4);
            if (!l2)
              return t3;
            if (l2.getType() !== a4)
              return t3;
            var s2 = c4.getDepth();
            if (1 === e3 && s2 === n4)
              return t3;
            var u2, p2, d2, f2, y2, m2, g2, b2 = Math.min(l2.getDepth() + 1, n4), h2 = (p2 = e3, d2 = b2, f2 = (u2 = t3).getSelection(), y2 = u2.getCurrentContent(), m2 = y2.getBlockMap(), g2 = j(u2).map(function(t4) {
              var e4 = t4.getDepth() + p2;
              return e4 = Math.max(0, Math.min(e4, d2)), t4.set("depth", e4);
            }), m2 = m2.merge(g2), y2.merge({ blockMap: m2, selectionBefore: f2, selectionAfter: f2 }));
            return M.EditorState.push(t3, h2, "adjust-depth");
          }
          function N(t3, e3) {
            var n4;
            return 13 === (n4 = e3).which && (n4.getModifierState("Shift") || n4.getModifierState("Alt") || n4.getModifierState("Control")) ? t3.getSelection().isCollapsed() ? M.RichUtils.insertSoftNewline(t3) : p(t3) : function(t4) {
              var e4 = t4.getSelection();
              if (e4.isCollapsed()) {
                var n5 = t4.getCurrentContent(), o4 = e4.getStartKey(), r4 = n5.getBlockForKey(o4);
                if (!h(r4) && "unstyled" !== r4.getType() && r4.getLength() === e4.getStartOffset())
                  return d(t4);
                if (h(r4) && 0 === r4.getLength()) {
                  var i4 = r4.getDepth();
                  if (0 === i4)
                    return a3(t4);
                  if (0 < i4)
                    return v(t4, -1, i4);
                }
              }
            }(t3);
          }
          function E(e3, t3) {
            var n4 = Object.keys(e3);
            if (Object.getOwnPropertySymbols) {
              var o4 = Object.getOwnPropertySymbols(e3);
              t3 && (o4 = o4.filter(function(t4) {
                return Object.getOwnPropertyDescriptor(e3, t4).enumerable;
              })), n4.push.apply(n4, o4);
            }
            return n4;
          }
          function S(t3, e3, n4) {
            return e3 in t3 ? Object.defineProperty(t3, e3, { value: n4, enumerable: true, configurable: true, writable: true }) : t3[e3] = n4, t3;
          }
          function w(t3) {
            return (w = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t4) {
              return typeof t4;
            } : function(t4) {
              return t4 && "function" == typeof Symbol && t4.constructor === Symbol && t4 !== Symbol.prototype ? "symbol" : typeof t4;
            })(t3);
          }
          function C(t3) {
            var e3 = t3.getSelection();
            if (e3.isCollapsed()) {
              var n4 = {}, o4 = t3.getCurrentInlineStyle().toList().toJS();
              if (o4)
                return ["BOLD", "ITALIC", "UNDERLINE", "STRIKETHROUGH", "CODE", "SUPERSCRIPT", "SUBSCRIPT"].forEach(function(t4) {
                  n4[t4] = 0 <= o4.indexOf(t4);
                }), n4;
            }
            var c4 = e3.getStartOffset(), a4 = e3.getEndOffset(), l2 = u(t3);
            if (0 < l2.size) {
              var r4 = function() {
                for (var n5 = { BOLD: true, ITALIC: true, UNDERLINE: true, STRIKETHROUGH: true, CODE: true, SUPERSCRIPT: true, SUBSCRIPT: true }, o5 = 0; o5 < l2.size; o5 += 1) {
                  var t4 = 0 === o5 ? c4 : 0, e4 = o5 === l2.size - 1 ? a4 : l2.get(o5).getText().length;
                  t4 === e4 && 0 === t4 ? (t4 = 1, e4 = 2) : t4 === e4 && --t4;
                  for (var r5 = function(t5) {
                    var e5 = l2.get(o5).getInlineStyleAt(t5);
                    ["BOLD", "ITALIC", "UNDERLINE", "STRIKETHROUGH", "CODE", "SUPERSCRIPT", "SUBSCRIPT"].forEach(function(t6) {
                      n5[t6] = n5[t6] && e5.get(t6) === t6;
                    });
                  }, i4 = t4; i4 < e4; i4 += 1)
                    r5(i4);
                }
                return { v: n5 };
              }();
              if ("object" === w(r4))
                return r4.v;
            }
            return {};
          }
          function L(t3) {
            var e3, n4 = t3.getSelection(), o4 = n4.getStartOffset(), r4 = n4.getEndOffset();
            o4 === r4 && 0 === o4 ? r4 = 1 : o4 === r4 && --o4;
            for (var i4 = l(t3), c4 = o4; c4 < r4; c4 += 1) {
              var a4 = i4.getEntityAt(c4);
              if (!a4) {
                e3 = void 0;
                break;
              }
              if (c4 === o4)
                e3 = a4;
              else if (e3 !== a4) {
                e3 = void 0;
                break;
              }
            }
            return e3;
          }
          function D(t3, e3) {
            var n4, o4 = l(t3);
            return o4.findEntityRanges(function(t4) {
              return t4.get("entity") === e3;
            }, function(t4, e4) {
              n4 = { start: t4, end: e4, text: o4.get("text").slice(t4, e4) };
            }), n4;
          }
          function k(t3, e3, n4) {
            x[t3]["".concat(t3.toLowerCase(), "-").concat(n4)] = S({}, "".concat(e3), n4);
          }
          function O() {
            return function(e3) {
              for (var t3 = 1; t3 < arguments.length; t3++) {
                var n4 = null != arguments[t3] ? arguments[t3] : {};
                t3 % 2 ? E(Object(n4), true).forEach(function(t4) {
                  S(e3, t4, n4[t4]);
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(n4)) : E(Object(n4)).forEach(function(t4) {
                  Object.defineProperty(e3, t4, Object.getOwnPropertyDescriptor(n4, t4));
                });
              }
              return e3;
            }({}, x.color, {}, x.bgcolor, {}, x.fontSize, {}, x.fontFamily, { CODE: x.CODE, SUPERSCRIPT: x.SUPERSCRIPT, SUBSCRIPT: x.SUBSCRIPT });
          }
          var x = { color: {}, bgcolor: {}, fontSize: {}, fontFamily: {}, CODE: { fontFamily: "monospace", wordWrap: "break-word", background: "#f1f1f1", borderRadius: 3, padding: "1px 3px" }, SUPERSCRIPT: { fontSize: 11, position: "relative", top: -8, display: "inline-flex" }, SUBSCRIPT: { fontSize: 11, position: "relative", bottom: -8, display: "inline-flex" } };
          function I(t3, e3, n4) {
            var o4 = t3.getSelection(), r4 = Object.keys(x[e3]).reduce(function(t4, e4) {
              return M.Modifier.removeInlineStyle(t4, o4, e4);
            }, t3.getCurrentContent()), i4 = M.EditorState.push(t3, r4, "changeinline-style"), c4 = t3.getCurrentInlineStyle();
            if (o4.isCollapsed() && (i4 = c4.reduce(function(t4, e4) {
              return M.RichUtils.toggleInlineStyle(t4, e4);
            }, i4)), "SUPERSCRIPT" === e3 || "SUBSCRIPT" == e3)
              c4.has(n4) || (i4 = M.RichUtils.toggleInlineStyle(i4, n4));
            else {
              var a4 = "bgcolor" === e3 ? "backgroundColor" : e3;
              c4.has("".concat(a4, "-").concat(n4)) || (i4 = M.RichUtils.toggleInlineStyle(i4, "".concat(e3.toLowerCase(), "-").concat(n4)), k(e3, a4, n4));
            }
            return i4;
          }
          function T(t3) {
            t3 && t3.getCurrentContent().getBlockMap().map(function(t4) {
              return t4.get("characterList");
            }).toList().flatten().forEach(function(t4) {
              t4 && 0 === t4.indexOf("color-") ? k("color", "color", t4.substr(6)) : t4 && 0 === t4.indexOf("bgcolor-") ? k("bgcolor", "backgroundColor", t4.substr(8)) : t4 && 0 === t4.indexOf("fontsize-") ? k("fontSize", "fontSize", +t4.substr(9)) : t4 && 0 === t4.indexOf("fontfamily-") && k("fontFamily", "fontFamily", t4.substr(11));
            });
          }
          function A(t3, e3, n4) {
            var o4 = t3.getInlineStyleAt(n4).toList().filter(function(t4) {
              return t4.startsWith(e3.toLowerCase());
            });
            if (o4 && 0 < o4.size)
              return o4.get(0);
          }
          function z(o4, s2) {
            if (o4 && s2 && 0 < s2.length) {
              var t3 = function() {
                var t4 = o4.getSelection(), i4 = {};
                if (t4.isCollapsed())
                  return s2.forEach(function(t5) {
                    i4[t5] = function(t6, e4) {
                      var n5 = t6.getCurrentInlineStyle().toList().filter(function(t7) {
                        return t7.startsWith(e4.toLowerCase());
                      });
                      if (n5 && 0 < n5.size)
                        return n5.get(0);
                    }(o4, t5);
                  }), { v: i4 };
                var c4 = t4.getStartOffset(), a4 = t4.getEndOffset(), l2 = u(o4);
                if (0 < l2.size) {
                  for (var e3 = function(n5) {
                    var t5 = 0 === n5 ? c4 : 0, e4 = n5 === l2.size - 1 ? a4 : l2.get(n5).getText().length;
                    t5 === e4 && 0 === t5 ? (t5 = 1, e4 = 2) : t5 === e4 && --t5;
                    for (var o5 = function(e5) {
                      e5 === t5 ? s2.forEach(function(t6) {
                        i4[t6] = A(l2.get(n5), t6, e5);
                      }) : s2.forEach(function(t6) {
                        i4[t6] && i4[t6] !== A(l2.get(n5), t6, e5) && (i4[t6] = void 0);
                      });
                    }, r4 = t5; r4 < e4; r4 += 1)
                      o5(r4);
                  }, n4 = 0; n4 < l2.size; n4 += 1)
                    e3(n4);
                  return { v: i4 };
                }
              }();
              if ("object" === w(t3))
                return t3.v;
            }
            return {};
          }
          function _(e3) {
            var t3 = e3.getCurrentInlineStyle(), n4 = e3.getCurrentContent();
            return t3.forEach(function(t4) {
              n4 = M.Modifier.removeInlineStyle(n4, e3.getSelection(), t4);
            }), M.EditorState.push(e3, n4, "change-inline-style");
          }
          n3.d(e2, "isListBlock", function() {
            return h;
          }), n3.d(e2, "changeDepth", function() {
            return v;
          }), n3.d(e2, "handleNewLine", function() {
            return N;
          }), n3.d(e2, "getEntityRange", function() {
            return D;
          }), n3.d(e2, "getCustomStyleMap", function() {
            return O;
          }), n3.d(e2, "toggleCustomInlineStyle", function() {
            return I;
          }), n3.d(e2, "getSelectionEntity", function() {
            return L;
          }), n3.d(e2, "extractInlineStyle", function() {
            return T;
          }), n3.d(e2, "removeAllInlineStyles", function() {
            return _;
          }), n3.d(e2, "getSelectionInlineStyle", function() {
            return C;
          }), n3.d(e2, "getSelectionCustomInlineStyle", function() {
            return z;
          }), n3.d(e2, "getSelectedBlocksMap", function() {
            return j;
          }), n3.d(e2, "getSelectedBlocksList", function() {
            return u;
          }), n3.d(e2, "getSelectedBlock", function() {
            return l;
          }), n3.d(e2, "getBlockBeforeSelectedBlock", function() {
            return o3;
          }), n3.d(e2, "getAllBlocks", function() {
            return r3;
          }), n3.d(e2, "getSelectedBlocksType", function() {
            return c3;
          }), n3.d(e2, "removeSelectedBlocksStyle", function() {
            return a3;
          }), n3.d(e2, "getSelectionText", function() {
            return s;
          }), n3.d(e2, "addLineBreakRemovingSelection", function() {
            return p;
          }), n3.d(e2, "insertNewUnstyledBlock", function() {
            return d;
          }), n3.d(e2, "clearEditorContent", function() {
            return f;
          }), n3.d(e2, "setBlockData", function() {
            return y;
          }), n3.d(e2, "getSelectedBlocksMetadata", function() {
            return m;
          }), n3.d(e2, "blockRenderMap", function() {
            return b;
          });
        }], r2.c = a2, r2.d = function(t2, e2, n3) {
          r2.o(t2, e2) || Object.defineProperty(t2, e2, { enumerable: true, get: n3 });
        }, r2.r = function(t2) {
          "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t2, "__esModule", { value: true });
        }, r2.t = function(e2, t2) {
          if (1 & t2 && (e2 = r2(e2)), 8 & t2)
            return e2;
          if (4 & t2 && "object" == typeof e2 && e2 && e2.__esModule)
            return e2;
          var n3 = /* @__PURE__ */ Object.create(null);
          if (r2.r(n3), Object.defineProperty(n3, "default", { enumerable: true, value: e2 }), 2 & t2 && "string" != typeof e2)
            for (var o3 in e2)
              r2.d(n3, o3, (function(t3) {
                return e2[t3];
              }).bind(null, o3));
          return n3;
        }, r2.n = function(t2) {
          var e2 = t2 && t2.__esModule ? function() {
            return t2.default;
          } : function() {
            return t2;
          };
          return r2.d(e2, "a", e2), e2;
        }, r2.o = function(t2, e2) {
          return Object.prototype.hasOwnProperty.call(t2, e2);
        }, r2.p = "", r2(r2.s = 2));
      }, function(t, e) {
        t.exports = r;
      }, function(t, e, n2) {
        function r2(t2) {
          if (a2[t2])
            return a2[t2].exports;
          var e2 = a2[t2] = { i: t2, l: false, exports: {} };
          return c2[t2].call(e2.exports, e2, e2.exports, r2), e2.l = true, e2.exports;
        }
        var o2, i2, c2, a2;
        window, t.exports = (o2 = n2(5), i2 = n2(3), a2 = {}, r2.m = c2 = [function(t2, e2) {
          t2.exports = o2;
        }, function(t2, e2) {
          t2.exports = i2;
        }, function(t2, e2, n3) {
          t2.exports = n3(3);
        }, function(t2, e2, n3) {
          "use strict";
          n3.r(e2);
          var j = n3(1), s = n3(0), v = function(t3, e3, n4) {
            var o4, r3 = t3.textContent;
            return "" === r3.trim() ? { chunk: (o4 = n4, { text: " ", inlines: [new s.OrderedSet()], entities: [o4], blocks: [] }) } : { chunk: { text: r3, inlines: Array(r3.length).fill(e3), entities: Array(r3.length).fill(n4), blocks: [] } };
          }, N = function() {
            return { text: "\n", inlines: [new s.OrderedSet()], entities: new Array(1), blocks: [] };
          }, E = function() {
            return { text: "", inlines: [], entities: [], blocks: [] };
          }, S = function(t3, e3) {
            return { text: "", inlines: [], entities: [], blocks: [{ type: t3, depth: 0, data: e3 || new s.Map({}) }] };
          }, w = function(t3, e3, n4) {
            return { text: "\r", inlines: [], entities: [], blocks: [{ type: t3, depth: Math.max(0, Math.min(4, e3)), data: n4 || new s.Map({}) }] };
          }, C = function(t3) {
            return { text: "\r ", inlines: [new s.OrderedSet()], entities: [t3], blocks: [{ type: "atomic", depth: 0, data: new s.Map({}) }] };
          }, L = function(t3, e3) {
            return { text: t3.text + e3.text, inlines: t3.inlines.concat(e3.inlines), entities: t3.entities.concat(e3.entities), blocks: t3.blocks.concat(e3.blocks) };
          }, D = new s.Map({ "header-one": { element: "h1" }, "header-two": { element: "h2" }, "header-three": { element: "h3" }, "header-four": { element: "h4" }, "header-five": { element: "h5" }, "header-six": { element: "h6" }, "unordered-list-item": { element: "li", wrapper: "ul" }, "ordered-list-item": { element: "li", wrapper: "ol" }, blockquote: { element: "blockquote" }, code: { element: "pre" }, atomic: { element: "figure" }, unstyled: { element: "p", aliasedElements: ["div"] } }), k = { code: "CODE", del: "STRIKETHROUGH", em: "ITALIC", strong: "BOLD", ins: "UNDERLINE", sub: "SUBSCRIPT", sup: "SUPERSCRIPT" };
          function O(t3) {
            return t3.style.textAlign ? new s.Map({ "text-align": t3.style.textAlign }) : t3.style.marginLeft ? new s.Map({ "margin-left": t3.style.marginLeft }) : void 0;
          }
          var x = function(t3) {
            var e3 = void 0;
            if (t3 instanceof HTMLAnchorElement) {
              var n4 = {};
              e3 = t3.dataset && void 0 !== t3.dataset.mention ? (n4.url = t3.href, n4.text = t3.innerHTML, n4.value = t3.dataset.value, j.Entity.__create("MENTION", "IMMUTABLE", n4)) : (n4.url = t3.getAttribute && t3.getAttribute("href") || t3.href, n4.title = t3.innerHTML, n4.targetOption = t3.target, j.Entity.__create("LINK", "MUTABLE", n4));
            }
            return e3;
          };
          n3.d(e2, "default", function() {
            return o3;
          });
          var u = " ", p = new RegExp("&nbsp;", "g"), I = true;
          function o3(t3, e3) {
            var n4, o4, r3, i3 = (n4 = e3, o4 = t3.trim().replace(p, u), (r3 = function(t4) {
              var e4, n5 = null;
              return document.implementation && document.implementation.createHTMLDocument && ((e4 = document.implementation.createHTMLDocument("foo")).documentElement.innerHTML = t4, n5 = e4.getElementsByTagName("body")[0]), n5;
            }(o4)) ? (I = true, { chunk: function t4(e4, n5, o5, r4, i4, c4) {
              var a4 = e4.nodeName.toLowerCase();
              if (c4) {
                var l2 = c4(a4, e4);
                if (l2) {
                  var s2 = j.Entity.__create(l2.type, l2.mutability, l2.data || {});
                  return { chunk: C(s2) };
                }
              }
              if ("#text" === a4 && "\n" !== e4.textContent)
                return v(e4, n5, i4);
              if ("br" === a4)
                return { chunk: N() };
              if ("img" === a4 && e4 instanceof HTMLImageElement) {
                var u2 = {};
                u2.src = e4.getAttribute && e4.getAttribute("src") || e4.src, u2.alt = e4.alt, u2.height = e4.style.height, u2.width = e4.style.width, e4.style.float && (u2.alignment = e4.style.float);
                var p2 = j.Entity.__create("IMAGE", "MUTABLE", u2);
                return { chunk: C(p2) };
              }
              if ("video" === a4 && e4 instanceof HTMLVideoElement) {
                var d = {};
                d.src = e4.getAttribute && e4.getAttribute("src") || e4.src, d.alt = e4.alt, d.height = e4.style.height, d.width = e4.style.width, e4.style.float && (d.alignment = e4.style.float);
                var f = j.Entity.__create("VIDEO", "MUTABLE", d);
                return { chunk: C(f) };
              }
              if ("iframe" === a4 && e4 instanceof HTMLIFrameElement) {
                var y = {};
                y.src = e4.getAttribute && e4.getAttribute("src") || e4.src, y.height = e4.height, y.width = e4.width;
                var m = j.Entity.__create("EMBEDDED_LINK", "MUTABLE", y);
                return { chunk: C(m) };
              }
              var g, b = function(e5, n6) {
                var t5 = D.filter(function(t6) {
                  return t6.element === e5 && (!t6.wrapper || t6.wrapper === n6) || t6.wrapper === e5 || t6.aliasedElements && -1 < t6.aliasedElements.indexOf(e5);
                }).keySeq().toSet().toArray();
                if (1 === t5.length)
                  return t5[0];
              }(a4, r4);
              b && ("ul" === a4 || "ol" === a4 ? (r4 = a4, o5 += 1) : ("unordered-list-item" !== b && "ordered-list-item" !== b && (r4 = "", o5 = -1), I ? (g = S(b, O(e4)), I = false) : g = w(b, o5, O(e4)))), g = g || E(), n5 = function(t5, e5, n6) {
                var o6, r5 = k[t5];
                if (r5)
                  o6 = n6.add(r5).toOrderedSet();
                else if (e5 instanceof HTMLElement) {
                  var l3 = e5;
                  o6 = (o6 = n6).withMutations(function(t6) {
                    var e6 = l3.style.color, n7 = l3.style.backgroundColor, o7 = l3.style.fontSize, r6 = l3.style.fontFamily.replace(/^"|"$/g, ""), i5 = l3.style.fontWeight, c5 = l3.style.textDecoration, a5 = l3.style.fontStyle;
                    e6 && t6.add("color-".concat(e6.replace(/ /g, ""))), n7 && t6.add("bgcolor-".concat(n7.replace(/ /g, ""))), o7 && t6.add("fontsize-".concat(o7.replace(/px$/g, ""))), r6 && t6.add("fontfamily-".concat(r6)), "bold" === i5 && t6.add(k.strong), "underline" === c5 && t6.add(k.ins), "italic" === a5 && t6.add(k.em);
                  }).toOrderedSet();
                }
                return o6;
              }(a4, e4, n5);
              for (var h = e4.firstChild; h; ) {
                var M = t4(h, n5, o5, r4, x(h) || i4, c4).chunk;
                g = L(g, M), h = h.nextSibling;
              }
              return { chunk: g };
            }(r3, new s.OrderedSet(), -1, "", void 0, n4).chunk }) : null);
            if (i3) {
              var c3 = i3.chunk, a3 = new s.OrderedMap({});
              c3.entities && c3.entities.forEach(function(t4) {
                t4 && (a3 = a3.set(t4, j.Entity.__get(t4)));
              });
              var l = 0;
              return { contentBlocks: c3.text.split("\r").map(function(t4, e4) {
                var n5 = l + t4.length, o5 = c3 && c3.inlines.slice(l, n5), r4 = c3 && c3.entities.slice(l, n5), i4 = new s.List(o5.map(function(t5, e5) {
                  var n6 = { style: t5, entity: null };
                  return r4[e5] && (n6.entity = r4[e5]), j.CharacterMetadata.create(n6);
                }));
                return l = n5, new j.ContentBlock({ key: Object(j.genKey)(), type: c3 && c3.blocks[e4] && c3.blocks[e4].type || "unstyled", depth: c3 && c3.blocks[e4] && c3.blocks[e4].depth, data: c3 && c3.blocks[e4] && c3.blocks[e4].data || new s.Map({}), text: t4, characterList: i4 });
              }), entityMap: a3 };
            }
            return null;
          }
        }], r2.c = a2, r2.d = function(t2, e2, n3) {
          r2.o(t2, e2) || Object.defineProperty(t2, e2, { enumerable: true, get: n3 });
        }, r2.r = function(t2) {
          "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t2, "__esModule", { value: true });
        }, r2.t = function(e2, t2) {
          if (1 & t2 && (e2 = r2(e2)), 8 & t2)
            return e2;
          if (4 & t2 && "object" == typeof e2 && e2 && e2.__esModule)
            return e2;
          var n3 = /* @__PURE__ */ Object.create(null);
          if (r2.r(n3), Object.defineProperty(n3, "default", { enumerable: true, value: e2 }), 2 & t2 && "string" != typeof e2)
            for (var o3 in e2)
              r2.d(n3, o3, (function(t3) {
                return e2[t3];
              }).bind(null, o3));
          return n3;
        }, r2.n = function(t2) {
          var e2 = t2 && t2.__esModule ? function() {
            return t2.default;
          } : function() {
            return t2;
          };
          return r2.d(e2, "a", e2), e2;
        }, r2.o = function(t2, e2) {
          return Object.prototype.hasOwnProperty.call(t2, e2);
        }, r2.p = "", r2(r2.s = 2));
      }, function(t, e, l) {
        "use strict";
        function o2(n2) {
          return Array.prototype.slice.call(arguments, 1).forEach(function(e2) {
            e2 && Object.keys(e2).forEach(function(t2) {
              n2[t2] = e2[t2];
            });
          }), n2;
        }
        function s(t2) {
          return Object.prototype.toString.call(t2);
        }
        function u(t2) {
          return "[object Function]" === s(t2);
        }
        function p(t2) {
          return t2.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
        }
        var r2 = { fuzzyLink: true, fuzzyEmail: true, fuzzyIP: false };
        var i2 = { "http:": { validate: function(t2, e2, n2) {
          var o3 = t2.slice(e2);
          return n2.re.http || (n2.re.http = new RegExp("^\\/\\/" + n2.re.src_auth + n2.re.src_host_port_strict + n2.re.src_path, "i")), n2.re.http.test(o3) ? o3.match(n2.re.http)[0].length : 0;
        } }, "https:": "http:", "ftp:": "http:", "//": { validate: function(t2, e2, n2) {
          var o3 = t2.slice(e2);
          return n2.re.no_http || (n2.re.no_http = new RegExp("^" + n2.re.src_auth + "(?:localhost|(?:(?:" + n2.re.src_domain + ")\\.)+" + n2.re.src_domain_root + ")" + n2.re.src_port + n2.re.src_host_terminator + n2.re.src_path, "i")), n2.re.no_http.test(o3) ? 3 <= e2 && ":" === t2[e2 - 3] ? 0 : 3 <= e2 && "/" === t2[e2 - 3] ? 0 : o3.match(n2.re.no_http)[0].length : 0;
        } }, "mailto:": { validate: function(t2, e2, n2) {
          var o3 = t2.slice(e2);
          return n2.re.mailto || (n2.re.mailto = new RegExp("^" + n2.re.src_email_name + "@" + n2.re.src_host_strict, "i")), n2.re.mailto.test(o3) ? o3.match(n2.re.mailto)[0].length : 0;
        } } }, d = "a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]", c2 = "biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф".split("|");
        function f() {
          return function(t2, e2) {
            e2.normalize(t2);
          };
        }
        function a2(r3) {
          var e2 = r3.re = l(21)(r3.__opts__), t2 = r3.__tlds__.slice();
          function n2(t3) {
            return t3.replace("%TLDS%", e2.src_tlds);
          }
          r3.onCompile(), r3.__tlds_replaced__ || t2.push(d), t2.push(e2.src_xn), e2.src_tlds = t2.join("|"), e2.email_fuzzy = RegExp(n2(e2.tpl_email_fuzzy), "i"), e2.link_fuzzy = RegExp(n2(e2.tpl_link_fuzzy), "i"), e2.link_no_ip_fuzzy = RegExp(n2(e2.tpl_link_no_ip_fuzzy), "i"), e2.host_fuzzy_test = RegExp(n2(e2.tpl_host_fuzzy_test), "i");
          var i3 = [];
          function c3(t3, e3) {
            throw new Error('(LinkifyIt) Invalid schema "' + t3 + '": ' + e3);
          }
          r3.__compiled__ = {}, Object.keys(r3.__schemas__).forEach(function(t3) {
            var e3 = r3.__schemas__[t3];
            if (null !== e3) {
              var o4, n3 = { validate: null, link: null };
              if (r3.__compiled__[t3] = n3, "[object Object]" === s(e3))
                return "[object RegExp]" === s(e3.validate) ? n3.validate = (o4 = e3.validate, function(t4, e4) {
                  var n4 = t4.slice(e4);
                  return o4.test(n4) ? n4.match(o4)[0].length : 0;
                }) : u(e3.validate) ? n3.validate = e3.validate : c3(t3, e3), void (u(e3.normalize) ? n3.normalize = e3.normalize : e3.normalize ? c3(t3, e3) : n3.normalize = f());
              if ("[object String]" !== s(e3))
                c3(t3, e3);
              else
                i3.push(t3);
            }
          }), i3.forEach(function(t3) {
            r3.__compiled__[r3.__schemas__[t3]] && (r3.__compiled__[t3].validate = r3.__compiled__[r3.__schemas__[t3]].validate, r3.__compiled__[t3].normalize = r3.__compiled__[r3.__schemas__[t3]].normalize);
          }), r3.__compiled__[""] = { validate: null, normalize: f() };
          var o3, a3 = Object.keys(r3.__compiled__).filter(function(t3) {
            return 0 < t3.length && r3.__compiled__[t3];
          }).map(p).join("|");
          r3.re.schema_test = RegExp("(^|(?!_)(?:[><｜]|" + e2.src_ZPCc + "))(" + a3 + ")", "i"), r3.re.schema_search = RegExp("(^|(?!_)(?:[><｜]|" + e2.src_ZPCc + "))(" + a3 + ")", "ig"), r3.re.pretest = RegExp("(" + r3.re.schema_test.source + ")|(" + r3.re.host_fuzzy_test.source + ")|@", "i"), (o3 = r3).__index__ = -1, o3.__text_cache__ = "";
        }
        function y(t2, e2) {
          var n2 = t2.__index__, o3 = t2.__last_index__, r3 = t2.__text_cache__.slice(n2, o3);
          this.schema = t2.__schema__.toLowerCase(), this.index = n2 + e2, this.lastIndex = o3 + e2, this.raw = r3, this.text = r3, this.url = r3;
        }
        function m(t2, e2) {
          var n2 = new y(t2, e2);
          return t2.__compiled__[n2.schema].normalize(n2, t2), n2;
        }
        function g(t2, e2) {
          if (!(this instanceof g))
            return new g(t2, e2);
          var n2;
          e2 || (n2 = t2, Object.keys(n2 || {}).reduce(function(t3, e3) {
            return t3 || r2.hasOwnProperty(e3);
          }, false) && (e2 = t2, t2 = {})), this.__opts__ = o2({}, r2, e2), this.__index__ = -1, this.__last_index__ = -1, this.__schema__ = "", this.__text_cache__ = "", this.__schemas__ = o2({}, i2, t2), this.__compiled__ = {}, this.__tlds__ = c2, this.__tlds_replaced__ = false, this.re = {}, a2(this);
        }
        g.prototype.add = function(t2, e2) {
          return this.__schemas__[t2] = e2, a2(this), this;
        }, g.prototype.set = function(t2) {
          return this.__opts__ = o2(this.__opts__, t2), this;
        }, g.prototype.test = function(t2) {
          if (this.__text_cache__ = t2, this.__index__ = -1, !t2.length)
            return false;
          var e2, n2, o3, r3, i3, c3, a3, l2;
          if (this.re.schema_test.test(t2)) {
            for ((a3 = this.re.schema_search).lastIndex = 0; null !== (e2 = a3.exec(t2)); )
              if (r3 = this.testSchemaAt(t2, e2[2], a3.lastIndex)) {
                this.__schema__ = e2[2], this.__index__ = e2.index + e2[1].length, this.__last_index__ = e2.index + e2[0].length + r3;
                break;
              }
          }
          return this.__opts__.fuzzyLink && this.__compiled__["http:"] && 0 <= (l2 = t2.search(this.re.host_fuzzy_test)) && (this.__index__ < 0 || l2 < this.__index__) && null !== (n2 = t2.match(this.__opts__.fuzzyIP ? this.re.link_fuzzy : this.re.link_no_ip_fuzzy)) && (i3 = n2.index + n2[1].length, (this.__index__ < 0 || i3 < this.__index__) && (this.__schema__ = "", this.__index__ = i3, this.__last_index__ = n2.index + n2[0].length)), this.__opts__.fuzzyEmail && this.__compiled__["mailto:"] && 0 <= t2.indexOf("@") && null !== (o3 = t2.match(this.re.email_fuzzy)) && (i3 = o3.index + o3[1].length, c3 = o3.index + o3[0].length, (this.__index__ < 0 || i3 < this.__index__ || i3 === this.__index__ && c3 > this.__last_index__) && (this.__schema__ = "mailto:", this.__index__ = i3, this.__last_index__ = c3)), 0 <= this.__index__;
        }, g.prototype.pretest = function(t2) {
          return this.re.pretest.test(t2);
        }, g.prototype.testSchemaAt = function(t2, e2, n2) {
          return this.__compiled__[e2.toLowerCase()] ? this.__compiled__[e2.toLowerCase()].validate(t2, n2, this) : 0;
        }, g.prototype.match = function(t2) {
          var e2 = 0, n2 = [];
          0 <= this.__index__ && this.__text_cache__ === t2 && (n2.push(m(this, e2)), e2 = this.__last_index__);
          for (var o3 = e2 ? t2.slice(e2) : t2; this.test(o3); )
            n2.push(m(this, e2)), o3 = o3.slice(this.__last_index__), e2 += this.__last_index__;
          return n2.length ? n2 : null;
        }, g.prototype.tlds = function(t2, e2) {
          return t2 = Array.isArray(t2) ? t2 : [t2], e2 ? this.__tlds__ = this.__tlds__.concat(t2).sort().filter(function(t3, e3, n2) {
            return t3 !== n2[e3 - 1];
          }).reverse() : (this.__tlds__ = t2.slice(), this.__tlds_replaced__ = true), a2(this), this;
        }, g.prototype.normalize = function(t2) {
          t2.schema || (t2.url = "http://" + t2.url), "mailto:" !== t2.schema || /^mailto:/i.test(t2.url) || (t2.url = "mailto:" + t2.url);
        }, g.prototype.onCompile = function() {
        }, t.exports = g;
      }, function(t, e, n2) {
        t.exports = n2(40);
      }, function(t, e, n2) {
      }, function(t, e, n2) {
        "use strict";
        var a2 = n2(11);
        function o2() {
        }
        function r2() {
        }
        r2.resetWarningCache = o2, t.exports = function() {
          function t2(t3, e3, n4, o3, r3, i2) {
            if (i2 !== a2) {
              var c2 = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
              throw c2.name = "Invariant Violation", c2;
            }
          }
          function e2() {
            return t2;
          }
          var n3 = { array: t2.isRequired = t2, bigint: t2, bool: t2, func: t2, number: t2, object: t2, string: t2, symbol: t2, any: t2, arrayOf: e2, element: t2, elementType: t2, instanceOf: e2, node: t2, objectOf: e2, oneOf: e2, oneOfType: e2, shape: e2, exact: e2, checkPropTypes: r2, resetWarningCache: o2 };
          return n3.PropTypes = n3;
        };
      }, function(t, e, n2) {
        "use strict";
        t.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
      }, function(t, e, n2) {
      }, function(t, e, n2) {
      }, function(t, e, n2) {
      }, function(t, e, n2) {
      }, function(t, e, n2) {
      }, function(t, e, n2) {
      }, function(t, e, n2) {
      }, function(t, e, n2) {
      }, function(t, e, n2) {
      }, function(t, e, o2) {
        "use strict";
        t.exports = function(t2) {
          var e2 = {};
          e2.src_Any = o2(22).source, e2.src_Cc = o2(23).source, e2.src_Z = o2(24).source, e2.src_P = o2(25).source, e2.src_ZPCc = [e2.src_Z, e2.src_P, e2.src_Cc].join("|"), e2.src_ZCc = [e2.src_Z, e2.src_Cc].join("|");
          var n2 = "[><｜]";
          return e2.src_pseudo_letter = "(?:(?![><｜]|" + e2.src_ZPCc + ")" + e2.src_Any + ")", e2.src_ip4 = "(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)", e2.src_auth = "(?:(?:(?!" + e2.src_ZCc + "|[@/\\[\\]()]).)+@)?", e2.src_port = "(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?", e2.src_host_terminator = "(?=$|[><｜]|" + e2.src_ZPCc + ")(?!-|_|:\\d|\\.-|\\.(?!$|" + e2.src_ZPCc + "))", e2.src_path = "(?:[/?#](?:(?!" + e2.src_ZCc + "|" + n2 + `|[()[\\]{}.,"'?!\\-]).|\\[(?:(?!` + e2.src_ZCc + "|\\]).)*\\]|\\((?:(?!" + e2.src_ZCc + "|[)]).)*\\)|\\{(?:(?!" + e2.src_ZCc + '|[}]).)*\\}|\\"(?:(?!' + e2.src_ZCc + `|["]).)+\\"|\\'(?:(?!` + e2.src_ZCc + "|[']).)+\\'|\\'(?=" + e2.src_pseudo_letter + "|[-]).|\\.{2,4}[a-zA-Z0-9%/]|\\.(?!" + e2.src_ZCc + "|[.]).|" + (t2 && t2["---"] ? "\\-(?!--(?:[^-]|$))(?:-*)|" : "\\-+|") + "\\,(?!" + e2.src_ZCc + ").|\\!(?!" + e2.src_ZCc + "|[!]).|\\?(?!" + e2.src_ZCc + "|[?]).)+|\\/)?", e2.src_email_name = '[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]*', e2.src_xn = "xn--[a-z0-9\\-]{1,59}", e2.src_domain_root = "(?:" + e2.src_xn + "|" + e2.src_pseudo_letter + "{1,63})", e2.src_domain = "(?:" + e2.src_xn + "|(?:" + e2.src_pseudo_letter + ")|(?:" + e2.src_pseudo_letter + "(?:-|" + e2.src_pseudo_letter + "){0,61}" + e2.src_pseudo_letter + "))", e2.src_host = "(?:(?:(?:(?:" + e2.src_domain + ")\\.)*" + e2.src_domain + "))", e2.tpl_host_fuzzy = "(?:" + e2.src_ip4 + "|(?:(?:(?:" + e2.src_domain + ")\\.)+(?:%TLDS%)))", e2.tpl_host_no_ip_fuzzy = "(?:(?:(?:" + e2.src_domain + ")\\.)+(?:%TLDS%))", e2.src_host_strict = e2.src_host + e2.src_host_terminator, e2.tpl_host_fuzzy_strict = e2.tpl_host_fuzzy + e2.src_host_terminator, e2.src_host_port_strict = e2.src_host + e2.src_port + e2.src_host_terminator, e2.tpl_host_port_fuzzy_strict = e2.tpl_host_fuzzy + e2.src_port + e2.src_host_terminator, e2.tpl_host_port_no_ip_fuzzy_strict = e2.tpl_host_no_ip_fuzzy + e2.src_port + e2.src_host_terminator, e2.tpl_host_fuzzy_test = "localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:" + e2.src_ZPCc + "|>|$))", e2.tpl_email_fuzzy = '(^|[><｜]|"|\\(|' + e2.src_ZCc + ")(" + e2.src_email_name + "@" + e2.tpl_host_fuzzy_strict + ")", e2.tpl_link_fuzzy = "(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|" + e2.src_ZPCc + "))((?![$+<=>^`|｜])" + e2.tpl_host_port_fuzzy_strict + e2.src_path + ")", e2.tpl_link_no_ip_fuzzy = "(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|" + e2.src_ZPCc + "))((?![$+<=>^`|｜])" + e2.tpl_host_port_no_ip_fuzzy_strict + e2.src_path + ")", e2;
        };
      }, function(t, e) {
        t.exports = /[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
      }, function(t, e) {
        t.exports = /[\0-\x1F\x7F-\x9F]/;
      }, function(t, e) {
        t.exports = /[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/;
      }, function(t, e) {
        t.exports = /[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4E\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDF55-\uDF59]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDF3C-\uDF3E]|\uD806[\uDC3B\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/;
      }, function(t, e, n2) {
      }, function(t, e, n2) {
      }, function(t, e, n2) {
      }, function(t, e, n2) {
      }, function(t, e, n2) {
      }, function(t, e, n2) {
      }, function(t, e, n2) {
      }, function(t, e, n2) {
      }, function(t, e, n2) {
      }, function(t, e, n2) {
      }, function(t, e, n2) {
      }, function(t, e, n2) {
      }, function(t, e, n2) {
      }, function(t, e, n2) {
      }, function(t, e, n2) {
        "use strict";
        n2.r(e), n2.d(e, "Editor", function() {
          return ar;
        });
        var f = n2(1), N = n2.n(f), o2 = n2(0), y = n2.n(o2), E = n2(3), S = n2(4), r2 = n2(2), w = n2.n(r2);
        function i2(t2, e2) {
          for (var n3 = 0; n3 < e2.length; n3++) {
            var o3 = e2[n3];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(t2, o3.key, o3);
          }
        }
        function c2(t2, e2, n3) {
          return e2 && i2(t2.prototype, e2), n3 && i2(t2, n3), Object.defineProperty(t2, "prototype", { writable: false }), t2;
        }
        var a2 = c2(function t2() {
          var n3 = this;
          !function(t3, e2) {
            if (!(t3 instanceof e2))
              throw new TypeError("Cannot call a class as a function");
          }(this, t2), this.callBacks = [], this.suggestionCallback = void 0, this.editorFlag = false, this.suggestionFlag = false, this.closeAllModals = function(e2) {
            n3.callBacks.forEach(function(t3) {
              t3(e2);
            });
          }, this.init = function(t3) {
            var e2 = document.getElementById(t3);
            e2 && e2.addEventListener("click", function() {
              n3.editorFlag = true;
            }), document && (document.addEventListener("click", function() {
              n3.editorFlag ? n3.editorFlag = false : (n3.closeAllModals(), n3.suggestionCallback && n3.suggestionCallback());
            }), document.addEventListener("keydown", function(t4) {
              "Escape" === t4.key && n3.closeAllModals();
            }));
          }, this.onEditorClick = function() {
            n3.closeModals(), !n3.suggestionFlag && n3.suggestionCallback ? n3.suggestionCallback() : n3.suggestionFlag = false;
          }, this.closeModals = function(t3) {
            n3.closeAllModals(t3);
          }, this.registerCallBack = function(t3) {
            n3.callBacks.push(t3);
          }, this.deregisterCallBack = function(e2) {
            n3.callBacks = n3.callBacks.filter(function(t3) {
              return t3 !== e2;
            });
          }, this.setSuggestionCallback = function(t3) {
            n3.suggestionCallback = t3;
          }, this.removeSuggestionCallback = function() {
            n3.suggestionCallback = void 0;
          }, this.onSuggestionClick = function() {
            n3.suggestionFlag = true;
          };
        });
        function l(t2, e2) {
          for (var n3 = 0; n3 < e2.length; n3++) {
            var o3 = e2[n3];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(t2, o3.key, o3);
          }
        }
        function s(t2, e2, n3) {
          return e2 && l(t2.prototype, e2), n3 && l(t2, n3), Object.defineProperty(t2, "prototype", { writable: false }), t2;
        }
        var u, p = s(function t2() {
          var e2 = this;
          !function(t3, e3) {
            if (!(t3 instanceof e3))
              throw new TypeError("Cannot call a class as a function");
          }(this, t2), this.inputFocused = false, this.editorMouseDown = false, this.onEditorMouseDown = function() {
            e2.editorFocused = true;
          }, this.onInputMouseDown = function() {
            e2.inputFocused = true;
          }, this.isEditorBlur = function(t3) {
            return "INPUT" !== t3.target.tagName && "LABEL" !== t3.target.tagName && "TEXTAREA" !== t3.target.tagName || e2.editorFocused ? !("INPUT" === t3.target.tagName && "LABEL" === t3.target.tagName && "TEXTAREA" === t3.target.tagName || e2.inputFocused) && !(e2.editorFocused = false) : !(e2.inputFocused = false);
          }, this.isEditorFocused = function() {
            return !e2.inputFocused || (e2.inputFocused = false);
          }, this.isToolbarFocused = function() {
            return !e2.editorFocused || (e2.editorFocused = false);
          }, this.isInputFocused = function() {
            return e2.inputFocused;
          };
        }), d = [], C = { onKeyDown: function(e2) {
          d.forEach(function(t2) {
            t2(e2);
          });
        }, registerCallBack: function(t2) {
          d.push(t2);
        }, deregisterCallBack: function(e2) {
          d = d.filter(function(t2) {
            return t2 !== e2;
          });
        } }, m = function() {
          u = true;
        }, g = function() {
          u = false;
        }, b = function() {
          return u;
        };
        function L(t2) {
          var e2 = t2.getData() && t2.getData().get("text-align");
          return e2 ? "rdw-".concat(e2, "-aligned-block") : "";
        }
        function h(t2, e2) {
          if (t2)
            for (var n3 in t2)
              !{}.hasOwnProperty.call(t2, n3) || e2(n3, t2[n3]);
        }
        function M(t2, e2) {
          var n3 = false;
          if (t2) {
            for (var o3 in t2)
              if ({}.hasOwnProperty.call(t2, o3) && e2 === o3) {
                n3 = true;
                break;
              }
          }
          return n3;
        }
        function j(t2) {
          t2.stopPropagation();
        }
        function v(t2) {
          return t2[t2.options[0]].icon;
        }
        function D(t2, o3) {
          if (t2 && void 0 === o3)
            return t2;
          var r3 = {};
          return h(t2, function(t3, e2) {
            var n3;
            n3 = e2, "[object Object]" === Object.prototype.toString.call(n3) ? r3[t3] = D(e2, o3[t3]) : r3[t3] = void 0 !== o3[t3] ? o3[t3] : e2;
          }), r3;
        }
        var k = n2(6), O = n2.n(k), x = n2(5);
        n2(9);
        function I(t2) {
          return (I = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t3) {
            return typeof t3;
          } : function(t3) {
            return t3 && "function" == typeof Symbol && t3.constructor === Symbol && t3 !== Symbol.prototype ? "symbol" : typeof t3;
          })(t2);
        }
        function T(t2, e2, n3) {
          return e2 in t2 ? Object.defineProperty(t2, e2, { value: n3, enumerable: true, configurable: true, writable: true }) : t2[e2] = n3, t2;
        }
        function A(t2, e2) {
          for (var n3 = 0; n3 < e2.length; n3++) {
            var o3 = e2[n3];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(t2, o3.key, o3);
          }
        }
        function z(t2, e2) {
          return (z = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t3, e3) {
            return t3.__proto__ = e3, t3;
          })(t2, e2);
        }
        function _(o3) {
          var r3 = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct)
              return false;
            if (Reflect.construct.sham)
              return false;
            if ("function" == typeof Proxy)
              return true;
            try {
              return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
              })), true;
            } catch (t2) {
              return false;
            }
          }();
          return function() {
            var t2, e2 = P(o3);
            if (r3) {
              var n3 = P(this).constructor;
              t2 = Reflect.construct(e2, arguments, n3);
            } else
              t2 = e2.apply(this, arguments);
            return function(t3, e3) {
              {
                if (e3 && ("object" === I(e3) || "function" == typeof e3))
                  return e3;
                if (void 0 !== e3)
                  throw new TypeError("Derived constructors may only return object or undefined");
              }
              return function(t4) {
                if (void 0 !== t4)
                  return t4;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              }(t3);
            }(this, t2);
          };
        }
        function P(t2) {
          return (P = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t3) {
            return t3.__proto__ || Object.getPrototypeOf(t3);
          })(t2);
        }
        var R = function() {
          !function(t3, e3) {
            if ("function" != typeof e3 && null !== e3)
              throw new TypeError("Super expression must either be null or a function");
            t3.prototype = Object.create(e3 && e3.prototype, { constructor: { value: t3, writable: true, configurable: true } }), Object.defineProperty(t3, "prototype", { writable: false }), e3 && z(t3, e3);
          }(i3, f["Component"]);
          var t2, e2, n3, o3 = _(i3);
          function i3() {
            var r3;
            !function(t4, e4) {
              if (!(t4 instanceof e4))
                throw new TypeError("Cannot call a class as a function");
            }(this, i3);
            for (var t3 = arguments.length, e3 = new Array(t3), n4 = 0; n4 < t3; n4++)
              e3[n4] = arguments[n4];
            return (r3 = o3.call.apply(o3, [this].concat(e3))).onClick = function() {
              var t4 = r3.props, e4 = t4.disabled, n5 = t4.onClick, o4 = t4.value;
              e4 || n5(o4);
            }, r3;
          }
          return t2 = i3, (e2 = [{ key: "render", value: function() {
            var t3, e3 = this.props, n4 = e3.children, o4 = e3.className, r3 = e3.activeClassName, i4 = e3.active, c3 = e3.disabled, a3 = e3.title;
            return N.a.createElement("div", { className: w()("rdw-option-wrapper", o4, (T(t3 = {}, "rdw-option-active ".concat(r3), i4), T(t3, "rdw-option-disabled", c3), t3)), onClick: this.onClick, "aria-selected": i4, title: a3 }, n4);
          } }]) && A(t2.prototype, e2), n3 && A(t2, n3), Object.defineProperty(t2, "prototype", { writable: false }), i3;
        }();
        R.propTypes = { onClick: y.a.func.isRequired, children: y.a.any, value: y.a.string, className: y.a.string, activeClassName: y.a.string, active: y.a.bool, disabled: y.a.bool, title: y.a.string }, R.defaultProps = { activeClassName: "" };
        n2(12);
        function U(t2) {
          return (U = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t3) {
            return typeof t3;
          } : function(t3) {
            return t3 && "function" == typeof Symbol && t3.constructor === Symbol && t3 !== Symbol.prototype ? "symbol" : typeof t3;
          })(t2);
        }
        function B(t2, e2) {
          for (var n3 = 0; n3 < e2.length; n3++) {
            var o3 = e2[n3];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(t2, o3.key, o3);
          }
        }
        function F(t2, e2) {
          return (F = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t3, e3) {
            return t3.__proto__ = e3, t3;
          })(t2, e2);
        }
        function Y(o3) {
          var r3 = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct)
              return false;
            if (Reflect.construct.sham)
              return false;
            if ("function" == typeof Proxy)
              return true;
            try {
              return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
              })), true;
            } catch (t2) {
              return false;
            }
          }();
          return function() {
            var t2, e2 = Q(o3);
            if (r3) {
              var n3 = Q(this).constructor;
              t2 = Reflect.construct(e2, arguments, n3);
            } else
              t2 = e2.apply(this, arguments);
            return function(t3, e3) {
              {
                if (e3 && ("object" === U(e3) || "function" == typeof e3))
                  return e3;
                if (void 0 !== e3)
                  throw new TypeError("Derived constructors may only return object or undefined");
              }
              return function(t4) {
                if (void 0 !== t4)
                  return t4;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              }(t3);
            }(this, t2);
          };
        }
        function Q(t2) {
          return (Q = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t3) {
            return t3.__proto__ || Object.getPrototypeOf(t3);
          })(t2);
        }
        var H = function() {
          !function(t3, e3) {
            if ("function" != typeof e3 && null !== e3)
              throw new TypeError("Super expression must either be null or a function");
            t3.prototype = Object.create(e3 && e3.prototype, { constructor: { value: t3, writable: true, configurable: true } }), Object.defineProperty(t3, "prototype", { writable: false }), e3 && F(t3, e3);
          }(i3, f["Component"]);
          var t2, e2, n3, r3 = Y(i3);
          function i3() {
            var o3;
            !function(t4, e4) {
              if (!(t4 instanceof e4))
                throw new TypeError("Cannot call a class as a function");
            }(this, i3);
            for (var t3 = arguments.length, e3 = new Array(t3), n4 = 0; n4 < t3; n4++)
              e3[n4] = arguments[n4];
            return (o3 = r3.call.apply(r3, [this].concat(e3))).state = { highlighted: -1 }, o3.onChange = function(t4) {
              var e4 = o3.props.onChange;
              e4 && e4(t4), o3.toggleExpansion();
            }, o3.setHighlighted = function(t4) {
              o3.setState({ highlighted: t4 });
            }, o3.toggleExpansion = function() {
              var t4 = o3.props, e4 = t4.doExpand, n5 = t4.doCollapse;
              t4.expanded ? n5() : e4();
            }, o3;
          }
          return t2 = i3, (e2 = [{ key: "componentDidUpdate", value: function(t3) {
            var e3 = this.props.expanded;
            t3.expanded && !e3 && this.setState({ highlighted: -1 });
          } }, { key: "render", value: function() {
            var n4 = this, t3 = this.props, e3 = t3.expanded, o3 = t3.children, r4 = t3.className, i4 = t3.optionWrapperClassName, c3 = t3.ariaLabel, a3 = t3.onExpandEvent, l2 = t3.title, s2 = this.state.highlighted, u2 = o3.slice(1, o3.length);
            return N.a.createElement("div", { className: w()("rdw-dropdown-wrapper", r4), "aria-expanded": e3, "aria-label": c3 || "rdw-dropdown" }, N.a.createElement("a", { className: "rdw-dropdown-selectedtext", onClick: a3, title: l2 }, o3[0], N.a.createElement("div", { className: w()({ "rdw-dropdown-carettoclose": e3, "rdw-dropdown-carettoopen": !e3 }) })), e3 ? N.a.createElement("ul", { className: w()("rdw-dropdown-optionwrapper", i4), onClick: j }, N.a.Children.map(u2, function(t4, e4) {
              return t4 && N.a.cloneElement(t4, { onSelect: n4.onChange, highlighted: s2 === e4, setHighlighted: n4.setHighlighted, index: e4 });
            })) : void 0);
          } }]) && B(t2.prototype, e2), n3 && B(t2, n3), Object.defineProperty(t2, "prototype", { writable: false }), i3;
        }();
        H.propTypes = { children: y.a.any, onChange: y.a.func, className: y.a.string, expanded: y.a.bool, doExpand: y.a.func, doCollapse: y.a.func, onExpandEvent: y.a.func, optionWrapperClassName: y.a.string, ariaLabel: y.a.string, title: y.a.string };
        n2(13);
        function Z(t2) {
          return (Z = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t3) {
            return typeof t3;
          } : function(t3) {
            return t3 && "function" == typeof Symbol && t3.constructor === Symbol && t3 !== Symbol.prototype ? "symbol" : typeof t3;
          })(t2);
        }
        function W(t2, e2, n3) {
          return e2 in t2 ? Object.defineProperty(t2, e2, { value: n3, enumerable: true, configurable: true, writable: true }) : t2[e2] = n3, t2;
        }
        function G(t2, e2) {
          for (var n3 = 0; n3 < e2.length; n3++) {
            var o3 = e2[n3];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(t2, o3.key, o3);
          }
        }
        function J(t2, e2) {
          return (J = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t3, e3) {
            return t3.__proto__ = e3, t3;
          })(t2, e2);
        }
        function V(o3) {
          var r3 = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct)
              return false;
            if (Reflect.construct.sham)
              return false;
            if ("function" == typeof Proxy)
              return true;
            try {
              return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
              })), true;
            } catch (t2) {
              return false;
            }
          }();
          return function() {
            var t2, e2 = q(o3);
            if (r3) {
              var n3 = q(this).constructor;
              t2 = Reflect.construct(e2, arguments, n3);
            } else
              t2 = e2.apply(this, arguments);
            return function(t3, e3) {
              {
                if (e3 && ("object" === Z(e3) || "function" == typeof e3))
                  return e3;
                if (void 0 !== e3)
                  throw new TypeError("Derived constructors may only return object or undefined");
              }
              return function(t4) {
                if (void 0 !== t4)
                  return t4;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              }(t3);
            }(this, t2);
          };
        }
        function q(t2) {
          return (q = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t3) {
            return t3.__proto__ || Object.getPrototypeOf(t3);
          })(t2);
        }
        var K = function() {
          !function(t3, e3) {
            if ("function" != typeof e3 && null !== e3)
              throw new TypeError("Super expression must either be null or a function");
            t3.prototype = Object.create(e3 && e3.prototype, { constructor: { value: t3, writable: true, configurable: true } }), Object.defineProperty(t3, "prototype", { writable: false }), e3 && J(t3, e3);
          }(r3, f["Component"]);
          var t2, e2, n3, o3 = V(r3);
          function r3() {
            var i3;
            !function(t4, e4) {
              if (!(t4 instanceof e4))
                throw new TypeError("Cannot call a class as a function");
            }(this, r3);
            for (var t3 = arguments.length, e3 = new Array(t3), n4 = 0; n4 < t3; n4++)
              e3[n4] = arguments[n4];
            return (i3 = o3.call.apply(o3, [this].concat(e3))).onClick = function(t4) {
              var e4 = i3.props, n5 = e4.onSelect, o4 = e4.onClick, r4 = e4.value;
              e4.disabled || (n5 && n5(r4), o4 && (t4.stopPropagation(), o4(r4)));
            }, i3.setHighlighted = function() {
              var t4 = i3.props;
              (0, t4.setHighlighted)(t4.index);
            }, i3.resetHighlighted = function() {
              (0, i3.props.setHighlighted)(-1);
            }, i3;
          }
          return t2 = r3, (e2 = [{ key: "render", value: function() {
            var t3, e3 = this.props, n4 = e3.children, o4 = e3.active, r4 = e3.disabled, i3 = e3.highlighted, c3 = e3.className, a3 = e3.activeClassName, l2 = e3.disabledClassName, s2 = e3.highlightedClassName, u2 = e3.title;
            return N.a.createElement("li", { className: w()("rdw-dropdownoption-default", c3, (W(t3 = {}, "rdw-dropdownoption-active ".concat(a3), o4), W(t3, "rdw-dropdownoption-highlighted ".concat(s2), i3), W(t3, "rdw-dropdownoption-disabled ".concat(l2), r4), t3)), onMouseEnter: this.setHighlighted, onMouseLeave: this.resetHighlighted, onClick: this.onClick, title: u2 }, n4);
          } }]) && G(t2.prototype, e2), n3 && G(t2, n3), Object.defineProperty(t2, "prototype", { writable: false }), r3;
        }();
        K.propTypes = { children: y.a.any, value: y.a.any, onClick: y.a.func, onSelect: y.a.func, setHighlighted: y.a.func, index: y.a.number, disabled: y.a.bool, active: y.a.bool, highlighted: y.a.bool, className: y.a.string, activeClassName: y.a.string, disabledClassName: y.a.string, highlightedClassName: y.a.string, title: y.a.string }, K.defaultProps = { activeClassName: "", disabledClassName: "", highlightedClassName: "" };
        n2(14);
        function X(t2) {
          return (X = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t3) {
            return typeof t3;
          } : function(t3) {
            return t3 && "function" == typeof Symbol && t3.constructor === Symbol && t3 !== Symbol.prototype ? "symbol" : typeof t3;
          })(t2);
        }
        function $(t2, e2) {
          for (var n3 = 0; n3 < e2.length; n3++) {
            var o3 = e2[n3];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(t2, o3.key, o3);
          }
        }
        function tt(t2, e2) {
          return (tt = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t3, e3) {
            return t3.__proto__ = e3, t3;
          })(t2, e2);
        }
        function et(o3) {
          var r3 = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct)
              return false;
            if (Reflect.construct.sham)
              return false;
            if ("function" == typeof Proxy)
              return true;
            try {
              return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
              })), true;
            } catch (t2) {
              return false;
            }
          }();
          return function() {
            var t2, e2 = nt(o3);
            if (r3) {
              var n3 = nt(this).constructor;
              t2 = Reflect.construct(e2, arguments, n3);
            } else
              t2 = e2.apply(this, arguments);
            return function(t3, e3) {
              {
                if (e3 && ("object" === X(e3) || "function" == typeof e3))
                  return e3;
                if (void 0 !== e3)
                  throw new TypeError("Derived constructors may only return object or undefined");
              }
              return function(t4) {
                if (void 0 !== t4)
                  return t4;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              }(t3);
            }(this, t2);
          };
        }
        function nt(t2) {
          return (nt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t3) {
            return t3.__proto__ || Object.getPrototypeOf(t3);
          })(t2);
        }
        var ot = function() {
          !function(t3, e3) {
            if ("function" != typeof e3 && null !== e3)
              throw new TypeError("Super expression must either be null or a function");
            t3.prototype = Object.create(e3 && e3.prototype, { constructor: { value: t3, writable: true, configurable: true } }), Object.defineProperty(t3, "prototype", { writable: false }), e3 && tt(t3, e3);
          }(r3, f["Component"]);
          var t2, e2, n3, o3 = et(r3);
          function r3() {
            return function(t3, e3) {
              if (!(t3 instanceof e3))
                throw new TypeError("Cannot call a class as a function");
            }(this, r3), o3.apply(this, arguments);
          }
          return t2 = r3, (e2 = [{ key: "renderInFlatList", value: function() {
            var t3 = this.props, n4 = t3.config, o4 = t3.currentState, r4 = t3.onChange, i3 = t3.translations;
            return N.a.createElement("div", { className: w()("rdw-inline-wrapper", n4.className), "aria-label": "rdw-inline-control" }, n4.options.map(function(t4, e3) {
              return N.a.createElement(R, { key: e3, value: t4, onClick: r4, className: w()(n4[t4].className), active: true === o4[t4] || "MONOSPACE" === t4 && o4.CODE, title: n4[t4].title || i3["components.controls.inline.".concat(t4)] }, N.a.createElement("img", { alt: "", src: n4[t4].icon }));
            }));
          } }, { key: "renderInDropDown", value: function() {
            var t3 = this.props, n4 = t3.config, e3 = t3.expanded, o4 = t3.doExpand, r4 = t3.onExpandEvent, i3 = t3.doCollapse, c3 = t3.currentState, a3 = t3.onChange, l2 = t3.translations, s2 = n4.className, u2 = n4.dropdownClassName, p2 = n4.title;
            return N.a.createElement(H, { className: w()("rdw-inline-dropdown", s2), optionWrapperClassName: w()(u2), onChange: a3, expanded: e3, doExpand: o4, doCollapse: i3, onExpandEvent: r4, "aria-label": "rdw-inline-control", title: p2 }, N.a.createElement("img", { src: v(n4), alt: "" }), n4.options.map(function(t4, e4) {
              return N.a.createElement(K, { key: e4, value: t4, className: w()("rdw-inline-dropdownoption", n4[t4].className), active: true === c3[t4] || "MONOSPACE" === t4 && c3.CODE, title: n4[t4].title || l2["components.controls.inline.".concat(t4)] }, N.a.createElement("img", { src: n4[t4].icon, alt: "" }));
            }));
          } }, { key: "render", value: function() {
            return this.props.config.inDropdown ? this.renderInDropDown() : this.renderInFlatList();
          } }]) && $(t2.prototype, e2), n3 && $(t2, n3), Object.defineProperty(t2, "prototype", { writable: false }), r3;
        }();
        function rt(t2) {
          return (rt = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t3) {
            return typeof t3;
          } : function(t3) {
            return t3 && "function" == typeof Symbol && t3.constructor === Symbol && t3 !== Symbol.prototype ? "symbol" : typeof t3;
          })(t2);
        }
        function it(t2, e2) {
          for (var n3 = 0; n3 < e2.length; n3++) {
            var o3 = e2[n3];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(t2, o3.key, o3);
          }
        }
        function ct(t2, e2) {
          return (ct = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t3, e3) {
            return t3.__proto__ = e3, t3;
          })(t2, e2);
        }
        function at(o3) {
          var r3 = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct)
              return false;
            if (Reflect.construct.sham)
              return false;
            if ("function" == typeof Proxy)
              return true;
            try {
              return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
              })), true;
            } catch (t2) {
              return false;
            }
          }();
          return function() {
            var t2, e2 = lt(o3);
            if (r3) {
              var n3 = lt(this).constructor;
              t2 = Reflect.construct(e2, arguments, n3);
            } else
              t2 = e2.apply(this, arguments);
            return function(t3, e3) {
              {
                if (e3 && ("object" === rt(e3) || "function" == typeof e3))
                  return e3;
                if (void 0 !== e3)
                  throw new TypeError("Derived constructors may only return object or undefined");
              }
              return function(t4) {
                if (void 0 !== t4)
                  return t4;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              }(t3);
            }(this, t2);
          };
        }
        function lt(t2) {
          return (lt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t3) {
            return t3.__proto__ || Object.getPrototypeOf(t3);
          })(t2);
        }
        ot.propTypes = { expanded: y.a.bool, doExpand: y.a.func, doCollapse: y.a.func, onExpandEvent: y.a.func, config: y.a.object, onChange: y.a.func, currentState: y.a.object, translations: y.a.object };
        var st = function() {
          !function(t3, e3) {
            if ("function" != typeof e3 && null !== e3)
              throw new TypeError("Super expression must either be null or a function");
            t3.prototype = Object.create(e3 && e3.prototype, { constructor: { value: t3, writable: true, configurable: true } }), Object.defineProperty(t3, "prototype", { writable: false }), e3 && ct(t3, e3);
          }(i3, f["Component"]);
          var t2, e2, n3, r3 = at(i3);
          function i3(t3) {
            var l2;
            !function(t4, e4) {
              if (!(t4 instanceof e4))
                throw new TypeError("Cannot call a class as a function");
            }(this, i3), (l2 = r3.call(this, t3)).onExpandEvent = function() {
              l2.signalExpanded = !l2.state.expanded;
            }, l2.expandCollapse = function() {
              l2.setState({ expanded: l2.signalExpanded }), l2.signalExpanded = false;
            }, l2.toggleInlineStyle = function(t4) {
              var e4 = "monospace" === t4 ? "CODE" : t4.toUpperCase(), n5 = l2.props, o4 = n5.editorState, r4 = n5.onChange, i4 = E.RichUtils.toggleInlineStyle(o4, e4);
              if ("subscript" === t4 || "superscript" === t4) {
                var c3 = "subscript" === t4 ? "SUPERSCRIPT" : "SUBSCRIPT", a3 = E.Modifier.removeInlineStyle(i4.getCurrentContent(), i4.getSelection(), c3);
                i4 = E.EditorState.push(i4, a3, "change-inline-style");
              }
              i4 && r4(i4);
            }, l2.changeKeys = function(t4) {
              if (t4) {
                var n5 = {};
                return h(t4, function(t5, e4) {
                  n5["CODE" === t5 ? "monospace" : t5.toLowerCase()] = e4;
                }), n5;
              }
            }, l2.doExpand = function() {
              l2.setState({ expanded: true });
            }, l2.doCollapse = function() {
              l2.setState({ expanded: false });
            };
            var e3 = l2.props, n4 = e3.editorState, o3 = e3.modalHandler;
            return l2.state = { currentStyles: n4 ? l2.changeKeys(Object(S.getSelectionInlineStyle)(n4)) : {} }, o3.registerCallBack(l2.expandCollapse), l2;
          }
          return t2 = i3, (e2 = [{ key: "componentDidUpdate", value: function(t3) {
            var e3 = this.props.editorState;
            e3 && e3 !== t3.editorState && this.setState({ currentStyles: this.changeKeys(Object(S.getSelectionInlineStyle)(e3)) });
          } }, { key: "componentWillUnmount", value: function() {
            this.props.modalHandler.deregisterCallBack(this.expandCollapse);
          } }, { key: "render", value: function() {
            var t3 = this.props, e3 = t3.config, n4 = t3.translations, o3 = this.state, r4 = o3.expanded, i4 = o3.currentStyles, c3 = e3.component || ot;
            return N.a.createElement(c3, { config: e3, translations: n4, currentState: i4, expanded: r4, onExpandEvent: this.onExpandEvent, doExpand: this.doExpand, doCollapse: this.doCollapse, onChange: this.toggleInlineStyle });
          } }]) && it(t2.prototype, e2), n3 && it(t2, n3), Object.defineProperty(t2, "prototype", { writable: false }), i3;
        }();
        st.propTypes = { onChange: y.a.func.isRequired, editorState: y.a.object.isRequired, modalHandler: y.a.object, config: y.a.object, translations: y.a.object };
        n2(15);
        function ut(t2) {
          return (ut = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t3) {
            return typeof t3;
          } : function(t3) {
            return t3 && "function" == typeof Symbol && t3.constructor === Symbol && t3 !== Symbol.prototype ? "symbol" : typeof t3;
          })(t2);
        }
        function pt(t2, e2) {
          for (var n3 = 0; n3 < e2.length; n3++) {
            var o3 = e2[n3];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(t2, o3.key, o3);
          }
        }
        function dt(t2, e2) {
          return (dt = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t3, e3) {
            return t3.__proto__ = e3, t3;
          })(t2, e2);
        }
        function ft(o3) {
          var r3 = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct)
              return false;
            if (Reflect.construct.sham)
              return false;
            if ("function" == typeof Proxy)
              return true;
            try {
              return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
              })), true;
            } catch (t2) {
              return false;
            }
          }();
          return function() {
            var t2, e2 = yt(o3);
            if (r3) {
              var n3 = yt(this).constructor;
              t2 = Reflect.construct(e2, arguments, n3);
            } else
              t2 = e2.apply(this, arguments);
            return function(t3, e3) {
              {
                if (e3 && ("object" === ut(e3) || "function" == typeof e3))
                  return e3;
                if (void 0 !== e3)
                  throw new TypeError("Derived constructors may only return object or undefined");
              }
              return function(t4) {
                if (void 0 !== t4)
                  return t4;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              }(t3);
            }(this, t2);
          };
        }
        function yt(t2) {
          return (yt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t3) {
            return t3.__proto__ || Object.getPrototypeOf(t3);
          })(t2);
        }
        var mt = function() {
          !function(t3, e3) {
            if ("function" != typeof e3 && null !== e3)
              throw new TypeError("Super expression must either be null or a function");
            t3.prototype = Object.create(e3 && e3.prototype, { constructor: { value: t3, writable: true, configurable: true } }), Object.defineProperty(t3, "prototype", { writable: false }), e3 && dt(t3, e3);
          }(r3, f["Component"]);
          var t2, e2, n3, o3 = ft(r3);
          function r3(t3) {
            var e3;
            return function(t4, e4) {
              if (!(t4 instanceof e4))
                throw new TypeError("Cannot call a class as a function");
            }(this, r3), (e3 = o3.call(this, t3)).getBlockTypes = function(t4) {
              return [{ label: "Normal", displayName: t4["components.controls.blocktype.normal"] }, { label: "H1", displayName: t4["components.controls.blocktype.h1"] }, { label: "H2", displayName: t4["components.controls.blocktype.h2"] }, { label: "H3", displayName: t4["components.controls.blocktype.h3"] }, { label: "H4", displayName: t4["components.controls.blocktype.h4"] }, { label: "H5", displayName: t4["components.controls.blocktype.h5"] }, { label: "H6", displayName: t4["components.controls.blocktype.h6"] }, { label: "Blockquote", displayName: t4["components.controls.blocktype.blockquote"] }, { label: "Code", displayName: t4["components.controls.blocktype.code"] }];
            }, e3.state = { blockTypes: e3.getBlockTypes(t3.translations) }, e3;
          }
          return t2 = r3, (e2 = [{ key: "componentDidUpdate", value: function(t3) {
            var e3 = this.props.translations;
            e3 !== t3.translations && this.setState({ blockTypes: this.getBlockTypes(e3) });
          } }, { key: "renderFlat", value: function(t3) {
            var e3 = this.props, n4 = e3.config.className, o4 = e3.onChange, r4 = e3.currentState.blockType;
            return N.a.createElement("div", { className: w()("rdw-inline-wrapper", n4) }, t3.map(function(t4, e4) {
              return N.a.createElement(R, { key: e4, value: t4.label, active: r4 === t4.label, onClick: o4 }, t4.displayName);
            }));
          } }, { key: "renderInDropdown", value: function(t3) {
            var e3 = this.props, n4 = e3.config, o4 = n4.className, r4 = n4.dropdownClassName, i3 = n4.title, c3 = e3.currentState.blockType, a3 = e3.expanded, l2 = e3.doExpand, s2 = e3.onExpandEvent, u2 = e3.doCollapse, p2 = e3.onChange, d2 = e3.translations, f2 = this.state.blockTypes.filter(function(t4) {
              return t4.label === c3;
            }), y2 = f2 && f2[0] && f2[0].displayName;
            return N.a.createElement("div", { className: "rdw-block-wrapper", "aria-label": "rdw-block-control" }, N.a.createElement(H, { className: w()("rdw-block-dropdown", o4), optionWrapperClassName: w()(r4), onChange: p2, expanded: a3, doExpand: l2, doCollapse: u2, onExpandEvent: s2, title: i3 || d2["components.controls.blocktype.blocktype"] }, N.a.createElement("span", null, y2 || d2["components.controls.blocktype.blocktype"]), t3.map(function(t4, e4) {
              return N.a.createElement(K, { active: c3 === t4.label, value: t4.label, key: e4 }, t4.displayName);
            })));
          } }, { key: "render", value: function() {
            var n4 = this.props.config, t3 = n4.inDropdown, e3 = this.state.blockTypes.filter(function(t4) {
              var e4 = t4.label;
              return -1 < n4.options.indexOf(e4);
            });
            return t3 ? this.renderInDropdown(e3) : this.renderFlat(e3);
          } }]) && pt(t2.prototype, e2), n3 && pt(t2, n3), Object.defineProperty(t2, "prototype", { writable: false }), r3;
        }();
        mt.propTypes = { expanded: y.a.bool, onExpandEvent: y.a.func, doExpand: y.a.func, doCollapse: y.a.func, onChange: y.a.func, config: y.a.object, currentState: y.a.object, translations: y.a.object };
        var gt = mt;
        function bt(t2) {
          return (bt = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t3) {
            return typeof t3;
          } : function(t3) {
            return t3 && "function" == typeof Symbol && t3.constructor === Symbol && t3 !== Symbol.prototype ? "symbol" : typeof t3;
          })(t2);
        }
        function ht(t2, e2) {
          for (var n3 = 0; n3 < e2.length; n3++) {
            var o3 = e2[n3];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(t2, o3.key, o3);
          }
        }
        function Mt(t2, e2) {
          return (Mt = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t3, e3) {
            return t3.__proto__ = e3, t3;
          })(t2, e2);
        }
        function jt(o3) {
          var r3 = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct)
              return false;
            if (Reflect.construct.sham)
              return false;
            if ("function" == typeof Proxy)
              return true;
            try {
              return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
              })), true;
            } catch (t2) {
              return false;
            }
          }();
          return function() {
            var t2, e2 = vt(o3);
            if (r3) {
              var n3 = vt(this).constructor;
              t2 = Reflect.construct(e2, arguments, n3);
            } else
              t2 = e2.apply(this, arguments);
            return function(t3, e3) {
              {
                if (e3 && ("object" === bt(e3) || "function" == typeof e3))
                  return e3;
                if (void 0 !== e3)
                  throw new TypeError("Derived constructors may only return object or undefined");
              }
              return function(t4) {
                if (void 0 !== t4)
                  return t4;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              }(t3);
            }(this, t2);
          };
        }
        function vt(t2) {
          return (vt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t3) {
            return t3.__proto__ || Object.getPrototypeOf(t3);
          })(t2);
        }
        var Nt = function() {
          !function(t3, e3) {
            if ("function" != typeof e3 && null !== e3)
              throw new TypeError("Super expression must either be null or a function");
            t3.prototype = Object.create(e3 && e3.prototype, { constructor: { value: t3, writable: true, configurable: true } }), Object.defineProperty(t3, "prototype", { writable: false }), e3 && Mt(t3, e3);
          }(r3, f["Component"]);
          var t2, e2, n3, o3 = jt(r3);
          function r3(t3) {
            var c3;
            !function(t4, e4) {
              if (!(t4 instanceof e4))
                throw new TypeError("Cannot call a class as a function");
            }(this, r3), (c3 = o3.call(this, t3)).onExpandEvent = function() {
              c3.signalExpanded = !c3.state.expanded;
            }, c3.expandCollapse = function() {
              c3.setState({ expanded: c3.signalExpanded }), c3.signalExpanded = false;
            }, c3.blocksTypes = [{ label: "Normal", style: "unstyled" }, { label: "H1", style: "header-one" }, { label: "H2", style: "header-two" }, { label: "H3", style: "header-three" }, { label: "H4", style: "header-four" }, { label: "H5", style: "header-five" }, { label: "H6", style: "header-six" }, { label: "Blockquote", style: "blockquote" }, { label: "Code", style: "code" }], c3.doExpand = function() {
              c3.setState({ expanded: true });
            }, c3.doCollapse = function() {
              c3.setState({ expanded: false });
            }, c3.toggleBlockType = function(e4) {
              var t4 = c3.blocksTypes.find(function(t5) {
                return t5.label === e4;
              }).style, n5 = c3.props, o4 = n5.editorState, r4 = n5.onChange, i3 = E.RichUtils.toggleBlockType(o4, t4);
              i3 && r4(i3);
            };
            var e3 = t3.editorState, n4 = t3.modalHandler;
            return c3.state = { expanded: false, currentBlockType: e3 ? Object(S.getSelectedBlocksType)(e3) : "unstyled" }, n4.registerCallBack(c3.expandCollapse), c3;
          }
          return t2 = r3, (e2 = [{ key: "componentDidUpdate", value: function(t3) {
            var e3 = this.props.editorState;
            e3 && e3 !== t3.editorState && this.setState({ currentBlockType: Object(S.getSelectedBlocksType)(e3) });
          } }, { key: "componentWillUnmount", value: function() {
            this.props.modalHandler.deregisterCallBack(this.expandCollapse);
          } }, { key: "render", value: function() {
            var t3 = this.props, e3 = t3.config, n4 = t3.translations, o4 = this.state, r4 = o4.expanded, i3 = o4.currentBlockType, c3 = e3.component || gt, a3 = this.blocksTypes.find(function(t4) {
              return t4.style === i3;
            });
            return N.a.createElement(c3, { config: e3, translations: n4, currentState: { blockType: a3 && a3.label }, onChange: this.toggleBlockType, expanded: r4, onExpandEvent: this.onExpandEvent, doExpand: this.doExpand, doCollapse: this.doCollapse });
          } }]) && ht(t2.prototype, e2), n3 && ht(t2, n3), Object.defineProperty(t2, "prototype", { writable: false }), r3;
        }();
        Nt.propTypes = { onChange: y.a.func.isRequired, editorState: y.a.object, modalHandler: y.a.object, config: y.a.object, translations: y.a.object };
        var Et = Nt;
        n2(16);
        function St(t2) {
          return (St = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t3) {
            return typeof t3;
          } : function(t3) {
            return t3 && "function" == typeof Symbol && t3.constructor === Symbol && t3 !== Symbol.prototype ? "symbol" : typeof t3;
          })(t2);
        }
        function wt(t2, e2) {
          for (var n3 = 0; n3 < e2.length; n3++) {
            var o3 = e2[n3];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(t2, o3.key, o3);
          }
        }
        function Ct(t2, e2) {
          return (Ct = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t3, e3) {
            return t3.__proto__ = e3, t3;
          })(t2, e2);
        }
        function Lt(o3) {
          var r3 = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct)
              return false;
            if (Reflect.construct.sham)
              return false;
            if ("function" == typeof Proxy)
              return true;
            try {
              return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
              })), true;
            } catch (t2) {
              return false;
            }
          }();
          return function() {
            var t2, e2 = Dt(o3);
            if (r3) {
              var n3 = Dt(this).constructor;
              t2 = Reflect.construct(e2, arguments, n3);
            } else
              t2 = e2.apply(this, arguments);
            return function(t3, e3) {
              {
                if (e3 && ("object" === St(e3) || "function" == typeof e3))
                  return e3;
                if (void 0 !== e3)
                  throw new TypeError("Derived constructors may only return object or undefined");
              }
              return function(t4) {
                if (void 0 !== t4)
                  return t4;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              }(t3);
            }(this, t2);
          };
        }
        function Dt(t2) {
          return (Dt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t3) {
            return t3.__proto__ || Object.getPrototypeOf(t3);
          })(t2);
        }
        var kt = function() {
          !function(t3, e3) {
            if ("function" != typeof e3 && null !== e3)
              throw new TypeError("Super expression must either be null or a function");
            t3.prototype = Object.create(e3 && e3.prototype, { constructor: { value: t3, writable: true, configurable: true } }), Object.defineProperty(t3, "prototype", { writable: false }), e3 && Ct(t3, e3);
          }(i3, f["Component"]);
          var t2, e2, n3, r3 = Lt(i3);
          function i3() {
            var t3;
            !function(t4, e4) {
              if (!(t4 instanceof e4))
                throw new TypeError("Cannot call a class as a function");
            }(this, i3);
            for (var e3 = arguments.length, n4 = new Array(e3), o3 = 0; o3 < e3; o3++)
              n4[o3] = arguments[o3];
            return (t3 = r3.call.apply(r3, [this].concat(n4))).state = { defaultFontSize: void 0 }, t3;
          }
          return t2 = i3, (e2 = [{ key: "componentDidMount", value: function() {
            var t3 = document.getElementsByClassName("DraftEditor-root");
            if (t3 && 0 < t3.length) {
              var e3 = window.getComputedStyle(t3[0]).getPropertyValue("font-size");
              e3 = e3.substring(0, e3.length - 2), this.setState({ defaultFontSize: e3 });
            }
          } }, { key: "render", value: function() {
            var t3 = this.props, e3 = t3.config, n4 = e3.icon, o3 = e3.className, r4 = e3.dropdownClassName, i4 = e3.options, c3 = e3.title, a3 = t3.onChange, l2 = t3.expanded, s2 = t3.doCollapse, u2 = t3.onExpandEvent, p2 = t3.doExpand, d2 = t3.translations, f2 = this.props.currentState.fontSize, y2 = this.state.defaultFontSize;
            return y2 = Number(y2), f2 = f2 || i4 && 0 <= i4.indexOf(y2) && y2, N.a.createElement("div", { className: "rdw-fontsize-wrapper", "aria-label": "rdw-font-size-control" }, N.a.createElement(H, { className: w()("rdw-fontsize-dropdown", o3), optionWrapperClassName: w()(r4), onChange: a3, expanded: l2, doExpand: p2, doCollapse: s2, onExpandEvent: u2, title: c3 || d2["components.controls.fontsize.fontsize"] }, f2 ? N.a.createElement("span", null, f2) : N.a.createElement("img", { src: n4, alt: "" }), i4.map(function(t4, e4) {
              return N.a.createElement(K, { className: "rdw-fontsize-option", active: f2 === t4, value: t4, key: e4 }, t4);
            })));
          } }]) && wt(t2.prototype, e2), n3 && wt(t2, n3), Object.defineProperty(t2, "prototype", { writable: false }), i3;
        }();
        function Ot(t2) {
          return (Ot = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t3) {
            return typeof t3;
          } : function(t3) {
            return t3 && "function" == typeof Symbol && t3.constructor === Symbol && t3 !== Symbol.prototype ? "symbol" : typeof t3;
          })(t2);
        }
        function xt(t2, e2) {
          for (var n3 = 0; n3 < e2.length; n3++) {
            var o3 = e2[n3];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(t2, o3.key, o3);
          }
        }
        function It(t2, e2) {
          return (It = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t3, e3) {
            return t3.__proto__ = e3, t3;
          })(t2, e2);
        }
        function Tt(o3) {
          var r3 = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct)
              return false;
            if (Reflect.construct.sham)
              return false;
            if ("function" == typeof Proxy)
              return true;
            try {
              return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
              })), true;
            } catch (t2) {
              return false;
            }
          }();
          return function() {
            var t2, e2 = At(o3);
            if (r3) {
              var n3 = At(this).constructor;
              t2 = Reflect.construct(e2, arguments, n3);
            } else
              t2 = e2.apply(this, arguments);
            return function(t3, e3) {
              {
                if (e3 && ("object" === Ot(e3) || "function" == typeof e3))
                  return e3;
                if (void 0 !== e3)
                  throw new TypeError("Derived constructors may only return object or undefined");
              }
              return function(t4) {
                if (void 0 !== t4)
                  return t4;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              }(t3);
            }(this, t2);
          };
        }
        function At(t2) {
          return (At = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t3) {
            return t3.__proto__ || Object.getPrototypeOf(t3);
          })(t2);
        }
        kt.propTypes = { expanded: y.a.bool, onExpandEvent: y.a.func, doExpand: y.a.func, doCollapse: y.a.func, onChange: y.a.func, config: y.a.object, currentState: y.a.object, translations: y.a.object };
        var zt = function() {
          !function(t3, e3) {
            if ("function" != typeof e3 && null !== e3)
              throw new TypeError("Super expression must either be null or a function");
            t3.prototype = Object.create(e3 && e3.prototype, { constructor: { value: t3, writable: true, configurable: true } }), Object.defineProperty(t3, "prototype", { writable: false }), e3 && It(t3, e3);
          }(r3, f["Component"]);
          var t2, e2, n3, o3 = Tt(r3);
          function r3(t3) {
            var i3;
            !function(t4, e4) {
              if (!(t4 instanceof e4))
                throw new TypeError("Cannot call a class as a function");
            }(this, r3), (i3 = o3.call(this, t3)).onExpandEvent = function() {
              i3.signalExpanded = !i3.state.expanded;
            }, i3.expandCollapse = function() {
              i3.setState({ expanded: i3.signalExpanded }), i3.signalExpanded = false;
            }, i3.doExpand = function() {
              i3.setState({ expanded: true });
            }, i3.doCollapse = function() {
              i3.setState({ expanded: false });
            }, i3.toggleFontSize = function(t4) {
              var e4 = i3.props, n5 = e4.editorState, o4 = e4.onChange, r4 = Object(S.toggleCustomInlineStyle)(n5, "fontSize", t4);
              r4 && o4(r4);
            };
            var e3 = t3.editorState, n4 = t3.modalHandler;
            return i3.state = { expanded: void 0, currentFontSize: e3 ? Object(S.getSelectionCustomInlineStyle)(e3, ["FONTSIZE"]).FONTSIZE : void 0 }, n4.registerCallBack(i3.expandCollapse), i3;
          }
          return t2 = r3, (e2 = [{ key: "componentDidUpdate", value: function(t3) {
            var e3 = this.props.editorState;
            e3 && e3 !== t3.editorState && this.setState({ currentFontSize: Object(S.getSelectionCustomInlineStyle)(e3, ["FONTSIZE"]).FONTSIZE });
          } }, { key: "componentWillUnmount", value: function() {
            this.props.modalHandler.deregisterCallBack(this.expandCollapse);
          } }, { key: "render", value: function() {
            var t3 = this.props, e3 = t3.config, n4 = t3.translations, o4 = this.state, r4 = o4.expanded, i3 = o4.currentFontSize, c3 = e3.component || kt, a3 = i3 && Number(i3.substring(9));
            return N.a.createElement(c3, { config: e3, translations: n4, currentState: { fontSize: a3 }, onChange: this.toggleFontSize, expanded: r4, onExpandEvent: this.onExpandEvent, doExpand: this.doExpand, doCollapse: this.doCollapse });
          } }]) && xt(t2.prototype, e2), n3 && xt(t2, n3), Object.defineProperty(t2, "prototype", { writable: false }), r3;
        }();
        zt.propTypes = { onChange: y.a.func.isRequired, editorState: y.a.object, modalHandler: y.a.object, config: y.a.object, translations: y.a.object };
        n2(17);
        function _t(t2) {
          return (_t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t3) {
            return typeof t3;
          } : function(t3) {
            return t3 && "function" == typeof Symbol && t3.constructor === Symbol && t3 !== Symbol.prototype ? "symbol" : typeof t3;
          })(t2);
        }
        function Pt(t2, e2) {
          for (var n3 = 0; n3 < e2.length; n3++) {
            var o3 = e2[n3];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(t2, o3.key, o3);
          }
        }
        function Rt(t2, e2) {
          return (Rt = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t3, e3) {
            return t3.__proto__ = e3, t3;
          })(t2, e2);
        }
        function Ut(o3) {
          var r3 = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct)
              return false;
            if (Reflect.construct.sham)
              return false;
            if ("function" == typeof Proxy)
              return true;
            try {
              return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
              })), true;
            } catch (t2) {
              return false;
            }
          }();
          return function() {
            var t2, e2 = Bt(o3);
            if (r3) {
              var n3 = Bt(this).constructor;
              t2 = Reflect.construct(e2, arguments, n3);
            } else
              t2 = e2.apply(this, arguments);
            return function(t3, e3) {
              {
                if (e3 && ("object" === _t(e3) || "function" == typeof e3))
                  return e3;
                if (void 0 !== e3)
                  throw new TypeError("Derived constructors may only return object or undefined");
              }
              return function(t4) {
                if (void 0 !== t4)
                  return t4;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              }(t3);
            }(this, t2);
          };
        }
        function Bt(t2) {
          return (Bt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t3) {
            return t3.__proto__ || Object.getPrototypeOf(t3);
          })(t2);
        }
        var Ft = function() {
          !function(t3, e3) {
            if ("function" != typeof e3 && null !== e3)
              throw new TypeError("Super expression must either be null or a function");
            t3.prototype = Object.create(e3 && e3.prototype, { constructor: { value: t3, writable: true, configurable: true } }), Object.defineProperty(t3, "prototype", { writable: false }), e3 && Rt(t3, e3);
          }(i3, f["Component"]);
          var t2, e2, n3, r3 = Ut(i3);
          function i3() {
            var t3;
            !function(t4, e4) {
              if (!(t4 instanceof e4))
                throw new TypeError("Cannot call a class as a function");
            }(this, i3);
            for (var e3 = arguments.length, n4 = new Array(e3), o3 = 0; o3 < e3; o3++)
              n4[o3] = arguments[o3];
            return (t3 = r3.call.apply(r3, [this].concat(n4))).state = { defaultFontFamily: void 0 }, t3;
          }
          return t2 = i3, (e2 = [{ key: "componentDidMount", value: function() {
            var t3 = document.getElementsByClassName("DraftEditor-root");
            if (t3 && 0 < t3.length) {
              var e3 = window.getComputedStyle(t3[0]).getPropertyValue("font-family");
              this.setState({ defaultFontFamily: e3 });
            }
          } }, { key: "render", value: function() {
            var e3 = this.state.defaultFontFamily, t3 = this.props, n4 = t3.config, o3 = n4.className, r4 = n4.dropdownClassName, i4 = n4.options, c3 = n4.title, a3 = t3.translations, l2 = t3.onChange, s2 = t3.expanded, u2 = t3.doCollapse, p2 = t3.onExpandEvent, d2 = t3.doExpand, f2 = this.props.currentState.fontFamily;
            return f2 = f2 || i4 && e3 && i4.some(function(t4) {
              return t4.toLowerCase() === e3.toLowerCase();
            }) && e3, N.a.createElement("div", { className: "rdw-fontfamily-wrapper", "aria-label": "rdw-font-family-control" }, N.a.createElement(H, { className: w()("rdw-fontfamily-dropdown", o3), optionWrapperClassName: w()("rdw-fontfamily-optionwrapper", r4), onChange: l2, expanded: s2, doExpand: d2, doCollapse: u2, onExpandEvent: p2, title: c3 || a3["components.controls.fontfamily.fontfamily"] }, N.a.createElement("span", { className: "rdw-fontfamily-placeholder" }, f2 || a3["components.controls.fontfamily.fontfamily"]), i4.map(function(t4, e4) {
              return N.a.createElement(K, { active: f2 === t4, value: t4, key: e4 }, t4);
            })));
          } }]) && Pt(t2.prototype, e2), n3 && Pt(t2, n3), Object.defineProperty(t2, "prototype", { writable: false }), i3;
        }();
        Ft.propTypes = { expanded: y.a.bool, onExpandEvent: y.a.func, doExpand: y.a.func, doCollapse: y.a.func, onChange: y.a.func, config: y.a.object, currentState: y.a.object, translations: y.a.object };
        var Yt = Ft;
        function Qt(t2) {
          return (Qt = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t3) {
            return typeof t3;
          } : function(t3) {
            return t3 && "function" == typeof Symbol && t3.constructor === Symbol && t3 !== Symbol.prototype ? "symbol" : typeof t3;
          })(t2);
        }
        function Ht(t2, e2) {
          for (var n3 = 0; n3 < e2.length; n3++) {
            var o3 = e2[n3];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(t2, o3.key, o3);
          }
        }
        function Zt(t2, e2) {
          return (Zt = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t3, e3) {
            return t3.__proto__ = e3, t3;
          })(t2, e2);
        }
        function Wt(o3) {
          var r3 = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct)
              return false;
            if (Reflect.construct.sham)
              return false;
            if ("function" == typeof Proxy)
              return true;
            try {
              return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
              })), true;
            } catch (t2) {
              return false;
            }
          }();
          return function() {
            var t2, e2 = Gt(o3);
            if (r3) {
              var n3 = Gt(this).constructor;
              t2 = Reflect.construct(e2, arguments, n3);
            } else
              t2 = e2.apply(this, arguments);
            return function(t3, e3) {
              {
                if (e3 && ("object" === Qt(e3) || "function" == typeof e3))
                  return e3;
                if (void 0 !== e3)
                  throw new TypeError("Derived constructors may only return object or undefined");
              }
              return function(t4) {
                if (void 0 !== t4)
                  return t4;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              }(t3);
            }(this, t2);
          };
        }
        function Gt(t2) {
          return (Gt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t3) {
            return t3.__proto__ || Object.getPrototypeOf(t3);
          })(t2);
        }
        var Jt = function() {
          !function(t3, e3) {
            if ("function" != typeof e3 && null !== e3)
              throw new TypeError("Super expression must either be null or a function");
            t3.prototype = Object.create(e3 && e3.prototype, { constructor: { value: t3, writable: true, configurable: true } }), Object.defineProperty(t3, "prototype", { writable: false }), e3 && Zt(t3, e3);
          }(r3, f["Component"]);
          var t2, e2, n3, o3 = Wt(r3);
          function r3(t3) {
            var i3;
            !function(t4, e4) {
              if (!(t4 instanceof e4))
                throw new TypeError("Cannot call a class as a function");
            }(this, r3), (i3 = o3.call(this, t3)).onExpandEvent = function() {
              i3.signalExpanded = !i3.state.expanded;
            }, i3.expandCollapse = function() {
              i3.setState({ expanded: i3.signalExpanded }), i3.signalExpanded = false;
            }, i3.doExpand = function() {
              i3.setState({ expanded: true });
            }, i3.doCollapse = function() {
              i3.setState({ expanded: false });
            }, i3.toggleFontFamily = function(t4) {
              var e4 = i3.props, n5 = e4.editorState, o4 = e4.onChange, r4 = Object(S.toggleCustomInlineStyle)(n5, "fontFamily", t4);
              r4 && o4(r4);
            };
            var e3 = t3.editorState, n4 = t3.modalHandler;
            return i3.state = { expanded: void 0, currentFontFamily: e3 ? Object(S.getSelectionCustomInlineStyle)(e3, ["FONTFAMILY"]).FONTFAMILY : void 0 }, n4.registerCallBack(i3.expandCollapse), i3;
          }
          return t2 = r3, (e2 = [{ key: "componentDidUpdate", value: function(t3) {
            var e3 = this.props.editorState;
            e3 && e3 !== t3.editorState && this.setState({ currentFontFamily: Object(S.getSelectionCustomInlineStyle)(e3, ["FONTFAMILY"]).FONTFAMILY });
          } }, { key: "componentWillUnmount", value: function() {
            this.props.modalHandler.deregisterCallBack(this.expandCollapse);
          } }, { key: "render", value: function() {
            var t3 = this.props, e3 = t3.config, n4 = t3.translations, o4 = this.state, r4 = o4.expanded, i3 = o4.currentFontFamily, c3 = e3.component || Yt, a3 = i3 && i3.substring(11);
            return N.a.createElement(c3, { translations: n4, config: e3, currentState: { fontFamily: a3 }, onChange: this.toggleFontFamily, expanded: r4, onExpandEvent: this.onExpandEvent, doExpand: this.doExpand, doCollapse: this.doCollapse });
          } }]) && Ht(t2.prototype, e2), n3 && Ht(t2, n3), Object.defineProperty(t2, "prototype", { writable: false }), r3;
        }();
        Jt.propTypes = { onChange: y.a.func.isRequired, editorState: y.a.object, modalHandler: y.a.object, config: y.a.object, translations: y.a.object };
        n2(18);
        function Vt(t2) {
          return (Vt = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t3) {
            return typeof t3;
          } : function(t3) {
            return t3 && "function" == typeof Symbol && t3.constructor === Symbol && t3 !== Symbol.prototype ? "symbol" : typeof t3;
          })(t2);
        }
        function qt(t2, e2) {
          for (var n3 = 0; n3 < e2.length; n3++) {
            var o3 = e2[n3];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(t2, o3.key, o3);
          }
        }
        function Kt(t2, e2) {
          return (Kt = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t3, e3) {
            return t3.__proto__ = e3, t3;
          })(t2, e2);
        }
        function Xt(o3) {
          var r3 = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct)
              return false;
            if (Reflect.construct.sham)
              return false;
            if ("function" == typeof Proxy)
              return true;
            try {
              return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
              })), true;
            } catch (t2) {
              return false;
            }
          }();
          return function() {
            var t2, e2 = $t(o3);
            if (r3) {
              var n3 = $t(this).constructor;
              t2 = Reflect.construct(e2, arguments, n3);
            } else
              t2 = e2.apply(this, arguments);
            return function(t3, e3) {
              {
                if (e3 && ("object" === Vt(e3) || "function" == typeof e3))
                  return e3;
                if (void 0 !== e3)
                  throw new TypeError("Derived constructors may only return object or undefined");
              }
              return function(t4) {
                if (void 0 !== t4)
                  return t4;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              }(t3);
            }(this, t2);
          };
        }
        function $t(t2) {
          return ($t = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t3) {
            return t3.__proto__ || Object.getPrototypeOf(t3);
          })(t2);
        }
        var te = function() {
          !function(t3, e3) {
            if ("function" != typeof e3 && null !== e3)
              throw new TypeError("Super expression must either be null or a function");
            t3.prototype = Object.create(e3 && e3.prototype, { constructor: { value: t3, writable: true, configurable: true } }), Object.defineProperty(t3, "prototype", { writable: false }), e3 && Kt(t3, e3);
          }(i3, f["Component"]);
          var t2, e2, n3, r3 = Xt(i3);
          function i3() {
            var e3;
            !function(t4, e4) {
              if (!(t4 instanceof e4))
                throw new TypeError("Cannot call a class as a function");
            }(this, i3);
            for (var t3 = arguments.length, n4 = new Array(t3), o3 = 0; o3 < t3; o3++)
              n4[o3] = arguments[o3];
            return (e3 = r3.call.apply(r3, [this].concat(n4))).options = ["unordered", "ordered", "indent", "outdent"], e3.toggleBlockType = function(t4) {
              (0, e3.props.onChange)(t4);
            }, e3.indent = function() {
              (0, e3.props.onChange)("indent");
            }, e3.outdent = function() {
              (0, e3.props.onChange)("outdent");
            }, e3;
          }
          return t2 = i3, (e2 = [{ key: "renderInFlatList", value: function() {
            var t3 = this.props, e3 = t3.config, n4 = t3.currentState.listType, o3 = t3.translations, r4 = t3.indentDisabled, i4 = t3.outdentDisabled, c3 = e3.options, a3 = e3.unordered, l2 = e3.ordered, s2 = e3.indent, u2 = e3.outdent, p2 = e3.className;
            return N.a.createElement("div", { className: w()("rdw-list-wrapper", p2), "aria-label": "rdw-list-control" }, 0 <= c3.indexOf("unordered") && N.a.createElement(R, { value: "unordered", onClick: this.toggleBlockType, className: w()(a3.className), active: "unordered" === n4, title: a3.title || o3["components.controls.list.unordered"] }, N.a.createElement("img", { src: a3.icon, alt: "" })), 0 <= c3.indexOf("ordered") && N.a.createElement(R, { value: "ordered", onClick: this.toggleBlockType, className: w()(l2.className), active: "ordered" === n4, title: l2.title || o3["components.controls.list.ordered"] }, N.a.createElement("img", { src: l2.icon, alt: "" })), 0 <= c3.indexOf("indent") && N.a.createElement(R, { onClick: this.indent, disabled: r4, className: w()(s2.className), title: s2.title || o3["components.controls.list.indent"] }, N.a.createElement("img", { src: s2.icon, alt: "" })), 0 <= c3.indexOf("outdent") && N.a.createElement(R, { onClick: this.outdent, disabled: i4, className: w()(u2.className), title: u2.title || o3["components.controls.list.outdent"] }, N.a.createElement("img", { src: u2.icon, alt: "" })));
          } }, { key: "renderInDropDown", value: function() {
            var n4 = this, t3 = this.props, o3 = t3.config, e3 = t3.expanded, r4 = t3.doCollapse, i4 = t3.doExpand, c3 = t3.onExpandEvent, a3 = t3.onChange, l2 = t3.currentState.listType, s2 = t3.translations, u2 = o3.options, p2 = o3.className, d2 = o3.dropdownClassName, f2 = o3.title;
            return N.a.createElement(H, { className: w()("rdw-list-dropdown", p2), optionWrapperClassName: w()(d2), onChange: a3, expanded: e3, doExpand: i4, doCollapse: r4, onExpandEvent: c3, "aria-label": "rdw-list-control", title: f2 || s2["components.controls.list.list"] }, N.a.createElement("img", { src: v(o3), alt: "" }), this.options.filter(function(t4) {
              return 0 <= u2.indexOf(t4);
            }).map(function(t4, e4) {
              return N.a.createElement(K, { key: e4, value: t4, disabled: n4.props["".concat(t4, "Disabled")], className: w()("rdw-list-dropdownOption", o3[t4].className), active: l2 === t4, title: o3[t4].title || s2["components.controls.list.".concat(t4)] }, N.a.createElement("img", { src: o3[t4].icon, alt: "" }));
            }));
          } }, { key: "render", value: function() {
            return this.props.config.inDropdown ? this.renderInDropDown() : this.renderInFlatList();
          } }]) && qt(t2.prototype, e2), n3 && qt(t2, n3), Object.defineProperty(t2, "prototype", { writable: false }), i3;
        }();
        function ee(t2) {
          return (ee = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t3) {
            return typeof t3;
          } : function(t3) {
            return t3 && "function" == typeof Symbol && t3.constructor === Symbol && t3 !== Symbol.prototype ? "symbol" : typeof t3;
          })(t2);
        }
        function ne(t2, e2) {
          for (var n3 = 0; n3 < e2.length; n3++) {
            var o3 = e2[n3];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(t2, o3.key, o3);
          }
        }
        function oe(t2, e2) {
          return (oe = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t3, e3) {
            return t3.__proto__ = e3, t3;
          })(t2, e2);
        }
        function re(o3) {
          var r3 = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct)
              return false;
            if (Reflect.construct.sham)
              return false;
            if ("function" == typeof Proxy)
              return true;
            try {
              return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
              })), true;
            } catch (t2) {
              return false;
            }
          }();
          return function() {
            var t2, e2 = ie(o3);
            if (r3) {
              var n3 = ie(this).constructor;
              t2 = Reflect.construct(e2, arguments, n3);
            } else
              t2 = e2.apply(this, arguments);
            return function(t3, e3) {
              {
                if (e3 && ("object" === ee(e3) || "function" == typeof e3))
                  return e3;
                if (void 0 !== e3)
                  throw new TypeError("Derived constructors may only return object or undefined");
              }
              return function(t4) {
                if (void 0 !== t4)
                  return t4;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              }(t3);
            }(this, t2);
          };
        }
        function ie(t2) {
          return (ie = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t3) {
            return t3.__proto__ || Object.getPrototypeOf(t3);
          })(t2);
        }
        te.propTypes = { expanded: y.a.bool, doExpand: y.a.func, doCollapse: y.a.func, onExpandEvent: y.a.func, config: y.a.object, onChange: y.a.func, currentState: y.a.object, translations: y.a.object, indentDisabled: y.a.bool, outdentDisabled: y.a.bool };
        var ce = function() {
          !function(t3, e3) {
            if ("function" != typeof e3 && null !== e3)
              throw new TypeError("Super expression must either be null or a function");
            t3.prototype = Object.create(e3 && e3.prototype, { constructor: { value: t3, writable: true, configurable: true } }), Object.defineProperty(t3, "prototype", { writable: false }), e3 && oe(t3, e3);
          }(c3, f["Component"]);
          var t2, e2, n3, r3 = re(c3);
          function c3(t3) {
            var i3;
            !function(t4, e4) {
              if (!(t4 instanceof e4))
                throw new TypeError("Cannot call a class as a function");
            }(this, c3), (i3 = r3.call(this, t3)).onExpandEvent = function() {
              i3.signalExpanded = !i3.state.expanded;
            }, i3.onChange = function(t4) {
              "unordered" === t4 ? i3.toggleBlockType("unordered-list-item") : "ordered" === t4 ? i3.toggleBlockType("ordered-list-item") : "indent" === t4 ? i3.adjustDepth(1) : i3.adjustDepth(-1);
            }, i3.expandCollapse = function() {
              i3.setState({ expanded: i3.signalExpanded }), i3.signalExpanded = false;
            }, i3.doExpand = function() {
              i3.setState({ expanded: true });
            }, i3.doCollapse = function() {
              i3.setState({ expanded: false });
            }, i3.toggleBlockType = function(t4) {
              var e4 = i3.props, n5 = e4.onChange, o4 = e4.editorState, r4 = E.RichUtils.toggleBlockType(o4, t4);
              r4 && n5(r4);
            }, i3.adjustDepth = function(t4) {
              var e4 = i3.props, n5 = e4.onChange, o4 = e4.editorState, r4 = Object(S.changeDepth)(o4, t4, 4);
              r4 && n5(r4);
            }, i3.isIndentDisabled = function() {
              var t4 = i3.props.editorState, e4 = i3.state.currentBlock, n5 = Object(S.getBlockBeforeSelectedBlock)(t4);
              return !n5 || !Object(S.isListBlock)(e4) || n5.get("type") !== e4.get("type") || n5.get("depth") < e4.get("depth");
            }, i3.isOutdentDisabled = function() {
              var t4 = i3.state.currentBlock;
              return !t4 || !Object(S.isListBlock)(t4) || t4.get("depth") <= 0;
            };
            var e3 = i3.props, n4 = e3.editorState, o3 = e3.modalHandler;
            return i3.state = { expanded: false, currentBlock: n4 ? Object(S.getSelectedBlock)(n4) : void 0 }, o3.registerCallBack(i3.expandCollapse), i3;
          }
          return t2 = c3, (e2 = [{ key: "componentDidUpdate", value: function(t3) {
            var e3 = this.props.editorState;
            e3 && e3 !== t3.editorState && this.setState({ currentBlock: Object(S.getSelectedBlock)(e3) });
          } }, { key: "componentWillUnmount", value: function() {
            this.props.modalHandler.deregisterCallBack(this.expandCollapse);
          } }, { key: "render", value: function() {
            var t3, e3 = this.props, n4 = e3.config, o3 = e3.translations, r4 = this.state, i3 = r4.expanded, c4 = r4.currentBlock, a3 = n4.component || te;
            "unordered-list-item" === c4.get("type") ? t3 = "unordered" : "ordered-list-item" === c4.get("type") && (t3 = "ordered");
            var l2 = this.isIndentDisabled(), s2 = this.isOutdentDisabled();
            return N.a.createElement(a3, { config: n4, translations: o3, currentState: { listType: t3 }, expanded: i3, onExpandEvent: this.onExpandEvent, doExpand: this.doExpand, doCollapse: this.doCollapse, onChange: this.onChange, indentDisabled: l2, outdentDisabled: s2 });
          } }]) && ne(t2.prototype, e2), n3 && ne(t2, n3), Object.defineProperty(t2, "prototype", { writable: false }), c3;
        }();
        ce.propTypes = { onChange: y.a.func.isRequired, editorState: y.a.object.isRequired, modalHandler: y.a.object, config: y.a.object, translations: y.a.object };
        n2(19);
        function ae(t2) {
          return (ae = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t3) {
            return typeof t3;
          } : function(t3) {
            return t3 && "function" == typeof Symbol && t3.constructor === Symbol && t3 !== Symbol.prototype ? "symbol" : typeof t3;
          })(t2);
        }
        function le(t2, e2) {
          for (var n3 = 0; n3 < e2.length; n3++) {
            var o3 = e2[n3];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(t2, o3.key, o3);
          }
        }
        function se(t2, e2) {
          return (se = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t3, e3) {
            return t3.__proto__ = e3, t3;
          })(t2, e2);
        }
        function ue(o3) {
          var r3 = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct)
              return false;
            if (Reflect.construct.sham)
              return false;
            if ("function" == typeof Proxy)
              return true;
            try {
              return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
              })), true;
            } catch (t2) {
              return false;
            }
          }();
          return function() {
            var t2, e2 = pe(o3);
            if (r3) {
              var n3 = pe(this).constructor;
              t2 = Reflect.construct(e2, arguments, n3);
            } else
              t2 = e2.apply(this, arguments);
            return function(t3, e3) {
              {
                if (e3 && ("object" === ae(e3) || "function" == typeof e3))
                  return e3;
                if (void 0 !== e3)
                  throw new TypeError("Derived constructors may only return object or undefined");
              }
              return function(t4) {
                if (void 0 !== t4)
                  return t4;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              }(t3);
            }(this, t2);
          };
        }
        function pe(t2) {
          return (pe = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t3) {
            return t3.__proto__ || Object.getPrototypeOf(t3);
          })(t2);
        }
        var de = function() {
          !function(t3, e3) {
            if ("function" != typeof e3 && null !== e3)
              throw new TypeError("Super expression must either be null or a function");
            t3.prototype = Object.create(e3 && e3.prototype, { constructor: { value: t3, writable: true, configurable: true } }), Object.defineProperty(t3, "prototype", { writable: false }), e3 && se(t3, e3);
          }(r3, f["Component"]);
          var t2, e2, n3, o3 = ue(r3);
          function r3() {
            return function(t3, e3) {
              if (!(t3 instanceof e3))
                throw new TypeError("Cannot call a class as a function");
            }(this, r3), o3.apply(this, arguments);
          }
          return t2 = r3, (e2 = [{ key: "renderInFlatList", value: function() {
            var t3 = this.props, e3 = t3.config, n4 = e3.options, o4 = e3.left, r4 = e3.center, i3 = e3.right, c3 = e3.justify, a3 = e3.className, l2 = t3.onChange, s2 = t3.currentState.textAlignment, u2 = t3.translations;
            return N.a.createElement("div", { className: w()("rdw-text-align-wrapper", a3), "aria-label": "rdw-textalign-control" }, 0 <= n4.indexOf("left") && N.a.createElement(R, { value: "left", className: w()(o4.className), active: "left" === s2, onClick: l2, title: o4.title || u2["components.controls.textalign.left"] }, N.a.createElement("img", { src: o4.icon, alt: "" })), 0 <= n4.indexOf("center") && N.a.createElement(R, { value: "center", className: w()(r4.className), active: "center" === s2, onClick: l2, title: r4.title || u2["components.controls.textalign.center"] }, N.a.createElement("img", { src: r4.icon, alt: "" })), 0 <= n4.indexOf("right") && N.a.createElement(R, { value: "right", className: w()(i3.className), active: "right" === s2, onClick: l2, title: i3.title || u2["components.controls.textalign.right"] }, N.a.createElement("img", { src: i3.icon, alt: "" })), 0 <= n4.indexOf("justify") && N.a.createElement(R, { value: "justify", className: w()(c3.className), active: "justify" === s2, onClick: l2, title: c3.title || u2["components.controls.textalign.justify"] }, N.a.createElement("img", { src: c3.icon, alt: "" })));
          } }, { key: "renderInDropDown", value: function() {
            var t3 = this.props, e3 = t3.config, n4 = t3.expanded, o4 = t3.doExpand, r4 = t3.onExpandEvent, i3 = t3.doCollapse, c3 = t3.currentState.textAlignment, a3 = t3.onChange, l2 = t3.translations, s2 = e3.options, u2 = e3.left, p2 = e3.center, d2 = e3.right, f2 = e3.justify, y2 = e3.className, m2 = e3.dropdownClassName, g2 = e3.title;
            return N.a.createElement(H, { className: w()("rdw-text-align-dropdown", y2), optionWrapperClassName: w()(m2), onChange: a3, expanded: n4, doExpand: o4, doCollapse: i3, onExpandEvent: r4, "aria-label": "rdw-textalign-control", title: g2 || l2["components.controls.textalign.textalign"] }, N.a.createElement("img", { src: c3 && e3[c3] && e3[c3].icon || v(e3), alt: "" }), 0 <= s2.indexOf("left") && N.a.createElement(K, { value: "left", active: "left" === c3, className: w()("rdw-text-align-dropdownOption", u2.className), title: u2.title || l2["components.controls.textalign.left"] }, N.a.createElement("img", { src: u2.icon, alt: "" })), 0 <= s2.indexOf("center") && N.a.createElement(K, { value: "center", active: "center" === c3, className: w()("rdw-text-align-dropdownOption", p2.className), title: p2.title || l2["components.controls.textalign.center"] }, N.a.createElement("img", { src: p2.icon, alt: "" })), 0 <= s2.indexOf("right") && N.a.createElement(K, { value: "right", active: "right" === c3, className: w()("rdw-text-align-dropdownOption", d2.className), title: d2.title || l2["components.controls.textalign.right"] }, N.a.createElement("img", { src: d2.icon, alt: "" })), 0 <= s2.indexOf("justify") && N.a.createElement(K, { value: "justify", active: "justify" === c3, className: w()("rdw-text-align-dropdownOption", f2.className), title: f2.title || l2["components.controls.textalign.justify"] }, N.a.createElement("img", { src: f2.icon, alt: "" })));
          } }, { key: "render", value: function() {
            return this.props.config.inDropdown ? this.renderInDropDown() : this.renderInFlatList();
          } }]) && le(t2.prototype, e2), n3 && le(t2, n3), Object.defineProperty(t2, "prototype", { writable: false }), r3;
        }();
        function fe(t2) {
          return (fe = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t3) {
            return typeof t3;
          } : function(t3) {
            return t3 && "function" == typeof Symbol && t3.constructor === Symbol && t3 !== Symbol.prototype ? "symbol" : typeof t3;
          })(t2);
        }
        function ye(t2, e2) {
          for (var n3 = 0; n3 < e2.length; n3++) {
            var o3 = e2[n3];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(t2, o3.key, o3);
          }
        }
        function me(t2, e2) {
          return (me = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t3, e3) {
            return t3.__proto__ = e3, t3;
          })(t2, e2);
        }
        function ge(o3) {
          var r3 = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct)
              return false;
            if (Reflect.construct.sham)
              return false;
            if ("function" == typeof Proxy)
              return true;
            try {
              return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
              })), true;
            } catch (t2) {
              return false;
            }
          }();
          return function() {
            var t2, e2 = be(o3);
            if (r3) {
              var n3 = be(this).constructor;
              t2 = Reflect.construct(e2, arguments, n3);
            } else
              t2 = e2.apply(this, arguments);
            return function(t3, e3) {
              {
                if (e3 && ("object" === fe(e3) || "function" == typeof e3))
                  return e3;
                if (void 0 !== e3)
                  throw new TypeError("Derived constructors may only return object or undefined");
              }
              return function(t4) {
                if (void 0 !== t4)
                  return t4;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              }(t3);
            }(this, t2);
          };
        }
        function be(t2) {
          return (be = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t3) {
            return t3.__proto__ || Object.getPrototypeOf(t3);
          })(t2);
        }
        de.propTypes = { expanded: y.a.bool, doExpand: y.a.func, doCollapse: y.a.func, onExpandEvent: y.a.func, config: y.a.object, onChange: y.a.func, currentState: y.a.object, translations: y.a.object };
        var he = function() {
          !function(t3, e3) {
            if ("function" != typeof e3 && null !== e3)
              throw new TypeError("Super expression must either be null or a function");
            t3.prototype = Object.create(e3 && e3.prototype, { constructor: { value: t3, writable: true, configurable: true } }), Object.defineProperty(t3, "prototype", { writable: false }), e3 && me(t3, e3);
          }(i3, f["Component"]);
          var t2, e2, n3, o3 = ge(i3);
          function i3(t3) {
            var r3;
            !function(t4, e4) {
              if (!(t4 instanceof e4))
                throw new TypeError("Cannot call a class as a function");
            }(this, i3), (r3 = o3.call(this, t3)).onExpandEvent = function() {
              r3.signalExpanded = !r3.state.expanded;
            }, r3.expandCollapse = function() {
              r3.setState({ expanded: r3.signalExpanded }), r3.signalExpanded = false;
            }, r3.doExpand = function() {
              r3.setState({ expanded: true });
            }, r3.doCollapse = function() {
              r3.setState({ expanded: false });
            }, r3.addBlockAlignmentData = function(t4) {
              var e4 = r3.props, n4 = e4.editorState, o4 = e4.onChange;
              o4(r3.state.currentTextAlignment !== t4 ? Object(S.setBlockData)(n4, { "text-align": t4 }) : Object(S.setBlockData)(n4, { "text-align": void 0 }));
            };
            var e3 = r3.props.modalHandler;
            return r3.state = { currentTextAlignment: void 0 }, e3.registerCallBack(r3.expandCollapse), r3;
          }
          return t2 = i3, (e2 = [{ key: "componentDidUpdate", value: function(t3) {
            var e3 = this.props.editorState;
            e3 !== t3.editorState && this.setState({ currentTextAlignment: Object(S.getSelectedBlocksMetadata)(e3).get("text-align") });
          } }, { key: "componentWillUnmount", value: function() {
            this.props.modalHandler.deregisterCallBack(this.expandCollapse);
          } }, { key: "render", value: function() {
            var t3 = this.props, e3 = t3.config, n4 = t3.translations, o4 = this.state, r3 = o4.expanded, i4 = o4.currentTextAlignment, c3 = e3.component || de;
            return N.a.createElement(c3, { config: e3, translations: n4, expanded: r3, onExpandEvent: this.onExpandEvent, doExpand: this.doExpand, doCollapse: this.doCollapse, currentState: { textAlignment: i4 }, onChange: this.addBlockAlignmentData });
          } }]) && ye(t2.prototype, e2), n3 && ye(t2, n3), Object.defineProperty(t2, "prototype", { writable: false }), i3;
        }();
        he.propTypes = { editorState: y.a.object.isRequired, onChange: y.a.func.isRequired, modalHandler: y.a.object, config: y.a.object, translations: y.a.object };
        n2(20);
        function Me(t2) {
          return (Me = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t3) {
            return typeof t3;
          } : function(t3) {
            return t3 && "function" == typeof Symbol && t3.constructor === Symbol && t3 !== Symbol.prototype ? "symbol" : typeof t3;
          })(t2);
        }
        function je(t2, e2) {
          for (var n3 = 0; n3 < e2.length; n3++) {
            var o3 = e2[n3];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(t2, o3.key, o3);
          }
        }
        function ve(t2, e2) {
          return (ve = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t3, e3) {
            return t3.__proto__ = e3, t3;
          })(t2, e2);
        }
        function Ne(o3) {
          var r3 = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct)
              return false;
            if (Reflect.construct.sham)
              return false;
            if ("function" == typeof Proxy)
              return true;
            try {
              return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
              })), true;
            } catch (t2) {
              return false;
            }
          }();
          return function() {
            var t2, e2 = Ee(o3);
            if (r3) {
              var n3 = Ee(this).constructor;
              t2 = Reflect.construct(e2, arguments, n3);
            } else
              t2 = e2.apply(this, arguments);
            return function(t3, e3) {
              {
                if (e3 && ("object" === Me(e3) || "function" == typeof e3))
                  return e3;
                if (void 0 !== e3)
                  throw new TypeError("Derived constructors may only return object or undefined");
              }
              return function(t4) {
                if (void 0 !== t4)
                  return t4;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              }(t3);
            }(this, t2);
          };
        }
        function Ee(t2) {
          return (Ee = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t3) {
            return t3.__proto__ || Object.getPrototypeOf(t3);
          })(t2);
        }
        var Se = function() {
          !function(t3, e3) {
            if ("function" != typeof e3 && null !== e3)
              throw new TypeError("Super expression must either be null or a function");
            t3.prototype = Object.create(e3 && e3.prototype, { constructor: { value: t3, writable: true, configurable: true } }), Object.defineProperty(t3, "prototype", { writable: false }), e3 && ve(t3, e3);
          }(r3, f["Component"]);
          var t2, e2, n3, o3 = Ne(r3);
          function r3() {
            var u2;
            !function(t4, e4) {
              if (!(t4 instanceof e4))
                throw new TypeError("Cannot call a class as a function");
            }(this, r3);
            for (var t3 = arguments.length, e3 = new Array(t3), n4 = 0; n4 < t3; n4++)
              e3[n4] = arguments[n4];
            return (u2 = o3.call.apply(o3, [this].concat(e3))).state = { currentStyle: "color" }, u2.onChange = function(t4) {
              (0, u2.props.onChange)(u2.state.currentStyle, t4);
            }, u2.setCurrentStyleColor = function() {
              u2.setState({ currentStyle: "color" });
            }, u2.setCurrentStyleBgcolor = function() {
              u2.setState({ currentStyle: "bgcolor" });
            }, u2.renderModal = function() {
              var t4 = u2.props, e4 = t4.config, n5 = e4.popupClassName, o4 = e4.colors, r4 = t4.currentState, i3 = r4.color, c3 = r4.bgColor, a3 = t4.translations, l2 = u2.state.currentStyle, s2 = "color" === l2 ? i3 : c3;
              return N.a.createElement("div", { className: w()("rdw-colorpicker-modal", n5), onClick: j }, N.a.createElement("span", { className: "rdw-colorpicker-modal-header" }, N.a.createElement("span", { className: w()("rdw-colorpicker-modal-style-label", { "rdw-colorpicker-modal-style-label-active": "color" === l2 }), onClick: u2.setCurrentStyleColor }, a3["components.controls.colorpicker.text"]), N.a.createElement("span", { className: w()("rdw-colorpicker-modal-style-label", { "rdw-colorpicker-modal-style-label-active": "bgcolor" === l2 }), onClick: u2.setCurrentStyleBgcolor }, a3["components.controls.colorpicker.background"])), N.a.createElement("span", { className: "rdw-colorpicker-modal-options" }, o4.map(function(t5, e5) {
                return N.a.createElement(R, { value: t5, key: e5, className: "rdw-colorpicker-option", activeClassName: "rdw-colorpicker-option-active", active: s2 === t5, onClick: u2.onChange }, N.a.createElement("span", { style: { backgroundColor: t5 }, className: "rdw-colorpicker-cube" }));
              })));
            }, u2;
          }
          return t2 = r3, (e2 = [{ key: "componentDidUpdate", value: function(t3) {
            this.props.expanded && !t3.expanded && this.setState({ currentStyle: "color" });
          } }, { key: "render", value: function() {
            var t3 = this.props, e3 = t3.config, n4 = e3.icon, o4 = e3.className, r4 = e3.title, i3 = t3.expanded, c3 = t3.onExpandEvent, a3 = t3.translations;
            return N.a.createElement("div", { className: "rdw-colorpicker-wrapper", "aria-haspopup": "true", "aria-expanded": i3, "aria-label": "rdw-color-picker", title: r4 || a3["components.controls.colorpicker.colorpicker"] }, N.a.createElement(R, { onClick: c3, className: w()(o4) }, N.a.createElement("img", { src: n4, alt: "" })), i3 ? this.renderModal() : void 0);
          } }]) && je(t2.prototype, e2), n3 && je(t2, n3), Object.defineProperty(t2, "prototype", { writable: false }), r3;
        }();
        Se.propTypes = { expanded: y.a.bool, onExpandEvent: y.a.func, onChange: y.a.func, config: y.a.object, currentState: y.a.object, translations: y.a.object };
        var we = Se;
        function Ce(t2) {
          return (Ce = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t3) {
            return typeof t3;
          } : function(t3) {
            return t3 && "function" == typeof Symbol && t3.constructor === Symbol && t3 !== Symbol.prototype ? "symbol" : typeof t3;
          })(t2);
        }
        function Le(t2, e2) {
          for (var n3 = 0; n3 < e2.length; n3++) {
            var o3 = e2[n3];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(t2, o3.key, o3);
          }
        }
        function De(t2, e2) {
          return (De = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t3, e3) {
            return t3.__proto__ = e3, t3;
          })(t2, e2);
        }
        function ke(o3) {
          var r3 = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct)
              return false;
            if (Reflect.construct.sham)
              return false;
            if ("function" == typeof Proxy)
              return true;
            try {
              return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
              })), true;
            } catch (t2) {
              return false;
            }
          }();
          return function() {
            var t2, e2 = Oe(o3);
            if (r3) {
              var n3 = Oe(this).constructor;
              t2 = Reflect.construct(e2, arguments, n3);
            } else
              t2 = e2.apply(this, arguments);
            return function(t3, e3) {
              {
                if (e3 && ("object" === Ce(e3) || "function" == typeof e3))
                  return e3;
                if (void 0 !== e3)
                  throw new TypeError("Derived constructors may only return object or undefined");
              }
              return function(t4) {
                if (void 0 !== t4)
                  return t4;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              }(t3);
            }(this, t2);
          };
        }
        function Oe(t2) {
          return (Oe = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t3) {
            return t3.__proto__ || Object.getPrototypeOf(t3);
          })(t2);
        }
        var xe = function() {
          !function(t3, e3) {
            if ("function" != typeof e3 && null !== e3)
              throw new TypeError("Super expression must either be null or a function");
            t3.prototype = Object.create(e3 && e3.prototype, { constructor: { value: t3, writable: true, configurable: true } }), Object.defineProperty(t3, "prototype", { writable: false }), e3 && De(t3, e3);
          }(i3, f["Component"]);
          var t2, e2, n3, r3 = ke(i3);
          function i3(t3) {
            var c3;
            !function(t4, e4) {
              if (!(t4 instanceof e4))
                throw new TypeError("Cannot call a class as a function");
            }(this, i3), (c3 = r3.call(this, t3)).state = { expanded: false, currentColor: void 0, currentBgColor: void 0 }, c3.onExpandEvent = function() {
              c3.signalExpanded = !c3.state.expanded;
            }, c3.expandCollapse = function() {
              c3.setState({ expanded: c3.signalExpanded }), c3.signalExpanded = false;
            }, c3.doExpand = function() {
              c3.setState({ expanded: true });
            }, c3.doCollapse = function() {
              c3.setState({ expanded: false });
            }, c3.toggleColor = function(t4, e4) {
              var n5 = c3.props, o4 = n5.editorState, r4 = n5.onChange, i4 = Object(S.toggleCustomInlineStyle)(o4, t4, e4);
              i4 && r4(i4), c3.doCollapse();
            };
            var e3 = t3.editorState, n4 = t3.modalHandler, o3 = { expanded: false, currentColor: void 0, currentBgColor: void 0 };
            return e3 && (o3.currentColor = Object(S.getSelectionCustomInlineStyle)(e3, ["COLOR"]).COLOR, o3.currentBgColor = Object(S.getSelectionCustomInlineStyle)(e3, ["BGCOLOR"]).BGCOLOR), c3.state = o3, n4.registerCallBack(c3.expandCollapse), c3;
          }
          return t2 = i3, (e2 = [{ key: "componentDidUpdate", value: function(t3) {
            var e3 = this.props.editorState;
            e3 && e3 !== t3.editorState && this.setState({ currentColor: Object(S.getSelectionCustomInlineStyle)(e3, ["COLOR"]).COLOR, currentBgColor: Object(S.getSelectionCustomInlineStyle)(e3, ["BGCOLOR"]).BGCOLOR });
          } }, { key: "componentWillUnmount", value: function() {
            this.props.modalHandler.deregisterCallBack(this.expandCollapse);
          } }, { key: "render", value: function() {
            var t3 = this.props, e3 = t3.config, n4 = t3.translations, o3 = this.state, r4 = o3.currentColor, i4 = o3.currentBgColor, c3 = o3.expanded, a3 = e3.component || we, l2 = r4 && r4.substring(6), s2 = i4 && i4.substring(8);
            return N.a.createElement(a3, { config: e3, translations: n4, onChange: this.toggleColor, expanded: c3, onExpandEvent: this.onExpandEvent, doExpand: this.doExpand, doCollapse: this.doCollapse, currentState: { color: l2, bgColor: s2 } });
          } }]) && Le(t2.prototype, e2), n3 && Le(t2, n3), Object.defineProperty(t2, "prototype", { writable: false }), i3;
        }();
        xe.propTypes = { onChange: y.a.func.isRequired, editorState: y.a.object.isRequired, modalHandler: y.a.object, config: y.a.object, translations: y.a.object };
        var Ie = xe, Te = n2(7), Ae = n2.n(Te);
        n2(26);
        function ze(t2) {
          return (ze = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t3) {
            return typeof t3;
          } : function(t3) {
            return t3 && "function" == typeof Symbol && t3.constructor === Symbol && t3 !== Symbol.prototype ? "symbol" : typeof t3;
          })(t2);
        }
        function _e(t2, e2) {
          for (var n3 = 0; n3 < e2.length; n3++) {
            var o3 = e2[n3];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(t2, o3.key, o3);
          }
        }
        function Pe(t2, e2) {
          return (Pe = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t3, e3) {
            return t3.__proto__ = e3, t3;
          })(t2, e2);
        }
        function Re(o3) {
          var r3 = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct)
              return false;
            if (Reflect.construct.sham)
              return false;
            if ("function" == typeof Proxy)
              return true;
            try {
              return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
              })), true;
            } catch (t2) {
              return false;
            }
          }();
          return function() {
            var t2, e2 = Ue(o3);
            if (r3) {
              var n3 = Ue(this).constructor;
              t2 = Reflect.construct(e2, arguments, n3);
            } else
              t2 = e2.apply(this, arguments);
            return function(t3, e3) {
              {
                if (e3 && ("object" === ze(e3) || "function" == typeof e3))
                  return e3;
                if (void 0 !== e3)
                  throw new TypeError("Derived constructors may only return object or undefined");
              }
              return function(t4) {
                if (void 0 !== t4)
                  return t4;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              }(t3);
            }(this, t2);
          };
        }
        function Ue(t2) {
          return (Ue = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t3) {
            return t3.__proto__ || Object.getPrototypeOf(t3);
          })(t2);
        }
        var Be = function() {
          !function(t3, e3) {
            if ("function" != typeof e3 && null !== e3)
              throw new TypeError("Super expression must either be null or a function");
            t3.prototype = Object.create(e3 && e3.prototype, { constructor: { value: t3, writable: true, configurable: true } }), Object.defineProperty(t3, "prototype", { writable: false }), e3 && Pe(t3, e3);
          }(r3, f["Component"]);
          var t2, e2, n3, o3 = Re(r3);
          function r3() {
            var c3;
            !function(t4, e4) {
              if (!(t4 instanceof e4))
                throw new TypeError("Cannot call a class as a function");
            }(this, r3);
            for (var t3 = arguments.length, e3 = new Array(t3), n4 = 0; n4 < t3; n4++)
              e3[n4] = arguments[n4];
            return (c3 = o3.call.apply(o3, [this].concat(e3))).state = { showModal: false, linkTarget: "", linkTitle: "", linkTargetOption: c3.props.config.defaultTargetOption }, c3.removeLink = function() {
              (0, c3.props.onChange)("unlink");
            }, c3.addLink = function() {
              var t4 = c3.props.onChange, e4 = c3.state;
              t4("link", e4.linkTitle, e4.linkTarget, e4.linkTargetOption);
            }, c3.updateValue = function(t4) {
              var e4, n5, o4;
              c3.setState((e4 = {}, n5 = "".concat(t4.target.name), o4 = t4.target.value, n5 in e4 ? Object.defineProperty(e4, n5, { value: o4, enumerable: true, configurable: true, writable: true }) : e4[n5] = o4, e4));
            }, c3.updateTargetOption = function(t4) {
              c3.setState({ linkTargetOption: t4.target.checked ? "_blank" : "_self" });
            }, c3.hideModal = function() {
              c3.setState({ showModal: false });
            }, c3.signalExpandShowModal = function() {
              var t4 = c3.props, e4 = t4.onExpandEvent, n5 = t4.currentState, o4 = n5.link, r4 = n5.selectionText, i3 = c3.state.linkTargetOption;
              e4(), c3.setState({ showModal: true, linkTarget: o4 && o4.target || "", linkTargetOption: o4 && o4.targetOption || i3, linkTitle: o4 && o4.title || r4 });
            }, c3.forceExpandAndShowModal = function() {
              var t4 = c3.props, e4 = t4.doExpand, n5 = t4.currentState, o4 = n5.link, r4 = n5.selectionText, i3 = c3.state.linkTargetOption;
              e4(), c3.setState({ showModal: true, linkTarget: o4 && o4.target, linkTargetOption: o4 && o4.targetOption || i3, linkTitle: o4 && o4.title || r4 });
            }, c3;
          }
          return t2 = r3, (e2 = [{ key: "componentDidUpdate", value: function(t3) {
            t3.expanded && !this.props.expanded && this.setState({ showModal: false, linkTarget: "", linkTitle: "", linkTargetOption: this.props.config.defaultTargetOption });
          } }, { key: "renderAddLinkModal", value: function() {
            var t3 = this.props, e3 = t3.config.popupClassName, n4 = t3.doCollapse, o4 = t3.translations, r4 = this.state, i3 = r4.linkTitle, c3 = r4.linkTarget, a3 = r4.linkTargetOption;
            return N.a.createElement("div", { className: w()("rdw-link-modal", e3), onClick: j }, N.a.createElement("label", { className: "rdw-link-modal-label", htmlFor: "linkTitle" }, o4["components.controls.link.linkTitle"]), N.a.createElement("input", { id: "linkTitle", className: "rdw-link-modal-input", onChange: this.updateValue, onBlur: this.updateValue, name: "linkTitle", value: i3 }), N.a.createElement("label", { className: "rdw-link-modal-label", htmlFor: "linkTarget" }, o4["components.controls.link.linkTarget"]), N.a.createElement("input", { id: "linkTarget", className: "rdw-link-modal-input", onChange: this.updateValue, onBlur: this.updateValue, name: "linkTarget", value: c3 }), N.a.createElement("label", { className: "rdw-link-modal-target-option", htmlFor: "openLinkInNewWindow" }, N.a.createElement("input", { id: "openLinkInNewWindow", type: "checkbox", defaultChecked: "_blank" === a3, value: "_blank", onChange: this.updateTargetOption }), N.a.createElement("span", null, o4["components.controls.link.linkTargetOption"])), N.a.createElement("span", { className: "rdw-link-modal-buttonsection" }, N.a.createElement("button", { className: "rdw-link-modal-btn", onClick: this.addLink, disabled: !c3 || !i3 }, o4["generic.add"]), N.a.createElement("button", { className: "rdw-link-modal-btn", onClick: n4 }, o4["generic.cancel"])));
          } }, { key: "renderInFlatList", value: function() {
            var t3 = this.props, e3 = t3.config, n4 = e3.options, o4 = e3.link, r4 = e3.unlink, i3 = e3.className, c3 = t3.currentState, a3 = t3.expanded, l2 = t3.translations, s2 = this.state.showModal;
            return N.a.createElement("div", { className: w()("rdw-link-wrapper", i3), "aria-label": "rdw-link-control" }, 0 <= n4.indexOf("link") && N.a.createElement(R, { value: "unordered-list-item", className: w()(o4.className), onClick: this.signalExpandShowModal, "aria-haspopup": "true", "aria-expanded": s2, title: o4.title || l2["components.controls.link.link"] }, N.a.createElement("img", { src: o4.icon, alt: "" })), 0 <= n4.indexOf("unlink") && N.a.createElement(R, { disabled: !c3.link, value: "ordered-list-item", className: w()(r4.className), onClick: this.removeLink, title: r4.title || l2["components.controls.link.unlink"] }, N.a.createElement("img", { src: r4.icon, alt: "" })), a3 && s2 ? this.renderAddLinkModal() : void 0);
          } }, { key: "renderInDropDown", value: function() {
            var t3 = this.props, e3 = t3.expanded, n4 = t3.onExpandEvent, o4 = t3.doCollapse, r4 = t3.doExpand, i3 = t3.onChange, c3 = t3.config, a3 = t3.currentState, l2 = t3.translations, s2 = c3.options, u2 = c3.link, p2 = c3.unlink, d2 = c3.className, f2 = c3.dropdownClassName, y2 = c3.title, m2 = this.state.showModal;
            return N.a.createElement("div", { className: "rdw-link-wrapper", "aria-haspopup": "true", "aria-label": "rdw-link-control", "aria-expanded": e3, title: y2 }, N.a.createElement(H, { className: w()("rdw-link-dropdown", d2), optionWrapperClassName: w()(f2), onChange: i3, expanded: e3 && !m2, doExpand: r4, doCollapse: o4, onExpandEvent: n4 }, N.a.createElement("img", { src: v(c3), alt: "" }), 0 <= s2.indexOf("link") && N.a.createElement(K, { onClick: this.forceExpandAndShowModal, className: w()("rdw-link-dropdownoption", u2.className), title: u2.title || l2["components.controls.link.link"] }, N.a.createElement("img", { src: u2.icon, alt: "" })), 0 <= s2.indexOf("unlink") && N.a.createElement(K, { onClick: this.removeLink, disabled: !a3.link, className: w()("rdw-link-dropdownoption", p2.className), title: p2.title || l2["components.controls.link.unlink"] }, N.a.createElement("img", { src: p2.icon, alt: "" }))), e3 && m2 ? this.renderAddLinkModal() : void 0);
          } }, { key: "render", value: function() {
            return this.props.config.inDropdown ? this.renderInDropDown() : this.renderInFlatList();
          } }]) && _e(t2.prototype, e2), n3 && _e(t2, n3), Object.defineProperty(t2, "prototype", { writable: false }), r3;
        }();
        Be.propTypes = { expanded: y.a.bool, doExpand: y.a.func, doCollapse: y.a.func, onExpandEvent: y.a.func, config: y.a.object, onChange: y.a.func, currentState: y.a.object, translations: y.a.object };
        var Fe = Be;
        function Ye(t2) {
          return (Ye = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t3) {
            return typeof t3;
          } : function(t3) {
            return t3 && "function" == typeof Symbol && t3.constructor === Symbol && t3 !== Symbol.prototype ? "symbol" : typeof t3;
          })(t2);
        }
        function Qe(t2, e2) {
          for (var n3 = 0; n3 < e2.length; n3++) {
            var o3 = e2[n3];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(t2, o3.key, o3);
          }
        }
        function He(t2, e2) {
          return (He = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t3, e3) {
            return t3.__proto__ = e3, t3;
          })(t2, e2);
        }
        function Ze(o3) {
          var r3 = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct)
              return false;
            if (Reflect.construct.sham)
              return false;
            if ("function" == typeof Proxy)
              return true;
            try {
              return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
              })), true;
            } catch (t2) {
              return false;
            }
          }();
          return function() {
            var t2, e2 = We(o3);
            if (r3) {
              var n3 = We(this).constructor;
              t2 = Reflect.construct(e2, arguments, n3);
            } else
              t2 = e2.apply(this, arguments);
            return function(t3, e3) {
              {
                if (e3 && ("object" === Ye(e3) || "function" == typeof e3))
                  return e3;
                if (void 0 !== e3)
                  throw new TypeError("Derived constructors may only return object or undefined");
              }
              return function(t4) {
                if (void 0 !== t4)
                  return t4;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              }(t3);
            }(this, t2);
          };
        }
        function We(t2) {
          return (We = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t3) {
            return t3.__proto__ || Object.getPrototypeOf(t3);
          })(t2);
        }
        function Ge(e2, t2) {
          var n3 = Object.keys(e2);
          if (Object.getOwnPropertySymbols) {
            var o3 = Object.getOwnPropertySymbols(e2);
            t2 && (o3 = o3.filter(function(t3) {
              return Object.getOwnPropertyDescriptor(e2, t3).enumerable;
            })), n3.push.apply(n3, o3);
          }
          return n3;
        }
        function Je(e2) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var n3 = null != arguments[t2] ? arguments[t2] : {};
            t2 % 2 ? Ge(Object(n3), true).forEach(function(t3) {
              Ve(e2, t3, n3[t3]);
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(n3)) : Ge(Object(n3)).forEach(function(t3) {
              Object.defineProperty(e2, t3, Object.getOwnPropertyDescriptor(n3, t3));
            });
          }
          return e2;
        }
        function Ve(t2, e2, n3) {
          return e2 in t2 ? Object.defineProperty(t2, e2, { value: n3, enumerable: true, configurable: true, writable: true }) : t2[e2] = n3, t2;
        }
        function qe(t2) {
          var e2 = Ke.match(t2.target);
          return Je(Je({}, t2), {}, { target: e2 && e2[0] && e2[0].url || t2.target });
        }
        var Ke = Ae()(), Xe = function() {
          !function(t3, e3) {
            if ("function" != typeof e3 && null !== e3)
              throw new TypeError("Super expression must either be null or a function");
            t3.prototype = Object.create(e3 && e3.prototype, { constructor: { value: t3, writable: true, configurable: true } }), Object.defineProperty(t3, "prototype", { writable: false }), e3 && He(t3, e3);
          }(i3, f["Component"]);
          var t2, e2, n3, r3 = Ze(i3);
          function i3(t3) {
            var d2;
            !function(t4, e4) {
              if (!(t4 instanceof e4))
                throw new TypeError("Cannot call a class as a function");
            }(this, i3), (d2 = r3.call(this, t3)).onExpandEvent = function() {
              d2.signalExpanded = !d2.state.expanded;
            }, d2.onChange = function(t4, e4, n5, o4) {
              var r4 = d2.props.config.linkCallback;
              if ("link" === t4) {
                var i4 = (r4 || qe)({ title: e4, target: n5, targetOption: o4 });
                d2.addLink(i4.title, i4.target, i4.targetOption);
              } else
                d2.removeLink();
            }, d2.getCurrentValues = function() {
              var t4 = d2.props.editorState, e4 = d2.state.currentEntity, n5 = t4.getCurrentContent(), o4 = {};
              if (e4 && "LINK" === n5.getEntity(e4).get("type")) {
                o4.link = {};
                var r4 = e4 && Object(S.getEntityRange)(t4, e4);
                o4.link.target = e4 && n5.getEntity(e4).get("data").url, o4.link.targetOption = e4 && n5.getEntity(e4).get("data").targetOption, o4.link.title = r4 && r4.text;
              }
              return o4.selectionText = Object(S.getSelectionText)(t4), o4;
            }, d2.doExpand = function() {
              d2.setState({ expanded: true });
            }, d2.expandCollapse = function() {
              d2.setState({ expanded: d2.signalExpanded }), d2.signalExpanded = false;
            }, d2.doCollapse = function() {
              d2.setState({ expanded: false });
            }, d2.removeLink = function() {
              var t4 = d2.props, e4 = t4.editorState, n5 = t4.onChange, o4 = d2.state.currentEntity, r4 = e4.getSelection();
              if (o4) {
                var i4 = Object(S.getEntityRange)(e4, o4);
                r4 = r4.getIsBackward() ? r4.merge({ anchorOffset: i4.end, focusOffset: i4.start }) : r4.merge({ anchorOffset: i4.start, focusOffset: i4.end }), n5(E.RichUtils.toggleLink(e4, r4, null));
              }
            }, d2.addLink = function(t4, e4, n5) {
              var o4 = d2.props, r4 = o4.editorState, i4 = o4.onChange, c3 = d2.state.currentEntity, a3 = r4.getSelection();
              if (c3) {
                var l2 = Object(S.getEntityRange)(r4, c3);
                a3 = a3.getIsBackward() ? a3.merge({ anchorOffset: l2.end, focusOffset: l2.start }) : a3.merge({ anchorOffset: l2.start, focusOffset: l2.end });
              }
              var s2 = r4.getCurrentContent().createEntity("LINK", "MUTABLE", { url: e4, targetOption: n5 }).getLastCreatedEntityKey(), u2 = E.Modifier.replaceText(r4.getCurrentContent(), a3, "".concat(t4), r4.getCurrentInlineStyle(), s2), p2 = E.EditorState.push(r4, u2, "insert-characters");
              a3 = p2.getSelection().merge({ anchorOffset: a3.get("anchorOffset") + t4.length, focusOffset: a3.get("anchorOffset") + t4.length }), p2 = E.EditorState.acceptSelection(p2, a3), u2 = E.Modifier.insertText(p2.getCurrentContent(), a3, " ", p2.getCurrentInlineStyle(), void 0), i4(E.EditorState.push(p2, u2, "insert-characters")), d2.doCollapse();
            };
            var e3 = d2.props, n4 = e3.editorState, o3 = e3.modalHandler;
            return d2.state = { expanded: false, link: void 0, selectionText: void 0, currentEntity: n4 ? Object(S.getSelectionEntity)(n4) : void 0 }, o3.registerCallBack(d2.expandCollapse), d2;
          }
          return t2 = i3, (e2 = [{ key: "componentDidUpdate", value: function(t3) {
            var e3 = this.props.editorState;
            e3 && e3 !== t3.editorState && this.setState({ currentEntity: Object(S.getSelectionEntity)(e3) });
          } }, { key: "componentWillUnmount", value: function() {
            this.props.modalHandler.deregisterCallBack(this.expandCollapse);
          } }, { key: "render", value: function() {
            var t3 = this.props, e3 = t3.config, n4 = t3.translations, o3 = this.state.expanded, r4 = this.getCurrentValues(), i4 = r4.link, c3 = r4.selectionText, a3 = e3.component || Fe;
            return N.a.createElement(a3, { config: e3, translations: n4, expanded: o3, onExpandEvent: this.onExpandEvent, doExpand: this.doExpand, doCollapse: this.doCollapse, currentState: { link: i4, selectionText: c3 }, onChange: this.onChange });
          } }]) && Qe(t2.prototype, e2), n3 && Qe(t2, n3), Object.defineProperty(t2, "prototype", { writable: false }), i3;
        }();
        Xe.propTypes = { editorState: y.a.object.isRequired, onChange: y.a.func.isRequired, modalHandler: y.a.object, config: y.a.object, translations: y.a.object };
        var $e = Xe;
        n2(27);
        function tn(t2) {
          return (tn = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t3) {
            return typeof t3;
          } : function(t3) {
            return t3 && "function" == typeof Symbol && t3.constructor === Symbol && t3 !== Symbol.prototype ? "symbol" : typeof t3;
          })(t2);
        }
        function en(t2, e2) {
          for (var n3 = 0; n3 < e2.length; n3++) {
            var o3 = e2[n3];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(t2, o3.key, o3);
          }
        }
        function nn(t2, e2) {
          return (nn = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t3, e3) {
            return t3.__proto__ = e3, t3;
          })(t2, e2);
        }
        function on(o3) {
          var r3 = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct)
              return false;
            if (Reflect.construct.sham)
              return false;
            if ("function" == typeof Proxy)
              return true;
            try {
              return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
              })), true;
            } catch (t2) {
              return false;
            }
          }();
          return function() {
            var t2, e2 = rn(o3);
            if (r3) {
              var n3 = rn(this).constructor;
              t2 = Reflect.construct(e2, arguments, n3);
            } else
              t2 = e2.apply(this, arguments);
            return function(t3, e3) {
              {
                if (e3 && ("object" === tn(e3) || "function" == typeof e3))
                  return e3;
                if (void 0 !== e3)
                  throw new TypeError("Derived constructors may only return object or undefined");
              }
              return function(t4) {
                if (void 0 !== t4)
                  return t4;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              }(t3);
            }(this, t2);
          };
        }
        function rn(t2) {
          return (rn = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t3) {
            return t3.__proto__ || Object.getPrototypeOf(t3);
          })(t2);
        }
        var cn = function() {
          !function(t3, e3) {
            if ("function" != typeof e3 && null !== e3)
              throw new TypeError("Super expression must either be null or a function");
            t3.prototype = Object.create(e3 && e3.prototype, { constructor: { value: t3, writable: true, configurable: true } }), Object.defineProperty(t3, "prototype", { writable: false }), e3 && nn(t3, e3);
          }(i3, f["Component"]);
          var t2, e2, n3, o3 = on(i3);
          function i3() {
            var r3;
            !function(t4, e4) {
              if (!(t4 instanceof e4))
                throw new TypeError("Cannot call a class as a function");
            }(this, i3);
            for (var t3 = arguments.length, e3 = new Array(t3), n4 = 0; n4 < t3; n4++)
              e3[n4] = arguments[n4];
            return (r3 = o3.call.apply(o3, [this].concat(e3))).state = { embeddedLink: "", height: r3.props.config.defaultSize.height, width: r3.props.config.defaultSize.width }, r3.onChange = function() {
              var t4 = r3.props.onChange, e4 = r3.state;
              t4(e4.embeddedLink, e4.height, e4.width);
            }, r3.updateValue = function(t4) {
              var e4, n5, o4;
              r3.setState((e4 = {}, n5 = "".concat(t4.target.name), o4 = t4.target.value, n5 in e4 ? Object.defineProperty(e4, n5, { value: o4, enumerable: true, configurable: true, writable: true }) : e4[n5] = o4, e4));
            }, r3;
          }
          return t2 = i3, (e2 = [{ key: "componentDidUpdate", value: function(t3) {
            var e3 = this.props, n4 = e3.expanded, o4 = e3.config;
            if (!n4 && t3.expanded) {
              var r3 = o4.defaultSize, i4 = r3.height, c3 = r3.width;
              this.setState({ embeddedLink: "", height: i4, width: c3 });
            }
          } }, { key: "rendeEmbeddedLinkModal", value: function() {
            var t3 = this.state, e3 = t3.embeddedLink, n4 = t3.height, o4 = t3.width, r3 = this.props, i4 = r3.config.popupClassName, c3 = r3.doCollapse, a3 = r3.translations;
            return N.a.createElement("div", { className: w()("rdw-embedded-modal", i4), onClick: j }, N.a.createElement("div", { className: "rdw-embedded-modal-header" }, N.a.createElement("span", { className: "rdw-embedded-modal-header-option" }, a3["components.controls.embedded.embeddedlink"], N.a.createElement("span", { className: "rdw-embedded-modal-header-label" }))), N.a.createElement("div", { className: "rdw-embedded-modal-link-section" }, N.a.createElement("span", { className: "rdw-embedded-modal-link-input-wrapper" }, N.a.createElement("input", { className: "rdw-embedded-modal-link-input", placeholder: a3["components.controls.embedded.enterlink"], onChange: this.updateValue, onBlur: this.updateValue, value: e3, name: "embeddedLink" }), N.a.createElement("span", { className: "rdw-image-mandatory-sign" }, "*")), N.a.createElement("div", { className: "rdw-embedded-modal-size" }, N.a.createElement("span", null, N.a.createElement("input", { onChange: this.updateValue, onBlur: this.updateValue, value: n4, name: "height", className: "rdw-embedded-modal-size-input", placeholder: "Height" }), N.a.createElement("span", { className: "rdw-image-mandatory-sign" }, "*")), N.a.createElement("span", null, N.a.createElement("input", { onChange: this.updateValue, onBlur: this.updateValue, value: o4, name: "width", className: "rdw-embedded-modal-size-input", placeholder: "Width" }), N.a.createElement("span", { className: "rdw-image-mandatory-sign" }, "*")))), N.a.createElement("span", { className: "rdw-embedded-modal-btn-section" }, N.a.createElement("button", { type: "button", className: "rdw-embedded-modal-btn", onClick: this.onChange, disabled: !e3 || !n4 || !o4 }, a3["generic.add"]), N.a.createElement("button", { type: "button", className: "rdw-embedded-modal-btn", onClick: c3 }, a3["generic.cancel"])));
          } }, { key: "render", value: function() {
            var t3 = this.props, e3 = t3.config, n4 = e3.icon, o4 = e3.className, r3 = e3.title, i4 = t3.expanded, c3 = t3.onExpandEvent, a3 = t3.translations;
            return N.a.createElement("div", { className: "rdw-embedded-wrapper", "aria-haspopup": "true", "aria-expanded": i4, "aria-label": "rdw-embedded-control" }, N.a.createElement(R, { className: w()(o4), value: "unordered-list-item", onClick: c3, title: r3 || a3["components.controls.embedded.embedded"] }, N.a.createElement("img", { src: n4, alt: "" })), i4 ? this.rendeEmbeddedLinkModal() : void 0);
          } }]) && en(t2.prototype, e2), n3 && en(t2, n3), Object.defineProperty(t2, "prototype", { writable: false }), i3;
        }();
        cn.propTypes = { expanded: y.a.bool, onExpandEvent: y.a.func, onChange: y.a.func, config: y.a.object, translations: y.a.object, doCollapse: y.a.func };
        var an = cn;
        function ln(t2) {
          return (ln = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t3) {
            return typeof t3;
          } : function(t3) {
            return t3 && "function" == typeof Symbol && t3.constructor === Symbol && t3 !== Symbol.prototype ? "symbol" : typeof t3;
          })(t2);
        }
        function sn(t2, e2) {
          for (var n3 = 0; n3 < e2.length; n3++) {
            var o3 = e2[n3];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(t2, o3.key, o3);
          }
        }
        function un(t2, e2) {
          return (un = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t3, e3) {
            return t3.__proto__ = e3, t3;
          })(t2, e2);
        }
        function pn(o3) {
          var r3 = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct)
              return false;
            if (Reflect.construct.sham)
              return false;
            if ("function" == typeof Proxy)
              return true;
            try {
              return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
              })), true;
            } catch (t2) {
              return false;
            }
          }();
          return function() {
            var t2, e2 = dn(o3);
            if (r3) {
              var n3 = dn(this).constructor;
              t2 = Reflect.construct(e2, arguments, n3);
            } else
              t2 = e2.apply(this, arguments);
            return function(t3, e3) {
              {
                if (e3 && ("object" === ln(e3) || "function" == typeof e3))
                  return e3;
                if (void 0 !== e3)
                  throw new TypeError("Derived constructors may only return object or undefined");
              }
              return function(t4) {
                if (void 0 !== t4)
                  return t4;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              }(t3);
            }(this, t2);
          };
        }
        function dn(t2) {
          return (dn = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t3) {
            return t3.__proto__ || Object.getPrototypeOf(t3);
          })(t2);
        }
        var fn = function() {
          !function(t3, e3) {
            if ("function" != typeof e3 && null !== e3)
              throw new TypeError("Super expression must either be null or a function");
            t3.prototype = Object.create(e3 && e3.prototype, { constructor: { value: t3, writable: true, configurable: true } }), Object.defineProperty(t3, "prototype", { writable: false }), e3 && un(t3, e3);
          }(r3, f["Component"]);
          var t2, e2, n3, o3 = pn(r3);
          function r3() {
            var s2;
            !function(t4, e4) {
              if (!(t4 instanceof e4))
                throw new TypeError("Cannot call a class as a function");
            }(this, r3);
            for (var t3 = arguments.length, e3 = new Array(t3), n4 = 0; n4 < t3; n4++)
              e3[n4] = arguments[n4];
            return (s2 = o3.call.apply(o3, [this].concat(e3))).state = { expanded: false }, s2.onExpandEvent = function() {
              s2.signalExpanded = !s2.state.expanded;
            }, s2.expandCollapse = function() {
              s2.setState({ expanded: s2.signalExpanded }), s2.signalExpanded = false;
            }, s2.doExpand = function() {
              s2.setState({ expanded: true });
            }, s2.doCollapse = function() {
              s2.setState({ expanded: false });
            }, s2.addEmbeddedLink = function(t4, e4, n5) {
              var o4 = s2.props, r4 = o4.editorState, i3 = o4.onChange, c3 = o4.config.embedCallback, a3 = c3 ? c3(t4) : t4, l2 = r4.getCurrentContent().createEntity("EMBEDDED_LINK", "MUTABLE", { src: a3, height: e4, width: n5 }).getLastCreatedEntityKey();
              i3(E.AtomicBlockUtils.insertAtomicBlock(r4, l2, " ")), s2.doCollapse();
            }, s2;
          }
          return t2 = r3, (e2 = [{ key: "componentDidMount", value: function() {
            this.props.modalHandler.registerCallBack(this.expandCollapse);
          } }, { key: "componentWillUnmount", value: function() {
            this.props.modalHandler.deregisterCallBack(this.expandCollapse);
          } }, { key: "render", value: function() {
            var t3 = this.props, e3 = t3.config, n4 = t3.translations, o4 = this.state.expanded, r4 = e3.component || an;
            return N.a.createElement(r4, { config: e3, translations: n4, onChange: this.addEmbeddedLink, expanded: o4, onExpandEvent: this.onExpandEvent, doExpand: this.doExpand, doCollapse: this.doCollapse });
          } }]) && sn(t2.prototype, e2), n3 && sn(t2, n3), Object.defineProperty(t2, "prototype", { writable: false }), r3;
        }();
        fn.propTypes = { editorState: y.a.object.isRequired, onChange: y.a.func.isRequired, modalHandler: y.a.object, config: y.a.object, translations: y.a.object };
        var yn = fn;
        n2(28);
        function mn(t2) {
          return (mn = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t3) {
            return typeof t3;
          } : function(t3) {
            return t3 && "function" == typeof Symbol && t3.constructor === Symbol && t3 !== Symbol.prototype ? "symbol" : typeof t3;
          })(t2);
        }
        function gn(t2, e2) {
          for (var n3 = 0; n3 < e2.length; n3++) {
            var o3 = e2[n3];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(t2, o3.key, o3);
          }
        }
        function bn(t2, e2) {
          return (bn = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t3, e3) {
            return t3.__proto__ = e3, t3;
          })(t2, e2);
        }
        function hn(o3) {
          var r3 = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct)
              return false;
            if (Reflect.construct.sham)
              return false;
            if ("function" == typeof Proxy)
              return true;
            try {
              return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
              })), true;
            } catch (t2) {
              return false;
            }
          }();
          return function() {
            var t2, e2 = Mn(o3);
            if (r3) {
              var n3 = Mn(this).constructor;
              t2 = Reflect.construct(e2, arguments, n3);
            } else
              t2 = e2.apply(this, arguments);
            return function(t3, e3) {
              {
                if (e3 && ("object" === mn(e3) || "function" == typeof e3))
                  return e3;
                if (void 0 !== e3)
                  throw new TypeError("Derived constructors may only return object or undefined");
              }
              return function(t4) {
                if (void 0 !== t4)
                  return t4;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              }(t3);
            }(this, t2);
          };
        }
        function Mn(t2) {
          return (Mn = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t3) {
            return t3.__proto__ || Object.getPrototypeOf(t3);
          })(t2);
        }
        var jn = function() {
          !function(t3, e3) {
            if ("function" != typeof e3 && null !== e3)
              throw new TypeError("Super expression must either be null or a function");
            t3.prototype = Object.create(e3 && e3.prototype, { constructor: { value: t3, writable: true, configurable: true } }), Object.defineProperty(t3, "prototype", { writable: false }), e3 && bn(t3, e3);
          }(i3, f["Component"]);
          var t2, e2, n3, r3 = hn(i3);
          function i3() {
            var e3;
            !function(t4, e4) {
              if (!(t4 instanceof e4))
                throw new TypeError("Cannot call a class as a function");
            }(this, i3);
            for (var t3 = arguments.length, n4 = new Array(t3), o3 = 0; o3 < t3; o3++)
              n4[o3] = arguments[o3];
            return (e3 = r3.call.apply(r3, [this].concat(n4))).onChange = function(t4) {
              (0, e3.props.onChange)(t4.target.innerHTML);
            }, e3;
          }
          return t2 = i3, (e2 = [{ key: "renderEmojiModal", value: function() {
            var n4 = this, t3 = this.props.config, e3 = t3.popupClassName, o3 = t3.emojis;
            return N.a.createElement("div", { className: w()("rdw-emoji-modal", e3), onClick: j }, o3.map(function(t4, e4) {
              return N.a.createElement("span", { key: e4, className: "rdw-emoji-icon", alt: "", onClick: n4.onChange }, t4);
            }));
          } }, { key: "render", value: function() {
            var t3 = this.props, e3 = t3.config, n4 = e3.icon, o3 = e3.className, r4 = e3.title, i4 = t3.expanded, c3 = t3.onExpandEvent, a3 = t3.translations;
            return N.a.createElement("div", { className: "rdw-emoji-wrapper", "aria-haspopup": "true", "aria-label": "rdw-emoji-control", "aria-expanded": i4, title: r4 || a3["components.controls.emoji.emoji"] }, N.a.createElement(R, { className: w()(o3), value: "unordered-list-item", onClick: c3 }, N.a.createElement("img", { src: n4, alt: "" })), i4 ? this.renderEmojiModal() : void 0);
          } }]) && gn(t2.prototype, e2), n3 && gn(t2, n3), Object.defineProperty(t2, "prototype", { writable: false }), i3;
        }();
        jn.propTypes = { expanded: y.a.bool, onExpandEvent: y.a.func, onChange: y.a.func, config: y.a.object, translations: y.a.object };
        var vn = jn;
        function Nn(t2) {
          return (Nn = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t3) {
            return typeof t3;
          } : function(t3) {
            return t3 && "function" == typeof Symbol && t3.constructor === Symbol && t3 !== Symbol.prototype ? "symbol" : typeof t3;
          })(t2);
        }
        function En(t2, e2) {
          for (var n3 = 0; n3 < e2.length; n3++) {
            var o3 = e2[n3];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(t2, o3.key, o3);
          }
        }
        function Sn(t2, e2) {
          return (Sn = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t3, e3) {
            return t3.__proto__ = e3, t3;
          })(t2, e2);
        }
        function wn(o3) {
          var r3 = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct)
              return false;
            if (Reflect.construct.sham)
              return false;
            if ("function" == typeof Proxy)
              return true;
            try {
              return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
              })), true;
            } catch (t2) {
              return false;
            }
          }();
          return function() {
            var t2, e2 = Cn(o3);
            if (r3) {
              var n3 = Cn(this).constructor;
              t2 = Reflect.construct(e2, arguments, n3);
            } else
              t2 = e2.apply(this, arguments);
            return function(t3, e3) {
              {
                if (e3 && ("object" === Nn(e3) || "function" == typeof e3))
                  return e3;
                if (void 0 !== e3)
                  throw new TypeError("Derived constructors may only return object or undefined");
              }
              return function(t4) {
                if (void 0 !== t4)
                  return t4;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              }(t3);
            }(this, t2);
          };
        }
        function Cn(t2) {
          return (Cn = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t3) {
            return t3.__proto__ || Object.getPrototypeOf(t3);
          })(t2);
        }
        var Ln = function() {
          !function(t3, e3) {
            if ("function" != typeof e3 && null !== e3)
              throw new TypeError("Super expression must either be null or a function");
            t3.prototype = Object.create(e3 && e3.prototype, { constructor: { value: t3, writable: true, configurable: true } }), Object.defineProperty(t3, "prototype", { writable: false }), e3 && Sn(t3, e3);
          }(r3, f["Component"]);
          var t2, e2, n3, o3 = wn(r3);
          function r3() {
            var i3;
            !function(t4, e4) {
              if (!(t4 instanceof e4))
                throw new TypeError("Cannot call a class as a function");
            }(this, r3);
            for (var t3 = arguments.length, e3 = new Array(t3), n4 = 0; n4 < t3; n4++)
              e3[n4] = arguments[n4];
            return (i3 = o3.call.apply(o3, [this].concat(e3))).state = { expanded: false }, i3.onExpandEvent = function() {
              i3.signalExpanded = !i3.state.expanded;
            }, i3.expandCollapse = function() {
              i3.setState({ expanded: i3.signalExpanded }), i3.signalExpanded = false;
            }, i3.doExpand = function() {
              i3.setState({ expanded: true });
            }, i3.doCollapse = function() {
              i3.setState({ expanded: false });
            }, i3.addEmoji = function(t4) {
              var e4 = i3.props, n5 = e4.editorState, o4 = e4.onChange, r4 = E.Modifier.replaceText(n5.getCurrentContent(), n5.getSelection(), t4, n5.getCurrentInlineStyle());
              o4(E.EditorState.push(n5, r4, "insert-characters")), i3.doCollapse();
            }, i3;
          }
          return t2 = r3, (e2 = [{ key: "componentDidMount", value: function() {
            this.props.modalHandler.registerCallBack(this.expandCollapse);
          } }, { key: "componentWillUnmount", value: function() {
            this.props.modalHandler.deregisterCallBack(this.expandCollapse);
          } }, { key: "render", value: function() {
            var t3 = this.props, e3 = t3.config, n4 = t3.translations, o4 = this.state.expanded, r4 = e3.component || vn;
            return N.a.createElement(r4, { config: e3, translations: n4, onChange: this.addEmoji, expanded: o4, onExpandEvent: this.onExpandEvent, doExpand: this.doExpand, doCollapse: this.doCollapse, onCollpase: this.closeModal });
          } }]) && En(t2.prototype, e2), n3 && En(t2, n3), Object.defineProperty(t2, "prototype", { writable: false }), r3;
        }();
        Ln.propTypes = { editorState: y.a.object.isRequired, onChange: y.a.func.isRequired, modalHandler: y.a.object, config: y.a.object, translations: y.a.object };
        function Dn() {
          return N.a.createElement("div", { className: "rdw-spinner" }, N.a.createElement("div", { className: "rdw-bounce1" }), N.a.createElement("div", { className: "rdw-bounce2" }), N.a.createElement("div", { className: "rdw-bounce3" }));
        }
        n2(29), n2(30);
        function kn(t2) {
          return (kn = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t3) {
            return typeof t3;
          } : function(t3) {
            return t3 && "function" == typeof Symbol && t3.constructor === Symbol && t3 !== Symbol.prototype ? "symbol" : typeof t3;
          })(t2);
        }
        function On(t2, e2) {
          for (var n3 = 0; n3 < e2.length; n3++) {
            var o3 = e2[n3];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(t2, o3.key, o3);
          }
        }
        function xn(t2, e2) {
          return (xn = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t3, e3) {
            return t3.__proto__ = e3, t3;
          })(t2, e2);
        }
        function In(o3) {
          var r3 = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct)
              return false;
            if (Reflect.construct.sham)
              return false;
            if ("function" == typeof Proxy)
              return true;
            try {
              return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
              })), true;
            } catch (t2) {
              return false;
            }
          }();
          return function() {
            var t2, e2 = Tn(o3);
            if (r3) {
              var n3 = Tn(this).constructor;
              t2 = Reflect.construct(e2, arguments, n3);
            } else
              t2 = e2.apply(this, arguments);
            return function(t3, e3) {
              {
                if (e3 && ("object" === kn(e3) || "function" == typeof e3))
                  return e3;
                if (void 0 !== e3)
                  throw new TypeError("Derived constructors may only return object or undefined");
              }
              return function(t4) {
                if (void 0 !== t4)
                  return t4;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              }(t3);
            }(this, t2);
          };
        }
        function Tn(t2) {
          return (Tn = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t3) {
            return t3.__proto__ || Object.getPrototypeOf(t3);
          })(t2);
        }
        var An = function() {
          !function(t3, e3) {
            if ("function" != typeof e3 && null !== e3)
              throw new TypeError("Super expression must either be null or a function");
            t3.prototype = Object.create(e3 && e3.prototype, { constructor: { value: t3, writable: true, configurable: true } }), Object.defineProperty(t3, "prototype", { writable: false }), e3 && xn(t3, e3);
          }(r3, f["Component"]);
          var t2, e2, n3, o3 = In(r3);
          function r3() {
            var a3;
            !function(t4, e4) {
              if (!(t4 instanceof e4))
                throw new TypeError("Cannot call a class as a function");
            }(this, r3);
            for (var t3 = arguments.length, e3 = new Array(t3), n4 = 0; n4 < t3; n4++)
              e3[n4] = arguments[n4];
            return (a3 = o3.call.apply(o3, [this].concat(e3))).state = { imgSrc: "", dragEnter: false, uploadHighlighted: a3.props.config.uploadEnabled && !!a3.props.config.uploadCallback, showImageLoading: false, height: a3.props.config.defaultSize.height, width: a3.props.config.defaultSize.width, alt: "" }, a3.onDragEnter = function(t4) {
              a3.stopPropagation(t4), a3.setState({ dragEnter: true });
            }, a3.onImageDrop = function(t4) {
              var e4, n5;
              t4.preventDefault(), t4.stopPropagation(), a3.setState({ dragEnter: false }), n5 = t4.dataTransfer.items ? (e4 = t4.dataTransfer.items, true) : (e4 = t4.dataTransfer.files, false);
              for (var o4 = 0; o4 < e4.length; o4 += 1)
                if ((!n5 || "file" === e4[o4].kind) && e4[o4].type.match("^image/")) {
                  var r4 = n5 ? e4[o4].getAsFile() : e4[o4];
                  a3.uploadImage(r4);
                }
            }, a3.showImageUploadOption = function() {
              a3.setState({ uploadHighlighted: true });
            }, a3.addImageFromState = function() {
              var t4 = a3.state, e4 = t4.imgSrc, n5 = t4.alt, o4 = a3.state, r4 = o4.height, i3 = o4.width, c3 = a3.props.onChange;
              isNaN(r4) || (r4 += "px"), isNaN(i3) || (i3 += "px"), c3(e4, r4, i3, n5);
            }, a3.showImageURLOption = function() {
              a3.setState({ uploadHighlighted: false });
            }, a3.toggleShowImageLoading = function() {
              var t4 = !a3.state.showImageLoading;
              a3.setState({ showImageLoading: t4 });
            }, a3.updateValue = function(t4) {
              var e4, n5, o4;
              a3.setState((e4 = {}, n5 = "".concat(t4.target.name), o4 = t4.target.value, n5 in e4 ? Object.defineProperty(e4, n5, { value: o4, enumerable: true, configurable: true, writable: true }) : e4[n5] = o4, e4));
            }, a3.selectImage = function(t4) {
              t4.target.files && 0 < t4.target.files.length && a3.uploadImage(t4.target.files[0]);
            }, a3.uploadImage = function(t4) {
              a3.toggleShowImageLoading(), (0, a3.props.config.uploadCallback)(t4).then(function(t5) {
                var e4 = t5.data;
                a3.setState({ showImageLoading: false, dragEnter: false, imgSrc: e4.link || e4.url }), a3.fileUpload = false;
              }).catch(function() {
                a3.setState({ showImageLoading: false, dragEnter: false });
              });
            }, a3.fileUploadClick = function(t4) {
              a3.fileUpload = true, t4.stopPropagation();
            }, a3.stopPropagation = function(t4) {
              a3.fileUpload ? a3.fileUpload = false : (t4.preventDefault(), t4.stopPropagation());
            }, a3;
          }
          return t2 = r3, (e2 = [{ key: "componentDidUpdate", value: function(t3) {
            var e3 = this.props.config;
            t3.expanded && !this.props.expanded ? this.setState({ imgSrc: "", dragEnter: false, uploadHighlighted: e3.uploadEnabled && !!e3.uploadCallback, showImageLoading: false, height: e3.defaultSize.height, width: e3.defaultSize.width, alt: "" }) : e3.uploadCallback === t3.config.uploadCallback && e3.uploadEnabled === t3.config.uploadEnabled || this.setState({ uploadHighlighted: e3.uploadEnabled && !!e3.uploadCallback });
          } }, { key: "renderAddImageModal", value: function() {
            var t3 = this.state, e3 = t3.imgSrc, n4 = t3.uploadHighlighted, o4 = t3.showImageLoading, r4 = t3.dragEnter, i3 = t3.height, c3 = t3.width, a3 = t3.alt, l2 = this.props, s2 = l2.config, u2 = s2.popupClassName, p2 = s2.uploadCallback, d2 = s2.uploadEnabled, f2 = s2.urlEnabled, y2 = s2.previewImage, m2 = s2.inputAccept, g2 = s2.alt, b2 = l2.doCollapse, h2 = l2.translations;
            return N.a.createElement("div", { className: w()("rdw-image-modal", u2), onClick: this.stopPropagation }, N.a.createElement("div", { className: "rdw-image-modal-header" }, d2 && p2 && N.a.createElement("span", { onClick: this.showImageUploadOption, className: "rdw-image-modal-header-option" }, h2["components.controls.image.fileUpload"], N.a.createElement("span", { className: w()("rdw-image-modal-header-label", { "rdw-image-modal-header-label-highlighted": n4 }) })), f2 && N.a.createElement("span", { onClick: this.showImageURLOption, className: "rdw-image-modal-header-option" }, h2["components.controls.image.byURL"], N.a.createElement("span", { className: w()("rdw-image-modal-header-label", { "rdw-image-modal-header-label-highlighted": !n4 }) }))), n4 ? N.a.createElement("div", { onClick: this.fileUploadClick }, N.a.createElement("div", { onDragEnter: this.onDragEnter, onDragOver: this.stopPropagation, onDrop: this.onImageDrop, className: w()("rdw-image-modal-upload-option", { "rdw-image-modal-upload-option-highlighted": r4 }) }, N.a.createElement("label", { htmlFor: "file", className: "rdw-image-modal-upload-option-label" }, y2 && e3 ? N.a.createElement("img", { src: e3, alt: e3, className: "rdw-image-modal-upload-option-image-preview" }) : e3 || h2["components.controls.image.dropFileText"])), N.a.createElement("input", { type: "file", id: "file", accept: m2, onChange: this.selectImage, className: "rdw-image-modal-upload-option-input" })) : N.a.createElement("div", { className: "rdw-image-modal-url-section" }, N.a.createElement("input", { className: "rdw-image-modal-url-input", placeholder: h2["components.controls.image.enterlink"], name: "imgSrc", onChange: this.updateValue, onBlur: this.updateValue, value: e3 }), N.a.createElement("span", { className: "rdw-image-mandatory-sign" }, "*")), g2.present && N.a.createElement("div", { className: "rdw-image-modal-size" }, N.a.createElement("span", { className: "rdw-image-modal-alt-lbl" }, "Alt Text"), N.a.createElement("input", { onChange: this.updateValue, onBlur: this.updateValue, value: a3, name: "alt", className: "rdw-image-modal-alt-input", placeholder: "alt" }), N.a.createElement("span", { className: "rdw-image-mandatory-sign" }, g2.mandatory && "*")), N.a.createElement("div", { className: "rdw-image-modal-size" }, "↕ ", N.a.createElement("input", { onChange: this.updateValue, onBlur: this.updateValue, value: i3, name: "height", className: "rdw-image-modal-size-input", placeholder: "Height" }), N.a.createElement("span", { className: "rdw-image-mandatory-sign" }, "*"), " ↔ ", N.a.createElement("input", { onChange: this.updateValue, onBlur: this.updateValue, value: c3, name: "width", className: "rdw-image-modal-size-input", placeholder: "Width" }), N.a.createElement("span", { className: "rdw-image-mandatory-sign" }, "*")), N.a.createElement("span", { className: "rdw-image-modal-btn-section" }, N.a.createElement("button", { className: "rdw-image-modal-btn", onClick: this.addImageFromState, disabled: !e3 || !i3 || !c3 || g2.mandatory && !a3 }, h2["generic.add"]), N.a.createElement("button", { className: "rdw-image-modal-btn", onClick: b2 }, h2["generic.cancel"])), o4 ? N.a.createElement("div", { className: "rdw-image-modal-spinner" }, N.a.createElement(Dn, null)) : void 0);
          } }, { key: "render", value: function() {
            var t3 = this.props, e3 = t3.config, n4 = e3.icon, o4 = e3.className, r4 = e3.title, i3 = t3.expanded, c3 = t3.onExpandEvent, a3 = t3.translations;
            return N.a.createElement("div", { className: "rdw-image-wrapper", "aria-haspopup": "true", "aria-expanded": i3, "aria-label": "rdw-image-control" }, N.a.createElement(R, { className: w()(o4), value: "unordered-list-item", onClick: c3, title: r4 || a3["components.controls.image.image"] }, N.a.createElement("img", { src: n4, alt: "" })), i3 ? this.renderAddImageModal() : void 0);
          } }]) && On(t2.prototype, e2), n3 && On(t2, n3), Object.defineProperty(t2, "prototype", { writable: false }), r3;
        }();
        An.propTypes = { expanded: y.a.bool, onExpandEvent: y.a.func, doCollapse: y.a.func, onChange: y.a.func, config: y.a.object, translations: y.a.object };
        var zn = An;
        function _n(t2) {
          return (_n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t3) {
            return typeof t3;
          } : function(t3) {
            return t3 && "function" == typeof Symbol && t3.constructor === Symbol && t3 !== Symbol.prototype ? "symbol" : typeof t3;
          })(t2);
        }
        function Pn(t2, e2) {
          for (var n3 = 0; n3 < e2.length; n3++) {
            var o3 = e2[n3];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(t2, o3.key, o3);
          }
        }
        function Rn(t2, e2) {
          return (Rn = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t3, e3) {
            return t3.__proto__ = e3, t3;
          })(t2, e2);
        }
        function Un(o3) {
          var r3 = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct)
              return false;
            if (Reflect.construct.sham)
              return false;
            if ("function" == typeof Proxy)
              return true;
            try {
              return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
              })), true;
            } catch (t2) {
              return false;
            }
          }();
          return function() {
            var t2, e2 = Bn(o3);
            if (r3) {
              var n3 = Bn(this).constructor;
              t2 = Reflect.construct(e2, arguments, n3);
            } else
              t2 = e2.apply(this, arguments);
            return function(t3, e3) {
              {
                if (e3 && ("object" === _n(e3) || "function" == typeof e3))
                  return e3;
                if (void 0 !== e3)
                  throw new TypeError("Derived constructors may only return object or undefined");
              }
              return function(t4) {
                if (void 0 !== t4)
                  return t4;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              }(t3);
            }(this, t2);
          };
        }
        function Bn(t2) {
          return (Bn = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t3) {
            return t3.__proto__ || Object.getPrototypeOf(t3);
          })(t2);
        }
        var Fn = function() {
          !function(t3, e3) {
            if ("function" != typeof e3 && null !== e3)
              throw new TypeError("Super expression must either be null or a function");
            t3.prototype = Object.create(e3 && e3.prototype, { constructor: { value: t3, writable: true, configurable: true } }), Object.defineProperty(t3, "prototype", { writable: false }), e3 && Rn(t3, e3);
          }(r3, f["Component"]);
          var t2, e2, n3, o3 = Un(r3);
          function r3(t3) {
            var s2;
            !function(t4, e4) {
              if (!(t4 instanceof e4))
                throw new TypeError("Cannot call a class as a function");
            }(this, r3), (s2 = o3.call(this, t3)).onExpandEvent = function() {
              s2.signalExpanded = !s2.state.expanded;
            }, s2.doExpand = function() {
              s2.setState({ expanded: true });
            }, s2.doCollapse = function() {
              s2.setState({ expanded: false });
            }, s2.expandCollapse = function() {
              s2.setState({ expanded: s2.signalExpanded }), s2.signalExpanded = false;
            }, s2.addImage = function(t4, e4, n4, o4) {
              var r4 = s2.props, i3 = r4.editorState, c3 = r4.onChange, a3 = { src: t4, height: e4, width: n4 };
              r4.config.alt.present && (a3.alt = o4);
              var l2 = i3.getCurrentContent().createEntity("IMAGE", "MUTABLE", a3).getLastCreatedEntityKey();
              c3(E.AtomicBlockUtils.insertAtomicBlock(i3, l2, " ")), s2.doCollapse();
            };
            var e3 = s2.props.modalHandler;
            return s2.state = { expanded: false }, e3.registerCallBack(s2.expandCollapse), s2;
          }
          return t2 = r3, (e2 = [{ key: "componentWillUnmount", value: function() {
            this.props.modalHandler.deregisterCallBack(this.expandCollapse);
          } }, { key: "render", value: function() {
            var t3 = this.props, e3 = t3.config, n4 = t3.translations, o4 = this.state.expanded, r4 = e3.component || zn;
            return N.a.createElement(r4, { config: e3, translations: n4, onChange: this.addImage, expanded: o4, onExpandEvent: this.onExpandEvent, doExpand: this.doExpand, doCollapse: this.doCollapse });
          } }]) && Pn(t2.prototype, e2), n3 && Pn(t2, n3), Object.defineProperty(t2, "prototype", { writable: false }), r3;
        }();
        Fn.propTypes = { editorState: y.a.object.isRequired, onChange: y.a.func.isRequired, modalHandler: y.a.object, config: y.a.object, translations: y.a.object };
        function Yn(t2) {
          var e2 = t2.config, n3 = t2.onChange, o3 = t2.translations, r3 = e2.icon, i3 = e2.className, c3 = e2.title;
          return N.a.createElement("div", { className: "rdw-remove-wrapper", "aria-label": "rdw-remove-control" }, N.a.createElement(R, { className: w()(i3), onClick: n3, title: c3 || o3["components.controls.remove.remove"] }, N.a.createElement("img", { src: r3, alt: "" })));
        }
        var Qn = Fn;
        n2(31);
        Yn.propTypes = { onChange: y.a.func, config: y.a.object, translations: y.a.object };
        var Hn = Yn;
        function Zn(t2) {
          return (Zn = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t3) {
            return typeof t3;
          } : function(t3) {
            return t3 && "function" == typeof Symbol && t3.constructor === Symbol && t3 !== Symbol.prototype ? "symbol" : typeof t3;
          })(t2);
        }
        function Wn(t2, e2) {
          for (var n3 = 0; n3 < e2.length; n3++) {
            var o3 = e2[n3];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(t2, o3.key, o3);
          }
        }
        function Gn(t2, e2) {
          return (Gn = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t3, e3) {
            return t3.__proto__ = e3, t3;
          })(t2, e2);
        }
        function Jn(o3) {
          var r3 = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct)
              return false;
            if (Reflect.construct.sham)
              return false;
            if ("function" == typeof Proxy)
              return true;
            try {
              return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
              })), true;
            } catch (t2) {
              return false;
            }
          }();
          return function() {
            var t2, e2 = Vn(o3);
            if (r3) {
              var n3 = Vn(this).constructor;
              t2 = Reflect.construct(e2, arguments, n3);
            } else
              t2 = e2.apply(this, arguments);
            return function(t3, e3) {
              {
                if (e3 && ("object" === Zn(e3) || "function" == typeof e3))
                  return e3;
                if (void 0 !== e3)
                  throw new TypeError("Derived constructors may only return object or undefined");
              }
              return function(t4) {
                if (void 0 !== t4)
                  return t4;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              }(t3);
            }(this, t2);
          };
        }
        function Vn(t2) {
          return (Vn = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t3) {
            return t3.__proto__ || Object.getPrototypeOf(t3);
          })(t2);
        }
        var qn = function() {
          !function(t3, e3) {
            if ("function" != typeof e3 && null !== e3)
              throw new TypeError("Super expression must either be null or a function");
            t3.prototype = Object.create(e3 && e3.prototype, { constructor: { value: t3, writable: true, configurable: true } }), Object.defineProperty(t3, "prototype", { writable: false }), e3 && Gn(t3, e3);
          }(i3, f["Component"]);
          var t2, e2, n3, r3 = Jn(i3);
          function i3() {
            var n4;
            !function(t4, e4) {
              if (!(t4 instanceof e4))
                throw new TypeError("Cannot call a class as a function");
            }(this, i3);
            for (var t3 = arguments.length, e3 = new Array(t3), o3 = 0; o3 < t3; o3++)
              e3[o3] = arguments[o3];
            return (n4 = r3.call.apply(r3, [this].concat(e3))).state = { expanded: false }, n4.onExpandEvent = function() {
              n4.signalExpanded = !n4.state.expanded;
            }, n4.expandCollapse = function() {
              n4.setState({ expanded: n4.signalExpanded }), n4.signalExpanded = false;
            }, n4.removeInlineStyles = function() {
              var t4 = n4.props, e4 = t4.editorState;
              (0, t4.onChange)(n4.removeAllInlineStyles(e4));
            }, n4.removeAllInlineStyles = function(n5) {
              var o4 = n5.getCurrentContent();
              return ["BOLD", "ITALIC", "UNDERLINE", "STRIKETHROUGH", "MONOSPACE", "SUPERSCRIPT", "SUBSCRIPT"].forEach(function(t4) {
                o4 = E.Modifier.removeInlineStyle(o4, n5.getSelection(), t4);
              }), h(Object(S.getSelectionCustomInlineStyle)(n5, ["FONTSIZE", "FONTFAMILY", "COLOR", "BGCOLOR"]), function(t4, e4) {
                e4 && (o4 = E.Modifier.removeInlineStyle(o4, n5.getSelection(), e4));
              }), E.EditorState.push(n5, o4, "change-inline-style");
            }, n4.doExpand = function() {
              n4.setState({ expanded: true });
            }, n4.doCollapse = function() {
              n4.setState({ expanded: false });
            }, n4;
          }
          return t2 = i3, (e2 = [{ key: "componentDidMount", value: function() {
            this.props.modalHandler.registerCallBack(this.expandCollapse);
          } }, { key: "componentWillUnmount", value: function() {
            this.props.modalHandler.deregisterCallBack(this.expandCollapse);
          } }, { key: "render", value: function() {
            var t3 = this.props, e3 = t3.config, n4 = t3.translations, o3 = this.state.expanded, r4 = e3.component || Hn;
            return N.a.createElement(r4, { config: e3, translations: n4, expanded: o3, onExpandEvent: this.onExpandEvent, doExpand: this.doExpand, doCollapse: this.doCollapse, onChange: this.removeInlineStyles });
          } }]) && Wn(t2.prototype, e2), n3 && Wn(t2, n3), Object.defineProperty(t2, "prototype", { writable: false }), i3;
        }();
        qn.propTypes = { onChange: y.a.func.isRequired, editorState: y.a.object.isRequired, config: y.a.object, translations: y.a.object, modalHandler: y.a.object };
        n2(32);
        function Kn(t2) {
          return (Kn = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t3) {
            return typeof t3;
          } : function(t3) {
            return t3 && "function" == typeof Symbol && t3.constructor === Symbol && t3 !== Symbol.prototype ? "symbol" : typeof t3;
          })(t2);
        }
        function Xn(t2, e2) {
          for (var n3 = 0; n3 < e2.length; n3++) {
            var o3 = e2[n3];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(t2, o3.key, o3);
          }
        }
        function $n(t2, e2) {
          return ($n = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t3, e3) {
            return t3.__proto__ = e3, t3;
          })(t2, e2);
        }
        function to(o3) {
          var r3 = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct)
              return false;
            if (Reflect.construct.sham)
              return false;
            if ("function" == typeof Proxy)
              return true;
            try {
              return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
              })), true;
            } catch (t2) {
              return false;
            }
          }();
          return function() {
            var t2, e2 = eo(o3);
            if (r3) {
              var n3 = eo(this).constructor;
              t2 = Reflect.construct(e2, arguments, n3);
            } else
              t2 = e2.apply(this, arguments);
            return function(t3, e3) {
              {
                if (e3 && ("object" === Kn(e3) || "function" == typeof e3))
                  return e3;
                if (void 0 !== e3)
                  throw new TypeError("Derived constructors may only return object or undefined");
              }
              return function(t4) {
                if (void 0 !== t4)
                  return t4;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              }(t3);
            }(this, t2);
          };
        }
        function eo(t2) {
          return (eo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t3) {
            return t3.__proto__ || Object.getPrototypeOf(t3);
          })(t2);
        }
        var no = function() {
          !function(t3, e3) {
            if ("function" != typeof e3 && null !== e3)
              throw new TypeError("Super expression must either be null or a function");
            t3.prototype = Object.create(e3 && e3.prototype, { constructor: { value: t3, writable: true, configurable: true } }), Object.defineProperty(t3, "prototype", { writable: false }), e3 && $n(t3, e3);
          }(i3, f["Component"]);
          var t2, e2, n3, r3 = to(i3);
          function i3() {
            var e3;
            !function(t4, e4) {
              if (!(t4 instanceof e4))
                throw new TypeError("Cannot call a class as a function");
            }(this, i3);
            for (var t3 = arguments.length, n4 = new Array(t3), o3 = 0; o3 < t3; o3++)
              n4[o3] = arguments[o3];
            return (e3 = r3.call.apply(r3, [this].concat(n4))).onChange = function(t4) {
              (0, e3.props.onChange)(t4);
            }, e3;
          }
          return t2 = i3, (e2 = [{ key: "renderInDropDown", value: function() {
            var t3 = this.props, e3 = t3.config, n4 = t3.expanded, o3 = t3.doExpand, r4 = t3.onExpandEvent, i4 = t3.doCollapse, c3 = t3.currentState, a3 = c3.undoDisabled, l2 = c3.redoDisabled, s2 = t3.translations, u2 = e3.options, p2 = e3.undo, d2 = e3.redo, f2 = e3.className, y2 = e3.dropdownClassName, m2 = e3.title;
            return N.a.createElement(H, { className: w()("rdw-history-dropdown", f2), optionWrapperClassName: w()(y2), expanded: n4, doExpand: o3, doCollapse: i4, onExpandEvent: r4, "aria-label": "rdw-history-control", title: m2 || s2["components.controls.history.history"] }, N.a.createElement("img", { src: v(e3), alt: "" }), 0 <= u2.indexOf("undo") && N.a.createElement(K, { value: "undo", onClick: this.onChange, disabled: a3, className: w()("rdw-history-dropdownoption", p2.className), title: p2.title || s2["components.controls.history.undo"] }, N.a.createElement("img", { src: p2.icon, alt: "" })), 0 <= u2.indexOf("redo") && N.a.createElement(K, { value: "redo", onClick: this.onChange, disabled: l2, className: w()("rdw-history-dropdownoption", d2.className), title: d2.title || s2["components.controls.history.redo"] }, N.a.createElement("img", { src: d2.icon, alt: "" })));
          } }, { key: "renderInFlatList", value: function() {
            var t3 = this.props, e3 = t3.config, n4 = e3.options, o3 = e3.undo, r4 = e3.redo, i4 = e3.className, c3 = t3.currentState, a3 = c3.undoDisabled, l2 = c3.redoDisabled, s2 = t3.translations;
            return N.a.createElement("div", { className: w()("rdw-history-wrapper", i4), "aria-label": "rdw-history-control" }, 0 <= n4.indexOf("undo") && N.a.createElement(R, { value: "undo", onClick: this.onChange, className: w()(o3.className), disabled: a3, title: o3.title || s2["components.controls.history.undo"] }, N.a.createElement("img", { src: o3.icon, alt: "" })), 0 <= n4.indexOf("redo") && N.a.createElement(R, { value: "redo", onClick: this.onChange, className: w()(r4.className), disabled: l2, title: r4.title || s2["components.controls.history.redo"] }, N.a.createElement("img", { src: r4.icon, alt: "" })));
          } }, { key: "render", value: function() {
            return this.props.config.inDropdown ? this.renderInDropDown() : this.renderInFlatList();
          } }]) && Xn(t2.prototype, e2), n3 && Xn(t2, n3), Object.defineProperty(t2, "prototype", { writable: false }), i3;
        }();
        function oo(t2) {
          return (oo = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t3) {
            return typeof t3;
          } : function(t3) {
            return t3 && "function" == typeof Symbol && t3.constructor === Symbol && t3 !== Symbol.prototype ? "symbol" : typeof t3;
          })(t2);
        }
        function ro(t2, e2) {
          for (var n3 = 0; n3 < e2.length; n3++) {
            var o3 = e2[n3];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(t2, o3.key, o3);
          }
        }
        function io(t2, e2) {
          return (io = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t3, e3) {
            return t3.__proto__ = e3, t3;
          })(t2, e2);
        }
        function co(o3) {
          var r3 = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct)
              return false;
            if (Reflect.construct.sham)
              return false;
            if ("function" == typeof Proxy)
              return true;
            try {
              return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
              })), true;
            } catch (t2) {
              return false;
            }
          }();
          return function() {
            var t2, e2 = ao(o3);
            if (r3) {
              var n3 = ao(this).constructor;
              t2 = Reflect.construct(e2, arguments, n3);
            } else
              t2 = e2.apply(this, arguments);
            return function(t3, e3) {
              {
                if (e3 && ("object" === oo(e3) || "function" == typeof e3))
                  return e3;
                if (void 0 !== e3)
                  throw new TypeError("Derived constructors may only return object or undefined");
              }
              return function(t4) {
                if (void 0 !== t4)
                  return t4;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              }(t3);
            }(this, t2);
          };
        }
        function ao(t2) {
          return (ao = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t3) {
            return t3.__proto__ || Object.getPrototypeOf(t3);
          })(t2);
        }
        no.propTypes = { expanded: y.a.bool, doExpand: y.a.func, doCollapse: y.a.func, onExpandEvent: y.a.func, config: y.a.object, onChange: y.a.func, currentState: y.a.object, translations: y.a.object };
        var lo = function() {
          !function(t3, e3) {
            if ("function" != typeof e3 && null !== e3)
              throw new TypeError("Super expression must either be null or a function");
            t3.prototype = Object.create(e3 && e3.prototype, { constructor: { value: t3, writable: true, configurable: true } }), Object.defineProperty(t3, "prototype", { writable: false }), e3 && io(t3, e3);
          }(c3, f["Component"]);
          var t2, e2, n3, r3 = co(c3);
          function c3(t3) {
            var i3;
            !function(t4, e4) {
              if (!(t4 instanceof e4))
                throw new TypeError("Cannot call a class as a function");
            }(this, c3), (i3 = r3.call(this, t3)).onExpandEvent = function() {
              i3.signalExpanded = !i3.state.expanded;
            }, i3.onChange = function(t4) {
              var e4 = i3.props, n5 = e4.editorState, o4 = e4.onChange, r4 = E.EditorState[t4](n5);
              r4 && o4(r4);
            }, i3.doExpand = function() {
              i3.setState({ expanded: true });
            }, i3.doCollapse = function() {
              i3.setState({ expanded: false });
            };
            var e3 = { expanded: !(i3.expandCollapse = function() {
              i3.setState({ expanded: i3.signalExpanded }), i3.signalExpanded = false;
            }), undoDisabled: false, redoDisabled: false }, n4 = t3.editorState, o3 = t3.modalHandler;
            return n4 && (e3.undoDisabled = 0 === n4.getUndoStack().size, e3.redoDisabled = 0 === n4.getRedoStack().size), i3.state = e3, o3.registerCallBack(i3.expandCollapse), i3;
          }
          return t2 = c3, (e2 = [{ key: "componentDidUpdate", value: function(t3) {
            var e3 = this.props.editorState;
            e3 && t3.editorState !== e3 && this.setState({ undoDisabled: 0 === e3.getUndoStack().size, redoDisabled: 0 === e3.getRedoStack().size });
          } }, { key: "componentWillUnmount", value: function() {
            this.props.modalHandler.deregisterCallBack(this.expandCollapse);
          } }, { key: "render", value: function() {
            var t3 = this.props, e3 = t3.config, n4 = t3.translations, o3 = this.state, r4 = o3.undoDisabled, i3 = o3.redoDisabled, c4 = o3.expanded, a3 = e3.component || no;
            return N.a.createElement(a3, { config: e3, translations: n4, currentState: { undoDisabled: r4, redoDisabled: i3 }, expanded: c4, onExpandEvent: this.onExpandEvent, doExpand: this.doExpand, doCollapse: this.doCollapse, onChange: this.onChange });
          } }]) && ro(t2.prototype, e2), n3 && ro(t2, n3), Object.defineProperty(t2, "prototype", { writable: false }), c3;
        }();
        lo.propTypes = { onChange: y.a.func.isRequired, editorState: y.a.object, modalHandler: y.a.object, config: y.a.object, translations: y.a.object };
        var so = { inline: st, blockType: Et, fontSize: zt, fontFamily: Jt, list: ce, textAlign: he, colorPicker: Ie, link: $e, embedded: yn, emoji: Ln, image: Qn, remove: qn, history: lo }, uo = /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205f\u3000]/g, po = /^(?:(?:https?|ftps?|mailto):|[^a-z]|[a-z+.-]+(?:[^a-z+.:-]|$))/i;
        function fo(t2) {
          return String(t2).replace(uo, "").match(po) ? t2 : "#";
        }
        n2(33);
        function yo(t2) {
          return (yo = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t3) {
            return typeof t3;
          } : function(t3) {
            return t3 && "function" == typeof Symbol && t3.constructor === Symbol && t3 !== Symbol.prototype ? "symbol" : typeof t3;
          })(t2);
        }
        function mo(t2, e2) {
          for (var n3 = 0; n3 < e2.length; n3++) {
            var o3 = e2[n3];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(t2, o3.key, o3);
          }
        }
        function go(t2, e2) {
          return (go = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t3, e3) {
            return t3.__proto__ = e3, t3;
          })(t2, e2);
        }
        function bo(o3) {
          var r3 = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct)
              return false;
            if (Reflect.construct.sham)
              return false;
            if ("function" == typeof Proxy)
              return true;
            try {
              return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
              })), true;
            } catch (t2) {
              return false;
            }
          }();
          return function() {
            var t2, e2 = ho(o3);
            if (r3) {
              var n3 = ho(this).constructor;
              t2 = Reflect.construct(e2, arguments, n3);
            } else
              t2 = e2.apply(this, arguments);
            return function(t3, e3) {
              {
                if (e3 && ("object" === yo(e3) || "function" == typeof e3))
                  return e3;
                if (void 0 !== e3)
                  throw new TypeError("Derived constructors may only return object or undefined");
              }
              return function(t4) {
                if (void 0 !== t4)
                  return t4;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              }(t3);
            }(this, t2);
          };
        }
        function ho(t2) {
          return (ho = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t3) {
            return t3.__proto__ || Object.getPrototypeOf(t3);
          })(t2);
        }
        function Mo(t2, e2, n3) {
          t2.findEntityRanges(function(t3) {
            var e3 = t3.getEntity();
            return null !== e3 && "LINK" === n3.getEntity(e3).getType();
          }, e2);
        }
        function jo(t2) {
          var e2, a3 = t2.showOpenOptionOnHover;
          return (e2 = function() {
            !function(t4, e4) {
              if ("function" != typeof e4 && null !== e4)
                throw new TypeError("Super expression must either be null or a function");
              t4.prototype = Object.create(e4 && e4.prototype, { constructor: { value: t4, writable: true, configurable: true } }), Object.defineProperty(t4, "prototype", { writable: false }), e4 && go(t4, e4);
            }(i3, f["Component"]);
            var t3, e3, n3, o3 = bo(i3);
            function i3() {
              var r3;
              !function(t5, e5) {
                if (!(t5 instanceof e5))
                  throw new TypeError("Cannot call a class as a function");
              }(this, i3);
              for (var t4 = arguments.length, e4 = new Array(t4), n4 = 0; n4 < t4; n4++)
                e4[n4] = arguments[n4];
              return (r3 = o3.call.apply(o3, [this].concat(e4))).state = { showPopOver: false }, r3.openLink = function() {
                var t5 = r3.props, e5 = t5.entityKey, n5 = t5.contentState.getEntity(e5).getData().url, o4 = window.open(fo(n5), "blank");
                o4 && o4.focus();
              }, r3.toggleShowPopOver = function() {
                var t5 = !r3.state.showPopOver;
                r3.setState({ showPopOver: t5 });
              }, r3;
            }
            return t3 = i3, (e3 = [{ key: "render", value: function() {
              var t4 = this.props, e4 = t4.children, n4 = t4.entityKey, o4 = t4.contentState.getEntity(n4).getData(), r3 = o4.url, i4 = o4.targetOption, c3 = this.state.showPopOver;
              return N.a.createElement("span", { className: "rdw-link-decorator-wrapper", onMouseEnter: this.toggleShowPopOver, onMouseLeave: this.toggleShowPopOver }, N.a.createElement("a", { href: fo(r3), target: i4 }, e4), c3 && a3 ? N.a.createElement("img", { src: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iIzAwMCIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTQuMDcyIDBIOC45MTVhLjkyNS45MjUgMCAwIDAgMCAxLjg0OWgyLjkyNUw2Ljk2MSA2LjcyN2EuOTE4LjkxOCAwIDAgMC0uMjcuNjU0YzAgLjI0Ny4wOTUuNDguMjcuNjU0YS45MTguOTE4IDAgMCAwIC42NTQuMjcuOTE4LjkxOCAwIDAgMCAuNjUzLS4yN2w0Ljg4LTQuODh2Mi45MjZhLjkyNS45MjUgMCAwIDAgMS44NDggMFYuOTI0QS45MjUuOTI1IDAgMCAwIDE0LjA3MiAweiIvPjxwYXRoIGQ9Ik0xMC42MjMgMTMuNDExSDEuNTg1VjQuMzcyaDYuNzk4bDEuNTg0LTEuNTg0SC43OTJBLjc5Mi43OTIgMCAwIDAgMCAzLjU4djEwLjYyNGMwIC40MzcuMzU1Ljc5Mi43OTIuNzkyaDEwLjYyNGEuNzkyLjc5MiAwIDAgMCAuNzkyLS43OTJWNS4wMjlsLTEuNTg1IDEuNTg0djYuNzk4eiIvPjwvZz48L3N2Zz4=", alt: "", onClick: this.openLink, className: "rdw-link-decorator-icon" }) : void 0);
            } }]) && mo(t3.prototype, e3), n3 && mo(t3, n3), Object.defineProperty(t3, "prototype", { writable: false }), i3;
          }()).propTypes = { entityKey: y.a.string.isRequired, children: y.a.array, contentState: y.a.object }, e2;
        }
        n2(34);
        function vo(t2, e2) {
          for (var n3 = 0; n3 < e2.length; n3++) {
            var o3 = e2[n3];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(t2, o3.key, o3);
          }
        }
        function No(t2, e2, n3) {
          return e2 && vo(t2.prototype, e2), n3 && vo(t2, n3), Object.defineProperty(t2, "prototype", { writable: false }), t2;
        }
        var Eo = No(function t2(e2) {
          var n3 = this;
          !function(t3, e3) {
            if (!(t3 instanceof e3))
              throw new TypeError("Cannot call a class as a function");
          }(this, t2), this.getMentionComponent = function() {
            function t3(t4) {
              var e3 = t4.entityKey, n4 = t4.children, o3 = t4.contentState.getEntity(e3).getData(), r3 = o3.url, i3 = o3.value;
              return N.a.createElement("a", { href: r3 || i3, className: w()("rdw-mention-link", c3) }, n4);
            }
            var c3 = n3.className;
            return t3.propTypes = { entityKey: y.a.number, children: y.a.array, contentState: y.a.object }, t3;
          }, this.getMentionDecorator = function() {
            return { strategy: n3.findMentionEntities, component: n3.getMentionComponent() };
          }, this.className = e2;
        });
        Eo.prototype.findMentionEntities = function(t2, e2, n3) {
          t2.findEntityRanges(function(t3) {
            var e3 = t3.getEntity();
            return null !== e3 && "MENTION" === n3.getEntity(e3).getType();
          }, e2);
        };
        var So = Eo;
        n2(35);
        function wo(t2) {
          return (wo = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t3) {
            return typeof t3;
          } : function(t3) {
            return t3 && "function" == typeof Symbol && t3.constructor === Symbol && t3 !== Symbol.prototype ? "symbol" : typeof t3;
          })(t2);
        }
        function Co(t2, e2) {
          return (Co = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t3, e3) {
            return t3.__proto__ = e3, t3;
          })(t2, e2);
        }
        function Lo(o3) {
          var r3 = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct)
              return false;
            if (Reflect.construct.sham)
              return false;
            if ("function" == typeof Proxy)
              return true;
            try {
              return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
              })), true;
            } catch (t2) {
              return false;
            }
          }();
          return function() {
            var t2, e2 = Do(o3);
            if (r3) {
              var n3 = Do(this).constructor;
              t2 = Reflect.construct(e2, arguments, n3);
            } else
              t2 = e2.apply(this, arguments);
            return function(t3, e3) {
              {
                if (e3 && ("object" === wo(e3) || "function" == typeof e3))
                  return e3;
                if (void 0 !== e3)
                  throw new TypeError("Derived constructors may only return object or undefined");
              }
              return function(t4) {
                if (void 0 !== t4)
                  return t4;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              }(t3);
            }(this, t2);
          };
        }
        function Do(t2) {
          return (Do = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t3) {
            return t3.__proto__ || Object.getPrototypeOf(t3);
          })(t2);
        }
        function ko(t2, e2) {
          for (var n3 = 0; n3 < e2.length; n3++) {
            var o3 = e2[n3];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(t2, o3.key, o3);
          }
        }
        function Oo(t2, e2, n3) {
          return e2 && ko(t2.prototype, e2), n3 && ko(t2, n3), Object.defineProperty(t2, "prototype", { writable: false }), t2;
        }
        function xo(t2, e2) {
          if (!(t2 instanceof e2))
            throw new TypeError("Cannot call a class as a function");
        }
        var Io = Oo(function t2(e2) {
          var p2 = this;
          xo(this, t2), this.findSuggestionEntities = function(t3, e3) {
            if (p2.config.getEditorState()) {
              var n4 = p2.config, o4 = n4.separator, r4 = n4.trigger, i4 = n4.getSuggestions, c4 = (0, n4.getEditorState)().getSelection();
              if (c4.get("anchorKey") === t3.get("key") && c4.get("anchorKey") === c4.get("focusKey")) {
                var a4 = t3.getText(), l3 = (a4 = a4.substr(0, c4.get("focusOffset") === a4.length - 1 ? a4.length : c4.get("focusOffset") + 1)).lastIndexOf(o4 + r4), s3 = o4 + r4;
                if ((void 0 === l3 || l3 < 0) && a4[0] === r4 && (l3 = 0, s3 = r4), 0 <= l3) {
                  var u3 = a4.substr(l3 + s3.length, a4.length);
                  i4().some(function(t4) {
                    return !!t4.value && (p2.config.caseSensitive ? 0 <= t4.value.indexOf(u3) : 0 <= t4.value.toLowerCase().indexOf(u3 && u3.toLowerCase()));
                  }) && e3(0 === l3 ? 0 : l3 + 1, a4.length);
                }
              }
            }
          }, this.getSuggestionComponent = (function() {
            var t3, a4 = this.config;
            return (t3 = function() {
              !function(t4, e3) {
                if ("function" != typeof e3 && null !== e3)
                  throw new TypeError("Super expression must either be null or a function");
                t4.prototype = Object.create(e3 && e3.prototype, { constructor: { value: t4, writable: true, configurable: true } }), Object.defineProperty(t4, "prototype", { writable: false }), e3 && Co(t4, e3);
              }(r4, f["Component"]);
              var o4 = Lo(r4);
              function r4() {
                var c4;
                xo(this, r4);
                for (var t4 = arguments.length, e3 = new Array(t4), n4 = 0; n4 < t4; n4++)
                  e3[n4] = arguments[n4];
                return (c4 = o4.call.apply(o4, [this].concat(e3))).state = { style: { left: 15 }, activeOption: -1, showSuggestions: true }, c4.onEditorKeyDown = function(t5) {
                  var e4 = c4.state.activeOption, n5 = {};
                  "ArrowDown" === t5.key ? (t5.preventDefault(), e4 === c4.filteredSuggestions.length - 1 ? n5.activeOption = 0 : n5.activeOption = e4 + 1) : "ArrowUp" === t5.key ? n5.activeOption = e4 <= 0 ? c4.filteredSuggestions.length - 1 : e4 - 1 : "Escape" === t5.key ? (n5.showSuggestions = false, g()) : "Enter" === t5.key && c4.addMention(), c4.setState(n5);
                }, c4.onOptionMouseEnter = function(t5) {
                  var e4 = t5.target.getAttribute("data-index");
                  c4.setState({ activeOption: e4 });
                }, c4.onOptionMouseLeave = function() {
                  c4.setState({ activeOption: -1 });
                }, c4.setSuggestionReference = function(t5) {
                  c4.suggestion = t5;
                }, c4.setDropdownReference = function(t5) {
                  c4.dropdown = t5;
                }, c4.closeSuggestionDropdown = function() {
                  c4.setState({ showSuggestions: false });
                }, c4.filteredSuggestions = [], c4.filterSuggestions = function(t5) {
                  var e4 = t5.children[0].props.text.substr(1), n5 = a4.getSuggestions();
                  c4.filteredSuggestions = n5 && n5.filter(function(t6) {
                    return !e4 || 0 === e4.length || (a4.caseSensitive ? 0 <= t6.value.indexOf(e4) : 0 <= t6.value.toLowerCase().indexOf(e4 && e4.toLowerCase()));
                  });
                }, c4.addMention = function() {
                  var t5 = c4.state.activeOption, e4 = a4.getEditorState(), n5 = a4.onChange, o5 = a4.separator, r5 = a4.trigger, i4 = c4.filteredSuggestions[t5];
                  i4 && function(t6, e5, n6, o6, r6) {
                    var i5 = r6.value, c5 = r6.url, a5 = t6.getCurrentContent().createEntity("MENTION", "IMMUTABLE", { text: "".concat(o6).concat(i5), value: i5, url: c5 }).getLastCreatedEntityKey(), l3 = Object(S.getSelectedBlock)(t6).getText(), s3 = t6.getSelection().focusOffset, u3 = (l3.lastIndexOf(n6 + o6, s3) || 0) + 1, p3 = false;
                    l3.length === u3 + 1 && (s3 = l3.length), " " === l3[s3] && (p3 = true);
                    var d3 = t6.getSelection().merge({ anchorOffset: u3, focusOffset: s3 }), f2 = E.EditorState.acceptSelection(t6, d3), y2 = E.Modifier.replaceText(f2.getCurrentContent(), d3, "".concat(o6).concat(i5), f2.getCurrentInlineStyle(), a5);
                    f2 = E.EditorState.push(f2, y2, "insert-characters"), p3 || (d3 = f2.getSelection().merge({ anchorOffset: u3 + i5.length + o6.length, focusOffset: u3 + i5.length + o6.length }), f2 = E.EditorState.acceptSelection(f2, d3), y2 = E.Modifier.insertText(f2.getCurrentContent(), d3, " ", f2.getCurrentInlineStyle(), void 0)), e5(E.EditorState.push(f2, y2, "insert-characters"));
                  }(e4, n5, o5, r5, i4);
                }, c4;
              }
              return Oo(r4, [{ key: "componentDidMount", value: function() {
                var t4, e3, n4, o5 = a4.getWrapperRef().getBoundingClientRect(), r5 = this.suggestion.getBoundingClientRect(), i4 = this.dropdown.getBoundingClientRect();
                o5.width < r5.left - o5.left + i4.width ? e3 = 15 : t4 = 15, o5.bottom < i4.bottom && (n4 = 0), this.setState({ style: { left: t4, right: e3, bottom: n4 } }), C.registerCallBack(this.onEditorKeyDown), m(), a4.modalHandler.setSuggestionCallback(this.closeSuggestionDropdown), this.filterSuggestions(this.props);
              } }, { key: "componentDidUpdate", value: function(t4) {
                this.props.children !== t4.children && (this.filterSuggestions(t4), this.setState({ showSuggestions: true }));
              } }, { key: "componentWillUnmount", value: function() {
                C.deregisterCallBack(this.onEditorKeyDown), g(), a4.modalHandler.removeSuggestionCallback();
              } }, { key: "render", value: function() {
                var n4 = this, t4 = this.props.children, e3 = this.state, o5 = e3.activeOption, r5 = e3.showSuggestions, i4 = a4.dropdownClassName, c4 = a4.optionClassName;
                return N.a.createElement("span", { className: "rdw-suggestion-wrapper", ref: this.setSuggestionReference, onClick: a4.modalHandler.onSuggestionClick, "aria-haspopup": "true", "aria-label": "rdw-suggestion-popup" }, N.a.createElement("span", null, t4), r5 && N.a.createElement("span", { className: w()("rdw-suggestion-dropdown", i4), contentEditable: "false", suppressContentEditableWarning: true, style: this.state.style, ref: this.setDropdownReference }, this.filteredSuggestions.map(function(t5, e4) {
                  return N.a.createElement("span", { key: e4, spellCheck: false, onClick: n4.addMention, "data-index": e4, onMouseEnter: n4.onOptionMouseEnter, onMouseLeave: n4.onOptionMouseLeave, className: w()("rdw-suggestion-option", c4, { "rdw-suggestion-option-active": e4 === o5 }) }, t5.text);
                })));
              } }]), r4;
            }()).propTypes = { children: y.a.array }, t3;
          }).bind(this), this.getSuggestionDecorator = function() {
            return { strategy: p2.findSuggestionEntities, component: p2.getSuggestionComponent() };
          };
          var n3 = e2.separator, o3 = e2.trigger, r3 = e2.getSuggestions, i3 = e2.onChange, c3 = e2.getEditorState, a3 = e2.getWrapperRef, l2 = e2.caseSensitive, s2 = e2.dropdownClassName, u2 = e2.optionClassName, d2 = e2.modalHandler;
          this.config = { separator: n3, trigger: o3, getSuggestions: r3, onChange: i3, getEditorState: c3, getWrapperRef: a3, caseSensitive: l2, dropdownClassName: s2, optionClassName: u2, modalHandler: d2 };
        }), To = function(t2) {
          return [new So(t2.mentionClassName).getMentionDecorator(), new Io(t2).getSuggestionDecorator()];
        };
        n2(36);
        function Ao(t2, e2) {
          for (var n3 = 0; n3 < e2.length; n3++) {
            var o3 = e2[n3];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(t2, o3.key, o3);
          }
        }
        function zo(t2, e2, n3) {
          return e2 && Ao(t2.prototype, e2), n3 && Ao(t2, n3), Object.defineProperty(t2, "prototype", { writable: false }), t2;
        }
        function _o(t2) {
          var e2 = t2.block, n3 = t2.contentState.getEntity(e2.getEntityAt(0)).getData(), o3 = n3.src, r3 = n3.height, i3 = n3.width;
          return N.a.createElement("iframe", { height: r3, width: i3, src: o3, frameBorder: "0", allowFullScreen: true, title: "Wysiwyg Embedded Content" });
        }
        var Po = zo(function t2(e2) {
          var a3 = this;
          !function(t3, e3) {
            if (!(t3 instanceof e3))
              throw new TypeError("Cannot call a class as a function");
          }(this, t2), this.getHashtagComponent = function() {
            function t3(t4) {
              var e3 = t4.children, n3 = e3[0].props.text;
              return N.a.createElement("a", { href: n3, className: w()("rdw-hashtag-link", o3) }, e3);
            }
            var o3 = a3.className;
            return t3.propTypes = { children: y.a.object }, t3;
          }, this.findHashtagEntities = function(t3, e3) {
            for (var n3 = t3.getText(), o3 = 0, r3 = 0; 0 < n3.length && 0 <= o3; )
              if (n3[0] === a3.hashCharacter ? (r3 = o3 = 0, n3 = n3.substr(a3.hashCharacter.length)) : 0 <= (o3 = n3.indexOf(a3.separator + a3.hashCharacter)) && (n3 = n3.substr(o3 + (a3.separator + a3.hashCharacter).length), r3 += o3 + a3.separator.length), 0 <= o3) {
                var i3 = 0 <= n3.indexOf(a3.separator) ? n3.indexOf(a3.separator) : n3.length, c3 = n3.substr(0, i3);
                c3 && 0 < c3.length && (e3(r3, r3 + c3.length + a3.hashCharacter.length), r3 += a3.hashCharacter.length);
              }
          }, this.getHashtagDecorator = function() {
            return { strategy: a3.findHashtagEntities, component: a3.getHashtagComponent() };
          }, this.className = e2.className, this.hashCharacter = e2.hashCharacter || "#", this.separator = e2.separator || " ";
        }), Ro = function(t2) {
          return new Po(t2).getHashtagDecorator();
        };
        _o.propTypes = { block: y.a.object, contentState: y.a.object };
        var Uo = _o;
        n2(37);
        function Bo(t2) {
          return (Bo = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t3) {
            return typeof t3;
          } : function(t3) {
            return t3 && "function" == typeof Symbol && t3.constructor === Symbol && t3 !== Symbol.prototype ? "symbol" : typeof t3;
          })(t2);
        }
        function Fo(t2, e2) {
          for (var n3 = 0; n3 < e2.length; n3++) {
            var o3 = e2[n3];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(t2, o3.key, o3);
          }
        }
        function Yo(t2, e2) {
          return (Yo = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t3, e3) {
            return t3.__proto__ = e3, t3;
          })(t2, e2);
        }
        function Qo(o3) {
          var r3 = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct)
              return false;
            if (Reflect.construct.sham)
              return false;
            if ("function" == typeof Proxy)
              return true;
            try {
              return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
              })), true;
            } catch (t2) {
              return false;
            }
          }();
          return function() {
            var t2, e2 = Ho(o3);
            if (r3) {
              var n3 = Ho(this).constructor;
              t2 = Reflect.construct(e2, arguments, n3);
            } else
              t2 = e2.apply(this, arguments);
            return function(t3, e3) {
              {
                if (e3 && ("object" === Bo(e3) || "function" == typeof e3))
                  return e3;
                if (void 0 !== e3)
                  throw new TypeError("Derived constructors may only return object or undefined");
              }
              return function(t4) {
                if (void 0 !== t4)
                  return t4;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              }(t3);
            }(this, t2);
          };
        }
        function Ho(t2) {
          return (Ho = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t3) {
            return t3.__proto__ || Object.getPrototypeOf(t3);
          })(t2);
        }
        var Zo = function(d2) {
          var t2;
          return (t2 = function() {
            !function(t4, e3) {
              if ("function" != typeof e3 && null !== e3)
                throw new TypeError("Super expression must either be null or a function");
              t4.prototype = Object.create(e3 && e3.prototype, { constructor: { value: t4, writable: true, configurable: true } }), Object.defineProperty(t4, "prototype", { writable: false }), e3 && Yo(t4, e3);
            }(r3, f["Component"]);
            var t3, e2, n3, o3 = Qo(r3);
            function r3() {
              var i3;
              !function(t5, e4) {
                if (!(t5 instanceof e4))
                  throw new TypeError("Cannot call a class as a function");
              }(this, r3);
              for (var t4 = arguments.length, e3 = new Array(t4), n4 = 0; n4 < t4; n4++)
                e3[n4] = arguments[n4];
              return (i3 = o3.call.apply(o3, [this].concat(e3))).state = { hovered: false }, i3.setEntityAlignmentLeft = function() {
                i3.setEntityAlignment("left");
              }, i3.setEntityAlignmentRight = function() {
                i3.setEntityAlignment("right");
              }, i3.setEntityAlignmentCenter = function() {
                i3.setEntityAlignment("none");
              }, i3.setEntityAlignment = function(t5) {
                var e4 = i3.props, n5 = e4.block, o4 = e4.contentState, r4 = n5.getEntityAt(0);
                o4.mergeEntityData(r4, { alignment: t5 }), d2.onChange(E.EditorState.push(d2.getEditorState(), o4, "change-block-data")), i3.setState({ dummy: true });
              }, i3.toggleHovered = function() {
                var t5 = !i3.state.hovered;
                i3.setState({ hovered: t5 });
              }, i3;
            }
            return t3 = r3, (e2 = [{ key: "renderAlignmentOptions", value: function(t4) {
              return N.a.createElement("div", { className: w()("rdw-image-alignment-options-popup", { "rdw-image-alignment-options-popup-right": "right" === t4 }) }, N.a.createElement(R, { onClick: this.setEntityAlignmentLeft, className: "rdw-image-alignment-option" }, "L"), N.a.createElement(R, { onClick: this.setEntityAlignmentCenter, className: "rdw-image-alignment-option" }, "C"), N.a.createElement(R, { onClick: this.setEntityAlignmentRight, className: "rdw-image-alignment-option" }, "R"));
            } }, { key: "render", value: function() {
              var t4 = this.props, e3 = t4.block, n4 = t4.contentState, o4 = this.state.hovered, r4 = d2.isReadOnly, i3 = d2.isImageAlignmentEnabled, c3 = n4.getEntity(e3.getEntityAt(0)).getData(), a3 = c3.src, l2 = c3.alignment, s2 = c3.height, u2 = c3.width, p2 = c3.alt;
              return N.a.createElement("span", { onMouseEnter: this.toggleHovered, onMouseLeave: this.toggleHovered, className: w()("rdw-image-alignment", { "rdw-image-left": "left" === l2, "rdw-image-right": "right" === l2, "rdw-image-center": !l2 || "none" === l2 }) }, N.a.createElement("span", { className: "rdw-image-imagewrapper" }, N.a.createElement("img", { src: a3, alt: p2, style: { height: s2, width: u2 } }), !r4() && o4 && i3() ? this.renderAlignmentOptions(l2) : void 0));
            } }]) && Fo(t3.prototype, e2), n3 && Fo(t3, n3), Object.defineProperty(t3, "prototype", { writable: false }), r3;
          }()).propTypes = { block: y.a.object, contentState: y.a.object }, t2;
        }, Wo = function(o3, r3) {
          return function(t2) {
            if ("function" == typeof r3) {
              var e2 = r3(t2, o3, o3.getEditorState);
              if (e2)
                return e2;
            }
            if ("atomic" === t2.getType()) {
              var n3 = o3.getEditorState().getCurrentContent().getEntity(t2.getEntityAt(0));
              if (n3 && "IMAGE" === n3.type)
                return { component: Zo(o3), editable: false };
              if (n3 && "EMBEDDED_LINK" === n3.type)
                return { component: Uo, editable: false };
            }
          };
        }, Go = { options: ["inline", "blockType", "fontSize", "fontFamily", "list", "textAlign", "colorPicker", "link", "embedded", "emoji", "image", "remove", "history"], inline: { inDropdown: false, className: void 0, component: void 0, dropdownClassName: void 0, options: ["bold", "italic", "underline", "strikethrough", "monospace", "superscript", "subscript"], bold: { icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTYuMjM2IDBjMS42NTIgMCAyLjk0LjI5OCAzLjg2Ni44OTMuOTI1LjU5NSAxLjM4OCAxLjQ4NSAxLjM4OCAyLjY2OSAwIC42MDEtLjE3MyAxLjEzOS0uNTE2IDEuNjEtLjM0My40NzQtLjg0NC44My0xLjQ5OSAxLjA2OC44NDMuMTY3IDEuNDc0LjUyMyAxLjg5NSAxLjA3MS40MTkuNTUuNjMgMS4xODMuNjMgMS45MDMgMCAxLjI0NS0uNDQ0IDIuMTg3LTEuMzMgMi44MjUtLjg4Ni42NDEtMi4xNDQuOTYxLTMuNzY5Ljk2MUgwdi0yLjE2N2gxLjQ5NFYyLjE2N0gwVjBoNi4yMzZ6TTQuMzA4IDUuNDQ2aDIuMDI0Yy43NTIgMCAxLjMzLS4xNDMgMS43MzQtLjQzLjQwNS0uMjg1LjYwOC0uNzAxLjYwOC0xLjI1IDAtLjYtLjIwNC0xLjA0NC0uNjEyLTEuMzMtLjQwOC0uMjg2LTEuMDE2LS40MjctMS44MjYtLjQyN0g0LjMwOHYzLjQzN3ptMCAxLjgwNFYxMWgyLjU5M2MuNzQ3IDAgMS4zMTQtLjE1MiAxLjcwNy0uNDUyLjM5LS4zLjU4OC0uNzQ1LjU4OC0xLjMzNCAwLS42MzYtLjE2OC0xLjEyNC0uNS0xLjQ2LS4zMzYtLjMzNS0uODY0LS41MDQtMS41ODItLjUwNEg0LjMwOHoiIGZpbGw9IiMwMDAiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==", className: void 0, title: void 0 }, italic: { icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+PHBhdGggZD0iTTcgM1YyaDR2MUg5Ljc1M2wtMyAxMEg4djFINHYtMWgxLjI0N2wzLTEwSDd6Ii8+PC9zdmc+", className: void 0, title: void 0 }, underline: { icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+PHBhdGggZD0iTTYuMDQ1IDJ2Ljk5Mkw0Ljc4NSAzdjUuMTcyYzAgLjg1OS4yNDMgMS41MTIuNzI3IDEuOTU3czEuMTI0LjY2OCAxLjkxOC42NjhjLjgzNiAwIDEuNTA5LS4yMjEgMi4wMTktLjY2NC41MTEtLjQ0Mi43NjYtMS4wOTYuNzY2LTEuOTYxVjNsLTEuMjYtLjAwOFYySDEzdi45OTJMMTEuNzM5IDN2NS4xNzJjMCAxLjIzNC0uMzk4IDIuMTgxLTEuMTk1IDIuODQtLjc5Ny42NTktMS44MzUuOTg4LTMuMTE0Ljk4OC0xLjI0MiAwLTIuMjQ4LS4zMjktMy4wMTctLjk4OC0uNzY5LS42NTktMS4xNTItMS42MDUtMS4xNTItMi44NFYzTDIgMi45OTJWMmg0LjA0NXpNMiAxM2gxMXYxSDJ6Ii8+PC9zdmc+", className: void 0, title: void 0 }, strikethrough: { icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUiIGhlaWdodD0iMTMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iIzAwMCIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNNC4wNCA1Ljk1NGg2LjIxNWE3LjQxMiA3LjQxMiAwIDAgMC0uNzk1LS40MzggMTEuOTA3IDExLjkwNyAwIDAgMC0xLjQ0Ny0uNTU3Yy0xLjE4OC0uMzQ4LTEuOTY2LS43MTEtMi4zMzQtMS4wODgtLjM2OC0uMzc3LS41NTItLjc3LS41NTItMS4xODEgMC0uNDk1LjE4Ny0uOTA2LjU2LTEuMjMyLjM4LS4zMzEuODg3LS40OTcgMS41MjMtLjQ5Ny42OCAwIDEuMjY2LjI1NSAxLjc1Ny43NjcuMjk1LjMxNS41ODIuODkxLjg2MSAxLjczbC4xMTcuMDE2LjcwMy4wNS4xLS4wMjRjLjAyOC0uMTUyLjA0Mi0uMjc5LjA0Mi0uMzggMC0uMzM3LS4wMzktLjg1Mi0uMTE3LTEuNTQ0YTkuMzc0IDkuMzc0IDAgMCAwLS4xNzYtLjk5NUM5Ljg4LjM3OSA5LjM4NS4yNDQgOS4wMTcuMTc2IDguMzY1LjA3IDcuODk5LjAxNiA3LjYyLjAxNmMtMS40NSAwLTIuNTQ1LjM1Ny0zLjI4NyAxLjA3MS0uNzQ3LjcyLTEuMTIgMS41ODktMS4xMiAyLjYwNyAwIC41MTEuMTMzIDEuMDQuNCAxLjU4Ni4xMjkuMjUzLjI3LjQ3OC40MjcuNjc0ek04LjI4IDguMTE0Yy41NzUuMjM2Ljk1Ny40MzYgMS4xNDcuNTk5LjQ1MS40MS42NzcuODUyLjY3NyAxLjMyNCAwIC4zODMtLjEzLjc0NS0uMzkzIDEuMDg4LS4yNS4zMzgtLjU5LjU4LTEuMDIuNzI2YTMuNDE2IDMuNDE2IDAgMCAxLTEuMTYzLjIyOGMtLjQwNyAwLS43NzUtLjA2Mi0xLjEwNC0uMTg2YTIuNjk2IDIuNjk2IDAgMCAxLS44NzgtLjQ4IDMuMTMzIDMuMTMzIDAgMCAxLS42Ny0uNzk0IDEuNTI3IDEuNTI3IDAgMCAxLS4xMDQtLjIyNyA1Ny41MjMgNTcuNTIzIDAgMCAwLS4xODgtLjQ3MyAyMS4zNzEgMjEuMzcxIDAgMCAwLS4yNTEtLjU5OWwtLjg1My4wMTd2LjM3MWwtLjAxNy4zMTNhOS45MiA5LjkyIDAgMCAwIDAgLjU3M2MuMDExLjI3LjAxNy43MDkuMDE3IDEuMzE2di4xMWMwIC4wNzkuMDIyLjE0LjA2Ny4xODUuMDgzLjA2OC4yODQuMTQ3LjYwMi4yMzdsMS4xNy4zMzdjLjQ1Mi4xMy45OTYuMTk0IDEuNjMyLjE5NC42ODYgMCAxLjI1Mi0uMDU5IDEuNjk4LS4xNzdhNC42OTQgNC42OTQgMCAwIDAgMS4yOC0uNTU3Yy40MDEtLjI1OS43MDUtLjQ4Ni45MTEtLjY4My4yNjgtLjI3Ni40NjYtLjU2OC41OTQtLjg3OGE0Ljc0IDQuNzQgMCAwIDAgLjM0My0xLjc4OGMwLS4yOTgtLjAyLS41NTctLjA1OC0uNzc2SDguMjgxek0xNC45MTQgNi41N2EuMjYuMjYgMCAwIDAtLjE5My0uMDc2SC4yNjhhLjI2LjI2IDAgMCAwLS4xOTMuMDc2LjI2NC4yNjQgMCAwIDAtLjA3NS4xOTR2LjU0YzAgLjA3OS4wMjUuMTQzLjA3NS4xOTRhLjI2LjI2IDAgMCAwIC4xOTMuMDc2SDE0LjcyYS4yNi4yNiAwIDAgMCAuMTkzLS4wNzYuMjY0LjI2NCAwIDAgMCAuMDc1LS4xOTR2LS41NGEuMjY0LjI2NCAwIDAgMC0uMDc1LS4xOTR6Ii8+PC9nPjwvc3ZnPg==", className: void 0, title: void 0 }, monospace: { icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTMiIGhlaWdodD0iMTUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iIzQ0NCIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMS4wMjEgMi45MDZjLjE4NiAxLjIxOS4zNzIgMS41LjM3MiAyLjcxOUMxLjM5MyA2LjM3NSAwIDcuMDMxIDAgNy4wMzF2LjkzOHMxLjM5My42NTYgMS4zOTMgMS40MDZjMCAxLjIxOS0uMTg2IDEuNS0uMzcyIDIuNzE5Qy43NDMgMTQuMDYzIDEuNzY0IDE1IDIuNjkzIDE1aDEuOTV2LTEuODc1cy0xLjY3Mi4xODgtMS42NzItLjkzOGMwLS44NDMuMTg2LS44NDMuMzcyLTIuNzE4LjA5My0uODQ0LS40NjQtMS41LTEuMDIyLTEuOTY5LjU1OC0uNDY5IDEuMTE1LTEuMDMxIDEuMDIyLTEuODc1QzMuMDY0IDMuNzUgMi45NyAzLjc1IDIuOTcgMi45MDZjMC0xLjEyNSAxLjY3Mi0xLjAzMSAxLjY3Mi0xLjAzMVYwaC0xLjk1QzEuNjcgMCAuNzQzLjkzOCAxLjAyIDIuOTA2ek0xMS45NzkgMi45MDZjLS4xODYgMS4yMTktLjM3MiAxLjUtLjM3MiAyLjcxOSAwIC43NSAxLjM5MyAxLjQwNiAxLjM5MyAxLjQwNnYuOTM4cy0xLjM5My42NTYtMS4zOTMgMS40MDZjMCAxLjIxOS4xODYgMS41LjM3MiAyLjcxOS4yNzggMS45NjktLjc0MyAyLjkwNi0xLjY3MiAyLjkwNmgtMS45NXYtMS44NzVzMS42NzIuMTg4IDEuNjcyLS45MzhjMC0uODQzLS4xODYtLjg0My0uMzcyLTIuNzE4LS4wOTMtLjg0NC40NjQtMS41IDEuMDIyLTEuOTY5LS41NTgtLjQ2OS0xLjExNS0xLjAzMS0xLjAyMi0xLjg3NS4xODYtMS44NzUuMzcyLTEuODc1LjM3Mi0yLjcxOSAwLTEuMTI1LTEuNjcyLTEuMDMxLTEuNjcyLTEuMDMxVjBoMS45NWMxLjAyMiAwIDEuOTUuOTM4IDEuNjcyIDIuOTA2eiIvPjwvZz48L3N2Zz4=", className: void 0, title: void 0 }, superscript: { icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTciIGhlaWdodD0iMTUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTcuMzA1IDEwLjE2NUwxMS44NjUgMTVIOS4wNTdsLTMuMTkyLTMuNTM2TDIuNzQ2IDE1SDBsNC41MjMtNC44MzVMLjIxOCA1LjYwM2gyLjc3TDUuOTg2IDguOTEgOS4wMSA1LjYwM2gyLjY0OWwtNC4zNTQgNC41NjJ6bTYuMjM0LTMuMjY5bDEuODc5LTEuMzA2Yy42NC0uNDE2IDEuMDYyLS44MDEgMS4yNjQtMS4xNTcuMjAxLS4zNTYuMzAyLS43MzguMzAyLTEuMTQ4IDAtLjY2OS0uMjM3LTEuMjEtLjcxLTEuNjItLjQ3NC0uNDExLTEuMDk3LS42MTctMS44NjgtLjYxNy0uNzQ0IDAtMS4zNC4yMDgtMS43ODUuNjI0LS40NDcuNDE2LS42NyAxLjA0My0uNjcgMS44ODFoMS40MzZjMC0uNS4wOTQtLjg0Ni4yODEtMS4wMzguMTg4LS4xOTEuNDQ1LS4yODcuNzcyLS4yODdzLjU4NS4wOTcuNzc3LjI5MmMuMTkuMTk1LjI4Ni40MzcuMjg2LjcyNiAwIC4yOS0uMDg5LjU1LS4yNjYuNzg1cy0uNjcuNjI4LTEuNDc5IDEuMTg0Yy0uNjkxLjQ3Ny0xLjYyNy45MjctMS45MDggMS4zNWwuMDE0IDEuNTY5SDE3VjYuODk2aC0zLjQ2MXoiLz48L3N2Zz4=", className: void 0, title: void 0 }, subscript: { icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTciIGhlaWdodD0iMTUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTExLjg2NiAxMS42NDZIOS4wNkw1Ljg2NyA3Ljk0MmwtMy4xMjEgMy43MDRIMGw0LjUyNC01LjA2NEwuMjE4IDEuODA0aDIuNzdsMyAzLjQ2NCAzLjAyMy0zLjQ2NGgyLjY1TDcuMzA2IDYuNTgybDQuNTYgNS4wNjR6bTEuNzI1IDIuMDU4bDEuODI3LTEuMzY4Yy42NC0uNDM1IDEuMDYyLS44NCAxLjI2NC0xLjIxMi4yMDItLjM3Mi4zMDItLjc3My4zMDItMS4yMDIgMC0uNy0uMjM3LTEuMjY2LS43MS0xLjY5Ni0uNDc0LS40MzEtMS4wOTctLjY0Ni0xLjg2OS0uNjQ2LS43NDQgMC0xLjM0LjIxOC0xLjc4NS42NTMtLjQ0Ni40MzYtLjY3IDEuMDkyLS42NyAxLjk3aDEuNDM2YzAtLjUyNC4wOTQtLjg4Ni4yODEtMS4wODcuMTg4LS4yLjQ0NS0uMzAxLjc3Mi0uMzAxcy41ODYuMTAyLjc3Ny4zMDZjLjE5LjIwNC4yODYuNDU4LjI4Ni43NiAwIC4zMDMtLjA4OC41NzctLjI2Ni44MjItLjE3Ny4yNDUtLjY3LjY1OC0xLjQ3OCAxLjI0LS42OTIuNS0xLjYyOC45NzEtMS45MSAxLjQxM0wxMS44NjQgMTVIMTd2LTEuMjk2aC0zLjQxeiIvPjwvc3ZnPg==", className: void 0, title: void 0 } }, blockType: { inDropdown: true, options: ["Normal", "H1", "H2", "H3", "H4", "H5", "H6", "Blockquote", "Code"], className: void 0, component: void 0, dropdownClassName: void 0, title: void 0 }, fontSize: { icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iIzAwMCIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTEuOTIxIDMuMTE5YS40MjcuNDI3IDAgMCAwIC4zMzUuMTY0aC45N2EuNDI2LjQyNiAwIDAgMCAuMzA0LS4xMy40NDEuNDQxIDAgMCAwIC4xMjUtLjMxbC4wMDItMi40MWEuNDM0LjQzNCAwIDAgMC0uNDMtLjQzMkguNDNBLjQzNC40MzQgMCAwIDAgMCAuNDR2Mi40MDZjMCAuMjQyLjE5Mi40MzguNDMuNDM4aC45N2MuMTMgMCAuMjU0LS4wNi4zMzUtLjE2NWwuNzMtLjkzSDUuNTR2MTEuMzZjMCAuMjQxLjE5Mi40MzcuNDMuNDM3aDEuNzE3Yy4yMzcgMCAuNDMtLjE5Ni40My0uNDM3VjIuMTg4aDMuMDdsLjczNC45MzF6TTEzLjg5OCAxMS4yNjNhLjQyNS40MjUgMCAwIDAtLjQ4Mi0uMTQ2bC0uNTQ3LjE5NFY5LjYxN2EuNDQyLjQ0MiAwIDAgMC0uMTI2LS4zMS40MjYuNDI2IDAgMCAwLS4zMDQtLjEyN2gtLjQyOWEuNDM0LjQzNCAwIDAgMC0uNDMuNDM3djEuNjk0bC0uNTQ3LS4xOTRhLjQyNS40MjUgMCAwIDAtLjQ4MS4xNDYuNDQ0LjQ0NCAwIDAgMC0uMDE2LjUxMmwxLjMzMiAyLjAxN2EuNDI3LjQyNyAwIDAgMCAuNzEzIDBsMS4zMzMtMi4wMTdhLjQ0NC40NDQgMCAwIDAtLjAxNi0uNTEyeiIvPjwvZz48L3N2Zz4=", options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96], className: void 0, component: void 0, dropdownClassName: void 0, title: void 0 }, fontFamily: { options: ["Arial", "Georgia", "Impact", "Tahoma", "Times New Roman", "Verdana"], className: void 0, component: void 0, dropdownClassName: void 0, title: void 0 }, list: { inDropdown: false, className: void 0, component: void 0, dropdownClassName: void 0, options: ["unordered", "ordered", "indent", "outdent"], unordered: { icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iIzAwMCIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMS43MiAzLjQyN2MuOTUxIDAgMS43MjItLjc2OCAxLjcyMi0xLjcwOFMyLjY3LjAxIDEuNzIuMDFDLjc3LjAwOCAwIC43NzUgMCAxLjcxNWMwIC45NC43NzQgMS43MTEgMS43MiAxLjcxMXptMC0yLjYyNWMuNTEgMCAuOTIyLjQxMi45MjIuOTE0YS45Mi45MiAwIDAgMS0xLjg0MiAwIC45Mi45MiAwIDAgMSAuOTItLjkxNHpNMS43MiA4LjcwM2MuOTUxIDAgMS43MjItLjc2OCAxLjcyMi0xLjcwOFMyLjY3IDUuMjg3IDEuNzIgNS4yODdDLjc3IDUuMjg3IDAgNi4wNTIgMCA2Ljk5NXMuNzc0IDEuNzA4IDEuNzIgMS43MDh6bTAtMi42MjJjLjUxIDAgLjkyMi40MTIuOTIyLjkxNGEuOTIuOTIgMCAwIDEtMS44NDIgMGMwLS41MDUuNDE1LS45MTQuOTItLjkxNHpNMS43MiAxMy45ODJjLjk1MSAwIDEuNzIyLS43NjggMS43MjItMS43MDggMC0uOTQzLS43NzQtMS43MDgtMS43MjEtMS43MDgtLjk0NyAwLTEuNzIxLjc2OC0xLjcyMSAxLjcwOHMuNzc0IDEuNzA4IDEuNzIgMS43MDh6bTAtMi42MjVjLjUxIDAgLjkyMi40MTIuOTIyLjkxNGEuOTIuOTIgMCAxIDEtMS44NDIgMCAuOTIuOTIgMCAwIDEgLjkyLS45MTR6TTUuNzQ0IDIuMTE1aDkuODQ1YS40LjQgMCAwIDAgLjQwMS0uMzk5LjQuNCAwIDAgMC0uNDAxLS4zOTlINS43NDRhLjQuNCAwIDAgMC0uNDAyLjM5OS40LjQgMCAwIDAgLjQwMi4zOTl6TTUuNzQ0IDcuMzk0aDkuODQ1YS40LjQgMCAwIDAgLjQwMS0uMzk5LjQuNCAwIDAgMC0uNDAxLS4zOThINS43NDRhLjQuNCAwIDAgMC0uNDAyLjM5OC40LjQgMCAwIDAgLjQwMi4zOTl6TTUuNzQ0IDEyLjY3aDkuODQ1YS40LjQgMCAwIDAgLjQwMS0uMzk5LjQuNCAwIDAgMC0uNDAxLS4zOTlINS43NDRhLjQuNCAwIDAgMC0uNDAyLjQuNC40IDAgMCAwIC40MDIuMzk4eiIvPjwvZz48L3N2Zz4=", className: void 0, title: void 0 }, ordered: { icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTMiIGhlaWdodD0iMTMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iIzAwMCIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNNC4yMDIgMS40NjZoOC4xNWMuMzM4IDAgLjYxMi0uMzIyLjYxMi0uNzIgMC0uMzk3LS4yNzQtLjcyLS42MTItLjcyaC04LjE1Yy0uMzM4IDAtLjYxMS4zMjMtLjYxMS43MiAwIC4zOTguMjczLjcyLjYxLjcyek0xMi4zNTIgNS43ODNoLTguMTVjLS4zMzggMC0uNjExLjMyMi0uNjExLjcyIDAgLjM5Ny4yNzMuNzIuNjEuNzJoOC4xNTFjLjMzOCAwIC42MTItLjMyMy42MTItLjcyIDAtLjM5OC0uMjc0LS43Mi0uNjEyLS43MnpNMTIuMzUyIDExLjU0aC04LjE1Yy0uMzM4IDAtLjYxMS4zMjItLjYxMS43MiAwIC4zOTYuMjczLjcxOS42MS43MTloOC4xNTFjLjMzOCAwIC42MTItLjMyMy42MTItLjcyIDAtLjM5Ny0uMjc0LS43Mi0uNjEyLS43MnpNLjc2NyAxLjI0OXYxLjgwMmMwIC4xOTUuMTM2LjM0My4zMTUuMzQzLjE3NiAwIC4zMTUtLjE1LjMxNS0uMzQzVi4zNTZjMC0uMTktLjEzMy0uMzM5LS4zMDItLjMzOS0uMTQ4IDAtLjIyMy4xMTgtLjI0Ny4xNTZhLjIyOC4yMjggMCAwIDAtLjAwMy4wMDVMLjU3OS42MjFhLjQ3NC40NzQgMCAwIDAtLjA5OC4yNzNjMCAuMTk0LjEyOC4zNTEuMjg2LjM1NXpNLjM1MiA4LjE5SDEuNTVjLjE1NyAwIC4yODUtLjE2Mi4yODUtLjM2MiAwLS4xOTgtLjEyOC0uMzU5LS4yODUtLjM1OUguNjh2LS4wMDZjMC0uMTA3LjIxLS4yODEuMzc4LS40MjIuMzM2LS4yNzguNzUzLS42MjUuNzUzLTEuMjI2IDAtLjU3LS4zNzYtMS0uODc0LTEtLjQ3NyAwLS44MzYuMzg1LS44MzYuODk3IDAgLjI5Ny4xNjQuNDAyLjMwNS40MDIuMiAwIC4zMjEtLjE3Ni4zMjEtLjM0NiAwLS4xMDYuMDIzLS4yMjguMjA0LS4yMjguMjQzIDAgLjI1LjI1NC4yNS4yODMgMCAuMjI4LS4yNTIuNDQyLS40OTUuNjQ5LS4zMDEuMjU1LS42NDIuNTQ0LS42NDIuOTkydi4zODRjMCAuMjA1LjE1OS4zNDMuMzA4LjM0M3pNMS43NyAxMC41NDNjMC0uNTkyLS4yOTYtLjkzMS0uODE0LS45MzEtLjY4IDAtLjg1OS41Ny0uODU5Ljg3MiAwIC4zNTEuMjIyLjM5LjMxOC4zOS4xODUgMCAuMzEtLjE0OC4zMS0uMzY2IDAtLjA4NC4wMjYtLjE4MS4yMjQtLjE4MS4xNDIgMCAuMi4wMjQuMi4yNjcgMCAuMjM3LS4wNDMuMjYzLS4yMTMuMjYzLS4xNjQgMC0uMjg4LjE1Mi0uMjg4LjM1NCAwIC4yLjEyNS4zNS4yOTEuMzUuMjI1IDAgLjI3LjEwOC4yNy4yODN2LjA3NWMwIC4yOTQtLjA5Ny4zNS0uMjc3LjM1LS4yNDggMC0uMjY3LS4xNS0uMjY3LS4xOTcgMC0uMTc0LS4wOTgtLjM1LS4zMTctLjM1LS4xOTIgMC0uMzA3LjE0MS0uMzA3LjM3OCAwIC40My4zMTMuODg4Ljg5NS44ODguNTY0IDAgLjkwMS0uNC45MDEtMS4wN3YtLjA3NGMwLS4yNzQtLjA3NC0uNTAyLS4yMTQtLjY2Ni4wOTYtLjE2My4xNDgtLjM4LjE0OC0uNjM1eiIvPjwvZz48L3N2Zz4=", className: void 0, title: void 0 }, indent: { icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTciIGhlaWdodD0iMTQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iIzAwMCIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNNS43MTYgMy4yMTFIMTd2MS4xOTdINS43MTZ6TTAgLjAyaDE3djEuMTk3SDB6TTAgMTIuNzgzaDE3djEuMTk3SDB6TTUuNzE2IDkuNTkzSDE3djEuMTk3SDUuNzE2ek01LjcxNiA2LjQwMkgxN3YxLjE5N0g1LjcxNnpNLjE4NyA5LjQ5MUwyLjUyIDcgLjE4NyA0LjUwOXoiLz48L2c+PC9zdmc+", className: void 0, title: void 0 }, outdent: { icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iIzAwMCIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNNS4zOTYgMy4xOTNoMTAuNTczVjQuMzlINS4zOTZ6TS4wMzkuMDAzaDE1LjkzVjEuMkguMDM5ek0uMDM5IDEyLjc2NmgxNS45M3YxLjE5N0guMDM5ek01LjM5NiA5LjU3NWgxMC41NzN2MS4xOTdINS4zOTZ6TTUuMzk2IDYuMzg0aDEwLjU3M3YxLjE5N0g1LjM5NnpNMi4xODcgNC40OTFMMCA2Ljk4M2wyLjE4NyAyLjQ5MXoiLz48L2c+PC9zdmc+", className: void 0, title: void 0 }, title: void 0 }, textAlign: { inDropdown: false, className: void 0, component: void 0, dropdownClassName: void 0, options: ["left", "center", "right", "justify"], left: { icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iIzAwMCIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNOC40OTMgMTQuODg3SC4zMjZhLjMyNi4zMjYgMCAwIDEgMC0uNjUyaDguMTY3YS4zMjYuMzI2IDAgMCAxIDAgLjY1MnpNMTQuNjE4IDEwLjE2MkguMzI2YS4zMjYuMzI2IDAgMCAxIDAtLjY1M2gxNC4yOTJhLjMyNi4zMjYgMCAwIDEgMCAuNjUzek04LjQ5MyA1LjQzNUguMzI2YS4zMjYuMzI2IDAgMCAxIDAtLjY1Mmg4LjE2N2EuMzI2LjMyNiAwIDAgMSAwIC42NTJ6TTE0LjYxOC43MDlILjMyNmEuMzI2LjMyNiAwIDAgMSAwLS42NTJoMTQuMjkyYS4zMjYuMzI2IDAgMCAxIDAgLjY1MnoiLz48L2c+PC9zdmc+", className: void 0, title: void 0 }, center: { icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iIzAwMCIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTEuNTU2IDE0Ljg4N0gzLjM4OGEuMzI2LjMyNiAwIDAgMSAwLS42NTJoOC4xNjdhLjMyNi4zMjYgMCAwIDEgMCAuNjUyek0xNC42MTggMTAuMTYySC4zMjZhLjMyNi4zMjYgMCAwIDEgMC0uNjUzaDE0LjI5MmEuMzI2LjMyNiAwIDAgMSAwIC42NTN6TTExLjU1NiA1LjQzNUgzLjM4OGEuMzI2LjMyNiAwIDAgMSAwLS42NTJoOC4xNjdhLjMyNi4zMjYgMCAwIDEgMCAuNjUyek0xNC42MTguNzA5SC4zMjZhLjMyNi4zMjYgMCAwIDEgMC0uNjUyaDE0LjI5MmEuMzI2LjMyNiAwIDAgMSAwIC42NTJ6Ii8+PC9nPjwvc3ZnPg==", className: void 0, title: void 0 }, right: { icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iIzAwMCIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTQuNjE4IDE0Ljg4N0g2LjQ1YS4zMjYuMzI2IDAgMCAxIDAtLjY1Mmg4LjE2N2EuMzI2LjMyNiAwIDAgMSAwIC42NTJ6TTE0LjYxOCAxMC4xNjJILjMyNmEuMzI2LjMyNiAwIDAgMSAwLS42NTNoMTQuMjkyYS4zMjYuMzI2IDAgMCAxIDAgLjY1M3pNMTQuNjE4IDUuNDM1SDYuNDVhLjMyNi4zMjYgMCAwIDEgMC0uNjUyaDguMTY3YS4zMjYuMzI2IDAgMCAxIDAgLjY1MnpNMTQuNjE4LjcwOUguMzI2YS4zMjYuMzI2IDAgMCAxIDAtLjY1MmgxNC4yOTJhLjMyNi4zMjYgMCAwIDEgMCAuNjUyeiIvPjwvZz48L3N2Zz4=", className: void 0, title: void 0 }, justify: { icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iIzAwMCIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTQuNjIgMTQuODg4SC4zMjVhLjMyNi4zMjYgMCAwIDEgMC0uNjUySDE0LjYyYS4zMjYuMzI2IDAgMCAxIDAgLjY1MnpNMTQuNjIgMTAuMTYySC4zMjVhLjMyNi4zMjYgMCAwIDEgMC0uNjUySDE0LjYyYS4zMjYuMzI2IDAgMCAxIDAgLjY1MnpNMTQuNjIgNS40MzZILjMyNWEuMzI2LjMyNiAwIDAgMSAwLS42NTJIMTQuNjJhLjMyNi4zMjYgMCAwIDEgMCAuNjUyek0xNC42Mi43MUguMzI1YS4zMjYuMzI2IDAgMCAxIDAtLjY1M0gxNC42MmEuMzI2LjMyNiAwIDAgMSAwIC42NTN6Ii8+PC9nPjwvc3ZnPg==", className: void 0, title: void 0 }, title: void 0 }, colorPicker: { icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iIzAwMCIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTQuNDA2LjU4NWExLjk5OCAxLjk5OCAwIDAgMC0yLjgyNSAwbC0uNTQuNTRhLjc0MS43NDEgMCAxIDAtMS4wNDggMS4wNDhsLjE3NS4xNzUtNS44MjYgNS44MjUtMi4wMjIgMi4wMjNhLjkxLjkxIDAgMCAwLS4yNjYuNjAybC0uMDA1LjEwOHYuMDAybC0uMDgxIDEuODI5YS4zMDIuMzAyIDAgMCAwIC4zMDIuMzE2aC4wMTNsLjk3LS4wNDQuNTkyLS4wMjYuMjY4LS4wMTJjLjI5Ny0uMDEzLjU3OS0uMTM3Ljc5LS4zNDdsNy43Ny03Ljc3LjE0Ni4xNDRhLjc0Ljc0IDAgMCAwIDEuMDQ4IDBjLjI5LS4yOS4yOS0uNzU5IDAtMS4wNDhsLjU0LS41NGMuNzgtLjc4Ljc4LTIuMDQ0IDAtMi44MjV6TTguNzk1IDcuMzMzbC0yLjczLjUxNSA0LjQ1Mi00LjQ1MiAxLjEwOCAxLjEwNy0yLjgzIDIuODN6TTIuMDggMTMuNjczYy0xLjE0OCAwLTIuMDguMjk1LTIuMDguNjYgMCAuMzYzLjkzMi42NTggMi4wOC42NTggMS4xNSAwIDIuMDgtLjI5NCAyLjA4LS42NTkgMC0uMzY0LS45My0uNjU5LTIuMDgtLjY1OXoiLz48L2c+PC9zdmc+", className: void 0, component: void 0, popupClassName: void 0, colors: ["rgb(97,189,109)", "rgb(26,188,156)", "rgb(84,172,210)", "rgb(44,130,201)", "rgb(147,101,184)", "rgb(71,85,119)", "rgb(204,204,204)", "rgb(65,168,95)", "rgb(0,168,133)", "rgb(61,142,185)", "rgb(41,105,176)", "rgb(85,57,130)", "rgb(40,50,78)", "rgb(0,0,0)", "rgb(247,218,100)", "rgb(251,160,38)", "rgb(235,107,86)", "rgb(226,80,65)", "rgb(163,143,132)", "rgb(239,239,239)", "rgb(255,255,255)", "rgb(250,197,28)", "rgb(243,121,52)", "rgb(209,72,65)", "rgb(184,49,47)", "rgb(124,112,107)", "rgb(209,213,216)"], title: void 0 }, link: { inDropdown: false, className: void 0, component: void 0, popupClassName: void 0, dropdownClassName: void 0, showOpenOptionOnHover: true, defaultTargetOption: "_self", options: ["link", "unlink"], link: { icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEzLjk2Ny45NUEzLjIyNiAzLjIyNiAwIDAgMCAxMS42Ny4wMDJjLS44NyAwLTEuNjg2LjMzNy0yLjI5Ny45NDhMNy4xMDUgMy4yMThBMy4yNDcgMy4yNDcgMCAwIDAgNi4yNCA2LjI0YTMuMjI1IDMuMjI1IDAgMCAwLTMuMDIyLjg2NUwuOTUgOS4zNzNhMy4yNTMgMy4yNTMgMCAwIDAgMCA0LjU5NCAzLjIyNiAzLjIyNiAwIDAgMCAyLjI5Ny45NDhjLjg3IDAgMS42ODYtLjMzNiAyLjI5OC0uOTQ4TDcuODEyIDExLjdhMy4yNDcgMy4yNDcgMCAwIDAgLjg2NS0zLjAyMyAzLjIyNSAzLjIyNSAwIDAgMCAzLjAyMi0uODY1bDIuMjY4LTIuMjY3YTMuMjUyIDMuMjUyIDAgMCAwIDAtNC41OTV6TTcuMTA1IDEwLjk5M0w0LjgzNyAxMy4yNmEyLjIzMyAyLjIzMyAwIDAgMS0xLjU5LjY1NSAyLjIzMyAyLjIzMyAwIDAgMS0xLjU5LS42NTUgMi4yNTIgMi4yNTIgMCAwIDEgMC0zLjE4bDIuMjY4LTIuMjY4YTIuMjMyIDIuMjMyIDAgMCAxIDEuNTktLjY1NWMuNDMgMCAuODQxLjEyIDEuMTk1LjM0M0w0Ljc3MiA5LjQzOGEuNS41IDAgMSAwIC43MDcuNzA3bDEuOTM5LTEuOTM4Yy41NDUuODY4LjQ0MiAyLjAzLS4zMTMgMi43ODV6bTYuMTU1LTYuMTU1bC0yLjI2OCAyLjI2N2EyLjIzMyAyLjIzMyAwIDAgMS0xLjU5LjY1NWMtLjQzMSAwLS44NDEtLjEyLTEuMTk1LS4zNDNsMS45MzgtMS45MzhhLjUuNSAwIDEgMC0uNzA3LS43MDdMNy40OTkgNi43MWEyLjI1MiAyLjI1MiAwIDAgMSAuMzEzLTIuNzg1bDIuMjY3LTIuMjY4YTIuMjMzIDIuMjMzIDAgMCAxIDEuNTktLjY1NSAyLjIzMyAyLjIzMyAwIDAgMSAyLjI0NiAyLjI0NWMwIC42MDMtLjIzMiAxLjE2OC0uNjU1IDEuNTl6IiBmaWxsPSIjMDAwIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=", className: void 0, title: void 0 }, unlink: { icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iIzAwMCIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTMuOTU2IDEuMDM3YTMuNTUgMy41NSAwIDAgMC01LjAxNCAwTDYuNDM2IDMuNTQ0YS41NDUuNTQ1IDAgMSAwIC43Ny43N2wyLjUwOC0yLjUwNmEyLjQzOCAyLjQzOCAwIDAgMSAxLjczNS0uNzE1Yy42NTggMCAxLjI3NS4yNTQgMS43MzYuNzE1LjQ2LjQ2MS43MTUgMS4wNzguNzE1IDEuNzM2IDAgLjY1OC0uMjU0IDEuMjc0LS43MTUgMS43MzVMOS45MDcgOC41NThhMi40NTggMi40NTggMCAwIDEtMy40NzIgMCAuNTQ1LjU0NSAwIDEgMC0uNzcxLjc3MSAzLjUzNCAzLjUzNCAwIDAgMCAyLjUwNyAxLjAzN2MuOTA4IDAgMS44MTYtLjM0NiAyLjUwNy0xLjAzN2wzLjI3OC0zLjI3OGEzLjUyIDMuNTIgMCAwIDAgMS4wMzUtMi41MDdjMC0uOTUtLjM2Ny0xLjg0LTEuMDM1LTIuNTA3eiIvPjxwYXRoIGQ9Ik03LjQgMTEuMDY1bC0yLjEyMiAyLjEyYTIuNDM3IDIuNDM3IDAgMCAxLTEuNzM1LjcxNiAyLjQzNyAyLjQzNyAwIDAgMS0xLjczNi0uNzE1IDIuNDU3IDIuNDU3IDAgMCAxIDAtMy40NzFsMy4wODYtMy4wODZhMi40MzggMi40MzggMCAwIDEgMS43MzUtLjcxNWMuNjU4IDAgMS4yNzUuMjU0IDEuNzM2LjcxNWEuNTQ1LjU0NSAwIDEgMCAuNzcxLS43NzEgMy41NSAzLjU1IDAgMCAwLTUuMDE0IDBMMS4wMzYgOC45NDRBMy41MiAzLjUyIDAgMCAwIDAgMTEuNDVjMCAuOTUuMzY3IDEuODQgMS4wMzUgMi41MDdhMy41MiAzLjUyIDAgMCAwIDIuNTA2IDEuMDM1Yy45NSAwIDEuODQtLjM2OCAyLjUwNy0xLjAzNWwyLjEyMi0yLjEyMWEuNTQ1LjU0NSAwIDAgMC0uNzcxLS43NzF6TTkuMjc0IDEyLjAwMmEuNTQ2LjU0NiAwIDAgMC0uNTQ2LjU0NXYxLjYzN2EuNTQ2LjU0NiAwIDAgMCAxLjA5MSAwdi0xLjYzN2EuNTQ1LjU0NSAwIDAgMC0uNTQ1LS41NDV6TTExLjIzIDExLjYxNmEuNTQ1LjU0NSAwIDEgMC0uNzcyLjc3MmwxLjE1NyAxLjE1NmEuNTQzLjU0MyAwIDAgMCAuNzcxIDAgLjU0NS41NDUgMCAwIDAgMC0uNzdsLTEuMTU2LTEuMTU4ek0xMi41MzcgOS44MkgxMC45YS41NDYuNTQ2IDAgMCAwIDAgMS4wOTFoMS42MzdhLjU0Ni41NDYgMCAwIDAgMC0xLjA5ek00LjkxIDMuNTQ3YS41NDYuNTQ2IDAgMCAwIC41NDUtLjU0NVYxLjM2NmEuNTQ2LjU0NiAwIDAgMC0xLjA5IDB2MS42MzZjMCAuMzAxLjI0NC41NDUuNTQ1LjU0NXpNMi44ODggMy45MzNhLjU0My41NDMgMCAwIDAgLjc3MSAwIC41NDUuNTQ1IDAgMCAwIDAtLjc3MUwyLjUwMiAyLjAwNWEuNTQ1LjU0NSAwIDEgMC0uNzcxLjc3bDEuMTU3IDEuMTU4ek0xLjYyOCA1LjczaDEuNjM2YS41NDYuNTQ2IDAgMCAwIDAtMS4wOTJIMS42MjhhLjU0Ni41NDYgMCAwIDAgMCAxLjA5MXoiLz48L2c+PC9zdmc+", className: void 0, title: void 0 }, linkCallback: void 0 }, emoji: { icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTciIGhlaWdodD0iMTciIHZpZXdCb3g9IjE1LjcyOSAyMi4wODIgMTcgMTciIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTI5LjcwOCAyNS4xMDRjLTMuMDIxLTMuMDIyLTcuOTM3LTMuMDIyLTEwLjk1OCAwLTMuMDIxIDMuMDItMy4wMiA3LjkzNiAwIDEwLjk1OCAzLjAyMSAzLjAyIDcuOTM3IDMuMDIgMTAuOTU4LS4wMDEgMy4wMi0zLjAyMSAzLjAyLTcuOTM2IDAtMTAuOTU3em0tLjg0NSAxMC4xMTJhNi41NiA2LjU2IDAgMCAxLTkuMjY4IDAgNi41NiA2LjU2IDAgMCAxIDAtOS4yNjcgNi41NiA2LjU2IDAgMCAxIDkuMjY4IDAgNi41NiA2LjU2IDAgMCAxIDAgOS4yNjd6bS03LjUyNC02LjczYS45MDYuOTA2IDAgMSAxIDEuODExIDAgLjkwNi45MDYgMCAwIDEtMS44MTEgMHptNC4xMDYgMGEuOTA2LjkwNiAwIDEgMSAxLjgxMiAwIC45MDYuOTA2IDAgMCAxLTEuODEyIDB6bTIuMTQxIDMuNzA4Yy0uNTYxIDEuMjk4LTEuODc1IDIuMTM3LTMuMzQ4IDIuMTM3LTEuNTA1IDAtMi44MjctLjg0My0zLjM2OS0yLjE0N2EuNDM4LjQzOCAwIDAgMSAuODEtLjMzNmMuNDA1Ljk3NiAxLjQxIDEuNjA3IDIuNTU5IDEuNjA3IDEuMTIzIDAgMi4xMjEtLjYzMSAyLjU0NC0xLjYwOGEuNDM4LjQzOCAwIDAgMSAuODA0LjM0N3oiLz48L3N2Zz4=", className: void 0, component: void 0, popupClassName: void 0, emojis: ["😀", "😁", "😂", "😃", "😉", "😋", "😎", "😍", "😗", "🤗", "🤔", "😣", "😫", "😴", "😌", "🤓", "😛", "😜", "😠", "😇", "😷", "😈", "👻", "😺", "😸", "😹", "😻", "😼", "😽", "🙀", "🙈", "🙉", "🙊", "👼", "👮", "🕵", "💂", "👳", "🎅", "👸", "👰", "👲", "🙍", "🙇", "🚶", "🏃", "💃", "⛷", "🏂", "🏌", "🏄", "🚣", "🏊", "⛹", "🏋", "🚴", "👫", "💪", "👈", "👉", "👆", "🖕", "👇", "🖖", "🤘", "🖐", "👌", "👍", "👎", "✊", "👊", "👏", "🙌", "🙏", "🐵", "🐶", "🐇", "🐥", "🐸", "🐌", "🐛", "🐜", "🐝", "🍉", "🍄", "🍔", "🍤", "🍨", "🍪", "🎂", "🍰", "🍾", "🍷", "🍸", "🍺", "🌍", "🚑", "⏰", "🌙", "🌝", "🌞", "⭐", "🌟", "🌠", "🌨", "🌩", "⛄", "🔥", "🎄", "🎈", "🎉", "🎊", "🎁", "🎗", "🏀", "🏈", "🎲", "🔇", "🔈", "📣", "🔔", "🎵", "🎷", "💰", "🖊", "📅", "✅", "❎", "💯"], title: void 0 }, embedded: { icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTciIGhlaWdodD0iMTciIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTYuNzA4IDYuNjE1YS40MzYuNDM2IDAgMCAwLS41NDMuMjkxbC0xLjgzIDYuMDQ1YS40MzYuNDM2IDAgMCAwIC44MzMuMjUyTDcgNy4xNmEuNDM2LjQzNiAwIDAgMC0uMjktLjU0NHpNOC45MzEgNi42MTVhLjQzNi40MzYgMCAwIDAtLjU0My4yOTFsLTEuODMgNi4wNDVhLjQzNi40MzYgMCAwIDAgLjgzNC4yNTJsMS44My02LjA0NGEuNDM2LjQzNiAwIDAgMC0uMjktLjU0NHoiLz48cGF0aCBkPSJNMTYuNTY0IDBILjQzNkEuNDM2LjQzNiAwIDAgMCAwIC40MzZ2MTYuMTI4YzAgLjI0LjE5NS40MzYuNDM2LjQzNmgxNi4xMjhjLjI0IDAgLjQzNi0uMTk1LjQzNi0uNDM2Vi40MzZBLjQzNi40MzYgMCAwIDAgMTYuNTY0IDB6TTMuNDg3Ljg3MmgxMC4wMjZ2MS43NDNIMy40ODdWLjg3MnptLTIuNjE1IDBoMS43NDN2MS43NDNILjg3MlYuODcyem0xNS4yNTYgMTUuMjU2SC44NzJWMy40ODhoMTUuMjU2djEyLjY0em0wLTEzLjUxM2gtMS43NDNWLjg3MmgxLjc0M3YxLjc0M3oiLz48Y2lyY2xlIGN4PSI5My44NjciIGN5PSIyNDUuMDY0IiByPSIxMy4xMjgiIHRyYW5zZm9ybT0ibWF0cml4KC4wMzMyIDAgMCAuMDMzMiAwIDApIi8+PGNpcmNsZSBjeD0iOTMuODY3IiBjeT0iMzYwLjU5MiIgcj0iMTMuMTI4IiB0cmFuc2Zvcm09Im1hdHJpeCguMDMzMiAwIDAgLjAzMzIgMCAwKSIvPjxwYXRoIGQ9Ik0xNC4yNTQgMTIuNjQxSDEwLjJhLjQzNi40MzYgMCAwIDAgMCAuODcyaDQuMDU0YS40MzYuNDM2IDAgMCAwIDAtLjg3MnoiLz48L3N2Zz4=", className: void 0, component: void 0, popupClassName: void 0, embedCallback: void 0, defaultSize: { height: "auto", width: "auto" }, title: void 0 }, image: { icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUiIGhlaWdodD0iMTQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iIzAwMCIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTQuNzQxIDBILjI2Qy4xMTYgMCAwIC4xMzYgMCAuMzA0djEzLjM5MmMwIC4xNjguMTE2LjMwNC4yNTkuMzA0SDE0Ljc0Yy4xNDMgMCAuMjU5LS4xMzYuMjU5LS4zMDRWLjMwNEMxNSAuMTM2IDE0Ljg4NCAwIDE0Ljc0MSAwem0tLjI1OCAxMy4zOTFILjUxN1YuNjFoMTMuOTY2VjEzLjM5eiIvPjxwYXRoIGQ9Ik00LjEzOCA2LjczOGMuNzk0IDAgMS40NC0uNzYgMS40NC0xLjY5NXMtLjY0Ni0xLjY5NS0xLjQ0LTEuNjk1Yy0uNzk0IDAtMS40NC43Ni0xLjQ0IDEuNjk1IDAgLjkzNC42NDYgMS42OTUgMS40NCAxLjY5NXptMC0yLjc4MWMuNTA5IDAgLjkyMy40ODcuOTIzIDEuMDg2IDAgLjU5OC0uNDE0IDEuMDg2LS45MjMgMS4wODYtLjUwOSAwLS45MjMtLjQ4Ny0uOTIzLTEuMDg2IDAtLjU5OS40MTQtMS4wODYuOTIzLTEuMDg2ek0xLjgxIDEyLjE3NGMuMDYgMCAuMTIyLS4wMjUuMTcxLS4wNzZMNi4yIDcuNzI4bDIuNjY0IDMuMTM0YS4yMzIuMjMyIDAgMCAwIC4zNjYgMCAuMzQzLjM0MyAwIDAgMCAwLS40M0w3Ljk4NyA4Ljk2OWwyLjM3NC0zLjA2IDIuOTEyIDMuMTQyYy4xMDYuMTEzLjI3LjEwNS4zNjYtLjAyYS4zNDMuMzQzIDAgMCAwLS4wMTYtLjQzbC0zLjEwNC0zLjM0N2EuMjQ0LjI0NCAwIDAgMC0uMTg2LS4wOC4yNDUuMjQ1IDAgMCAwLS4xOC4xTDcuNjIyIDguNTM3IDYuMzk0IDcuMDk0YS4yMzIuMjMyIDAgMCAwLS4zNTQtLjAxM2wtNC40IDQuNTZhLjM0My4zNDMgMCAwIDAtLjAyNC40My4yNDMuMjQzIDAgMCAwIC4xOTQuMTAzeiIvPjwvZz48L3N2Zz4=", className: void 0, component: void 0, popupClassName: void 0, urlEnabled: true, uploadEnabled: true, previewImage: false, alignmentEnabled: true, uploadCallback: void 0, inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg", alt: { present: false, mandatory: false }, defaultSize: { height: "auto", width: "auto" }, title: void 0 }, remove: { icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdmlld0JveD0iMCAwIDE2IDE2Ij48cGF0aCBkPSJNOC4xIDE0bDYuNC03LjJjLjYtLjcuNi0xLjgtLjEtMi41bC0yLjctMi43Yy0uMy0uNC0uOC0uNi0xLjMtLjZIOC42Yy0uNSAwLTEgLjItMS40LjZMLjUgOS4yYy0uNi43LS42IDEuOS4xIDIuNWwyLjcgMi43Yy4zLjQuOC42IDEuMy42SDE2di0xSDguMXptLTEuMy0uMXMwLS4xIDAgMGwtMi43LTIuN2MtLjQtLjQtLjQtLjkgMC0xLjNMNy41IDZoLTFsLTMgMy4zYy0uNi43LS42IDEuNy4xIDIuNEw1LjkgMTRINC42Yy0uMiAwLS40LS4xLS42LS4yTDEuMiAxMWMtLjMtLjMtLjMtLjggMC0xLjFMNC43IDZoMS44TDEwIDJoMUw3LjUgNmwzLjEgMy43LTMuNSA0Yy0uMS4xLS4yLjEtLjMuMnoiLz48L3N2Zz4=", className: void 0, component: void 0, title: void 0 }, history: { inDropdown: false, className: void 0, component: void 0, dropdownClassName: void 0, options: ["undo", "redo"], undo: { icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTciIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTcgMTQuODc1YzIuNjcyIDAgNC44NDYtMi4xNDUgNC44NDYtNC43ODEgMC0yLjYzNy0yLjE3NC00Ljc4MS00Ljg0Ni00Ljc4MVY4LjVMMS42MTUgNC4yNSA3IDB2My4xODhjMy44NiAwIDcgMy4wOTggNyA2LjkwNlMxMC44NiAxNyA3IDE3cy03LTMuMDk4LTctNi45MDZoMi4xNTRjMCAyLjYzNiAyLjE3NCA0Ljc4MSA0Ljg0NiA0Ljc4MXoiIGZpbGw9IiMwMDAiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==", className: void 0, title: void 0 }, redo: { icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTMiIGhlaWdodD0iMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTYuNTA0IDEzLjk3N2E0LjQ5NyA0LjQ5NyAwIDAgMS00LjQ5Mi00LjQ5MiA0LjQ5NyA0LjQ5NyAwIDAgMSA0LjQ5Mi00LjQ5M3YyLjk5NWw0Ljk5LTMuOTkzTDYuNTA0IDB2Mi45OTVhNi40OTYgNi40OTYgMCAwIDAtNi40ODggNi40OWMwIDMuNTc4IDIuOTEgNi40OSA2LjQ4OCA2LjQ5YTYuNDk2IDYuNDk2IDAgMCAwIDYuNDg3LTYuNDloLTEuOTk2YTQuNDk3IDQuNDk3IDAgMCAxLTQuNDkxIDQuNDkyeiIgZmlsbD0iIzAwMCIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+", className: void 0, title: void 0 }, title: void 0 } }, Jo = { en: { "generic.add": "Add", "generic.cancel": "Cancel", "components.controls.blocktype.h1": "H1", "components.controls.blocktype.h2": "H2", "components.controls.blocktype.h3": "H3", "components.controls.blocktype.h4": "H4", "components.controls.blocktype.h5": "H5", "components.controls.blocktype.h6": "H6", "components.controls.blocktype.blockquote": "Blockquote", "components.controls.blocktype.code": "Code", "components.controls.blocktype.blocktype": "Block Type", "components.controls.blocktype.normal": "Normal", "components.controls.colorpicker.colorpicker": "Color Picker", "components.controls.colorpicker.text": "Text", "components.controls.colorpicker.background": "Highlight", "components.controls.embedded.embedded": "Embedded", "components.controls.embedded.embeddedlink": "Embedded Link", "components.controls.embedded.enterlink": "Enter link", "components.controls.emoji.emoji": "Emoji", "components.controls.fontfamily.fontfamily": "Font", "components.controls.fontsize.fontsize": "Font Size", "components.controls.history.history": "History", "components.controls.history.undo": "Undo", "components.controls.history.redo": "Redo", "components.controls.image.image": "Image", "components.controls.image.fileUpload": "File Upload", "components.controls.image.byURL": "URL", "components.controls.image.dropFileText": "Drop the file or click to upload", "components.controls.inline.bold": "Bold", "components.controls.inline.italic": "Italic", "components.controls.inline.underline": "Underline", "components.controls.inline.strikethrough": "Strikethrough", "components.controls.inline.monospace": "Monospace", "components.controls.inline.superscript": "Superscript", "components.controls.inline.subscript": "Subscript", "components.controls.link.linkTitle": "Link Title", "components.controls.link.linkTarget": "Link Target", "components.controls.link.linkTargetOption": "Open link in new window", "components.controls.link.link": "Link", "components.controls.link.unlink": "Unlink", "components.controls.list.list": "List", "components.controls.list.unordered": "Unordered", "components.controls.list.ordered": "Ordered", "components.controls.list.indent": "Indent", "components.controls.list.outdent": "Outdent", "components.controls.remove.remove": "Remove", "components.controls.textalign.textalign": "Text Align", "components.controls.textalign.left": "Left", "components.controls.textalign.center": "Center", "components.controls.textalign.right": "Right", "components.controls.textalign.justify": "Justify" }, fr: { "generic.add": "Ok", "generic.cancel": "Annuler", "components.controls.blocktype.h1": "Titre 1", "components.controls.blocktype.h2": "Titre 2", "components.controls.blocktype.h3": "Titre 3", "components.controls.blocktype.h4": "Titre 4", "components.controls.blocktype.h5": "Titre 5", "components.controls.blocktype.h6": "Titre 6", "components.controls.blocktype.blockquote": "Citation", "components.controls.blocktype.code": "Code", "components.controls.blocktype.blocktype": "Type bloc", "components.controls.blocktype.normal": "Normal", "components.controls.colorpicker.colorpicker": "Palette de couleur", "components.controls.colorpicker.text": "Texte", "components.controls.colorpicker.background": "Fond", "components.controls.embedded.embedded": "Embedded", "components.controls.embedded.embeddedlink": "Lien iFrame", "components.controls.embedded.enterlink": "Entrer le lien", "components.controls.emoji.emoji": "Emoji", "components.controls.fontfamily.fontfamily": "Police", "components.controls.fontsize.fontsize": "Taille de police", "components.controls.history.history": "Historique", "components.controls.history.undo": "Précédent", "components.controls.history.redo": "Suivant", "components.controls.image.image": "Image", "components.controls.image.fileUpload": "Téléchargement", "components.controls.image.byURL": "URL", "components.controls.image.dropFileText": "Glisser une image ou cliquer pour télécharger", "components.controls.inline.bold": "Gras", "components.controls.inline.italic": "Italique", "components.controls.inline.underline": "Souligner", "components.controls.inline.strikethrough": "Barrer", "components.controls.inline.monospace": "Monospace", "components.controls.inline.superscript": "Exposant", "components.controls.inline.subscript": "Indice", "components.controls.link.linkTitle": "Titre du lien", "components.controls.link.linkTarget": "Cible du lien", "components.controls.link.linkTargetOption": "Ouvrir le lien dans une nouvelle fenêtre", "components.controls.link.link": "Lier", "components.controls.link.unlink": "Délier", "components.controls.list.list": "Liste", "components.controls.list.unordered": "Désordonnée", "components.controls.list.ordered": "Ordonnée", "components.controls.list.indent": "Augmenter le retrait", "components.controls.list.outdent": "Diminuer le retrait", "components.controls.remove.remove": "Supprimer", "components.controls.textalign.textalign": "Alignement du texte", "components.controls.textalign.left": "Gauche", "components.controls.textalign.center": "Centre", "components.controls.textalign.right": "Droite", "components.controls.textalign.justify": "Justifier" }, zh: { "generic.add": "添加", "generic.cancel": "取消", "components.controls.blocktype.h1": "标题1", "components.controls.blocktype.h2": "标题2", "components.controls.blocktype.h3": "标题3", "components.controls.blocktype.h4": "标题4", "components.controls.blocktype.h5": "标题5", "components.controls.blocktype.h6": "标题6", "components.controls.blocktype.blockquote": "引用", "components.controls.blocktype.code": "源码", "components.controls.blocktype.blocktype": "样式", "components.controls.blocktype.normal": "正文", "components.controls.colorpicker.colorpicker": "选色器", "components.controls.colorpicker.text": "文字", "components.controls.colorpicker.background": "背景", "components.controls.embedded.embedded": "内嵌", "components.controls.embedded.embeddedlink": "内嵌网页", "components.controls.embedded.enterlink": "输入网页地址", "components.controls.emoji.emoji": "表情符号", "components.controls.fontfamily.fontfamily": "字体", "components.controls.fontsize.fontsize": "字号", "components.controls.history.history": "历史", "components.controls.history.undo": "撤销", "components.controls.history.redo": "恢复", "components.controls.image.image": "图片", "components.controls.image.fileUpload": "来自文件", "components.controls.image.byURL": "在线图片", "components.controls.image.dropFileText": "点击或者拖拽文件上传", "components.controls.inline.bold": "粗体", "components.controls.inline.italic": "斜体", "components.controls.inline.underline": "下划线", "components.controls.inline.strikethrough": "删除线", "components.controls.inline.monospace": "等宽字体", "components.controls.inline.superscript": "上标", "components.controls.inline.subscript": "下标", "components.controls.link.linkTitle": "超链接", "components.controls.link.linkTarget": "输入链接地址", "components.controls.link.linkTargetOption": "在新窗口中打开链接", "components.controls.link.link": "链接", "components.controls.link.unlink": "删除链接", "components.controls.list.list": "列表", "components.controls.list.unordered": "项目符号", "components.controls.list.ordered": "编号", "components.controls.list.indent": "增加缩进量", "components.controls.list.outdent": "减少缩进量", "components.controls.remove.remove": "清除格式", "components.controls.textalign.textalign": "文本对齐", "components.controls.textalign.left": "文本左对齐", "components.controls.textalign.center": "居中", "components.controls.textalign.right": "文本右对齐", "components.controls.textalign.justify": "两端对齐" }, ru: { "generic.add": "Добавить", "generic.cancel": "Отменить", "components.controls.blocktype.h1": "Заголовок 1", "components.controls.blocktype.h2": "Заголовок 2", "components.controls.blocktype.h3": "Заголовок 3", "components.controls.blocktype.h4": "Заголовок 4", "components.controls.blocktype.h5": "Заголовок 5", "components.controls.blocktype.h6": "Заголовок 6", "components.controls.blocktype.blockquote": "Цитата", "components.controls.blocktype.code": "Код", "components.controls.blocktype.blocktype": "Форматирование", "components.controls.blocktype.normal": "Обычный", "components.controls.colorpicker.colorpicker": "Выбор цвета", "components.controls.colorpicker.text": "Текст", "components.controls.colorpicker.background": "Фон", "components.controls.embedded.embedded": "Встраивание", "components.controls.embedded.embeddedlink": "Ссылка в iFrame", "components.controls.embedded.enterlink": "Вставьте ссылку", "components.controls.emoji.emoji": "Эмодзи", "components.controls.fontfamily.fontfamily": "Шрифт", "components.controls.fontsize.fontsize": "Размер шрифта", "components.controls.history.history": "История", "components.controls.history.undo": "Отменить", "components.controls.history.redo": "Вернуть", "components.controls.image.image": "Изображение", "components.controls.image.fileUpload": "Файлы", "components.controls.image.byURL": "URL", "components.controls.image.dropFileText": "Переместите в эту область файлы или кликните для загрузки", "components.controls.inline.bold": "Жирный", "components.controls.inline.italic": "Курсив", "components.controls.inline.underline": "Подчеркивание", "components.controls.inline.strikethrough": "Зачеркивание", "components.controls.inline.monospace": "Monospace", "components.controls.inline.superscript": "Верхний индекс", "components.controls.inline.subscript": "Нижний индекс", "components.controls.link.linkTitle": "Текст", "components.controls.link.linkTarget": "Адрес ссылки", "components.controls.link.linkTargetOption": "Открывать в новом окне", "components.controls.link.link": "Ссылка", "components.controls.link.unlink": "Убрать ссылку", "components.controls.list.list": "Список", "components.controls.list.unordered": "Неупорядоченный", "components.controls.list.ordered": "Упорядоченный", "components.controls.list.indent": "Отступ", "components.controls.list.outdent": "Выступ", "components.controls.remove.remove": "Удалить", "components.controls.textalign.textalign": "Выравнивание текста", "components.controls.textalign.left": "Слева", "components.controls.textalign.center": "По центру", "components.controls.textalign.right": "Справа", "components.controls.textalign.justify": "Выравнить" }, pt: { "generic.add": "Ok", "generic.cancel": "Cancelar", "components.controls.blocktype.h1": "Título 1", "components.controls.blocktype.h2": "Título 2", "components.controls.blocktype.h3": "Título 3", "components.controls.blocktype.h4": "Título 4", "components.controls.blocktype.h5": "Título 5", "components.controls.blocktype.h6": "Título 6", "components.controls.blocktype.blockquote": "Citação", "components.controls.blocktype.code": "Code", "components.controls.blocktype.blocktype": "Estilo", "components.controls.blocktype.normal": "Normal", "components.controls.colorpicker.colorpicker": "Paleta de cores", "components.controls.colorpicker.text": "Texto", "components.controls.colorpicker.background": "Fundo", "components.controls.embedded.embedded": "Embarcado", "components.controls.embedded.embeddedlink": "Link embarcado", "components.controls.embedded.enterlink": "Coloque o link", "components.controls.emoji.emoji": "Emoji", "components.controls.fontfamily.fontfamily": "Fonte", "components.controls.fontsize.fontsize": "Tamanho da Fonte", "components.controls.history.history": "Histórico", "components.controls.history.undo": "Desfazer", "components.controls.history.redo": "Refazer", "components.controls.image.image": "Imagem", "components.controls.image.fileUpload": "Carregar arquivo", "components.controls.image.byURL": "URL", "components.controls.image.dropFileText": "Arraste uma imagem aqui ou clique para carregar", "components.controls.inline.bold": "Negrito", "components.controls.inline.italic": "Itálico", "components.controls.inline.underline": "Sublinhado", "components.controls.inline.strikethrough": "Strikethrough", "components.controls.inline.monospace": "Monospace", "components.controls.inline.superscript": "Sobrescrito", "components.controls.inline.subscript": "Subscrito", "components.controls.link.linkTitle": "Título do link", "components.controls.link.linkTarget": "Alvo do link", "components.controls.link.linkTargetOption": "Abrir link em outra janela", "components.controls.link.link": "Adicionar Link", "components.controls.link.unlink": "Remover link", "components.controls.list.list": "Lista", "components.controls.list.unordered": "Sem ordenção", "components.controls.list.ordered": "Ordenada", "components.controls.list.indent": "Aumentar recuo", "components.controls.list.outdent": "Diminuir recuo", "components.controls.remove.remove": "Remover", "components.controls.textalign.textalign": "Alinhamento do texto", "components.controls.textalign.left": "À Esquerda", "components.controls.textalign.center": "Centralizado", "components.controls.textalign.right": "À Direita", "components.controls.textalign.justify": "Justificado" }, ko: { "generic.add": "입력", "generic.cancel": "취소", "components.controls.blocktype.h1": "제목1", "components.controls.blocktype.h2": "제목2", "components.controls.blocktype.h3": "제목3", "components.controls.blocktype.h4": "제목4", "components.controls.blocktype.h5": "제목5", "components.controls.blocktype.h6": "제목6", "components.controls.blocktype.blockquote": "인용", "components.controls.blocktype.code": "Code", "components.controls.blocktype.blocktype": "블록", "components.controls.blocktype.normal": "표준", "components.controls.colorpicker.colorpicker": "색상 선택", "components.controls.colorpicker.text": "글꼴색", "components.controls.colorpicker.background": "배경색", "components.controls.embedded.embedded": "임베드", "components.controls.embedded.embeddedlink": "임베드 링크", "components.controls.embedded.enterlink": "주소를 입력하세요", "components.controls.emoji.emoji": "이모지", "components.controls.fontfamily.fontfamily": "글꼴", "components.controls.fontsize.fontsize": "글꼴 크기", "components.controls.history.history": "히스토리", "components.controls.history.undo": "실행 취소", "components.controls.history.redo": "다시 실행", "components.controls.image.image": "이미지", "components.controls.image.fileUpload": "파일 업로드", "components.controls.image.byURL": "주소", "components.controls.image.dropFileText": "클릭하거나 파일을 드롭하여 업로드하세요", "components.controls.inline.bold": "굵게", "components.controls.inline.italic": "기울임꼴", "components.controls.inline.underline": "밑줄", "components.controls.inline.strikethrough": "취소선", "components.controls.inline.monospace": "고정 너비", "components.controls.inline.superscript": "위 첨자", "components.controls.inline.subscript": "아래 첨자", "components.controls.link.linkTitle": "링크 제목", "components.controls.link.linkTarget": "링크 타겟", "components.controls.link.linkTargetOption": "새창으로 열기", "components.controls.link.link": "링크", "components.controls.link.unlink": "링크 제거", "components.controls.list.list": "리스트", "components.controls.list.unordered": "일반 리스트", "components.controls.list.ordered": "순서 리스트", "components.controls.list.indent": "들여쓰기", "components.controls.list.outdent": "내어쓰기", "components.controls.remove.remove": "삭제", "components.controls.textalign.textalign": "텍스트 정렬", "components.controls.textalign.left": "왼쪽", "components.controls.textalign.center": "중앙", "components.controls.textalign.right": "오른쪽", "components.controls.textalign.justify": "양쪽" }, it: { "generic.add": "Aggiungi", "generic.cancel": "Annulla", "components.controls.blocktype.h1": "H1", "components.controls.blocktype.h2": "H2", "components.controls.blocktype.h3": "H3", "components.controls.blocktype.h4": "H4", "components.controls.blocktype.h5": "H5", "components.controls.blocktype.h6": "H6", "components.controls.blocktype.blockquote": "Citazione", "components.controls.blocktype.code": "Codice", "components.controls.blocktype.blocktype": "Stili", "components.controls.blocktype.normal": "Normale", "components.controls.colorpicker.colorpicker": "Colore testo", "components.controls.colorpicker.text": "Testo", "components.controls.colorpicker.background": "Evidenziazione", "components.controls.embedded.embedded": "Incorpora", "components.controls.embedded.embeddedlink": "Incorpora link", "components.controls.embedded.enterlink": "Inserisci link", "components.controls.emoji.emoji": "Emoji", "components.controls.fontfamily.fontfamily": "Carattere", "components.controls.fontsize.fontsize": "Dimensione carattere", "components.controls.history.history": "Modifiche", "components.controls.history.undo": "Annulla", "components.controls.history.redo": "Ripristina", "components.controls.image.image": "Immagine", "components.controls.image.fileUpload": "Carica immagine", "components.controls.image.byURL": "URL", "components.controls.image.dropFileText": "Trascina il file o clicca per caricare", "components.controls.inline.bold": "Grassetto", "components.controls.inline.italic": "Corsivo", "components.controls.inline.underline": "Sottolineato", "components.controls.inline.strikethrough": "Barrato", "components.controls.inline.monospace": "Monospace", "components.controls.inline.superscript": "Apice", "components.controls.inline.subscript": "Pedice", "components.controls.link.linkTitle": "Testo", "components.controls.link.linkTarget": "Link", "components.controls.link.linkTargetOption": "Apri link in una nuova finestra", "components.controls.link.link": "Inserisci link", "components.controls.link.unlink": "Rimuovi link", "components.controls.list.list": "Lista", "components.controls.list.unordered": "Elenco puntato", "components.controls.list.ordered": "Elenco numerato", "components.controls.list.indent": "Indent", "components.controls.list.outdent": "Outdent", "components.controls.remove.remove": "Rimuovi formattazione", "components.controls.textalign.textalign": "Allineamento del testo", "components.controls.textalign.left": "Allinea a sinistra", "components.controls.textalign.center": "Allinea al centro", "components.controls.textalign.right": "Allinea a destra", "components.controls.textalign.justify": "Giustifica" }, nl: { "generic.add": "Toevoegen", "generic.cancel": "Annuleren", "components.controls.blocktype.h1": "H1", "components.controls.blocktype.h2": "H2", "components.controls.blocktype.h3": "H3", "components.controls.blocktype.h4": "H4", "components.controls.blocktype.h5": "H5", "components.controls.blocktype.h6": "H6", "components.controls.blocktype.blockquote": "Blockquote", "components.controls.blocktype.code": "Code", "components.controls.blocktype.blocktype": "Blocktype", "components.controls.blocktype.normal": "Normaal", "components.controls.colorpicker.colorpicker": "Kleurkiezer", "components.controls.colorpicker.text": "Tekst", "components.controls.colorpicker.background": "Achtergrond", "components.controls.embedded.embedded": "Ingevoegd", "components.controls.embedded.embeddedlink": "Ingevoegde link", "components.controls.embedded.enterlink": "Voeg link toe", "components.controls.emoji.emoji": "Emoji", "components.controls.fontfamily.fontfamily": "Lettertype", "components.controls.fontsize.fontsize": "Lettergrootte", "components.controls.history.history": "Geschiedenis", "components.controls.history.undo": "Ongedaan maken", "components.controls.history.redo": "Opnieuw", "components.controls.image.image": "Afbeelding", "components.controls.image.fileUpload": "Bestand uploaden", "components.controls.image.byURL": "URL", "components.controls.image.dropFileText": "Drop het bestand hier of klik om te uploaden", "components.controls.inline.bold": "Dikgedrukt", "components.controls.inline.italic": "Schuingedrukt", "components.controls.inline.underline": "Onderstrepen", "components.controls.inline.strikethrough": "Doorstrepen", "components.controls.inline.monospace": "Monospace", "components.controls.inline.superscript": "Superscript", "components.controls.inline.subscript": "Subscript", "components.controls.link.linkTitle": "Linktitel", "components.controls.link.linkTarget": "Link bestemming", "components.controls.link.linkTargetOption": "Open link in een nieuw venster", "components.controls.link.link": "Link", "components.controls.link.unlink": "Unlink", "components.controls.list.list": "Lijst", "components.controls.list.unordered": "Ongeordend", "components.controls.list.ordered": "Geordend", "components.controls.list.indent": "Inspringen", "components.controls.list.outdent": "Inspringen verkleinen", "components.controls.remove.remove": "Verwijderen", "components.controls.textalign.textalign": "Tekst uitlijnen", "components.controls.textalign.left": "Links", "components.controls.textalign.center": "Gecentreerd", "components.controls.textalign.right": "Rechts", "components.controls.textalign.justify": "Uitgelijnd" }, de: { "generic.add": "Hinzufügen", "generic.cancel": "Abbrechen", "components.controls.blocktype.h1": "Überschrift 1", "components.controls.blocktype.h2": "Überschrift 2", "components.controls.blocktype.h3": "Überschrift 3", "components.controls.blocktype.h4": "Überschrift 4", "components.controls.blocktype.h5": "Überschrift 5", "components.controls.blocktype.h6": "Überschrift 6", "components.controls.blocktype.blockquote": "Zitat", "components.controls.blocktype.code": "Quellcode", "components.controls.blocktype.blocktype": "Blocktyp", "components.controls.blocktype.normal": "Normal", "components.controls.colorpicker.colorpicker": "Farbauswahl", "components.controls.colorpicker.text": "Text", "components.controls.colorpicker.background": "Hintergrund", "components.controls.embedded.embedded": "Eingebettet", "components.controls.embedded.embeddedlink": "Eingebetteter Link", "components.controls.embedded.enterlink": "Link eingeben", "components.controls.emoji.emoji": "Emoji", "components.controls.fontfamily.fontfamily": "Schriftart", "components.controls.fontsize.fontsize": "Schriftgröße", "components.controls.history.history": "Historie", "components.controls.history.undo": "Zurücknehmen", "components.controls.history.redo": "Wiederholen", "components.controls.image.image": "Bild", "components.controls.image.fileUpload": "Datei-Upload", "components.controls.image.byURL": "URL", "components.controls.image.dropFileText": "Dateien ziehen und ablegen, oder klicken zum Hochladen", "components.controls.inline.bold": "Fett", "components.controls.inline.italic": "Kursiv", "components.controls.inline.underline": "Unterstreichen", "components.controls.inline.strikethrough": "Durchstreichen", "components.controls.inline.monospace": "Monospace", "components.controls.inline.superscript": "Hochgestellt", "components.controls.inline.subscript": "Tiefgestellt", "components.controls.link.linkTitle": "Link-Titel", "components.controls.link.linkTarget": "Link-Ziel", "components.controls.link.linkTargetOption": "Link in neuem Fenster öffnen", "components.controls.link.link": "Link", "components.controls.link.unlink": "Aufheben", "components.controls.list.list": "Liste", "components.controls.list.unordered": "Aufzählung", "components.controls.list.ordered": "Nummerierte Liste", "components.controls.list.indent": "Einzug vergrößern", "components.controls.list.outdent": "Einzug reduzieren", "components.controls.remove.remove": "Entfernen", "components.controls.textalign.textalign": "Textausrichtung", "components.controls.textalign.left": "Linksbündig", "components.controls.textalign.center": "Zentrieren", "components.controls.textalign.right": "Rechtsbündig", "components.controls.textalign.justify": "Blocksatz" }, da: { "generic.add": "Tilføj", "generic.cancel": "Annuller", "components.controls.blocktype.h1": "Overskrift 1", "components.controls.blocktype.h2": "Overskrift 2", "components.controls.blocktype.h3": "Overskrift 3", "components.controls.blocktype.h4": "Overskrift 4", "components.controls.blocktype.h5": "Overskrift 5", "components.controls.blocktype.h6": "Overskrift 6", "components.controls.blocktype.blockquote": "Blokcitat", "components.controls.blocktype.code": "Kode", "components.controls.blocktype.blocktype": "Blok Type", "components.controls.blocktype.normal": "Normal", "components.controls.colorpicker.colorpicker": "Farver", "components.controls.colorpicker.text": "Tekst", "components.controls.colorpicker.background": "Baggrund", "components.controls.embedded.embedded": "Indlejre", "components.controls.embedded.embeddedlink": "Indlejre Link", "components.controls.embedded.enterlink": "Indtast link", "components.controls.emoji.emoji": "Emoji", "components.controls.fontfamily.fontfamily": "Fonttype", "components.controls.fontsize.fontsize": "Fontstørrelser", "components.controls.history.history": "Historie", "components.controls.history.undo": "Fortryd", "components.controls.history.redo": "Gendan", "components.controls.image.image": "Billede", "components.controls.image.fileUpload": "Filoverførsel", "components.controls.image.byURL": "URL", "components.controls.image.dropFileText": "Drop filen eller klik for at uploade", "components.controls.inline.bold": "Fed", "components.controls.inline.italic": "Kursiv", "components.controls.inline.underline": "Understrege", "components.controls.inline.strikethrough": "Gennemstreget", "components.controls.inline.monospace": "Monospace", "components.controls.inline.superscript": "Hævet", "components.controls.inline.subscript": "Sænket", "components.controls.link.linkTitle": "Link Titel", "components.controls.link.linkTarget": "Link Mål", "components.controls.link.linkTargetOption": "Åbn link i nyt vindue", "components.controls.link.link": "Link", "components.controls.link.unlink": "Fjern link", "components.controls.list.list": "Liste", "components.controls.list.unordered": "Uordnet", "components.controls.list.ordered": "Ordnet", "components.controls.list.indent": "Indrykning", "components.controls.list.outdent": "Udrykning", "components.controls.remove.remove": "Fjern", "components.controls.textalign.textalign": "Tekstjustering", "components.controls.textalign.left": "Venstre", "components.controls.textalign.center": "Center", "components.controls.textalign.right": "Højre", "components.controls.textalign.justify": "Margener" }, zh_tw: { "generic.add": "新增", "generic.cancel": "取消", "components.controls.blocktype.h1": "標題1", "components.controls.blocktype.h2": "標題2", "components.controls.blocktype.h3": "標題3", "components.controls.blocktype.h4": "標題4", "components.controls.blocktype.h5": "標題5", "components.controls.blocktype.h6": "標題6", "components.controls.blocktype.blockquote": "引用", "components.controls.blocktype.code": "程式碼", "components.controls.blocktype.blocktype": "樣式", "components.controls.blocktype.normal": "正文", "components.controls.colorpicker.colorpicker": "選色器", "components.controls.colorpicker.text": "文字", "components.controls.colorpicker.background": "背景", "components.controls.embedded.embedded": "內嵌", "components.controls.embedded.embeddedlink": "內嵌網頁", "components.controls.embedded.enterlink": "輸入網頁地址", "components.controls.emoji.emoji": "表情符號", "components.controls.fontfamily.fontfamily": "字體", "components.controls.fontsize.fontsize": "字體大小", "components.controls.history.history": "歷史紀錄", "components.controls.history.undo": "復原", "components.controls.history.redo": "重做", "components.controls.image.image": "圖片", "components.controls.image.fileUpload": "檔案上傳", "components.controls.image.byURL": "網址", "components.controls.image.dropFileText": "點擊或拖曳檔案上傳", "components.controls.inline.bold": "粗體", "components.controls.inline.italic": "斜體", "components.controls.inline.underline": "底線", "components.controls.inline.strikethrough": "刪除線", "components.controls.inline.monospace": "等寬字體", "components.controls.inline.superscript": "上標", "components.controls.inline.subscript": "下標", "components.controls.link.linkTitle": "超連結", "components.controls.link.linkTarget": "輸入連結位址", "components.controls.link.linkTargetOption": "在新視窗打開連結", "components.controls.link.link": "連結", "components.controls.link.unlink": "刪除連結", "components.controls.list.list": "列表", "components.controls.list.unordered": "項目符號", "components.controls.list.ordered": "編號", "components.controls.list.indent": "增加縮排", "components.controls.list.outdent": "減少縮排", "components.controls.remove.remove": "清除格式", "components.controls.textalign.textalign": "文字對齊", "components.controls.textalign.left": "文字向左對齊", "components.controls.textalign.center": "文字置中", "components.controls.textalign.right": "文字向右對齊", "components.controls.textalign.justify": "兩端對齊" }, pl: { "generic.add": "Dodaj", "generic.cancel": "Anuluj", "components.controls.blocktype.h1": "Nagłówek 1", "components.controls.blocktype.h2": "Nagłówek 2", "components.controls.blocktype.h3": "Nagłówek 3", "components.controls.blocktype.h4": "Nagłówek 4", "components.controls.blocktype.h5": "Nagłówek 5", "components.controls.blocktype.h6": "Nagłówek 6", "components.controls.blocktype.blockquote": "Cytat", "components.controls.blocktype.code": "Kod", "components.controls.blocktype.blocktype": "Format", "components.controls.blocktype.normal": "Normalny", "components.controls.colorpicker.colorpicker": "Kolor", "components.controls.colorpicker.text": "Tekst", "components.controls.colorpicker.background": "Tło", "components.controls.embedded.embedded": "Osadź", "components.controls.embedded.embeddedlink": "Osadź odnośnik", "components.controls.embedded.enterlink": "Wprowadź odnośnik", "components.controls.emoji.emoji": "Emoji", "components.controls.fontfamily.fontfamily": "Krój czcionki", "components.controls.fontsize.fontsize": "Rozmiar czcionki", "components.controls.history.history": "Historia", "components.controls.history.undo": "Cofnij", "components.controls.history.redo": "Ponów", "components.controls.image.image": "Obrazek", "components.controls.image.fileUpload": "Prześlij plik", "components.controls.image.byURL": "URL", "components.controls.image.dropFileText": "Upuść plik lub kliknij, aby przesłać", "components.controls.inline.bold": "Pogrubienie", "components.controls.inline.italic": "Kursywa", "components.controls.inline.underline": "Podkreślenie", "components.controls.inline.strikethrough": "Przekreślenie", "components.controls.inline.monospace": "Monospace", "components.controls.inline.superscript": "Indeks górny", "components.controls.inline.subscript": "Indeks dolny", "components.controls.link.linkTitle": "Tytuł odnośnika", "components.controls.link.linkTarget": "Adres odnośnika", "components.controls.link.linkTargetOption": "Otwórz odnośnik w nowej karcie", "components.controls.link.link": "Wstaw odnośnik", "components.controls.link.unlink": "Usuń odnośnik", "components.controls.list.list": "Lista", "components.controls.list.unordered": "Lista nieuporządkowana", "components.controls.list.ordered": "Lista uporządkowana", "components.controls.list.indent": "Zwiększ wcięcie", "components.controls.list.outdent": "Zmniejsz wcięcie", "components.controls.remove.remove": "Usuń", "components.controls.textalign.textalign": "Wyrównaj tekst", "components.controls.textalign.left": "Do lewej", "components.controls.textalign.center": "Do środka", "components.controls.textalign.right": "Do prawej", "components.controls.textalign.justify": "Wyjustuj" }, es: { "generic.add": "Añadir", "generic.cancel": "Cancelar", "components.controls.blocktype.h1": "H1", "components.controls.blocktype.h2": "H2", "components.controls.blocktype.h3": "H3", "components.controls.blocktype.h4": "H4", "components.controls.blocktype.h5": "H5", "components.controls.blocktype.h6": "H6", "components.controls.blocktype.blockquote": "Blockquote", "components.controls.blocktype.code": "Código", "components.controls.blocktype.blocktype": "Tipo de bloque", "components.controls.blocktype.normal": "Normal", "components.controls.colorpicker.colorpicker": "Seleccionar color", "components.controls.colorpicker.text": "Texto", "components.controls.colorpicker.background": "Subrayado", "components.controls.embedded.embedded": "Adjuntar", "components.controls.embedded.embeddedlink": "Adjuntar Link", "components.controls.embedded.enterlink": "Introducir link", "components.controls.emoji.emoji": "Emoji", "components.controls.fontfamily.fontfamily": "Fuente", "components.controls.fontsize.fontsize": "Tamaño de fuente", "components.controls.history.history": "Histórico", "components.controls.history.undo": "Deshacer", "components.controls.history.redo": "Rehacer", "components.controls.image.image": "Imagen", "components.controls.image.fileUpload": "Subir archivo", "components.controls.image.byURL": "URL", "components.controls.image.dropFileText": "Arrastra el archivo o haz click para subirlo", "components.controls.inline.bold": "Negrita", "components.controls.inline.italic": "Cursiva", "components.controls.inline.underline": "Subrayado", "components.controls.inline.strikethrough": "Tachado", "components.controls.inline.monospace": "Monospace", "components.controls.inline.superscript": "Sobreíndice", "components.controls.inline.subscript": "Subíndice", "components.controls.link.linkTitle": "Título del enlace", "components.controls.link.linkTarget": "Objetivo del enlace", "components.controls.link.linkTargetOption": "Abrir en nueva ventana", "components.controls.link.link": "Enlazar", "components.controls.link.unlink": "Desenlazar", "components.controls.list.list": "Lista", "components.controls.list.unordered": "Desordenada", "components.controls.list.ordered": "Ordenada", "components.controls.list.indent": "Indentada", "components.controls.list.outdent": "Dentada", "components.controls.remove.remove": "Eliminar", "components.controls.textalign.textalign": "Alineación del texto", "components.controls.textalign.left": "Izquierda", "components.controls.textalign.center": "Centrado", "components.controls.textalign.right": "Derecha", "components.controls.textalign.justify": "Justificado" }, ja: { "generic.add": "追加", "generic.cancel": "キャンセル", "components.controls.blocktype.h1": "見出し1", "components.controls.blocktype.h2": "見出し2", "components.controls.blocktype.h3": "見出し3", "components.controls.blocktype.h4": "見出し4", "components.controls.blocktype.h5": "見出し5", "components.controls.blocktype.h6": "見出し6", "components.controls.blocktype.blockquote": "引用", "components.controls.blocktype.code": "コード", "components.controls.blocktype.blocktype": "スタイル", "components.controls.blocktype.normal": "標準テキスト", "components.controls.colorpicker.colorpicker": "テキストの色", "components.controls.colorpicker.text": "テキスト", "components.controls.colorpicker.background": "ハイライト", "components.controls.embedded.embedded": "埋め込み", "components.controls.embedded.embeddedlink": "埋め込みリンク", "components.controls.embedded.enterlink": "リンクを入力してください", "components.controls.emoji.emoji": "絵文字", "components.controls.fontfamily.fontfamily": "フォント", "components.controls.fontsize.fontsize": "フォントサイズ", "components.controls.history.history": "履歴", "components.controls.history.undo": "元に戻す", "components.controls.history.redo": "やり直し", "components.controls.image.image": "画像", "components.controls.image.fileUpload": "ファイルをアップロード", "components.controls.image.byURL": "URL", "components.controls.image.dropFileText": "ここに画像をドラッグするか、クリックしてください", "components.controls.inline.bold": "太字", "components.controls.inline.italic": "斜体", "components.controls.inline.underline": "下線", "components.controls.inline.strikethrough": "取り消し線", "components.controls.inline.monospace": "等幅フォント", "components.controls.inline.superscript": "上付き文字", "components.controls.inline.subscript": "下付き文字", "components.controls.link.linkTitle": "リンクタイトル", "components.controls.link.linkTarget": "リンク対象", "components.controls.link.linkTargetOption": "新しいウィンドウで開く", "components.controls.link.link": "リンク", "components.controls.link.unlink": "リンクを解除", "components.controls.list.list": "リスト", "components.controls.list.unordered": "箇条書き", "components.controls.list.ordered": "番号付き", "components.controls.list.indent": "インデント増", "components.controls.list.outdent": "インデント減", "components.controls.remove.remove": "書式をクリア", "components.controls.textalign.textalign": "整列", "components.controls.textalign.left": "左揃え", "components.controls.textalign.center": "中央揃え", "components.controls.textalign.right": "右揃え", "components.controls.textalign.justify": "両端揃え" } };
        n2(38), n2(39);
        function Vo(t2) {
          return (Vo = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t3) {
            return typeof t3;
          } : function(t3) {
            return t3 && "function" == typeof Symbol && t3.constructor === Symbol && t3 !== Symbol.prototype ? "symbol" : typeof t3;
          })(t2);
        }
        function qo() {
          return (qo = Object.assign ? Object.assign.bind() : function(t2) {
            for (var e2 = 1; e2 < arguments.length; e2++) {
              var n3 = arguments[e2];
              for (var o3 in n3)
                Object.prototype.hasOwnProperty.call(n3, o3) && (t2[o3] = n3[o3]);
            }
            return t2;
          }).apply(this, arguments);
        }
        function Ko(e2, t2) {
          var n3 = Object.keys(e2);
          if (Object.getOwnPropertySymbols) {
            var o3 = Object.getOwnPropertySymbols(e2);
            t2 && (o3 = o3.filter(function(t3) {
              return Object.getOwnPropertyDescriptor(e2, t3).enumerable;
            })), n3.push.apply(n3, o3);
          }
          return n3;
        }
        function Xo(e2) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var n3 = null != arguments[t2] ? arguments[t2] : {};
            t2 % 2 ? Ko(Object(n3), true).forEach(function(t3) {
              $o(e2, t3, n3[t3]);
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(n3)) : Ko(Object(n3)).forEach(function(t3) {
              Object.defineProperty(e2, t3, Object.getOwnPropertyDescriptor(n3, t3));
            });
          }
          return e2;
        }
        function $o(t2, e2, n3) {
          return e2 in t2 ? Object.defineProperty(t2, e2, { value: n3, enumerable: true, configurable: true, writable: true }) : t2[e2] = n3, t2;
        }
        function tr(t2) {
          return function(t3) {
            if (Array.isArray(t3))
              return er(t3);
          }(t2) || function(t3) {
            if ("undefined" != typeof Symbol && null != t3[Symbol.iterator] || null != t3["@@iterator"])
              return Array.from(t3);
          }(t2) || function(t3, e2) {
            if (!t3)
              return;
            if ("string" == typeof t3)
              return er(t3, e2);
            var n3 = Object.prototype.toString.call(t3).slice(8, -1);
            "Object" === n3 && t3.constructor && (n3 = t3.constructor.name);
            if ("Map" === n3 || "Set" === n3)
              return Array.from(t3);
            if ("Arguments" === n3 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n3))
              return er(t3, e2);
          }(t2) || function() {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
          }();
        }
        function er(t2, e2) {
          (null == e2 || e2 > t2.length) && (e2 = t2.length);
          for (var n3 = 0, o3 = new Array(e2); n3 < e2; n3++)
            o3[n3] = t2[n3];
          return o3;
        }
        function nr(t2, e2) {
          for (var n3 = 0; n3 < e2.length; n3++) {
            var o3 = e2[n3];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(t2, o3.key, o3);
          }
        }
        function or(t2, e2) {
          return (or = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t3, e3) {
            return t3.__proto__ = e3, t3;
          })(t2, e2);
        }
        function rr(o3) {
          var r3 = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct)
              return false;
            if (Reflect.construct.sham)
              return false;
            if ("function" == typeof Proxy)
              return true;
            try {
              return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
              })), true;
            } catch (t2) {
              return false;
            }
          }();
          return function() {
            var t2, e2 = ir(o3);
            if (r3) {
              var n3 = ir(this).constructor;
              t2 = Reflect.construct(e2, arguments, n3);
            } else
              t2 = e2.apply(this, arguments);
            return function(t3, e3) {
              {
                if (e3 && ("object" === Vo(e3) || "function" == typeof e3))
                  return e3;
                if (void 0 !== e3)
                  throw new TypeError("Derived constructors may only return object or undefined");
              }
              return function(t4) {
                if (void 0 !== t4)
                  return t4;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              }(t3);
            }(this, t2);
          };
        }
        function ir(t2) {
          return (ir = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t3) {
            return t3.__proto__ || Object.getPrototypeOf(t3);
          })(t2);
        }
        var cr = function() {
          !function(t3, e3) {
            if ("function" != typeof e3 && null !== e3)
              throw new TypeError("Super expression must either be null or a function");
            t3.prototype = Object.create(e3 && e3.prototype, { constructor: { value: t3, writable: true, configurable: true } }), Object.defineProperty(t3, "prototype", { writable: false }), e3 && or(t3, e3);
          }(i3, f["Component"]);
          var t2, e2, n3, r3 = rr(i3);
          function i3(t3) {
            var c3;
            !function(t4, e4) {
              if (!(t4 instanceof e4))
                throw new TypeError("Cannot call a class as a function");
            }(this, i3), (c3 = r3.call(this, t3)).onEditorBlur = function() {
              c3.setState({ editorFocused: false });
            }, c3.onEditorFocus = function(t4) {
              var e4 = c3.props.onFocus;
              c3.setState({ editorFocused: true });
              var n5 = c3.focusHandler.isEditorFocused();
              e4 && n5 && e4(t4);
            }, c3.onEditorMouseDown = function() {
              c3.focusHandler.onEditorMouseDown();
            }, c3.keyBindingFn = function(t4) {
              if ("Tab" !== t4.key)
                return "ArrowUp" !== t4.key && "ArrowDown" !== t4.key || b() && t4.preventDefault(), Object(E.getDefaultKeyBinding)(t4);
              var e4 = c3.props.onTab;
              if (!e4 || !e4(t4)) {
                var n5 = Object(S.changeDepth)(c3.state.editorState, t4.shiftKey ? -1 : 1, 4);
                n5 && n5 !== c3.state.editorState && (c3.onChange(n5), t4.preventDefault());
              }
              return null;
            }, c3.onToolbarFocus = function(t4) {
              var e4 = c3.props.onFocus;
              e4 && c3.focusHandler.isToolbarFocused() && e4(t4);
            }, c3.onWrapperBlur = function(t4) {
              var e4 = c3.props.onBlur;
              e4 && c3.focusHandler.isEditorBlur(t4) && e4(t4, c3.getEditorState());
            }, c3.onChange = function(t4) {
              var e4 = c3.props, n5 = e4.readOnly, o4 = e4.onEditorStateChange;
              n5 || "atomic" === Object(S.getSelectedBlocksType)(t4) && t4.getSelection().isCollapsed || (o4 && o4(t4, c3.props.wrapperId), M(c3.props, "editorState") ? c3.afterChange(t4) : c3.setState({ editorState: t4 }, c3.afterChange(t4)));
            }, c3.setWrapperReference = function(t4) {
              c3.wrapper = t4;
            }, c3.setEditorReference = function(t4) {
              c3.props.editorRef && c3.props.editorRef(t4), c3.editor = t4;
            }, c3.getCompositeDecorator = function(t4) {
              var e4 = [].concat(tr(c3.props.customDecorators), [{ strategy: Mo, component: jo({ showOpenOptionOnHover: t4.link.showOpenOptionOnHover }) }]);
              return c3.props.mention && e4.push.apply(e4, tr(To(Xo(Xo({}, c3.props.mention), {}, { onChange: c3.onChange, getEditorState: c3.getEditorState, getSuggestions: c3.getSuggestions, getWrapperRef: c3.getWrapperRef, modalHandler: c3.modalHandler })))), c3.props.hashtag && e4.push(Ro(c3.props.hashtag)), new E.CompositeDecorator(e4);
            }, c3.getWrapperRef = function() {
              return c3.wrapper;
            }, c3.getEditorState = function() {
              return c3.state ? c3.state.editorState : null;
            }, c3.getSuggestions = function() {
              return c3.props.mention && c3.props.mention.suggestions;
            }, c3.afterChange = function(o4) {
              setTimeout(function() {
                var t4 = c3.props, e4 = t4.onChange, n5 = t4.onContentStateChange;
                e4 && e4(Object(E.convertToRaw)(o4.getCurrentContent())), n5 && n5(Object(E.convertToRaw)(o4.getCurrentContent()));
              });
            }, c3.isReadOnly = function() {
              return c3.props.readOnly;
            }, c3.isImageAlignmentEnabled = function() {
              return c3.state.toolbar.image.alignmentEnabled;
            }, c3.createEditorState = function(t4) {
              var e4;
              if (M(c3.props, "editorState"))
                c3.props.editorState && (e4 = E.EditorState.set(c3.props.editorState, { decorator: t4 }));
              else if (M(c3.props, "defaultEditorState"))
                c3.props.defaultEditorState && (e4 = E.EditorState.set(c3.props.defaultEditorState, { decorator: t4 }));
              else if (M(c3.props, "contentState")) {
                if (c3.props.contentState) {
                  var n5 = Object(E.convertFromRaw)(c3.props.contentState);
                  e4 = E.EditorState.createWithContent(n5, t4), e4 = E.EditorState.moveSelectionToEnd(e4);
                }
              } else if (M(c3.props, "defaultContentState") || M(c3.props, "initialContentState")) {
                var o4 = c3.props.defaultContentState || c3.props.initialContentState;
                o4 && (o4 = Object(E.convertFromRaw)(o4), e4 = E.EditorState.createWithContent(o4, t4), e4 = E.EditorState.moveSelectionToEnd(e4));
              }
              return e4 = e4 || E.EditorState.createEmpty(t4);
            }, c3.filterEditorProps = function(t4) {
              return e4 = t4, n5 = ["onChange", "onEditorStateChange", "onContentStateChange", "initialContentState", "defaultContentState", "contentState", "editorState", "defaultEditorState", "locale", "localization", "toolbarOnFocus", "toolbar", "toolbarCustomButtons", "toolbarClassName", "editorClassName", "toolbarHidden", "wrapperClassName", "toolbarStyle", "editorStyle", "wrapperStyle", "uploadCallback", "onFocus", "onBlur", "onTab", "mention", "hashtag", "ariaLabel", "customBlockRenderFunc", "customDecorators", "handlePastedText", "customStyleMap"], o4 = Object.keys(e4).filter(function(t5) {
                return n5.indexOf(t5) < 0;
              }), r4 = {}, o4 && 0 < o4.length && o4.forEach(function(t5) {
                r4[t5] = e4[t5];
              }), r4;
              var e4, n5, o4, r4;
            }, c3.getStyleMap = function(t4) {
              return Xo(Xo({}, Object(S.getCustomStyleMap)()), t4.customStyleMap);
            }, c3.changeEditorState = function(t4) {
              var e4 = Object(E.convertFromRaw)(t4), n5 = c3.state.editorState;
              return n5 = E.EditorState.push(n5, e4, "insert-characters"), n5 = E.EditorState.moveSelectionToEnd(n5);
            }, c3.focusEditor = function() {
              setTimeout(function() {
                c3.editor.focus();
              });
            }, c3.handleKeyCommand = function(t4) {
              var e4 = c3.state, n5 = e4.editorState, o4 = e4.toolbar.inline;
              if (o4 && 0 <= o4.options.indexOf(t4)) {
                var r4 = E.RichUtils.handleKeyCommand(n5, t4);
                if (r4)
                  return c3.onChange(r4), true;
              }
              return false;
            }, c3.handleReturn = function(t4) {
              if (b())
                return true;
              var e4 = c3.state.editorState, n5 = Object(S.handleNewLine)(e4, t4);
              return !!n5 && (c3.onChange(n5), true);
            }, c3.handlePastedTextFn = function(t4, e4) {
              var n5 = c3.state.editorState, o4 = c3.props, r4 = o4.handlePastedText, i4 = o4.stripPastedStyles;
              return r4 ? r4(t4, e4, n5, c3.onChange) : !i4 && function(t5, e5, n6, o5) {
                var r5 = Object(S.getSelectedBlock)(n6);
                if (r5 && "code" === r5.type) {
                  var i5 = E.Modifier.replaceText(n6.getCurrentContent(), n6.getSelection(), t5, n6.getCurrentInlineStyle());
                  return o5(E.EditorState.push(n6, i5, "insert-characters")), true;
                }
                if (e5) {
                  var c4 = O()(e5), a3 = n6.getCurrentContent();
                  return c4.entityMap.forEach(function(t6, e6) {
                    a3 = a3.mergeEntityData(e6, t6);
                  }), a3 = E.Modifier.replaceWithFragment(a3, n6.getSelection(), new x.List(c4.contentBlocks)), o5(E.EditorState.push(n6, a3, "insert-characters")), true;
                }
                return false;
              }(t4, e4, n5, c3.onChange);
            }, c3.preventDefault = function(t4) {
              "INPUT" === t4.target.tagName || "LABEL" === t4.target.tagName || "TEXTAREA" === t4.target.tagName ? c3.focusHandler.onInputMouseDown() : t4.preventDefault();
            };
            var e3 = D(Go, t3.toolbar), n4 = t3.wrapperId ? t3.wrapperId : Math.floor(1e4 * Math.random());
            c3.wrapperId = "rdw-wrapper-".concat(n4), c3.modalHandler = new a2(), c3.focusHandler = new p(), c3.blockRendererFn = Wo({ isReadOnly: c3.isReadOnly, isImageAlignmentEnabled: c3.isImageAlignmentEnabled, getEditorState: c3.getEditorState, onChange: c3.onChange }, t3.customBlockRenderFunc), c3.editorProps = c3.filterEditorProps(t3), c3.customStyleMap = c3.getStyleMap(t3), c3.compositeDecorator = c3.getCompositeDecorator(e3);
            var o3 = c3.createEditorState(c3.compositeDecorator);
            return Object(S.extractInlineStyle)(o3), c3.state = { editorState: o3, editorFocused: false, toolbar: e3 }, c3;
          }
          return t2 = i3, (e2 = [{ key: "componentDidMount", value: function() {
            this.modalHandler.init(this.wrapperId);
          } }, { key: "componentDidUpdate", value: function(t3) {
            if (t3 !== this.props) {
              var e3 = {}, n4 = this.props, o3 = n4.editorState, r4 = n4.contentState;
              if (!this.state.toolbar) {
                var i4 = D(Go, i4);
                e3.toolbar = i4;
              }
              if (M(this.props, "editorState") && o3 !== t3.editorState)
                e3.editorState = o3 ? E.EditorState.set(o3, { decorator: this.compositeDecorator }) : E.EditorState.createEmpty(this.compositeDecorator);
              else if (M(this.props, "contentState") && r4 !== t3.contentState)
                if (r4) {
                  var c3 = this.changeEditorState(r4);
                  c3 && (e3.editorState = c3);
                } else
                  e3.editorState = E.EditorState.createEmpty(this.compositeDecorator);
              t3.editorState === o3 && t3.contentState === r4 || Object(S.extractInlineStyle)(e3.editorState), Object.keys(e3).length && this.setState(e3), this.editorProps = this.filterEditorProps(this.props), this.customStyleMap = this.getStyleMap(this.props);
            }
          } }, { key: "render", value: function() {
            var t3 = this.state, e3 = t3.editorState, n4 = t3.editorFocused, r4 = t3.toolbar, o3 = this.props, i4 = o3.locale, c3 = o3.localization, a3 = c3.locale, l2 = c3.translations, s2 = o3.toolbarCustomButtons, u2 = o3.toolbarOnFocus, p2 = o3.toolbarClassName, d2 = o3.toolbarHidden, f2 = o3.editorClassName, y2 = o3.wrapperClassName, m2 = o3.toolbarStyle, g2 = o3.editorStyle, b2 = o3.wrapperStyle, h2 = o3.uploadCallback, M2 = o3.ariaLabel, j2 = { modalHandler: this.modalHandler, editorState: e3, onChange: this.onChange, translations: Xo(Xo({}, Jo[i4 || a3]), l2) }, v2 = n4 || this.focusHandler.isInputFocused() || !u2;
            return N.a.createElement("div", { id: this.wrapperId, className: w()(y2, "rdw-editor-wrapper"), style: b2, onClick: this.modalHandler.onEditorClick, onBlur: this.onWrapperBlur, "aria-label": "rdw-wrapper" }, !d2 && N.a.createElement("div", { className: w()("rdw-editor-toolbar", p2), style: Xo({ visibility: v2 ? "visible" : "hidden" }, m2), onMouseDown: this.preventDefault, "aria-label": "rdw-toolbar", "aria-hidden": (!n4 && u2).toString(), onFocus: this.onToolbarFocus }, r4.options.map(function(t4, e4) {
              var n5 = so[t4], o4 = r4[t4];
              return "image" === t4 && h2 && (o4.uploadCallback = h2), N.a.createElement(n5, qo({ key: e4 }, j2, { config: o4 }));
            }), s2 && s2.map(function(t4, e4) {
              return N.a.cloneElement(t4, Xo({ key: e4 }, j2));
            })), N.a.createElement("div", { ref: this.setWrapperReference, className: w()(f2, "rdw-editor-main"), style: g2, onClick: this.focusEditor, onFocus: this.onEditorFocus, onBlur: this.onEditorBlur, onKeyDown: C.onKeyDown, onMouseDown: this.onEditorMouseDown }, N.a.createElement(E.Editor, qo({ ref: this.setEditorReference, keyBindingFn: this.keyBindingFn, editorState: e3, onChange: this.onChange, blockStyleFn: L, customStyleMap: this.getStyleMap(this.props), handleReturn: this.handleReturn, handlePastedText: this.handlePastedTextFn, blockRendererFn: this.blockRendererFn, handleKeyCommand: this.handleKeyCommand, ariaLabel: M2 || "rdw-editor", blockRenderMap: S.blockRenderMap }, this.editorProps))));
          } }]) && nr(t2.prototype, e2), n3 && nr(t2, n3), Object.defineProperty(t2, "prototype", { writable: false }), i3;
        }();
        cr.propTypes = { onChange: y.a.func, onEditorStateChange: y.a.func, onContentStateChange: y.a.func, initialContentState: y.a.object, defaultContentState: y.a.object, contentState: y.a.object, editorState: y.a.object, defaultEditorState: y.a.object, toolbarOnFocus: y.a.bool, spellCheck: y.a.bool, stripPastedStyles: y.a.bool, toolbar: y.a.object, toolbarCustomButtons: y.a.array, toolbarClassName: y.a.string, toolbarHidden: y.a.bool, locale: y.a.string, localization: y.a.object, editorClassName: y.a.string, wrapperClassName: y.a.string, toolbarStyle: y.a.object, editorStyle: y.a.object, wrapperStyle: y.a.object, uploadCallback: y.a.func, onFocus: y.a.func, onBlur: y.a.func, onTab: y.a.func, mention: y.a.object, hashtag: y.a.object, textAlignment: y.a.string, readOnly: y.a.bool, tabIndex: y.a.number, placeholder: y.a.string, ariaLabel: y.a.string, ariaOwneeID: y.a.string, ariaActiveDescendantID: y.a.string, ariaAutoComplete: y.a.string, ariaDescribedBy: y.a.string, ariaExpanded: y.a.string, ariaHasPopup: y.a.string, customBlockRenderFunc: y.a.func, wrapperId: y.a.number, customDecorators: y.a.array, editorRef: y.a.func, handlePastedText: y.a.func }, cr.defaultProps = { toolbarOnFocus: false, toolbarHidden: false, stripPastedStyles: false, localization: { locale: "en", translations: {} }, customDecorators: [] };
        var ar = cr;
      }], i.c = a, i.d = function(t, e, n2) {
        i.o(t, e) || Object.defineProperty(t, e, { enumerable: true, get: n2 });
      }, i.r = function(t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t, "__esModule", { value: true });
      }, i.t = function(e, t) {
        if (1 & t && (e = i(e)), 8 & t)
          return e;
        if (4 & t && "object" == typeof e && e && e.__esModule)
          return e;
        var n2 = /* @__PURE__ */ Object.create(null);
        if (i.r(n2), Object.defineProperty(n2, "default", { enumerable: true, value: e }), 2 & t && "string" != typeof e)
          for (var o2 in e)
            i.d(n2, o2, (function(t2) {
              return e[t2];
            }).bind(null, o2));
        return n2;
      }, i.n = function(t) {
        var e = t && t.__esModule ? function() {
          return t.default;
        } : function() {
          return t;
        };
        return i.d(e, "a", e), e;
      }, i.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
      }, i.p = "", i(i.s = 8);
      function i(t) {
        if (a[t])
          return a[t].exports;
        var e = a[t] = { i: t, l: false, exports: {} };
        return c[t].call(e.exports, e, e.exports, i), e.l = true, e.exports;
      }
      var c, a;
    });
  }
});
export default require_react_draft_wysiwyg();
/*! Bundled license information:

react-draft-wysiwyg/dist/react-draft-wysiwyg.js:
  (*!
    Copyright (c) 2017 Jed Watson.
    Licensed under the MIT License (MIT), see
    http://jedwatson.github.io/classnames
  *)
*/
//# sourceMappingURL=react-draft-wysiwyg.js.map
