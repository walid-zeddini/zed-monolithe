package com.zeddini.monolithe.web.rest;

import com.zeddini.monolithe.domain.CarnetCommande;
import com.zeddini.monolithe.repository.CarnetCommandeRepository;
import com.zeddini.monolithe.service.CarnetCommandeService;
import com.zeddini.monolithe.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.zeddini.monolithe.domain.CarnetCommande}.
 */
@RestController
@RequestMapping("/api")
public class CarnetCommandeResource {

    private final Logger log = LoggerFactory.getLogger(CarnetCommandeResource.class);

    private static final String ENTITY_NAME = "carnetCommande";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CarnetCommandeService carnetCommandeService;

    private final CarnetCommandeRepository carnetCommandeRepository;

    public CarnetCommandeResource(CarnetCommandeService carnetCommandeService, CarnetCommandeRepository carnetCommandeRepository) {
        this.carnetCommandeService = carnetCommandeService;
        this.carnetCommandeRepository = carnetCommandeRepository;
    }

    /**
     * {@code POST  /carnet-commandes} : Create a new carnetCommande.
     *
     * @param carnetCommande the carnetCommande to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new carnetCommande, or with status {@code 400 (Bad Request)} if the carnetCommande has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/carnet-commandes")
    public ResponseEntity<CarnetCommande> createCarnetCommande(@Valid @RequestBody CarnetCommande carnetCommande)
        throws URISyntaxException {
        log.debug("REST request to save CarnetCommande : {}", carnetCommande);
        if (carnetCommande.getId() != null) {
            throw new BadRequestAlertException("A new carnetCommande cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CarnetCommande result = carnetCommandeService.save(carnetCommande);
        return ResponseEntity
            .created(new URI("/api/carnet-commandes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /carnet-commandes/:id} : Updates an existing carnetCommande.
     *
     * @param id the id of the carnetCommande to save.
     * @param carnetCommande the carnetCommande to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated carnetCommande,
     * or with status {@code 400 (Bad Request)} if the carnetCommande is not valid,
     * or with status {@code 500 (Internal Server Error)} if the carnetCommande couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/carnet-commandes/{id}")
    public ResponseEntity<CarnetCommande> updateCarnetCommande(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody CarnetCommande carnetCommande
    ) throws URISyntaxException {
        log.debug("REST request to update CarnetCommande : {}, {}", id, carnetCommande);
        if (carnetCommande.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, carnetCommande.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!carnetCommandeRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        CarnetCommande result = carnetCommandeService.update(carnetCommande);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, carnetCommande.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /carnet-commandes/:id} : Partial updates given fields of an existing carnetCommande, field will ignore if it is null
     *
     * @param id the id of the carnetCommande to save.
     * @param carnetCommande the carnetCommande to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated carnetCommande,
     * or with status {@code 400 (Bad Request)} if the carnetCommande is not valid,
     * or with status {@code 404 (Not Found)} if the carnetCommande is not found,
     * or with status {@code 500 (Internal Server Error)} if the carnetCommande couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/carnet-commandes/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<CarnetCommande> partialUpdateCarnetCommande(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody CarnetCommande carnetCommande
    ) throws URISyntaxException {
        log.debug("REST request to partial update CarnetCommande partially : {}, {}", id, carnetCommande);
        if (carnetCommande.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, carnetCommande.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!carnetCommandeRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CarnetCommande> result = carnetCommandeService.partialUpdate(carnetCommande);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, carnetCommande.getId().toString())
        );
    }

    /**
     * {@code GET  /carnet-commandes} : get all the carnetCommandes.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of carnetCommandes in body.
     */
    @GetMapping("/carnet-commandes")
    public ResponseEntity<List<CarnetCommande>> getAllCarnetCommandes(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of CarnetCommandes");
        Page<CarnetCommande> page = carnetCommandeService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /carnet-commandes/:id} : get the "id" carnetCommande.
     *
     * @param id the id of the carnetCommande to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the carnetCommande, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/carnet-commandes/{id}")
    public ResponseEntity<CarnetCommande> getCarnetCommande(@PathVariable Long id) {
        log.debug("REST request to get CarnetCommande : {}", id);
        Optional<CarnetCommande> carnetCommande = carnetCommandeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(carnetCommande);
    }

    /**
     * {@code DELETE  /carnet-commandes/:id} : delete the "id" carnetCommande.
     *
     * @param id the id of the carnetCommande to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/carnet-commandes/{id}")
    public ResponseEntity<Void> deleteCarnetCommande(@PathVariable Long id) {
        log.debug("REST request to delete CarnetCommande : {}", id);
        carnetCommandeService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
