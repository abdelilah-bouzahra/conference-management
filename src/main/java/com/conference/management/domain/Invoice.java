package com.conference.management.domain;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A Invoice.
 */
@Entity
@Table(name = "invoice")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Invoice implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "date_invoice")
    private Instant dateInvoice;

    @Column(name = "sum")
    private Float sum;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDateInvoice() {
        return dateInvoice;
    }

    public Invoice dateInvoice(Instant dateInvoice) {
        this.dateInvoice = dateInvoice;
        return this;
    }

    public void setDateInvoice(Instant dateInvoice) {
        this.dateInvoice = dateInvoice;
    }

    public Float getSum() {
        return sum;
    }

    public Invoice sum(Float sum) {
        this.sum = sum;
        return this;
    }

    public void setSum(Float sum) {
        this.sum = sum;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Invoice invoice = (Invoice) o;
        if (invoice.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), invoice.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Invoice{" +
            "id=" + getId() +
            ", dateInvoice='" + getDateInvoice() + "'" +
            ", sum=" + getSum() +
            "}";
    }
}
