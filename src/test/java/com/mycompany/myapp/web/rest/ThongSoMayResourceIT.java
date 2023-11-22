package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.ThongSoMay;
import com.mycompany.myapp.repository.ThongSoMayRepository;
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
 * Integration tests for the {@link ThongSoMayResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ThongSoMayResourceIT {

    private static final String DEFAULT_MA_THIET_BI = "AAAAAAAAAA";
    private static final String UPDATED_MA_THIET_BI = "BBBBBBBBBB";

    private static final String DEFAULT_LOAI_THIET_BI = "AAAAAAAAAA";
    private static final String UPDATED_LOAI_THIET_BI = "BBBBBBBBBB";

    private static final Integer DEFAULT_HANG_TMS = 1;
    private static final Integer UPDATED_HANG_TMS = 2;

    private static final String DEFAULT_THONG_SO = "AAAAAAAAAA";
    private static final String UPDATED_THONG_SO = "BBBBBBBBBB";

    private static final String DEFAULT_MO_TA = "AAAAAAAAAA";
    private static final String UPDATED_MO_TA = "BBBBBBBBBB";

    private static final String DEFAULT_TRANG_THAI = "AAAAAAAAAA";
    private static final String UPDATED_TRANG_THAI = "BBBBBBBBBB";

    private static final String DEFAULT_PHAN_LOAI = "AAAAAAAAAA";
    private static final String UPDATED_PHAN_LOAI = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/thong-so-mays";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ThongSoMayRepository thongSoMayRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restThongSoMayMockMvc;

    private ThongSoMay thongSoMay;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ThongSoMay createEntity(EntityManager em) {
        ThongSoMay thongSoMay = new ThongSoMay()
            .maThietBi(DEFAULT_MA_THIET_BI)
            .loaiThietBi(DEFAULT_LOAI_THIET_BI)
            .hangTms(DEFAULT_HANG_TMS)
            .thongSo(DEFAULT_THONG_SO)
            .moTa(DEFAULT_MO_TA)
            .trangThai(DEFAULT_TRANG_THAI)
            .phanLoai(DEFAULT_PHAN_LOAI);
        return thongSoMay;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ThongSoMay createUpdatedEntity(EntityManager em) {
        ThongSoMay thongSoMay = new ThongSoMay()
            .maThietBi(UPDATED_MA_THIET_BI)
            .loaiThietBi(UPDATED_LOAI_THIET_BI)
            .hangTms(UPDATED_HANG_TMS)
            .thongSo(UPDATED_THONG_SO)
            .moTa(UPDATED_MO_TA)
            .trangThai(UPDATED_TRANG_THAI)
            .phanLoai(UPDATED_PHAN_LOAI);
        return thongSoMay;
    }

    @BeforeEach
    public void initTest() {
        thongSoMay = createEntity(em);
    }

    @Test
    @Transactional
    void createThongSoMay() throws Exception {
        int databaseSizeBeforeCreate = thongSoMayRepository.findAll().size();
        // Create the ThongSoMay
        restThongSoMayMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(thongSoMay))
            )
            .andExpect(status().isCreated());

        // Validate the ThongSoMay in the database
        List<ThongSoMay> thongSoMayList = thongSoMayRepository.findAll();
        assertThat(thongSoMayList).hasSize(databaseSizeBeforeCreate + 1);
        ThongSoMay testThongSoMay = thongSoMayList.get(thongSoMayList.size() - 1);
        assertThat(testThongSoMay.getMaThietBi()).isEqualTo(DEFAULT_MA_THIET_BI);
        assertThat(testThongSoMay.getLoaiThietBi()).isEqualTo(DEFAULT_LOAI_THIET_BI);
        assertThat(testThongSoMay.getHangTms()).isEqualTo(DEFAULT_HANG_TMS);
        assertThat(testThongSoMay.getThongSo()).isEqualTo(DEFAULT_THONG_SO);
        assertThat(testThongSoMay.getMoTa()).isEqualTo(DEFAULT_MO_TA);
        assertThat(testThongSoMay.getTrangThai()).isEqualTo(DEFAULT_TRANG_THAI);
        assertThat(testThongSoMay.getPhanLoai()).isEqualTo(DEFAULT_PHAN_LOAI);
    }

    @Test
    @Transactional
    void createThongSoMayWithExistingId() throws Exception {
        // Create the ThongSoMay with an existing ID
        thongSoMay.setId(1L);

        int databaseSizeBeforeCreate = thongSoMayRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restThongSoMayMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(thongSoMay))
            )
            .andExpect(status().isBadRequest());

        // Validate the ThongSoMay in the database
        List<ThongSoMay> thongSoMayList = thongSoMayRepository.findAll();
        assertThat(thongSoMayList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllThongSoMays() throws Exception {
        // Initialize the database
        thongSoMayRepository.saveAndFlush(thongSoMay);

        // Get all the thongSoMayList
        restThongSoMayMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(thongSoMay.getId().intValue())))
            .andExpect(jsonPath("$.[*].maThietBi").value(hasItem(DEFAULT_MA_THIET_BI)))
            .andExpect(jsonPath("$.[*].loaiThietBi").value(hasItem(DEFAULT_LOAI_THIET_BI)))
            .andExpect(jsonPath("$.[*].hangTms").value(hasItem(DEFAULT_HANG_TMS)))
            .andExpect(jsonPath("$.[*].thongSo").value(hasItem(DEFAULT_THONG_SO)))
            .andExpect(jsonPath("$.[*].moTa").value(hasItem(DEFAULT_MO_TA)))
            .andExpect(jsonPath("$.[*].trangThai").value(hasItem(DEFAULT_TRANG_THAI)))
            .andExpect(jsonPath("$.[*].phanLoai").value(hasItem(DEFAULT_PHAN_LOAI)));
    }

    @Test
    @Transactional
    void getThongSoMay() throws Exception {
        // Initialize the database
        thongSoMayRepository.saveAndFlush(thongSoMay);

        // Get the thongSoMay
        restThongSoMayMockMvc
            .perform(get(ENTITY_API_URL_ID, thongSoMay.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(thongSoMay.getId().intValue()))
            .andExpect(jsonPath("$.maThietBi").value(DEFAULT_MA_THIET_BI))
            .andExpect(jsonPath("$.loaiThietBi").value(DEFAULT_LOAI_THIET_BI))
            .andExpect(jsonPath("$.hangTms").value(DEFAULT_HANG_TMS))
            .andExpect(jsonPath("$.thongSo").value(DEFAULT_THONG_SO))
            .andExpect(jsonPath("$.moTa").value(DEFAULT_MO_TA))
            .andExpect(jsonPath("$.trangThai").value(DEFAULT_TRANG_THAI))
            .andExpect(jsonPath("$.phanLoai").value(DEFAULT_PHAN_LOAI));
    }

    @Test
    @Transactional
    void getNonExistingThongSoMay() throws Exception {
        // Get the thongSoMay
        restThongSoMayMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewThongSoMay() throws Exception {
        // Initialize the database
        thongSoMayRepository.saveAndFlush(thongSoMay);

        int databaseSizeBeforeUpdate = thongSoMayRepository.findAll().size();

        // Update the thongSoMay
        ThongSoMay updatedThongSoMay = thongSoMayRepository.findById(thongSoMay.getId()).get();
        // Disconnect from session so that the updates on updatedThongSoMay are not directly saved in db
        em.detach(updatedThongSoMay);
        updatedThongSoMay
            .maThietBi(UPDATED_MA_THIET_BI)
            .loaiThietBi(UPDATED_LOAI_THIET_BI)
            .hangTms(UPDATED_HANG_TMS)
            .thongSo(UPDATED_THONG_SO)
            .moTa(UPDATED_MO_TA)
            .trangThai(UPDATED_TRANG_THAI)
            .phanLoai(UPDATED_PHAN_LOAI);

        restThongSoMayMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedThongSoMay.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedThongSoMay))
            )
            .andExpect(status().isOk());

        // Validate the ThongSoMay in the database
        List<ThongSoMay> thongSoMayList = thongSoMayRepository.findAll();
        assertThat(thongSoMayList).hasSize(databaseSizeBeforeUpdate);
        ThongSoMay testThongSoMay = thongSoMayList.get(thongSoMayList.size() - 1);
        assertThat(testThongSoMay.getMaThietBi()).isEqualTo(UPDATED_MA_THIET_BI);
        assertThat(testThongSoMay.getLoaiThietBi()).isEqualTo(UPDATED_LOAI_THIET_BI);
        assertThat(testThongSoMay.getHangTms()).isEqualTo(UPDATED_HANG_TMS);
        assertThat(testThongSoMay.getThongSo()).isEqualTo(UPDATED_THONG_SO);
        assertThat(testThongSoMay.getMoTa()).isEqualTo(UPDATED_MO_TA);
        assertThat(testThongSoMay.getTrangThai()).isEqualTo(UPDATED_TRANG_THAI);
        assertThat(testThongSoMay.getPhanLoai()).isEqualTo(UPDATED_PHAN_LOAI);
    }

    @Test
    @Transactional
    void putNonExistingThongSoMay() throws Exception {
        int databaseSizeBeforeUpdate = thongSoMayRepository.findAll().size();
        thongSoMay.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restThongSoMayMockMvc
            .perform(
                put(ENTITY_API_URL_ID, thongSoMay.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(thongSoMay))
            )
            .andExpect(status().isBadRequest());

        // Validate the ThongSoMay in the database
        List<ThongSoMay> thongSoMayList = thongSoMayRepository.findAll();
        assertThat(thongSoMayList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchThongSoMay() throws Exception {
        int databaseSizeBeforeUpdate = thongSoMayRepository.findAll().size();
        thongSoMay.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restThongSoMayMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(thongSoMay))
            )
            .andExpect(status().isBadRequest());

        // Validate the ThongSoMay in the database
        List<ThongSoMay> thongSoMayList = thongSoMayRepository.findAll();
        assertThat(thongSoMayList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamThongSoMay() throws Exception {
        int databaseSizeBeforeUpdate = thongSoMayRepository.findAll().size();
        thongSoMay.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restThongSoMayMockMvc
            .perform(
                put(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(thongSoMay))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ThongSoMay in the database
        List<ThongSoMay> thongSoMayList = thongSoMayRepository.findAll();
        assertThat(thongSoMayList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateThongSoMayWithPatch() throws Exception {
        // Initialize the database
        thongSoMayRepository.saveAndFlush(thongSoMay);

        int databaseSizeBeforeUpdate = thongSoMayRepository.findAll().size();

        // Update the thongSoMay using partial update
        ThongSoMay partialUpdatedThongSoMay = new ThongSoMay();
        partialUpdatedThongSoMay.setId(thongSoMay.getId());

        partialUpdatedThongSoMay
            .loaiThietBi(UPDATED_LOAI_THIET_BI)
            .moTa(UPDATED_MO_TA)
            .trangThai(UPDATED_TRANG_THAI)
            .phanLoai(UPDATED_PHAN_LOAI);

        restThongSoMayMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedThongSoMay.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedThongSoMay))
            )
            .andExpect(status().isOk());

        // Validate the ThongSoMay in the database
        List<ThongSoMay> thongSoMayList = thongSoMayRepository.findAll();
        assertThat(thongSoMayList).hasSize(databaseSizeBeforeUpdate);
        ThongSoMay testThongSoMay = thongSoMayList.get(thongSoMayList.size() - 1);
        assertThat(testThongSoMay.getMaThietBi()).isEqualTo(DEFAULT_MA_THIET_BI);
        assertThat(testThongSoMay.getLoaiThietBi()).isEqualTo(UPDATED_LOAI_THIET_BI);
        assertThat(testThongSoMay.getHangTms()).isEqualTo(DEFAULT_HANG_TMS);
        assertThat(testThongSoMay.getThongSo()).isEqualTo(DEFAULT_THONG_SO);
        assertThat(testThongSoMay.getMoTa()).isEqualTo(UPDATED_MO_TA);
        assertThat(testThongSoMay.getTrangThai()).isEqualTo(UPDATED_TRANG_THAI);
        assertThat(testThongSoMay.getPhanLoai()).isEqualTo(UPDATED_PHAN_LOAI);
    }

    @Test
    @Transactional
    void fullUpdateThongSoMayWithPatch() throws Exception {
        // Initialize the database
        thongSoMayRepository.saveAndFlush(thongSoMay);

        int databaseSizeBeforeUpdate = thongSoMayRepository.findAll().size();

        // Update the thongSoMay using partial update
        ThongSoMay partialUpdatedThongSoMay = new ThongSoMay();
        partialUpdatedThongSoMay.setId(thongSoMay.getId());

        partialUpdatedThongSoMay
            .maThietBi(UPDATED_MA_THIET_BI)
            .loaiThietBi(UPDATED_LOAI_THIET_BI)
            .hangTms(UPDATED_HANG_TMS)
            .thongSo(UPDATED_THONG_SO)
            .moTa(UPDATED_MO_TA)
            .trangThai(UPDATED_TRANG_THAI)
            .phanLoai(UPDATED_PHAN_LOAI);

        restThongSoMayMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedThongSoMay.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedThongSoMay))
            )
            .andExpect(status().isOk());

        // Validate the ThongSoMay in the database
        List<ThongSoMay> thongSoMayList = thongSoMayRepository.findAll();
        assertThat(thongSoMayList).hasSize(databaseSizeBeforeUpdate);
        ThongSoMay testThongSoMay = thongSoMayList.get(thongSoMayList.size() - 1);
        assertThat(testThongSoMay.getMaThietBi()).isEqualTo(UPDATED_MA_THIET_BI);
        assertThat(testThongSoMay.getLoaiThietBi()).isEqualTo(UPDATED_LOAI_THIET_BI);
        assertThat(testThongSoMay.getHangTms()).isEqualTo(UPDATED_HANG_TMS);
        assertThat(testThongSoMay.getThongSo()).isEqualTo(UPDATED_THONG_SO);
        assertThat(testThongSoMay.getMoTa()).isEqualTo(UPDATED_MO_TA);
        assertThat(testThongSoMay.getTrangThai()).isEqualTo(UPDATED_TRANG_THAI);
        assertThat(testThongSoMay.getPhanLoai()).isEqualTo(UPDATED_PHAN_LOAI);
    }

    @Test
    @Transactional
    void patchNonExistingThongSoMay() throws Exception {
        int databaseSizeBeforeUpdate = thongSoMayRepository.findAll().size();
        thongSoMay.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restThongSoMayMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, thongSoMay.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(thongSoMay))
            )
            .andExpect(status().isBadRequest());

        // Validate the ThongSoMay in the database
        List<ThongSoMay> thongSoMayList = thongSoMayRepository.findAll();
        assertThat(thongSoMayList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchThongSoMay() throws Exception {
        int databaseSizeBeforeUpdate = thongSoMayRepository.findAll().size();
        thongSoMay.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restThongSoMayMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(thongSoMay))
            )
            .andExpect(status().isBadRequest());

        // Validate the ThongSoMay in the database
        List<ThongSoMay> thongSoMayList = thongSoMayRepository.findAll();
        assertThat(thongSoMayList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamThongSoMay() throws Exception {
        int databaseSizeBeforeUpdate = thongSoMayRepository.findAll().size();
        thongSoMay.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restThongSoMayMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(thongSoMay))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ThongSoMay in the database
        List<ThongSoMay> thongSoMayList = thongSoMayRepository.findAll();
        assertThat(thongSoMayList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteThongSoMay() throws Exception {
        // Initialize the database
        thongSoMayRepository.saveAndFlush(thongSoMay);

        int databaseSizeBeforeDelete = thongSoMayRepository.findAll().size();

        // Delete the thongSoMay
        restThongSoMayMockMvc
            .perform(delete(ENTITY_API_URL_ID, thongSoMay.getId()).with(csrf()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ThongSoMay> thongSoMayList = thongSoMayRepository.findAll();
        assertThat(thongSoMayList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
