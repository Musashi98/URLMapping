// to catch errors in the controller and respond to the client with the given message and status
function catchErrors(func) {
  return function (req, res, next) {
    func(req, res, next).catch((err) => {
      next(err);
    });
  };
}

module.exports = catchErrors;
