const validateFormData = (formData) => {
  const newErrors = {};
  
  if (!formData.fullName.trim()) {
    newErrors.fullName = 'Full name is required';
  }
  
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
    const err = new Error("Create User Form validation failed");
    err.statusCode = 400;
    err.details = {formErrors: newErrors};
    throw err;
  }
};

const validateCreateUserForm = (req, res, next) => {
  try {
    validateFormData(req.body);
    next();
  } catch(err) {
    next(err);
  }
};

module.exports = validateCreateUserForm;