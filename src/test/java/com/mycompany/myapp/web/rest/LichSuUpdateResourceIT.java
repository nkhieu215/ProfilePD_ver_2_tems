package com.mycompany.myapp.web.rest;

import static com.mycompany.myapp.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.LichSuUpdate;
import com.mycompany.myapp.repository.LichSuUpdateRepository;
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
 * Integration tests for the {@link LichSuUpdateResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class LichSuUpdateResourceIT {

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

    private static final ZonedDateTime DEFAULT_TIME_UPDATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_TIME_UPDATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_STATUS = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/lich-su-updates";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private LichSuUpdateRepository lichSuUpdateRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restLichSuUpdateMockMvc;

    private LichSuUpdate lichSuUpdate;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LichSuUpdate createEntity(EntityManager em) {
        LichSuUpdate lichSuUpdate = new LichSuUpdate()
            .maKichBan(DEFAULT_MA_KICH_BAN)
            .maThietBi(DEFAULT_MA_THIET_BI)
            .loaiThietBi(DEFAULT_LOAI_THIET_BI)
            .dayChuyen(DEFAULT_DAY_CHUYEN)
            .maSanPham(DEFAULT_MA_SAN_PHAM)
            .versionSanPham(DEFAULT_VERSION_SAN_PHAM)
            .timeUpdate(DEFAULT_TIME_UPDATE)
            .status(DEFAULT_STATUS);
        return lichSuUpdate;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LichSuUpdate createUpdatedEntity(EntityManager em) {
        LichSuUpdate lichSuUpdate = new LichSuUpdate()
            .maKichBan(UPDATED_MA_KICH_BAN)
            .maThietBi(UPDATED_MA_THIET_BI)
            .loaiThietBi(UPDATED_LOAI_THIET_BI)
            .dayChuyen(UPDATED_DAY_CHUYEN)
            .maSanPham(UPDATED_MA_SAN_PHAM)
            .versionSanPham(UPDATED_VERSION_SAN_PHAM)
            .timeUpdate(UPDATED_TIME_UPDATE)
            .status(UPDATED_STATUS);
        return lichSuUpdate;
    }

    @BeforeEach
    public void initTest() {
        lichSuUpdate = createEntity(em);
    }

    @Test
    @Transactional
    void createLichSuUpdate() throws Exception {
        int databaseSizeBeforeCreate = lichSuUpdateRepository.findAll().size();
        // Create the LichSuUpdate
        restLichSuUpdateMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(lichSuUpdate))
            )
            .andExpect(status().isCreated());

        // Validate the LichSuUpdate in the database
        List<LichSuUpdate> lichSuUpdateList = lichSuUpdateRepository.findAll();
        assertThat(lichSuUpdateList).hasSize(databaseSizeBeforeCreate + 1);
        LichSuUpdate testLichSuUpdate = lichSuUpdateList.get(lichSuUpdateList.size() - 1);
        assertThat(testLichSuUpdate.getMaKichBan()).isEqualTo(DEFAULT_MA_KICH_BAN);
        assertThat(testLichSuUpdate.getMaThietBi()).isEqualTo(DEFAULT_MA_THIET_BI);
        assertThat(testLichSuUpdate.getLoaiThietBi()).isEqualTo(DEFAULT_LOAI_THIET_BI);
        assertThat(testLichSuUpdate.getDayChuyen()).isEqualTo(DEFAULT_DAY_CHUYEN);
        assertThat(testLichSuUpdate.getMaSanPham()).isEqualTo(DEFAULT_MA_SAN_PHAM);
        assertThat(testLichSuUpdate.getVersionSanPham()).isEqualTo(DEFAULT_VERSION_SAN_PHAM);
        assertThat(testLichSuUpdate.getTimeUpdate()).isEqualTo(DEFAULT_TIME_UPDATE);
        assertThat(testLichSuUpdate.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    void createLichSuUpdateWithExistingId() throws Exception {
        // Create the LichSuUpdate with an existing ID
        lichSuUpdate.setId(1L);

        int databaseSizeBeforeCreate = lichSuUpdateRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restLichSuUpdateMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(lichSuUpdate))
            )
            .andExpect(status().isBadRequest());

        // Validate the LichSuUpdate in the database
        List<LichSuUpdate> lichSuUpdateList = lichSuUpdateRepository.findAll();
        assertThat(lichSuUpdateList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllLichSuUpdates() throws Exception {
        // Initialize the database
        lichSuUpdateRepository.saveAndFlush(lichSuUpdate);

        // Get all the lichSuUpdateList
        restLichSuUpdateMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(lichSuUpdate.getId().intValue())))
            .andExpect(jsonPath("$.[*].maKichBan").value(hasItem(DEFAULT_MA_KICH_BAN)))
            .andExpect(jsonPath("$.[*].maThietBi").value(hasItem(DEFAULT_MA_THIET_BI)))
            .andExpect(jsonPath("$.[*].loaiThietBi").value(hasItem(DEFAULT_LOAI_THIET_BI)))
            .andExpect(jsonPath("$.[*].dayChuyen").value(hasItem(DEFAULT_DAY_CHUYEN)))
            .andExpect(jsonPath("$.[*].maSanPham").value(hasItem(DEFAULT_MA_SAN_PHAM)))
            .andExpect(jsonPath("$.[*].versionSanPham").value(hasItem(DEFAULT_VERSION_SAN_PHAM)))
            .andExpect(jsonPath("$.[*].timeUpdate").value(hasItem(sameInstant(DEFAULT_TIME_UPDATE))))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS)));
    }

    @Test
    @Transactional
    void getLichSuUpdate() throws Exception {
        // Initialize the database
        lichSuUpdateRepository.saveAndFlush(lichSuUpdate);

        // Get the lichSuUpdate
        restLichSuUpdateMockMvc
            .perform(get(ENTITY_API_URL_ID, lichSuUpdate.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(lichSuUpdate.getId().intValue()))
            .andExpect(jsonPath("$.maKichBan").value(DEFAULT_MA_KICH_BAN))
            .andExpect(jsonPath("$.maThietBi").value(DEFAULT_MA_THIET_BI))
            .andExpect(jsonPath("$.loaiThietBi").value(DEFAULT_LOAI_THIET_BI))
            .andExpect(jsonPath("$.dayChuyen").value(DEFAULT_DAY_CHUYEN))
            .andExpect(jsonPath("$.maSanPham").value(DEFAULT_MA_SAN_PHAM))
            .andExpect(jsonPath("$.versionSanPham").value(DEFAULT_VERSION_SAN_PHAM))
            .andExpect(jsonPath("$.timeUpdate").value(sameInstant(DEFAULT_TIME_UPDATE)))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS));
    }

    @Test
    @Transactional
    void getNonExistingLichSuUpdate() throws Exception {
        // Get the lichSuUpdate
        restLichSuUpdateMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewLichSuUpdate() throws Exception {
        // Initialize the database
        lichSuUpdateRepository.saveAndFlush(lichSuUpdate);

        int databaseSizeBeforeUpdate = lichSuUpdateRepository.findAll().size();

        // Update the lichSuUpdate
        LichSuUpdate updatedLichSuUpdate = lichSuUpdateRepository.findById(lichSuUpdate.getId()).get();
        // Disconnect from session so that the updates on updatedLichSuUpdate are not directly saved in db
        em.detach(updatedLichSuUpdate);
        updatedLichSuUpdate
            .maKichBan(UPDATED_MA_KICH_BAN)
            .maThietBi(UPDATED_MA_THIET_BI)
            .loaiThietBi(UPDATED_LOAI_THIET_BI)
            .dayChuyen(UPDATED_DAY_CHUYEN)
            .maSanPham(UPDATED_MA_SAN_PHAM)
            .versionSanPham(UPDATED_VERSION_SAN_PHAM)
            .timeUpdate(UPDATED_TIME_UPDATE)
            .status(UPDATED_STATUS);

        restLichSuUpdateMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedLichSuUpdate.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedLichSuUpdate))
            )
            .andExpect(status().isOk());

        // Validate the LichSuUpdate in the database
        List<LichSuUpdate> lichSuUpdateList = lichSuUpdateRepository.findAll();
        assertThat(lichSuUpdateList).hasSize(databaseSizeBeforeUpdate);
        LichSuUpdate testLichSuUpdate = lichSuUpdateList.get(lichSuUpdateList.size() - 1);
        assertThat(testLichSuUpdate.getMaKichBan()).isEqualTo(UPDATED_MA_KICH_BAN);
        assertThat(testLichSuUpdate.getMaThietBi()).isEqualTo(UPDATED_MA_THIET_BI);
        assertThat(testLichSuUpdate.getLoaiThietBi()).isEqualTo(UPDATED_LOAI_THIET_BI);
        assertThat(testLichSuUpdate.getDayChuyen()).isEqualTo(UPDATED_DAY_CHUYEN);
        assertThat(testLichSuUpdate.getMaSanPham()).isEqualTo(UPDATED_MA_SAN_PHAM);
        assertThat(testLichSuUpdate.getVersionSanPham()).isEqualTo(UPDATED_VERSION_SAN_PHAM);
        assertThat(testLichSuUpdate.getTimeUpdate()).isEqualTo(UPDATED_TIME_UPDATE);
        assertThat(testLichSuUpdate.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    void putNonExistingLichSuUpdate() throws Exception {
        int databaseSizeBeforeUpdate = lichSuUpdateRepository.findAll().size();
        lichSuUpdate.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLichSuUpdateMockMvc
            .perform(
                put(ENTITY_API_URL_ID, lichSuUpdate.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(lichSuUpdate))
            )
            .andExpect(status().isBadRequest());

        // Validate the LichSuUpdate in the database
        List<LichSuUpdate> lichSuUpdateList = lichSuUpdateRepository.findAll();
        assertThat(lichSuUpdateList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchLichSuUpdate() throws Exception {
        int databaseSizeBeforeUpdate = lichSuUpdateRepository.findAll().size();
        lichSuUpdate.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLichSuUpdateMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(lichSuUpdate))
            )
            .andExpect(status().isBadRequest());

        // Validate the LichSuUpdate in the database
        List<LichSuUpdate> lichSuUpdateList = lichSuUpdateRepository.findAll();
        assertThat(lichSuUpdateList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamLichSuUpdate() throws Exception {
        int databaseSizeBeforeUpdate = lichSuUpdateRepository.findAll().size();
        lichSuUpdate.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLichSuUpdateMockMvc
            .perform(
                put(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(lichSuUpdate))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the LichSuUpdate in the database
        List<LichSuUpdate> lichSuUpdateList = lichSuUpdateRepository.findAll();
        assertThat(lichSuUpdateList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateLichSuUpdateWithPatch() throws Exception {
        // Initialize the database
        lichSuUpdateRepository.saveAndFlush(lichSuUpdate);

        int databaseSizeBeforeUpdate = lichSuUpdateRepository.findAll().size();

        // Update the lichSuUpdate using partial update
        LichSuUpdate partialUpdatedLichSuUpdate = new LichSuUpdate();
        partialUpdatedLichSuUpdate.setId(lichSuUpdate.getId());

        partialUpdatedLichSuUpdate
            .maKichBan(UPDATED_MA_KICH_BAN)
            .maThietBi(UPDATED_MA_THIET_BI)
            .loaiThietBi(UPDATED_LOAI_THIET_BI)
            .dayChuyen(UPDATED_DAY_CHUYEN)
            .timeUpdate(UPDATED_TIME_UPDATE);

        restLichSuUpdateMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedLichSuUpdate.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedLichSuUpdate))
            )
            .andExpect(status().isOk());

        // Validate the LichSuUpdate in the database
        List<LichSuUpdate> lichSuUpdateList = lichSuUpdateRepository.findAll();
        assertThat(lichSuUpdateList).hasSize(databaseSizeBeforeUpdate);
        LichSuUpdate testLichSuUpdate = lichSuUpdateList.get(lichSuUpdateList.size() - 1);
        assertThat(testLichSuUpdate.getMaKichBan()).isEqualTo(UPDATED_MA_KICH_BAN);
        assertThat(testLichSuUpdate.getMaThietBi()).isEqualTo(UPDATED_MA_THIET_BI);
        assertThat(testLichSuUpdate.getLoaiThietBi()).isEqualTo(UPDATED_LOAI_THIET_BI);
        assertThat(testLichSuUpdate.getDayChuyen()).isEqualTo(UPDATED_DAY_CHUYEN);
        assertThat(testLichSuUpdate.getMaSanPham()).isEqualTo(DEFAULT_MA_SAN_PHAM);
        assertThat(testLichSuUpdate.getVersionSanPham()).isEqualTo(DEFAULT_VERSION_SAN_PHAM);
        assertThat(testLichSuUpdate.getTimeUpdate()).isEqualTo(UPDATED_TIME_UPDATE);
        assertThat(testLichSuUpdate.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    void fullUpdateLichSuUpdateWithPatch() throws Exception {
        // Initialize the database
        lichSuUpdateRepository.saveAndFlush(lichSuUpdate);

        int databaseSizeBeforeUpdate = lichSuUpdateRepository.findAll().size();

        // Update the lichSuUpdate using partial update
        LichSuUpdate partialUpdatedLichSuUpdate = new LichSuUpdate();
        partialUpdatedLichSuUpdate.setId(lichSuUpdate.getId());

        partialUpdatedLichSuUpdate
            .maKichBan(UPDATED_MA_KICH_BAN)
            .maThietBi(UPDATED_MA_THIET_BI)
            .loaiThietBi(UPDATED_LOAI_THIET_BI)
            .dayChuyen(UPDATED_DAY_CHUYEN)
            .maSanPham(UPDATED_MA_SAN_PHAM)
            .versionSanPham(UPDATED_VERSION_SAN_PHAM)
            .timeUpdate(UPDATED_TIME_UPDATE)
            .status(UPDATED_STATUS);

        restLichSuUpdateMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedLichSuUpdate.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedLichSuUpdate))
            )
            .andExpect(status().isOk());

        // Validate the LichSuUpdate in the database
        List<LichSuUpdate> lichSuUpdateList = lichSuUpdateRepository.findAll();
        assertThat(lichSuUpdateList).hasSize(databaseSizeBeforeUpdate);
        LichSuUpdate testLichSuUpdate = lichSuUpdateList.get(lichSuUpdateList.size() - 1);
        assertThat(testLichSuUpdate.getMaKichBan()).isEqualTo(UPDATED_MA_KICH_BAN);
        assertThat(testLichSuUpdate.getMaThietBi()).isEqualTo(UPDATED_MA_THIET_BI);
        assertThat(testLichSuUpdate.getLoaiThietBi()).isEqualTo(UPDATED_LOAI_THIET_BI);
        assertThat(testLichSuUpdate.getDayChuyen()).isEqualTo(UPDATED_DAY_CHUYEN);
        assertThat(testLichSuUpdate.getMaSanPham()).isEqualTo(UPDATED_MA_SAN_PHAM);
        assertThat(testLichSuUpdate.getVersionSanPham()).isEqualTo(UPDATED_VERSION_SAN_PHAM);
        assertThat(testLichSuUpdate.getTimeUpdate()).isEqualTo(UPDATED_TIME_UPDATE);
        assertThat(testLichSuUpdate.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    void patchNonExistingLichSuUpdate() throws Exception {
        int databaseSizeBeforeUpdate = lichSuUpdateRepository.findAll().size();
        lichSuUpdate.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLichSuUpdateMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, lichSuUpdate.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(lichSuUpdate))
            )
            .andExpect(status().isBadRequest());

        // Validate the LichSuUpdate in the database
        List<LichSuUpdate> lichSuUpdateList = lichSuUpdateRepository.findAll();
        assertThat(lichSuUpdateList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchLichSuUpdate() throws Exception {
        int databaseSizeBeforeUpdate = lichSuUpdateRepository.findAll().size();
        lichSuUpdate.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLichSuUpdateMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(lichSuUpdate))
            )
            .andExpect(status().isBadRequest());

        // Validate the LichSuUpdate in the database
        List<LichSuUpdate> lichSuUpdateList = lichSuUpdateRepository.findAll();
        assertThat(lichSuUpdateList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamLichSuUpdate() throws Exception {
        int databaseSizeBeforeUpdate = lichSuUpdateRepository.findAll().size();
        lichSuUpdate.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLichSuUpdateMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(lichSuUpdate))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the LichSuUpdate in the database
        List<LichSuUpdate> lichSuUpdateList = lichSuUpdateRepository.findAll();
        assertThat(lichSuUpdateList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteLichSuUpdate() throws Exception {
        // Initialize the database
        lichSuUpdateRepository.saveAndFlush(lichSuUpdate);

        int databaseSizeBeforeDelete = lichSuUpdateRepository.findAll().size();

        // Delete the lichSuUpdate
        restLichSuUpdateMockMvc
            .perform(delete(ENTITY_API_URL_ID, lichSuUpdate.getId()).with(csrf()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<LichSuUpdate> lichSuUpdateList = lichSuUpdateRepository.findAll();
        assertThat(lichSuUpdateList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
