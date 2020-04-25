import js2py

script = '''
hashCode = function(s){
  return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
}
'''

getHash = js2py.eval_js(script)