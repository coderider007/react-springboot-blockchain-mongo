package com.abc.reactmongoboot.repositories;

import org.springframework.data.repository.CrudRepository;

import com.abc.reactmongoboot.blockchain.SimpleBlockchain;
import com.abc.reactmongoboot.blockchain.Tx;

public interface SimpleBlockchainRepository<T extends Tx>
        extends CrudRepository<SimpleBlockchain<T>, String>
{
    @Override
    void delete(SimpleBlockchain<T> deleted);
}
