package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.ChiTietLichSuUpdate;
import com.mycompany.myapp.repository.ChiTietLichSuUpdateRepository;
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
 * Integration tests for the {@link ChiTietLichSuUpdateResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ChiTietLichSuUpdateResourceIT {

    private static final String DEFAULT_MA_KICH_BAN = "AAAAAAAAAA";
    private static final String UPDATED_MA_KICH_BAN = "BBBBBBBBBB";

    private static final Integer DEFAULT_HANG_LSSX = 1;
    private static final Integer UPDATED_HANG_LSSX = 2;

    private static final String DEFAULT_THONG_SO = "AAAAAAAAAA";
    private static final String UPDATED_THONG_SO = "BBBBBBBBBB";

    private static final Float DEFAULT_MIN_VALUE = 1F;
    private static final Float UPDATED_MIN_VALUE = 2F;

    private static final Float DEFAULT_MAX_VALUE = 1F;
    private static final Float UPDATED_MAX_VALUE = 2F;

    private static final Float DEFAULT_TRUNGBINH = 1F;
    private static final Float UPDATED_TRUNGBINH = 2F;

    private static final String DEFAULT_DON_VI = "AAAAAAAAAA";
    private static final String UPDATED_DON_VI = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/chi-tiet-lich-su-updates";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ChiTietLichSuUpdateRepository chiTietLichSuUpdateRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restChiTietLichSuUpdateMockMvc;

    private ChiTietLichSuUpdate chiTietLichSuUpdate;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ChiTietLichSuUpdate createEntity(EntityManager em) {
        ChiTietLichSuUpdate chiTietLichSuUpdate = new ChiTietLichSuUpdate()
            .maKichBan(DEFAULT_MA_KICH_BAN)
            .hangLssx(DEFAULT_HANG_LSSX)
            .thongSo(DEFAULT_THONG_SO)
            .minValue(DEFAULT_MIN_VALUE)
            .maxValue(DEFAULT_MAX_VALUE)
            .trungbinh(DEFAULT_TRUNGBINH)
            .donVi(DEFAULT_DON_VI);
        return chiTietLichSuUpdate;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ChiTietLichSuUpdate createUpdatedEntity(EntityManager em) {
        ChiTietLichSuUpdate chiTietLichSuUpdate = new ChiTietLichSuUpdate()
            .maKichBan(UPDATED_MA_KICH_BAN)
            .hangLssx(UPDATED_HANG_LSSX)
            .thongSo(UPDATED_THONG_SO)
            .minValue(UPDATED_MIN_VALUE)
            .maxValue(UPDATED_MAX_VALUE)
            .trungbinh(UPDATED_TRUNGBINH)
            .donVi(UPDATED_DON_VI);
        return chiTietLichSuUpdate;
    }

    @BeforeEach
    public void initTest() {
        chiTietLichSuUpdate = createEntity(em);
    }

    @Test
    @Transactional
    void createChiTietLichSuUpdate() throws Exception {
        int databaseSizeBeforeCreate = chiTietLichSuUpdateRepository.findAll().size();
        // Create the ChiTietLichSuUpdate
        restChiTietLichSuUpdateMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(chiTietLichSuUpdate))
            )
            .andExpect(status().isCreated());

        // Validate the ChiTietLichSuUpdate in the database
        List<ChiTietLichSuUpdate> chiTietLichSuUpdateList = chiTietLichSuUpdateRepository.findAll();
        assertThat(chiTietLichSuUpdateList).hasSize(databaseSizeBeforeCreate + 1);
        ChiTietLichSuUpdate testChiTietLichSuUpdate = chiTietLichSuUpdateList.get(chiTietLichSuUpdateList.size() - 1);
        assertThat(testChiTietLichSuUpdate.getMaKichBan()).isEqualTo(DEFAULT_MA_KICH_BAN);
        assertThat(testChiTietLichSuUpdate.getHangLssx()).isEqualTo(DEFAULT_HANG_LSSX);
        assertThat(testChiTietLichSuUpdate.getThongSo()).isEqualTo(DEFAULT_THONG_SO);
        assertThat(testChiTietLichSuUpdate.getMinValue()).isEqualTo(DEFAULT_MIN_VALUE);
        assertThat(testChiTietLichSuUpdate.getMaxValue()).isEqualTo(DEFAULT_MAX_VALUE);
        assertThat(testChiTietLichSuUpdate.getTrungbinh()).isEqualTo(DEFAULT_TRUNGBINH);
        assertThat(testChiTietLichSuUpdate.getDonVi()).isEqualTo(DEFAULT_DON_VI);
    }

    @Test
    @Transactional
    void createChiTietLichSuUpdateWithExistingId() throws Exception {
        // Create the ChiTietLichSuUpdate with an existing ID
        chiTietLichSuUpdate.setId(1L);

        int databaseSizeBeforeCreate = chiTietLichSuUpdateRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restChiTietLichSuUpdateMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(chiTietLichSuUpdate))
            )
            .andExpect(status().isBadRequest());

        // Validate the ChiTietLichSuUpdate in the database
        List<ChiTietLichSuUpdate> chiTietLichSuUpdateList = chiTietLichSuUpdateRepository.findAll();
        assertThat(chiTietLichSuUpdateList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllChiTietLichSuUpdates() throws Exception {
        // Initialize the database
        chiTietLichSuUpdateRepository.saveAndFlush(chiTietLichSuUpdate);

        // Get all the chiTietLichSuUpdateList
        restChiTietLichSuUpdateMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(chiTietLichSuUpdate.getId().intValue())))
            .andExpect(jsonPath("$.[*].maKichBan").value(hasItem(DEFAULT_MA_KICH_BAN)))
            .andExpect(jsonPath("$.[*].hangLssx").value(hasItem(DEFAULT_HANG_LSSX)))
            .andExpect(jsonPath("$.[*].thongSo").value(hasItem(DEFAULT_THONG_SO)))
            .andExpect(jsonPath("$.[*].minValue").value(hasItem(DEFAULT_MIN_VALUE.doubleValue())))
            .andExpect(jsonPath("$.[*].maxValue").value(hasItem(DEFAULT_MAX_VALUE.doubleValue())))
            .andExpect(jsonPath("$.[*].trungbinh").value(hasItem(DEFAULT_TRUNGBINH.doubleValue())))
            .andExpect(jsonPath("$.[*].donVi").value(hasItem(DEFAULT_DON_VI)));
    }

    @Test
    @Transactional
    void getChiTietLichSuUpdate() throws Exception {
        // Initialize the database
        chiTietLichSuUpdateRepository.saveAndFlush(chiTietLichSuUpdate);

        // Get the chiTietLichSuUpdate
        restChiTietLichSuUpdateMockMvc
            .perform(get(ENTITY_API_URL_ID, chiTietLichSuUpdate.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(chiTietLichSuUpdate.getId().intValue()))
            .andExpect(jsonPath("$.maKichBan").value(DEFAULT_MA_KICH_BAN))
            .andExpect(jsonPath("$.hangLssx").value(DEFAULT_HANG_LSSX))
            .andExpect(jsonPath("$.thongSo").value(DEFAULT_THONG_SO))
            .andExpect(jsonPath("$.minValue").value(DEFAULT_MIN_VALUE.doubleValue()))
            .andExpect(jsonPath("$.maxValue").value(DEFAULT_MAX_VALUE.doubleValue()))
            .andExpect(jsonPath("$.trungbinh").value(DEFAULT_TRUNGBINH.doubleValue()))
            .andExpect(jsonPath("$.donVi").value(DEFAULT_DON_VI));
    }

    @Test
    @Transactional
    void getNonExistingChiTietLichSuUpdate() throws Exception {
        // Get the chiTietLichSuUpdate
        restChiTietLichSuUpdateMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewChiTietLichSuUpdate() throws Exception {
        // Initialize the database
        chiTietLichSuUpdateRepository.saveAndFlush(chiTietLichSuUpdate);

        int databaseSizeBeforeUpdate = chiTietLichSuUpdateRepository.findAll().size();

        // Update the chiTietLichSuUpdate
        ChiTietLichSuUpdate updatedChiTietLichSuUpdate = chiTietLichSuUpdateRepository.findById(chiTietLichSuUpdate.getId()).get();
        // Disconnect from session so that the updates on updatedChiTietLichSuUpdate are not directly saved in db
        em.detach(updatedChiTietLichSuUpdate);
        updatedChiTietLichSuUpdate
            .maKichBan(UPDATED_MA_KICH_BAN)
            .hangLssx(UPDATED_HANG_LSSX)
            .thongSo(UPDATED_THONG_SO)
            .minValue(UPDATED_MIN_VALUE)
            .maxValue(UPDATED_MAX_VALUE)
            .trungbinh(UPDATED_TRUNGBINH)
            .donVi(UPDATED_DON_VI);

        restChiTietLichSuUpdateMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedChiTietLichSuUpdate.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedChiTietLichSuUpdate))
            )
            .andExpect(status().isOk());

        // Validate the ChiTietLichSuUpdate in the database
        List<ChiTietLichSuUpdate> chiTietLichSuUpdateList = chiTietLichSuUpdateRepository.findAll();
        assertThat(chiTietLichSuUpdateList).hasSize(databaseSizeBeforeUpdate);
        ChiTietLichSuUpdate testChiTietLichSuUpdate = chiTietLichSuUpdateList.get(chiTietLichSuUpdateList.size() - 1);
        assertThat(testChiTietLichSuUpdate.getMaKichBan()).isEqualTo(UPDATED_MA_KICH_BAN);
        assertThat(testChiTietLichSuUpdate.getHangLssx()).isEqualTo(UPDATED_HANG_LSSX);
        assertThat(testChiTietLichSuUpdate.getThongSo()).isEqualTo(UPDATED_THONG_SO);
        assertThat(testChiTietLichSuUpdate.getMinValue()).isEqualTo(UPDATED_MIN_VALUE);
        assertThat(testChiTietLichSuUpdate.getMaxValue()).isEqualTo(UPDATED_MAX_VALUE);
        assertThat(testChiTietLichSuUpdate.getTrungbinh()).isEqualTo(UPDATED_TRUNGBINH);
        assertThat(testChiTietLichSuUpdate.getDonVi()).isEqualTo(UPDATED_DON_VI);
    }

    @Test
    @Transactional
    void putNonExistingChiTietLichSuUpdate() throws Exception {
        int databaseSizeBeforeUpdate = chiTietLichSuUpdateRepository.findAll().size();
        chiTietLichSuUpdate.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restChiTietLichSuUpdateMockMvc
            .perform(
                put(ENTITY_API_URL_ID, chiTietLichSuUpdate.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(chiTietLichSuUpdate))
            )
            .andExpect(status().isBadRequest());

        // Validate the ChiTietLichSuUpdate in the database
        List<ChiTietLichSuUpdate> chiTietLichSuUpdateList = chiTietLichSuUpdateRepository.findAll();
        assertThat(chiTietLichSuUpdateList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchChiTietLichSuUpdate() throws Exception {
        int databaseSizeBeforeUpdate = chiTietLichSuUpdateRepository.findAll().size();
        chiTietLichSuUpdate.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restChiTietLichSuUpdateMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(chiTietLichSuUpdate))
            )
            .andExpect(status().isBadRequest());

        // Validate the ChiTietLichSuUpdate in the database
        List<ChiTietLichSuUpdate> chiTietLichSuUpdateList = chiTietLichSuUpdateRepository.findAll();
        assertThat(chiTietLichSuUpdateList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamChiTietLichSuUpdate() throws Exception {
        int databaseSizeBeforeUpdate = chiTietLichSuUpdateRepository.findAll().size();
        chiTietLichSuUpdate.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restChiTietLichSuUpdateMockMvc
            .perform(
                put(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(chiTietLichSuUpdate))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ChiTietLichSuUpdate in the database
        List<ChiTietLichSuUpdate> chiTietLichSuUpdateList = chiTietLichSuUpdateRepository.findAll();
        assertThat(chiTietLichSuUpdateList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateChiTietLichSuUpdateWithPatch() throws Exception {
        // Initialize the database
        chiTietLichSuUpdateRepository.saveAndFlush(chiTietLichSuUpdate);

        int databaseSizeBeforeUpdate = chiTietLichSuUpdateRepository.findAll().size();

        // Update the chiTietLichSuUpdate using partial update
        ChiTietLichSuUpdate partialUpdatedChiTietLichSuUpdate = new ChiTietLichSuUpdate();
        partialUpdatedChiTietLichSuUpdate.setId(chiTietLichSuUpdate.getId());

        partialUpdatedChiTietLichSuUpdate.maKichBan(UPDATED_MA_KICH_BAN).thongSo(UPDATED_THONG_SO).minValue(UPDATED_MIN_VALUE);

        restChiTietLichSuUpdateMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedChiTietLichSuUpdate.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedChiTietLichSuUpdate))
            )
            .andExpect(status().isOk());

        // Validate the ChiTietLichSuUpdate in the database
        List<ChiTietLichSuUpdate> chiTietLichSuUpdateList = chiTietLichSuUpdateRepository.findAll();
        assertThat(chiTietLichSuUpdateList).hasSize(databaseSizeBeforeUpdate);
        ChiTietLichSuUpdate testChiTietLichSuUpdate = chiTietLichSuUpdateList.get(chiTietLichSuUpdateList.size() - 1);
        assertThat(testChiTietLichSuUpdate.getMaKichBan()).isEqualTo(UPDATED_MA_KICH_BAN);
        assertThat(testChiTietLichSuUpdate.getHangLssx()).isEqualTo(DEFAULT_HANG_LSSX);
        assertThat(testChiTietLichSuUpdate.getThongSo()).isEqualTo(UPDATED_THONG_SO);
        assertThat(testChiTietLichSuUpdate.getMinValue()).isEqualTo(UPDATED_MIN_VALUE);
        assertThat(testChiTietLichSuUpdate.getMaxValue()).isEqualTo(DEFAULT_MAX_VALUE);
        assertThat(testChiTietLichSuUpdate.getTrungbinh()).isEqualTo(DEFAULT_TRUNGBINH);
        assertThat(testChiTietLichSuUpdate.getDonVi()).isEqualTo(DEFAULT_DON_VI);
    }

    @Test
    @Transactional
    void fullUpdateChiTietLichSuUpdateWithPatch() throws Exception {
        // Initialize the database
        chiTietLichSuUpdateRepository.saveAndFlush(chiTietLichSuUpdate);

        int databaseSizeBeforeUpdate = chiTietLichSuUpdateRepository.findAll().size();

        // Update the chiTietLichSuUpdate using partial update
        ChiTietLichSuUpdate partialUpdatedChiTietLichSuUpdate = new ChiTietLichSuUpdate();
        partialUpdatedChiTietLichSuUpdate.setId(chiTietLichSuUpdate.getId());

        partialUpdatedChiTietLichSuUpdate
            .maKichBan(UPDATED_MA_KICH_BAN)
            .hangLssx(UPDATED_HANG_LSSX)
            .thongSo(UPDATED_THONG_SO)
            .minValue(UPDATED_MIN_VALUE)
            .maxValue(UPDATED_MAX_VALUE)
            .trungbinh(UPDATED_TRUNGBINH)
            .donVi(UPDATED_DON_VI);

        restChiTietLichSuUpdateMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedChiTietLichSuUpdate.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedChiTietLichSuUpdate))
            )
            .andExpect(status().isOk());

        // Validate the ChiTietLichSuUpdate in the database
        List<ChiTietLichSuUpdate> chiTietLichSuUpdateList = chiTietLichSuUpdateRepository.findAll();
        assertThat(chiTietLichSuUpdateList).hasSize(databaseSizeBeforeUpdate);
        ChiTietLichSuUpdate testChiTietLichSuUpdate = chiTietLichSuUpdateList.get(chiTietLichSuUpdateList.size() - 1);
        assertThat(testChiTietLichSuUpdate.getMaKichBan()).isEqualTo(UPDATED_MA_KICH_BAN);
        assertThat(testChiTietLichSuUpdate.getHangLssx()).isEqualTo(UPDATED_HANG_LSSX);
        assertThat(testChiTietLichSuUpdate.getThongSo()).isEqualTo(UPDATED_THONG_SO);
        assertThat(testChiTietLichSuUpdate.getMinValue()).isEqualTo(UPDATED_MIN_VALUE);
        assertThat(testChiTietLichSuUpdate.getMaxValue()).isEqualTo(UPDATED_MAX_VALUE);
        assertThat(testChiTietLichSuUpdate.getTrungbinh()).isEqualTo(UPDATED_TRUNGBINH);
        assertThat(testChiTietLichSuUpdate.getDonVi()).isEqualTo(UPDATED_DON_VI);
    }

    @Test
    @Transactional
    void patchNonExistingChiTietLichSuUpdate() throws Exception {
        int databaseSizeBeforeUpdate = chiTietLichSuUpdateRepository.findAll().size();
        chiTietLichSuUpdate.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restChiTietLichSuUpdateMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, chiTietLichSuUpdate.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(chiTietLichSuUpdate))
            )
            .andExpect(status().isBadRequest());

        // Validate the ChiTietLichSuUpdate in the database
        List<ChiTietLichSuUpdate> chiTietLichSuUpdateList = chiTietLichSuUpdateRepository.findAll();
        assertThat(chiTietLichSuUpdateList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchChiTietLichSuUpdate() throws Exception {
        int databaseSizeBeforeUpdate = chiTietLichSuUpdateRepository.findAll().size();
        chiTietLichSuUpdate.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restChiTietLichSuUpdateMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(chiTietLichSuUpdate))
            )
            .andExpect(status().isBadRequest());

        // Validate the ChiTietLichSuUpdate in the database
        List<ChiTietLichSuUpdate> chiTietLichSuUpdateList = chiTietLichSuUpdateRepository.findAll();
        assertThat(chiTietLichSuUpdateList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamChiTietLichSuUpdate() throws Exception {
        int databaseSizeBeforeUpdate = chiTietLichSuUpdateRepository.findAll().size();
        chiTietLichSuUpdate.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restChiTietLichSuUpdateMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(chiTietLichSuUpdate))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ChiTietLichSuUpdate in the database
        List<ChiTietLichSuUpdate> chiTietLichSuUpdateList = chiTietLichSuUpdateRepository.findAll();
        assertThat(chiTietLichSuUpdateList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteChiTietLichSuUpdate() throws Exception {
        // Initialize the database
        chiTietLichSuUpdateRepository.saveAndFlush(chiTietLichSuUpdate);

        int databaseSizeBeforeDelete = chiTietLichSuUpdateRepository.findAll().size();

        // Delete the chiTietLichSuUpdate
        restChiTietLichSuUpdateMockMvc
            .perform(delete(ENTITY_API_URL_ID, chiTietLichSuUpdate.getId()).with(csrf()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ChiTietLichSuUpdate> chiTietLichSuUpdateList = chiTietLichSuUpdateRepository.findAll();
        assertThat(chiTietLichSuUpdateList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
