package com.victor.pi3.controller;

import com.victor.pi3.model.Item;
import com.victor.pi3.model.Sales;
import com.victor.pi3.service.ItemService;
import com.victor.pi3.service.SalesService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/sales")
public class SalesController 
{
    @Autowired
    private SalesService salesService;

    @Autowired
    private ItemService itemService;

    @GetMapping("/register")
    public String showForm(Model model) 
    {
        model.addAttribute("sale", new Sales());
        return "register-sales";
    }

    @PostMapping("/register")
    public String save(@PathVariable int id, @ModelAttribute Sales newSale) 
    {
        Item item = itemService.ListById(id);

        if (item != null) 
        {
            itemService.Save(item);
        }

        return "register-sales-success";
    }

    @GetMapping("/list")
    public String listSales(Model model) 
    {
        model.addAttribute("sales", salesService.ListAll());

        return "list-sales";
    }
}
