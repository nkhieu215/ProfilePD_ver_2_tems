package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.ChiTietSanXuat;
import com.mycompany.myapp.repository.ChiTietSanXuatRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.ChiTietSanXuat}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ChiTietSanXuatResource {

    private final Logger log = LoggerFactory.getLogger(ChiTietSanXuatResource.class);

    private static final String ENTITY_NAME = "chiTietSanXuat";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ChiTietSanXuatRepository chiTietSanXuatRepository;

    public ChiTietSanXuatResource(ChiTietSanXuatRepository chiTietSanXuatRepository) {
        this.chiTietSanXuatRepository = chiTietSanXuatRepository;
    }

    /**
     * {@code POST  /chi-tiet-san-xuats} : Create a new chiTietSanXuat.
     *
     * @param chiTietSanXuat the chiTietSanXuat to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new chiTietSanXuat, or with status {@code 400 (Bad Request)} if the chiTietSanXuat has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/chi-tiet-san-xuats")
    public ResponseEntity<ChiTietSanXuat> createChiTietSanXuat(@RequestBody ChiTietSanXuat chiTietSanXuat) throws URISyntaxException {
        log.debug("REST request to save ChiTietSanXuat : {}", chiTietSanXuat);
        if (chiTietSanXuat.getId() != null) {
            throw new BadRequestAlertException("A new chiTietSanXuat cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ChiTietSanXuat result = chiTietSanXuatRepository.save(chiTietSanXuat);
        return ResponseEntity
            .created(new URI("/api/chi-tiet-san-xuats/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /chi-tiet-san-xuats/:id} : Updates an existing chiTietSanXuat.
     *
     * @param id the id of the chiTietSanXuat to save.
     * @param chiTietSanXuat the chiTietSanXuat to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated chiTietSanXuat,
     * or with status {@code 400 (Bad Request)} if the chiTietSanXuat is not valid,
     * or with status {@code 500 (Internal Server Error)} if the chiTietSanXuat couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/chi-tiet-san-xuats/{id}")
    public ResponseEntity<ChiTietSanXuat> updateChiTietSanXuat(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ChiTietSanXuat chiTietSanXuat
    ) throws URISyntaxException {
        log.debug("REST request to update ChiTietSanXuat : {}, {}", id, chiTietSanXuat);
        if (chiTietSanXuat.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, chiTietSanXuat.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!chiTietSanXuatRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ChiTietSanXuat result = chiTietSanXuatRepository.save(chiTietSanXuat);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, chiTietSanXuat.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /chi-tiet-san-xuats/:id} : Partial updates given fields of an existing chiTietSanXuat, field will ignore if it is null
     *
     * @param id the id of the chiTietSanXuat to save.
     * @param chiTietSanXuat the chiTietSanXuat to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated chiTietSanXuat,
     * or with status {@code 400 (Bad Request)} if the chiTietSanXuat is not valid,
     * or with status {@code 404 (Not Found)} if the chiTietSanXuat is not found,
     * or with status {@code 500 (Internal Server Error)} if the chiTietSanXuat couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/chi-tiet-san-xuats/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ChiTietSanXuat> partialUpdateChiTietSanXuat(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ChiTietSanXuat chiTietSanXuat
    ) throws URISyntaxException {
        log.debug("REST request to partial update ChiTietSanXuat partially : {}, {}", id, chiTietSanXuat);
        if (chiTietSanXuat.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, chiTietSanXuat.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!chiTietSanXuatRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ChiTietSanXuat> result = chiTietSanXuatRepository
            .findById(chiTietSanXuat.getId())
            .map(existingChiTietSanXuat -> {
                if (chiTietSanXuat.getMaKichBan() != null) {
                    existingChiTietSanXuat.setMaKichBan(chiTietSanXuat.getMaKichBan());
                }
                if (chiTietSanXuat.getTrangThai() != null) {
                    existingChiTietSanXuat.setTrangThai(chiTietSanXuat.getTrangThai());
                }
                if (chiTietSanXuat.getThongSo() != null) {
                    existingChiTietSanXuat.setThongSo(chiTietSanXuat.getThongSo());
                }
                if (chiTietSanXuat.getMinValue() != null) {
                    existingChiTietSanXuat.setMinValue(chiTietSanXuat.getMinValue());
                }
                if (chiTietSanXuat.getMaxValue() != null) {
                    existingChiTietSanXuat.setMaxValue(chiTietSanXuat.getMaxValue());
                }
                if (chiTietSanXuat.getTrungbinh() != null) {
                    existingChiTietSanXuat.setTrungbinh(chiTietSanXuat.getTrungbinh());
                }
                if (chiTietSanXuat.getDonVi() != null) {
                    existingChiTietSanXuat.setDonVi(chiTietSanXuat.getDonVi());
                }

                return existingChiTietSanXuat;
            })
            .map(chiTietSanXuatRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, chiTietSanXuat.getId().toString())
        );
    }

    /**
     * {@code GET  /chi-tiet-san-xuats} : get all the chiTietSanXuats.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of chiTietSanXuats in body.
     */
    @GetMapping("/chi-tiet-san-xuats")
    public ResponseEntity<List<ChiTietSanXuat>> getAllChiTietSanXuats(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of ChiTietSanXuats");
        Page<ChiTietSanXuat> page = chiTietSanXuatRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /chi-tiet-san-xuats/:id} : get the "id" chiTietSanXuat.
     *
     * @param id the id of the chiTietSanXuat to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the chiTietSanXuat, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/chi-tiet-san-xuats/{id}")
    public ResponseEntity<ChiTietSanXuat> getChiTietSanXuat(@PathVariable Long id) {
        log.debug("REST request to get ChiTietSanXuat : {}", id);
        Optional<ChiTietSanXuat> chiTietSanXuat = chiTietSanXuatRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(chiTietSanXuat);
    }

    /**
     * {@code DELETE  /chi-tiet-san-xuats/:id} : delete the "id" chiTietSanXuat.
     *
     * @param id the id of the chiTietSanXuat to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/chi-tiet-san-xuats/{id}")
    public ResponseEntity<Void> deleteChiTietSanXuat(@PathVariable Long id) {
        log.debug("REST request to delete ChiTietSanXuat : {}", id);
        chiTietSanXuatRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
