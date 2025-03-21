package com.victor.pi3.controller;

import com.victor.pi3.model.Withdraw;
import com.victor.pi3.service.WithdrawService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/withdraw")
public class WithdrawController 
{
    @Autowired
    private WithdrawService withdrawService;


    @GetMapping("/register")
    public String showForm(Model model) 
    {
        model.addAttribute("withdraw", new Withdraw());
        return "register-withdraw";
    }

    @PostMapping("/register")
    public String save(@PathVariable int id, @ModelAttribute WithdrawService withdrawService) 
    {
        Withdraw withdraw = withdrawService.ListById(id);

        if (withdraw != null) 
        {
            withdrawService.Save(withdraw);
        }

        return "register-withdraw-success";
    }

    @GetMapping("/list")
    public String listSales(Model model) 
    {
        model.addAttribute("sales", withdrawService.ListAll());

        return "list-withdraw";
    }
}
