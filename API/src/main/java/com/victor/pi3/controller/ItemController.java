package com.victor.pi3.controller;

import com.victor.pi3.model.Item;
import com.victor.pi3.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class ItemController 
{
    @Autowired
    private ItemService itemService;
    
    @GetMapping("/")
    public String index()
    {
        return "index";
    }
    
    @GetMapping("/register")
    public String showForm(Model model)
    {
        model.addAttribute("item", new Item());
        
        return "register";
    }
    
    @PostMapping("/sucess")
    public String processForm(@ModelAttribute Item item, Model model)
    {
        itemService.Save(item);
        
        model.addAttribute("item", item);
        
        return "register-sucess";
    }
    
    @GetMapping("/list")
    public String showList(Model model)
    {
        model.addAttribute("items", itemService.ListAll());
        
        return "list";
    }
    
    @GetMapping("/{id}")
    public String showDetails(@PathVariable int id, Model model)
    {
        Item it = itemService.ListById(id);
        
        System.out.println("ID >>>>>>>>>> " + it.getId());
        
        model.addAttribute("item", it);
        
        return "details";
    }
    
    @GetMapping("/update/{id}")
    public String update(@PathVariable int id, Model model)
    {
        model.addAttribute("item", itemService.ListById(id));
        
        return "register";
    }
    
    @GetMapping("/delete/{id}")
    public String delete(@PathVariable int id)
    {
        itemService.Delete(id);
        
        return "redirect:/list";
    }
}
