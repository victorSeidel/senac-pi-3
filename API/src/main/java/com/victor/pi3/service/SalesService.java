package com.victor.pi3.service;

import com.victor.pi3.model.Item;
import com.victor.pi3.model.Sales;
import com.victor.pi3.repository.SalesRepository;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SalesService 
{
    @Autowired
    private ItemService itemService;

    @Autowired
    private SalesRepository salesRepository;

    public String CalculateTotal() 
    {
        List<Item> items = itemService.ListAll();
        String money = "0.0";

        for (Item item : items) 
        {
            double itemTotal = Float.parseFloat(item.getPrice().replace(",", ".")) * item.getQuantity();
            money += itemTotal;

            Sales sales = new Sales();
            sales.setMoney(itemTotal);
            sales.setDate(new Date());
            sales.setItem_id(item.getId());
            salesRepository.save(sales);
        }

        return money;
    }

    public String loseMoney()
    {
        String money = "0.0";

        return money;
    }

    public Sales Save(Sales sales) 
    {
        return salesRepository.save(sales);
    }

    public List<Sales> ListAll() 
    {
        return salesRepository.findAll();
    }

    public Sales ListById(int id) 
    {
        return salesRepository.findById(id).orElse(null);
    }
}
