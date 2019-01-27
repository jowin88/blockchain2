find_new_chains = require("./find_new_chains").find_new_chains;
exports.consensus = function(longest_chain, peer_nodes)
{
	// Get the blocks from other nodes
	other_chains = find_new_chains(peer_nodes);
	// If our chain isn't longest,
	// then we store the longest chain
	other_chains.forEach(checkLonger);
	function checkLonger(chain)
	{
		if(longest_chain.length < chain.length)
		{
			longest_chain = chain;
		}
	}
	// If the longest chain wasn't ours,
	// then we set our chain to the longest
	return longest_chain;
}