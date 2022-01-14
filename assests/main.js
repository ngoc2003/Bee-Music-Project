const playBtn = document.querySelector('.play-inner');
const nextBtn = document.querySelector('.play-forward');
const prevBtn = document.querySelector('.play-backward');
const song = document.getElementById('song');
const timerLeft = document.querySelector('.timer__left');
const timerRight = document.querySelector('.timer__right');
const playRepeat = document.querySelector('.play-repeat');
const rangeBar = document.querySelector('.range');
const playList = document.querySelector('.playlist-list');
const shuffle = document.querySelector('.shuffle-song');
const musics =[
    {
        id: 0,
        number: '01',
        file:'ntt.mp3',
        title: 'Ngày tận thế',
        artist: 'Tóc Tiên',
        time: '3:52',
        active:false,

    },
    {
        id: 1,
        number: '02',
        file: 'catena.mp3',
        title: 'Có ai thương em như anh',
        artist: 'Tóc Tiên',
        time: '3:51',
        active:false,

    },
    {
        id: 2,
        number: '03',
        file: 'edcnm.mp3',
        title: 'Em đã có người mới',
        artist: 'Tóc Tiên',
        time: '3:20',
        active:false,

    },
    {
        id: 3,
        number: '04',
        file: 'vdcc.mp3',
        title: 'Vũ điệu cồng chiêng',
        artist: 'Tóc Tiên',
        time: '3:24',
        active:false,

    },
    {
        id: 4,
        number: '05',
        file: 'ttbdty.mp3',
        title: 'Trên tình bạn dưới tình yêu',
        artist: 'Min',
        time: '3:19',
        active:false,

    },
];

//set mặc định bài 1 phát đầu
let indexSong = 0;
song.setAttribute('src', `./assests/mp3/${musics[indexSong].file}`); 
//==============================================
//                  THÊM BÀI HÁT 
//==============================================
for (var i = 0 ;i< musics.length; i++) {
    playList.insertAdjacentHTML( 'beforeend',
       `<div class="playlist playlist--hover ${i === indexSong ? 'active' : ''}" data-index=${musics[i].id}>
            <p class=" playlist__number">${i === indexSong? '<i class="fas fa-volume-up"></i>' : `${musics[i].number}`}</p>
            <p class=" playlist__title">${musics[i].title}</p>
            <p class=" playlist__artist">${musics[i].artist}</p>
            <p class=" playlist__time">${musics[i].time}</p>
        </div>`)
}
//==============================================
//          RESET LẠI KHI CHỌN BÀI HÁT
//==============================================
function resetSong(dir) {
    dir = Number (dir);
    playList.innerHTML =`
    <div class="playlist playlist-list__title">
        <p class="playlist__number">#</p>
        <p class="playlist__title">TITLE</p>
        <p class="playlist__artist">ARTIST</p>
        <p class="playlist__time">TIME</p>
    </div>`;
    for (var j = 0 ;j< musics.length; j++) {
        playList.insertAdjacentHTML( 'beforeend',
       `<div class="playlist playlist--hover ${j === dir ? 'active' : ''}" data-index=${musics[j].id}>
            <p class=" playlist__number">${j === dir? '<i class="fas fa-volume-up"></i>' : `${musics[j].number}`}</p>
            <p class=" playlist__title">${musics[j].title}</p>
            <p class=" playlist__artist">${musics[j].artist}</p>
            <p class=" playlist__time">${musics[j].time}</p>
        </div>`)
    }
}
//==============================================
//                  Phát-dừng bài hát
//==============================================
let isPlaying = true;
playBtn.addEventListener('click', playPause)
function playPause() {
    if (isPlaying) {
        playBtn.innerHTML = `<i class="fas fa-pause-circle pause-icon main-icon main-icon--big"></i>`;
        song.play();
        isPlaying = false;
    } else{
        playBtn.innerHTML = `<i class="fas fa-play-circle play-icon main-icon main-icon--big"></i>`;
        song.pause();
        isPlaying = true;
    }
}
//==============================================
//                  Phát lại bài hát
//==============================================
var isRepeat = false;
playRepeat.addEventListener('click',  function() {
    if(playRepeat.style.color != 'yellow') {
        playRepeat.style.color = 'yellow';
        playRepeat.style.webkitTransform = 'rotate(360deg)';
        isRepeat = true;
    }else {
        playRepeat.style.color = '#676669';
        playRepeat.style.webkitTransform = 'rotate(0)';
        isRepeat = false;
    }
});
//==============================================
//                  Đổi bài hát
//==============================================
nextBtn.addEventListener('click',function() {
    if (isShuffle == true) changeSong(3);
    else changeSong(1);
});
prevBtn.addEventListener('click', function() {
    if (isShuffle == true) changeSong(3);
    else changeSong(-1);
});

