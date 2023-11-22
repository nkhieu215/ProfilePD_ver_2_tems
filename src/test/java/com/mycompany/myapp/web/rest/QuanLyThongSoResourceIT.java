package com.mycompany.myapp.web.rest;

import static com.mycompany.myapp.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.QuanLyThongSo;
import com.mycompany.myapp.repository.QuanLyThongSoRepository;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
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
 * Integration tests for the {@link QuanLyThongSoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class QuanLyThongSoResourceIT {

    private static final String DEFAULT_MA_THONG_SO = "AAAAAAAAAA";
    private static final String UPDATED_MA_THONG_SO = "BBBBBBBBBB";

    private static final String DEFAULT_TEN_THONG_SO = "AAAAAAAAAA";
    private static final String UPDATED_TEN_THONG_SO = "BBBBBBBBBB";

    private static final String DEFAULT_MO_TA = "AAAAAAAAAA";
    private static final String UPDATED_MO_TA = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_NGAY_TAO = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_NGAY_TAO = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_NGAY_UPDATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_NGAY_UPDATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_UPDATE_BY = "AAAAAAAAAA";
    private static final String UPDATED_UPDATE_BY = "BBBBBBBBBB";

    private static final String DEFAULT_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_STATUS = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/quan-ly-thong-sos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private QuanLyThongSoRepository quanLyThongSoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restQuanLyThongSoMockMvc;

    private QuanLyThongSo quanLyThongSo;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static QuanLyThongSo createEntity(EntityManager em) {
        QuanLyThongSo quanLyThongSo = new QuanLyThongSo()
            .maThongSo(DEFAULT_MA_THONG_SO)
            .tenThongSo(DEFAULT_TEN_THONG_SO)
            .moTa(DEFAULT_MO_TA)
            .ngayTao(DEFAULT_NGAY_TAO)
            .ngayUpdate(DEFAULT_NGAY_UPDATE)
            .updateBy(DEFAULT_UPDATE_BY)
            .status(DEFAULT_STATUS);
        return quanLyThongSo;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static QuanLyThongSo createUpdatedEntity(EntityManager em) {
        QuanLyThongSo quanLyThongSo = new QuanLyThongSo()
            .maThongSo(UPDATED_MA_THONG_SO)
            .tenThongSo(UPDATED_TEN_THONG_SO)
            .moTa(UPDATED_MO_TA)
            .ngayTao(UPDATED_NGAY_TAO)
            .ngayUpdate(UPDATED_NGAY_UPDATE)
            .updateBy(UPDATED_UPDATE_BY)
            .status(UPDATED_STATUS);
        return quanLyThongSo;
    }

    @BeforeEach
    public void initTest() {
        quanLyThongSo = createEntity(em);
    }

    @Test
    @Transactional
    void createQuanLyThongSo() throws Exception {
        int databaseSizeBeforeCreate = quanLyThongSoRepository.findAll().size();
        // Create the QuanLyThongSo
        restQuanLyThongSoMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(quanLyThongSo))
            )
            .andExpect(status().isCreated());

        // Validate the QuanLyThongSo in the database
        List<QuanLyThongSo> quanLyThongSoList = quanLyThongSoRepository.findAll();
        assertThat(quanLyThongSoList).hasSize(databaseSizeBeforeCreate + 1);
        QuanLyThongSo testQuanLyThongSo = quanLyThongSoList.get(quanLyThongSoList.size() - 1);
        assertThat(testQuanLyThongSo.getMaThongSo()).isEqualTo(DEFAULT_MA_THONG_SO);
        assertThat(testQuanLyThongSo.getTenThongSo()).isEqualTo(DEFAULT_TEN_THONG_SO);
        assertThat(testQuanLyThongSo.getMoTa()).isEqualTo(DEFAULT_MO_TA);
        assertThat(testQuanLyThongSo.getNgayTao()).isEqualTo(DEFAULT_NGAY_TAO);
        assertThat(testQuanLyThongSo.getNgayUpdate()).isEqualTo(DEFAULT_NGAY_UPDATE);
        assertThat(testQuanLyThongSo.getUpdateBy()).isEqualTo(DEFAULT_UPDATE_BY);
        assertThat(testQuanLyThongSo.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    void createQuanLyThongSoWithExistingId() throws Exception {
        // Create the QuanLyThongSo with an existing ID
        quanLyThongSo.setId(1L);

        int databaseSizeBeforeCreate = quanLyThongSoRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restQuanLyThongSoMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(quanLyThongSo))
            )
            .andExpect(status().isBadRequest());

        // Validate the QuanLyThongSo in the database
        List<QuanLyThongSo> quanLyThongSoList = quanLyThongSoRepository.findAll();
        assertThat(quanLyThongSoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllQuanLyThongSos() throws Exception {
        // Initialize the database
        quanLyThongSoRepository.saveAndFlush(quanLyThongSo);

        // Get all the quanLyThongSoList
        restQuanLyThongSoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(quanLyThongSo.getId().intValue())))
            .andExpect(jsonPath("$.[*].maThongSo").value(hasItem(DEFAULT_MA_THONG_SO)))
            .andExpect(jsonPath("$.[*].tenThongSo").value(hasItem(DEFAULT_TEN_THONG_SO)))
            .andExpect(jsonPath("$.[*].moTa").value(hasItem(DEFAULT_MO_TA)))
            .andExpect(jsonPath("$.[*].ngayTao").value(hasItem(sameInstant(DEFAULT_NGAY_TAO))))
            .andExpect(jsonPath("$.[*].ngayUpdate").value(hasItem(sameInstant(DEFAULT_NGAY_UPDATE))))
            .andExpect(jsonPath("$.[*].updateBy").value(hasItem(DEFAULT_UPDATE_BY)))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS)));
    }

    @Test
    @Transactional
    void getQuanLyThongSo() throws Exception {
        // Initialize the database
        quanLyThongSoRepository.saveAndFlush(quanLyThongSo);

        // Get the quanLyThongSo
        restQuanLyThongSoMockMvc
            .perform(get(ENTITY_API_URL_ID, quanLyThongSo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(quanLyThongSo.getId().intValue()))
            .andExpect(jsonPath("$.maThongSo").value(DEFAULT_MA_THONG_SO))
            .andExpect(jsonPath("$.tenThongSo").value(DEFAULT_TEN_THONG_SO))
            .andExpect(jsonPath("$.moTa").value(DEFAULT_MO_TA))
            .andExpect(jsonPath("$.ngayTao").value(sameInstant(DEFAULT_NGAY_TAO)))
            .andExpect(jsonPath("$.ngayUpdate").value(sameInstant(DEFAULT_NGAY_UPDATE)))
            .andExpect(jsonPath("$.updateBy").value(DEFAULT_UPDATE_BY))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS));
    }

    @Test
    @Transactional
    void getNonExistingQuanLyThongSo() throws Exception {
        // Get the quanLyThongSo
        restQuanLyThongSoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewQuanLyThongSo() throws Exception {
        // Initialize the database
        quanLyThongSoRepository.saveAndFlush(quanLyThongSo);

        int databaseSizeBeforeUpdate = quanLyThongSoRepository.findAll().size();

        // Update the quanLyThongSo
        QuanLyThongSo updatedQuanLyThongSo = quanLyThongSoRepository.findById(quanLyThongSo.getId()).get();
        // Disconnect from session so that the updates on updatedQuanLyThongSo are not directly saved in db
        em.detach(updatedQuanLyThongSo);
        updatedQuanLyThongSo
            .maThongSo(UPDATED_MA_THONG_SO)
            .tenThongSo(UPDATED_TEN_THONG_SO)
            .moTa(UPDATED_MO_TA)
            .ngayTao(UPDATED_NGAY_TAO)
            .ngayUpdate(UPDATED_NGAY_UPDATE)
            .updateBy(UPDATED_UPDATE_BY)
            .status(UPDATED_STATUS);

        restQuanLyThongSoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedQuanLyThongSo.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedQuanLyThongSo))
            )
            .andExpect(status().isOk());

        // Validate the QuanLyThongSo in the database
        List<QuanLyThongSo> quanLyThongSoList = quanLyThongSoRepository.findAll();
        assertThat(quanLyThongSoList).hasSize(databaseSizeBeforeUpdate);
        QuanLyThongSo testQuanLyThongSo = quanLyThongSoList.get(quanLyThongSoList.size() - 1);
        assertThat(testQuanLyThongSo.getMaThongSo()).isEqualTo(UPDATED_MA_THONG_SO);
        assertThat(testQuanLyThongSo.getTenThongSo()).isEqualTo(UPDATED_TEN_THONG_SO);
        assertThat(testQuanLyThongSo.getMoTa()).isEqualTo(UPDATED_MO_TA);
        assertThat(testQuanLyThongSo.getNgayTao()).isEqualTo(UPDATED_NGAY_TAO);
        assertThat(testQuanLyThongSo.getNgayUpdate()).isEqualTo(UPDATED_NGAY_UPDATE);
        assertThat(testQuanLyThongSo.getUpdateBy()).isEqualTo(UPDATED_UPDATE_BY);
        assertThat(testQuanLyThongSo.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    void putNonExistingQuanLyThongSo() throws Exception {
        int databaseSizeBeforeUpdate = quanLyThongSoRepository.findAll().size();
        quanLyThongSo.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restQuanLyThongSoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, quanLyThongSo.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(quanLyThongSo))
            )
            .andExpect(status().isBadRequest());

        // Validate the QuanLyThongSo in the database
        List<QuanLyThongSo> quanLyThongSoList = quanLyThongSoRepository.findAll();
        assertThat(quanLyThongSoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchQuanLyThongSo() throws Exception {
        int databaseSizeBeforeUpdate = quanLyThongSoRepository.findAll().size();
        quanLyThongSo.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restQuanLyThongSoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(quanLyThongSo))
            )
            .andExpect(status().isBadRequest());

        // Validate the QuanLyThongSo in the database
        List<QuanLyThongSo> quanLyThongSoList = quanLyThongSoRepository.findAll();
        assertThat(quanLyThongSoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamQuanLyThongSo() throws Exception {
        int databaseSizeBeforeUpdate = quanLyThongSoRepository.findAll().size();
        quanLyThongSo.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restQuanLyThongSoMockMvc
            .perform(
                put(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(quanLyThongSo))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the QuanLyThongSo in the database
        List<QuanLyThongSo> quanLyThongSoList = quanLyThongSoRepository.findAll();
        assertThat(quanLyThongSoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateQuanLyThongSoWithPatch() throws Exception {
        // Initialize the database
        quanLyThongSoRepository.saveAndFlush(quanLyThongSo);

        int databaseSizeBeforeUpdate = quanLyThongSoRepository.findAll().size();

        // Update the quanLyThongSo using partial update
        QuanLyThongSo partialUpdatedQuanLyThongSo = new QuanLyThongSo();
        partialUpdatedQuanLyThongSo.setId(quanLyThongSo.getId());

        partialUpdatedQuanLyThongSo
            .maThongSo(UPDATED_MA_THONG_SO)
            .moTa(UPDATED_MO_TA)
            .ngayTao(UPDATED_NGAY_TAO)
            .ngayUpdate(UPDATED_NGAY_UPDATE)
            .updateBy(UPDATED_UPDATE_BY);

        restQuanLyThongSoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedQuanLyThongSo.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedQuanLyThongSo))
            )
            .andExpect(status().isOk());

        // Validate the QuanLyThongSo in the database
        List<QuanLyThongSo> quanLyThongSoList = quanLyThongSoRepository.findAll();
        assertThat(quanLyThongSoList).hasSize(databaseSizeBeforeUpdate);
        QuanLyThongSo testQuanLyThongSo = quanLyThongSoList.get(quanLyThongSoList.size() - 1);
        assertThat(testQuanLyThongSo.getMaThongSo()).isEqualTo(UPDATED_MA_THONG_SO);
        assertThat(testQuanLyThongSo.getTenThongSo()).isEqualTo(DEFAULT_TEN_THONG_SO);
        assertThat(testQuanLyThongSo.getMoTa()).isEqualTo(UPDATED_MO_TA);
        assertThat(testQuanLyThongSo.getNgayTao()).isEqualTo(UPDATED_NGAY_TAO);
        assertThat(testQuanLyThongSo.getNgayUpdate()).isEqualTo(UPDATED_NGAY_UPDATE);
        assertThat(testQuanLyThongSo.getUpdateBy()).isEqualTo(UPDATED_UPDATE_BY);
        assertThat(testQuanLyThongSo.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    void fullUpdateQuanLyThongSoWithPatch() throws Exception {
        // Initialize the database
        quanLyThongSoRepository.saveAndFlush(quanLyThongSo);

        int databaseSizeBeforeUpdate = quanLyThongSoRepository.findAll().size();

        // Update the quanLyThongSo using partial update
        QuanLyThongSo partialUpdatedQuanLyThongSo = new QuanLyThongSo();
        partialUpdatedQuanLyThongSo.setId(quanLyThongSo.getId());

        partialUpdatedQuanLyThongSo
            .maThongSo(UPDATED_MA_THONG_SO)
            .tenThongSo(UPDATED_TEN_THONG_SO)
            .moTa(UPDATED_MO_TA)
            .ngayTao(UPDATED_NGAY_TAO)
            .ngayUpdate(UPDATED_NGAY_UPDATE)
            .updateBy(UPDATED_UPDATE_BY)
            .status(UPDATED_STATUS);

        restQuanLyThongSoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedQuanLyThongSo.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedQuanLyThongSo))
            )
            .andExpect(status().isOk());

        // Validate the QuanLyThongSo in the database
        List<QuanLyThongSo> quanLyThongSoList = quanLyThongSoRepository.findAll();
        assertThat(quanLyThongSoList).hasSize(databaseSizeBeforeUpdate);
        QuanLyThongSo testQuanLyThongSo = quanLyThongSoList.get(quanLyThongSoList.size() - 1);
        assertThat(testQuanLyThongSo.getMaThongSo()).isEqualTo(UPDATED_MA_THONG_SO);
        assertThat(testQuanLyThongSo.getTenThongSo()).isEqualTo(UPDATED_TEN_THONG_SO);
        assertThat(testQuanLyThongSo.getMoTa()).isEqualTo(UPDATED_MO_TA);
        assertThat(testQuanLyThongSo.getNgayTao()).isEqualTo(UPDATED_NGAY_TAO);
        assertThat(testQuanLyThongSo.getNgayUpdate()).isEqualTo(UPDATED_NGAY_UPDATE);
        assertThat(testQuanLyThongSo.getUpdateBy()).isEqualTo(UPDATED_UPDATE_BY);
        assertThat(testQuanLyThongSo.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    void patchNonExistingQuanLyThongSo() throws Exception {
        int databaseSizeBeforeUpdate = quanLyThongSoRepository.findAll().size();
        quanLyThongSo.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restQuanLyThongSoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, quanLyThongSo.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(quanLyThongSo))
            )
            .andExpect(status().isBadRequest());

        // Validate the QuanLyThongSo in the database
        List<QuanLyThongSo> quanLyThongSoList = quanLyThongSoRepository.findAll();
        assertThat(quanLyThongSoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchQuanLyThongSo() throws Exception {
        int databaseSizeBeforeUpdate = quanLyThongSoRepository.findAll().size();
        quanLyThongSo.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restQuanLyThongSoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(quanLyThongSo))
            )
            .andExpect(status().isBadRequest());

        // Validate the QuanLyThongSo in the database
        List<QuanLyThongSo> quanLyThongSoList = quanLyThongSoRepository.findAll();
        assertThat(quanLyThongSoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamQuanLyThongSo() throws Exception {
        int databaseSizeBeforeUpdate = quanLyThongSoRepository.findAll().size();
        quanLyThongSo.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restQuanLyThongSoMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(quanLyThongSo))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the QuanLyThongSo in the database
        List<QuanLyThongSo> quanLyThongSoList = quanLyThongSoRepository.findAll();
        assertThat(quanLyThongSoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteQuanLyThongSo() throws Exception {
        // Initialize the database
        quanLyThongSoRepository.saveAndFlush(quanLyThongSo);

        int databaseSizeBeforeDelete = quanLyThongSoRepository.findAll().size();

        // Delete the quanLyThongSo
        restQuanLyThongSoMockMvc
            .perform(delete(ENTITY_API_URL_ID, quanLyThongSo.getId()).with(csrf()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<QuanLyThongSo> quanLyThongSoList = quanLyThongSoRepository.findAll();
        assertThat(quanLyThongSoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
