package com.mycompany.myapp.web.rest;

import static com.mycompany.myapp.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.KichBan;
import com.mycompany.myapp.repository.KichBanRepository;
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
 * Integration tests for the {@link KichBanResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class KichBanResourceIT {

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

    private static final String DEFAULT_UPDATE_BY = "AAAAAAAAAA";
    private static final String UPDATED_UPDATE_BY = "BBBBBBBBBB";

    private static final String DEFAULT_TRANG_THAI = "AAAAAAAAAA";
    private static final String UPDATED_TRANG_THAI = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/kich-bans";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private KichBanRepository kichBanRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restKichBanMockMvc;

    private KichBan kichBan;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static KichBan createEntity(EntityManager em) {
        KichBan kichBan = new KichBan()
            .maKichBan(DEFAULT_MA_KICH_BAN)
            .maThietBi(DEFAULT_MA_THIET_BI)
            .loaiThietBi(DEFAULT_LOAI_THIET_BI)
            .dayChuyen(DEFAULT_DAY_CHUYEN)
            .maSanPham(DEFAULT_MA_SAN_PHAM)
            .versionSanPham(DEFAULT_VERSION_SAN_PHAM)
            .ngayTao(DEFAULT_NGAY_TAO)
            .timeUpdate(DEFAULT_TIME_UPDATE)
            .updateBy(DEFAULT_UPDATE_BY)
            .trangThai(DEFAULT_TRANG_THAI);
        return kichBan;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static KichBan createUpdatedEntity(EntityManager em) {
        KichBan kichBan = new KichBan()
            .maKichBan(UPDATED_MA_KICH_BAN)
            .maThietBi(UPDATED_MA_THIET_BI)
            .loaiThietBi(UPDATED_LOAI_THIET_BI)
            .dayChuyen(UPDATED_DAY_CHUYEN)
            .maSanPham(UPDATED_MA_SAN_PHAM)
            .versionSanPham(UPDATED_VERSION_SAN_PHAM)
            .ngayTao(UPDATED_NGAY_TAO)
            .timeUpdate(UPDATED_TIME_UPDATE)
            .updateBy(UPDATED_UPDATE_BY)
            .trangThai(UPDATED_TRANG_THAI);
        return kichBan;
    }

    @BeforeEach
    public void initTest() {
        kichBan = createEntity(em);
    }

    @Test
    @Transactional
    void createKichBan() throws Exception {
        int databaseSizeBeforeCreate = kichBanRepository.findAll().size();
        // Create the KichBan
        restKichBanMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(kichBan))
            )
            .andExpect(status().isCreated());

        // Validate the KichBan in the database
        List<KichBan> kichBanList = kichBanRepository.findAll();
        assertThat(kichBanList).hasSize(databaseSizeBeforeCreate + 1);
        KichBan testKichBan = kichBanList.get(kichBanList.size() - 1);
        assertThat(testKichBan.getMaKichBan()).isEqualTo(DEFAULT_MA_KICH_BAN);
        assertThat(testKichBan.getMaThietBi()).isEqualTo(DEFAULT_MA_THIET_BI);
        assertThat(testKichBan.getLoaiThietBi()).isEqualTo(DEFAULT_LOAI_THIET_BI);
        assertThat(testKichBan.getDayChuyen()).isEqualTo(DEFAULT_DAY_CHUYEN);
        assertThat(testKichBan.getMaSanPham()).isEqualTo(DEFAULT_MA_SAN_PHAM);
        assertThat(testKichBan.getVersionSanPham()).isEqualTo(DEFAULT_VERSION_SAN_PHAM);
        assertThat(testKichBan.getNgayTao()).isEqualTo(DEFAULT_NGAY_TAO);
        assertThat(testKichBan.getTimeUpdate()).isEqualTo(DEFAULT_TIME_UPDATE);
        assertThat(testKichBan.getUpdateBy()).isEqualTo(DEFAULT_UPDATE_BY);
        assertThat(testKichBan.getTrangThai()).isEqualTo(DEFAULT_TRANG_THAI);
    }

    @Test
    @Transactional
    void createKichBanWithExistingId() throws Exception {
        // Create the KichBan with an existing ID
        kichBan.setId(1L);

        int databaseSizeBeforeCreate = kichBanRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restKichBanMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(kichBan))
            )
            .andExpect(status().isBadRequest());

        // Validate the KichBan in the database
        List<KichBan> kichBanList = kichBanRepository.findAll();
        assertThat(kichBanList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllKichBans() throws Exception {
        // Initialize the database
        kichBanRepository.saveAndFlush(kichBan);

        // Get all the kichBanList
        restKichBanMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(kichBan.getId().intValue())))
            .andExpect(jsonPath("$.[*].maKichBan").value(hasItem(DEFAULT_MA_KICH_BAN)))
            .andExpect(jsonPath("$.[*].maThietBi").value(hasItem(DEFAULT_MA_THIET_BI)))
            .andExpect(jsonPath("$.[*].loaiThietBi").value(hasItem(DEFAULT_LOAI_THIET_BI)))
            .andExpect(jsonPath("$.[*].dayChuyen").value(hasItem(DEFAULT_DAY_CHUYEN)))
            .andExpect(jsonPath("$.[*].maSanPham").value(hasItem(DEFAULT_MA_SAN_PHAM)))
            .andExpect(jsonPath("$.[*].versionSanPham").value(hasItem(DEFAULT_VERSION_SAN_PHAM)))
            .andExpect(jsonPath("$.[*].ngayTao").value(hasItem(sameInstant(DEFAULT_NGAY_TAO))))
            .andExpect(jsonPath("$.[*].timeUpdate").value(hasItem(sameInstant(DEFAULT_TIME_UPDATE))))
            .andExpect(jsonPath("$.[*].updateBy").value(hasItem(DEFAULT_UPDATE_BY)))
            .andExpect(jsonPath("$.[*].trangThai").value(hasItem(DEFAULT_TRANG_THAI)));
    }

    @Test
    @Transactional
    void getKichBan() throws Exception {
        // Initialize the database
        kichBanRepository.saveAndFlush(kichBan);

        // Get the kichBan
        restKichBanMockMvc
            .perform(get(ENTITY_API_URL_ID, kichBan.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(kichBan.getId().intValue()))
            .andExpect(jsonPath("$.maKichBan").value(DEFAULT_MA_KICH_BAN))
            .andExpect(jsonPath("$.maThietBi").value(DEFAULT_MA_THIET_BI))
            .andExpect(jsonPath("$.loaiThietBi").value(DEFAULT_LOAI_THIET_BI))
            .andExpect(jsonPath("$.dayChuyen").value(DEFAULT_DAY_CHUYEN))
            .andExpect(jsonPath("$.maSanPham").value(DEFAULT_MA_SAN_PHAM))
            .andExpect(jsonPath("$.versionSanPham").value(DEFAULT_VERSION_SAN_PHAM))
            .andExpect(jsonPath("$.ngayTao").value(sameInstant(DEFAULT_NGAY_TAO)))
            .andExpect(jsonPath("$.timeUpdate").value(sameInstant(DEFAULT_TIME_UPDATE)))
            .andExpect(jsonPath("$.updateBy").value(DEFAULT_UPDATE_BY))
            .andExpect(jsonPath("$.trangThai").value(DEFAULT_TRANG_THAI));
    }

    @Test
    @Transactional
    void getNonExistingKichBan() throws Exception {
        // Get the kichBan
        restKichBanMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewKichBan() throws Exception {
        // Initialize the database
        kichBanRepository.saveAndFlush(kichBan);

        int databaseSizeBeforeUpdate = kichBanRepository.findAll().size();

        // Update the kichBan
        KichBan updatedKichBan = kichBanRepository.findById(kichBan.getId()).get();
        // Disconnect from session so that the updates on updatedKichBan are not directly saved in db
        em.detach(updatedKichBan);
        updatedKichBan
            .maKichBan(UPDATED_MA_KICH_BAN)
            .maThietBi(UPDATED_MA_THIET_BI)
            .loaiThietBi(UPDATED_LOAI_THIET_BI)
            .dayChuyen(UPDATED_DAY_CHUYEN)
            .maSanPham(UPDATED_MA_SAN_PHAM)
            .versionSanPham(UPDATED_VERSION_SAN_PHAM)
            .ngayTao(UPDATED_NGAY_TAO)
            .timeUpdate(UPDATED_TIME_UPDATE)
            .updateBy(UPDATED_UPDATE_BY)
            .trangThai(UPDATED_TRANG_THAI);

        restKichBanMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedKichBan.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedKichBan))
            )
            .andExpect(status().isOk());

        // Validate the KichBan in the database
        List<KichBan> kichBanList = kichBanRepository.findAll();
        assertThat(kichBanList).hasSize(databaseSizeBeforeUpdate);
        KichBan testKichBan = kichBanList.get(kichBanList.size() - 1);
        assertThat(testKichBan.getMaKichBan()).isEqualTo(UPDATED_MA_KICH_BAN);
        assertThat(testKichBan.getMaThietBi()).isEqualTo(UPDATED_MA_THIET_BI);
        assertThat(testKichBan.getLoaiThietBi()).isEqualTo(UPDATED_LOAI_THIET_BI);
        assertThat(testKichBan.getDayChuyen()).isEqualTo(UPDATED_DAY_CHUYEN);
        assertThat(testKichBan.getMaSanPham()).isEqualTo(UPDATED_MA_SAN_PHAM);
        assertThat(testKichBan.getVersionSanPham()).isEqualTo(UPDATED_VERSION_SAN_PHAM);
        assertThat(testKichBan.getNgayTao()).isEqualTo(UPDATED_NGAY_TAO);
        assertThat(testKichBan.getTimeUpdate()).isEqualTo(UPDATED_TIME_UPDATE);
        assertThat(testKichBan.getUpdateBy()).isEqualTo(UPDATED_UPDATE_BY);
        assertThat(testKichBan.getTrangThai()).isEqualTo(UPDATED_TRANG_THAI);
    }

    @Test
    @Transactional
    void putNonExistingKichBan() throws Exception {
        int databaseSizeBeforeUpdate = kichBanRepository.findAll().size();
        kichBan.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restKichBanMockMvc
            .perform(
                put(ENTITY_API_URL_ID, kichBan.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(kichBan))
            )
            .andExpect(status().isBadRequest());

        // Validate the KichBan in the database
        List<KichBan> kichBanList = kichBanRepository.findAll();
        assertThat(kichBanList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchKichBan() throws Exception {
        int databaseSizeBeforeUpdate = kichBanRepository.findAll().size();
        kichBan.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restKichBanMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(kichBan))
            )
            .andExpect(status().isBadRequest());

        // Validate the KichBan in the database
        List<KichBan> kichBanList = kichBanRepository.findAll();
        assertThat(kichBanList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamKichBan() throws Exception {
        int databaseSizeBeforeUpdate = kichBanRepository.findAll().size();
        kichBan.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restKichBanMockMvc
            .perform(
                put(ENTITY_API_URL).with(csrf()).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(kichBan))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the KichBan in the database
        List<KichBan> kichBanList = kichBanRepository.findAll();
        assertThat(kichBanList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateKichBanWithPatch() throws Exception {
        // Initialize the database
        kichBanRepository.saveAndFlush(kichBan);

        int databaseSizeBeforeUpdate = kichBanRepository.findAll().size();

        // Update the kichBan using partial update
        KichBan partialUpdatedKichBan = new KichBan();
        partialUpdatedKichBan.setId(kichBan.getId());

        partialUpdatedKichBan
            .maKichBan(UPDATED_MA_KICH_BAN)
            .dayChuyen(UPDATED_DAY_CHUYEN)
            .versionSanPham(UPDATED_VERSION_SAN_PHAM)
            .ngayTao(UPDATED_NGAY_TAO)
            .trangThai(UPDATED_TRANG_THAI);

        restKichBanMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedKichBan.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedKichBan))
            )
            .andExpect(status().isOk());

        // Validate the KichBan in the database
        List<KichBan> kichBanList = kichBanRepository.findAll();
        assertThat(kichBanList).hasSize(databaseSizeBeforeUpdate);
        KichBan testKichBan = kichBanList.get(kichBanList.size() - 1);
        assertThat(testKichBan.getMaKichBan()).isEqualTo(UPDATED_MA_KICH_BAN);
        assertThat(testKichBan.getMaThietBi()).isEqualTo(DEFAULT_MA_THIET_BI);
        assertThat(testKichBan.getLoaiThietBi()).isEqualTo(DEFAULT_LOAI_THIET_BI);
        assertThat(testKichBan.getDayChuyen()).isEqualTo(UPDATED_DAY_CHUYEN);
        assertThat(testKichBan.getMaSanPham()).isEqualTo(DEFAULT_MA_SAN_PHAM);
        assertThat(testKichBan.getVersionSanPham()).isEqualTo(UPDATED_VERSION_SAN_PHAM);
        assertThat(testKichBan.getNgayTao()).isEqualTo(UPDATED_NGAY_TAO);
        assertThat(testKichBan.getTimeUpdate()).isEqualTo(DEFAULT_TIME_UPDATE);
        assertThat(testKichBan.getUpdateBy()).isEqualTo(DEFAULT_UPDATE_BY);
        assertThat(testKichBan.getTrangThai()).isEqualTo(UPDATED_TRANG_THAI);
    }

    @Test
    @Transactional
    void fullUpdateKichBanWithPatch() throws Exception {
        // Initialize the database
        kichBanRepository.saveAndFlush(kichBan);

        int databaseSizeBeforeUpdate = kichBanRepository.findAll().size();

        // Update the kichBan using partial update
        KichBan partialUpdatedKichBan = new KichBan();
        partialUpdatedKichBan.setId(kichBan.getId());

        partialUpdatedKichBan
            .maKichBan(UPDATED_MA_KICH_BAN)
            .maThietBi(UPDATED_MA_THIET_BI)
            .loaiThietBi(UPDATED_LOAI_THIET_BI)
            .dayChuyen(UPDATED_DAY_CHUYEN)
            .maSanPham(UPDATED_MA_SAN_PHAM)
            .versionSanPham(UPDATED_VERSION_SAN_PHAM)
            .ngayTao(UPDATED_NGAY_TAO)
            .timeUpdate(UPDATED_TIME_UPDATE)
            .updateBy(UPDATED_UPDATE_BY)
            .trangThai(UPDATED_TRANG_THAI);

        restKichBanMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedKichBan.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedKichBan))
            )
            .andExpect(status().isOk());

        // Validate the KichBan in the database
        List<KichBan> kichBanList = kichBanRepository.findAll();
        assertThat(kichBanList).hasSize(databaseSizeBeforeUpdate);
        KichBan testKichBan = kichBanList.get(kichBanList.size() - 1);
        assertThat(testKichBan.getMaKichBan()).isEqualTo(UPDATED_MA_KICH_BAN);
        assertThat(testKichBan.getMaThietBi()).isEqualTo(UPDATED_MA_THIET_BI);
        assertThat(testKichBan.getLoaiThietBi()).isEqualTo(UPDATED_LOAI_THIET_BI);
        assertThat(testKichBan.getDayChuyen()).isEqualTo(UPDATED_DAY_CHUYEN);
        assertThat(testKichBan.getMaSanPham()).isEqualTo(UPDATED_MA_SAN_PHAM);
        assertThat(testKichBan.getVersionSanPham()).isEqualTo(UPDATED_VERSION_SAN_PHAM);
        assertThat(testKichBan.getNgayTao()).isEqualTo(UPDATED_NGAY_TAO);
        assertThat(testKichBan.getTimeUpdate()).isEqualTo(UPDATED_TIME_UPDATE);
        assertThat(testKichBan.getUpdateBy()).isEqualTo(UPDATED_UPDATE_BY);
        assertThat(testKichBan.getTrangThai()).isEqualTo(UPDATED_TRANG_THAI);
    }

    @Test
    @Transactional
    void patchNonExistingKichBan() throws Exception {
        int databaseSizeBeforeUpdate = kichBanRepository.findAll().size();
        kichBan.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restKichBanMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, kichBan.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(kichBan))
            )
            .andExpect(status().isBadRequest());

        // Validate the KichBan in the database
        List<KichBan> kichBanList = kichBanRepository.findAll();
        assertThat(kichBanList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchKichBan() throws Exception {
        int databaseSizeBeforeUpdate = kichBanRepository.findAll().size();
        kichBan.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restKichBanMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(kichBan))
            )
            .andExpect(status().isBadRequest());

        // Validate the KichBan in the database
        List<KichBan> kichBanList = kichBanRepository.findAll();
        assertThat(kichBanList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamKichBan() throws Exception {
        int databaseSizeBeforeUpdate = kichBanRepository.findAll().size();
        kichBan.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restKichBanMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(kichBan))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the KichBan in the database
        List<KichBan> kichBanList = kichBanRepository.findAll();
        assertThat(kichBanList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteKichBan() throws Exception {
        // Initialize the database
        kichBanRepository.saveAndFlush(kichBan);

        int databaseSizeBeforeDelete = kichBanRepository.findAll().size();

        // Delete the kichBan
        restKichBanMockMvc
            .perform(delete(ENTITY_API_URL_ID, kichBan.getId()).with(csrf()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<KichBan> kichBanList = kichBanRepository.findAll();
        assertThat(kichBanList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
