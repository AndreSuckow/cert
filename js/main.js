var container = null
let startDelay = 1000
var dateControl, nameControl, divImg, ct;

function initMain() {
    console.log('Init')
    container = document.querySelector('#container')
    // dateControl = document.querySelector('input[type="date"]');
    dateControl = document.querySelector('#date');
    nameControl = document.querySelector('input[type="text"]');
    ct = document.querySelector('.ct');
    divImg = document.querySelector('.cert_img');
    setTimeout(() => {
        try {
            calcScale()
            setDivSize()
            //setup
            let ls = document.querySelector('.lds-dual-ring')
            ls.style.cssText = 'display: none'
            console.log(getDate())
            dateControl.innerText = getReverseDate()
            container.classList.remove('transp')
            animScreen()
        } catch (error) {
            console.log("Init error => \n", error)
        }
    }, startDelay);

}

function setDivSize() {
    console.log()
    ct.style.cssText = `width:${divImg.width}px; height:${divImg.height}px;`
}

function getReverseDate(str) {
    let dt = getDate()
    dt = dt.split('-')
    return (`${dt[2]}-${dt[1]}-${dt[0]}`)
}

function animScreen() {
    // console.log('callanim')
    let tl = gsap.timeline({
        onComplete: function () {
            //After
            document.querySelector('#name').classList.add('smooth')
            let gerar = document.querySelector('.gerar')
            gerar.classList.add('smooth')
            gerar.style.cssText = ''
        }
    });
    tl
        .from('.h1', .75, { x: '-=15%', autoAlpha: 0, ease: "power1.out" })
        .from('.h2', .75, { x: '-=15%', autoAlpha: 0, ease: "power1.out" }, '.2')
        .from('.name', .75, { x: '-=15%', autoAlpha: 0, ease: "power1.out" }, '.4')
        .from('#name', .75, { x: '-=15%', autoAlpha: 0, ease: "power1.out" }, '.4')
        .from('.date', .75, { x: '-=15%', autoAlpha: 0, ease: "power1.out" }, '.6')
        .from('#date', .75, { x: '-=15%', autoAlpha: 0, ease: "power1.out" }, '.8')
        .from('.gerar', .75, { y: '+=30%', autoAlpha: 0, ease: "power1.out" }, '1');
}


function gerar() {
    if (!validateName())
        return
    // ct.classList.add('show')
    document.querySelector('.cName').innerText = nameControl.value
    // let f = (dateControl.value).split('-')
    document.querySelector('.cDate').innerText = getReverseDate()
    ct.style.display = 'inline-block'
    captureScreen()
}

function getDate() {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    if (month.toString().length == 1) {
        month = '0' + month
    }
    let year = date.getFullYear();
    let currentDate = `${year}-${month}-${day}`;
    return currentDate
}

function validateName() {
    let name = nameControl.value;
    let minCharacters = 3;
    let maxCharacters = 40;
    let hasNumber = /\d/.test(name);
    let hasSymbol = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\]/.test(name);

    if (
        name.length > maxCharacters ||
        name.length < minCharacters ||
        hasNumber ||
        hasSymbol
    ) {
        //falha
        let errorMsg = document.querySelector(".error");
        errorMsg.style.opacity = "1";
        nameControl.style.cssText = "border-bottom: 3px solid #ec7063;width: 90%;"
        reverse()
        return false
    } else {
        // Uppercase em iniciais dos nomes
        name = name.toLowerCase().replace(/\b\w/g, function (char) {
            return char.toUpperCase();
        });
        return name;
    }
}

let rev = false
function reverse() {
    if (rev)
        return
    rev = true
    nameControl.addEventListener("change", (event) => {
        let errorMsg = document.querySelector(".error");
        errorMsg.style.opacity = "0";
        nameControl.style.cssText = ""
    });
}

function saveScreenshot(canvas) {
    const fileName = `certificado`;
    const link = document.createElement("a");
    link.download = fileName + ".png";
    canvas.toBlob(function (blob) {
        link.href = URL.createObjectURL(blob);
        document.body.appendChild(link);
        link.click();
    });
    // ct.classList.remove('show')
    // ct.style.display = 'none'
}

function captureScreen() {
    html2canvas(document.querySelector(".ct"), { backgroundColor: null }).then(canvas => {
        saveScreenshot(canvas);
    });
}