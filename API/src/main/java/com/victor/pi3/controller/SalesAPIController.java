package com.victor.pi3.controller;

import com.victor.pi3.model.Sales;
import com.victor.pi3.service.SalesService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("/api/sales")
public class SalesAPIController 
{
    @Autowired
    private SalesService salesService;
    
    @PostMapping
    public Sales SaveSale(@RequestBody Sales sale)
    {
        return salesService.Save(sale);
    }
    
    @GetMapping
    public List<Sales> ListItems()
    {
        return salesService.ListAll();
    }
    
    @GetMapping("/{id}")
    public Sales ListSalesById(@PathVariable int id)
    {
        return salesService.ListById(id);
    }
}
