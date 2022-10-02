function catchErrors(func) {
  return function (req, res, next) {
    func(req, res, next).catch((err) => {
      next(err);
    });
  };
}

module.exports = catchErrors;
