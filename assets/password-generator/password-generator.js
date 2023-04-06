export class PasswordGenerator {
  constructor() {
    const form = document.getElementById("pass-gen-id");
    const passField = document.getElementById("password-field");
    const sliderScore = document.getElementById("slider-score");
    const uppercase = form.elements["uppercase"];
    const lowercase = form.elements["lowercase"];
    const special = form.elements["special"];
    const numbers = form.elements["numbers"];
    const slider = form.elements["slider"];
    const sliderValue = () => parseInt(slider.value);
    const strengthIndicator = document.getElementById("strength-indicator");
    const lowercaseString = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseString = "abcdefghijklmnopqrstuvwxyz".toUpperCase();
    const specialString = "!@#$%&*....";
    const numbersString = "123456789";
    let password = "";
    let finalPassword = "";
    let passwordStrength = "";
    function copy() {
      if (passField) {
        passField.select();
        passField.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(passField.value);
      }
      alert("Password Copied to Clipboard");
    }
    ;
    function updateSlider() {
      if (sliderScore != null) {
        sliderScore.innerHTML = slider.value;
      }
    }
    updateSlider();
    function checkStrength() {
      document.getElementById("tick1")?.classList.remove("tick-fill");
      document.getElementById("tick2")?.classList.remove("tick-fill");
      document.getElementById("tick3")?.classList.remove("tick-fill");
      document.getElementById("tick4")?.classList.remove("tick-fill");
      document.getElementById("tick5")?.classList.remove("tick-fill");
      document.getElementById("tick6")?.classList.remove("tick-fill");
      let strengthNumber = 0;
      if (uppercase.checked) {
        strengthNumber += 10;
      }
      if (lowercase.checked) {
        strengthNumber += 10;
      }
      if (special.checked) {
        strengthNumber += 10;
      }
      if (numbers.checked) {
        strengthNumber += 10;
      }
      strengthNumber += sliderValue();
      if (strengthNumber >= 10) {
        document.getElementById("tick1")?.classList.add("tick-fill");
        strengthIndicator.innerHTML = "";
      }
      if (strengthNumber >= 20) {
        document.getElementById("tick2")?.classList.add("tick-fill");
      }
      if (strengthNumber >= 30) {
        document.getElementById("tick3")?.classList.add("tick-fill");
      }
      if (strengthNumber >= 40) {
        document.getElementById("tick4")?.classList.add("tick-fill");
      }
      if (strengthNumber >= 50) {
        document.getElementById("tick5")?.classList.add("tick-fill");
      }
      if (strengthNumber >= 60) {
        document.getElementById("tick6")?.classList.add("tick-fill");
      }
      return 0;
    }
    checkStrength();
    function generate() {
      if (!uppercase.checked &&
        !lowercase.checked &&
        !special.checked &&
        !numbers.checked) {
        return 0;
      }
      if (uppercase.checked) {
        password += uppercaseString;
      }
      if (lowercase.checked) {
        password += lowercaseString;
      }
      if (special.checked) {
        password += specialString;
      }
      if (numbers.checked) {
        password += numbersString;
      }
      for (let i = 0; i < sliderValue(); i++) {
        let randomNumber = Math.floor(Math.random() * password.length);
        finalPassword += password.split("")[randomNumber];
      }
      console.log(password);
      if (uppercase.checked) {
        finalPassword +=
          uppercaseString.split("")[Math.floor(Math.random() * uppercaseString.length)];
        finalPassword = finalPassword.slice(1);
        console.log(finalPassword);
      }
      if (lowercase.checked) {
        finalPassword +=
          lowercaseString.split("")[Math.floor(Math.random() * lowercaseString.length)];
        finalPassword = finalPassword.slice(1);
        console.log(finalPassword);
      }
      if (special.checked) {
        finalPassword +=
          specialString.split("")[Math.floor(Math.random() * specialString.length)];
        finalPassword = finalPassword.slice(1);
        console.log(finalPassword);
      }
      if (numbers.checked) {
        finalPassword +=
          numbersString.split("")[Math.floor(Math.random() * numbersString.length)];
        finalPassword = finalPassword.slice(1);
        console.log(finalPassword);
      }
      if (passField != null) {
        passField.value = finalPassword;
      }
      password = "";
      finalPassword = "";
    }
    const sliderElement = document.querySelector("[data-slider]");
    sliderElement.addEventListener("input", () => {
      updateSlider();
      checkStrength();
    })
    const checkboxElements = document.querySelectorAll("input[type=checkbox]");
    checkboxElements.forEach((checkbox) => {
      checkbox.addEventListener("click", () => {
        checkStrength();
      })
    })
    const generateButton = document.querySelector("[data-generate-button]");
    generateButton.addEventListener("click", generate)
    const copyButton = document.querySelector("[data-copy-button]");

    copyButton.addEventListener("click", () => {
      copy();
    })
  }
}
