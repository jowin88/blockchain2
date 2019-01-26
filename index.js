var http = require('http');
var qs = require('querystring');
var url = require('url');
var transaction = require("./transaction").transaction;
var mine = require("./mine").mine;
var this_nodes_transactions = [];
var miner_address = "q3nf394hjg-random-miner-address-34nf3i4nflkn3oi"

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
				var post = qs.parse(body);
				this_nodes_transactions = transaction(this_nodes_transactions, post);
			});
		}
	}
	else if(req.method == "GET")
	{
		if(req.url=="/mine")
		{
			miner = mine(blockchain, this_nodes_transactions, miner_address, req);
			blockchain = miner[0];
			this_nodes_transactions = miner[1];
			mined = miner[2];
		}
	}
	res.write('The end'); //write a response to the client
	res.end(); //end the response
}).listen(8080); //the server object listens on port 8080

// ...blockchain
// ...Block class definition


/*
// @node.route('/mine', methods = ['GET'])
export.mine = function(blockchain, this_nodes_transactions)
{
	// Get the last proof of work
	last_block = blockchain[len(blockchain) - 1]
	last_proof = last_block.data['proof-of-work'];
	// Find the proof of work for
	// the current block being mined
	// Note: The program will hang here until a new
	//       proof of work is found
	proof = proof_of_work(last_proof);
	// Once we find a valid proof of work,
	// we know we can mine a block so 
	// we reward the miner by adding a transaction
	this_nodes_transactions.append(
		{ "from": "network", "to": miner_address, "amount": 1 }
	);
	// Now we can gather the data needed
	// to create the new block
	new_block_data = {
		"proof-of-work": proof,
		"transactions": list(this_nodes_transactions)
	};
	new_block_index = last_block.index + 1;
	new_block_timestamp = this_timestamp = Date();
	last_block_hash = last_block.hash;
	// Empty transaction list
	this_nodes_transactions = [];
	// Now create the
	// new block!
	mined_block = Block(
		new_block_index,
		new_block_timestamp,
		new_block_data,
		last_block_hash
	);
	blockchain.append(mined_block);
	// Let the client know we mined a block
	return {
	  "index": new_block_index,
	  "timestamp": str(new_block_timestamp),
	  "data": new_block_data,
	  "hash": last_block_hash
	};
}*/