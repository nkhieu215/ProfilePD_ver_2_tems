package com.mycompany.myapp.web.rest;

import static com.mycompany.myapp.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.SanXuatHangNgay;
import com.mycompany.myapp.repository.SanXuatHangNgayRepository;
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
 * Integration tests for the {@link SanXuatHangNgayResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class SanXuatHangNgayResourceIT {

    private static final String DEFAULT_MA_KICH_BAN = "AAAAAAAAAA";
    private static final String UPDATED_MA_KICH_BAN = "BBBBBBBBBB";

    private static final String DEFAULT_MA_THIET_BI = "AAAAAAAAAA";
    private static final String UPDATED_MA_THIET_BI = "BBBBBBBBBB";

    private static final String DEFAULT_LOAI_THIET_BI = "AAAAAAAAAA";
    private static final String UPDATED_LOAI_THIET_BI = "BBBBBBBBBB";

    private static final String DEFAULT_DAY_CHUYEN = "AAAAAAAAAA";
    private static final String UPDATED_DAY_CHUYEN = "BBBBBBBBBB";

    private static final String DEFAULT_MA_SAN_PHAM = "AAAAAAAAAA";
    private static final String UPDATED_MA_SAN_PHAM = "BBBBBBBBBB";

    private static final String DEFAULT_VERSION_SAN_PHAM = "AAAAAAAAAA";
    private static final String UPDATED_VERSION_SAN_PHAM = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_NGAY_TAO = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_NGAY_TAO = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_TIME_UPDATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_TIME_UPDATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_TRANG_THAI = "AAAAAAAAAA";
    private static final String UPDATED_TRANG_THAI = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/san-xuat-hang-ngays";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private SanXuatHangNgayRepository sanXuatHangNgayRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSanXuatHangNgayMockMvc;

    private SanXuatHangNgay sanXuatHangNgay;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SanXuatHangNgay createEntity(EntityManager em) {
        SanXuatHangNgay sanXuatHangNgay = new SanXuatHangNgay()
            .maKichBan(DEFAULT_MA_KICH_BAN)
            .maThietBi(DEFAULT_MA_THIET_BI)
            .loaiThietBi(DEFAULT_LOAI_THIET_BI)
            .dayChuyen(DEFAULT_DAY_CHUYEN)
            .maSanPham(DEFAULT_MA_SAN_PHAM)
            .versionSanPham(DEFAULT_VERSION_SAN_PHAM)
            .ngayTao(DEFAULT_NGAY_TAO)
            .timeUpdate(DEFAULT_TIME_UPDATE)
            .trangThai(DEFAULT_TRANG_THAI);
        return sanXuatHangNgay;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SanXuatHangNgay createUpdatedEntity(EntityManager em) {
        SanXuatHangNgay sanXuatHangNgay = new SanXuatHangNgay()
            .maKichBan(UPDATED_MA_KICH_BAN)
            .maThietBi(UPDATED_MA_THIET_BI)
            .loaiThietBi(UPDATED_LOAI_THIET_BI)
            .dayChuyen(UPDATED_DAY_CHUYEN)
            .maSanPham(UPDATED_MA_SAN_PHAM)
            .versionSanPham(UPDATED_VERSION_SAN_PHAM)
            .ngayTao(UPDATED_NGAY_TAO)
            .timeUpdate(UPDATED_TIME_UPDATE)
            .trangThai(UPDATED_TRANG_THAI);
        return sanXuatHangNgay;
    }

    @BeforeEach
    public void initTest() {
        sanXuatHangNgay = createEntity(em);
    }

    @Test
    @Transactional
    void createSanXuatHangNgay() throws Exception {
        int databaseSizeBeforeCreate = sanXuatHangNgayRepository.findAll().size();
        // Create the SanXuatHangNgay
        restSanXuatHangNgayMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(sanXuatHangNgay))
            )
            .andExpect(status().isCreated());

        // Validate the SanXuatHangNgay in the database
        List<SanXuatHangNgay> sanXuatHangNgayList = sanXuatHangNgayRepository.findAll();
        assertThat(sanXuatHangNgayList).hasSize(databaseSizeBeforeCreate + 1);
        SanXuatHangNgay testSanXuatHangNgay = sanXuatHangNgayList.get(sanXuatHangNgayList.size() - 1);
        assertThat(testSanXuatHangNgay.getMaKichBan()).isEqualTo(DEFAULT_MA_KICH_BAN);
        assertThat(testSanXuatHangNgay.getMaThietBi()).isEqualTo(DEFAULT_MA_THIET_BI);
        assertThat(testSanXuatHangNgay.getLoaiThietBi()).isEqualTo(DEFAULT_LOAI_THIET_BI);
        assertThat(testSanXuatHangNgay.getDayChuyen()).isEqualTo(DEFAULT_DAY_CHUYEN);
        assertThat(testSanXuatHangNgay.getMaSanPham()).isEqualTo(DEFAULT_MA_SAN_PHAM);
        assertThat(testSanXuatHangNgay.getVersionSanPham()).isEqualTo(DEFAULT_VERSION_SAN_PHAM);
        assertThat(testSanXuatHangNgay.getNgayTao()).isEqualTo(DEFAULT_NGAY_TAO);
        assertThat(testSanXuatHangNgay.getTimeUpdate()).isEqualTo(DEFAULT_TIME_UPDATE);
        assertThat(testSanXuatHangNgay.getTrangThai()).isEqualTo(DEFAULT_TRANG_THAI);
    }

    @Test
    @Transactional
    void createSanXuatHangNgayWithExistingId() throws Exception {
        // Create the SanXuatHangNgay with an existing ID
        sanXuatHangNgay.setId(1L);

        int databaseSizeBeforeCreate = sanXuatHangNgayRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restSanXuatHangNgayMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(sanXuatHangNgay))
            )
            .andExpect(status().isBadRequest());

        // Validate the SanXuatHangNgay in the database
        List<SanXuatHangNgay> sanXuatHangNgayList = sanXuatHangNgayRepository.findAll();
        assertThat(sanXuatHangNgayList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllSanXuatHangNgays() throws Exception {
        // Initialize the database
        sanXuatHangNgayRepository.saveAndFlush(sanXuatHangNgay);

        // Get all the sanXuatHangNgayList
        restSanXuatHangNgayMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sanXuatHangNgay.getId().intValue())))
            .andExpect(jsonPath("$.[*].maKichBan").value(hasItem(DEFAULT_MA_KICH_BAN)))
            .andExpect(jsonPath("$.[*].maThietBi").value(hasItem(DEFAULT_MA_THIET_BI)))
            .andExpect(jsonPath("$.[*].loaiThietBi").value(hasItem(DEFAULT_LOAI_THIET_BI)))
            .andExpect(jsonPath("$.[*].dayChuyen").value(hasItem(DEFAULT_DAY_CHUYEN)))
            .andExpect(jsonPath("$.[*].maSanPham").value(hasItem(DEFAULT_MA_SAN_PHAM)))
            .andExpect(jsonPath("$.[*].versionSanPham").value(hasItem(DEFAULT_VERSION_SAN_PHAM)))
            .andExpect(jsonPath("$.[*].ngayTao").value(hasItem(sameInstant(DEFAULT_NGAY_TAO))))
            .andExpect(jsonPath("$.[*].timeUpdate").value(hasItem(sameInstant(DEFAULT_TIME_UPDATE))))
            .andExpect(jsonPath("$.[*].trangThai").value(hasItem(DEFAULT_TRANG_THAI)));
    }

    @Test
    @Transactional
    void getSanXuatHangNgay() throws Exception {
        // Initialize the database
        sanXuatHangNgayRepository.saveAndFlush(sanXuatHangNgay);

        // Get the sanXuatHangNgay
        restSanXuatHangNgayMockMvc
            .perform(get(ENTITY_API_URL_ID, sanXuatHangNgay.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(sanXuatHangNgay.getId().intValue()))
            .andExpect(jsonPath("$.maKichBan").value(DEFAULT_MA_KICH_BAN))
            .andExpect(jsonPath("$.maThietBi").value(DEFAULT_MA_THIET_BI))
            .andExpect(jsonPath("$.loaiThietBi").value(DEFAULT_LOAI_THIET_BI))
            .andExpect(jsonPath("$.dayChuyen").value(DEFAULT_DAY_CHUYEN))
            .andExpect(jsonPath("$.maSanPham").value(DEFAULT_MA_SAN_PHAM))
            .andExpect(jsonPath("$.versionSanPham").value(DEFAULT_VERSION_SAN_PHAM))
            .andExpect(jsonPath("$.ngayTao").value(sameInstant(DEFAULT_NGAY_TAO)))
            .andExpect(jsonPath("$.timeUpdate").value(sameInstant(DEFAULT_TIME_UPDATE)))
            .andExpect(jsonPath("$.trangThai").value(DEFAULT_TRANG_THAI));
    }

    @Test
    @Transactional
    void getNonExistingSanXuatHangNgay() throws Exception {
        // Get the sanXuatHangNgay
        restSanXuatHangNgayMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewSanXuatHangNgay() throws Exception {
        // Initialize the database
        sanXuatHangNgayRepository.saveAndFlush(sanXuatHangNgay);

        int databaseSizeBeforeUpdate = sanXuatHangNgayRepository.findAll().size();

        // Update the sanXuatHangNgay
        SanXuatHangNgay updatedSanXuatHangNgay = sanXuatHangNgayRepository.findById(sanXuatHangNgay.getId()).get();
        // Disconnect from session so that the updates on updatedSanXuatHangNgay are not directly saved in db
        em.detach(updatedSanXuatHangNgay);
        updatedSanXuatHangNgay
            .maKichBan(UPDATED_MA_KICH_BAN)
            .maThietBi(UPDATED_MA_THIET_BI)
            .loaiThietBi(UPDATED_LOAI_THIET_BI)
            .dayChuyen(UPDATED_DAY_CHUYEN)
            .maSanPham(UPDATED_MA_SAN_PHAM)
            .versionSanPham(UPDATED_VERSION_SAN_PHAM)
            .ngayTao(UPDATED_NGAY_TAO)
            .timeUpdate(UPDATED_TIME_UPDATE)
            .trangThai(UPDATED_TRANG_THAI);

        restSanXuatHangNgayMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedSanXuatHangNgay.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedSanXuatHangNgay))
            )
            .andExpect(status().isOk());

        // Validate the SanXuatHangNgay in the database
        List<SanXuatHangNgay> sanXuatHangNgayList = sanXuatHangNgayRepository.findAll();
        assertThat(sanXuatHangNgayList).hasSize(databaseSizeBeforeUpdate);
        SanXuatHangNgay testSanXuatHangNgay = sanXuatHangNgayList.get(sanXuatHangNgayList.size() - 1);
        assertThat(testSanXuatHangNgay.getMaKichBan()).isEqualTo(UPDATED_MA_KICH_BAN);
        assertThat(testSanXuatHangNgay.getMaThietBi()).isEqualTo(UPDATED_MA_THIET_BI);
        assertThat(testSanXuatHangNgay.getLoaiThietBi()).isEqualTo(UPDATED_LOAI_THIET_BI);
        assertThat(testSanXuatHangNgay.getDayChuyen()).isEqualTo(UPDATED_DAY_CHUYEN);
        assertThat(testSanXuatHangNgay.getMaSanPham()).isEqualTo(UPDATED_MA_SAN_PHAM);
        assertThat(testSanXuatHangNgay.getVersionSanPham()).isEqualTo(UPDATED_VERSION_SAN_PHAM);
        assertThat(testSanXuatHangNgay.getNgayTao()).isEqualTo(UPDATED_NGAY_TAO);
        assertThat(testSanXuatHangNgay.getTimeUpdate()).isEqualTo(UPDATED_TIME_UPDATE);
        assertThat(testSanXuatHangNgay.getTrangThai()).isEqualTo(UPDATED_TRANG_THAI);
    }

    @Test
    @Transactional
    void putNonExistingSanXuatHangNgay() throws Exception {
        int databaseSizeBeforeUpdate = sanXuatHangNgayRepository.findAll().size();
        sanXuatHangNgay.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSanXuatHangNgayMockMvc
            .perform(
                put(ENTITY_API_URL_ID, sanXuatHangNgay.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(sanXuatHangNgay))
            )
            .andExpect(status().isBadRequest());

        // Validate the SanXuatHangNgay in the database
        List<SanXuatHangNgay> sanXuatHangNgayList = sanXuatHangNgayRepository.findAll();
        assertThat(sanXuatHangNgayList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchSanXuatHangNgay() throws Exception {
        int databaseSizeBeforeUpdate = sanXuatHangNgayRepository.findAll().size();
        sanXuatHangNgay.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSanXuatHangNgayMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(sanXuatHangNgay))
            )
            .andExpect(status().isBadRequest());

        // Validate the SanXuatHangNgay in the database
        List<SanXuatHangNgay> sanXuatHangNgayList = sanXuatHangNgayRepository.findAll();
        assertThat(sanXuatHangNgayList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamSanXuatHangNgay() throws Exception {
        int databaseSizeBeforeUpdate = sanXuatHangNgayRepository.findAll().size();
        sanXuatHangNgay.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSanXuatHangNgayMockMvc
            .perform(
                put(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(sanXuatHangNgay))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the SanXuatHangNgay in the database
        List<SanXuatHangNgay> sanXuatHangNgayList = sanXuatHangNgayRepository.findAll();
        assertThat(sanXuatHangNgayList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateSanXuatHangNgayWithPatch() throws Exception {
        // Initialize the database
        sanXuatHangNgayRepository.saveAndFlush(sanXuatHangNgay);

        int databaseSizeBeforeUpdate = sanXuatHangNgayRepository.findAll().size();

        // Update the sanXuatHangNgay using partial update
        SanXuatHangNgay partialUpdatedSanXuatHangNgay = new SanXuatHangNgay();
        partialUpdatedSanXuatHangNgay.setId(sanXuatHangNgay.getId());

        partialUpdatedSanXuatHangNgay
            .dayChuyen(UPDATED_DAY_CHUYEN)
            .maSanPham(UPDATED_MA_SAN_PHAM)
            .versionSanPham(UPDATED_VERSION_SAN_PHAM)
            .ngayTao(UPDATED_NGAY_TAO)
            .timeUpdate(UPDATED_TIME_UPDATE)
            .trangThai(UPDATED_TRANG_THAI);

        restSanXuatHangNgayMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSanXuatHangNgay.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedSanXuatHangNgay))
            )
            .andExpect(status().isOk());

        // Validate the SanXuatHangNgay in the database
        List<SanXuatHangNgay> sanXuatHangNgayList = sanXuatHangNgayRepository.findAll();
        assertThat(sanXuatHangNgayList).hasSize(databaseSizeBeforeUpdate);
        SanXuatHangNgay testSanXuatHangNgay = sanXuatHangNgayList.get(sanXuatHangNgayList.size() - 1);
        assertThat(testSanXuatHangNgay.getMaKichBan()).isEqualTo(DEFAULT_MA_KICH_BAN);
        assertThat(testSanXuatHangNgay.getMaThietBi()).isEqualTo(DEFAULT_MA_THIET_BI);
        assertThat(testSanXuatHangNgay.getLoaiThietBi()).isEqualTo(DEFAULT_LOAI_THIET_BI);
        assertThat(testSanXuatHangNgay.getDayChuyen()).isEqualTo(UPDATED_DAY_CHUYEN);
        assertThat(testSanXuatHangNgay.getMaSanPham()).isEqualTo(UPDATED_MA_SAN_PHAM);
        assertThat(testSanXuatHangNgay.getVersionSanPham()).isEqualTo(UPDATED_VERSION_SAN_PHAM);
        assertThat(testSanXuatHangNgay.getNgayTao()).isEqualTo(UPDATED_NGAY_TAO);
        assertThat(testSanXuatHangNgay.getTimeUpdate()).isEqualTo(UPDATED_TIME_UPDATE);
        assertThat(testSanXuatHangNgay.getTrangThai()).isEqualTo(UPDATED_TRANG_THAI);
    }

    @Test
    @Transactional
    void fullUpdateSanXuatHangNgayWithPatch() throws Exception {
        // Initialize the database
        sanXuatHangNgayRepository.saveAndFlush(sanXuatHangNgay);

        int databaseSizeBeforeUpdate = sanXuatHangNgayRepository.findAll().size();

        // Update the sanXuatHangNgay using partial update
        SanXuatHangNgay partialUpdatedSanXuatHangNgay = new SanXuatHangNgay();
        partialUpdatedSanXuatHangNgay.setId(sanXuatHangNgay.getId());

        partialUpdatedSanXuatHangNgay
            .maKichBan(UPDATED_MA_KICH_BAN)
            .maThietBi(UPDATED_MA_THIET_BI)
            .loaiThietBi(UPDATED_LOAI_THIET_BI)
            .dayChuyen(UPDATED_DAY_CHUYEN)
            .maSanPham(UPDATED_MA_SAN_PHAM)
            .versionSanPham(UPDATED_VERSION_SAN_PHAM)
            .ngayTao(UPDATED_NGAY_TAO)
            .timeUpdate(UPDATED_TIME_UPDATE)
            .trangThai(UPDATED_TRANG_THAI);

        restSanXuatHangNgayMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSanXuatHangNgay.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedSanXuatHangNgay))
            )
            .andExpect(status().isOk());

        // Validate the SanXuatHangNgay in the database
        List<SanXuatHangNgay> sanXuatHangNgayList = sanXuatHangNgayRepository.findAll();
        assertThat(sanXuatHangNgayList).hasSize(databaseSizeBeforeUpdate);
        SanXuatHangNgay testSanXuatHangNgay = sanXuatHangNgayList.get(sanXuatHangNgayList.size() - 1);
        assertThat(testSanXuatHangNgay.getMaKichBan()).isEqualTo(UPDATED_MA_KICH_BAN);
        assertThat(testSanXuatHangNgay.getMaThietBi()).isEqualTo(UPDATED_MA_THIET_BI);
        assertThat(testSanXuatHangNgay.getLoaiThietBi()).isEqualTo(UPDATED_LOAI_THIET_BI);
        assertThat(testSanXuatHangNgay.getDayChuyen()).isEqualTo(UPDATED_DAY_CHUYEN);
        assertThat(testSanXuatHangNgay.getMaSanPham()).isEqualTo(UPDATED_MA_SAN_PHAM);
        assertThat(testSanXuatHangNgay.getVersionSanPham()).isEqualTo(UPDATED_VERSION_SAN_PHAM);
        assertThat(testSanXuatHangNgay.getNgayTao()).isEqualTo(UPDATED_NGAY_TAO);
        assertThat(testSanXuatHangNgay.getTimeUpdate()).isEqualTo(UPDATED_TIME_UPDATE);
        assertThat(testSanXuatHangNgay.getTrangThai()).isEqualTo(UPDATED_TRANG_THAI);
    }

    @Test
    @Transactional
    void patchNonExistingSanXuatHangNgay() throws Exception {
        int databaseSizeBeforeUpdate = sanXuatHangNgayRepository.findAll().size();
        sanXuatHangNgay.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSanXuatHangNgayMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, sanXuatHangNgay.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(sanXuatHangNgay))
            )
            .andExpect(status().isBadRequest());

        // Validate the SanXuatHangNgay in the database
        List<SanXuatHangNgay> sanXuatHangNgayList = sanXuatHangNgayRepository.findAll();
        assertThat(sanXuatHangNgayList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchSanXuatHangNgay() throws Exception {
        int databaseSizeBeforeUpdate = sanXuatHangNgayRepository.findAll().size();
        sanXuatHangNgay.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSanXuatHangNgayMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(sanXuatHangNgay))
            )
            .andExpect(status().isBadRequest());

        // Validate the SanXuatHangNgay in the database
        List<SanXuatHangNgay> sanXuatHangNgayList = sanXuatHangNgayRepository.findAll();
        assertThat(sanXuatHangNgayList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamSanXuatHangNgay() throws Exception {
        int databaseSizeBeforeUpdate = sanXuatHangNgayRepository.findAll().size();
        sanXuatHangNgay.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSanXuatHangNgayMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(sanXuatHangNgay))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the SanXuatHangNgay in the database
        List<SanXuatHangNgay> sanXuatHangNgayList = sanXuatHangNgayRepository.findAll();
        assertThat(sanXuatHangNgayList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteSanXuatHangNgay() throws Exception {
        // Initialize the database
        sanXuatHangNgayRepository.saveAndFlush(sanXuatHangNgay);

        int databaseSizeBeforeDelete = sanXuatHangNgayRepository.findAll().size();

        // Delete the sanXuatHangNgay
        restSanXuatHangNgayMockMvc
            .perform(delete(ENTITY_API_URL_ID, sanXuatHangNgay.getId()).with(csrf()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SanXuatHangNgay> sanXuatHangNgayList = sanXuatHangNgayRepository.findAll();
        assertThat(sanXuatHangNgayList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
