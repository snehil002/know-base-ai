const validateFormData = (formData) => {
  const newErrors = {};
  
  if (!formData.fullName.trim()) {
    newErrors.fullName = 'Full name is required';
  }

  if (!formData.companyName.trim()) {
    newErrors.companyName = 'Company name is required';
  }
  
  if (!formData.email.trim()) {
    newErrors.email = 'Company email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    newErrors.email = 'Please enter a valid email';
  }
  
  if (!formData.password.trim()) {
    newErrors.password = 'Password is required';
  } else if (formData.password.length < 8) {
    newErrors.password = 'Password must be at least 8 characters';
  }
  
  if (formData.password !== formData.confirmPassword) {
    newErrors.confirmPassword = 'Passwords do not match';
  }
  
  if (Object.keys(newErrors).length > 0) {
    const err = new Error("Form validation failed");
    err.details = newErrors;
    throw err;
  }
};

const validateSignupForm = (req, res, next) => {
  try {
    validateFormData(req.body);
    next();
  } catch(err) {
    next(err);
  }
};

module.exports = validateSignupForm;