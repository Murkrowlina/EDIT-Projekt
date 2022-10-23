function prica(name, surname, scam, title, desc, img){
    this.name = name;
    this.surname = surname;
    this.scam = scam;
    this.title = title;
    this.desc = desc;
    this.splicedDesc = function() {
        return this.desc.slice(0, 30) + "<span class='dots'>...</span><span class='more'>" + this.desc.slice(30, this.desc.length + 30) + "</span>";
    };
    this.fullName = function() {
        return this.name + ' ' + this.surname;
    }
}

// --- LOADER --- 
function load() {
    const loader = document.getElementById('loader-wrapper');
  
    setTimeout(
        function() {
            loader.style.opacity = '0.3';
        }, 1000
    );
  
    window.addEventListener('DOMContentLoaded', function() {
      setTimeout(
        function() {
            loader.style.opacity = '0';
            loader.style.display = 'none';
            document.body.classList.remove('loading');
        }, 1500);
    });
}
load();

// --- SAMOSTALNI UNOS PRIČA ---
let pricaDIV = document.getElementById("stories");
let nizPrica = []; 
nizPrica[0] = new prica('Nikolina', 'Vulić', 'Romantična prevara', 'Online prijatelj je zapravo prevarant', 'Upoznala sam Britanca po imenu Kevin Stoolhand s LinkedIna. Čavrljali smo i nastavili smo pričati preko WhatsAppa. Kada je priznao da me voli, počela sam biti vrlo oprezna jer sam prije nailazila na takve prevare. Moje sumnje su bile točne. 28.03.2022. poslao mi je dugu poruku tražeći od mene da mu posudim 10 tisuća dolara da bi mogao platiti stan. Profil njegova LinkedIn:');
nizPrica[1] = new prica('Gabriel', 'Kokan', 'Krađa identiteta', 'Iskoristili su moje informacije !!', 'Kad sam prije mjesec dana došao na novu radnu poziciju i upoznao se sa kolegama, jedna kolegica po imenu Jessica Patrick počela me ispitivati pitanja kao datum rođenja, imam li djece, ljubimce i njihova imena. Sve se ovo odvilo na prvom danu, ali rekao sam da imam ljubimca i njegovo ime. Nisam bio previše oprezan pa sam u ovom slučaju dijelom i ja krvi. Sutra dan vidim da je na moje ime iznajmljena soba u jednom premium hotela, naručena pusta hrana i pića. Jako sam zabrinut i zato sam odlučio objaviti priču na Crnu Listu... pazite kakve informacije govorite ljudima.');

for (let i = 0; i < nizPrica.length; i++) {
    pricaDIV.innerHTML += `
    <div class="col s12 m12 l12 cardContainer" data-story="${i}">
        <div class="card hoverable">
            <div class="card-content blue-grey-text text-darken-4">
                <span class="card-author"><i class="fa-solid fa-user fa-xs"></i> ${nizPrica[i].fullName()}</span>
                <span class="card-title">${nizPrica[i].title}</span>
                <h6>${nizPrica[i].scam}</h6>
                <p class="img">${nizPrica[i].splicedDesc()}</p>
            </div>
            <div class="card-action">
                <a href="#!" class="blue-grey-text text-darken-4 readMore" onclick="readMore('${i}')">Više</a>
            </div>
        </div>
    </div>`;
}

// --- UNOS PRIČA IZ FORME --- 
let brojPrica = 2;
let objavi = document.getElementById('objavi');
objavi.addEventListener('click', postStory);

function postStory(){ 
    let inputsModal = document.getElementsByClassName('inputModal');
    let validationAlerts = document.getElementsByClassName('validationAlert');
    let name = document.getElementById('inputIme').value;
    let surname = document.getElementById('inputPrez').value
    let scamTypes = document.getElementById('typeScamSelected');
    let selectedScam = scamTypes.options[scamTypes.selectedIndex].value;
    let title = document.getElementById('inputTitle').value; 
    let desc = document.getElementById('inputDesc').value;

    if (name != "" && surname != "" && scamTypes != "" && title != "" && desc != ""){
        nizPrica[brojPrica] = new prica(name, surname, selectedScam, title, desc);

        pricaDIV.innerHTML += `
        <div class="col s12 m12 l12 cardContainer" data-story="${brojPrica}">
            <div class="card hoverable">
                <div class="card-content blue-grey-text text-darken-4">
                    <span class="card-author"><i class="fa-solid fa-user fa-xs"></i> ${nizPrica[brojPrica].fullName()}</span>
                    <span class="card-title">${nizPrica[brojPrica].title}</span>
                    <h6>${nizPrica[brojPrica].scam}</h6>
                    <p class="img">${nizPrica[brojPrica].splicedDesc()}</p>
                </div>
                <div class="card-action">
                    <a href="#!" class="blue-grey-text text-darken-4 readMore" onclick="readMore('${brojPrica}')">Više</a>
                </div>
            </div>   
        </div>`;
        brojPrica++;
        
        document.getElementById('modalForm').reset();

        for (let i = 0; i < inputsModal.length; i++) {
            inputsModal[i].classList.remove('invalid');
            validationAlerts[i].style.display = 'none';
        }
        scamTypes.classList.remove('invalid');
        document.getElementsByClassName('validationAlertSelect')[0].style.display = 'none';
    
        document.getElementById('objavi').classList.add('modal-close');
        setTimeout(
            function() {
                document.getElementById('objavi').classList.remove('modal-close');
            }, 1
        );
    }
    else {
        for (let i = 0; i < inputsModal.length; i++) {
            if (inputsModal[i].value == "") {
                inputsModal[i].classList.add('invalid');
                validationAlerts[i].style.display = 'block';
            }
            else {
                inputsModal[i].classList.remove('invalid');
                validationAlerts[i].style.display = 'none';
            }
        }

        if (selectedScam == 'Izaberite vrstu prevare') {
            scamTypes.classList.add('invalid');
            document.getElementsByClassName('validationAlertSelect')[0].style.display = 'block';
        }
        else {
            scamTypes.classList.remove('invalid');
            document.getElementsByClassName('validationAlertSelect')[0].style.display = 'none';
        }
    }
}


