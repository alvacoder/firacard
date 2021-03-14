<<<<<<< HEAD
const hideLink = document.querySelector('.hideLink')
const hideBtn = document.querySelector('.hideBtn')
const toggle = document.querySelector('.toggle')

const handleToggle = () => {
    console.log('toggle clicked');
    alert("toggle clicked")
} 
=======

const toggle = document.querySelector('.toggle')
const close = document.querySelector('.close')
const hideLink = document.querySelector('.hideLinks')
const hideBtn = document.querySelector('.hideBtn')

document.addEventListener('click', () => {
    
    if(toggle){
        console.log('toggle');
        // (toggle.style.display = 'none') && (close.style.display = 'block')
        hideLink.style.display = 'block'
        hideBtn.style.display = 'block'
    } else if (toggle) {
        hideBtn.style.display = 'none'
    }
})

>>>>>>> 93e33216743781ce4adf4ce46beaa4b3b12aa2eb
