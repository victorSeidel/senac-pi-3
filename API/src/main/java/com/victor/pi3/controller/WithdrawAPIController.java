package com.victor.pi3.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.victor.pi3.model.Withdraw;
import com.victor.pi3.service.WithdrawService;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("/api/withdraws")
public class WithdrawAPIController 
{
    @Autowired
    private WithdrawService withdrawService;
    
    @PostMapping
    public Withdraw SaveSale(@RequestBody Withdraw withdraw)
    {
        return withdrawService.Save(withdraw);
    }
    
    @GetMapping
    public List<Withdraw> ListItems()
    {
        return withdrawService.ListAll();
    }
    
    @GetMapping("/{id}")
    public Withdraw ListSalesById(@PathVariable int id)
    {
        return withdrawService.ListById(id);
    }
}
