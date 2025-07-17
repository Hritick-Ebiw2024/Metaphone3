var fs = require('fs');
eval(fs.readFileSync('Metaphone3.js')+'');

var m3 = new Metaphone3();
console.log(m3.SetWord("what?"));
m3.StringAt(0, 7, "BLESSED", "LEARNED", "");
m3.SetWord("coelacanth");
console.log(m3.StringAt(0, 7, "BLESSED", "LEARNED", ""))
console.log(m3.StringAt(5, 3, "CAN", "DOS", ""))
m3.Encode()
console.log(m3.GetMetaph()); 

var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('large_word_list_output_3_21_15_DEFAULT_ENCODING.txt')
});

//m3.SetEncodeExact(true);
//m3.SetEncodeVowels(true);
lineReader.on('line', function (line) {
  token = line.split(" ");
  m3.SetWord(token[0]);
  m3.Encode()
  metaph = m3.GetMetaph()
  altMetaph = m3.GetAlternateMetaph();
  
  if (token.length > 2)
  {
    altToken = token[2].substring(1, token[2].length - 1);
    if (altMetaph != altToken)
    {
        console.log(token[0], " => ", altToken, " : ", altMetaph)
    }
  }
  
  if (metaph != token[1])
  {
    console.log(token[0], " : ", token[1], " : ", metaph)
  }
}); 
