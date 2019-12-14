const ccxt = require('ccxt')
var client = new ccxt.binance({
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
var client2 = new ccxt.binance({
    "apiKey": "Jjlba2XfArvivRmbWcCQVCRe31zd43sVjvP0tSNyyX3t4PpuFFAHQFhzY9MLYRdV",
    "secret": "O6QNe1eDUCHGiLLe9kyAttcA74uk8ukowAfqT7GOSLdoezYMusO71mL6ge8v2Fxe",
})
const binance = require('node-binance-api')().options({
    APIKEY: 'Jjlba2XfArvivRmbWcCQVCRe31zd43sVjvP0tSNyyX3t4PpuFFAHQFhzY9MLYRdV',
    APISECRET: 'O6QNe1eDUCHGiLLe9kyAttcA74uk8ukowAfqT7GOSLdoezYMusO71mL6ge8v2Fxe',
    useServerTime: true // If you get timestamp errors, synchronize to server time at startup
});
const SMA = require('technicalindicators').SMA;
var tradesArr = []
var values = []
var position = 0;
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
var buying = true;
var buying2 = true;
var buying3 = true;
var selling = true;
var selling2 = true;
var selling3 = true;
var orderb = [];
var orders = [];
var sl = [];
var sls = [];
var postype = 'none';
var leverage = 25;
var losses = 0;

async function report() {
    console.log(' ')
    console.log('-----')
    console.log(new Date())
    console.log('position: ' + position)
    console.log('usedPerc: ' + freePerc)
    console.log('bal btc: ' + bal_btc)
    console.log('pnl btc: % ' + -1 * (1 - bal_btc / initial_bal) * 100)
    console.log('bal usd: ' + bal_usd)
    console.log('pnl usd: % ' + -1 * (1 - bal_usd / usd_init) * 100)
    console.log('losses (maxes out at 3 and resets): ' + losses);
	console.log('last: ' + last)
	console.log('sma: ' + theSMA[theSMA.length-2])
}
setTimeout(function() {
    report();
}, 30000);
setInterval(function() {
    report()
}, 60 * 5 * 1000);
var docancel = false;
async function cancelall() {
    ords = await client.fetchOpenOrders('BTC/USDT')
    for (var order in ords) {
        if (true) {
            oid = ords[order]['info']['orderId']
            side = ords[order]['side']
            //if (buysell == 1 && side == 'buy'){
            //	console.log('cancelleing2...')
            try {
                await client.cancelOrder(oid, 'BTC/USDT')
            } catch (e) {
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
var bsfirst = true;
var buyos = []
var trades;
var sellos = []
setInterval(async function() {

    if (first) {
        trades = await client.fapiPrivateGetUserTrades({'symbol':'BTCUSDT', 'limit': 100})
		for (var t in trades){
		tradesArr.push(trades[t].id)
}
    }
	trades = await client.fapiPrivateGetUserTrades({'symbol':'BTCUSDT', 'limit': 100})
		for (var t in trades){
			if (!tradesArr.includes(trades[t].id)){
		tradesArr.push(trades[t].id)
			for (var o in buyos){
				if (trades[t].orderId == buyos[o].id){
					buyos.splice(o, 1);
				    console.log('entering buy TPs....')
            docancel = false;
            setTimeout(function() {
                docancel = true;
            }, 60 * 1000)
			await client.createOrder('BTC/USDT', "Limit", 'sell', amt * 0.25, last * (1 + (0.001)))
          await client.createOrder('BTC/USDT', "Limit", 'sell', amt * 0.25, last * (1 + (0.0025)))
          await client.createOrder('BTC/USDT', "Limit", 'sell', amt * 0.25, last * (1 + (0.006)))
          await client.createOrder('BTC/USDT', "Limit", 'sell', amt * 0.25, last * (1 + (0.01)))
				}
			}
			for (var o in sellos){
				
				if (trades[t].orderId == sellos[o].id){
					sellos.splice(o, 1);
            docancel = false;
            setTimeout(function() {
                docancel = true;
            }, 60 * 1000)
							
				    console.log('entering sell TPs....')
					await client.createOrder('BTC/USDT', "Limit", 'buy', amt * 0.25, last * (1 - (0.001)))
          await client.createOrder('BTC/USDT', "Limit", 'buy', amt * 0.25, last * (1 - (0.0025)))
          await client.createOrder('BTC/USDT', "Limit", 'buy', amt * 0.25, last * (1 - (0.006)))
          await client.createOrder('BTC/USDT', "Limit", 'buy', amt * 0.25, last * (1 - (0.01)))
				}
			}
			}
}
    ohlcv = await client.fetchOHLCV('BTC/USDT', timeframe = '1m', since = undefined, limit = 120, params = {})
    //console.log(ohlcv)
    for (var candle in ohlcv) {
        values.push(ohlcv[candle][4])
        if (values.length > 100) {
            values.shift()
        }
    }
    theSMA = SMA.calculate({
        period: 60,
        values: values
    })


    pos = await client.fapiPrivateGetPositionRisk()
    if (pos[0] != undefined) {
        position = parseFloat(pos[0]['positionAmt'])
        leverage = parseFloat(pos[0]['leverage'])
    }
    if (first) {
    	cancelall()
        if (position < 0) {
            await client.createOrder('BTC/USDT', "Market", 'buy', position * -1)
        } else if (position > 0) {
            await client.createOrder('BTC/USDT', "Market", 'sell', position)

        }
    }
    //console.log(position)
    account = await client.fetchBalance()

    ticker = await client.fetchTicker('BTC/USDT')
    if (docancel && !buying && !buying2 && ticker.last <= theSMA[theSMA.length - 2] * (1)) { // bought
        console.log('bought and sma crossed')
        if (parseFloat(pos[0]['unRealizedProfit']) < 0) {
            losses++;
        } else {
            losses = 0;
        }
buying2 = true
        setTimeout(function(){
        buying = true;
    }, 60 * 1000)
        if (losses == 3) {
            losses = 0;
            console.log('3 losses... delaying activity 10min')
            buying = false;
            selling = false;
            setTimeout(function() {
                buying = true;
                selling = true;
            }, 60 * 10 * 1000);
        }
        cancelall()
        if (position < 0) {
            await client.createOrder('BTC/USDT', "Market", 'buy', position * -1)
        } else if (position > 0) {
            await client.createOrder('BTC/USDT', "Market", 'sell', position)

        }

    }
    if (docancel && !selling && !selling2 && ticker.last >= theSMA[theSMA.length - 2] * (1)) { //sold
        console.log('sold and sma crossed')
        if (parseFloat(pos[0]['unRealizedProfit']) < 0) {
            losses++;
        } else {
            losses = 0;
        }
selling2 = true
        setTimeout(function(){
        selling = true;
    }, 60 * 1000)   
         if (losses == 3) {
            losses = 0;
            console.log('3 losses... delaying activity 10min')
            buying = false;
            selling = false;
            setTimeout(function() {
                buying = true;
                selling = true;
            }, 60 * 10 * 1000);
        }
        cancelall()
        if (position < 0) {
            await client.createOrder('BTC/USDT', "Market", 'buy', position * -1)
        } else if (position > 0) {
            await client.createOrder('BTC/USDT', "Market", 'sell', position)

        }
    }
    LB = ticker.last + 0.5
    //console.log(await client.fetchTicker( 'BTC/USDT' ))
    HA = ticker.last - 0.5
    free_btc = parseFloat(account['info']['totalInitialMargin']) / HA

    bal_btc = parseFloat(account['info']['totalMarginBalance']) / HA
    freePerc = (free_btc / bal_btc)
    bal_usd = parseFloat(account['info']['totalMarginBalance'])
    last = ticker.last

    if (last >= theSMA[theSMA.length - 2] * (1 + (0.0005)) && buying) {
        if (postype == 'selling') {


            setTimeout(function() {
                postype = 'none'
            }, 5 * 60 * 1000);
        }
        if (postype == 'none') {
            amt = leverage * bal_btc * 0.5
			if (bsfirst){
				bsfirst = false;
			}
			else {
           buyos.push( await client.createOrder('BTC/USDT', "Limit", 'buy', amt, last + 100))
            console.log(new Date() + ' market buy! Price: ' + last + ' & prev SMA: ' + theSMA[theSMA.length - 2])
            buying = false;
            buying2 = false;
            sl.push(last * (1 - (0.016)))
            sls.shift()
            orders.shift()
            selling2 = true;
            selling3 = true;
            orderb.push(last);
            selling = true;
        }
		}
    }
    if (last <= theSMA[theSMA.length - 2] * (1 - .0005) && selling) {
        if (postype == 'buying') {
            setTimeout(function() {
                postype = 'none';
            }, 5 * 60 * 1000);
        }
        if (postype == 'none') {
            amt = leverage * bal_btc * 0.5
			if (bsfirst){
				bsfirst = false;
			}
			else {
            sellos.push(await client.createOrder('BTC/USDT', "Limit", 'sell', amt, last - 100))
            console.log(new Date() + ' market sell! Price: ' + last + ' & prev SMA: ' + theSMA[theSMA.length - 2])
            orders.push(last);
            orderb.shift()
            sls.push(last * 1.016)
            sl.shift();
            selling2 = false;
            selling = false;
            buying = true;
            buying2 = true;
            buying3 = true;
        }
		}
    }
    if (first) {

        //await client.loadProducts () 
        first = false;
        usd_init = bal_usd //50;
        initial_bal = bal_btc;
    }
    if (count >= 4 * 6 * 1) {
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
}, 5000)