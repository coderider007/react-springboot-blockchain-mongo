package com.abc.reactmongoboot.repositories;

import org.springframework.data.repository.CrudRepository;

import com.abc.reactmongoboot.models.Contact;

public interface ContactRepository extends CrudRepository<Contact, String> {
    @Override
    void delete(Contact deleted);
}
