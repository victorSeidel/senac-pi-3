package com.victor.pi3.repository;

import com.victor.pi3.model.Withdraw;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WithdrawRepository extends JpaRepository<Withdraw, Integer> { }
