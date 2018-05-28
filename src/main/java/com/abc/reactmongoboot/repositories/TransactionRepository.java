package com.abc.reactmongoboot.repositories;

import org.springframework.data.repository.CrudRepository;

import com.abc.reactmongoboot.models.Transaction;

public interface TransactionRepository
        extends CrudRepository<Transaction, String>
{
    @Override
    void delete(Transaction deleted);
}
