// Pick the right ball
let broj_loptica = 0;
let loptica_score = -1;

function loadBallGame(){
    document.getElementById('ball-scores').innerText = `Bodovi: ${++loptica_score}`;
    document.getElementById('balls-container').innerHTML = '';
    document.getElementById('ball-message').innerText = '';

    if(broj_loptica < 25){
        broj_loptica += 5;
    }
    let broj_div_el = broj_loptica / 5;
    let izabrana_loptica = Math.round(Math.random() * --broj_loptica);
    ++broj_loptica;

    let random_hex_1 = ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");
    let random_hex_2 = ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");

    while(random_hex_1 == random_hex_2){
        random_hex_2 = ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");
    }
    
    for(let i = 0; i < broj_div_el; i++){
        let div_el = document.createElement('div');
        for(let j = 0; j < 5; j++){
            let loptica_el = document.createElement('div');
            loptica_el.classList.add('ball');
            loptica_el.style.backgroundColor = '#' + random_hex_1;

            if(j != izabrana_loptica){
                loptica_el.addEventListener('click', function(){
                    document.getElementById('ball-message').innerText = 'Wrong';
                });
            }

            console.log(izabrana_loptica)
            div_el.appendChild(loptica_el);
        }
        document.getElementById('balls-container').appendChild(div_el);
    }
    document.getElementsByClassName('ball')[izabrana_loptica].style.backgroundColor = '#' + random_hex_2;
    document.getElementsByClassName('ball')[izabrana_loptica].addEventListener('click', loadBallGame);
}

// Color Codes
let colors_array = [
    {
        name: 'crvena',
        eng_name: 'red',
        background: 'red',
        color_text: 'white'
    },
    {
        name: 'plava',
        eng_name: 'blue',
        background: 'blue',
        color_text: 'white'
    },
    {
        name: 'žuta',
        eng_name: 'yellow',
        background: 'yellow'
    },
    {
        name: 'narančasta',
        eng_name: 'orange',
        background: 'orange'
    },
    {
        name: 'zelena',
        eng_name: 'green',
        background: 'green',
        color_text: 'white'
    },
    {
        name: 'ljubičasta',
        eng_name: 'purple',
        background: '#A020F0',
        color_text: 'white'
    },
    {
        name: 'roza',
        eng_name: 'pink',
        background: 'pink'
    },
    {
        name: 'smeđa',
        eng_name: 'brown',
        background: '#964B00',
        color_text: 'white'
    },
    {
        name: 'siva',
        eng_name: 'gray',
        background: 'gray',
        color_text: 'white'
    },
    {
        name: 'bijela',
        eng_name: 'white',
        background: 'white'
    },
    {
        name: 'crna',
        eng_name: 'black',
        background: 'black',
        color_text: 'white'
    }
]
let color_codes_score = 0;
let number_boxes = 2;

function loadColorCodeGame(){
    setTimeout(function(){
        createColorCodeGame();
    }, 1000)
}

function createColorCodeGame(){
    document.getElementById('color-codes-scores').innerText = `Bodovi: ${color_codes_score}`;
    document.getElementById('color-codes-container').innerHTML = '';

    if(color_codes_score > 10){
        number_boxes = 4;
    }
    else if(color_codes_score > 5){
        number_boxes = 3;
    }

    let diff_box_place = Math.floor(Math.random() * number_boxes);
    let color_boxes_array = ['test'];

    for(let i = 0; i < number_boxes; i++){
        let div_el = document.createElement('div');
        let random_color = Math.floor(Math.random() * colors_array.length);

        if(i != diff_box_place){
            color_boxes_array.forEach(el => {
                while(el == colors_array[random_color].background){
                    random_color = Math.floor(Math.random() * colors_array.length);
                }
                div_el.innerText = colors_array[random_color].name;
                div_el.dataset.colorName = colors_array[random_color].eng_name;
            })
        }
        else {
            let diff_color = Math.floor(Math.random() * colors_array.length);
            while(random_color == diff_color){
                diff_color = Math.floor(Math.random() * colors_array.length);
            }
            
            div_el.innerText = colors_array[diff_color].name;
            div_el.dataset.colorName = colors_array[diff_color].eng_name;
        }

        color_boxes_array.push(colors_array[random_color].background);

        div_el.style.backgroundColor = colors_array[random_color].background;
        div_el.style.color = colors_array[random_color].color_text;
        div_el.classList.add('color-code');
        div_el.addEventListener('click', colorCodes);
        document.getElementById('color-codes-container').appendChild(div_el);
    }
}

function colorCodes(e){
    let target_background = e.target.style.backgroundColor;
    let target_name = e.target.getAttribute('data-color-name');
    
    for(let i = 0; i < document.querySelectorAll('.color-code').length; i++){
        document.getElementsByClassName('color-code')[i].removeEventListener('click', colorCodes);
    } 
    
    let image_el = document.createElement('img');
    if(target_background != target_name){
        color_codes_score++;
        e.target.style.boxShadow = '0 0 0 5px green';
        image_el.src = 'images/checkmark.png'
        setTimeout(createColorCodeGame, 1000);
    }
    else {
        e.target.style.boxShadow = '0 0 0 5px red';
        image_el.src = 'images/wrong.png';
        setTimeout(createColorCodeGame, 1000);
    }
    document.getElementById('color-codes-container').appendChild(image_el);
}

// PIXEL ART
let pixel_canvas = document.getElementById('pixel-art-container');
let input_size = document.getElementById('size-input');
let new_size = input_size.value;
let input_color = document.getElementById('color-input');
let input_draw = false;

function createPixels(size){
    pixel_canvas.style.setProperty('--size', size)

    for(let i = 0; i < size * size; i++){
        let div_el = document.createElement('div');
        div_el.classList.add('pixel');
        
        div_el.addEventListener('mouseover', function(){
            if(!input_draw) return
            div_el.style.backgroundColor = input_color.value;
        });
        div_el.addEventListener('mousedown', function(){
            div_el.style.backgroundColor = input_color.value;
        });

        pixel_canvas.appendChild(div_el);
    }
}

window.addEventListener('mousedown', function(){
    input_draw = true;
});

window.addEventListener('mouseup', function(){
    input_draw = false;
});

document.getElementById('reset-pixels').addEventListener('click', function(){
    for(let i = 0; i < document.querySelectorAll('.pixel').length; i++){
        document.getElementsByClassName('pixel')[i].style.backgroundColor = 'white';
    }
});

document.getElementById('new-canvas').addEventListener('click', function(){
    pixel_canvas.innerHTML = '';
    new_size = input_size.value;
    if(new_size > 0 && new_size <= 64){
        createPixels(new_size);
    }
})

// const accessKey = 'UKhct7FDyDd6ymCMHtSsv2OLw_3YdXVdR6R7_JqqD_w';
// const query = 'pixel for kids';
// fetch(`https://api.unsplash.com/search/photos?query=${query}`, {
//     headers: {
//         Authorization: `Client-ID ${accessKey}`
//     }
// })
// .then(response => response.json())
// .then(data => {
//     data.results.forEach(photo => {
//         const img = document.createElement('img');
//         img.src = photo.urls.regular;
//         document.body.appendChild(img);
//     });
// })
// .catch(error => {
//     console.log(error);
// });


