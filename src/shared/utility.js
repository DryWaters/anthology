export const validateInput = input => {
  let isValid = true;
  if (!input.validation) {
    return isValid;
  }

  // check for input length
  if (input.validation.required) {
    if (!input.value) {
      isValid = false;
    } else {
      isValid = input.value.trim() !== "" && isValid;
    }
  }

  // check if string is a validURL for images
  if (input.validation.validURL) {
    const validURL = isValidURL(input.value) && isValid;
    isValid = validURL && isValid;
  }

  if (input.validation.validISBN) {
    const validISBN = isValidISBN(input.value) && isValid;
    isValid = validISBN && isValid;
  }

  return isValid;
};

// check if url is valid
// https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
export const isValidURL = url => {
  if (url.trim().length === 0) {
    return true;
  }
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$", // fragment locator
    "i"
  );
  return !!pattern.test(url);
};

// check if isbn is blank or valid ISBN
export const isValidISBN = isbn => {
  // Allow blank ISBN
  if (isbn.length === 0) {
    return true;
  }

  const hypenRegex = /-/g;
  isbn = isbn.trim().replace(hypenRegex, "");

  // Check for valid ISBN10
  if (isbn.length === 10) {
    // check if have valid characters
    // should contain only digits and ISBN10 last digit
    // checksum can be X - representing 10
    const validISBN10Regex = /^[\d]*x?$/gi;
    if (!validISBN10Regex.test(isbn)) {
      return false;
    }

    const charArray = [...isbn];
    if (charArray[charArray.length - 1].toLowerCase() === "x") {
      charArray[charArray.length - 1] = "10";
    }

    // check if digits equal a valid isbn
    // https://www.instructables.com/id/How-to-verify-a-ISBN/
    let sum = 0;
    let multiplier = 10;
    charArray.forEach(char => {
      sum += parseInt(char) * multiplier;
      multiplier--;
    });
    return sum % 11 === 0;
  } else if (isbn.length === 13) {
    // Check for valid ISBN13

    // check if have valid characters
    // should contain only digits and ISBN13 last digit
    // checksum CANNOT be X
    const validISBN10Regex = /^[\d]*$/g;
    if (!validISBN10Regex.test(isbn)) {
      return false;
    }

    // check if digits equal a valid isbn
    // https://www.instructables.com/id/How-to-verify-a-ISBN/
    let sum = 0;
    let multiplier = [1, 3];
    [...isbn].forEach((char, index) => {
      sum += parseInt(char) * multiplier[index % 2];
    });
    return sum % 10 === 0;
  } else {
    // neither isbn10 or 13...bad isbn
    return false;
  }
};

// check if all input fields are set to valid
export const validateForm = form => {
  let isFormValid = true;
  for (let input in form) {
    isFormValid = form[input].valid && isFormValid;
  }
  return isFormValid;
};
