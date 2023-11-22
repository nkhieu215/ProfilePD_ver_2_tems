package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.ChiTietSanXuat;
import com.mycompany.myapp.repository.ChiTietSanXuatRepository;
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
 * Integration tests for the {@link ChiTietSanXuatResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ChiTietSanXuatResourceIT {

    private static final String DEFAULT_MA_KICH_BAN = "AAAAAAAAAA";
    private static final String UPDATED_MA_KICH_BAN = "BBBBBBBBBB";

    private static final String DEFAULT_HANG_SXHN = "AAAAAAAAAA";
    private static final String UPDATED_HANG_SXHN = "BBBBBBBBBB";

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

    private static final String ENTITY_API_URL = "/api/chi-tiet-san-xuats";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ChiTietSanXuatRepository chiTietSanXuatRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restChiTietSanXuatMockMvc;

    private ChiTietSanXuat chiTietSanXuat;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ChiTietSanXuat createEntity(EntityManager em) {
        ChiTietSanXuat chiTietSanXuat = new ChiTietSanXuat()
            .maKichBan(DEFAULT_MA_KICH_BAN)
            .trangThai(DEFAULT_HANG_SXHN)
            .thongSo(DEFAULT_THONG_SO)
            .minValue(DEFAULT_MIN_VALUE)
            .maxValue(DEFAULT_MAX_VALUE)
            .trungbinh(DEFAULT_TRUNGBINH)
            .donVi(DEFAULT_DON_VI);
        return chiTietSanXuat;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ChiTietSanXuat createUpdatedEntity(EntityManager em) {
        ChiTietSanXuat chiTietSanXuat = new ChiTietSanXuat()
            .maKichBan(UPDATED_MA_KICH_BAN)
            .trangThai(UPDATED_HANG_SXHN)
            .thongSo(UPDATED_THONG_SO)
            .minValue(UPDATED_MIN_VALUE)
            .maxValue(UPDATED_MAX_VALUE)
            .trungbinh(UPDATED_TRUNGBINH)
            .donVi(UPDATED_DON_VI);
        return chiTietSanXuat;
    }

    @BeforeEach
    public void initTest() {
        chiTietSanXuat = createEntity(em);
    }

    @Test
    @Transactional
    void createChiTietSanXuat() throws Exception {
        int databaseSizeBeforeCreate = chiTietSanXuatRepository.findAll().size();
        // Create the ChiTietSanXuat
        restChiTietSanXuatMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(chiTietSanXuat))
            )
            .andExpect(status().isCreated());

        // Validate the ChiTietSanXuat in the database
        List<ChiTietSanXuat> chiTietSanXuatList = chiTietSanXuatRepository.findAll();
        assertThat(chiTietSanXuatList).hasSize(databaseSizeBeforeCreate + 1);
        ChiTietSanXuat testChiTietSanXuat = chiTietSanXuatList.get(chiTietSanXuatList.size() - 1);
        assertThat(testChiTietSanXuat.getMaKichBan()).isEqualTo(DEFAULT_MA_KICH_BAN);
        assertThat(testChiTietSanXuat.getTrangThai()).isEqualTo(DEFAULT_HANG_SXHN);
        assertThat(testChiTietSanXuat.getThongSo()).isEqualTo(DEFAULT_THONG_SO);
        assertThat(testChiTietSanXuat.getMinValue()).isEqualTo(DEFAULT_MIN_VALUE);
        assertThat(testChiTietSanXuat.getMaxValue()).isEqualTo(DEFAULT_MAX_VALUE);
        assertThat(testChiTietSanXuat.getTrungbinh()).isEqualTo(DEFAULT_TRUNGBINH);
        assertThat(testChiTietSanXuat.getDonVi()).isEqualTo(DEFAULT_DON_VI);
    }

    @Test
    @Transactional
    void createChiTietSanXuatWithExistingId() throws Exception {
        // Create the ChiTietSanXuat with an existing ID
        chiTietSanXuat.setId(1L);

        int databaseSizeBeforeCreate = chiTietSanXuatRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restChiTietSanXuatMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(chiTietSanXuat))
            )
            .andExpect(status().isBadRequest());

        // Validate the ChiTietSanXuat in the database
        List<ChiTietSanXuat> chiTietSanXuatList = chiTietSanXuatRepository.findAll();
        assertThat(chiTietSanXuatList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllChiTietSanXuats() throws Exception {
        // Initialize the database
        chiTietSanXuatRepository.saveAndFlush(chiTietSanXuat);

        // Get all the chiTietSanXuatList
        restChiTietSanXuatMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(chiTietSanXuat.getId().intValue())))
            .andExpect(jsonPath("$.[*].maKichBan").value(hasItem(DEFAULT_MA_KICH_BAN)))
            .andExpect(jsonPath("$.[*].hangSxhn").value(hasItem(DEFAULT_HANG_SXHN)))
            .andExpect(jsonPath("$.[*].thongSo").value(hasItem(DEFAULT_THONG_SO)))
            .andExpect(jsonPath("$.[*].minValue").value(hasItem(DEFAULT_MIN_VALUE.doubleValue())))
            .andExpect(jsonPath("$.[*].maxValue").value(hasItem(DEFAULT_MAX_VALUE.doubleValue())))
            .andExpect(jsonPath("$.[*].trungbinh").value(hasItem(DEFAULT_TRUNGBINH.doubleValue())))
            .andExpect(jsonPath("$.[*].donVi").value(hasItem(DEFAULT_DON_VI)));
    }

    @Test
    @Transactional
    void getChiTietSanXuat() throws Exception {
        // Initialize the database
        chiTietSanXuatRepository.saveAndFlush(chiTietSanXuat);

        // Get the chiTietSanXuat
        restChiTietSanXuatMockMvc
            .perform(get(ENTITY_API_URL_ID, chiTietSanXuat.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(chiTietSanXuat.getId().intValue()))
            .andExpect(jsonPath("$.maKichBan").value(DEFAULT_MA_KICH_BAN))
            .andExpect(jsonPath("$.hangSxhn").value(DEFAULT_HANG_SXHN))
            .andExpect(jsonPath("$.thongSo").value(DEFAULT_THONG_SO))
            .andExpect(jsonPath("$.minValue").value(DEFAULT_MIN_VALUE.doubleValue()))
            .andExpect(jsonPath("$.maxValue").value(DEFAULT_MAX_VALUE.doubleValue()))
            .andExpect(jsonPath("$.trungbinh").value(DEFAULT_TRUNGBINH.doubleValue()))
            .andExpect(jsonPath("$.donVi").value(DEFAULT_DON_VI));
    }

    @Test
    @Transactional
    void getNonExistingChiTietSanXuat() throws Exception {
        // Get the chiTietSanXuat
        restChiTietSanXuatMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewChiTietSanXuat() throws Exception {
        // Initialize the database
        chiTietSanXuatRepository.saveAndFlush(chiTietSanXuat);

        int databaseSizeBeforeUpdate = chiTietSanXuatRepository.findAll().size();

        // Update the chiTietSanXuat
        ChiTietSanXuat updatedChiTietSanXuat = chiTietSanXuatRepository.findById(chiTietSanXuat.getId()).get();
        // Disconnect from session so that the updates on updatedChiTietSanXuat are not
        // directly saved in db
        em.detach(updatedChiTietSanXuat);
        updatedChiTietSanXuat
            .maKichBan(UPDATED_MA_KICH_BAN)
            .trangThai(UPDATED_HANG_SXHN)
            .thongSo(UPDATED_THONG_SO)
            .minValue(UPDATED_MIN_VALUE)
            .maxValue(UPDATED_MAX_VALUE)
            .trungbinh(UPDATED_TRUNGBINH)
            .donVi(UPDATED_DON_VI);

        restChiTietSanXuatMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedChiTietSanXuat.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedChiTietSanXuat))
            )
            .andExpect(status().isOk());

        // Validate the ChiTietSanXuat in the database
        List<ChiTietSanXuat> chiTietSanXuatList = chiTietSanXuatRepository.findAll();
        assertThat(chiTietSanXuatList).hasSize(databaseSizeBeforeUpdate);
        ChiTietSanXuat testChiTietSanXuat = chiTietSanXuatList.get(chiTietSanXuatList.size() - 1);
        assertThat(testChiTietSanXuat.getMaKichBan()).isEqualTo(UPDATED_MA_KICH_BAN);
        assertThat(testChiTietSanXuat.getTrangThai()).isEqualTo(UPDATED_HANG_SXHN);
        assertThat(testChiTietSanXuat.getThongSo()).isEqualTo(UPDATED_THONG_SO);
        assertThat(testChiTietSanXuat.getMinValue()).isEqualTo(UPDATED_MIN_VALUE);
        assertThat(testChiTietSanXuat.getMaxValue()).isEqualTo(UPDATED_MAX_VALUE);
        assertThat(testChiTietSanXuat.getTrungbinh()).isEqualTo(UPDATED_TRUNGBINH);
        assertThat(testChiTietSanXuat.getDonVi()).isEqualTo(UPDATED_DON_VI);
    }

    @Test
    @Transactional
    void putNonExistingChiTietSanXuat() throws Exception {
        int databaseSizeBeforeUpdate = chiTietSanXuatRepository.findAll().size();
        chiTietSanXuat.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restChiTietSanXuatMockMvc
            .perform(
                put(ENTITY_API_URL_ID, chiTietSanXuat.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(chiTietSanXuat))
            )
            .andExpect(status().isBadRequest());

        // Validate the ChiTietSanXuat in the database
        List<ChiTietSanXuat> chiTietSanXuatList = chiTietSanXuatRepository.findAll();
        assertThat(chiTietSanXuatList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchChiTietSanXuat() throws Exception {
        int databaseSizeBeforeUpdate = chiTietSanXuatRepository.findAll().size();
        chiTietSanXuat.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restChiTietSanXuatMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(chiTietSanXuat))
            )
            .andExpect(status().isBadRequest());

        // Validate the ChiTietSanXuat in the database
        List<ChiTietSanXuat> chiTietSanXuatList = chiTietSanXuatRepository.findAll();
        assertThat(chiTietSanXuatList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamChiTietSanXuat() throws Exception {
        int databaseSizeBeforeUpdate = chiTietSanXuatRepository.findAll().size();
        chiTietSanXuat.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restChiTietSanXuatMockMvc
            .perform(
                put(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(chiTietSanXuat))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ChiTietSanXuat in the database
        List<ChiTietSanXuat> chiTietSanXuatList = chiTietSanXuatRepository.findAll();
        assertThat(chiTietSanXuatList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateChiTietSanXuatWithPatch() throws Exception {
        // Initialize the database
        chiTietSanXuatRepository.saveAndFlush(chiTietSanXuat);

        int databaseSizeBeforeUpdate = chiTietSanXuatRepository.findAll().size();

        // Update the chiTietSanXuat using partial update
        ChiTietSanXuat partialUpdatedChiTietSanXuat = new ChiTietSanXuat();
        partialUpdatedChiTietSanXuat.setId(chiTietSanXuat.getId());

        partialUpdatedChiTietSanXuat.trangThai(UPDATED_HANG_SXHN).thongSo(UPDATED_THONG_SO).donVi(UPDATED_DON_VI);

        restChiTietSanXuatMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedChiTietSanXuat.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedChiTietSanXuat))
            )
            .andExpect(status().isOk());

        // Validate the ChiTietSanXuat in the database
        List<ChiTietSanXuat> chiTietSanXuatList = chiTietSanXuatRepository.findAll();
        assertThat(chiTietSanXuatList).hasSize(databaseSizeBeforeUpdate);
        ChiTietSanXuat testChiTietSanXuat = chiTietSanXuatList.get(chiTietSanXuatList.size() - 1);
        assertThat(testChiTietSanXuat.getMaKichBan()).isEqualTo(DEFAULT_MA_KICH_BAN);
        assertThat(testChiTietSanXuat.getTrangThai()).isEqualTo(UPDATED_HANG_SXHN);
        assertThat(testChiTietSanXuat.getThongSo()).isEqualTo(UPDATED_THONG_SO);
        assertThat(testChiTietSanXuat.getMinValue()).isEqualTo(DEFAULT_MIN_VALUE);
        assertThat(testChiTietSanXuat.getMaxValue()).isEqualTo(DEFAULT_MAX_VALUE);
        assertThat(testChiTietSanXuat.getTrungbinh()).isEqualTo(DEFAULT_TRUNGBINH);
        assertThat(testChiTietSanXuat.getDonVi()).isEqualTo(UPDATED_DON_VI);
    }

    @Test
    @Transactional
    void fullUpdateChiTietSanXuatWithPatch() throws Exception {
        // Initialize the database
        chiTietSanXuatRepository.saveAndFlush(chiTietSanXuat);

        int databaseSizeBeforeUpdate = chiTietSanXuatRepository.findAll().size();

        // Update the chiTietSanXuat using partial update
        ChiTietSanXuat partialUpdatedChiTietSanXuat = new ChiTietSanXuat();
        partialUpdatedChiTietSanXuat.setId(chiTietSanXuat.getId());

        partialUpdatedChiTietSanXuat
            .maKichBan(UPDATED_MA_KICH_BAN)
            .trangThai(UPDATED_HANG_SXHN)
            .thongSo(UPDATED_THONG_SO)
            .minValue(UPDATED_MIN_VALUE)
            .maxValue(UPDATED_MAX_VALUE)
            .trungbinh(UPDATED_TRUNGBINH)
            .donVi(UPDATED_DON_VI);

        restChiTietSanXuatMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedChiTietSanXuat.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedChiTietSanXuat))
            )
            .andExpect(status().isOk());

        // Validate the ChiTietSanXuat in the database
        List<ChiTietSanXuat> chiTietSanXuatList = chiTietSanXuatRepository.findAll();
        assertThat(chiTietSanXuatList).hasSize(databaseSizeBeforeUpdate);
        ChiTietSanXuat testChiTietSanXuat = chiTietSanXuatList.get(chiTietSanXuatList.size() - 1);
        assertThat(testChiTietSanXuat.getMaKichBan()).isEqualTo(UPDATED_MA_KICH_BAN);
        assertThat(testChiTietSanXuat.getTrangThai()).isEqualTo(UPDATED_HANG_SXHN);
        assertThat(testChiTietSanXuat.getThongSo()).isEqualTo(UPDATED_THONG_SO);
        assertThat(testChiTietSanXuat.getMinValue()).isEqualTo(UPDATED_MIN_VALUE);
        assertThat(testChiTietSanXuat.getMaxValue()).isEqualTo(UPDATED_MAX_VALUE);
        assertThat(testChiTietSanXuat.getTrungbinh()).isEqualTo(UPDATED_TRUNGBINH);
        assertThat(testChiTietSanXuat.getDonVi()).isEqualTo(UPDATED_DON_VI);
    }

    @Test
    @Transactional
    void patchNonExistingChiTietSanXuat() throws Exception {
        int databaseSizeBeforeUpdate = chiTietSanXuatRepository.findAll().size();
        chiTietSanXuat.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restChiTietSanXuatMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, chiTietSanXuat.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(chiTietSanXuat))
            )
            .andExpect(status().isBadRequest());

        // Validate the ChiTietSanXuat in the database
        List<ChiTietSanXuat> chiTietSanXuatList = chiTietSanXuatRepository.findAll();
        assertThat(chiTietSanXuatList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchChiTietSanXuat() throws Exception {
        int databaseSizeBeforeUpdate = chiTietSanXuatRepository.findAll().size();
        chiTietSanXuat.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restChiTietSanXuatMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(chiTietSanXuat))
            )
            .andExpect(status().isBadRequest());

        // Validate the ChiTietSanXuat in the database
        List<ChiTietSanXuat> chiTietSanXuatList = chiTietSanXuatRepository.findAll();
        assertThat(chiTietSanXuatList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamChiTietSanXuat() throws Exception {
        int databaseSizeBeforeUpdate = chiTietSanXuatRepository.findAll().size();
        chiTietSanXuat.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restChiTietSanXuatMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(chiTietSanXuat))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ChiTietSanXuat in the database
        List<ChiTietSanXuat> chiTietSanXuatList = chiTietSanXuatRepository.findAll();
        assertThat(chiTietSanXuatList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteChiTietSanXuat() throws Exception {
        // Initialize the database
        chiTietSanXuatRepository.saveAndFlush(chiTietSanXuat);

        int databaseSizeBeforeDelete = chiTietSanXuatRepository.findAll().size();

        // Delete the chiTietSanXuat
        restChiTietSanXuatMockMvc
            .perform(delete(ENTITY_API_URL_ID, chiTietSanXuat.getId()).with(csrf()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ChiTietSanXuat> chiTietSanXuatList = chiTietSanXuatRepository.findAll();
        assertThat(chiTietSanXuatList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
