
const binance = require('node-binance-api')().options({
  APIKEY: "Jjlba2XfArvivRmbWcCQVCRe31zd43sVjvP0tSNyyX3t4PpuFFAHQFhzY9MLYRdV",
  APISECRET: "O6QNe1eDUCHGiLLe9kyAttcA74uk8ukowAfqT7GOSLdoezYMusO71mL6ge8v2Fxe",
  useServerTime: true // If you get timestamp errors, synchronize to server time at startup
});
var btc = 0;
const ccxt = require('ccxt')
var client = new ccxt.binance(
            {"apiKey": "Jjlba2XfArvivRmbWcCQVCRe31zd43sVjvP0tSNyyX3t4PpuFFAHQFhzY9MLYRdV",
            "secret": "O6QNe1eDUCHGiLLe9kyAttcA74uk8ukowAfqT7GOSLdoezYMusO71mL6ge8v2Fxe",
            "options":{"defaultMarket":"futures"},
            'urls': {'api': {
                                     'public': 'https://fapi.binance.com/fapi/v1',
                                     'private': 'https://fapi.binance.com/fapi/v1',},}
 })

var client2 = new ccxt.binance(
            {"apiKey": "cQxZeaewqZuXcj4rZ2dk6RSKAZY6yc15sruRZuWpQd8Z0L39cPaFBUyynay1f8AR",
            "secret": "flDJ0q1s7xErrxH3Fcg967VEZiInHpJ1kSZ64Ei0bFCv1JBM6pHeqtZ42do0Lr6i",
            "options":{"defaultMarket":"futures"},
            'urls': {'api': {
                                     'public': 'https://fapi.binance.com/fapi/v1',
                                     'private': 'https://fapi.binance.com/fapi/v1',},}
 })
var btcstart = 0
var bals = []
var btcs = []
var ids = []
var vol = 0
var first = true;
var position = 0;
setInterval(async function(){
account         = await client.fetchBalance()
account2         = await client2.fetchBalance()
//console.log(account)
trades = await client.fapiPrivateGetUserTrades({'symbol':'BTCUSDT', 'limit': 1000})
for (var t in trades){
  if (!ids.includes(trades[t].id)){
    ids.push(trades[t].id)
vol+=parseFloat(trades[t].qty)

  }

}
pos = await client.fapiPrivateGetPositionRisk()
pos2 = await client2.fapiPrivateGetPositionRisk()
position = 0
if (pos[0] != undefined){
position += parseFloat(pos[0]['positionAmt'])
}
if (pos2[0] != undefined){
  position += parseFloat(pos2[0]['positionAmt'])
}
btc = 0;

btc += parseFloat(account[ 'info' ] [ 'totalMarginBalance' ])
btc += parseFloat(account2[ 'info' ] [ 'totalMarginBalance' ])
if (first)
{
btcstart = btc//62.91424200639

first = false;
}
console.log(account)
console.log(account.info.assets)
console.log(btcstart)
console.log(btc)
if (btc != 0){
btcs.push( [new Date().getTime(), -1 * (1-(btc / btcstart)) * 100])
bals.push([new Date().getTime(), btc])
}

}, 3000)

const express = require('express');
var cors = require('cors');
var app = express();
app.use(cors());
var request = require("request")
var bodyParser = require('body-parser')
app.set('view engine', 'ejs');
app.listen(process.env.PORT || 8084, function() {});
app.get('/update', cors(), (req, res) => {

    res.json({bal: bals, btc: btcs, qty: vol, pos: position})

})

app.get('/', (req, res) => {
        res.render('index.ejs', {
            btc: btc
        })

});
