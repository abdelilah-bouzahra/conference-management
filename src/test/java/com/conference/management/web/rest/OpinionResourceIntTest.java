package com.conference.management.web.rest;

import com.conference.management.ConferenceManagementApp;

import com.conference.management.domain.Opinion;
import com.conference.management.repository.OpinionRepository;
import com.conference.management.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static com.conference.management.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the OpinionResource REST controller.
 *
 * @see OpinionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ConferenceManagementApp.class)
public class OpinionResourceIntTest {

    private static final String DEFAULT_BODY = "AAAAAAAAAA";
    private static final String UPDATED_BODY = "BBBBBBBBBB";

    private static final Boolean DEFAULT_TYPE = false;
    private static final Boolean UPDATED_TYPE = true;

    @Autowired
    private OpinionRepository opinionRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restOpinionMockMvc;

    private Opinion opinion;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OpinionResource opinionResource = new OpinionResource(opinionRepository);
        this.restOpinionMockMvc = MockMvcBuilders.standaloneSetup(opinionResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Opinion createEntity(EntityManager em) {
        Opinion opinion = new Opinion()
            .body(DEFAULT_BODY)
            .type(DEFAULT_TYPE);
        return opinion;
    }

    @Before
    public void initTest() {
        opinion = createEntity(em);
    }

    @Test
    @Transactional
    public void createOpinion() throws Exception {
        int databaseSizeBeforeCreate = opinionRepository.findAll().size();

        // Create the Opinion
        restOpinionMockMvc.perform(post("/api/opinions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(opinion)))
            .andExpect(status().isCreated());

        // Validate the Opinion in the database
        List<Opinion> opinionList = opinionRepository.findAll();
        assertThat(opinionList).hasSize(databaseSizeBeforeCreate + 1);
        Opinion testOpinion = opinionList.get(opinionList.size() - 1);
        assertThat(testOpinion.getBody()).isEqualTo(DEFAULT_BODY);
        assertThat(testOpinion.isType()).isEqualTo(DEFAULT_TYPE);
    }

    @Test
    @Transactional
    public void createOpinionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = opinionRepository.findAll().size();

        // Create the Opinion with an existing ID
        opinion.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOpinionMockMvc.perform(post("/api/opinions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(opinion)))
            .andExpect(status().isBadRequest());

        // Validate the Opinion in the database
        List<Opinion> opinionList = opinionRepository.findAll();
        assertThat(opinionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllOpinions() throws Exception {
        // Initialize the database
        opinionRepository.saveAndFlush(opinion);

        // Get all the opinionList
        restOpinionMockMvc.perform(get("/api/opinions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(opinion.getId().intValue())))
            .andExpect(jsonPath("$.[*].body").value(hasItem(DEFAULT_BODY.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getOpinion() throws Exception {
        // Initialize the database
        opinionRepository.saveAndFlush(opinion);

        // Get the opinion
        restOpinionMockMvc.perform(get("/api/opinions/{id}", opinion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(opinion.getId().intValue()))
            .andExpect(jsonPath("$.body").value(DEFAULT_BODY.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingOpinion() throws Exception {
        // Get the opinion
        restOpinionMockMvc.perform(get("/api/opinions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOpinion() throws Exception {
        // Initialize the database
        opinionRepository.saveAndFlush(opinion);

        int databaseSizeBeforeUpdate = opinionRepository.findAll().size();

        // Update the opinion
        Opinion updatedOpinion = opinionRepository.findById(opinion.getId()).get();
        // Disconnect from session so that the updates on updatedOpinion are not directly saved in db
        em.detach(updatedOpinion);
        updatedOpinion
            .body(UPDATED_BODY)
            .type(UPDATED_TYPE);

        restOpinionMockMvc.perform(put("/api/opinions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedOpinion)))
            .andExpect(status().isOk());

        // Validate the Opinion in the database
        List<Opinion> opinionList = opinionRepository.findAll();
        assertThat(opinionList).hasSize(databaseSizeBeforeUpdate);
        Opinion testOpinion = opinionList.get(opinionList.size() - 1);
        assertThat(testOpinion.getBody()).isEqualTo(UPDATED_BODY);
        assertThat(testOpinion.isType()).isEqualTo(UPDATED_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingOpinion() throws Exception {
        int databaseSizeBeforeUpdate = opinionRepository.findAll().size();

        // Create the Opinion

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOpinionMockMvc.perform(put("/api/opinions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(opinion)))
            .andExpect(status().isBadRequest());

        // Validate the Opinion in the database
        List<Opinion> opinionList = opinionRepository.findAll();
        assertThat(opinionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteOpinion() throws Exception {
        // Initialize the database
        opinionRepository.saveAndFlush(opinion);

        int databaseSizeBeforeDelete = opinionRepository.findAll().size();

        // Delete the opinion
        restOpinionMockMvc.perform(delete("/api/opinions/{id}", opinion.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Opinion> opinionList = opinionRepository.findAll();
        assertThat(opinionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Opinion.class);
        Opinion opinion1 = new Opinion();
        opinion1.setId(1L);
        Opinion opinion2 = new Opinion();
        opinion2.setId(opinion1.getId());
        assertThat(opinion1).isEqualTo(opinion2);
        opinion2.setId(2L);
        assertThat(opinion1).isNotEqualTo(opinion2);
        opinion1.setId(null);
        assertThat(opinion1).isNotEqualTo(opinion2);
    }
}
