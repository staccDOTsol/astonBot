const ccxt = require('ccxt')
const RSI = require('technicalindicators').StochasticRSI;
var short = new ccxt.binance({
    "apiKey": "Jjlba2XfArvivRmbWcCQVCRe31zd43sVjvP0tSNyyX3t4PpuFFAHQFhzY9MLYRdV",
    "secret": "O6QNe1eDUCHGiLLe9kyAttcA74uk8ukowAfqT7GOSLdoezYMusO71mL6ge8v2Fxe",
    "options": {
        "defaultMarket": "futures"
    },
    'urls': {
        'api': {
            'public': 'https://fapi.binance.com/fapi/v1',
            'private': 'https://fapi.binance.com/fapi/v1',
        },
    }
})var clientshort = new ccxt.binance({
    "apiKey": "Jjlba2XfArvivRmbWcCQVCRe31zd43sVjvP0tSNyyX3t4PpuFFAHQFhzY9MLYRdV",
    "secret": "O6QNe1eDUCHGiLLe9kyAttcA74uk8ukowAfqT7GOSLdoezYMusO71mL6ge8v2Fxe",
    "options": {
        "defaultMarket": "futures"
    },
    'urls': {
        'api': {
            'public': 'https://fapi.binance.com/fapi/v1',
            'private': 'https://fapi.binance.com/fapi/v1',
        },
    }
})
var client = new ccxt.binance(
            {"apiKey": "Jjlba2XfArvivRmbWcCQVCRe31zd43sVjvP0tSNyyX3t4PpuFFAHQFhzY9MLYRdV",
            "secret": "O6QNe1eDUCHGiLLe9kyAttcA74uk8ukowAfqT7GOSLdoezYMusO71mL6ge8v2Fxe",
            "options":{"defaultMarket":"futures"},
            'urls': {'api': {
                                     'public': 'https://fapi.binance.com/fapi/v1',
                                     'private': 'https://fapi.binance.com/fapi/v1',},}
 })
 var client2 = new ccxt.binance(
            {"apiKey": "Jjlba2XfArvivRmbWcCQVCRe31zd43sVjvP0tSNyyX3t4PpuFFAHQFhzY9MLYRdV",
            "secret": "O6QNe1eDUCHGiLLe9kyAttcA74uk8ukowAfqT7GOSLdoezYMusO71mL6ge8v2Fxe",
            "options":{"defaultMarket":"futures"},
            'urls': {'api': {
                                     'public': 'https://fapi.binance.com/fapi/v1',
                                     'private': 'https://fapi.binance.com/fapi/v1',},}
 })
const binance = require('node-binance-api')().options({
  APIKEY: 'Jjlba2XfArvivRmbWcCQVCRe31zd43sVjvP0tSNyyX3t4PpuFFAHQFhzY9MLYRdV',
  APISECRET: 'O6QNe1eDUCHGiLLe9kyAttcA74uk8ukowAfqT7GOSLdoezYMusO71mL6ge8v2Fxe',
  useServerTime: true // If you get timestamp errors, synchronize to server time at startup
});
const SMA = require('technicalindicators').SMA;
var tradesArr = []
var values = []
var enternewtps = false
var position = 0;
var takeprofits = []
var LB;
var HA;
var free_btc;
var bal_btc;
var freePerc;
var bal_usd;
var initial_bal = 0;
var usd_init = 0;
var count = 0;
var first = true;
var theSMA;
var last;
var timer = 0;
var buying = true;
var buying2 = true;
var buying3 = true;
var selling = true;
var selling2 = true;
var selling3 = true;
var entryPrice = 0;
var orderb = [];
var orders = [];
var sl = [];
var sls = [];
var postype = 'none';
var leverage = 25;


async function report(){
	console.log(' ')
console.log('-----')
console.log(new Date())
console.log('position: ' + position)
console.log('usedPerc: ' + freePerc)
console.log('bal btc: ' + bal_btc)
console.log('pnl btc: % ' + -1 * (1-bal_btc/initial_bal) * 100)
console.log('bal usd: ' + bal_usd)
console.log('pnl usd: % ' + -1 * (1-bal_usd/usd_init) * 100)
if (tps[0] != undefined){
console.log('tp: ' + tps[0])
}
console.log('sl1: ' + sl[0])
console.log('sl2: ' + sls[0])
console.log('RSI: ' + theRSI[theRSI.length-1].k)
console.log('SMA: ' + theSMA[theSMA.length-2])
console.log('safety 1: ' + orderb[0] * 0.98)
console.log('safety 2: ' + orderb[0] * 0.96)

}
var theRSI;
setTimeout(function(){
	//report();
}, 10000);
setInterval(function(){
//	report()
}, 60 * 5 * 1000);
var tps = []
var thetp = 0;
async function cancelall(){
	ords        = await client.fetchOpenOrders( 'BTC/USDT' )

        for (var order in ords){
        	if (true){
            oid = ords[order] ['id']
            side = ords[order]['side']
            //if (buysell == 1 && side == 'buy'){
            //	console.log('cancelleing2...')
            try{
                await client.cancelOrder( oid , 'BTC/USDT' )
            }
            catch (e){
                console.log(e)
            
            }
        //}
       /* else if (buysell = 0 && side == 'sell'){
        	try{
                await client.cancelOrder( oid , 'BTC/USDT' )
            }
            catch (e){
                console.log(e)
            
            }
        }*/
        }
    }
    }
    var llast = 0
