package com.abc.reactmongoboot.models;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.abc.reactmongoboot.blockchain.Tx;
import com.abc.reactmongoboot.blockchain.helper.SHA256;

@Document(collection = "transactions")
public class Transaction implements Tx
{

    @Id
    private String id;
    private String hash;
    private String from;
    private String to;
    private float  amount;
    private String value;
    private Date   timestamp;

    public Transaction()
    {
    }

    public Transaction(String from, String to, float amount)
    {
        String value = from + "#" + to + "#" + amount;
        // new value need to recalc hash
        this.setHash(SHA256.generateHash(value));
        this.value = value;
    }

    public String getId()
    {
        return id;
    }

    public void setId(String id)
    {
        this.id = id;
    }

    public String getHash()
    {
        return hash;
    }

    public void setHash(String hash)
    {
        this.hash = hash;
    }

    public String getFrom()
    {
        return from;
    }

    public void setFrom(String from)
    {
        String value = from + "#" + to + "#" + amount;
        // new value need to recalc hash
        this.setHash(SHA256.generateHash(value));
        this.value = value;
        this.from = from;
    }

    public String getTo()
    {
        return to;
    }

    public void setTo(String to)
    {
        String value = from + "#" + to + "#" + amount;
        // new value need to recalc hash
        this.setHash(SHA256.generateHash(value));
        this.value = value;
        this.to = to;
    }

    public float getAmount()
    {
        return amount;
    }

    public void setAmount(float amount)
    {
        String value = from + "#" + to + "#" + amount;
        // new value need to recalc hash
        this.setHash(SHA256.generateHash(value));
        this.value = value;
        this.amount = amount;
    }

    public Date getTimestamp()
    {
        return timestamp;
    }

    public void setTimestamp(Date timestamp)
    {
        this.timestamp = timestamp;
    }

    public String hash()
    {
        return getHash();
    }

    public String toString()
    {
        return this.getHash() + " : " + this.value;
    }

}
