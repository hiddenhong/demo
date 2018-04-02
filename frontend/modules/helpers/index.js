export function checkHttpStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else if (response.status < 500) {
    return response.json().then(err => { throw { status: response.status, err } });
  } else if (response.status >= 500) {
    // status: 500 response -> `<h1>Server Error (500)</h1>`
    return response.json().catch(err => {throw { status: response.status, err: response.statusText} })
  }
}

export function parseJSON(response) {
  let json = response.json()
  json.status = response.status
  return json.then((data) => ({status: response.status, ...data}))
}

export function getAuthErrorMessage(error) {
  let errorText = ''
  if (error) {
    if (error.username) {
      errorText = 'The username already exists!'
    }

    if (error.email) {
      errorText = 'The email address already exists!'
    }

    if (error.username && error.email) {
      errorText = 'The username and email address already exists!'
    }
  }

  return errorText;
}

// http://stackoverflow.com/questions/948172/password-strength-meter
function scorePassword(password) {
  let score = 0
  if (!password)
    return score

  // award every unique letter until 5 repetitions
  const letters = {}
  for (let i = 0; i < password.length; i++) {
    letters[password[i]] = (letters[password[i]] || 0) + 1
    score += 5.0 / letters[password[i]]
  }

  // bonus points for mixing it up
  const variations = {
    digits: /\d/.test(password),
    lower: /[a-z]/.test(password),
    upper: /[A-Z]/.test(password),
    nonWords: /\W/.test(password),
  }

  let variationCount = 0
  for (const check in variations) {
    if (variations.hasOwnProperty(check))
      variationCount += (variations[check] === true) ? 1 : 0
  }
  score += (variationCount - 1) * 10

  return parseInt(score, 10)
}

export function checkPassStrength(password) {
  const score = scorePassword(password)
  if (score > 80)
    return "strong";
  if (score > 60)
    return "good";
  if (score >= 30 || password.length === 6)
    return "weak";
  return "hide";
}
