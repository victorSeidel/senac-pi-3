package com.victor.pi3.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import lombok.Data;


import org.springframework.stereotype.Component;

@Data
@Entity
@Table(name="Items")

@Component
public class Item 
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    private String name;
    private String description;
    private int quantity;
    private String price;
    private boolean available;

    public Item() {}
    
    public Item(int id, String name, String description, int quantity, String price, boolean available) 
    {
        this.id = id;
        this.name = name;
        this.description = description;
        this.quantity = quantity;
        this.price = price;
        this.available = available;
    }  
}
