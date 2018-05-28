package com.abc.reactmongoboot.blockchain;

import java.util.Iterator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.abc.reactmongoboot.models.Transaction;
import com.abc.reactmongoboot.repositories.SimpleBlockchainRepository;

@Service
public class MinerFactory
{
    private static Miner<Transaction>                      miner;

    private static SimpleBlockchainRepository<Transaction> simpleBlockchainRepository;

    private MinerFactory()
    {
    }

    @Autowired
    public void setSimpleBlockchainRepository(
            SimpleBlockchainRepository<Transaction> simpleBlockchainRepository)
    {
        MinerFactory.simpleBlockchainRepository = simpleBlockchainRepository;
    }

    public static Miner<Transaction> getMiner()
    {
        if (null == miner)
        {
            synchronized (miner)
            {
                if (null != simpleBlockchainRepository)
                {
                    Iterator<SimpleBlockchain<Transaction>> chains = simpleBlockchainRepository
                            .findAll().iterator();
                    SimpleBlockchain<Transaction> blockChain = chains.hasNext()
                            ? chains.next()
                            : new SimpleBlockchain<Transaction>();
                    miner = new Miner<Transaction>(blockChain);
                }
                else
                {
                    throw new RuntimeException(
                            "SimpleBlockchainRepository not injected. :(");

                }
            }
        }
        return miner;
    }

}
