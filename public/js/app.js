const weatherForm = document.querySelector('form')
const addr = document.querySelector('input')

const msgOne = document.querySelector('#message-one')
const msgTwo = document.querySelector('#message-two')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    msgOne.textContent=''
    msgTwo.textContent='Loading....'

    fetch('/weather?address='+addr.value).then((response) => {
        response.json().then((data) => {
            if(data.error){
                msgTwo.textContent=data.error
            }else{
                msgOne.textContent=data.location
                msgTwo.textContent=data.forecast
            }
        })
    })
})
