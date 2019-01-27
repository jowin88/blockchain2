var http = require('http');
exports.find_new_chains = function(peer_nodes)
{
	// Get the blockchains of every
	// other node
	other_chains = [];
	peer_nodes.forEach(foreachExecute);
	function foreachExecute(node_url)
	{
		// Get their chains using a GET request
		var options = {
			host: node_url,
			path: '/blocks'
		}
		var request = http.request(options, function (res) {
			var data = '';
			res.on('data', function (chunk) {
				data += chunk;
			});
			res.on('end', function () {
				// Convert the JSON object to a Python dictionary
				// Add it to our list
				console.log(data);
				other_chains.push(data);
			});
		});
		request.on('error', function (e) {
			console.log(e.message);
		});
		request.end();
	}
	return other_chains;
}