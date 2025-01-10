const video1 = document.querySelector('#video1');
const video2 = document.querySelector('#video2');
const videos = [video1, video2]; // 影片
let currentvideo;

let isLookingAtImage = false;
let isOpenVideo = true;
let timer;
let leavetimer;
let pausetimer;

let currentindex;

let images= document.querySelectorAll('.imagePlane');
let videoplayer = document.querySelector('#videoplayer');
let toggleplay=document.querySelector('#videoControls');
const cursor = document.querySelector('#cursor');  // 光标元素

// 當光標進入圖片區域時
images.forEach(function(imagePlane, index) {
  imagePlane.addEventListener('mouseenter', function() {
    isLookingAtImage = true;
    // 設置光标顏色變為白色
    
    cursor.setAttribute('material', 'color: white');
    if(currentindex==index){
      clearTimeout(leavetimer);  // 取消定時器
      if(!isOpenVideo){
        cursor.setAttribute('visible', 'false');
      }
    }
    // 設置定時器
    timer = setTimeout(() => {
      if (isLookingAtImage) {
        // 顯示影片
        if(isOpenVideo){

          isOpenVideo=false;
          currentindex=index;
          const videoIndex = imagePlane.getAttribute('data-video-index');
          const videoSrc = imagePlane.getAttribute('data-video-src');
          const position = imagePlane.getAttribute('position');
          const rotation = imagePlane.getAttribute('rotation');
          videoplayer.setAttribute('position', position);
          videoplayer.setAttribute('rotation', rotation);
          videoplayer.setAttribute('src', videoSrc);
          videoplayer.setAttribute('visible', 'true');

          imagePlane.setAttribute('visible', 'false');

          currentvideo=videos[videoIndex];
          currentvideo.currentTime=0; 
          currentvideo.play();

          toggleplay.setAttribute('src','#pause');

          cursor.setAttribute('visible', 'false');
        }
      }
    }, 3000);  // 3秒後播放影片
  });

  // 當光標離開圖片區域時
  imagePlane.addEventListener('mouseleave', function() {
    isLookingAtImage = false;
    cursor.setAttribute('visible', 'true');
    clearTimeout(timer);  // 取消定時器
    if(currentindex==index){
      leavetimer = setTimeout(() => {
          // 顯示影片
          console.log(currentindex,index);
          
          videoplayer.setAttribute('visible', 'false');
          imagePlane.setAttribute('visible', 'true');
          isOpenVideo=true;
          currentvideo.pause();
          
          
            
      }, 3000);  // 3秒後播放影片
      // 恢復光标狀態
    }
    cursor.setAttribute('material', 'color: black');
  });
});
toggleplay.addEventListener('mouseenter', function() {
    // 設置光标顏色變為白色
    cursor.setAttribute('material', 'color: white');
    clearTimeout(leavetimer);  // 取消定時器
    // 設置定時器
    pausetimer = setTimeout(() => {
        // 顯示影片
        if(currentvideo.paused){
          currentvideo.play();
          toggleplay.setAttribute('src','#pause');
          }
          else{
            currentvideo.pause();
            toggleplay.setAttribute('src','#play');
          }
    }, 3000);  // 3秒後播放影片
  });
  toggleplay.addEventListener('mouseleave', function() {
    clearTimeout(pausetimer);  // 取消定時器
    // 恢復光标狀態
    leavetimer = setTimeout(() => {
          // 顯示影片
          images.forEach(function(imagePlane, index) {
            imagePlane.setAttribute('visible', 'true');
          });
          videoplayer.setAttribute('visible', 'false');
          isOpenVideo=true;
          currentvideo.pause();
          
            
      }, 3000);  // 3秒後播放影片
    cursor.setAttribute('material', 'color: black');
  });