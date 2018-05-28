package com.abc.reactmongoboot.blockchain;

import java.util.ArrayList;
import java.util.List;

import com.abc.reactmongoboot.blockchain.helper.SHA256;
import com.google.gson.Gson;

/**
 * 
 * Simulates a Miner that performs a Proof of Work consensus mechanism
 * transactions created in the network.
 * 
 * This is used for Unit testing, in a real blockchain network, miners would
 * listen for transactions nodes created and then perform POW and create a
 * block, which would be sent back to network, and validated by each node.
 * 
 */
public class Miner<T extends Tx>
{

    private List<T>             transactionPool = new ArrayList<T>();
    private SimpleBlockchain<T> chain           = null;

    public Miner(SimpleBlockchain<T> chain)
    {
        this.chain = chain;
        if (this.chain.getHead().getTransactions()
                .size() < SimpleBlockchain.BLOCK_SIZE)
        {
            this.transactionPool.addAll(this.chain.getHead().getTransactions());
        }
    }

    public List<T> getTransactionPool()
    {
        return transactionPool;
    }

    public void mine(T tx)
    {
        transactionPool.add(tx);
        if (transactionPool.size() > SimpleBlockchain.BLOCK_SIZE)
        {
            createBlockAndApplyToChain();
        }
    }

    private void createBlockAndApplyToChain()
    {
        Block<T> block = this.chain.newBlock();
        // set previous hash with current hash
        block.setPreviousHash(this.chain.getHead().getHash());
        // set block hashes from POW block
        block.setHash(proofOfWork(block));
        this.chain.addAndValidateBlock(block);
        // empty pool
        transactionPool = new ArrayList<T>();
    }

    private String proofOfWork(Block<T> block)
    {
        String nonceKey = block.getNonce();
        long nonce = 0;
        boolean nonceFound = false;
        String nonceHash = "";

        Gson parser = new Gson();
        String serializedData = parser.toJson(transactionPool);
        String message = block.getTimeStamp() + block.getIndex()
                + block.getMerkleRoot() + serializedData
                + block.getPreviousHash();

        while (!nonceFound)
        {
            nonceHash = SHA256.generateHash(message + nonce);
            nonceFound = nonceHash.substring(0, nonceKey.length())
                    .equals(nonceKey);
            nonce++;
        }

        return nonceHash;
    }

    public SimpleBlockchain<T> getChain()
    {
        return chain.Clone();
    }

}