function changeSong(dir) {
    if (dir === 1) { //next
        indexSong++;
        if (indexSong >= musics.length) {
            indexSong = 0;
        }
    } else if (dir === -1) { //prev
        indexSong--;
        if (indexSong < 0) {
            indexSong = musics.length-1;
        }
    } else if(dir === 3) {
        indexSong = Math.floor(Math.random() * 5);  
    }
    resetSong(indexSong);
    playBtn.innerHTML = `<i class="fas fa-pause-circle pause-icon main-icon main-icon--big"></i>`;
    song.setAttribute('src', `./assests/mp3/${musics[indexSong].file}`); 
    song.play();
}
//==============================================
//              SET THỜI GIAN PHAT NHẠC
//==============================================
function displayTimer() {
    // alert(song.duration); thời gian bản nhạc
    // alert(song.currentTime); thời gian chạy dc
    const { duration, currentTime } = song;
    timerRight.textContent = formatTimer(duration);
    timerLeft.textContent = formatTimer(currentTime);
    rangeBar.max = duration;
    rangeBar.value = currentTime;
}
//==============================================
//        FORMAT LẠI FORM THỜI GIAN CHẠY
//==============================================
function formatTimer(number) {
    const minutes = Math.floor(number / 60);
    const seconds = Math.floor(number - minutes * 60);
    if (seconds < 10) return `${minutes}:0${seconds}`;
    else return `${minutes}:${seconds}`;
}
//==============================================
//  Thay đổi khúc nhạc khi click chọn rangeBar
//==============================================
rangeBar.addEventListener('change',changeBar);
function changeBar() {
    song.currentTime = rangeBar.value; 
}
//==============================================
//       TỰ PHÁT BÀI TIẾP KHI KẾT THÚC
//==============================================
song.addEventListener('ended', function() {
    if (isRepeat == true) { // Phát lại bài hát
        isPlaying = true;
        playPause();
    } else changeSong(1); // Phát tiếp
});
//==============================================
//        CHỌN BÀI HÁT TRONG DANH SÁCH
//==============================================
playList.onclick = function(e) {
    
    const songNote = e.target.closest('.playlist--hover:not(.active)'); 
    let songNoteindex = songNote.getAttribute('data-index'); // lấy data-index
    indexSong = songNoteindex ;
    isPlaying = false;
    
    playBtn.innerHTML = `<i class="fas fa-pause-circle pause-icon main-icon main-icon--big"></i>`;
    song.setAttribute('src', `./assests/mp3/${musics[indexSong].file}`); 
    song.play();
    resetSong(songNoteindex);

};
//==============================================
//              XÁO BÀI HÁT
//==============================================
shuffle.addEventListener('click', shuffleSong);
var isShuffle = false;
function shuffleSong() {
    if (isShuffle == false) {
        isShuffle = true;
        shuffle.style.color = 'yellow';
        changeSong(3);
    }
    else{
        isShuffle = false;
        shuffle.style.color = '#676669';

    }
}
//==============================================
//                  HIỆU ỨNG TIM
//==============================================
const heartBtn = document.getElementById('heart');
heartBtn.addEventListener('click', function() {
    if (heartBtn.className == 'far fa-heart') {
        heartBtn.className = 'fas fa-heart';
        heartBtn.style.color = 'red';
    } else {
        heartBtn.className = 'far fa-heart';
        heartBtn.style.color = '#676669';
    }
})


displayTimer();
rangeBar.value = 0;
setInterval(displayTimer , 200); // cập nhật lại thời gian

//==============================================
//                  DARK THEME
//==============================================
const ball = document.querySelector('.ball');
const blackThemeBtn = document.querySelector('.check');
const blackThemeCanvas = document.getElementById('container');
blackThemeBtn.addEventListener('click', function() {
    if (blackThemeCanvas.classList.contains('dark-theme')) {
        blackThemeCanvas.classList.remove('dark-theme');
        ball.style.left = '2px';
    }
    else  {
        blackThemeCanvas.classList.add('dark-theme');
        ball.style.left = '22px'
    }
});

//==============================================
//                  MOBILE JS
//==============================================

const barLeft = document.querySelector('.bars-left');
const barRight = document.querySelector('.bars-right');
const sideBar = document.querySelector('#sidebar');
const navBar = document.querySelector('#navbar');
const hideNavBar = document.querySelector('.js-hide-navbar');
const hideSideBar = document.querySelector('.js-hide-sidebar');

barLeft.addEventListener('click', function() {
    navBar.classList.add('active');
    if (sideBar.classList.contains('active')) {
        sideBar.classList.remove('active');
    }
})
hideNavBar.addEventListener('click', function() {
    navBar.classList.remove('active')
})
barRight.addEventListener('click', function() {
    sideBar.classList.add('active');
    if (navBar.classList.contains('active')) {
        navBar.classList.remove('active');
    }
})
hideSideBar.addEventListener('click', function() {
    sideBar.classList.remove('active');
})