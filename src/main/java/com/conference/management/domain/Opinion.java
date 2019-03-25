package com.conference.management.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Opinion.
 */
@Entity
@Table(name = "opinion")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Opinion implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Size(max = 500)
    @Column(name = "jhi_body", length = 500)
    private String body;

    @Column(name = "jhi_type")
    private Boolean type;

    @ManyToOne
    @JsonIgnoreProperties("opinions")
    private User user;

    @ManyToOne
    @JsonIgnoreProperties("opinions")
    private Article article;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBody() {
        return body;
    }

    public Opinion body(String body) {
        this.body = body;
        return this;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public Boolean isType() {
        return type;
    }

    public Opinion type(Boolean type) {
        this.type = type;
        return this;
    }

    public void setType(Boolean type) {
        this.type = type;
    }

    public User getUser() {
        return user;
    }

    public Opinion user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Article getArticle() {
        return article;
    }

    public Opinion article(Article article) {
        this.article = article;
        return this;
    }

    public void setArticle(Article article) {
        this.article = article;
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
        Opinion opinion = (Opinion) o;
        if (opinion.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), opinion.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Opinion{" +
            "id=" + getId() +
            ", body='" + getBody() + "'" +
            ", type='" + isType() + "'" +
            "}";
    }
}
