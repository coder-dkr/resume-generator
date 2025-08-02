export const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  export const validatePhone = (phone: string): boolean => {
    // Remove all non-digit characters
    const digits = phone.replace(/\D/g, '');
    return digits.length >= 10;
  };