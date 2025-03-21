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
@Table(name="Withdraw")

@Component
public class Withdraw 
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    private double amount;
    private String reason;
    private Date date;

    public Withdraw() {}
    
    public Withdraw(int id, String reason, double amount, Date date) 
    {
        this.id = id;
        this.reason = reason;
        this.amount = amount;
        this.date = date;
    }  
}
