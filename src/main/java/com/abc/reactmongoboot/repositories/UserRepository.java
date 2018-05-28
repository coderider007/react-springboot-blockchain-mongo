package com.abc.reactmongoboot.repositories;

import org.springframework.data.repository.CrudRepository;

import com.abc.reactmongoboot.models.User;

public interface UserRepository extends CrudRepository<User, String>
{
    @Override
    void delete(User deleted);
}
