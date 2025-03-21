package com.victor.pi3.controller;

import com.victor.pi3.model.Item;
import com.victor.pi3.service.ItemService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("/api/items")
public class ItemAPIController 
{
    @Autowired
    private ItemService itemService;
    
    @PostMapping
    public Item SaveItem(@RequestBody Item item)
    {
        return itemService.Save(item);
    }
    
    @GetMapping
    public List<Item> ListItems()
    {
        return itemService.ListAll();
    }
    
    @GetMapping("/{id}")
    public Item ListItemById(@PathVariable int id)
    {
        return itemService.ListById(id);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Item> UpdateItem(@PathVariable int id, @RequestBody Item newItem)
    {
        Item item = itemService.ListById(id);
        
        item.setName(newItem.getName());
        item.setDescription(newItem.getDescription());
        item.setQuantity(newItem.getQuantity());
        item.setPrice(newItem.getPrice());
        item.setAvailable(newItem.isAvailable());
        
        Item savedItem = itemService.Save(item);
        return ResponseEntity.ok(savedItem);
    }
    
    @DeleteMapping("/{id}")
    public void DeleteItem(@PathVariable int id)
    {
        itemService.Delete(id);
    }
}
