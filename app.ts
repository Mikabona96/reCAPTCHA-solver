const { Solver } = require('2captcha');
console.log('wait...')
const url = window.location.href

const solver = new Solver(process.env.YOUR_API_KEY);

async function solveCaptcha(url: string) {
  const siteKey: string | null | undefined = document?.querySelector('[data-sitekey]')?.getAttribute('data-sitekey');
  console.log('starting a proccess...');

  try {
    const response = await solver.recaptcha(
      `${siteKey}`,
      `${url}`
      );  

    console.log('trying to find elements...');

    const textArea = await document.getElementById("g-recaptcha-response")
    const buttonB: HTMLButtonElement | null = document.querySelector('button[type="submit"]')
    const buttonI: HTMLInputElement | null = document.querySelector('input[type="submit"]')

    if (siteKey && textArea) {
      console.log('elements found');
    } else {
      console.log('elements not found');
    }

    
    textArea!.style.display = ''
    textArea!.innerHTML = response.data
    
    if (buttonB) {
      buttonB.click()
    }
    if (buttonI) {
      buttonI.click()
    }
    console.log('CreCAPTCHA solved...');
  } catch (error) {
    console.error(error);
  }
}
solveCaptcha(url)
module.exports = solveCaptcha
