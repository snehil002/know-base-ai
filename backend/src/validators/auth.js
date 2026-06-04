exports.validateAuthForm = (req, res, next) => {
  try {
    const formData = req.body;

    const newErrors = {};
  
    if (!formData.companyEmail.trim()) {
      newErrors.companyEmail = 'Company email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.companyEmail)) {
      newErrors.companyEmail = 'Please enter a valid company email';
    }

    if (Object.keys(newErrors).length > 0) {
      const err = new Error("Form validation failed");
      err.forFrontend = {
        message: err.message,
        details: { formErrors: newErrors },
        statusCode: 400,
      };
      throw err;
    }

    next();
  } catch (err) {
    next(err);
  }
};

exports.validateSearchParam = (req, res, next) => {
  try {
    if (Object.keys(req.query).length > 1) {
      const err = new Error("Incorrect verification url");
      err.forFrontend = {
        message: err.message,
        statusCode: 400,
      }
      throw err;
    }

    if (!req.query.magicToken) {
      const err = new Error("Incorrect verification url");
      err.forFrontend = {
        message: err.message,
        statusCode: 400,
      }
      throw err;
    }
    
    next();
  } catch (err) {
    next(err);
  }
};
