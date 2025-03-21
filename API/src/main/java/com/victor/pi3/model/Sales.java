package com.victor.pi3.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import lombok.Data;

import java.util.Date;

import org.springframework.stereotype.Component;

@Data
@Entity
@Table(name="Sales")

@Component
public class Sales 
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    private double money;

    private Date date;

    private int item_id;

    public Sales() { }
    
    public Sales(int id, double money, Date date, int item_id) 
    {
        this.id = id;
        this.money = money;
        this.date = date;
        this.item_id = item_id;
    } 
}