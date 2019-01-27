var http = require('http');
var url = require('url');
create_genesis_block = require("./create_genesis_block").create_genesis_block;
next_block = require("./next_block").next_block;
// A completely random address of the owner of this node
var miner_address = "q3nf394hjg-random-miner-address-34nf3i4nflkn3oi";
// Store the url data of every
// other node in the network
// so that we can communicate
// with them
peer_nodes = [];
// A variable to deciding if we're mining or not
mining = true;
// to get the latest blockhain from decentralized server
blockchain = [];
consensus = require("./consensus").consensus;
blockchain = consensus(blockchain, peer_nodes);
// if the blockchain is not exist yet, begin the very first blockchain
if(blockchain.length == 0)
{
	// This node's blockchain copy
	blockchain = [create_genesis_block];
	previous_block = blockchain[0];
}
else{previous_block = blockchain[blockchain.length - 1];}
// Store the transactions that
// this node has in a list
var this_nodes_transactions = [];
result = "";
//create a server object:
http.createServer(function (req, res) {
	if(req.method == "POST")
	{
		if(req.url=="/transaction")
		{
			body = "";
			req.on('data', function (data) {
				body += data;
			});
			req.on('end', function () {
				var qs = require('querystring');
				var post = qs.parse(body);
				var transaction = require("./transaction").transaction;
				this_nodes_transactions = transaction(this_nodes_transactions, post);
				result = "Transaction submission successful\n";
			});
		}
		else{result="No result";}
	}
	else if(req.method == "GET")
	{
		link = url.parse(req.url, true);
		if(link.pathname=="/mine")
		{
			var mine = require("./mine").mine;
			miner = mine(blockchain, this_nodes_transactions, miner_address, req);
			blockchain = miner[0];
			this_nodes_transactions = miner[1];
			mined = miner[2];
			console.log("Mined : "+JSON.stringify(mined));
			result = "Mining submission successful\n"
		}
		else if(link.pathname=="/blocks")
		{
			get_blocks = require("./get_blocks").get_blocks;
			result = get_blocks(blockchain);
			console.log(result);
		}
		else{result="No result";}
	}
	else{result="No result";}
	res.write(result); //write a response to the client
	res.end(); //end the response
}).listen(8080); //the server object listens on port 8080