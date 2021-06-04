window.onload = () => {
  const inputs = document.querySelectorAll('.input-component__input')
  const btnSubmit = document.querySelector('.auth-form__button')

  btnSubmit.addEventListener('click', (event) => {
    const result = {}
    for (let i = 0; i < inputs.length; i++) {
      let item = inputs[i]
      let name = item.name
      let value = item.value
      if (!value) {
        item.classList.add('input-component__input--error')
        item.classList.remove('input-component__input--success')
      } else {
        item.classList.remove('input-component__input--error')
        item.classList.add('input-component__input--success')
      }
      Object.assign(result, {[name]: value})
    }
    console.log(result)
    return result
  })

  for (let i = 0; i < inputs.length; i++) {
    let item = inputs[i]
    let className = 'input-component__input--error'
    item.addEventListener('input', () => {
      if (item.classList.contains(className)) {
        item.classList.remove(className) 
      }
    })
    
  }
}

