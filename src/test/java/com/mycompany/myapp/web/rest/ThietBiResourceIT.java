package com.mycompany.myapp.web.rest;

import static com.mycompany.myapp.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.ThietBi;
import com.mycompany.myapp.repository.ThietBiRepository;
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
 * Integration tests for the {@link ThietBiResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ThietBiResourceIT {

    private static final String DEFAULT_MA_THIET_BI = "AAAAAAAAAA";
    private static final String UPDATED_MA_THIET_BI = "BBBBBBBBBB";

    private static final String DEFAULT_LOAI_THIET_BI = "AAAAAAAAAA";
    private static final String UPDATED_LOAI_THIET_BI = "BBBBBBBBBB";

    private static final String DEFAULT_DAY_CHUYEN = "AAAAAAAAAA";
    private static final String UPDATED_DAY_CHUYEN = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_NGAY_TAO = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_NGAY_TAO = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_TIME_UPDATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_TIME_UPDATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_UPDATE_BY = "AAAAAAAAAA";
    private static final String UPDATED_UPDATE_BY = "BBBBBBBBBB";

    private static final String DEFAULT_TRANG_THAI = "AAAAAAAAAA";
    private static final String UPDATED_TRANG_THAI = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/thiet-bis";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ThietBiRepository thietBiRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restThietBiMockMvc;

    private ThietBi thietBi;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ThietBi createEntity(EntityManager em) {
        ThietBi thietBi = new ThietBi()
            .maThietBi(DEFAULT_MA_THIET_BI)
            .loaiThietBi(DEFAULT_LOAI_THIET_BI)
            .dayChuyen(DEFAULT_DAY_CHUYEN)
            .ngayTao(DEFAULT_NGAY_TAO)
            .timeUpdate(DEFAULT_TIME_UPDATE)
            .updateBy(DEFAULT_UPDATE_BY)
            .status(DEFAULT_TRANG_THAI);
        return thietBi;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ThietBi createUpdatedEntity(EntityManager em) {
        ThietBi thietBi = new ThietBi()
            .maThietBi(UPDATED_MA_THIET_BI)
            .loaiThietBi(UPDATED_LOAI_THIET_BI)
            .dayChuyen(UPDATED_DAY_CHUYEN)
            .ngayTao(UPDATED_NGAY_TAO)
            .timeUpdate(UPDATED_TIME_UPDATE)
            .updateBy(UPDATED_UPDATE_BY)
            .status(UPDATED_TRANG_THAI);
        return thietBi;
    }

    @BeforeEach
    public void initTest() {
        thietBi = createEntity(em);
    }

    @Test
    @Transactional
    void createThietBi() throws Exception {
        int databaseSizeBeforeCreate = thietBiRepository.findAll().size();
        // Create the ThietBi
        restThietBiMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(thietBi))
            )
            .andExpect(status().isCreated());

        // Validate the ThietBi in the database
        List<ThietBi> thietBiList = thietBiRepository.findAll();
        assertThat(thietBiList).hasSize(databaseSizeBeforeCreate + 1);
        ThietBi testThietBi = thietBiList.get(thietBiList.size() - 1);
        assertThat(testThietBi.getMaThietBi()).isEqualTo(DEFAULT_MA_THIET_BI);
        assertThat(testThietBi.getLoaiThietBi()).isEqualTo(DEFAULT_LOAI_THIET_BI);
        assertThat(testThietBi.getDayChuyen()).isEqualTo(DEFAULT_DAY_CHUYEN);
        assertThat(testThietBi.getNgayTao()).isEqualTo(DEFAULT_NGAY_TAO);
        assertThat(testThietBi.getTimeUpdate()).isEqualTo(DEFAULT_TIME_UPDATE);
        assertThat(testThietBi.getUpdateBy()).isEqualTo(DEFAULT_UPDATE_BY);
        assertThat(testThietBi.getStatus()).isEqualTo(DEFAULT_TRANG_THAI);
    }

    @Test
    @Transactional
    void createThietBiWithExistingId() throws Exception {
        // Create the ThietBi with an existing ID
        thietBi.setId(1L);

        int databaseSizeBeforeCreate = thietBiRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restThietBiMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(thietBi))
            )
            .andExpect(status().isBadRequest());

        // Validate the ThietBi in the database
        List<ThietBi> thietBiList = thietBiRepository.findAll();
        assertThat(thietBiList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllThietBis() throws Exception {
        // Initialize the database
        thietBiRepository.saveAndFlush(thietBi);

        // Get all the thietBiList
        restThietBiMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(thietBi.getId().intValue())))
            .andExpect(jsonPath("$.[*].maThietBi").value(hasItem(DEFAULT_MA_THIET_BI)))
            .andExpect(jsonPath("$.[*].loaiThietBi").value(hasItem(DEFAULT_LOAI_THIET_BI)))
            .andExpect(jsonPath("$.[*].dayChuyen").value(hasItem(DEFAULT_DAY_CHUYEN)))
            .andExpect(jsonPath("$.[*].ngayTao").value(hasItem(sameInstant(DEFAULT_NGAY_TAO))))
            .andExpect(jsonPath("$.[*].timeUpdate").value(hasItem(sameInstant(DEFAULT_TIME_UPDATE))))
            .andExpect(jsonPath("$.[*].updateBy").value(hasItem(DEFAULT_UPDATE_BY)))
            .andExpect(jsonPath("$.[*].trangThai").value(hasItem(DEFAULT_TRANG_THAI)));
    }

    @Test
    @Transactional
    void getThietBi() throws Exception {
        // Initialize the database
        thietBiRepository.saveAndFlush(thietBi);

        // Get the thietBi
        restThietBiMockMvc
            .perform(get(ENTITY_API_URL_ID, thietBi.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(thietBi.getId().intValue()))
            .andExpect(jsonPath("$.maThietBi").value(DEFAULT_MA_THIET_BI))
            .andExpect(jsonPath("$.loaiThietBi").value(DEFAULT_LOAI_THIET_BI))
            .andExpect(jsonPath("$.dayChuyen").value(DEFAULT_DAY_CHUYEN))
            .andExpect(jsonPath("$.ngayTao").value(sameInstant(DEFAULT_NGAY_TAO)))
            .andExpect(jsonPath("$.timeUpdate").value(sameInstant(DEFAULT_TIME_UPDATE)))
            .andExpect(jsonPath("$.updateBy").value(DEFAULT_UPDATE_BY))
            .andExpect(jsonPath("$.trangThai").value(DEFAULT_TRANG_THAI));
    }

    @Test
    @Transactional
    void getNonExistingThietBi() throws Exception {
        // Get the thietBi
        restThietBiMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewThietBi() throws Exception {
        // Initialize the database
        thietBiRepository.saveAndFlush(thietBi);

        int databaseSizeBeforeUpdate = thietBiRepository.findAll().size();

        // Update the thietBi
        ThietBi updatedThietBi = thietBiRepository.findById(thietBi.getId()).get();
        // Disconnect from session so that the updates on updatedThietBi are not directly saved in db
        em.detach(updatedThietBi);
        updatedThietBi
            .maThietBi(UPDATED_MA_THIET_BI)
            .loaiThietBi(UPDATED_LOAI_THIET_BI)
            .dayChuyen(UPDATED_DAY_CHUYEN)
            .ngayTao(UPDATED_NGAY_TAO)
            .timeUpdate(UPDATED_TIME_UPDATE)
            .updateBy(UPDATED_UPDATE_BY)
            .status(UPDATED_TRANG_THAI);

        restThietBiMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedThietBi.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedThietBi))
            )
            .andExpect(status().isOk());

        // Validate the ThietBi in the database
        List<ThietBi> thietBiList = thietBiRepository.findAll();
        assertThat(thietBiList).hasSize(databaseSizeBeforeUpdate);
        ThietBi testThietBi = thietBiList.get(thietBiList.size() - 1);
        assertThat(testThietBi.getMaThietBi()).isEqualTo(UPDATED_MA_THIET_BI);
        assertThat(testThietBi.getLoaiThietBi()).isEqualTo(UPDATED_LOAI_THIET_BI);
        assertThat(testThietBi.getDayChuyen()).isEqualTo(UPDATED_DAY_CHUYEN);
        assertThat(testThietBi.getNgayTao()).isEqualTo(UPDATED_NGAY_TAO);
        assertThat(testThietBi.getTimeUpdate()).isEqualTo(UPDATED_TIME_UPDATE);
        assertThat(testThietBi.getUpdateBy()).isEqualTo(UPDATED_UPDATE_BY);
        assertThat(testThietBi.getStatus()).isEqualTo(UPDATED_TRANG_THAI);
    }

    @Test
    @Transactional
    void putNonExistingThietBi() throws Exception {
        int databaseSizeBeforeUpdate = thietBiRepository.findAll().size();
        thietBi.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restThietBiMockMvc
            .perform(
                put(ENTITY_API_URL_ID, thietBi.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(thietBi))
            )
            .andExpect(status().isBadRequest());

        // Validate the ThietBi in the database
        List<ThietBi> thietBiList = thietBiRepository.findAll();
        assertThat(thietBiList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchThietBi() throws Exception {
        int databaseSizeBeforeUpdate = thietBiRepository.findAll().size();
        thietBi.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restThietBiMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(thietBi))
            )
            .andExpect(status().isBadRequest());

        // Validate the ThietBi in the database
        List<ThietBi> thietBiList = thietBiRepository.findAll();
        assertThat(thietBiList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamThietBi() throws Exception {
        int databaseSizeBeforeUpdate = thietBiRepository.findAll().size();
        thietBi.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restThietBiMockMvc
            .perform(
                put(ENTITY_API_URL).with(csrf()).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(thietBi))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ThietBi in the database
        List<ThietBi> thietBiList = thietBiRepository.findAll();
        assertThat(thietBiList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateThietBiWithPatch() throws Exception {
        // Initialize the database
        thietBiRepository.saveAndFlush(thietBi);

        int databaseSizeBeforeUpdate = thietBiRepository.findAll().size();

        // Update the thietBi using partial update
        ThietBi partialUpdatedThietBi = new ThietBi();
        partialUpdatedThietBi.setId(thietBi.getId());

        partialUpdatedThietBi.timeUpdate(UPDATED_TIME_UPDATE);

        restThietBiMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedThietBi.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedThietBi))
            )
            .andExpect(status().isOk());

        // Validate the ThietBi in the database
        List<ThietBi> thietBiList = thietBiRepository.findAll();
        assertThat(thietBiList).hasSize(databaseSizeBeforeUpdate);
        ThietBi testThietBi = thietBiList.get(thietBiList.size() - 1);
        assertThat(testThietBi.getMaThietBi()).isEqualTo(DEFAULT_MA_THIET_BI);
        assertThat(testThietBi.getLoaiThietBi()).isEqualTo(DEFAULT_LOAI_THIET_BI);
        assertThat(testThietBi.getDayChuyen()).isEqualTo(DEFAULT_DAY_CHUYEN);
        assertThat(testThietBi.getNgayTao()).isEqualTo(DEFAULT_NGAY_TAO);
        assertThat(testThietBi.getTimeUpdate()).isEqualTo(UPDATED_TIME_UPDATE);
        assertThat(testThietBi.getUpdateBy()).isEqualTo(DEFAULT_UPDATE_BY);
        assertThat(testThietBi.getStatus()).isEqualTo(DEFAULT_TRANG_THAI);
    }

    @Test
    @Transactional
    void fullUpdateThietBiWithPatch() throws Exception {
        // Initialize the database
        thietBiRepository.saveAndFlush(thietBi);

        int databaseSizeBeforeUpdate = thietBiRepository.findAll().size();

        // Update the thietBi using partial update
        ThietBi partialUpdatedThietBi = new ThietBi();
        partialUpdatedThietBi.setId(thietBi.getId());

        partialUpdatedThietBi
            .maThietBi(UPDATED_MA_THIET_BI)
            .loaiThietBi(UPDATED_LOAI_THIET_BI)
            .dayChuyen(UPDATED_DAY_CHUYEN)
            .ngayTao(UPDATED_NGAY_TAO)
            .timeUpdate(UPDATED_TIME_UPDATE)
            .updateBy(UPDATED_UPDATE_BY)
            .status(UPDATED_TRANG_THAI);

        restThietBiMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedThietBi.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedThietBi))
            )
            .andExpect(status().isOk());

        // Validate the ThietBi in the database
        List<ThietBi> thietBiList = thietBiRepository.findAll();
        assertThat(thietBiList).hasSize(databaseSizeBeforeUpdate);
        ThietBi testThietBi = thietBiList.get(thietBiList.size() - 1);
        assertThat(testThietBi.getMaThietBi()).isEqualTo(UPDATED_MA_THIET_BI);
        assertThat(testThietBi.getLoaiThietBi()).isEqualTo(UPDATED_LOAI_THIET_BI);
        assertThat(testThietBi.getDayChuyen()).isEqualTo(UPDATED_DAY_CHUYEN);
        assertThat(testThietBi.getNgayTao()).isEqualTo(UPDATED_NGAY_TAO);
        assertThat(testThietBi.getTimeUpdate()).isEqualTo(UPDATED_TIME_UPDATE);
        assertThat(testThietBi.getUpdateBy()).isEqualTo(UPDATED_UPDATE_BY);
        assertThat(testThietBi.getStatus()).isEqualTo(UPDATED_TRANG_THAI);
    }

    @Test
    @Transactional
    void patchNonExistingThietBi() throws Exception {
        int databaseSizeBeforeUpdate = thietBiRepository.findAll().size();
        thietBi.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restThietBiMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, thietBi.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(thietBi))
            )
            .andExpect(status().isBadRequest());

        // Validate the ThietBi in the database
        List<ThietBi> thietBiList = thietBiRepository.findAll();
        assertThat(thietBiList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchThietBi() throws Exception {
        int databaseSizeBeforeUpdate = thietBiRepository.findAll().size();
        thietBi.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restThietBiMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(thietBi))
            )
            .andExpect(status().isBadRequest());

        // Validate the ThietBi in the database
        List<ThietBi> thietBiList = thietBiRepository.findAll();
        assertThat(thietBiList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamThietBi() throws Exception {
        int databaseSizeBeforeUpdate = thietBiRepository.findAll().size();
        thietBi.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restThietBiMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(thietBi))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ThietBi in the database
        List<ThietBi> thietBiList = thietBiRepository.findAll();
        assertThat(thietBiList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteThietBi() throws Exception {
        // Initialize the database
        thietBiRepository.saveAndFlush(thietBi);

        int databaseSizeBeforeDelete = thietBiRepository.findAll().size();

        // Delete the thietBi
        restThietBiMockMvc
            .perform(delete(ENTITY_API_URL_ID, thietBi.getId()).with(csrf()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ThietBi> thietBiList = thietBiRepository.findAll();
        assertThat(thietBiList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
