package com.sourprojects.dsmeta.repositories;

import java.time.LocalDate;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.sourprojects.dsmeta.entities.Sale;

@Repository
public interface SaleRepository extends JpaRepository<Sale, Long> {
	
	// função que faz uma pesquisa no banco de dados recebendo
	// as datas como argumentos
	@Query("SELECT obj FROM Sale obj WHERE obj.date BETWEEN :min AND :max ORDER BY obj.amount DESC")
	Page<Sale> findSales(LocalDate min, LocalDate max, Pageable pageable);

}
