package com.victor.pi3.service;

import com.victor.pi3.model.Item;
import com.victor.pi3.repository.ItemRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ItemService 
{
    @Autowired
    private ItemRepository itemRepository;
    
    public Item Save(Item item)
    {
        return itemRepository.save(item);
    }
    
    public List<Item> ListAll()
    {
        return itemRepository.findAll();
    }
    
    public Item ListById(int id)
    {
        return itemRepository.findById(id).orElse(null);
    }
    
    public void Delete(int id)
    {
        itemRepository.deleteById(id);
    }
}
