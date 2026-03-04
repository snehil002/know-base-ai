const validateFormData = (formData) => {
  const newErrors = {};
  
  if (!formData.companyEmail.trim()) {
    newErrors.companyEmail = 'Company email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.companyEmail)) {
    newErrors.companyEmail = 'Please enter a valid company email';
  }
  
  if (!formData.password.trim()) {
    newErrors.password = 'Password is required';
  } else if (formData.password.length < 8) {
    newErrors.password = 'Password must be at least 8 characters';
  }
  
  if (Object.keys(newErrors).length > 0) {
    const err = new Error("Form validation failed");
    err.forFrontend = true;
    err.details = {formErrors: newErrors};
    err.statusCode = 400;
    throw err;
  }
};

const validateLoginForm = (req, res, next) => {
  try {
    validateFormData(req.body);
    next();
  } catch(err) {
    next(err);
  }
};

module.exports = validateLoginForm;