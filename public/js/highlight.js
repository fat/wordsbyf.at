!function (exports) {

var nodes = document.querySelectorAll('pre code')
  , keywords = ( 'var function if else for while break switch case do new null in with void '
               + 'continue delete return this true false throw catch typeof with instanceof').split(' ')
  , special  = ( 'eval window document undefined NaN Infinity parseInt parseFloat '
               + 'encodeURI decodeURI encodeURIComponent decodeURIComponent').split(' ')
  , syntax = [
      ['regexp' , /(\/.+\/[mgi]*)(?!\s*\w)/g],
      ['string' , /("(?:(?!\")[^\\\n]|\\.)*"|\'(?:(?!\')[^\\\n]|\\.)*')/g],
      ['comment', /(\/\*(?:[^*\n]|\*+[^\/\*])*\*+\/)/g],
      ['comment', /(\/\/[^\n]*)/g],
      ['number' , /\b([0-9]+(?:\.[0-9]+)?)\b/g],
      ['keyword', new RegExp('\\b(' + keywords.join('|') + ')\\b', 'g')],
      ['special', new RegExp('\\b(' + special.join('|') + ')\\b', 'g')]
    ]
  , table = {}
  , i, j, text

for (i = nodes.length; i--;) {
 nodes[i].innerHTML = escape(nodes[i].textContent || nodes[i].innerText)
  syntax.forEach(function (s) {
      var k = s[0]
        , v = s[1]
      nodes[i].innerHTML = nodes[i].innerHTML.replace(v, function (_, m) {
          return '<i class="'+ k + '">' + m + '</i>'
      })
  })
}

function escape(str) {
    return str.replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

}(window)