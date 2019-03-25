package com.conference.management.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(com.conference.management.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(com.conference.management.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(com.conference.management.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(com.conference.management.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(com.conference.management.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(com.conference.management.domain.Country.class.getName(), jcacheConfiguration);
            cm.createCache(com.conference.management.domain.Country.class.getName() + ".cities", jcacheConfiguration);
            cm.createCache(com.conference.management.domain.City.class.getName(), jcacheConfiguration);
            cm.createCache(com.conference.management.domain.City.class.getName() + ".hotels", jcacheConfiguration);
            cm.createCache(com.conference.management.domain.Hotel.class.getName(), jcacheConfiguration);
            cm.createCache(com.conference.management.domain.Hotel.class.getName() + ".rooms", jcacheConfiguration);
            cm.createCache(com.conference.management.domain.Room.class.getName(), jcacheConfiguration);
            cm.createCache(com.conference.management.domain.Invoice.class.getName(), jcacheConfiguration);
            cm.createCache(com.conference.management.domain.Booking.class.getName(), jcacheConfiguration);
            cm.createCache(com.conference.management.domain.Domain.class.getName(), jcacheConfiguration);
            cm.createCache(com.conference.management.domain.Domain.class.getName() + ".users", jcacheConfiguration);
            cm.createCache(com.conference.management.domain.Domain.class.getName() + ".articles", jcacheConfiguration);
            cm.createCache(com.conference.management.domain.Conference.class.getName(), jcacheConfiguration);
            cm.createCache(com.conference.management.domain.Conference.class.getName() + ".articles", jcacheConfiguration);
            cm.createCache(com.conference.management.domain.Article.class.getName(), jcacheConfiguration);
            cm.createCache(com.conference.management.domain.Article.class.getName() + ".users", jcacheConfiguration);
            cm.createCache(com.conference.management.domain.Article.class.getName() + ".domains", jcacheConfiguration);
            cm.createCache(com.conference.management.domain.Role.class.getName(), jcacheConfiguration);
            cm.createCache(com.conference.management.domain.Participation.class.getName(), jcacheConfiguration);
            cm.createCache(com.conference.management.domain.Opinion.class.getName(), jcacheConfiguration);
            cm.createCache(com.conference.management.domain.Note.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
