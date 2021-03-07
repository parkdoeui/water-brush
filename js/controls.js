const buttonGroup = document.getElementById("button-group");
const panel = document.getElementById('panel')
const settings = document.getElementsByClassName("button settings")[0]
const buttonClose = document.getElementsByClassName("button close")[0];

settings.addEventListener('click', function () {
    
    const status = panel.style.visibility;
    if (status === 'hidden' || status === "") {
        panel.style.visibility = 'visible';
        panel.style.opacity = 1;
        panel.style.width = '250px';
        buttonGroup.style.visibility = 'hidden';
    }
    else {
        panel.style.visibility = 'hidden';
        panel.style.opacity = 0;
        panel.style.width = '220px';
        buttonGroup.style.visibility = 'visible';
    }
})

buttonClose.addEventListener('click', function () {
    
    const status = buttonGroup.style.visibility

    if (status === 'hidden' || status === "") {
        buttonGroup.style.visibility = 'visible';
        panel.style.visibility = 'hidden';
        panel.style.opacity = 0;
        panel.style.width = '220px';
    }
    else {
        buttonGroup.style.visibility = 'hidden';
        panel.style.visibility = 'visible';
        panel.style.opacity = 1;
        panel.style.width = '250px';
    }
})