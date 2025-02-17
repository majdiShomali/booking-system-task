const reCaptcha_site_key = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ||  "";
const captcha_url = process.env.NEXT_PUBLIC_CAPTCHA_URL || "";
const captcha_secret_key = process.env.CAPTCHA_SECRET_KEY|| "";
const url = process.env.NEXT_PUBLIC_API_URL || ""

export default {reCaptcha_site_key,captcha_url,captcha_secret_key,url}