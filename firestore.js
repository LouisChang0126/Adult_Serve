// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyD0tANjRBSfLAZN01SEd12h7ak_kBxnppQ",
    authDomain: "test-6d304.firebaseapp.com",
    projectId: "test-6d304",
    storageBucket: "test-6d304.appspot.com",
    messagingSenderId: "992913315192",
    appId: "1:992913315192:web:c651e15336909777a5248d"
  };
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

// 解析 URL 中的參數
const urlParams = new URLSearchParams(window.location.search);
const user = urlParams.get('user');

// 在DOM加载完毕后执行
document.addEventListener("DOMContentLoaded", function() {
    db.collection("adult_serve").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if (doc.exists) {
                // 获取文档数据
                const data = doc.data();
                //hightlight
                const microphone = (data.主領 === user || data.副主領 === user || data.助唱.includes(user)) ? 'class="band_show has-background-warning"' : 'class="band_show"';
                const instruments = (data.司琴 === user || data.鼓手 === user || data.司琴2 === user || data.吉他 === user) ? 'class="band_show has-background-warning"' : 'class="band_show"';
                const mixer = (data.音控.includes(user)) ? 'class="band_show has-background-warning"' : 'class="band_show"';
                const ppt = (data.字幕1.includes(user) || data.字幕2.includes(user)) ? 'class="not_band_show has-background-warning"' : 'class="not_band_show"';
                const anchor = (data.司會 === user) ? 'class="not_band_show has-background-warning"' : 'class="not_band_show"';
                //LOUIS
                const offering = (data.奉獻 === user) ? 'class="not_band_show has-background-warning"' : 'class="not_band_show"';
                const welcomer = (data.招待.includes(user)) ? 'class="not_band_show has-background-warning"' : 'class="not_band_show"';
                const feast = (data.愛宴.includes(user)) ? 'class="not_band_show has-background-warning"' : 'class="not_band_show"';
                const prayer = (data["會前(後)"].includes(user)) ? 'class="not_band_show has-background-warning"' : 'class="not_band_show"';
                const newguy = (data.新人.includes(user)) ? 'class="not_band_show has-background-warning"' : 'class="not_band_show"';
                const prophetic = (data.禱告.includes(user)) ? 'class="not_band_show has-background-warning"' : 'class="not_band_show"';
                //重要資訊 換行
                var info;
                if (Array.isArray(data.重要資訊)) {
                    info = data.重要資訊.map(item => `<p>${item}</p>`).join("\n");
                } else {
                    info = ''; // 或者设置一个默认值，具体取决于你的需求
                    //console.log('重要資訊不是一个数组');
                }
                //vocal
                var vocal;
                if (data.主領 != " ") {
                    vocal = data.主領 + '/' + data.副主領 + '/' + data.助唱;
                }
                else {
                    vocal = ''; // 或者设置一个默认值，具体取决于你的需求
                }
                //樂手
                var band;
                if (data.司琴 != " ") {
                    band = data.司琴 + '/' + data.鼓手;
                    //LOUIS
                    /*
                    if(data.司琴2 != " ") band += '/' + data.司琴2;
                    else if(data.吉他 != " ") band += '/' + data.吉他;
                    */
                }
                else {
                    band = ''; // 或者设置一个默认值，具体取决于你的需求
                    //console.log('重要資訊不是一个数组');
                }
                //字幕
                var ppts;
                if (data.字幕1 != " ") {
                    ppts = data.字幕1 + '/' + data.字幕2;
                }
                else {
                    ppts = '';
                }
                //內文
                document.getElementById('chart').innerHTML += `
                <tr>
                    <th>${doc.id.substring(5,10).replace('.', '/')}</th>
                    <th class="info_show is-hidden">${info}</th>
                    <th ${microphone}>${vocal}</th>
                    <th ${instruments}>${band}</th>
                    <th ${mixer}>${data.音控}</th>
                    <th class="band_show">${data.彩排}</th>
                    <th ${ppt}>${ppts}</th>
                    <th ${anchor}>${data.司會}</th>
                    <th ${offering}>${data.奉獻}</th>
                    <th ${welcomer}>${data.招待}</th>
                    <th ${feast}>${data.愛宴}</th>
                    <th ${prayer}>${data["會前(後)"]}</th>
                    <th ${newguy}>${data.新人}</th>
                    <th ${prophetic}>${data.禱告}</th>
                </tr>
                `;
            }
        });
    });
});

document.getElementById("checkbox_info").addEventListener('change', function() {
    var paragraphs = document.querySelectorAll('.info_show');
    paragraphs.forEach(function(paragraph) {
        paragraph.classList.toggle('is-hidden');
    });
});

document.getElementById("checkbox_band").addEventListener('change', function() {
    var paragraphs = document.querySelectorAll('.band_show');
    paragraphs.forEach(function(paragraph) {
        paragraph.classList.toggle('is-hidden');
    });
});

document.getElementById("checkbox_not_band").addEventListener('change', function() {
    var paragraphs = document.querySelectorAll('.not_band_show');
    paragraphs.forEach(function(paragraph) {
        paragraph.classList.toggle('is-hidden');
    });
});

document.getElementById("dl_chart").addEventListener('click', function() {
    const table = document.querySelector('.table');
    html2canvas(table).then(canvas => {
        const imageData = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = imageData;
        downloadLink.download = 'table_image.png';
        downloadLink.click();
    });
});