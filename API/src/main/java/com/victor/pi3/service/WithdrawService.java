package com.victor.pi3.service;

import com.victor.pi3.model.Withdraw;
import com.victor.pi3.repository.WithdrawRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WithdrawService 
{
    @Autowired
    private WithdrawRepository withdrawRepository;
    
    public Withdraw Save(Withdraw withdraw)
    {
        return withdrawRepository.save(withdraw);
    }
    
    public List<Withdraw> ListAll()
    {
        return withdrawRepository.findAll();
    }
    
    public Withdraw ListById(int id)
    {
        return withdrawRepository.findById(id).orElse(null);
    }
    
    public void Delete(int id)
    {
        withdrawRepository.deleteById(id);
    }
}
