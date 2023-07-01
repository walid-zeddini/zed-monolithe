package com.zeddini.monolithe.service;

import com.zeddini.monolithe.domain.CarnetCommande;
import com.zeddini.monolithe.repository.CarnetCommandeRepository;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link CarnetCommande}.
 */
@Service
@Transactional
public class CarnetCommandeService {

    private final Logger log = LoggerFactory.getLogger(CarnetCommandeService.class);

    private final CarnetCommandeRepository carnetCommandeRepository;

    public CarnetCommandeService(CarnetCommandeRepository carnetCommandeRepository) {
        this.carnetCommandeRepository = carnetCommandeRepository;
    }

    /**
     * Save a carnetCommande.
     *
     * @param carnetCommande the entity to save.
     * @return the persisted entity.
     */
    public CarnetCommande save(CarnetCommande carnetCommande) {
        log.debug("Request to save CarnetCommande : {}", carnetCommande);
        return carnetCommandeRepository.save(carnetCommande);
    }

    /**
     * Update a carnetCommande.
     *
     * @param carnetCommande the entity to save.
     * @return the persisted entity.
     */
    public CarnetCommande update(CarnetCommande carnetCommande) {
        log.debug("Request to update CarnetCommande : {}", carnetCommande);
        return carnetCommandeRepository.save(carnetCommande);
    }

    /**
     * Partially update a carnetCommande.
     *
     * @param carnetCommande the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<CarnetCommande> partialUpdate(CarnetCommande carnetCommande) {
        log.debug("Request to partially update CarnetCommande : {}", carnetCommande);

        return carnetCommandeRepository
            .findById(carnetCommande.getId())
            .map(existingCarnetCommande -> {
                if (carnetCommande.getQte() != null) {
                    existingCarnetCommande.setQte(carnetCommande.getQte());
                }
                if (carnetCommande.getPrixUnitaire() != null) {
                    existingCarnetCommande.setPrixUnitaire(carnetCommande.getPrixUnitaire());
                }
                if (carnetCommande.getPrixTotal() != null) {
                    existingCarnetCommande.setPrixTotal(carnetCommande.getPrixTotal());
                }
                if (carnetCommande.getEtat() != null) {
                    existingCarnetCommande.setEtat(carnetCommande.getEtat());
                }

                return existingCarnetCommande;
            })
            .map(carnetCommandeRepository::save);
    }

    /**
     * Get all the carnetCommandes.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<CarnetCommande> findAll(Pageable pageable) {
        log.debug("Request to get all CarnetCommandes");
        return carnetCommandeRepository.findAll(pageable);
    }

    /**
     * Get one carnetCommande by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<CarnetCommande> findOne(Long id) {
        log.debug("Request to get CarnetCommande : {}", id);
        return carnetCommandeRepository.findById(id);
    }

    /**
     * Delete the carnetCommande by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete CarnetCommande : {}", id);
        carnetCommandeRepository.deleteById(id);
    }
}
