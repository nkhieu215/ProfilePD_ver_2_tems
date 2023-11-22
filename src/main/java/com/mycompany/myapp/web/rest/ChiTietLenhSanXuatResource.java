package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.ChiTietLenhSanXuat;
import com.mycompany.myapp.repository.ChiTietLenhSanXuatRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.ChiTietLenhSanXuat}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ChiTietLenhSanXuatResource {

    private final Logger log = LoggerFactory.getLogger(ChiTietLenhSanXuatResource.class);

    private static final String ENTITY_NAME = "chiTietLenhSanXuat";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ChiTietLenhSanXuatRepository chiTietLenhSanXuatRepository;

    public ChiTietLenhSanXuatResource(ChiTietLenhSanXuatRepository chiTietLenhSanXuatRepository) {
        this.chiTietLenhSanXuatRepository = chiTietLenhSanXuatRepository;
    }

    /**
     * {@code POST  /chi-tiet-lenh-san-xuats} : Create a new chiTietLenhSanXuat.
     *
     * @param chiTietLenhSanXuat the chiTietLenhSanXuat to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new chiTietLenhSanXuat, or with status {@code 400 (Bad Request)} if the chiTietLenhSanXuat has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/chi-tiet-lenh-san-xuats")
    public ResponseEntity<ChiTietLenhSanXuat> createChiTietLenhSanXuat(@Valid @RequestBody ChiTietLenhSanXuat chiTietLenhSanXuat)
        throws URISyntaxException {
        log.debug("REST request to save ChiTietLenhSanXuat : {}", chiTietLenhSanXuat);
        if (chiTietLenhSanXuat.getId() != null) {
            throw new BadRequestAlertException("A new chiTietLenhSanXuat cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ChiTietLenhSanXuat result = chiTietLenhSanXuatRepository.save(chiTietLenhSanXuat);
        return ResponseEntity
            .created(new URI("/api/chi-tiet-lenh-san-xuats/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /chi-tiet-lenh-san-xuats/:id} : Updates an existing chiTietLenhSanXuat.
     *
     * @param id the id of the chiTietLenhSanXuat to save.
     * @param chiTietLenhSanXuat the chiTietLenhSanXuat to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated chiTietLenhSanXuat,
     * or with status {@code 400 (Bad Request)} if the chiTietLenhSanXuat is not valid,
     * or with status {@code 500 (Internal Server Error)} if the chiTietLenhSanXuat couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/chi-tiet-lenh-san-xuats/{id}")
    public ResponseEntity<ChiTietLenhSanXuat> updateChiTietLenhSanXuat(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody ChiTietLenhSanXuat chiTietLenhSanXuat
    ) throws URISyntaxException {
        log.debug("REST request to update ChiTietLenhSanXuat : {}, {}", id, chiTietLenhSanXuat);
        if (chiTietLenhSanXuat.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, chiTietLenhSanXuat.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!chiTietLenhSanXuatRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ChiTietLenhSanXuat result = chiTietLenhSanXuatRepository.save(chiTietLenhSanXuat);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, chiTietLenhSanXuat.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /chi-tiet-lenh-san-xuats/:id} : Partial updates given fields of an existing chiTietLenhSanXuat, field will ignore if it is null
     *
     * @param id the id of the chiTietLenhSanXuat to save.
     * @param chiTietLenhSanXuat the chiTietLenhSanXuat to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated chiTietLenhSanXuat,
     * or with status {@code 400 (Bad Request)} if the chiTietLenhSanXuat is not valid,
     * or with status {@code 404 (Not Found)} if the chiTietLenhSanXuat is not found,
     * or with status {@code 500 (Internal Server Error)} if the chiTietLenhSanXuat couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/chi-tiet-lenh-san-xuats/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ChiTietLenhSanXuat> partialUpdateChiTietLenhSanXuat(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody ChiTietLenhSanXuat chiTietLenhSanXuat
    ) throws URISyntaxException {
        log.debug("REST request to partial update ChiTietLenhSanXuat partially : {}, {}", id, chiTietLenhSanXuat);
        if (chiTietLenhSanXuat.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, chiTietLenhSanXuat.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!chiTietLenhSanXuatRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ChiTietLenhSanXuat> result = chiTietLenhSanXuatRepository
            .findById(chiTietLenhSanXuat.getId())
            .map(existingChiTietLenhSanXuat -> {
                if (chiTietLenhSanXuat.getReelID() != null) {
                    existingChiTietLenhSanXuat.setReelID(chiTietLenhSanXuat.getReelID());
                }
                if (chiTietLenhSanXuat.getPartNumber() != null) {
                    existingChiTietLenhSanXuat.setPartNumber(chiTietLenhSanXuat.getPartNumber());
                }
                if (chiTietLenhSanXuat.getVendor() != null) {
                    existingChiTietLenhSanXuat.setVendor(chiTietLenhSanXuat.getVendor());
                }
                if (chiTietLenhSanXuat.getLot() != null) {
                    existingChiTietLenhSanXuat.setLot(chiTietLenhSanXuat.getLot());
                }
                if (chiTietLenhSanXuat.getUserData1() != null) {
                    existingChiTietLenhSanXuat.setUserData1(chiTietLenhSanXuat.getUserData1());
                }
                if (chiTietLenhSanXuat.getUserData2() != null) {
                    existingChiTietLenhSanXuat.setUserData2(chiTietLenhSanXuat.getUserData2());
                }
                if (chiTietLenhSanXuat.getUserData3() != null) {
                    existingChiTietLenhSanXuat.setUserData3(chiTietLenhSanXuat.getUserData3());
                }
                if (chiTietLenhSanXuat.getUserData4() != null) {
                    existingChiTietLenhSanXuat.setUserData4(chiTietLenhSanXuat.getUserData4());
                }
                if (chiTietLenhSanXuat.getUserData5() != null) {
                    existingChiTietLenhSanXuat.setUserData5(chiTietLenhSanXuat.getUserData5());
                }
                if (chiTietLenhSanXuat.getInitialQuantity() != null) {
                    existingChiTietLenhSanXuat.setInitialQuantity(chiTietLenhSanXuat.getInitialQuantity());
                }
                if (chiTietLenhSanXuat.getMsdLevel() != null) {
                    existingChiTietLenhSanXuat.setMsdLevel(chiTietLenhSanXuat.getMsdLevel());
                }
                if (chiTietLenhSanXuat.getMsdInitialFloorTime() != null) {
                    existingChiTietLenhSanXuat.setMsdInitialFloorTime(chiTietLenhSanXuat.getMsdInitialFloorTime());
                }
                if (chiTietLenhSanXuat.getMsdBagSealDate() != null) {
                    existingChiTietLenhSanXuat.setMsdBagSealDate(chiTietLenhSanXuat.getMsdBagSealDate());
                }
                if (chiTietLenhSanXuat.getMarketUsage() != null) {
                    existingChiTietLenhSanXuat.setMarketUsage(chiTietLenhSanXuat.getMarketUsage());
                }
                if (chiTietLenhSanXuat.getQuantityOverride() != null) {
                    existingChiTietLenhSanXuat.setQuantityOverride(chiTietLenhSanXuat.getQuantityOverride());
                }
                if (chiTietLenhSanXuat.getShelfTime() != null) {
                    existingChiTietLenhSanXuat.setShelfTime(chiTietLenhSanXuat.getShelfTime());
                }
                if (chiTietLenhSanXuat.getSpMaterialName() != null) {
                    existingChiTietLenhSanXuat.setSpMaterialName(chiTietLenhSanXuat.getSpMaterialName());
                }
                if (chiTietLenhSanXuat.getWarningLimit() != null) {
                    existingChiTietLenhSanXuat.setWarningLimit(chiTietLenhSanXuat.getWarningLimit());
                }
                if (chiTietLenhSanXuat.getMaximumLimit() != null) {
                    existingChiTietLenhSanXuat.setMaximumLimit(chiTietLenhSanXuat.getMaximumLimit());
                }
                if (chiTietLenhSanXuat.getComments() != null) {
                    existingChiTietLenhSanXuat.setComments(chiTietLenhSanXuat.getComments());
                }
                if (chiTietLenhSanXuat.getWarmupTime() != null) {
                    existingChiTietLenhSanXuat.setWarmupTime(chiTietLenhSanXuat.getWarmupTime());
                }
                if (chiTietLenhSanXuat.getStorageUnit() != null) {
                    existingChiTietLenhSanXuat.setStorageUnit(chiTietLenhSanXuat.getStorageUnit());
                }
                if (chiTietLenhSanXuat.getSubStorageUnit() != null) {
                    existingChiTietLenhSanXuat.setSubStorageUnit(chiTietLenhSanXuat.getSubStorageUnit());
                }
                if (chiTietLenhSanXuat.getLocationOverride() != null) {
                    existingChiTietLenhSanXuat.setLocationOverride(chiTietLenhSanXuat.getLocationOverride());
                }
                if (chiTietLenhSanXuat.getExpirationDate() != null) {
                    existingChiTietLenhSanXuat.setExpirationDate(chiTietLenhSanXuat.getExpirationDate());
                }
                if (chiTietLenhSanXuat.getManufacturingDate() != null) {
                    existingChiTietLenhSanXuat.setManufacturingDate(chiTietLenhSanXuat.getManufacturingDate());
                }
                if (chiTietLenhSanXuat.getPartClass() != null) {
                    existingChiTietLenhSanXuat.setPartClass(chiTietLenhSanXuat.getPartClass());
                }
                if (chiTietLenhSanXuat.getSapCode() != null) {
                    existingChiTietLenhSanXuat.setSapCode(chiTietLenhSanXuat.getSapCode());
                }
                if (chiTietLenhSanXuat.getTrangThai() != null) {
                    existingChiTietLenhSanXuat.setTrangThai(chiTietLenhSanXuat.getTrangThai());
                }
                if (chiTietLenhSanXuat.getChecked() != null) {
                    existingChiTietLenhSanXuat.setChecked(chiTietLenhSanXuat.getChecked());
                }

                return existingChiTietLenhSanXuat;
            })
            .map(chiTietLenhSanXuatRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, chiTietLenhSanXuat.getId().toString())
        );
    }

    /**
     * {@code GET  /chi-tiet-lenh-san-xuats} : get all the chiTietLenhSanXuats.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of chiTietLenhSanXuats in body.
     */
    @GetMapping("/chi-tiet-lenh-san-xuats")
    public ResponseEntity<List<ChiTietLenhSanXuat>> getAllChiTietLenhSanXuats(
        @org.springdoc.api.annotations.ParameterObject Pageable pageable
    ) {
        log.debug("REST request to get a page of ChiTietLenhSanXuats");
        Page<ChiTietLenhSanXuat> page = chiTietLenhSanXuatRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /chi-tiet-lenh-san-xuats/:id} : get the "id" chiTietLenhSanXuat.
     *
     * @param id the id of the chiTietLenhSanXuat to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the chiTietLenhSanXuat, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/chi-tiet-lenh-san-xuats/{id}")
    public ResponseEntity<ChiTietLenhSanXuat> getChiTietLenhSanXuat(@PathVariable Long id) {
        log.debug("REST request to get ChiTietLenhSanXuat : {}", id);
        Optional<ChiTietLenhSanXuat> chiTietLenhSanXuat = chiTietLenhSanXuatRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(chiTietLenhSanXuat);
    }

    /**
     * {@code DELETE  /chi-tiet-lenh-san-xuats/:id} : delete the "id" chiTietLenhSanXuat.
     *
     * @param id the id of the chiTietLenhSanXuat to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/chi-tiet-lenh-san-xuats/{id}")
    public ResponseEntity<Void> deleteChiTietLenhSanXuat(@PathVariable Long id) {
        log.debug("REST request to delete ChiTietLenhSanXuat : {}", id);
        chiTietLenhSanXuatRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
