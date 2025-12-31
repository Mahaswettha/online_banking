package com.example.bankingproject.service;


import java.util.List;

import org.springframework.stereotype.Service;

import com.example.bankingproject.model.Account;
import com.example.bankingproject.model.Transaction;
import com.example.bankingproject.repository.AccountRepository;
import com.example.bankingproject.repository.TransactionRepository;

@Service
public class TransactionService {

    private final AccountRepository accountRepository;
    private final TransactionRepository transactionRepository;

    public TransactionService(AccountRepository accountRepository,
             TransactionRepository transactionRepository) {
        this.accountRepository = accountRepository;
        this.transactionRepository = transactionRepository;
    }

    public Account deposit(Long accountId, Double amount, String description) {
        if (amount <= 0) throw new RuntimeException("Amount must be greater than 0");
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        account.setBalance(account.getBalance() + amount);
        accountRepository.save(account);

        Transaction tx = new Transaction();
        tx.setAccountId(accountId);
        tx.setAmount(amount);
        tx.setTransactionType("DEPOSIT");
        tx.setDescription(description);
        transactionRepository.save(tx);

        return account;
    }

    public Account transfer(Long fromAccountId, Long toAccountId, Double amount, String description) {
        if (fromAccountId.equals(toAccountId))
            throw new RuntimeException("Cannot transfer to the same account");
        if (amount <= 0) throw new RuntimeException("Amount must be greater than 0");

        Account from = accountRepository.findById(fromAccountId)
                .orElseThrow(() -> new RuntimeException("Source account not found"));
        Account to = accountRepository.findById(toAccountId)
                .orElseThrow(() -> new RuntimeException("Recipient account not found"));

        if (from.getBalance() - amount < 500)
            throw new RuntimeException("Insufficient funds. Minimum balance 500 must be maintained.");

        from.setBalance(from.getBalance() - amount);
        to.setBalance(to.getBalance() + amount);

        accountRepository.save(from);
        accountRepository.save(to);

        Transaction tx = new Transaction();
        tx.setAccountId(fromAccountId);
        tx.setRecipientAccountId(toAccountId);
        tx.setAmount(amount);
        tx.setTransactionType("TRANSFER");
        tx.setDescription(description);
        transactionRepository.save(tx);

        return from;
    }

    public List<Transaction> getTransactionHistory(Long accountId) {
        return transactionRepository.findByAccountIdOrderByTransactionDateDesc(accountId);
    }
}
