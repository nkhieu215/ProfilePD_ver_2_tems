package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.ChiTietLichSuUpdate;
import com.mycompany.myapp.repository.ChiTietLichSuUpdateRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.ChiTietLichSuUpdate}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ChiTietLichSuUpdateResource {

    private final Logger log = LoggerFactory.getLogger(ChiTietLichSuUpdateResource.class);

    private static final String ENTITY_NAME = "chiTietLichSuUpdate";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ChiTietLichSuUpdateRepository chiTietLichSuUpdateRepository;

    public ChiTietLichSuUpdateResource(ChiTietLichSuUpdateRepository chiTietLichSuUpdateRepository) {
        this.chiTietLichSuUpdateRepository = chiTietLichSuUpdateRepository;
    }

    /**
     * {@code POST  /chi-tiet-lich-su-updates} : Create a new chiTietLichSuUpdate.
     *
     * @param chiTietLichSuUpdate the chiTietLichSuUpdate to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new chiTietLichSuUpdate, or with status {@code 400 (Bad Request)} if the chiTietLichSuUpdate has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/chi-tiet-lich-su-updates")
    public ResponseEntity<ChiTietLichSuUpdate> createChiTietLichSuUpdate(@RequestBody ChiTietLichSuUpdate chiTietLichSuUpdate)
        throws URISyntaxException {
        log.debug("REST request to save ChiTietLichSuUpdate : {}", chiTietLichSuUpdate);
        if (chiTietLichSuUpdate.getId() != null) {
            throw new BadRequestAlertException("A new chiTietLichSuUpdate cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ChiTietLichSuUpdate result = chiTietLichSuUpdateRepository.save(chiTietLichSuUpdate);
        return ResponseEntity
            .created(new URI("/api/chi-tiet-lich-su-updates/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /chi-tiet-lich-su-updates/:id} : Updates an existing chiTietLichSuUpdate.
     *
     * @param id the id of the chiTietLichSuUpdate to save.
     * @param chiTietLichSuUpdate the chiTietLichSuUpdate to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated chiTietLichSuUpdate,
     * or with status {@code 400 (Bad Request)} if the chiTietLichSuUpdate is not valid,
     * or with status {@code 500 (Internal Server Error)} if the chiTietLichSuUpdate couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/chi-tiet-lich-su-updates/{id}")
    public ResponseEntity<ChiTietLichSuUpdate> updateChiTietLichSuUpdate(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ChiTietLichSuUpdate chiTietLichSuUpdate
    ) throws URISyntaxException {
        log.debug("REST request to update ChiTietLichSuUpdate : {}, {}", id, chiTietLichSuUpdate);
        if (chiTietLichSuUpdate.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, chiTietLichSuUpdate.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!chiTietLichSuUpdateRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ChiTietLichSuUpdate result = chiTietLichSuUpdateRepository.save(chiTietLichSuUpdate);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, chiTietLichSuUpdate.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /chi-tiet-lich-su-updates/:id} : Partial updates given fields of an existing chiTietLichSuUpdate, field will ignore if it is null
     *
     * @param id the id of the chiTietLichSuUpdate to save.
     * @param chiTietLichSuUpdate the chiTietLichSuUpdate to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated chiTietLichSuUpdate,
     * or with status {@code 400 (Bad Request)} if the chiTietLichSuUpdate is not valid,
     * or with status {@code 404 (Not Found)} if the chiTietLichSuUpdate is not found,
     * or with status {@code 500 (Internal Server Error)} if the chiTietLichSuUpdate couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/chi-tiet-lich-su-updates/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ChiTietLichSuUpdate> partialUpdateChiTietLichSuUpdate(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ChiTietLichSuUpdate chiTietLichSuUpdate
    ) throws URISyntaxException {
        log.debug("REST request to partial update ChiTietLichSuUpdate partially : {}, {}", id, chiTietLichSuUpdate);
        if (chiTietLichSuUpdate.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, chiTietLichSuUpdate.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!chiTietLichSuUpdateRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ChiTietLichSuUpdate> result = chiTietLichSuUpdateRepository
            .findById(chiTietLichSuUpdate.getId())
            .map(existingChiTietLichSuUpdate -> {
                if (chiTietLichSuUpdate.getMaKichBan() != null) {
                    existingChiTietLichSuUpdate.setMaKichBan(chiTietLichSuUpdate.getMaKichBan());
                }
                if (chiTietLichSuUpdate.getHangLssx() != null) {
                    existingChiTietLichSuUpdate.setHangLssx(chiTietLichSuUpdate.getHangLssx());
                }
                if (chiTietLichSuUpdate.getThongSo() != null) {
                    existingChiTietLichSuUpdate.setThongSo(chiTietLichSuUpdate.getThongSo());
                }
                if (chiTietLichSuUpdate.getMinValue() != null) {
                    existingChiTietLichSuUpdate.setMinValue(chiTietLichSuUpdate.getMinValue());
                }
                if (chiTietLichSuUpdate.getMaxValue() != null) {
                    existingChiTietLichSuUpdate.setMaxValue(chiTietLichSuUpdate.getMaxValue());
                }
                if (chiTietLichSuUpdate.getTrungbinh() != null) {
                    existingChiTietLichSuUpdate.setTrungbinh(chiTietLichSuUpdate.getTrungbinh());
                }
                if (chiTietLichSuUpdate.getDonVi() != null) {
                    existingChiTietLichSuUpdate.setDonVi(chiTietLichSuUpdate.getDonVi());
                }

                return existingChiTietLichSuUpdate;
            })
            .map(chiTietLichSuUpdateRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, chiTietLichSuUpdate.getId().toString())
        );
    }

    /**
     * {@code GET  /chi-tiet-lich-su-updates} : get all the chiTietLichSuUpdates.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of chiTietLichSuUpdates in body.
     */
    @GetMapping("/chi-tiet-lich-su-updates")
    public ResponseEntity<List<ChiTietLichSuUpdate>> getAllChiTietLichSuUpdates(
        @org.springdoc.api.annotations.ParameterObject Pageable pageable
    ) {
        log.debug("REST request to get a page of ChiTietLichSuUpdates");
        Page<ChiTietLichSuUpdate> page = chiTietLichSuUpdateRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /chi-tiet-lich-su-updates/:id} : get the "id" chiTietLichSuUpdate.
     *
     * @param id the id of the chiTietLichSuUpdate to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the chiTietLichSuUpdate, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/chi-tiet-lich-su-updates/{id}")
    public ResponseEntity<ChiTietLichSuUpdate> getChiTietLichSuUpdate(@PathVariable Long id) {
        log.debug("REST request to get ChiTietLichSuUpdate : {}", id);
        Optional<ChiTietLichSuUpdate> chiTietLichSuUpdate = chiTietLichSuUpdateRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(chiTietLichSuUpdate);
    }

    /**
     * {@code DELETE  /chi-tiet-lich-su-updates/:id} : delete the "id" chiTietLichSuUpdate.
     *
     * @param id the id of the chiTietLichSuUpdate to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/chi-tiet-lich-su-updates/{id}")
    public ResponseEntity<Void> deleteChiTietLichSuUpdate(@PathVariable Long id) {
        log.debug("REST request to delete ChiTietLichSuUpdate : {}", id);
        chiTietLichSuUpdateRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
