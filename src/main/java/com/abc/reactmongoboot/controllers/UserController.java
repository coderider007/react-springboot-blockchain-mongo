package com.abc.reactmongoboot.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.abc.reactmongoboot.models.User;
import com.abc.reactmongoboot.repositories.UserRepository;

import java.util.Date;
import java.util.Iterator;
import java.util.Optional;

@RestController
public class UserController
{

    @Autowired
    UserRepository userRepository;

    @RequestMapping(method = RequestMethod.GET, value = "/users")
    public Iterable<User> users()
    {
        return userRepository.findAll();
    }

    @RequestMapping(method = RequestMethod.POST, value = "/users")
    public User save(@RequestBody User user)
    {
        user.setCreationDate(new Date());
        userRepository.save(user);

        return user;
    }

    @RequestMapping(method = RequestMethod.POST, value = "/loginForm")
    public Boolean login(@RequestBody User user)
    {
        Iterable<User> users = userRepository.findAll();
        Iterator<User> itr = users.iterator();
        Boolean found = false;
        while(itr.hasNext()){
            User usr = itr.next();
            if(usr.getEmail().equalsIgnoreCase(user.getEmail()) && usr.getPassword().equalsIgnoreCase(user.getPassword())){
                found = true;
                break;
            }
        }
        return found;
    }
    
    @RequestMapping(method = RequestMethod.GET, value = "/users/{id}")
    public Optional<User> show(@PathVariable String id)
    {
        return userRepository.findById(id);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/users/{id}")
    public User update(@PathVariable String id, @RequestBody User user)
    {
        Optional<User> optUser = userRepository.findById(id);
        User u = optUser.get();
        if (user.getName() != null)
            u.setName(user.getName());
        if (user.getEmail() != null)
            u.setEmail(user.getEmail());
        if (user.getPassword() != null)
            u.setPassword(user.getPassword());
        
        userRepository.save(u);
        return u;
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/users/{id}")
    public String delete(@PathVariable String id)
    {
        String response;
        Optional<User> optUser = userRepository.findById(id);
        if (optUser.isPresent())
        {
            User User = optUser.get();
            userRepository.delete(User);
            response = "SUCCESS";
        }
        else
        {
            response = "FAILED";
        }

        return response;
    }
}