async function doit(){

	//console.log(await client.createOrder(  'BTC/USDT', "Limit", 'buy', 0.001, 6300))
	if (first){
		cancelall()
	
	/*var trades = await client.fapiPrivateGetUserTrades({'symbol':'BTCUSDT', 'limit': 100})
		for (var t in trades){
		tradesArr.push(trades[t].id)
}*/
}
ohlcv = await client.fetchOHLCV ('BTC/USDT', timeframe = '1m', since = undefined, limit = 300, params = {})
		//console.log(ohlcv)
				for (var candle in ohlcv){
					values.push(ohlcv[candle][4])
					if (values.length > 200){
						values= []
					}
	}
	test = RSI.calculate({ rsiPeriod : 20, stochasticPeriod: 20, kPeriod: 7, dPeriod: 10,values : values})
	if (test[test.length-1] != undefined){
	theRSI = RSI.calculate({ rsiPeriod : 20, stochasticPeriod: 20, kPeriod: 7, dPeriod: 10,values : values});
//console.log(theRSI[theRSI.length-1].k)
}
		theSMA = SMA.calculate({period : 5, values : values})   
		
	
pos = await client.fapiPrivateGetPositionRisk()
if (pos[0] != undefined){
	entryPrice=parseFloat(pos[0]['entryPrice'])

position = parseFloat(pos[0]['positionAmt'])
leverage = parseFloat(pos[0]['leverage'])

	
if ( position == 0){
	sls= []
	thetp = 0
	sl= []
	tps= []
	orderb = []
	buying = true;
	buying2 = true;
	buying3 = true;
} 
	if (enternewtps){
		enternewtps = false;
		console.log('new tps...')
		takeprofits = []
		thetp = entryPrice * (1 + 0.0025)

		await client.createOrder(  'BTC/USDT', "Limit", 'sell', position / 2, entryPrice * (1 + 0.0025))
		takeprofits.push(await client.createOrder(  'BTC/USDT', "Limit", 'sell', position / 2, entryPrice * (1 + 0.006)))
				await client.createOrder(  'BTC/USDT', "Limit", 'buy', position / 2, entryPrice * (1 + 0.0025))
		takeprofits.push(await client.createOrder(  'BTC/USDT', "Limit", 'sell', position / 2, entryPrice * (1 + 0.006))
		}

}
if (first){
	
	if (position < 0){
	await client.createOrder(  'BTC/USDT', "Market", 'buy', position * -1)
			}
			else if (position > 0){
	await client.createOrder(  'BTC/USDT', "Market", 'sell', position )

			}
}
//console.log(position)
account         = await client.fetchBalance()
ticker = await client.fetchTicker( 'BTC/USDT' )
LB           = ticker.last + 0.5
//console.log(await client.fetchTicker( 'BTC/USDT' ))
HA= ticker.last - 0.5
free_btc = parseFloat(account[ 'info' ] [ 'totalInitialMargin' ]) / HA

bal_btc         = parseFloat(account[ 'info' ] [ 'totalMarginBalance' ]) / HA
freePerc = (free_btc / bal_btc)
bal_usd = parseFloat(account[ 'info' ] [ 'totalMarginBalance' ])
llast = last
last = ticker.last
if (sl.length == 0 && last >= 1.0015 * entryPrice && entryPrice != 0){
	timer++;
}else {
	timer = 0
}
if (timer == 12){
dotime = false;
//sl.push(entryPrice * (1-(0.001)))
}
if (last <= theSMA[theSMA.length-2] * (1-(0.0015)) && buying && theRSI[theRSI.length-1].k < 20){
	buying = false;

	if (postype == 'selling'){
		
	
setTimeout(function(){
	postype = 'none'
}, 5 * 60 * 1000);
	}
	if (postype == 'none'){
		amt = leverage * bal_btc * 0.1
	sl= []
	sls= []
sls.push(last * (1-(0.02)))
orderb.push(last)
thetp = last * (1 + 0.0025)
		console.log(new Date() + ' market buy/sell! Price: ' + last + ' & prev SMA: ' + theSMA[theSMA.length-2])
	await client.createOrder(  'BTC/USDT', "Limit", 'buy', amt, last + 100)
	shorts.push(await client.createOrder(  'BTC/USDT', "Limit", 'sell', amt, last - 100)
	
	takeprofits = []
		await client.createOrder(  'BTC/USDT', "Limit", 'sell', amt / 2, last * (1 + 0.0025))
		takeprofits.push(await client.createOrder(  'BTC/USDT', "Limit", 'sell', amt / 2, last * (1 + 0.006)))
	
	orders= []
	selling2 = true;
	selling3 = true;
	selling = true;
	}
}

for (var t in tps){
	/*
if (tps[t] != 0 && llast <= last){
	tps[t] = tps[t] * (last/llast)
}
else if (tps[t] != 0 && llast > last){

} */
if (tps[t] != 0 && tps[t] > last){
		amt = position
		if (amt < 0){
			amt = amt * -1
		}
		cancelall()
	console.log(new Date() + ' stop loss x3 on buy! Price: ' + last + ' & prev SMA: ' + theSMA[theSMA.length-2])
	buying = true;
	tps= []
	thetp = 0
	buying2 = true;
	orderb = []
	buying3 = true;
	sl= [];
	sls= []
		await client.createOrder(  'BTC/USDT', "Limit", 'sell', position, last - 100)
}
}
for (var s in sl){
if (sl[s] != 0 && sl[s] > last){
		amt = position
		if (amt < 0){
			amt = amt * -1
		}
		cancelall()
	console.log(new Date() + ' stop loss on buy! Price: ' + last + ' & prev SMA: ' + theSMA[theSMA.length-2])
	buying = true;
	tps= []
	thetp = 0
	buying2 = true;
	orderb = []
	buying3 = true;
	sl= [];
	sls= []
		await client.createOrder(  'BTC/USDT', "Limit", 'sell', position, last - 100)
}
}for (var s in sls){
if (sls[s] != 0 && sls[s] > last){
		amt = position
		if (amt < 0){
			amt = amt * -1
		}
		cancelall()
	console.log(new Date() + ' stop loss on buy! Price: ' + last + ' & prev SMA: ' + theSMA[theSMA.length-2])
	buying = true;
	tps= []
	thetp = 0
	orderb = []
	buying2 = true;
	buying3 = true;
	sls= [];
	sl= []
		await client.createOrder(  'BTC/USDT', "Limit", 'sell', position, last - 100)
}
}
for (var o in orderb){
	if (orderb[o] != 0  && thetp != 0 && thetp < last && !buying){
		if (tps.length==0){
	tps.push(entryPrice * (1+(0.001)))

}
}
}


for (var o in orderb){
if (orderb[o] != 0 && orderb[o] * (1-(0.005)) > last && buying2 && !buying){
	buying2 = false;
	tps= []
		amt = leverage * bal_btc * 0.2
		cancelall()

		enternewtps = true;
	console.log(new Date() + ' safety buy x1! Price: ' + last + ' & prev SMA: ' + theSMA[theSMA.length-2])
		await client.createOrder(  'BTC/USDT', "Limit", 'buy', amt, last + 100)


}
if (orderb[o] != 0 && orderb[o] * (1-(0.015)) > last && buying3 && !buying){
	buying3 = false;
		amt = leverage * bal_btc * 0.4
	tps= []
	cancelall()
	enternewtps = true
	console.log(new Date() + ' safety buy x2! Price: ' + last + ' & prev SMA: ' + theSMA[theSMA.length-2])
		await client.createOrder(  'BTC/USDT', "Limit", 'buy', amt, last + 100)
}
}
if (first){
	//await client.loadProducts () 
	first = false;
	usd_init = bal_usd//50;
	initial_bal = bal_btc;
}
if (count >= 4 * 6 * 1){
	count = 0;
	/*
console.log(' ')
console.log('-----')
console.log(new Date())
console.log('position: ' + position)
console.log('usedPerc: ' + freePerc)
console.log('bal btc: ' + bal_btc)
console.log('pnl btc: % ' + -1 * (1-bal_btc/initial_bal) * 100)
console.log('bal usd: ' + bal_usd)
console.log('pnl usd: % ' + -1 * (1-bal_usd/usd_init) * 100)
/*
pnlusd = -1 * (1-bal_usd/usd_init) * 100
if (pnlusd > ((min_withdrawal_perecent * 100) * 2)){
	var new_usd_init = bal_usd * (1-(min_withdrawal_perecent) );
binance.mgTransferMarginToMain('USDT', (min_withdrawal_perecent) *bal_usd, (error, response) => {
    if (error) {
      console.log(error)
    } else {
		
      usd_init = new_usd_init
	initial_bal = usd_init / LB;
    }
});
} 
console.log('RSI: ' + theRSI[theRSI.length-1])
console.log('MFI: ' + theMFI[theMFI.length-1])
console.log('diff: ' + diff)
cancelall()
*/
}
count++;
}
setInterval(function(){
	doit()
}, 10 * 1000)
doit()