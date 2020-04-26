console.log('CONTENT GO!!!!')

hashCode = function(s){
  return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
}

url = chrome.runtime.getURL('hash_id.json');

function readTextFile(file,callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

show_wrapper = function(){
  readTextFile(url, function(text){
      var hash = JSON.parse(text);
      show_answers(hash);
  });
}

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {
  if (message.txt == 'show') {
    show_wrapper()
  }
}

function show_answers(hash_id_dict) {
  alert('keksik');
  probview = document.getElementsByClassName('prob_view');



  for (i = 0; i < probview.length; i++) {
    console.log(i);
    //task_id = probview[i].getElementsByTagName('a')[0].innerText;

    task = probview[i];
    task_contents = task.firstChild.firstChild.firstChild.nextSibling.children;

    text_for_hash = ''
    for (k = 0; k < task_contents.length; k++){
        task_content = task_contents[k]
        images = task_content.getElementsByTagName('img');
        task_img_srcs = '';
        for (j = 0; j < images.length; j++) {
            task_img_srcs = task_img_srcs + images[j].src;
        }
        task_text = task_content.textContent;
        text_merged = task_img_srcs + task_text;
        text_merged = text_merged.split(' ').join('').split('&nbsp;').join('');
        text_for_hash = text_for_hash + text_merged;
    }
    text_for_hash = text_for_hash.split('').sort().join('');
    code = hashCode(text_for_hash);

    task_title = probview[i].firstChild.firstChild.firstChild;
    task_id = hash_id_dict[code];
    link_pattern = '<a style="color:red" href = "/problem?id=' + task_id + '">' + task_id + '</a>';
    task_title.innerHTML = task_title.innerHTML + link_pattern;

  }
}
