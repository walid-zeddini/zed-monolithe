package com.zeddini.monolithe.web.rest;

import static com.zeddini.monolithe.web.rest.TestUtil.sameNumber;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.zeddini.monolithe.IntegrationTest;
import com.zeddini.monolithe.domain.CarnetCommande;
import com.zeddini.monolithe.repository.CarnetCommandeRepository;
import java.math.BigDecimal;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link CarnetCommandeResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CarnetCommandeResourceIT {

    private static final Long DEFAULT_QTE = 1L;
    private static final Long UPDATED_QTE = 2L;

    private static final BigDecimal DEFAULT_PRIX_UNITAIRE = new BigDecimal(1);
    private static final BigDecimal UPDATED_PRIX_UNITAIRE = new BigDecimal(2);

    private static final BigDecimal DEFAULT_PRIX_TOTAL = new BigDecimal(1);
    private static final BigDecimal UPDATED_PRIX_TOTAL = new BigDecimal(2);

    private static final Long DEFAULT_ETAT = 1L;
    private static final Long UPDATED_ETAT = 2L;

    private static final String ENTITY_API_URL = "/api/carnet-commandes";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private CarnetCommandeRepository carnetCommandeRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCarnetCommandeMockMvc;

    private CarnetCommande carnetCommande;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CarnetCommande createEntity(EntityManager em) {
        CarnetCommande carnetCommande = new CarnetCommande()
            .qte(DEFAULT_QTE)
            .prixUnitaire(DEFAULT_PRIX_UNITAIRE)
            .prixTotal(DEFAULT_PRIX_TOTAL)
            .etat(DEFAULT_ETAT);
        return carnetCommande;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CarnetCommande createUpdatedEntity(EntityManager em) {
        CarnetCommande carnetCommande = new CarnetCommande()
            .qte(UPDATED_QTE)
            .prixUnitaire(UPDATED_PRIX_UNITAIRE)
            .prixTotal(UPDATED_PRIX_TOTAL)
            .etat(UPDATED_ETAT);
        return carnetCommande;
    }

    @BeforeEach
    public void initTest() {
        carnetCommande = createEntity(em);
    }

    @Test
    @Transactional
    void createCarnetCommande() throws Exception {
        int databaseSizeBeforeCreate = carnetCommandeRepository.findAll().size();
        // Create the CarnetCommande
        restCarnetCommandeMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(carnetCommande))
            )
            .andExpect(status().isCreated());

        // Validate the CarnetCommande in the database
        List<CarnetCommande> carnetCommandeList = carnetCommandeRepository.findAll();
        assertThat(carnetCommandeList).hasSize(databaseSizeBeforeCreate + 1);
        CarnetCommande testCarnetCommande = carnetCommandeList.get(carnetCommandeList.size() - 1);
        assertThat(testCarnetCommande.getQte()).isEqualTo(DEFAULT_QTE);
        assertThat(testCarnetCommande.getPrixUnitaire()).isEqualByComparingTo(DEFAULT_PRIX_UNITAIRE);
        assertThat(testCarnetCommande.getPrixTotal()).isEqualByComparingTo(DEFAULT_PRIX_TOTAL);
        assertThat(testCarnetCommande.getEtat()).isEqualTo(DEFAULT_ETAT);
    }

    @Test
    @Transactional
    void createCarnetCommandeWithExistingId() throws Exception {
        // Create the CarnetCommande with an existing ID
        carnetCommande.setId(1L);

        int databaseSizeBeforeCreate = carnetCommandeRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCarnetCommandeMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(carnetCommande))
            )
            .andExpect(status().isBadRequest());

        // Validate the CarnetCommande in the database
        List<CarnetCommande> carnetCommandeList = carnetCommandeRepository.findAll();
        assertThat(carnetCommandeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkQteIsRequired() throws Exception {
        int databaseSizeBeforeTest = carnetCommandeRepository.findAll().size();
        // set the field null
        carnetCommande.setQte(null);

        // Create the CarnetCommande, which fails.

        restCarnetCommandeMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(carnetCommande))
            )
            .andExpect(status().isBadRequest());

        List<CarnetCommande> carnetCommandeList = carnetCommandeRepository.findAll();
        assertThat(carnetCommandeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkPrixUnitaireIsRequired() throws Exception {
        int databaseSizeBeforeTest = carnetCommandeRepository.findAll().size();
        // set the field null
        carnetCommande.setPrixUnitaire(null);

        // Create the CarnetCommande, which fails.

        restCarnetCommandeMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(carnetCommande))
            )
            .andExpect(status().isBadRequest());

        List<CarnetCommande> carnetCommandeList = carnetCommandeRepository.findAll();
        assertThat(carnetCommandeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkPrixTotalIsRequired() throws Exception {
        int databaseSizeBeforeTest = carnetCommandeRepository.findAll().size();
        // set the field null
        carnetCommande.setPrixTotal(null);

        // Create the CarnetCommande, which fails.

        restCarnetCommandeMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(carnetCommande))
            )
            .andExpect(status().isBadRequest());

        List<CarnetCommande> carnetCommandeList = carnetCommandeRepository.findAll();
        assertThat(carnetCommandeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkEtatIsRequired() throws Exception {
        int databaseSizeBeforeTest = carnetCommandeRepository.findAll().size();
        // set the field null
        carnetCommande.setEtat(null);

        // Create the CarnetCommande, which fails.

        restCarnetCommandeMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(carnetCommande))
            )
            .andExpect(status().isBadRequest());

        List<CarnetCommande> carnetCommandeList = carnetCommandeRepository.findAll();
        assertThat(carnetCommandeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllCarnetCommandes() throws Exception {
        // Initialize the database
        carnetCommandeRepository.saveAndFlush(carnetCommande);

        // Get all the carnetCommandeList
        restCarnetCommandeMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(carnetCommande.getId().intValue())))
            .andExpect(jsonPath("$.[*].qte").value(hasItem(DEFAULT_QTE.intValue())))
            .andExpect(jsonPath("$.[*].prixUnitaire").value(hasItem(sameNumber(DEFAULT_PRIX_UNITAIRE))))
            .andExpect(jsonPath("$.[*].prixTotal").value(hasItem(sameNumber(DEFAULT_PRIX_TOTAL))))
            .andExpect(jsonPath("$.[*].etat").value(hasItem(DEFAULT_ETAT.intValue())));
    }

    @Test
    @Transactional
    void getCarnetCommande() throws Exception {
        // Initialize the database
        carnetCommandeRepository.saveAndFlush(carnetCommande);

        // Get the carnetCommande
        restCarnetCommandeMockMvc
            .perform(get(ENTITY_API_URL_ID, carnetCommande.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(carnetCommande.getId().intValue()))
            .andExpect(jsonPath("$.qte").value(DEFAULT_QTE.intValue()))
            .andExpect(jsonPath("$.prixUnitaire").value(sameNumber(DEFAULT_PRIX_UNITAIRE)))
            .andExpect(jsonPath("$.prixTotal").value(sameNumber(DEFAULT_PRIX_TOTAL)))
            .andExpect(jsonPath("$.etat").value(DEFAULT_ETAT.intValue()));
    }

    @Test
    @Transactional
    void getNonExistingCarnetCommande() throws Exception {
        // Get the carnetCommande
        restCarnetCommandeMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingCarnetCommande() throws Exception {
        // Initialize the database
        carnetCommandeRepository.saveAndFlush(carnetCommande);

        int databaseSizeBeforeUpdate = carnetCommandeRepository.findAll().size();

        // Update the carnetCommande
        CarnetCommande updatedCarnetCommande = carnetCommandeRepository.findById(carnetCommande.getId()).get();
        // Disconnect from session so that the updates on updatedCarnetCommande are not directly saved in db
        em.detach(updatedCarnetCommande);
        updatedCarnetCommande.qte(UPDATED_QTE).prixUnitaire(UPDATED_PRIX_UNITAIRE).prixTotal(UPDATED_PRIX_TOTAL).etat(UPDATED_ETAT);

        restCarnetCommandeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCarnetCommande.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedCarnetCommande))
            )
            .andExpect(status().isOk());

        // Validate the CarnetCommande in the database
        List<CarnetCommande> carnetCommandeList = carnetCommandeRepository.findAll();
        assertThat(carnetCommandeList).hasSize(databaseSizeBeforeUpdate);
        CarnetCommande testCarnetCommande = carnetCommandeList.get(carnetCommandeList.size() - 1);
        assertThat(testCarnetCommande.getQte()).isEqualTo(UPDATED_QTE);
        assertThat(testCarnetCommande.getPrixUnitaire()).isEqualByComparingTo(UPDATED_PRIX_UNITAIRE);
        assertThat(testCarnetCommande.getPrixTotal()).isEqualByComparingTo(UPDATED_PRIX_TOTAL);
        assertThat(testCarnetCommande.getEtat()).isEqualTo(UPDATED_ETAT);
    }

    @Test
    @Transactional
    void putNonExistingCarnetCommande() throws Exception {
        int databaseSizeBeforeUpdate = carnetCommandeRepository.findAll().size();
        carnetCommande.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCarnetCommandeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, carnetCommande.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(carnetCommande))
            )
            .andExpect(status().isBadRequest());

        // Validate the CarnetCommande in the database
        List<CarnetCommande> carnetCommandeList = carnetCommandeRepository.findAll();
        assertThat(carnetCommandeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCarnetCommande() throws Exception {
        int databaseSizeBeforeUpdate = carnetCommandeRepository.findAll().size();
        carnetCommande.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCarnetCommandeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(carnetCommande))
            )
            .andExpect(status().isBadRequest());

        // Validate the CarnetCommande in the database
        List<CarnetCommande> carnetCommandeList = carnetCommandeRepository.findAll();
        assertThat(carnetCommandeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCarnetCommande() throws Exception {
        int databaseSizeBeforeUpdate = carnetCommandeRepository.findAll().size();
        carnetCommande.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCarnetCommandeMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(carnetCommande)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CarnetCommande in the database
        List<CarnetCommande> carnetCommandeList = carnetCommandeRepository.findAll();
        assertThat(carnetCommandeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCarnetCommandeWithPatch() throws Exception {
        // Initialize the database
        carnetCommandeRepository.saveAndFlush(carnetCommande);

        int databaseSizeBeforeUpdate = carnetCommandeRepository.findAll().size();

        // Update the carnetCommande using partial update
        CarnetCommande partialUpdatedCarnetCommande = new CarnetCommande();
        partialUpdatedCarnetCommande.setId(carnetCommande.getId());

        partialUpdatedCarnetCommande.qte(UPDATED_QTE).prixUnitaire(UPDATED_PRIX_UNITAIRE);

        restCarnetCommandeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCarnetCommande.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCarnetCommande))
            )
            .andExpect(status().isOk());

        // Validate the CarnetCommande in the database
        List<CarnetCommande> carnetCommandeList = carnetCommandeRepository.findAll();
        assertThat(carnetCommandeList).hasSize(databaseSizeBeforeUpdate);
        CarnetCommande testCarnetCommande = carnetCommandeList.get(carnetCommandeList.size() - 1);
        assertThat(testCarnetCommande.getQte()).isEqualTo(UPDATED_QTE);
        assertThat(testCarnetCommande.getPrixUnitaire()).isEqualByComparingTo(UPDATED_PRIX_UNITAIRE);
        assertThat(testCarnetCommande.getPrixTotal()).isEqualByComparingTo(DEFAULT_PRIX_TOTAL);
        assertThat(testCarnetCommande.getEtat()).isEqualTo(DEFAULT_ETAT);
    }

    @Test
    @Transactional
    void fullUpdateCarnetCommandeWithPatch() throws Exception {
        // Initialize the database
        carnetCommandeRepository.saveAndFlush(carnetCommande);

        int databaseSizeBeforeUpdate = carnetCommandeRepository.findAll().size();

        // Update the carnetCommande using partial update
        CarnetCommande partialUpdatedCarnetCommande = new CarnetCommande();
        partialUpdatedCarnetCommande.setId(carnetCommande.getId());

        partialUpdatedCarnetCommande.qte(UPDATED_QTE).prixUnitaire(UPDATED_PRIX_UNITAIRE).prixTotal(UPDATED_PRIX_TOTAL).etat(UPDATED_ETAT);

        restCarnetCommandeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCarnetCommande.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCarnetCommande))
            )
            .andExpect(status().isOk());

        // Validate the CarnetCommande in the database
        List<CarnetCommande> carnetCommandeList = carnetCommandeRepository.findAll();
        assertThat(carnetCommandeList).hasSize(databaseSizeBeforeUpdate);
        CarnetCommande testCarnetCommande = carnetCommandeList.get(carnetCommandeList.size() - 1);
        assertThat(testCarnetCommande.getQte()).isEqualTo(UPDATED_QTE);
        assertThat(testCarnetCommande.getPrixUnitaire()).isEqualByComparingTo(UPDATED_PRIX_UNITAIRE);
        assertThat(testCarnetCommande.getPrixTotal()).isEqualByComparingTo(UPDATED_PRIX_TOTAL);
        assertThat(testCarnetCommande.getEtat()).isEqualTo(UPDATED_ETAT);
    }

    @Test
    @Transactional
    void patchNonExistingCarnetCommande() throws Exception {
        int databaseSizeBeforeUpdate = carnetCommandeRepository.findAll().size();
        carnetCommande.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCarnetCommandeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, carnetCommande.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(carnetCommande))
            )
            .andExpect(status().isBadRequest());

        // Validate the CarnetCommande in the database
        List<CarnetCommande> carnetCommandeList = carnetCommandeRepository.findAll();
        assertThat(carnetCommandeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCarnetCommande() throws Exception {
        int databaseSizeBeforeUpdate = carnetCommandeRepository.findAll().size();
        carnetCommande.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCarnetCommandeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(carnetCommande))
            )
            .andExpect(status().isBadRequest());

        // Validate the CarnetCommande in the database
        List<CarnetCommande> carnetCommandeList = carnetCommandeRepository.findAll();
        assertThat(carnetCommandeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCarnetCommande() throws Exception {
        int databaseSizeBeforeUpdate = carnetCommandeRepository.findAll().size();
        carnetCommande.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCarnetCommandeMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(carnetCommande))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the CarnetCommande in the database
        List<CarnetCommande> carnetCommandeList = carnetCommandeRepository.findAll();
        assertThat(carnetCommandeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCarnetCommande() throws Exception {
        // Initialize the database
        carnetCommandeRepository.saveAndFlush(carnetCommande);

        int databaseSizeBeforeDelete = carnetCommandeRepository.findAll().size();

        // Delete the carnetCommande
        restCarnetCommandeMockMvc
            .perform(delete(ENTITY_API_URL_ID, carnetCommande.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CarnetCommande> carnetCommandeList = carnetCommandeRepository.findAll();
        assertThat(carnetCommandeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
