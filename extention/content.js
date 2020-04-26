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
  probview = document.getElementsByClassName('prob_view');



  for (i = 0; i < probview.length; i++) {
    //task_id = probview[i].getElementsByTagName('a')[0].innerText;

    data = probview[i].firstChild.firstChild.firstChild.nextElementSibling;

    data_inner = data.innerHTML;
    data_inner = data_inner.split(RegExp(' width=".*?"')).join('');
    data_inner = data_inner.split(RegExp(' height=".*?"')).join('');
    data_inner = data_inner.split(RegExp(' style=".*?"')).join('');
    data_inner = data_inner.split(RegExp(' class=".*?"')).join('');
    data_inner = data_inner.split(RegExp(' align=".*?"')).join('');

    hash = hashCode(data_inner);

    task_title = probview[i].firstChild.firstChild.firstChild;
    task_id = hash_id_dict[hash];
    link_pattern = '<a style="color:red" href = "/problem?id=' + task_id + '">' + task_id + '</a>';
    task_title.innerHTML = task_title.innerHTML + link_pattern;

  }
}
