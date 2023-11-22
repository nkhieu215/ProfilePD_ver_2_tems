package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.ChiTietKichBan;
import com.mycompany.myapp.repository.ChiTietKichBanRepository;
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
 * Integration tests for the {@link ChiTietKichBanResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ChiTietKichBanResourceIT {

    private static final String DEFAULT_MA_KICH_BAN = "AAAAAAAAAA";
    private static final String UPDATED_MA_KICH_BAN = "BBBBBBBBBB";

    private static final String DEFAULT_HANG_MKB = "AAAAAAAAAA";
    private static final String UPDATED_HANG_MKB = "BBBBBBBBBB";

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

    private static final String DEFAULT_PHAN_LOAI = "AAAAAAAAAA";
    private static final String UPDATED_PHAN_LOAI = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/chi-tiet-kich-bans";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ChiTietKichBanRepository chiTietKichBanRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restChiTietKichBanMockMvc;

    private ChiTietKichBan chiTietKichBan;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ChiTietKichBan createEntity(EntityManager em) {
        ChiTietKichBan chiTietKichBan = new ChiTietKichBan()
            .maKichBan(DEFAULT_MA_KICH_BAN)
            .trangThai(DEFAULT_HANG_MKB)
            .thongSo(DEFAULT_THONG_SO)
            .minValue(DEFAULT_MIN_VALUE)
            .maxValue(DEFAULT_MAX_VALUE)
            .trungbinh(DEFAULT_TRUNGBINH)
            .donVi(DEFAULT_DON_VI)
            .phanLoai(DEFAULT_PHAN_LOAI);
        return chiTietKichBan;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ChiTietKichBan createUpdatedEntity(EntityManager em) {
        ChiTietKichBan chiTietKichBan = new ChiTietKichBan()
            .maKichBan(UPDATED_MA_KICH_BAN)
            .trangThai(UPDATED_HANG_MKB)
            .thongSo(UPDATED_THONG_SO)
            .minValue(UPDATED_MIN_VALUE)
            .maxValue(UPDATED_MAX_VALUE)
            .trungbinh(UPDATED_TRUNGBINH)
            .donVi(UPDATED_DON_VI)
            .phanLoai(UPDATED_PHAN_LOAI);
        return chiTietKichBan;
    }

    @BeforeEach
    public void initTest() {
        chiTietKichBan = createEntity(em);
    }

    @Test
    @Transactional
    void createChiTietKichBan() throws Exception {
        int databaseSizeBeforeCreate = chiTietKichBanRepository.findAll().size();
        // Create the ChiTietKichBan
        restChiTietKichBanMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(chiTietKichBan))
            )
            .andExpect(status().isCreated());

        // Validate the ChiTietKichBan in the database
        List<ChiTietKichBan> chiTietKichBanList = chiTietKichBanRepository.findAll();
        assertThat(chiTietKichBanList).hasSize(databaseSizeBeforeCreate + 1);
        ChiTietKichBan testChiTietKichBan = chiTietKichBanList.get(chiTietKichBanList.size() - 1);
        assertThat(testChiTietKichBan.getMaKichBan()).isEqualTo(DEFAULT_MA_KICH_BAN);
        assertThat(testChiTietKichBan.getTrangThai()).isEqualTo(DEFAULT_HANG_MKB);
        assertThat(testChiTietKichBan.getThongSo()).isEqualTo(DEFAULT_THONG_SO);
        assertThat(testChiTietKichBan.getMinValue()).isEqualTo(DEFAULT_MIN_VALUE);
        assertThat(testChiTietKichBan.getMaxValue()).isEqualTo(DEFAULT_MAX_VALUE);
        assertThat(testChiTietKichBan.getTrungbinh()).isEqualTo(DEFAULT_TRUNGBINH);
        assertThat(testChiTietKichBan.getDonVi()).isEqualTo(DEFAULT_DON_VI);
        assertThat(testChiTietKichBan.getPhanLoai()).isEqualTo(DEFAULT_PHAN_LOAI);
    }

    @Test
    @Transactional
    void createChiTietKichBanWithExistingId() throws Exception {
        // Create the ChiTietKichBan with an existing ID
        chiTietKichBan.setId(1L);

        int databaseSizeBeforeCreate = chiTietKichBanRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restChiTietKichBanMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(chiTietKichBan))
            )
            .andExpect(status().isBadRequest());

        // Validate the ChiTietKichBan in the database
        List<ChiTietKichBan> chiTietKichBanList = chiTietKichBanRepository.findAll();
        assertThat(chiTietKichBanList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllChiTietKichBans() throws Exception {
        // Initialize the database
        chiTietKichBanRepository.saveAndFlush(chiTietKichBan);

        // Get all the chiTietKichBanList
        restChiTietKichBanMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(chiTietKichBan.getId().intValue())))
            .andExpect(jsonPath("$.[*].maKichBan").value(hasItem(DEFAULT_MA_KICH_BAN)))
            .andExpect(jsonPath("$.[*].hangMkb").value(hasItem(DEFAULT_HANG_MKB)))
            .andExpect(jsonPath("$.[*].thongSo").value(hasItem(DEFAULT_THONG_SO)))
            .andExpect(jsonPath("$.[*].minValue").value(hasItem(DEFAULT_MIN_VALUE.doubleValue())))
            .andExpect(jsonPath("$.[*].maxValue").value(hasItem(DEFAULT_MAX_VALUE.doubleValue())))
            .andExpect(jsonPath("$.[*].trungbinh").value(hasItem(DEFAULT_TRUNGBINH.doubleValue())))
            .andExpect(jsonPath("$.[*].donVi").value(hasItem(DEFAULT_DON_VI)))
            .andExpect(jsonPath("$.[*].phanLoai").value(hasItem(DEFAULT_PHAN_LOAI)));
    }

    @Test
    @Transactional
    void getChiTietKichBan() throws Exception {
        // Initialize the database
        chiTietKichBanRepository.saveAndFlush(chiTietKichBan);

        // Get the chiTietKichBan
        restChiTietKichBanMockMvc
            .perform(get(ENTITY_API_URL_ID, chiTietKichBan.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(chiTietKichBan.getId().intValue()))
            .andExpect(jsonPath("$.maKichBan").value(DEFAULT_MA_KICH_BAN))
            .andExpect(jsonPath("$.hangMkb").value(DEFAULT_HANG_MKB))
            .andExpect(jsonPath("$.thongSo").value(DEFAULT_THONG_SO))
            .andExpect(jsonPath("$.minValue").value(DEFAULT_MIN_VALUE.doubleValue()))
            .andExpect(jsonPath("$.maxValue").value(DEFAULT_MAX_VALUE.doubleValue()))
            .andExpect(jsonPath("$.trungbinh").value(DEFAULT_TRUNGBINH.doubleValue()))
            .andExpect(jsonPath("$.donVi").value(DEFAULT_DON_VI))
            .andExpect(jsonPath("$.phanLoai").value(DEFAULT_PHAN_LOAI));
    }

    @Test
    @Transactional
    void getNonExistingChiTietKichBan() throws Exception {
        // Get the chiTietKichBan
        restChiTietKichBanMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewChiTietKichBan() throws Exception {
        // Initialize the database
        chiTietKichBanRepository.saveAndFlush(chiTietKichBan);

        int databaseSizeBeforeUpdate = chiTietKichBanRepository.findAll().size();

        // Update the chiTietKichBan
        ChiTietKichBan updatedChiTietKichBan = chiTietKichBanRepository.findById(chiTietKichBan.getId()).get();
        // Disconnect from session so that the updates on updatedChiTietKichBan are not
        // directly saved in db
        em.detach(updatedChiTietKichBan);
        updatedChiTietKichBan
            .maKichBan(UPDATED_MA_KICH_BAN)
            .trangThai(UPDATED_HANG_MKB)
            .thongSo(UPDATED_THONG_SO)
            .minValue(UPDATED_MIN_VALUE)
            .maxValue(UPDATED_MAX_VALUE)
            .trungbinh(UPDATED_TRUNGBINH)
            .donVi(UPDATED_DON_VI)
            .phanLoai(UPDATED_PHAN_LOAI);

        restChiTietKichBanMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedChiTietKichBan.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedChiTietKichBan))
            )
            .andExpect(status().isOk());

        // Validate the ChiTietKichBan in the database
        List<ChiTietKichBan> chiTietKichBanList = chiTietKichBanRepository.findAll();
        assertThat(chiTietKichBanList).hasSize(databaseSizeBeforeUpdate);
        ChiTietKichBan testChiTietKichBan = chiTietKichBanList.get(chiTietKichBanList.size() - 1);
        assertThat(testChiTietKichBan.getMaKichBan()).isEqualTo(UPDATED_MA_KICH_BAN);
        assertThat(testChiTietKichBan.getTrangThai()).isEqualTo(UPDATED_HANG_MKB);
        assertThat(testChiTietKichBan.getThongSo()).isEqualTo(UPDATED_THONG_SO);
        assertThat(testChiTietKichBan.getMinValue()).isEqualTo(UPDATED_MIN_VALUE);
        assertThat(testChiTietKichBan.getMaxValue()).isEqualTo(UPDATED_MAX_VALUE);
        assertThat(testChiTietKichBan.getTrungbinh()).isEqualTo(UPDATED_TRUNGBINH);
        assertThat(testChiTietKichBan.getDonVi()).isEqualTo(UPDATED_DON_VI);
        assertThat(testChiTietKichBan.getPhanLoai()).isEqualTo(UPDATED_PHAN_LOAI);
    }

    @Test
    @Transactional
    void putNonExistingChiTietKichBan() throws Exception {
        int databaseSizeBeforeUpdate = chiTietKichBanRepository.findAll().size();
        chiTietKichBan.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restChiTietKichBanMockMvc
            .perform(
                put(ENTITY_API_URL_ID, chiTietKichBan.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(chiTietKichBan))
            )
            .andExpect(status().isBadRequest());

        // Validate the ChiTietKichBan in the database
        List<ChiTietKichBan> chiTietKichBanList = chiTietKichBanRepository.findAll();
        assertThat(chiTietKichBanList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchChiTietKichBan() throws Exception {
        int databaseSizeBeforeUpdate = chiTietKichBanRepository.findAll().size();
        chiTietKichBan.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restChiTietKichBanMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(chiTietKichBan))
            )
            .andExpect(status().isBadRequest());

        // Validate the ChiTietKichBan in the database
        List<ChiTietKichBan> chiTietKichBanList = chiTietKichBanRepository.findAll();
        assertThat(chiTietKichBanList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamChiTietKichBan() throws Exception {
        int databaseSizeBeforeUpdate = chiTietKichBanRepository.findAll().size();
        chiTietKichBan.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restChiTietKichBanMockMvc
            .perform(
                put(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(chiTietKichBan))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ChiTietKichBan in the database
        List<ChiTietKichBan> chiTietKichBanList = chiTietKichBanRepository.findAll();
        assertThat(chiTietKichBanList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateChiTietKichBanWithPatch() throws Exception {
        // Initialize the database
        chiTietKichBanRepository.saveAndFlush(chiTietKichBan);

        int databaseSizeBeforeUpdate = chiTietKichBanRepository.findAll().size();

        // Update the chiTietKichBan using partial update
        ChiTietKichBan partialUpdatedChiTietKichBan = new ChiTietKichBan();
        partialUpdatedChiTietKichBan.setId(chiTietKichBan.getId());

        partialUpdatedChiTietKichBan
            .maKichBan(UPDATED_MA_KICH_BAN)
            .trangThai(UPDATED_HANG_MKB)
            .thongSo(UPDATED_THONG_SO)
            .minValue(UPDATED_MIN_VALUE);

        restChiTietKichBanMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedChiTietKichBan.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedChiTietKichBan))
            )
            .andExpect(status().isOk());

        // Validate the ChiTietKichBan in the database
        List<ChiTietKichBan> chiTietKichBanList = chiTietKichBanRepository.findAll();
        assertThat(chiTietKichBanList).hasSize(databaseSizeBeforeUpdate);
        ChiTietKichBan testChiTietKichBan = chiTietKichBanList.get(chiTietKichBanList.size() - 1);
        assertThat(testChiTietKichBan.getMaKichBan()).isEqualTo(UPDATED_MA_KICH_BAN);
        assertThat(testChiTietKichBan.getTrangThai()).isEqualTo(UPDATED_HANG_MKB);
        assertThat(testChiTietKichBan.getThongSo()).isEqualTo(UPDATED_THONG_SO);
        assertThat(testChiTietKichBan.getMinValue()).isEqualTo(UPDATED_MIN_VALUE);
        assertThat(testChiTietKichBan.getMaxValue()).isEqualTo(DEFAULT_MAX_VALUE);
        assertThat(testChiTietKichBan.getTrungbinh()).isEqualTo(DEFAULT_TRUNGBINH);
        assertThat(testChiTietKichBan.getDonVi()).isEqualTo(DEFAULT_DON_VI);
        assertThat(testChiTietKichBan.getPhanLoai()).isEqualTo(DEFAULT_PHAN_LOAI);
    }

    @Test
    @Transactional
    void fullUpdateChiTietKichBanWithPatch() throws Exception {
        // Initialize the database
        chiTietKichBanRepository.saveAndFlush(chiTietKichBan);

        int databaseSizeBeforeUpdate = chiTietKichBanRepository.findAll().size();

        // Update the chiTietKichBan using partial update
        ChiTietKichBan partialUpdatedChiTietKichBan = new ChiTietKichBan();
        partialUpdatedChiTietKichBan.setId(chiTietKichBan.getId());

        partialUpdatedChiTietKichBan
            .maKichBan(UPDATED_MA_KICH_BAN)
            .trangThai(UPDATED_HANG_MKB)
            .thongSo(UPDATED_THONG_SO)
            .minValue(UPDATED_MIN_VALUE)
            .maxValue(UPDATED_MAX_VALUE)
            .trungbinh(UPDATED_TRUNGBINH)
            .donVi(UPDATED_DON_VI)
            .phanLoai(UPDATED_PHAN_LOAI);

        restChiTietKichBanMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedChiTietKichBan.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedChiTietKichBan))
            )
            .andExpect(status().isOk());

        // Validate the ChiTietKichBan in the database
        List<ChiTietKichBan> chiTietKichBanList = chiTietKichBanRepository.findAll();
        assertThat(chiTietKichBanList).hasSize(databaseSizeBeforeUpdate);
        ChiTietKichBan testChiTietKichBan = chiTietKichBanList.get(chiTietKichBanList.size() - 1);
        assertThat(testChiTietKichBan.getMaKichBan()).isEqualTo(UPDATED_MA_KICH_BAN);
        assertThat(testChiTietKichBan.getTrangThai()).isEqualTo(UPDATED_HANG_MKB);
        assertThat(testChiTietKichBan.getThongSo()).isEqualTo(UPDATED_THONG_SO);
        assertThat(testChiTietKichBan.getMinValue()).isEqualTo(UPDATED_MIN_VALUE);
        assertThat(testChiTietKichBan.getMaxValue()).isEqualTo(UPDATED_MAX_VALUE);
        assertThat(testChiTietKichBan.getTrungbinh()).isEqualTo(UPDATED_TRUNGBINH);
        assertThat(testChiTietKichBan.getDonVi()).isEqualTo(UPDATED_DON_VI);
        assertThat(testChiTietKichBan.getPhanLoai()).isEqualTo(UPDATED_PHAN_LOAI);
    }

    @Test
    @Transactional
    void patchNonExistingChiTietKichBan() throws Exception {
        int databaseSizeBeforeUpdate = chiTietKichBanRepository.findAll().size();
        chiTietKichBan.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restChiTietKichBanMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, chiTietKichBan.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(chiTietKichBan))
            )
            .andExpect(status().isBadRequest());

        // Validate the ChiTietKichBan in the database
        List<ChiTietKichBan> chiTietKichBanList = chiTietKichBanRepository.findAll();
        assertThat(chiTietKichBanList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchChiTietKichBan() throws Exception {
        int databaseSizeBeforeUpdate = chiTietKichBanRepository.findAll().size();
        chiTietKichBan.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restChiTietKichBanMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(chiTietKichBan))
            )
            .andExpect(status().isBadRequest());

        // Validate the ChiTietKichBan in the database
        List<ChiTietKichBan> chiTietKichBanList = chiTietKichBanRepository.findAll();
        assertThat(chiTietKichBanList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamChiTietKichBan() throws Exception {
        int databaseSizeBeforeUpdate = chiTietKichBanRepository.findAll().size();
        chiTietKichBan.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restChiTietKichBanMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(chiTietKichBan))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ChiTietKichBan in the database
        List<ChiTietKichBan> chiTietKichBanList = chiTietKichBanRepository.findAll();
        assertThat(chiTietKichBanList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteChiTietKichBan() throws Exception {
        // Initialize the database
        chiTietKichBanRepository.saveAndFlush(chiTietKichBan);

        int databaseSizeBeforeDelete = chiTietKichBanRepository.findAll().size();

        // Delete the chiTietKichBan
        restChiTietKichBanMockMvc
            .perform(delete(ENTITY_API_URL_ID, chiTietKichBan.getId()).with(csrf()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ChiTietKichBan> chiTietKichBanList = chiTietKichBanRepository.findAll();
        assertThat(chiTietKichBanList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
