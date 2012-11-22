// Creditcard.js, a quick library for validating and identifying creditcard numbers
// https://github.com/ChiperSoft/creditcard_js
// 
// Copyright (c) 2012-2013 Jarvis Badgley - http://chipersoft.com/
// Copyright (c) 2008-2012 Thomas Fuchs - http://mir.aculo.us/

var CreditCard = {
  CARDS: {
    Visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    MasterCard: /^5[1-5][0-9]{14}$/,
    DinersClub: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
    Amex: /^3[47][0-9]{13}$/,
    Discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/
  },
  TEST_NUMBERS: ' 378282246310005 371449635398431 378734493671000 '+
    '30569309025904 38520000023237 6011111111111117 '+
    '6011000990139424 5555555555554444 5105105105105100 '+
    '4111111111111111 4012888888881881 4222222222222 ',
  validate: function(number){
    return CreditCard.verifyLuhn10(number)
      && !!CreditCard.type(number)
      && !CreditCard.isTestNumber(number)
  },
  verifyLuhn10: function (number) {return (function(a,b,c,d,e) {
    for(d = +a[b = a.length-1], e=0; b--;)
      c = +a[b], d += ++e % 2 ? 2 * c % 10 + (c > 4) : c;
    return !(d%10)
  })(CreditCard.strip(number))},
  isTestNumber: function(number){
    return CreditCard.TEST_NUMBERS.indexOf(' '+CreditCard.strip(number)+' ') !== -1
  },
  strip: function(number) {
    return String(number).replace(/\s/g,'')
  },
  type: function(number) {
    for(var card in CreditCard.CARDS)
      if(CreditCard['is'+card](number)) return card
  }
}

;(function(){
  for(var card in CreditCard.CARDS)
    CreditCard['is'+card] = (function (card) {
      return function (number) {
        return CreditCard.CARDS[card].test(CreditCard.strip(number))
      }
	})(card);
})()