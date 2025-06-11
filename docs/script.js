function toggleDarkmode() {
    if (document.getElementById('darkmode').checked) {
      document.body.classList.add('dark');
      //document.getElementById('result').classList.add("darktextboxes");
      for(let d of [...document.querySelectorAll(".lightbuttonboxes")]) {
        //let d = document.getElementById(n);
        if(d) {
          d.classList.remove("lightbuttonboxes");
          d.classList.add("darkbuttonboxes");
        }
      }
      for(let d of [...document.querySelectorAll(".lighttext")]) {
        //let d = document.getElementById(n);
        if(d) {
          d.classList.remove("lighttext");
          d.classList.add("darktext");
        }
      }
      for(let d of [...document.querySelectorAll(".lightcontrast")]) {
        //let d = document.getElementById(n);
        if(d) {
          d.classList.remove("lightcontrast");
          d.classList.add("darkcontrast");
        }
      }
      let success = document.getElementById('success_message');
      if(success) {
        success.classList.remove("successlight");
        success.classList.add("successdark");
      }
    } else {
      document.body.classList.remove('dark');
      //document.getElementById('result').classList.remove("darktextboxes");
      //Buttons
      for(let d of [...document.querySelectorAll(".darkbuttonboxes")]) {
        //let d = document.getElementById(n);
        if(d) {
          d.classList.remove("darkbuttonboxes");
          d.classList.add("lightbuttonboxes");
        }
      }
      for(let d of [...document.querySelectorAll(".darktext")]) {
        //let d = document.getElementById(n);
        if(d) {
          d.classList.remove("darktext");
          d.classList.add("lighttext");
        }
      }
      for(let d of [...document.querySelectorAll(".darkcontrast")]) {
        //let d = document.getElementById(n);
        if(d) {
          d.classList.remove("darkcontrast");
          d.classList.add("lightcontrast");
        }
      }
      let success = document.getElementById('success_message');
      if(success) {
        success.classList.remove("successdark");
        success.classList.add("successlight");
      }
    }
    //console.log("Dark mode is now: "+(document.getElementById('darkmode').checked))
}
toggleDarkmode();
let unlockFeaturesUniqueID = aRandomUUID();
function unlockFeatures() {
    let newTab = window.open(`./supportus.html`,"_blank")
    let data = {}
    data.uniqueId = unlockFeaturesUniqueID;
    setTimeout(()=>newTab.postMessage(data, '*'),500);
}
function aRandomUUID() {
  if (typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  } else {
    // Fallback manual
    const bytes = crypto.getRandomValues(new Uint8Array(16));
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    const hex = Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
    return [
      hex.substring(0, 8),
      hex.substring(8, 12),
      hex.substring(12, 16),
      hex.substring(16, 20),
      hex.substring(20)
    ].join('-');
  }
};
document.addEventListener("DOMContentLoaded", () => {
  loadCounter();
  checkSite(window);
  setTimeout(()=>{
    loadChecking();
    setInterval(()=>{
      loadChecking();
    },10000)
  },2500)
});
function loadChecking() {
 let href = window.location.href;
 if(!href.includes(atob("YWxvbnNvYWxpYWdhLmdpdGh1Yi5pbw=="))) return;
 let link = atob("aHR0cHM6Ly9hbG9uc29hcGkuZGlzY2xvdWQuYXBwL2NoZWNraW5nP3NpdGU9PHNpdGU+JmtleT08a2V5Pg==")
  .replace(/<site>/g,"block-shapes").replace(/<key>/g,"KEY-A");
 let counter = document.getElementById("online-counter");
 if(counter) {
   $.ajax({
     url: link,
     type: "GET", /* or type:"GET" or type:"PUT" */
     dataType: "json",
     data: {
     },
     success: function (result) {
        //console.log(`Total fails: ${counter.dataset.failed}`)
        counter.dataset.failed = "0";
        counter.style.display = "flex";
        if(isNaN(result)) {
         counter.textContent = `🟡 You shouldn't be reading this. Report it on https://alonsoaliaga.com/discord`;
         counter.style.backgroundColor = "yellow";
        }else{
         //counter.textContent = `🟢 ${result} user${result==1?``:`s`} online using our Minecraft Profile Picture Generator!`;
         counter.textContent = `🟢 ${result} online using our Block Shapes Generator for building!`;
         counter.style.backgroundColor = "green";
        }
     },
     error: function (e) {
      //console.log(`Total fails: ${counter.dataset.failed}`)
      if(counter.style.display != "none") {
        let currentFails = +counter.dataset.failed;
        if(currentFails >= 1){
          counter.style.display = "none"
        }else{
          counter.textContent = `🔴 Check your internet connection!`;
          counter.style.backgroundColor = "#7c0000";
          counter.dataset.failed = `${currentFails + 1}`
        }
      }
     }
   });
 }
}
let times = 0;
function loadCounter() {
 let href = window.location.href;
 if(!href.includes(atob("YWxvbnNvYWxpYWdhLmdpdGh1Yi5pbw=="))) return;
 let link = atob("aHR0cHM6Ly9hbG9uc29hcGkuZGlzY2xvdWQuYXBwL2NvdW50ZXI/c2l0ZT08c2l0ZT4ma2V5PTxrZXk+")
  .replace(/<site>/g,"block-shapes").replace(/<key>/g,"KEY-A");
 let counter = document.getElementById("visitor-counter");
 //console.log(link)
 if(counter) {
   $.ajax({
     url: link,
     type: "GET", /* or type:"GET" or type:"PUT" */
     dataType: "json",
     data: {
     },
     success: function (result) {
       if(isNaN(result))
         document.getElementById("counter-amount").innerHTML = "Click to return!";
       else document.getElementById("counter-amount").innerHTML = `Visits: ${result}`;
     },
     error: function (e) {
       times++;
       document.getElementById("counter-amount").innerHTML = "Click to return!";
       if(times <= 1) {
        setTimeout(()=>{
          loadCounter();
        },1000*10);
       }
     }
   });
 }
}
function checkSite(window) {
  let search = window.location.search;
  /*
  if(typeof search !== "undefined" && search.length > 0) {
    let parts = atob(search.slice(1)).split("&");
    for(let part of parts) {
      let [k,v] = part.split("=");
      k = btoa(k);
      if(k == "dXNlcm5hbWU=") {
        if(v.match(/[a-z0-9_]/gi)) {
          setTimeout(()=>{
            usernameInput.value = v;
            processUsername();
          },500);
        }
      }
    }
  }
  */
  setTimeout(()=>{
    let href = window.location.href;
    if(!href.includes(atob("YWxvbnNvYWxpYWdhLmdpdGh1Yi5pbw=="))) {
      try{document.title = `Page stolen from https://${atob("YWxvbnNvYWxpYWdhLmdpdGh1Yi5pbw==")}`;}catch(e){}
      window.location = `https://${atob("YWxvbnNvYWxpYWdhLmdpdGh1Yi5pbw==")}/block-shapes/`}
  });
  loadTools();
  function loadTools() {
    /*
    fetch('https://api.github.com/repos/AlonsoAliaga/AlonsoAliagaAPI/contents/api/tools/tools-list.json?ref=main')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Parse the JSON response from GitHub API
    }).then(data => {
        const base64Content = data.content;
        const binaryString = atob(base64Content);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        const decodedString = new TextDecoder('utf-8').decode(bytes);
        const toolsData = JSON.parse(decodedString);
        let toolsArray = []
        for(let toolData of toolsData) {
            let clazz = typeof toolData.clazz == "undefined" ? "" : ` class="${toolData.clazz}"`;
            let style = typeof toolData.style == "undefined" ? "" : ` style="${toolData.style}"`;
            toolsArray.push(`<span>💠</span> <span${clazz}${style}><a id="tool-priority-${toolData.priority}" href="${toolData.link}">${toolData.name}</a></span>`);
        }
        document.getElementById("tools-for-you").innerHTML = toolsArray.join(`<br>`);
    }).catch(error => {
        console.error("Error fetching or decoding GitHub API content:", error);
    });
    */
    fetch('https://raw.githubusercontent.com/AlonsoAliaga/AlonsoAliagaAPI/refs/heads/main/api/tools/tools-list.json')
        .then(res => res.json())
        .then(content => {
          let toolsData = content;
          let toolsArray = []
          for(let toolData of toolsData) {
            let clazz = typeof toolData.clazz == "undefined" ? "" : ` class="${toolData.clazz}"`;
            let style = typeof toolData.style == "undefined" ? "" : ` style="${toolData.style}"`;
            toolsArray.push(`<span>💠</span> <span${clazz}${style}><a title="${toolData.description}" id="tool-priority-${toolData.priority}" href="${toolData.link}">${toolData.name}</a></span>`);
          }
          document.getElementById("tools-for-you").innerHTML = toolsArray.join(`<br>`);
        });
  }
}