export const promisify =
  (fn) =>
  (...args) => {
    const promise = new Promise((resolve, reject) => {
      const callback = (err, data) => {
        if (err) reject(err);
        else resolve(data);
      };
      fn(...args, callback);
    });
    return promise;
  };

export const callbackify = (fn) => {
  var fnLength = fn.length;
  return function () {
    var args = [].slice.call(arguments);
    if (args.length === fnLength + 1 && typeof args[fnLength] === 'function') {
      // callback mode
      var cb = args.pop();
      fn.apply(this, args).then(
        (val) => {
          cb.call(this, null, val);
        },
        (err) => {
          cb.call(this, err);
        },
      );
      return;
    }
    return fn.apply(this, arguments);
  };
};
