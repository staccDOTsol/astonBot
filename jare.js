const ccxt = require('ccxt')
const RSI = require('technicalindicators').StochasticRSI;
var a = 0;
var rsibelow;
var rsiabove;
var liqs = 0
var liqss = 0
var price = 0;
var liqPrice = 0;
var liqPrices = 0;
var highRSI = 80
var lowRSI = 20
var rsis = []
var position = 0;
var account;
var LB = 0;
var HA = 0;
var first = true;
var free_btc;
var bal_btc;
var freePerc;
var initial_bal;
var usd_init;
var sltps = []
setInterval(async function(){
			//console.log(trades)
	//console.log(tradesArr)
	for (var t in sls){
		if (sls[t].price >= price && sls[t].direction == 'sell'){
sltps.push(await client.createOrder(  'BTC/USDT', "Limit", 'sell', sls[t].amt, sls[t].price + 100))

sls.splice(t, 1)
		}if (sls[t].price <= price && sls[t].direction == 'buy'){
sltps.push(await client.createOrder(  'BTC/USDT', "Limit", 'buy', sls[t].amt, sls[t].price - 100))

sls.splice(t, 1)
		}
		

	}var trades = await client.fapiPrivateGetUserTrades({'symbol':'BTCUSDT', 'limit': 1000})
		
		
	for(var t in trades){
		var go = true;
		var gogo = false;
		for (var s in sltps){
			if (parseFloat(sltps[s].id) == parseFloat(trades[t].orderId)){
				go = false;
			}
		}
					for (var s in fBuys){
						//console.log(fBuys[s].id)
					if (parseFloat(trades[t].orderId) == parseFloat(fBuys[s].id)){
						gogo = true;
						buyo = false;
					}
				}
				for (var s in fSells){
					///console.log(fSells[s].id)
					if (parseFloat(trades[t].orderId )== parseFloat(fSells[s].id)){
						gogo = true;
						sello = false;
					}
				}
			if (!tradesArr.includes(trades[t].id) && go && gogo){
				tradesArr.push(trades[t].id)
		
	console.log(' ')
				console.log('enter tp!')
				console.log(' ')
				if (trades[t].side == 'SELL'){

					sls.push({'direction': 'buy','i': 'BTC/USDT',
  'amt': parseFloat(trades[t].qty) * 7,
 'price': parseFloat(trades[t].price)* 1.0055})


				}
				else {
sls.push({'direction': 'sell','i': 'BTC/USDT',
  'amt': parseFloat(trades[t].qty) * 7,
 'price': parseFloat(trades[t].price)* (1-0.0055)})

}
			}
		}
	pos = await client.fapiPrivateGetPositionRisk()
if (pos[0] != undefined){
position = parseFloat(pos[0]['positionAmt'])
}
//console.log(position)
account         = await client.fetchBalance()

free_btc = parseFloat(account[ 'info' ] [ 'totalInitialMargin' ]) / HA

bal_btc         = parseFloat(account[ 'info' ] [ 'totalMarginBalance' ]) / HA
freePerc = (free_btc / bal_btc)
bal_usd = parseFloat(account[ 'info' ] [ 'totalMarginBalance' ])  
if (first){
	if (position < 0){
	await client.createOrder(  'BTC/USDT', "Market", 'buy', position * -1)
			}
			else if (position > 0){
	await client.createOrder(  'BTC/USDT', "Market", 'sell', position )

			}
	var trades = await client.fapiPrivateGetUserTrades({'symbol':'BTCUSDT', 'limit': 1000})
		for (var t in trades){
		tradesArr.push(trades[t].id)
}
	//await client.loadProducts () 
	first = false;
	usd_init = bal_usd;
	initial_bal = bal_btc;
}
}, 2500)
var client = new ccxt.binance(
            {"apiKey": "yUJluobNfQ5H1nQ9Cp3czdmHL27Wz8I61E1b7tsR2hMYApLCbPbeezvtQWj2D2NL",
            "secret": "v0BwW14iRs91eppXZYsrqUxYdYTxpWotJNPgpkcph6N3q9mmMOi23BlQrBwSBKZ4",
            "options":{"defaultMarket":"futures"},
            'urls': {'api': {
                                     'public': 'https://fapi.binance.com/fapi/v1',
                                     'private': 'https://fapi.binance.com/fapi/v1',},}
 })
