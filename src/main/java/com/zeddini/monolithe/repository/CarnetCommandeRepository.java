package com.zeddini.monolithe.repository;

import com.zeddini.monolithe.domain.CarnetCommande;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the CarnetCommande entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CarnetCommandeRepository extends JpaRepository<CarnetCommande, Long> {}
