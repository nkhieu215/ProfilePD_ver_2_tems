package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.LenhSanXuat;
import com.mycompany.myapp.repository.LenhSanXuatRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.LenhSanXuat}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class LenhSanXuatResource {

    private final Logger log = LoggerFactory.getLogger(LenhSanXuatResource.class);

    private static final String ENTITY_NAME = "lenhSanXuat";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LenhSanXuatRepository lenhSanXuatRepository;

    public LenhSanXuatResource(LenhSanXuatRepository lenhSanXuatRepository) {
        this.lenhSanXuatRepository = lenhSanXuatRepository;
    }

    /**
     * {@code POST  /lenh-san-xuats} : Create a new lenhSanXuat.
     *
     * @param lenhSanXuat the lenhSanXuat to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new lenhSanXuat, or with status {@code 400 (Bad Request)} if the lenhSanXuat has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/lenh-san-xuats")
    public ResponseEntity<LenhSanXuat> createLenhSanXuat(@Valid @RequestBody LenhSanXuat lenhSanXuat) throws URISyntaxException {
        log.debug("REST request to save LenhSanXuat : {}", lenhSanXuat);
        if (lenhSanXuat.getId() != null) {
            throw new BadRequestAlertException("A new lenhSanXuat cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LenhSanXuat result = lenhSanXuatRepository.save(lenhSanXuat);
        return ResponseEntity
            .created(new URI("/api/lenh-san-xuats/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /lenh-san-xuats/:id} : Updates an existing lenhSanXuat.
     *
     * @param id the id of the lenhSanXuat to save.
     * @param lenhSanXuat the lenhSanXuat to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated lenhSanXuat,
     * or with status {@code 400 (Bad Request)} if the lenhSanXuat is not valid,
     * or with status {@code 500 (Internal Server Error)} if the lenhSanXuat couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/lenh-san-xuats/{id}")
    public ResponseEntity<LenhSanXuat> updateLenhSanXuat(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody LenhSanXuat lenhSanXuat
    ) throws URISyntaxException {
        log.debug("REST request to update LenhSanXuat : {}, {}", id, lenhSanXuat);
        if (lenhSanXuat.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, lenhSanXuat.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!lenhSanXuatRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        LenhSanXuat result = lenhSanXuatRepository.save(lenhSanXuat);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, lenhSanXuat.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /lenh-san-xuats/:id} : Partial updates given fields of an existing lenhSanXuat, field will ignore if it is null
     *
     * @param id the id of the lenhSanXuat to save.
     * @param lenhSanXuat the lenhSanXuat to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated lenhSanXuat,
     * or with status {@code 400 (Bad Request)} if the lenhSanXuat is not valid,
     * or with status {@code 404 (Not Found)} if the lenhSanXuat is not found,
     * or with status {@code 500 (Internal Server Error)} if the lenhSanXuat couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/lenh-san-xuats/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<LenhSanXuat> partialUpdateLenhSanXuat(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody LenhSanXuat lenhSanXuat
    ) throws URISyntaxException {
        log.debug("REST request to partial update LenhSanXuat partially : {}, {}", id, lenhSanXuat);
        if (lenhSanXuat.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, lenhSanXuat.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!lenhSanXuatRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<LenhSanXuat> result = lenhSanXuatRepository
            .findById(lenhSanXuat.getId())
            .map(existingLenhSanXuat -> {
                if (lenhSanXuat.getMaLenhSanXuat() != null) {
                    existingLenhSanXuat.setMaLenhSanXuat(lenhSanXuat.getMaLenhSanXuat());
                }
                if (lenhSanXuat.getSapCode() != null) {
                    existingLenhSanXuat.setSapCode(lenhSanXuat.getSapCode());
                }
                if (lenhSanXuat.getSapName() != null) {
                    existingLenhSanXuat.setSapName(lenhSanXuat.getSapName());
                }
                if (lenhSanXuat.getWorkOrderCode() != null) {
                    existingLenhSanXuat.setWorkOrderCode(lenhSanXuat.getWorkOrderCode());
                }
                if (lenhSanXuat.getVersion() != null) {
                    existingLenhSanXuat.setVersion(lenhSanXuat.getVersion());
                }
                if (lenhSanXuat.getStorageCode() != null) {
                    existingLenhSanXuat.setStorageCode(lenhSanXuat.getStorageCode());
                }
                if (lenhSanXuat.getTotalQuantity() != null) {
                    existingLenhSanXuat.setTotalQuantity(lenhSanXuat.getTotalQuantity());
                }
                if (lenhSanXuat.getCreateBy() != null) {
                    existingLenhSanXuat.setCreateBy(lenhSanXuat.getCreateBy());
                }
                if (lenhSanXuat.getEntryTime() != null) {
                    existingLenhSanXuat.setEntryTime(lenhSanXuat.getEntryTime());
                }
                if (lenhSanXuat.getTrangThai() != null) {
                    existingLenhSanXuat.setTrangThai(lenhSanXuat.getTrangThai());
                }
                if (lenhSanXuat.getComment() != null) {
                    existingLenhSanXuat.setComment(lenhSanXuat.getComment());
                }

                return existingLenhSanXuat;
            })
            .map(lenhSanXuatRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, lenhSanXuat.getId().toString())
        );
    }

    /**
     * {@code GET  /lenh-san-xuats} : get all the lenhSanXuats.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of lenhSanXuats in body.
     */
    @GetMapping("/lenh-san-xuats")
    public ResponseEntity<List<LenhSanXuat>> getAllLenhSanXuats(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of LenhSanXuats");
        Page<LenhSanXuat> page = lenhSanXuatRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /lenh-san-xuats/:id} : get the "id" lenhSanXuat.
     *
     * @param id the id of the lenhSanXuat to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the lenhSanXuat, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/lenh-san-xuats/{id}")
    public ResponseEntity<LenhSanXuat> getLenhSanXuat(@PathVariable Long id) {
        log.debug("REST request to get LenhSanXuat : {}", id);
        Optional<LenhSanXuat> lenhSanXuat = lenhSanXuatRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(lenhSanXuat);
    }

    /**
     * {@code DELETE  /lenh-san-xuats/:id} : delete the "id" lenhSanXuat.
     *
     * @param id the id of the lenhSanXuat to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/lenh-san-xuats/{id}")
    public ResponseEntity<Void> deleteLenhSanXuat(@PathVariable Long id) {
        log.debug("REST request to delete LenhSanXuat : {}", id);
        lenhSanXuatRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