var theRSI = []
runOnce()
async function cancelall(){
	ords        = await client.fetchOpenOrders( 'BTC/USDT' )

        for (var order in ords){
        	if (true){
            oid = ords[order] ['info'] ['orderId']
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
async function runOnce(){
ohlcv = await client.fetchOHLCV ('BTC/USDT', timeframe = '1m', since = undefined, limit = 74, params = {})
//console.log(ohlcv)
for (var candle in ohlcv){
for (var b = 0; b <= 60; b++){
	if (rsis[b] == undefined){
		rsis[b] = []
	}
	rsis[b].push(ohlcv[candle][4])
if (rsis[b].length > 60){
	rsis[b].shift()
}
}

theRSI.push(RSI.calculate({rsiPeriod : 14, stochasticPeriod: 14, dPeriod: 3, kPeriod: 3,values : rsis[0]}));

prices.push(ohlcv[candle][3])
if (prices.length > 60){
	prices.shift()
}
}
//console.log(prices.length)
//console.log(theRSI[theRSI.length-1][theRSI[theRSI.length-1].length-1])
//console.log(theRSI[theRSI.length-1][theRSI[theRSI.length-1].length-1].k)
}
setInterval(async function(){
	if (rsis[a] == undefined){
		rsis[a] = []
	}
ohlcv = await client.fetchOHLCV ('BTC/USDT', timeframe = '1m', since = undefined, limit = 60, params = {})
//console.log(ohlcv)
rsis[0] = []

for (var candle in ohlcv){
	if (rsis[0] == undefined){
		rsis[0] = []
	}
	rsis[0].push(ohlcv[candle][4])
if (rsis[0].length > 60){
	rsis[0].shift()
}

}

theRSI.push(RSI.calculate({rsiPeriod : 14, stochasticPeriod: 14, dPeriod: 3, kPeriod: 3,values : rsis[0]}));
a++
if (a == 60){
	a = 0;
}
//console.log(theRSI[0])
}, 15000);
var buyo = false;
var sello = false;
const WebSocket = require('ws');
var sells = 0;
var buys = 0;
const ws = new WebSocket('wss://fstream.binance.com/ws/btcusdt@kline_1m');
var prevt = 0;
var prices = []
var lowest = 9999999999999999999999999
var buying = true;
var selling2 = true;
var selling3 = true;
var selling = true;
var buying2 = true;
var buying3 = true;
var orderp = 0;
var orderps = 0;
var tp = 0;
var lowPrice;
var lowPrices = []
setInterval(function(){

console.log(' ')

console.log('-------')
console.log(new Date())
console.log('latest RSI: ' + theRSI[theRSI.length-1][theRSI[theRSI.length-1].length-1].k)
console.log('price: ' + price)
console.log('orderp: ' + orderp)
console.log('orderps: ' + orderps)
console.log('bal btc: ' + bal_btc)
console.log('pnl btc: % ' + -1 * (1-bal_btc/initial_bal) * 100)
console.log('bal usd: ' + bal_usd)
console.log('pnl usd: % ' + -1 * (1-bal_usd/usd_init) * 100)

}, 60 *  1 * 1000)
var tps = 0;
var sinceBuy = 0;
var sinceSell = 0;
var fSells = []
var fBuys = []
var buySig;
var sls = []
var sellSig;
var tradesArr = []
 
ws.on('message', async function incoming(data) {
    t = JSON.parse(data)['k']['t']
    lowPrice = JSON.parse(data)['k']['l']
    price = (JSON.parse(data)['k']['c']);
    LB           = price + 0.5
	HA= price - 0.5
    if (prevt != t){
    	if (!buying){
    		sinceBuy ++;
    		if (sinceBuy == 2){
    			//buying = true;
    			sinceBuy = 0;
    		}
    	}
    	if (!selling){
    		sinceSell ++;
    		if (sinceSell == 2){
    			//selling = true;
    			sinceSell = 0;
    		}
    	}
    	prevt = t;
    	prices.push(lowPrice)
    	if (prices.length > 60){
			prices.shift()
			low = 9999999999999999999999999;
			p = 30;
			while (p <  50 ){
				if (prices[p] < low){
					//if (theRSI[p][0] < 35){
					low = prices[p]
				//}
				}
				p++;
			}
			lowest = low;
			sellSig = true;
			buySig = true;
			for (var rsi = theRSI[theRSI.length-1].length-1; rsi>= theRSI[theRSI.length-1].length-2; rsi--){

    //console.log('k: ' + theRSI[theRSI.length-1][rsi].k)
				if (theRSI[theRSI.length-1][rsi].k > 20){
					buySig = false;
					if (buyo){
						buying = true;
					}
					buyo = false;

					cancelall()
				}
				if (theRSI[theRSI.length-1][rsi].k < 80){
					sellSig = false;
					if (sello){
						selling = true;
					}
					sello = false;
					cancelall()
				}
			}

		}

   // console.log('buying: ' + buying)
   // console.log('buyo: ' + buyo)
   // console.log('selling: ' + selling)
  //  console.log('sello: ' + sello)
    }
		if (buySig && buying && price != 0 && !buyo){
			selling = true;
			selling2 = true;
			selling3 = true;
			buys++
			tp = price * 1.005;
			buying = false;
			buyo = true;
			amt = 50 * bal_btc * 0.05
			if (position < 0){
				sls = []
			await client.createOrder(  'BTC/USDT', "Market", 'buy', position * -1)
					}
			fBuys.push(await client.createOrder(  'BTC/USDT', "Limit", 'buy', amt, price * (1-0.0003)))
			console.log(new Date() + ' buy! Price: ' + price + ' lowest: ' + lowest)
			orderp = price;
			liqPrice = price * 0.98;
		}
		if (orderp != 0 && price <= orderp * (1- 0.0025) && buying && buying2){
			buyo = false;
			sello = false;
			buying2 = false;
			liqPrice = price * 0.98;
			tp = (orderp - price) / 3 + price * 1.005;
			amt = 50 * bal_btc * 0.1
			if (position < 0){
	await client.createOrder(  'BTC/USDT', "Market", 'buy', position * -1)
			}

						await client.createOrder(  'BTC/USDT', "Limit", 'buy', amt, price * (1-0.0003))
			console.log(new Date() + ' safety buy for double! Price: ' + price + ' orderp: ' + orderp)
		}
		if (orderp != 0 && price <= orderp * (1 - 0.005) && buying && buying3){
			buyo = false;
			sello = false;
			buying3 = false;
			liqPrice = price * 0.98;
			if (position < 0){
	await client.createOrder(  'BTC/USDT', "Market", 'buy', position * -1)
			}
			tp = (orderp - price) / 3 + price * 1.005;
			amt = 50 * bal_btc * 0.2
			await client.createOrder(  'BTC/USDT', "Limit", 'buy', amt, price * (1-0.0003))
			console.log(new Date() + ' safety buy x2 for double! Price: ' + price + ' orderp: ' + orderp)
		}
		/*
		if (tp != 0 && price >= tp){
			buying = true;
			tps++;
			tp = 0;
			liqPrice = 0;
			buying2 = true;
			console.log(new Date() + ' take a tp! Price: ' + price + ' tp: ' + tp)
		}*/
		if (sellSig && selling && !sello){
			buying = true;
			buying2 = true;
			buying3 = true;
			sells++
			selling = false;
			sello = true;
			amt = 50 * bal_btc * 0.05
			if (position > 0){
				sls = []
	await client.createOrder(  'BTC/USDT', "Market", 'sell', position)
			}
fSells.push(			await client.createOrder(  'BTC/USDT', "Limit", 'sell', amt, price * (1.0001)))
			console.log(new Date() + ' sell! Price: ' + price + ' lowest: ' + lowest)
			orderps = price;
			liqPrices = price * 1.02;
		}
		if (orderps != 0 && price >= orderps * 1.0025 && selling && selling2){
			buyo = false;
			sello = false;
			selling2 = false;
			liqPrices = price * 1.02;
			amt = 50 * bal_btc * 0.1

			if (position > 0){
	await client.createOrder(  'BTC/USDT', "Market", 'sell', position)
			}
			await client.createOrder(  'BTC/USDT', "Limit", 'sell', amt, price * (1.0001))
			console.log(new Date() + ' safety sell for double! Price: ' + price + ' orderp: ' + orderp)
		}
		if (orderps != 0 && price >= orderps * 1.005 && selling && selling3){
			buyo = false;
			sello = false;
			selling3 = false;
			liqPrices = price * 1.02;
			amt = 50 * bal_btc * 0.2
			if (position > 0){
	await client.createOrder(  'BTC/USDT', "Market", 'sell', position)
			}
			await client.createOrder(  'BTC/USDT', "Limit", 'sell', amt, price * (1.0001))
			console.log(new Date() + ' safety sell 2x for double! Price: ' + price + ' orderp: ' + orderp)
		}
});