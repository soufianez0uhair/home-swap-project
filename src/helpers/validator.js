export const nameValidator = (name) => {
  name = name.toLowerCase().split(' ');
  const ALPHAS = 'abcdefghijklmnopqrstuvwxyz';

  let i = 0;
  let j = 0;
  while(i < name.length && ALPHAS.indexOf(name[i][j]) !== -1) {
    j++;
    if(j === name[i].length) {
      j = 0;
      i++;
    }
  }

  if(i < name.length) {
    return false;
  }

  return true;
}

export const emailValidator = (email) => {
  const EMAILEXREG = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if(!email.match(EMAILEXREG)) {
    return false;
  }
  
  return true;
}

export const phoneNumValidator = (phone) => {
  const PHONEEXREG = /^(\+212|0)[67]\d{8}/;
  if(!phone.match(PHONEEXREG)) {
    return false;
  }

  return true;
}

export const passwordValidator = (password) => {
  if(password.length < 8) {
    return false;
  }

  const ALPHAS = 'abcdefghijklmnopqrstuvwxyz';
  const UPPERALPHAS = ALPHAS.toUpperCase();
  const numbers = '0123456789';
  
  let isAlpha = false;
  let isUpperAlpha= false;
  let isNumber = false;
  let isSpecialChar = false;

  let i = 0;
  while(i < password.length && (!isAlpha || !isUpperAlpha || !isNumber || !isSpecialChar)) {
    if(ALPHAS.indexOf(password[i]) !== -1) {
      isAlpha = true;
    } else if(UPPERALPHAS.indexOf(password[i]) !== -1) {
      isUpperAlpha = true;
    } else if(numbers.indexOf(password[i]) !== -1) {
      isNumber = true;
    } else {
      isSpecialChar = true;
    }
    i++;
  }

  if(!isAlpha || !isUpperAlpha || !isNumber || !isSpecialChar) {
    return false;
  }

  return true;
}