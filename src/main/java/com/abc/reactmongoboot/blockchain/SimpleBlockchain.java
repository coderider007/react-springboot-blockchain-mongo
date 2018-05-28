package com.abc.reactmongoboot.blockchain;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;
import java.util.function.Predicate;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "blockchains")
public class SimpleBlockchain<T extends Tx>
{
    @Id
    private String          id;
    private List<Block<T>>  blocks     = new ArrayList<Block<T>>();
    public static final int BLOCK_SIZE = 10;

    public String getId()
    {
        return id;
    }

    public void setId(String id)
    {
        this.id = id;
    }

    public List<Block<T>> getBlocks()
    {
        return blocks;
    }

    public void setBlocks(List<Block<T>> blocks)
    {
        this.blocks = blocks;
    }

    public SimpleBlockchain()
    {
        // create genesis block
        getBlocks().add(newBlock());
    }

    public SimpleBlockchain(List<Block<T>> blocks)
    {
        this();
        this.setBlocks(blocks);
    }

    public Block<T> getHead()
    {

        Block<T> result = null;
        if (this.getBlocks().size() > 0)
        {
            result = this.getBlocks().get(this.getBlocks().size() - 1);
        }
        else
        {
            throw new RuntimeException(
                    "No Block's have been added to chain...");
        }

        return result;
    }

    public void addAndValidateBlock(Block<T> block)
    {

        // compare previous block hash back to genesis hash
        Block<T> current = block;
        for (int i = getBlocks().size() - 1; i >= 0; i--)
        {
            Block<T> b = getBlocks().get(i);
            if (b.getHash().equals(current.getPreviousHash()))
            {
                current = b;
            }
            else
            {
                throw new RuntimeException("Block Invalid");
            }
        }

        this.getBlocks().add(block);

    }

    public boolean validate()
    {

        String previousHash = getBlocks().get(0).getHash();
        for (Block<T> block : getBlocks())
        {
            String currentHash = block.getHash();
            if (!currentHash.equals(previousHash))
            {
                return false;
            }

            previousHash = currentHash;

        }

        return true;

    }

    public Block<T> newBlock()
    {
        int count = getBlocks().size();
        String previousHash = "genesis";

        if (count > 0)
            previousHash = blockChainHash();

        Block<T> block = new Block<T>();

        block.setTimeStamp(System.currentTimeMillis());
        block.setIndex(count);
        block.setPreviousHash(previousHash);
        return block;
    }

    public SimpleBlockchain<T> add(T item)
    {

        if (getBlocks().size() == 0)
        {
            // genesis block
            this.getBlocks().add(newBlock());
        }

        // See if head block is full
        if (getHead().getTransactions().size() >= BLOCK_SIZE)
        {
            this.getBlocks().add(newBlock());
        }

        getHead().add(item);

        return this;
    }

    /* Deletes the index of the after. */
    public void DeleteAfterIndex(int index)
    {
        if (index >= 0)
        {
            Predicate<Block<T>> predicate = b -> getBlocks()
                    .indexOf(b) >= index;
            getBlocks().removeIf(predicate);
        }
    }

    public SimpleBlockchain<T> Clone()
    {
        List<Block<T>> clonedChain = new ArrayList<Block<T>>();
        Consumer<Block<T>> consumer = (b) -> clonedChain.add(b.Clone());
        getBlocks().forEach(consumer);
        return new SimpleBlockchain<T>(clonedChain);
    }

    /* Gets the root hash. */
    public String blockChainHash()
    {
        return getHead().getHash();
    }

}