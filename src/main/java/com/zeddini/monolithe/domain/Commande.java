package com.zeddini.monolithe.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Commande.
 */
@Entity
@Table(name = "commande")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Commande implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(min = 2, max = 30)
    @Column(name = "numero", length = 30, nullable = false)
    private String numero;

    @NotNull
    @Column(name = "date", nullable = false)
    private LocalDate date;

    @NotNull
    @Column(name = "prix_total", precision = 21, scale = 2, nullable = false)
    private BigDecimal prixTotal;

    @NotNull
    @Column(name = "etat", nullable = false)
    private Long etat;

    @OneToMany(mappedBy = "commande")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "produit", "commande" }, allowSetters = true)
    private Set<CarnetCommande> carnets = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "commandes" }, allowSetters = true)
    private Client client;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Commande id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumero() {
        return this.numero;
    }

    public Commande numero(String numero) {
        this.setNumero(numero);
        return this;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public LocalDate getDate() {
        return this.date;
    }

    public Commande date(LocalDate date) {
        this.setDate(date);
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public BigDecimal getPrixTotal() {
        return this.prixTotal;
    }

    public Commande prixTotal(BigDecimal prixTotal) {
        this.setPrixTotal(prixTotal);
        return this;
    }

    public void setPrixTotal(BigDecimal prixTotal) {
        this.prixTotal = prixTotal;
    }

    public Long getEtat() {
        return this.etat;
    }

    public Commande etat(Long etat) {
        this.setEtat(etat);
        return this;
    }

    public void setEtat(Long etat) {
        this.etat = etat;
    }

    public Set<CarnetCommande> getCarnets() {
        return this.carnets;
    }

    public void setCarnets(Set<CarnetCommande> carnetCommandes) {
        if (this.carnets != null) {
            this.carnets.forEach(i -> i.setCommande(null));
        }
        if (carnetCommandes != null) {
            carnetCommandes.forEach(i -> i.setCommande(this));
        }
        this.carnets = carnetCommandes;
    }

    public Commande carnets(Set<CarnetCommande> carnetCommandes) {
        this.setCarnets(carnetCommandes);
        return this;
    }

    public Commande addCarnet(CarnetCommande carnetCommande) {
        this.carnets.add(carnetCommande);
        carnetCommande.setCommande(this);
        return this;
    }

    public Commande removeCarnet(CarnetCommande carnetCommande) {
        this.carnets.remove(carnetCommande);
        carnetCommande.setCommande(null);
        return this;
    }

    public Client getClient() {
        return this.client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Commande client(Client client) {
        this.setClient(client);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Commande)) {
            return false;
        }
        return id != null && id.equals(((Commande) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Commande{" +
            "id=" + getId() +
            ", numero='" + getNumero() + "'" +
            ", date='" + getDate() + "'" +
            ", prixTotal=" + getPrixTotal() +
            ", etat=" + getEtat() +
            "}";
    }
}
