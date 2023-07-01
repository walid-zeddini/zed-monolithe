package com.zeddini.monolithe.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.math.BigDecimal;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A CarnetCommande.
 */
@Entity
@Table(name = "carnet_commande")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CarnetCommande implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "qte", nullable = false)
    private Long qte;

    @NotNull
    @Column(name = "prix_unitaire", precision = 21, scale = 2, nullable = false)
    private BigDecimal prixUnitaire;

    @NotNull
    @Column(name = "prix_total", precision = 21, scale = 2, nullable = false)
    private BigDecimal prixTotal;

    @NotNull
    @Column(name = "etat", nullable = false)
    private Long etat;

    @ManyToOne
    @JsonIgnoreProperties(value = { "carnets", "categorie" }, allowSetters = true)
    private Produit produit;

    @ManyToOne
    @JsonIgnoreProperties(value = { "carnets", "client" }, allowSetters = true)
    private Commande commande;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public CarnetCommande id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getQte() {
        return this.qte;
    }

    public CarnetCommande qte(Long qte) {
        this.setQte(qte);
        return this;
    }

    public void setQte(Long qte) {
        this.qte = qte;
    }

    public BigDecimal getPrixUnitaire() {
        return this.prixUnitaire;
    }

    public CarnetCommande prixUnitaire(BigDecimal prixUnitaire) {
        this.setPrixUnitaire(prixUnitaire);
        return this;
    }

    public void setPrixUnitaire(BigDecimal prixUnitaire) {
        this.prixUnitaire = prixUnitaire;
    }

    public BigDecimal getPrixTotal() {
        return this.prixTotal;
    }

    public CarnetCommande prixTotal(BigDecimal prixTotal) {
        this.setPrixTotal(prixTotal);
        return this;
    }

    public void setPrixTotal(BigDecimal prixTotal) {
        this.prixTotal = prixTotal;
    }

    public Long getEtat() {
        return this.etat;
    }

    public CarnetCommande etat(Long etat) {
        this.setEtat(etat);
        return this;
    }

    public void setEtat(Long etat) {
        this.etat = etat;
    }

    public Produit getProduit() {
        return this.produit;
    }

    public void setProduit(Produit produit) {
        this.produit = produit;
    }

    public CarnetCommande produit(Produit produit) {
        this.setProduit(produit);
        return this;
    }

    public Commande getCommande() {
        return this.commande;
    }

    public void setCommande(Commande commande) {
        this.commande = commande;
    }

    public CarnetCommande commande(Commande commande) {
        this.setCommande(commande);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CarnetCommande)) {
            return false;
        }
        return id != null && id.equals(((CarnetCommande) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CarnetCommande{" +
            "id=" + getId() +
            ", qte=" + getQte() +
            ", prixUnitaire=" + getPrixUnitaire() +
            ", prixTotal=" + getPrixTotal() +
            ", etat=" + getEtat() +
            "}";
    }
}
