package com.abc.reactmongoboot.controllers;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.abc.reactmongoboot.blockchain.Block;
import com.abc.reactmongoboot.blockchain.MinerFactory;
import com.abc.reactmongoboot.blockchain.SimpleBlockchain;
import com.abc.reactmongoboot.models.Transaction;
import com.abc.reactmongoboot.repositories.SimpleBlockchainRepository;
import com.abc.reactmongoboot.repositories.TransactionRepository;

@RestController
public class SimpleBlockchainController
{

    @Autowired
    SimpleBlockchainRepository<Transaction> simpleBlockchainRepository;

    @Autowired
    TransactionRepository                   transactionRepository;

    @RequestMapping(method = RequestMethod.GET, value = "/getBlockchain")
    public SimpleBlockchain<Transaction> getBlocks()
    {
        return MinerFactory.getMiner().getChain();
    }

    @RequestMapping(method = RequestMethod.POST, value = "/addTransaction")
    public Transaction addTransaction(@RequestBody Transaction transaction)
    {
        transaction.setTimestamp(new Date());
        Transaction txn = transactionRepository.save(transaction);

        // in real scenario miner will be listening to transactions
        MinerFactory.getMiner().mine(txn);

        // blockChain.add(transactionRepository.save(transaction));
        simpleBlockchainRepository.save(MinerFactory.getMiner().getChain());

        return txn;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/transactions")
    public List<Transaction> transactions()
    {
        // return transactions to be added to latest block
        List<Transaction> txns = MinerFactory.getMiner().getTransactionPool();

        // if miner has no pending transactions return head block transactions
        if (null == txns || txns.size() == 0)
        {
            txns = MinerFactory.getMiner().getChain().getHead()
                    .getTransactions();
        }

        return txns;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/blocks")
    public List<Block<Transaction>> blocks()
    {
        return MinerFactory.getMiner().getChain().getBlocks();
    }

}