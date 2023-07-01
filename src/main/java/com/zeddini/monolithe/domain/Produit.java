package com.zeddini.monolithe.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Produit.
 */
@Entity
@Table(name = "produit")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Produit implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(max = 40)
    @Column(name = "code", length = 40, nullable = false)
    private String code;

    @NotNull
    @Size(max = 70)
    @Column(name = "marque", length = 70, nullable = false)
    private String marque;

    @NotNull
    @Size(max = 100)
    @Column(name = "modele", length = 100, nullable = false)
    private String modele;

    @NotNull
    @Size(max = 100)
    @Column(name = "caracteristiques", length = 100, nullable = false)
    private String caracteristiques;

    @NotNull
    @Column(name = "prix_unitaire", precision = 21, scale = 2, nullable = false)
    private BigDecimal prixUnitaire;

    @NotNull
    @Column(name = "quantite", nullable = false)
    private Long quantite;

    @OneToMany(mappedBy = "produit")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "produit", "commande" }, allowSetters = true)
    private Set<CarnetCommande> carnets = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "produits" }, allowSetters = true)
    private Categorie categorie;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Produit id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return this.code;
    }

    public Produit code(String code) {
        this.setCode(code);
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMarque() {
        return this.marque;
    }

    public Produit marque(String marque) {
        this.setMarque(marque);
        return this;
    }

    public void setMarque(String marque) {
        this.marque = marque;
    }

    public String getModele() {
        return this.modele;
    }

    public Produit modele(String modele) {
        this.setModele(modele);
        return this;
    }

    public void setModele(String modele) {
        this.modele = modele;
    }

    public String getCaracteristiques() {
        return this.caracteristiques;
    }

    public Produit caracteristiques(String caracteristiques) {
        this.setCaracteristiques(caracteristiques);
        return this;
    }

    public void setCaracteristiques(String caracteristiques) {
        this.caracteristiques = caracteristiques;
    }

    public BigDecimal getPrixUnitaire() {
        return this.prixUnitaire;
    }

    public Produit prixUnitaire(BigDecimal prixUnitaire) {
        this.setPrixUnitaire(prixUnitaire);
        return this;
    }

    public void setPrixUnitaire(BigDecimal prixUnitaire) {
        this.prixUnitaire = prixUnitaire;
    }

    public Long getQuantite() {
        return this.quantite;
    }

    public Produit quantite(Long quantite) {
        this.setQuantite(quantite);
        return this;
    }

    public void setQuantite(Long quantite) {
        this.quantite = quantite;
    }

    public Set<CarnetCommande> getCarnets() {
        return this.carnets;
    }

    public void setCarnets(Set<CarnetCommande> carnetCommandes) {
        if (this.carnets != null) {
            this.carnets.forEach(i -> i.setProduit(null));
        }
        if (carnetCommandes != null) {
            carnetCommandes.forEach(i -> i.setProduit(this));
        }
        this.carnets = carnetCommandes;
    }

    public Produit carnets(Set<CarnetCommande> carnetCommandes) {
        this.setCarnets(carnetCommandes);
        return this;
    }

    public Produit addCarnet(CarnetCommande carnetCommande) {
        this.carnets.add(carnetCommande);
        carnetCommande.setProduit(this);
        return this;
    }

    public Produit removeCarnet(CarnetCommande carnetCommande) {
        this.carnets.remove(carnetCommande);
        carnetCommande.setProduit(null);
        return this;
    }

    public Categorie getCategorie() {
        return this.categorie;
    }

    public void setCategorie(Categorie categorie) {
        this.categorie = categorie;
    }

    public Produit categorie(Categorie categorie) {
        this.setCategorie(categorie);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Produit)) {
            return false;
        }
        return id != null && id.equals(((Produit) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Produit{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", marque='" + getMarque() + "'" +
            ", modele='" + getModele() + "'" +
            ", caracteristiques='" + getCaracteristiques() + "'" +
            ", prixUnitaire=" + getPrixUnitaire() +
            ", quantite=" + getQuantite() +
            "}";
    }
}