// --- READ MORE / LESS --- 
function readMore(brojPrica) {
    let dots = document.querySelector(`.cardContainer[data-story="${brojPrica}"] .dots`);
    let moreText = document.querySelector(`.cardContainer[data-story="${brojPrica}"] .more`); 
    let readMoreBTN = document.querySelector(`.cardContainer[data-story="${brojPrica}"] .readMore`);

    if (dots.style.display === "none") {
        dots.style.display = "inline";
        moreText.style.display = "none";
        readMoreBTN.textContent = "Više";
    } 
    else {
        dots.style.display = "none";
        moreText.style.display = "inline";
        readMoreBTN.textContent = "Manje";
    }
}

// --- FILTERI --- 
let scamSelect = document.getElementById("typeScamFilter");
function scamFilter() {
    let scamSelected = scamSelect.options[scamSelect.selectedIndex].value;  

    let removeAll = document.getElementById("stories"); 
    let cards = removeAll.getElementsByClassName("cardContainer"); 
    while(cards.length > 0) {
        removeAll.removeChild(cards[0]); 
    }
    
    if (scamSelected == "Sve vrste prevare") {
        for (let i = 0; i < nizPrica.length; i++) {
            pricaDIV.innerHTML += `
            <div class="col s12 m12 l12 cardContainer" data-story="${nizPrica[i].title}">
                <div class="card hoverable">
                    <div class="card-content">
                        <span class="card-author"><i class="fa-solid fa-user fa-xs"></i> ${nizPrica[i].fullName()}</span>
                        <span class="card-title">${nizPrica[i].title}</span>
                        <h6>${nizPrica[i].scam}</h6>
                        <p>${nizPrica[i].splicedDesc()}</p>    
                    </div>
                    <div class="card-action">
                        <a href="#!" class="blue-grey-text text-darken-4 readMore" onclick="readMore('${nizPrica[i].title}')">Više</a>
                    </div>
                </div>
            </div>`;
        }
    }
    else {
        for (let i = 0; i < nizPrica.length; i++) {
            if (nizPrica[i].scam == scamSelected) {
                pricaDIV.innerHTML+= `
                <div class="col s12 m12 l12 cardContainer" data-story="${nizPrica[i].title}">
                    <div class="card hoverable">
                        <div class="card-content">
                            <span class="card-author"><i class="fa-solid fa-user fa-xs"></i> ${nizPrica[i].fullName()}</span>
                            <span class="card-title">${nizPrica[i].title}</span>
                            <h6>${nizPrica[i].scam}</h6>
                            <p>${nizPrica[i].splicedDesc()}</p>    
                        </div>
                        <div class="card-action">
                            <a href="#!" class="blue-grey-text text-darken-4 readMore" onclick="readMore('${nizPrica[i].title}')">Više</a>
                        </div>
                    </div>
                </div>`;
            }
        }
    }
}

let scrollArrow = document.getElementById('scrollTop');
scrollTop.addEventListener('click', topFunction);
window.addEventListener('scroll', scrollingFunction);

function scrollingFunction() {
    if (window.scrollY > 5) {
        scrollArrow.style.display = 'block';
    }
    else {
        scrollArrow.style.display = 'none';
    }
}

function topFunction() {
    window.scrollTo(0, 0);
}

// SIDENAV
var elem = document.querySelector('.sidenav');
var instance = new M.Sidenav(elem);

$(document).ready(function(){
    $('.sidenav').sidenav();
});

// PARALLAX
$(document).ready(function(){
    $('.parallax').parallax();
});

// MODAL
$(document).ready(function(){
    $('.modal').modal();
});

// TABS
$(document).ready(function(){
    $('.tabs').tabs();
});

// CHARACTER COUNT FOR TEXTAREA
$(document).ready(function() {
    $('textarea#inputDesc').characterCounter();
});
      
