package com.example.bankingproject.repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.bankingproject.model.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByAccountIdOrderByTransactionDateDesc(Long accountId);
}

