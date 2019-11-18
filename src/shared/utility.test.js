import * as util from "./utility.js";

describe("isValidURL", () => {
  it("should pass on valid urls", () => {
    expect(util.isValidURL("http://www.cisco.com")).toBe(true);
    expect(util.isValidURL("http://www.cisco.go/something")).toBe(true);
    expect(util.isValidURL("http://cisco.som//something/not.html")).toBe(true);
    expect(util.isValidURL("https://www.cisco.co/a/1/")).toBe(true);
    expect(util.isValidURL("http://www.cisco.com/")).toBe(true);
  });

  it("fail on invalid urls", () => {
    expect(util.isValidURL("httpp://www.cisco.com")).toBe(false);
    expect(util.isValidURL("http://www.cisco./////1")).toBe(false);
    expect(util.isValidURL("http://cisco//something/not.html")).toBe(false);
    expect(util.isValidURL("https://www.cisco./a/1/")).toBe(false);
    expect(util.isValidURL("htp://www.cisco.com/")).toBe(false);
  });
});

describe("validateInput", () => {
  it("should pass on valid input text", () => {
    const textValidation = {
      validation: {
        required: true
      }
    };
    textValidation.value = "valid";
    expect(util.validateInput(textValidation)).toBe(true);
    textValidation.value = "1";
    expect(util.validateInput(textValidation)).toBe(true);
    textValidation.value = "Larger amount of text that should be valid";
    expect(util.validateInput(textValidation)).toBe(true);
    textValidation.value = "你好";
    expect(util.validateInput(textValidation)).toBe(true);
  });

  it("should fail on invalid input text", () => {
    const textValidation = {
      validation: {
        required: true
      }
    };
    textValidation.value = "";
    expect(util.validateInput(textValidation)).toBe(false);
    textValidation.value = "     ";
    expect(util.validateInput(textValidation)).toBe(false);
    textValidation.value = "\n";
    expect(util.validateInput(textValidation)).toBe(false);
    delete textValidation.value;
    expect(util.validateInput(textValidation)).toBe(false);
  });

  it("should fail if one validation fails", () => {
    const textValidation = {
      validation: {
        required: true,
        validURL: true
      }
    };
    expect(util.validateInput(textValidation)).toBe(false);
    textValidation.value = "http://www.cisco./////1";
    expect(util.validateInput(textValidation)).toBe(false);
    textValidation.value = "";
    expect(util.validateInput(textValidation)).toBe(false);
    textValidation.value = "https://www.cisco./a/1/";
    expect(util.validateInput(textValidation)).toBe(false);
    textValidation.value = "htp://www.cisco.com/";
    expect(util.validateInput(textValidation)).toBe(false);
  });

  it("should return true if no validation required", () => {
    const textValidation = {};
    expect(util.validateInput(textValidation)).toBe(true);
  });
});

describe("validateForm", () => {
  it("should validate valid form", () => {
    const validForm = {
      validURL: {
        validation: {
          required: true,
          validURL: true
        },
        value: "http://sometext.com",
        valid: true
      },
      validCheckbox: {
        checked: true,
        valid: true
      }
    };
    expect(util.validateForm(validForm)).toBe(true);
  });

  it("should invalidate invalid form", () => {
    const validForm = {
      validURL: {
        validation: {
          required: true,
          validURL: true
        },
        value: "http://sometext",
        valid: false
      },
      validCheckbox: {
        checked: true,
        valid: true
      }
    };
    expect(util.validateForm(validForm)).toBe(false);
  });
});
