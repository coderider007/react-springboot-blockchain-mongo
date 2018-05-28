package com.abc.reactmongoboot.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.abc.reactmongoboot.models.Contact;
import com.abc.reactmongoboot.repositories.ContactRepository;

import java.util.Optional;

@RestController
public class ContactController
{

    @Autowired
    ContactRepository contactRepository;

    @RequestMapping(method = RequestMethod.GET, value = "/contacts")
    public Iterable<Contact> contact()
    {
        return contactRepository.findAll();
    }

    @RequestMapping(method = RequestMethod.POST, value = "/contacts")
    public Contact save(@RequestBody Contact contact)
    {
        contactRepository.save(contact);

        return contact;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/contacts/{id}")
    public Optional<Contact> show(@PathVariable String id)
    {
        return contactRepository.findById(id);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/contacts/{id}")
    public Contact update(@PathVariable String id, @RequestBody Contact contact)
    {
        Optional<Contact> optcontact = contactRepository.findById(id);
        Contact c = optcontact.get();
        if (contact.getName() != null)
            c.setName(contact.getName());
        if (contact.getAddress() != null)
            c.setAddress(contact.getAddress());
        if (contact.getCity() != null)
            c.setCity(contact.getCity());
        if (contact.getPhone() != null)
            c.setPhone(contact.getPhone());
        if (contact.getEmail() != null)
            c.setEmail(contact.getEmail());
        contactRepository.save(c);
        return c;
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/contacts/{id}")
    public String delete(@PathVariable String id)
    {
        String response;
        Optional<Contact> optcontact = contactRepository.findById(id);
        if (optcontact.isPresent())
        {
            Contact contact = optcontact.get();
            contactRepository.delete(contact);
            response = "SUCCESS";
        }
        else
        {
            response = "FAILED";
        }

        return response;
    }
}
