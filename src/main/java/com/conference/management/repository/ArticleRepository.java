package com.conference.management.repository;

import com.conference.management.domain.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Article entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {

    @Query("select article from Article article where article.user.login = ?#{principal.username}")
    List<Article> findByUserIsCurrentUser();

    @Query(value = "select distinct article from Article article left join fetch article.authors left join fetch article.domains",
        countQuery = "select count(distinct article) from Article article")
    Page<Article> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct article from Article article left join fetch article.authors left join fetch article.domains")
    List<Article> findAllWithEagerRelationships();

    @Query(value = "select distinct article from Article article left join fetch article.authors left join fetch article.domains where article.accepted =:accepted")
    List<Article> findByAcceptedAllWithEagerRelationships(@Param("accepted") boolean accepted);

    @Query("select article from Article article left join fetch article.authors left join fetch article.domains where article.id =:id")
    Optional<Article> findOneWithEagerRelationships(@Param("id") Long id);

}
