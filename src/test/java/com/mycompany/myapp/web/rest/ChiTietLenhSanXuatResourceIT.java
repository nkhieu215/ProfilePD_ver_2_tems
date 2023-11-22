package com.mycompany.myapp.web.rest;

import static com.mycompany.myapp.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.ChiTietLenhSanXuat;
import com.mycompany.myapp.repository.ChiTietLenhSanXuatRepository;
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
 * Integration tests for the {@link ChiTietLenhSanXuatResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ChiTietLenhSanXuatResourceIT {

    private static final String DEFAULT_REEL_ID = "AAAAAAAAAA";
    private static final String UPDATED_REEL_ID = "BBBBBBBBBB";

    private static final String DEFAULT_PART_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_PART_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_VENDOR = "AAAAAAAAAA";
    private static final String UPDATED_VENDOR = "BBBBBBBBBB";

    private static final String DEFAULT_LOT = "AAAAAAAAAA";
    private static final String UPDATED_LOT = "BBBBBBBBBB";

    private static final String DEFAULT_USER_DATA_1 = "AAAAAAAAAA";
    private static final String UPDATED_USER_DATA_1 = "BBBBBBBBBB";

    private static final String DEFAULT_USER_DATA_2 = "AAAAAAAAAA";
    private static final String UPDATED_USER_DATA_2 = "BBBBBBBBBB";

    private static final String DEFAULT_USER_DATA_3 = "AAAAAAAAAA";
    private static final String UPDATED_USER_DATA_3 = "BBBBBBBBBB";

    private static final String DEFAULT_USER_DATA_4 = "AAAAAAAAAA";
    private static final String UPDATED_USER_DATA_4 = "BBBBBBBBBB";

    private static final String DEFAULT_USER_DATA_5 = "AAAAAAAAAA";
    private static final String UPDATED_USER_DATA_5 = "BBBBBBBBBB";

    private static final Integer DEFAULT_INITIAL_QUANTITY = 1;
    private static final Integer UPDATED_INITIAL_QUANTITY = 2;

    private static final String DEFAULT_MSD_LEVEL = "AAAAAAAAAA";
    private static final String UPDATED_MSD_LEVEL = "BBBBBBBBBB";

    private static final String DEFAULT_MSD_INITIAL_FLOOR_TIME = "AAAAAAAAAA";
    private static final String UPDATED_MSD_INITIAL_FLOOR_TIME = "BBBBBBBBBB";

    private static final String DEFAULT_MSD_BAG_SEAL_DATE = "AAAAAAAAAA";
    private static final String UPDATED_MSD_BAG_SEAL_DATE = "BBBBBBBBBB";

    private static final String DEFAULT_MARKET_USAGE = "AAAAAAAAAA";
    private static final String UPDATED_MARKET_USAGE = "BBBBBBBBBB";

    private static final Integer DEFAULT_QUANTITY_OVERRIDE = 1;
    private static final Integer UPDATED_QUANTITY_OVERRIDE = 2;

    private static final String DEFAULT_SHELF_TIME = "AAAAAAAAAA";
    private static final String UPDATED_SHELF_TIME = "BBBBBBBBBB";

    private static final String DEFAULT_SP_MATERIAL_NAME = "AAAAAAAAAA";
    private static final String UPDATED_SP_MATERIAL_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_WARNING_LIMIT = "AAAAAAAAAA";
    private static final String UPDATED_WARNING_LIMIT = "BBBBBBBBBB";

    private static final String DEFAULT_MAXIMUM_LIMIT = "AAAAAAAAAA";
    private static final String UPDATED_MAXIMUM_LIMIT = "BBBBBBBBBB";

    private static final String DEFAULT_COMMENTS = "AAAAAAAAAA";
    private static final String UPDATED_COMMENTS = "BBBBBBBBBB";

    private static final String DEFAULT_WARMUP_TIME = "AAAAAAAAAA";
    private static final String UPDATED_WARMUP_TIME = "BBBBBBBBBB";

    private static final String DEFAULT_STORAGE_UNIT = "AAAAAAAAAA";
    private static final String UPDATED_STORAGE_UNIT = "BBBBBBBBBB";

    private static final String DEFAULT_SUB_STORAGE_UNIT = "AAAAAAAAAA";
    private static final String UPDATED_SUB_STORAGE_UNIT = "BBBBBBBBBB";

    private static final String DEFAULT_LOCATION_OVERRIDE = "AAAAAAAAAA";
    private static final String UPDATED_LOCATION_OVERRIDE = "BBBBBBBBBB";

    private static final String DEFAULT_EXPIRATION_DATE = "AAAAAAAAAA";
    private static final String UPDATED_EXPIRATION_DATE = "BBBBBBBBBB";

    private static final String DEFAULT_MANUFACTURING_DATE = "AAAAAAAAAA";
    private static final String UPDATED_MANUFACTURING_DATE = "BBBBBBBBBB";

    private static final String DEFAULT_PART_CLASS = "AAAAAAAAAA";
    private static final String UPDATED_PART_CLASS = "BBBBBBBBBB";

    private static final String DEFAULT_SAP_CODE = "AAAAAAAAAA";
    private static final String UPDATED_SAP_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_TRANG_THAI = "AAAAAAAAAA";
    private static final String UPDATED_TRANG_THAI = "BBBBBBBBBB";

    private static final Integer DEFAULT_CHECKED = 1;
    private static final Integer UPDATED_CHECKED = 2;

    private static final String ENTITY_API_URL = "/api/chi-tiet-lenh-san-xuats";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ChiTietLenhSanXuatRepository chiTietLenhSanXuatRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restChiTietLenhSanXuatMockMvc;

    private ChiTietLenhSanXuat chiTietLenhSanXuat;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ChiTietLenhSanXuat createEntity(EntityManager em) {
        ChiTietLenhSanXuat chiTietLenhSanXuat = new ChiTietLenhSanXuat()
            .reelID(DEFAULT_REEL_ID)
            .partNumber(DEFAULT_PART_NUMBER)
            .vendor(DEFAULT_VENDOR)
            .lot(DEFAULT_LOT)
            .userData1(DEFAULT_USER_DATA_1)
            .userData2(DEFAULT_USER_DATA_2)
            .userData3(DEFAULT_USER_DATA_3)
            .userData4(DEFAULT_USER_DATA_4)
            .userData5(DEFAULT_USER_DATA_5)
            .initialQuantity(DEFAULT_INITIAL_QUANTITY)
            .msdLevel(DEFAULT_MSD_LEVEL)
            .msdInitialFloorTime(DEFAULT_MSD_INITIAL_FLOOR_TIME)
            .msdBagSealDate(DEFAULT_MSD_BAG_SEAL_DATE)
            .marketUsage(DEFAULT_MARKET_USAGE)
            .quantityOverride(DEFAULT_QUANTITY_OVERRIDE)
            .shelfTime(DEFAULT_SHELF_TIME)
            .spMaterialName(DEFAULT_SP_MATERIAL_NAME)
            .warningLimit(DEFAULT_WARNING_LIMIT)
            .maximumLimit(DEFAULT_MAXIMUM_LIMIT)
            .comments(DEFAULT_COMMENTS)
            .warmupTime(DEFAULT_WARMUP_TIME)
            .storageUnit(DEFAULT_STORAGE_UNIT)
            .subStorageUnit(DEFAULT_SUB_STORAGE_UNIT)
            .locationOverride(DEFAULT_LOCATION_OVERRIDE)
            .expirationDate(DEFAULT_EXPIRATION_DATE)
            .manufacturingDate(DEFAULT_MANUFACTURING_DATE)
            .partClass(DEFAULT_PART_CLASS)
            .sapCode(DEFAULT_SAP_CODE)
            .trangThai(DEFAULT_TRANG_THAI)
            .checked(DEFAULT_CHECKED);
        return chiTietLenhSanXuat;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ChiTietLenhSanXuat createUpdatedEntity(EntityManager em) {
        ChiTietLenhSanXuat chiTietLenhSanXuat = new ChiTietLenhSanXuat()
            .reelID(UPDATED_REEL_ID)
            .partNumber(UPDATED_PART_NUMBER)
            .vendor(UPDATED_VENDOR)
            .lot(UPDATED_LOT)
            .userData1(UPDATED_USER_DATA_1)
            .userData2(UPDATED_USER_DATA_2)
            .userData3(UPDATED_USER_DATA_3)
            .userData4(UPDATED_USER_DATA_4)
            .userData5(UPDATED_USER_DATA_5)
            .initialQuantity(UPDATED_INITIAL_QUANTITY)
            .msdLevel(UPDATED_MSD_LEVEL)
            .msdInitialFloorTime(UPDATED_MSD_INITIAL_FLOOR_TIME)
            .msdBagSealDate(UPDATED_MSD_BAG_SEAL_DATE)
            .marketUsage(UPDATED_MARKET_USAGE)
            .quantityOverride(UPDATED_QUANTITY_OVERRIDE)
            .shelfTime(UPDATED_SHELF_TIME)
            .spMaterialName(UPDATED_SP_MATERIAL_NAME)
            .warningLimit(UPDATED_WARNING_LIMIT)
            .maximumLimit(UPDATED_MAXIMUM_LIMIT)
            .comments(UPDATED_COMMENTS)
            .warmupTime(UPDATED_WARMUP_TIME)
            .storageUnit(UPDATED_STORAGE_UNIT)
            .subStorageUnit(UPDATED_SUB_STORAGE_UNIT)
            .locationOverride(UPDATED_LOCATION_OVERRIDE)
            .expirationDate(UPDATED_EXPIRATION_DATE)
            .manufacturingDate(UPDATED_MANUFACTURING_DATE)
            .partClass(UPDATED_PART_CLASS)
            .sapCode(UPDATED_SAP_CODE)
            .trangThai(UPDATED_TRANG_THAI)
            .checked(UPDATED_CHECKED);
        return chiTietLenhSanXuat;
    }

    @BeforeEach
    public void initTest() {
        chiTietLenhSanXuat = createEntity(em);
    }

    @Test
    @Transactional
    void createChiTietLenhSanXuat() throws Exception {
        int databaseSizeBeforeCreate = chiTietLenhSanXuatRepository.findAll().size();
        // Create the ChiTietLenhSanXuat
        restChiTietLenhSanXuatMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(chiTietLenhSanXuat))
            )
            .andExpect(status().isCreated());

        // Validate the ChiTietLenhSanXuat in the database
        List<ChiTietLenhSanXuat> chiTietLenhSanXuatList = chiTietLenhSanXuatRepository.findAll();
        assertThat(chiTietLenhSanXuatList).hasSize(databaseSizeBeforeCreate + 1);
        ChiTietLenhSanXuat testChiTietLenhSanXuat = chiTietLenhSanXuatList.get(chiTietLenhSanXuatList.size() - 1);
        assertThat(testChiTietLenhSanXuat.getReelID()).isEqualTo(DEFAULT_REEL_ID);
        assertThat(testChiTietLenhSanXuat.getPartNumber()).isEqualTo(DEFAULT_PART_NUMBER);
        assertThat(testChiTietLenhSanXuat.getVendor()).isEqualTo(DEFAULT_VENDOR);
        assertThat(testChiTietLenhSanXuat.getLot()).isEqualTo(DEFAULT_LOT);
        assertThat(testChiTietLenhSanXuat.getUserData1()).isEqualTo(DEFAULT_USER_DATA_1);
        assertThat(testChiTietLenhSanXuat.getUserData2()).isEqualTo(DEFAULT_USER_DATA_2);
        assertThat(testChiTietLenhSanXuat.getUserData3()).isEqualTo(DEFAULT_USER_DATA_3);
        assertThat(testChiTietLenhSanXuat.getUserData4()).isEqualTo(DEFAULT_USER_DATA_4);
        assertThat(testChiTietLenhSanXuat.getUserData5()).isEqualTo(DEFAULT_USER_DATA_5);
        assertThat(testChiTietLenhSanXuat.getInitialQuantity()).isEqualTo(DEFAULT_INITIAL_QUANTITY);
        assertThat(testChiTietLenhSanXuat.getMsdLevel()).isEqualTo(DEFAULT_MSD_LEVEL);
        assertThat(testChiTietLenhSanXuat.getMsdInitialFloorTime()).isEqualTo(DEFAULT_MSD_INITIAL_FLOOR_TIME);
        assertThat(testChiTietLenhSanXuat.getMsdBagSealDate()).isEqualTo(DEFAULT_MSD_BAG_SEAL_DATE);
        assertThat(testChiTietLenhSanXuat.getMarketUsage()).isEqualTo(DEFAULT_MARKET_USAGE);
        assertThat(testChiTietLenhSanXuat.getQuantityOverride()).isEqualTo(DEFAULT_QUANTITY_OVERRIDE);
        assertThat(testChiTietLenhSanXuat.getShelfTime()).isEqualTo(DEFAULT_SHELF_TIME);
        assertThat(testChiTietLenhSanXuat.getSpMaterialName()).isEqualTo(DEFAULT_SP_MATERIAL_NAME);
        assertThat(testChiTietLenhSanXuat.getWarningLimit()).isEqualTo(DEFAULT_WARNING_LIMIT);
        assertThat(testChiTietLenhSanXuat.getMaximumLimit()).isEqualTo(DEFAULT_MAXIMUM_LIMIT);
        assertThat(testChiTietLenhSanXuat.getComments()).isEqualTo(DEFAULT_COMMENTS);
        assertThat(testChiTietLenhSanXuat.getWarmupTime()).isEqualTo(DEFAULT_WARMUP_TIME);
        assertThat(testChiTietLenhSanXuat.getStorageUnit()).isEqualTo(DEFAULT_STORAGE_UNIT);
        assertThat(testChiTietLenhSanXuat.getSubStorageUnit()).isEqualTo(DEFAULT_SUB_STORAGE_UNIT);
        assertThat(testChiTietLenhSanXuat.getLocationOverride()).isEqualTo(DEFAULT_LOCATION_OVERRIDE);
        assertThat(testChiTietLenhSanXuat.getExpirationDate()).isEqualTo(DEFAULT_EXPIRATION_DATE);
        assertThat(testChiTietLenhSanXuat.getManufacturingDate()).isEqualTo(DEFAULT_MANUFACTURING_DATE);
        assertThat(testChiTietLenhSanXuat.getPartClass()).isEqualTo(DEFAULT_PART_CLASS);
        assertThat(testChiTietLenhSanXuat.getSapCode()).isEqualTo(DEFAULT_SAP_CODE);
        assertThat(testChiTietLenhSanXuat.getTrangThai()).isEqualTo(DEFAULT_TRANG_THAI);
        assertThat(testChiTietLenhSanXuat.getChecked()).isEqualTo(DEFAULT_CHECKED);
    }

    @Test
    @Transactional
    void createChiTietLenhSanXuatWithExistingId() throws Exception {
        // Create the ChiTietLenhSanXuat with an existing ID
        chiTietLenhSanXuat.setId(1L);

        int databaseSizeBeforeCreate = chiTietLenhSanXuatRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restChiTietLenhSanXuatMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(chiTietLenhSanXuat))
            )
            .andExpect(status().isBadRequest());

        // Validate the ChiTietLenhSanXuat in the database
        List<ChiTietLenhSanXuat> chiTietLenhSanXuatList = chiTietLenhSanXuatRepository.findAll();
        assertThat(chiTietLenhSanXuatList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkReelIDIsRequired() throws Exception {
        int databaseSizeBeforeTest = chiTietLenhSanXuatRepository.findAll().size();
        // set the field null
        chiTietLenhSanXuat.setReelID(null);

        // Create the ChiTietLenhSanXuat, which fails.

        restChiTietLenhSanXuatMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(chiTietLenhSanXuat))
            )
            .andExpect(status().isBadRequest());

        List<ChiTietLenhSanXuat> chiTietLenhSanXuatList = chiTietLenhSanXuatRepository.findAll();
        assertThat(chiTietLenhSanXuatList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkPartNumberIsRequired() throws Exception {
        int databaseSizeBeforeTest = chiTietLenhSanXuatRepository.findAll().size();
        // set the field null
        chiTietLenhSanXuat.setPartNumber(null);

        // Create the ChiTietLenhSanXuat, which fails.

        restChiTietLenhSanXuatMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(chiTietLenhSanXuat))
            )
            .andExpect(status().isBadRequest());

        List<ChiTietLenhSanXuat> chiTietLenhSanXuatList = chiTietLenhSanXuatRepository.findAll();
        assertThat(chiTietLenhSanXuatList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkVendorIsRequired() throws Exception {
        int databaseSizeBeforeTest = chiTietLenhSanXuatRepository.findAll().size();
        // set the field null
        chiTietLenhSanXuat.setVendor(null);

        // Create the ChiTietLenhSanXuat, which fails.

        restChiTietLenhSanXuatMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(chiTietLenhSanXuat))
            )
            .andExpect(status().isBadRequest());

        List<ChiTietLenhSanXuat> chiTietLenhSanXuatList = chiTietLenhSanXuatRepository.findAll();
        assertThat(chiTietLenhSanXuatList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkLotIsRequired() throws Exception {
        int databaseSizeBeforeTest = chiTietLenhSanXuatRepository.findAll().size();
        // set the field null
        chiTietLenhSanXuat.setLot(null);

        // Create the ChiTietLenhSanXuat, which fails.

        restChiTietLenhSanXuatMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(chiTietLenhSanXuat))
            )
            .andExpect(status().isBadRequest());

        List<ChiTietLenhSanXuat> chiTietLenhSanXuatList = chiTietLenhSanXuatRepository.findAll();
        assertThat(chiTietLenhSanXuatList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkUserData1IsRequired() throws Exception {
        int databaseSizeBeforeTest = chiTietLenhSanXuatRepository.findAll().size();
        // set the field null
        chiTietLenhSanXuat.setUserData1(null);

        // Create the ChiTietLenhSanXuat, which fails.

        restChiTietLenhSanXuatMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(chiTietLenhSanXuat))
            )
            .andExpect(status().isBadRequest());

        List<ChiTietLenhSanXuat> chiTietLenhSanXuatList = chiTietLenhSanXuatRepository.findAll();
        assertThat(chiTietLenhSanXuatList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkUserData2IsRequired() throws Exception {
        int databaseSizeBeforeTest = chiTietLenhSanXuatRepository.findAll().size();
        // set the field null
        chiTietLenhSanXuat.setUserData2(null);

        // Create the ChiTietLenhSanXuat, which fails.

        restChiTietLenhSanXuatMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(chiTietLenhSanXuat))
            )
            .andExpect(status().isBadRequest());

        List<ChiTietLenhSanXuat> chiTietLenhSanXuatList = chiTietLenhSanXuatRepository.findAll();
        assertThat(chiTietLenhSanXuatList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkUserData3IsRequired() throws Exception {
        int databaseSizeBeforeTest = chiTietLenhSanXuatRepository.findAll().size();
        // set the field null
        chiTietLenhSanXuat.setUserData3(null);

        // Create the ChiTietLenhSanXuat, which fails.

        restChiTietLenhSanXuatMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(chiTietLenhSanXuat))
            )
            .andExpect(status().isBadRequest());

        List<ChiTietLenhSanXuat> chiTietLenhSanXuatList = chiTietLenhSanXuatRepository.findAll();
        assertThat(chiTietLenhSanXuatList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkUserData4IsRequired() throws Exception {
        int databaseSizeBeforeTest = chiTietLenhSanXuatRepository.findAll().size();
        // set the field null
        chiTietLenhSanXuat.setUserData4(null);

        // Create the ChiTietLenhSanXuat, which fails.

        restChiTietLenhSanXuatMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(chiTietLenhSanXuat))
            )
            .andExpect(status().isBadRequest());

        List<ChiTietLenhSanXuat> chiTietLenhSanXuatList = chiTietLenhSanXuatRepository.findAll();
        assertThat(chiTietLenhSanXuatList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkUserData5IsRequired() throws Exception {
        int databaseSizeBeforeTest = chiTietLenhSanXuatRepository.findAll().size();
        // set the field null
        chiTietLenhSanXuat.setUserData5(null);

        // Create the ChiTietLenhSanXuat, which fails.

        restChiTietLenhSanXuatMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(chiTietLenhSanXuat))
            )
            .andExpect(status().isBadRequest());

        List<ChiTietLenhSanXuat> chiTietLenhSanXuatList = chiTietLenhSanXuatRepository.findAll();
        assertThat(chiTietLenhSanXuatList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkInitialQuantityIsRequired() throws Exception {
        int databaseSizeBeforeTest = chiTietLenhSanXuatRepository.findAll().size();
        // set the field null
        chiTietLenhSanXuat.setInitialQuantity(null);

        // Create the ChiTietLenhSanXuat, which fails.

        restChiTietLenhSanXuatMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(chiTietLenhSanXuat))
            )
            .andExpect(status().isBadRequest());

        List<ChiTietLenhSanXuat> chiTietLenhSanXuatList = chiTietLenhSanXuatRepository.findAll();
        assertThat(chiTietLenhSanXuatList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkQuantityOverrideIsRequired() throws Exception {
        int databaseSizeBeforeTest = chiTietLenhSanXuatRepository.findAll().size();
        // set the field null
        chiTietLenhSanXuat.setQuantityOverride(null);

        // Create the ChiTietLenhSanXuat, which fails.

        restChiTietLenhSanXuatMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(chiTietLenhSanXuat))
            )
            .andExpect(status().isBadRequest());

        List<ChiTietLenhSanXuat> chiTietLenhSanXuatList = chiTietLenhSanXuatRepository.findAll();
        assertThat(chiTietLenhSanXuatList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkStorageUnitIsRequired() throws Exception {
        int databaseSizeBeforeTest = chiTietLenhSanXuatRepository.findAll().size();
        // set the field null
        chiTietLenhSanXuat.setStorageUnit(null);

        // Create the ChiTietLenhSanXuat, which fails.

        restChiTietLenhSanXuatMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(chiTietLenhSanXuat))
            )
            .andExpect(status().isBadRequest());

        List<ChiTietLenhSanXuat> chiTietLenhSanXuatList = chiTietLenhSanXuatRepository.findAll();
        assertThat(chiTietLenhSanXuatList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkExpirationDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = chiTietLenhSanXuatRepository.findAll().size();
        // set the field null
        chiTietLenhSanXuat.setExpirationDate(null);

        // Create the ChiTietLenhSanXuat, which fails.

        restChiTietLenhSanXuatMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(chiTietLenhSanXuat))
            )
            .andExpect(status().isBadRequest());

        List<ChiTietLenhSanXuat> chiTietLenhSanXuatList = chiTietLenhSanXuatRepository.findAll();
        assertThat(chiTietLenhSanXuatList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkManufacturingDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = chiTietLenhSanXuatRepository.findAll().size();
        // set the field null
        chiTietLenhSanXuat.setManufacturingDate(null);

        // Create the ChiTietLenhSanXuat, which fails.

        restChiTietLenhSanXuatMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(chiTietLenhSanXuat))
            )
            .andExpect(status().isBadRequest());

        List<ChiTietLenhSanXuat> chiTietLenhSanXuatList = chiTietLenhSanXuatRepository.findAll();
        assertThat(chiTietLenhSanXuatList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllChiTietLenhSanXuats() throws Exception {
        // Initialize the database
        chiTietLenhSanXuatRepository.saveAndFlush(chiTietLenhSanXuat);

        // Get all the chiTietLenhSanXuatList
        restChiTietLenhSanXuatMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(chiTietLenhSanXuat.getId().intValue())))
            .andExpect(jsonPath("$.[*].reelID").value(hasItem(DEFAULT_REEL_ID)))
            .andExpect(jsonPath("$.[*].partNumber").value(hasItem(DEFAULT_PART_NUMBER)))
            .andExpect(jsonPath("$.[*].vendor").value(hasItem(DEFAULT_VENDOR)))
            .andExpect(jsonPath("$.[*].lot").value(hasItem(DEFAULT_LOT)))
            .andExpect(jsonPath("$.[*].userData1").value(hasItem(DEFAULT_USER_DATA_1)))
            .andExpect(jsonPath("$.[*].userData2").value(hasItem(DEFAULT_USER_DATA_2)))
            .andExpect(jsonPath("$.[*].userData3").value(hasItem(DEFAULT_USER_DATA_3)))
            .andExpect(jsonPath("$.[*].userData4").value(hasItem(DEFAULT_USER_DATA_4)))
            .andExpect(jsonPath("$.[*].userData5").value(hasItem(DEFAULT_USER_DATA_5)))
            .andExpect(jsonPath("$.[*].initialQuantity").value(hasItem(DEFAULT_INITIAL_QUANTITY)))
            .andExpect(jsonPath("$.[*].msdLevel").value(hasItem(DEFAULT_MSD_LEVEL)))
            .andExpect(jsonPath("$.[*].msdInitialFloorTime").value(hasItem(DEFAULT_MSD_INITIAL_FLOOR_TIME)))
            .andExpect(jsonPath("$.[*].msdBagSealDate").value(hasItem(DEFAULT_MSD_BAG_SEAL_DATE)))
            .andExpect(jsonPath("$.[*].marketUsage").value(hasItem(DEFAULT_MARKET_USAGE)))
            .andExpect(jsonPath("$.[*].quantityOverride").value(hasItem(DEFAULT_QUANTITY_OVERRIDE)))
            .andExpect(jsonPath("$.[*].shelfTime").value(hasItem(DEFAULT_SHELF_TIME)))
            .andExpect(jsonPath("$.[*].spMaterialName").value(hasItem(DEFAULT_SP_MATERIAL_NAME)))
            .andExpect(jsonPath("$.[*].warningLimit").value(hasItem(DEFAULT_WARNING_LIMIT)))
            .andExpect(jsonPath("$.[*].maximumLimit").value(hasItem(DEFAULT_MAXIMUM_LIMIT)))
            .andExpect(jsonPath("$.[*].comments").value(hasItem(DEFAULT_COMMENTS)))
            .andExpect(jsonPath("$.[*].warmupTime").value(hasItem(DEFAULT_WARMUP_TIME)))
            .andExpect(jsonPath("$.[*].storageUnit").value(hasItem(DEFAULT_STORAGE_UNIT)))
            .andExpect(jsonPath("$.[*].subStorageUnit").value(hasItem(DEFAULT_SUB_STORAGE_UNIT)))
            .andExpect(jsonPath("$.[*].locationOverride").value(hasItem(DEFAULT_LOCATION_OVERRIDE)))
            .andExpect(jsonPath("$.[*].expirationDate").value(hasItem(DEFAULT_EXPIRATION_DATE)))
            .andExpect(jsonPath("$.[*].manufacturingDate").value(hasItem(DEFAULT_MANUFACTURING_DATE)))
            .andExpect(jsonPath("$.[*].partClass").value(hasItem(DEFAULT_PART_CLASS)))
            .andExpect(jsonPath("$.[*].sapCode").value(hasItem(DEFAULT_SAP_CODE)))
            .andExpect(jsonPath("$.[*].trangThai").value(hasItem(DEFAULT_TRANG_THAI)))
            .andExpect(jsonPath("$.[*].checked").value(hasItem(DEFAULT_CHECKED)));
    }

    @Test
    @Transactional
    void getChiTietLenhSanXuat() throws Exception {
        // Initialize the database
        chiTietLenhSanXuatRepository.saveAndFlush(chiTietLenhSanXuat);

        // Get the chiTietLenhSanXuat
        restChiTietLenhSanXuatMockMvc
            .perform(get(ENTITY_API_URL_ID, chiTietLenhSanXuat.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(chiTietLenhSanXuat.getId().intValue()))
            .andExpect(jsonPath("$.reelID").value(DEFAULT_REEL_ID))
            .andExpect(jsonPath("$.partNumber").value(DEFAULT_PART_NUMBER))
            .andExpect(jsonPath("$.vendor").value(DEFAULT_VENDOR))
            .andExpect(jsonPath("$.lot").value(DEFAULT_LOT))
            .andExpect(jsonPath("$.userData1").value(DEFAULT_USER_DATA_1))
            .andExpect(jsonPath("$.userData2").value(DEFAULT_USER_DATA_2))
            .andExpect(jsonPath("$.userData3").value(DEFAULT_USER_DATA_3))
            .andExpect(jsonPath("$.userData4").value(DEFAULT_USER_DATA_4))
            .andExpect(jsonPath("$.userData5").value(DEFAULT_USER_DATA_5))
            .andExpect(jsonPath("$.initialQuantity").value(DEFAULT_INITIAL_QUANTITY))
            .andExpect(jsonPath("$.msdLevel").value(DEFAULT_MSD_LEVEL))
            .andExpect(jsonPath("$.msdInitialFloorTime").value(DEFAULT_MSD_INITIAL_FLOOR_TIME))
            .andExpect(jsonPath("$.msdBagSealDate").value(DEFAULT_MSD_BAG_SEAL_DATE))
            .andExpect(jsonPath("$.marketUsage").value(DEFAULT_MARKET_USAGE))
            .andExpect(jsonPath("$.quantityOverride").value(DEFAULT_QUANTITY_OVERRIDE))
            .andExpect(jsonPath("$.shelfTime").value(DEFAULT_SHELF_TIME))
            .andExpect(jsonPath("$.spMaterialName").value(DEFAULT_SP_MATERIAL_NAME))
            .andExpect(jsonPath("$.warningLimit").value(DEFAULT_WARNING_LIMIT))
            .andExpect(jsonPath("$.maximumLimit").value(DEFAULT_MAXIMUM_LIMIT))
            .andExpect(jsonPath("$.comments").value(DEFAULT_COMMENTS))
            .andExpect(jsonPath("$.warmupTime").value(DEFAULT_WARMUP_TIME))
            .andExpect(jsonPath("$.storageUnit").value(DEFAULT_STORAGE_UNIT))
            .andExpect(jsonPath("$.subStorageUnit").value(DEFAULT_SUB_STORAGE_UNIT))
            .andExpect(jsonPath("$.locationOverride").value(DEFAULT_LOCATION_OVERRIDE))
            .andExpect(jsonPath("$.expirationDate").value(DEFAULT_EXPIRATION_DATE))
            .andExpect(jsonPath("$.manufacturingDate").value(DEFAULT_MANUFACTURING_DATE))
            .andExpect(jsonPath("$.partClass").value(DEFAULT_PART_CLASS))
            .andExpect(jsonPath("$.sapCode").value(DEFAULT_SAP_CODE))
            .andExpect(jsonPath("$.trangThai").value(DEFAULT_TRANG_THAI))
            .andExpect(jsonPath("$.checked").value(DEFAULT_CHECKED));
    }

    @Test
    @Transactional
    void getNonExistingChiTietLenhSanXuat() throws Exception {
        // Get the chiTietLenhSanXuat
        restChiTietLenhSanXuatMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewChiTietLenhSanXuat() throws Exception {
        // Initialize the database
        chiTietLenhSanXuatRepository.saveAndFlush(chiTietLenhSanXuat);

        int databaseSizeBeforeUpdate = chiTietLenhSanXuatRepository.findAll().size();

        // Update the chiTietLenhSanXuat
        ChiTietLenhSanXuat updatedChiTietLenhSanXuat = chiTietLenhSanXuatRepository.findById(chiTietLenhSanXuat.getId()).get();
        // Disconnect from session so that the updates on updatedChiTietLenhSanXuat are not directly saved in db
        em.detach(updatedChiTietLenhSanXuat);
        updatedChiTietLenhSanXuat
            .reelID(UPDATED_REEL_ID)
            .partNumber(UPDATED_PART_NUMBER)
            .vendor(UPDATED_VENDOR)
            .lot(UPDATED_LOT)
            .userData1(UPDATED_USER_DATA_1)
            .userData2(UPDATED_USER_DATA_2)
            .userData3(UPDATED_USER_DATA_3)
            .userData4(UPDATED_USER_DATA_4)
            .userData5(UPDATED_USER_DATA_5)
            .initialQuantity(UPDATED_INITIAL_QUANTITY)
            .msdLevel(UPDATED_MSD_LEVEL)
            .msdInitialFloorTime(UPDATED_MSD_INITIAL_FLOOR_TIME)
            .msdBagSealDate(UPDATED_MSD_BAG_SEAL_DATE)
            .marketUsage(UPDATED_MARKET_USAGE)
            .quantityOverride(UPDATED_QUANTITY_OVERRIDE)
            .shelfTime(UPDATED_SHELF_TIME)
            .spMaterialName(UPDATED_SP_MATERIAL_NAME)
            .warningLimit(UPDATED_WARNING_LIMIT)
            .maximumLimit(UPDATED_MAXIMUM_LIMIT)
            .comments(UPDATED_COMMENTS)
            .warmupTime(UPDATED_WARMUP_TIME)
            .storageUnit(UPDATED_STORAGE_UNIT)
            .subStorageUnit(UPDATED_SUB_STORAGE_UNIT)
            .locationOverride(UPDATED_LOCATION_OVERRIDE)
            .expirationDate(UPDATED_EXPIRATION_DATE)
            .manufacturingDate(UPDATED_MANUFACTURING_DATE)
            .partClass(UPDATED_PART_CLASS)
            .sapCode(UPDATED_SAP_CODE)
            .trangThai(UPDATED_TRANG_THAI)
            .checked(UPDATED_CHECKED);

        restChiTietLenhSanXuatMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedChiTietLenhSanXuat.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedChiTietLenhSanXuat))
            )
            .andExpect(status().isOk());

        // Validate the ChiTietLenhSanXuat in the database
        List<ChiTietLenhSanXuat> chiTietLenhSanXuatList = chiTietLenhSanXuatRepository.findAll();
        assertThat(chiTietLenhSanXuatList).hasSize(databaseSizeBeforeUpdate);
        ChiTietLenhSanXuat testChiTietLenhSanXuat = chiTietLenhSanXuatList.get(chiTietLenhSanXuatList.size() - 1);
        assertThat(testChiTietLenhSanXuat.getReelID()).isEqualTo(UPDATED_REEL_ID);
        assertThat(testChiTietLenhSanXuat.getPartNumber()).isEqualTo(UPDATED_PART_NUMBER);
        assertThat(testChiTietLenhSanXuat.getVendor()).isEqualTo(UPDATED_VENDOR);
        assertThat(testChiTietLenhSanXuat.getLot()).isEqualTo(UPDATED_LOT);
        assertThat(testChiTietLenhSanXuat.getUserData1()).isEqualTo(UPDATED_USER_DATA_1);
        assertThat(testChiTietLenhSanXuat.getUserData2()).isEqualTo(UPDATED_USER_DATA_2);
        assertThat(testChiTietLenhSanXuat.getUserData3()).isEqualTo(UPDATED_USER_DATA_3);
        assertThat(testChiTietLenhSanXuat.getUserData4()).isEqualTo(UPDATED_USER_DATA_4);
        assertThat(testChiTietLenhSanXuat.getUserData5()).isEqualTo(UPDATED_USER_DATA_5);
        assertThat(testChiTietLenhSanXuat.getInitialQuantity()).isEqualTo(UPDATED_INITIAL_QUANTITY);
        assertThat(testChiTietLenhSanXuat.getMsdLevel()).isEqualTo(UPDATED_MSD_LEVEL);
        assertThat(testChiTietLenhSanXuat.getMsdInitialFloorTime()).isEqualTo(UPDATED_MSD_INITIAL_FLOOR_TIME);
        assertThat(testChiTietLenhSanXuat.getMsdBagSealDate()).isEqualTo(UPDATED_MSD_BAG_SEAL_DATE);
        assertThat(testChiTietLenhSanXuat.getMarketUsage()).isEqualTo(UPDATED_MARKET_USAGE);
        assertThat(testChiTietLenhSanXuat.getQuantityOverride()).isEqualTo(UPDATED_QUANTITY_OVERRIDE);
        assertThat(testChiTietLenhSanXuat.getShelfTime()).isEqualTo(UPDATED_SHELF_TIME);
        assertThat(testChiTietLenhSanXuat.getSpMaterialName()).isEqualTo(UPDATED_SP_MATERIAL_NAME);
        assertThat(testChiTietLenhSanXuat.getWarningLimit()).isEqualTo(UPDATED_WARNING_LIMIT);
        assertThat(testChiTietLenhSanXuat.getMaximumLimit()).isEqualTo(UPDATED_MAXIMUM_LIMIT);
        assertThat(testChiTietLenhSanXuat.getComments()).isEqualTo(UPDATED_COMMENTS);
        assertThat(testChiTietLenhSanXuat.getWarmupTime()).isEqualTo(UPDATED_WARMUP_TIME);
        assertThat(testChiTietLenhSanXuat.getStorageUnit()).isEqualTo(UPDATED_STORAGE_UNIT);
        assertThat(testChiTietLenhSanXuat.getSubStorageUnit()).isEqualTo(UPDATED_SUB_STORAGE_UNIT);
        assertThat(testChiTietLenhSanXuat.getLocationOverride()).isEqualTo(UPDATED_LOCATION_OVERRIDE);
        assertThat(testChiTietLenhSanXuat.getExpirationDate()).isEqualTo(UPDATED_EXPIRATION_DATE);
        assertThat(testChiTietLenhSanXuat.getManufacturingDate()).isEqualTo(UPDATED_MANUFACTURING_DATE);
        assertThat(testChiTietLenhSanXuat.getPartClass()).isEqualTo(UPDATED_PART_CLASS);
        assertThat(testChiTietLenhSanXuat.getSapCode()).isEqualTo(UPDATED_SAP_CODE);
        assertThat(testChiTietLenhSanXuat.getTrangThai()).isEqualTo(UPDATED_TRANG_THAI);
        assertThat(testChiTietLenhSanXuat.getChecked()).isEqualTo(UPDATED_CHECKED);
    }

    @Test
    @Transactional
    void putNonExistingChiTietLenhSanXuat() throws Exception {
        int databaseSizeBeforeUpdate = chiTietLenhSanXuatRepository.findAll().size();
        chiTietLenhSanXuat.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restChiTietLenhSanXuatMockMvc
            .perform(
                put(ENTITY_API_URL_ID, chiTietLenhSanXuat.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(chiTietLenhSanXuat))
            )
            .andExpect(status().isBadRequest());

        // Validate the ChiTietLenhSanXuat in the database
        List<ChiTietLenhSanXuat> chiTietLenhSanXuatList = chiTietLenhSanXuatRepository.findAll();
        assertThat(chiTietLenhSanXuatList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchChiTietLenhSanXuat() throws Exception {
        int databaseSizeBeforeUpdate = chiTietLenhSanXuatRepository.findAll().size();
        chiTietLenhSanXuat.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restChiTietLenhSanXuatMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(chiTietLenhSanXuat))
            )
            .andExpect(status().isBadRequest());

        // Validate the ChiTietLenhSanXuat in the database
        List<ChiTietLenhSanXuat> chiTietLenhSanXuatList = chiTietLenhSanXuatRepository.findAll();
        assertThat(chiTietLenhSanXuatList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamChiTietLenhSanXuat() throws Exception {
        int databaseSizeBeforeUpdate = chiTietLenhSanXuatRepository.findAll().size();
        chiTietLenhSanXuat.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restChiTietLenhSanXuatMockMvc
            .perform(
                put(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(chiTietLenhSanXuat))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ChiTietLenhSanXuat in the database
        List<ChiTietLenhSanXuat> chiTietLenhSanXuatList = chiTietLenhSanXuatRepository.findAll();
        assertThat(chiTietLenhSanXuatList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateChiTietLenhSanXuatWithPatch() throws Exception {
        // Initialize the database
        chiTietLenhSanXuatRepository.saveAndFlush(chiTietLenhSanXuat);

        int databaseSizeBeforeUpdate = chiTietLenhSanXuatRepository.findAll().size();

        // Update the chiTietLenhSanXuat using partial update
        ChiTietLenhSanXuat partialUpdatedChiTietLenhSanXuat = new ChiTietLenhSanXuat();
        partialUpdatedChiTietLenhSanXuat.setId(chiTietLenhSanXuat.getId());

        partialUpdatedChiTietLenhSanXuat
            .reelID(UPDATED_REEL_ID)
            .partNumber(UPDATED_PART_NUMBER)
            .vendor(UPDATED_VENDOR)
            .msdLevel(UPDATED_MSD_LEVEL)
            .marketUsage(UPDATED_MARKET_USAGE)
            .quantityOverride(UPDATED_QUANTITY_OVERRIDE)
            .shelfTime(UPDATED_SHELF_TIME)
            .warningLimit(UPDATED_WARNING_LIMIT)
            .storageUnit(UPDATED_STORAGE_UNIT)
            .subStorageUnit(UPDATED_SUB_STORAGE_UNIT)
            .locationOverride(UPDATED_LOCATION_OVERRIDE)
            .expirationDate(UPDATED_EXPIRATION_DATE)
            .manufacturingDate(UPDATED_MANUFACTURING_DATE);

        restChiTietLenhSanXuatMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedChiTietLenhSanXuat.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedChiTietLenhSanXuat))
            )
            .andExpect(status().isOk());

        // Validate the ChiTietLenhSanXuat in the database
        List<ChiTietLenhSanXuat> chiTietLenhSanXuatList = chiTietLenhSanXuatRepository.findAll();
        assertThat(chiTietLenhSanXuatList).hasSize(databaseSizeBeforeUpdate);
        ChiTietLenhSanXuat testChiTietLenhSanXuat = chiTietLenhSanXuatList.get(chiTietLenhSanXuatList.size() - 1);
        assertThat(testChiTietLenhSanXuat.getReelID()).isEqualTo(UPDATED_REEL_ID);
        assertThat(testChiTietLenhSanXuat.getPartNumber()).isEqualTo(UPDATED_PART_NUMBER);
        assertThat(testChiTietLenhSanXuat.getVendor()).isEqualTo(UPDATED_VENDOR);
        assertThat(testChiTietLenhSanXuat.getLot()).isEqualTo(DEFAULT_LOT);
        assertThat(testChiTietLenhSanXuat.getUserData1()).isEqualTo(DEFAULT_USER_DATA_1);
        assertThat(testChiTietLenhSanXuat.getUserData2()).isEqualTo(DEFAULT_USER_DATA_2);
        assertThat(testChiTietLenhSanXuat.getUserData3()).isEqualTo(DEFAULT_USER_DATA_3);
        assertThat(testChiTietLenhSanXuat.getUserData4()).isEqualTo(DEFAULT_USER_DATA_4);
        assertThat(testChiTietLenhSanXuat.getUserData5()).isEqualTo(DEFAULT_USER_DATA_5);
        assertThat(testChiTietLenhSanXuat.getInitialQuantity()).isEqualTo(DEFAULT_INITIAL_QUANTITY);
        assertThat(testChiTietLenhSanXuat.getMsdLevel()).isEqualTo(UPDATED_MSD_LEVEL);
        assertThat(testChiTietLenhSanXuat.getMsdInitialFloorTime()).isEqualTo(DEFAULT_MSD_INITIAL_FLOOR_TIME);
        assertThat(testChiTietLenhSanXuat.getMsdBagSealDate()).isEqualTo(DEFAULT_MSD_BAG_SEAL_DATE);
        assertThat(testChiTietLenhSanXuat.getMarketUsage()).isEqualTo(UPDATED_MARKET_USAGE);
        assertThat(testChiTietLenhSanXuat.getQuantityOverride()).isEqualTo(UPDATED_QUANTITY_OVERRIDE);
        assertThat(testChiTietLenhSanXuat.getShelfTime()).isEqualTo(UPDATED_SHELF_TIME);
        assertThat(testChiTietLenhSanXuat.getSpMaterialName()).isEqualTo(DEFAULT_SP_MATERIAL_NAME);
        assertThat(testChiTietLenhSanXuat.getWarningLimit()).isEqualTo(UPDATED_WARNING_LIMIT);
        assertThat(testChiTietLenhSanXuat.getMaximumLimit()).isEqualTo(DEFAULT_MAXIMUM_LIMIT);
        assertThat(testChiTietLenhSanXuat.getComments()).isEqualTo(DEFAULT_COMMENTS);
        assertThat(testChiTietLenhSanXuat.getWarmupTime()).isEqualTo(DEFAULT_WARMUP_TIME);
        assertThat(testChiTietLenhSanXuat.getStorageUnit()).isEqualTo(UPDATED_STORAGE_UNIT);
        assertThat(testChiTietLenhSanXuat.getSubStorageUnit()).isEqualTo(UPDATED_SUB_STORAGE_UNIT);
        assertThat(testChiTietLenhSanXuat.getLocationOverride()).isEqualTo(UPDATED_LOCATION_OVERRIDE);
        assertThat(testChiTietLenhSanXuat.getExpirationDate()).isEqualTo(UPDATED_EXPIRATION_DATE);
        assertThat(testChiTietLenhSanXuat.getManufacturingDate()).isEqualTo(UPDATED_MANUFACTURING_DATE);
        assertThat(testChiTietLenhSanXuat.getPartClass()).isEqualTo(DEFAULT_PART_CLASS);
        assertThat(testChiTietLenhSanXuat.getSapCode()).isEqualTo(DEFAULT_SAP_CODE);
        assertThat(testChiTietLenhSanXuat.getTrangThai()).isEqualTo(DEFAULT_TRANG_THAI);
        assertThat(testChiTietLenhSanXuat.getChecked()).isEqualTo(DEFAULT_CHECKED);
    }

    @Test
    @Transactional
    void fullUpdateChiTietLenhSanXuatWithPatch() throws Exception {
        // Initialize the database
        chiTietLenhSanXuatRepository.saveAndFlush(chiTietLenhSanXuat);

        int databaseSizeBeforeUpdate = chiTietLenhSanXuatRepository.findAll().size();

        // Update the chiTietLenhSanXuat using partial update
        ChiTietLenhSanXuat partialUpdatedChiTietLenhSanXuat = new ChiTietLenhSanXuat();
        partialUpdatedChiTietLenhSanXuat.setId(chiTietLenhSanXuat.getId());

        partialUpdatedChiTietLenhSanXuat
            .reelID(UPDATED_REEL_ID)
            .partNumber(UPDATED_PART_NUMBER)
            .vendor(UPDATED_VENDOR)
            .lot(UPDATED_LOT)
            .userData1(UPDATED_USER_DATA_1)
            .userData2(UPDATED_USER_DATA_2)
            .userData3(UPDATED_USER_DATA_3)
            .userData4(UPDATED_USER_DATA_4)
            .userData5(UPDATED_USER_DATA_5)
            .initialQuantity(UPDATED_INITIAL_QUANTITY)
            .msdLevel(UPDATED_MSD_LEVEL)
            .msdInitialFloorTime(UPDATED_MSD_INITIAL_FLOOR_TIME)
            .msdBagSealDate(UPDATED_MSD_BAG_SEAL_DATE)
            .marketUsage(UPDATED_MARKET_USAGE)
            .quantityOverride(UPDATED_QUANTITY_OVERRIDE)
            .shelfTime(UPDATED_SHELF_TIME)
            .spMaterialName(UPDATED_SP_MATERIAL_NAME)
            .warningLimit(UPDATED_WARNING_LIMIT)
            .maximumLimit(UPDATED_MAXIMUM_LIMIT)
            .comments(UPDATED_COMMENTS)
            .warmupTime(UPDATED_WARMUP_TIME)
            .storageUnit(UPDATED_STORAGE_UNIT)
            .subStorageUnit(UPDATED_SUB_STORAGE_UNIT)
            .locationOverride(UPDATED_LOCATION_OVERRIDE)
            .expirationDate(UPDATED_EXPIRATION_DATE)
            .manufacturingDate(UPDATED_MANUFACTURING_DATE)
            .partClass(UPDATED_PART_CLASS)
            .sapCode(UPDATED_SAP_CODE)
            .trangThai(UPDATED_TRANG_THAI)
            .checked(UPDATED_CHECKED);

        restChiTietLenhSanXuatMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedChiTietLenhSanXuat.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedChiTietLenhSanXuat))
            )
            .andExpect(status().isOk());

        // Validate the ChiTietLenhSanXuat in the database
        List<ChiTietLenhSanXuat> chiTietLenhSanXuatList = chiTietLenhSanXuatRepository.findAll();
        assertThat(chiTietLenhSanXuatList).hasSize(databaseSizeBeforeUpdate);
        ChiTietLenhSanXuat testChiTietLenhSanXuat = chiTietLenhSanXuatList.get(chiTietLenhSanXuatList.size() - 1);
        assertThat(testChiTietLenhSanXuat.getReelID()).isEqualTo(UPDATED_REEL_ID);
        assertThat(testChiTietLenhSanXuat.getPartNumber()).isEqualTo(UPDATED_PART_NUMBER);
        assertThat(testChiTietLenhSanXuat.getVendor()).isEqualTo(UPDATED_VENDOR);
        assertThat(testChiTietLenhSanXuat.getLot()).isEqualTo(UPDATED_LOT);
        assertThat(testChiTietLenhSanXuat.getUserData1()).isEqualTo(UPDATED_USER_DATA_1);
        assertThat(testChiTietLenhSanXuat.getUserData2()).isEqualTo(UPDATED_USER_DATA_2);
        assertThat(testChiTietLenhSanXuat.getUserData3()).isEqualTo(UPDATED_USER_DATA_3);
        assertThat(testChiTietLenhSanXuat.getUserData4()).isEqualTo(UPDATED_USER_DATA_4);
        assertThat(testChiTietLenhSanXuat.getUserData5()).isEqualTo(UPDATED_USER_DATA_5);
        assertThat(testChiTietLenhSanXuat.getInitialQuantity()).isEqualTo(UPDATED_INITIAL_QUANTITY);
        assertThat(testChiTietLenhSanXuat.getMsdLevel()).isEqualTo(UPDATED_MSD_LEVEL);
        assertThat(testChiTietLenhSanXuat.getMsdInitialFloorTime()).isEqualTo(UPDATED_MSD_INITIAL_FLOOR_TIME);
        assertThat(testChiTietLenhSanXuat.getMsdBagSealDate()).isEqualTo(UPDATED_MSD_BAG_SEAL_DATE);
        assertThat(testChiTietLenhSanXuat.getMarketUsage()).isEqualTo(UPDATED_MARKET_USAGE);
        assertThat(testChiTietLenhSanXuat.getQuantityOverride()).isEqualTo(UPDATED_QUANTITY_OVERRIDE);
        assertThat(testChiTietLenhSanXuat.getShelfTime()).isEqualTo(UPDATED_SHELF_TIME);
        assertThat(testChiTietLenhSanXuat.getSpMaterialName()).isEqualTo(UPDATED_SP_MATERIAL_NAME);
        assertThat(testChiTietLenhSanXuat.getWarningLimit()).isEqualTo(UPDATED_WARNING_LIMIT);
        assertThat(testChiTietLenhSanXuat.getMaximumLimit()).isEqualTo(UPDATED_MAXIMUM_LIMIT);
        assertThat(testChiTietLenhSanXuat.getComments()).isEqualTo(UPDATED_COMMENTS);
        assertThat(testChiTietLenhSanXuat.getWarmupTime()).isEqualTo(UPDATED_WARMUP_TIME);
        assertThat(testChiTietLenhSanXuat.getStorageUnit()).isEqualTo(UPDATED_STORAGE_UNIT);
        assertThat(testChiTietLenhSanXuat.getSubStorageUnit()).isEqualTo(UPDATED_SUB_STORAGE_UNIT);
        assertThat(testChiTietLenhSanXuat.getLocationOverride()).isEqualTo(UPDATED_LOCATION_OVERRIDE);
        assertThat(testChiTietLenhSanXuat.getExpirationDate()).isEqualTo(UPDATED_EXPIRATION_DATE);
        assertThat(testChiTietLenhSanXuat.getManufacturingDate()).isEqualTo(UPDATED_MANUFACTURING_DATE);
        assertThat(testChiTietLenhSanXuat.getPartClass()).isEqualTo(UPDATED_PART_CLASS);
        assertThat(testChiTietLenhSanXuat.getSapCode()).isEqualTo(UPDATED_SAP_CODE);
        assertThat(testChiTietLenhSanXuat.getTrangThai()).isEqualTo(UPDATED_TRANG_THAI);
        assertThat(testChiTietLenhSanXuat.getChecked()).isEqualTo(UPDATED_CHECKED);
    }

    @Test
    @Transactional
    void patchNonExistingChiTietLenhSanXuat() throws Exception {
        int databaseSizeBeforeUpdate = chiTietLenhSanXuatRepository.findAll().size();
        chiTietLenhSanXuat.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restChiTietLenhSanXuatMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, chiTietLenhSanXuat.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(chiTietLenhSanXuat))
            )
            .andExpect(status().isBadRequest());

        // Validate the ChiTietLenhSanXuat in the database
        List<ChiTietLenhSanXuat> chiTietLenhSanXuatList = chiTietLenhSanXuatRepository.findAll();
        assertThat(chiTietLenhSanXuatList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchChiTietLenhSanXuat() throws Exception {
        int databaseSizeBeforeUpdate = chiTietLenhSanXuatRepository.findAll().size();
        chiTietLenhSanXuat.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restChiTietLenhSanXuatMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(chiTietLenhSanXuat))
            )
            .andExpect(status().isBadRequest());

        // Validate the ChiTietLenhSanXuat in the database
        List<ChiTietLenhSanXuat> chiTietLenhSanXuatList = chiTietLenhSanXuatRepository.findAll();
        assertThat(chiTietLenhSanXuatList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamChiTietLenhSanXuat() throws Exception {
        int databaseSizeBeforeUpdate = chiTietLenhSanXuatRepository.findAll().size();
        chiTietLenhSanXuat.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restChiTietLenhSanXuatMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(chiTietLenhSanXuat))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ChiTietLenhSanXuat in the database
        List<ChiTietLenhSanXuat> chiTietLenhSanXuatList = chiTietLenhSanXuatRepository.findAll();
        assertThat(chiTietLenhSanXuatList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteChiTietLenhSanXuat() throws Exception {
        // Initialize the database
        chiTietLenhSanXuatRepository.saveAndFlush(chiTietLenhSanXuat);

        int databaseSizeBeforeDelete = chiTietLenhSanXuatRepository.findAll().size();

        // Delete the chiTietLenhSanXuat
        restChiTietLenhSanXuatMockMvc
            .perform(delete(ENTITY_API_URL_ID, chiTietLenhSanXuat.getId()).with(csrf()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ChiTietLenhSanXuat> chiTietLenhSanXuatList = chiTietLenhSanXuatRepository.findAll();
        assertThat(chiTietLenhSanXuatList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
