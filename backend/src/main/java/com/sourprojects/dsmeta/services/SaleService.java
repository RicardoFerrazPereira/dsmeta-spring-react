package com.sourprojects.dsmeta.services;


import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.sourprojects.dsmeta.entities.Sale;
import com.sourprojects.dsmeta.repositories.SaleRepository;

@Service
public class SaleService {
	
	@Autowired
	private SaleRepository repository;
	
//	public List<Sale>findSales() {
//		return repository.findAll();		
//	}
	
	public Page<Sale> findSales(String minDate, String maxDate, Pageable pageable) {
		
		// Variável com a da de hoje (atual)
		LocalDate today = LocalDate.ofInstant(Instant.now(), ZoneId.systemDefault());
		
		// converter a data de string para LocalDate e se não for informado a data, colocar
		// o a data de 1 ano (365 dias) atrás
		LocalDate min = minDate.equals("") ? today.minusDays(365) : LocalDate.parse(minDate);
		// se a maxDate for igual a vazio ? coloque o "today" 
		// senão coloque LocalDate.parse(maxDate)
		LocalDate max = maxDate.equals("") ? today : LocalDate.parse(maxDate);		
		
		return repository.findSales(min, max, pageable);
		
	}

}
