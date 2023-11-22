package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.LichSuUpdate;
import com.mycompany.myapp.repository.LichSuUpdateRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.LichSuUpdate}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class LichSuUpdateResource {

    private final Logger log = LoggerFactory.getLogger(LichSuUpdateResource.class);

    private static final String ENTITY_NAME = "lichSuUpdate";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LichSuUpdateRepository lichSuUpdateRepository;

    public LichSuUpdateResource(LichSuUpdateRepository lichSuUpdateRepository) {
        this.lichSuUpdateRepository = lichSuUpdateRepository;
    }

    /**
     * {@code POST  /lich-su-updates} : Create a new lichSuUpdate.
     *
     * @param lichSuUpdate the lichSuUpdate to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new lichSuUpdate, or with status {@code 400 (Bad Request)} if the lichSuUpdate has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/lich-su-updates")
    public ResponseEntity<LichSuUpdate> createLichSuUpdate(@RequestBody LichSuUpdate lichSuUpdate) throws URISyntaxException {
        log.debug("REST request to save LichSuUpdate : {}", lichSuUpdate);
        if (lichSuUpdate.getId() != null) {
            throw new BadRequestAlertException("A new lichSuUpdate cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LichSuUpdate result = lichSuUpdateRepository.save(lichSuUpdate);
        return ResponseEntity
            .created(new URI("/api/lich-su-updates/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /lich-su-updates/:id} : Updates an existing lichSuUpdate.
     *
     * @param id the id of the lichSuUpdate to save.
     * @param lichSuUpdate the lichSuUpdate to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated lichSuUpdate,
     * or with status {@code 400 (Bad Request)} if the lichSuUpdate is not valid,
     * or with status {@code 500 (Internal Server Error)} if the lichSuUpdate couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/lich-su-updates/{id}")
    public ResponseEntity<LichSuUpdate> updateLichSuUpdate(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody LichSuUpdate lichSuUpdate
    ) throws URISyntaxException {
        log.debug("REST request to update LichSuUpdate : {}, {}", id, lichSuUpdate);
        if (lichSuUpdate.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, lichSuUpdate.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!lichSuUpdateRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        LichSuUpdate result = lichSuUpdateRepository.save(lichSuUpdate);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, lichSuUpdate.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /lich-su-updates/:id} : Partial updates given fields of an existing lichSuUpdate, field will ignore if it is null
     *
     * @param id the id of the lichSuUpdate to save.
     * @param lichSuUpdate the lichSuUpdate to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated lichSuUpdate,
     * or with status {@code 400 (Bad Request)} if the lichSuUpdate is not valid,
     * or with status {@code 404 (Not Found)} if the lichSuUpdate is not found,
     * or with status {@code 500 (Internal Server Error)} if the lichSuUpdate couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/lich-su-updates/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<LichSuUpdate> partialUpdateLichSuUpdate(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody LichSuUpdate lichSuUpdate
    ) throws URISyntaxException {
        log.debug("REST request to partial update LichSuUpdate partially : {}, {}", id, lichSuUpdate);
        if (lichSuUpdate.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, lichSuUpdate.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!lichSuUpdateRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<LichSuUpdate> result = lichSuUpdateRepository
            .findById(lichSuUpdate.getId())
            .map(existingLichSuUpdate -> {
                if (lichSuUpdate.getMaKichBan() != null) {
                    existingLichSuUpdate.setMaKichBan(lichSuUpdate.getMaKichBan());
                }
                if (lichSuUpdate.getMaThietBi() != null) {
                    existingLichSuUpdate.setMaThietBi(lichSuUpdate.getMaThietBi());
                }
                if (lichSuUpdate.getLoaiThietBi() != null) {
                    existingLichSuUpdate.setLoaiThietBi(lichSuUpdate.getLoaiThietBi());
                }
                if (lichSuUpdate.getDayChuyen() != null) {
                    existingLichSuUpdate.setDayChuyen(lichSuUpdate.getDayChuyen());
                }
                if (lichSuUpdate.getMaSanPham() != null) {
                    existingLichSuUpdate.setMaSanPham(lichSuUpdate.getMaSanPham());
                }
                if (lichSuUpdate.getVersionSanPham() != null) {
                    existingLichSuUpdate.setVersionSanPham(lichSuUpdate.getVersionSanPham());
                }
                if (lichSuUpdate.getTimeUpdate() != null) {
                    existingLichSuUpdate.setTimeUpdate(lichSuUpdate.getTimeUpdate());
                }
                if (lichSuUpdate.getStatus() != null) {
                    existingLichSuUpdate.setStatus(lichSuUpdate.getStatus());
                }

                return existingLichSuUpdate;
            })
            .map(lichSuUpdateRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, lichSuUpdate.getId().toString())
        );
    }

    /**
     * {@code GET  /lich-su-updates} : get all the lichSuUpdates.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of lichSuUpdates in body.
     */
    @GetMapping("/lich-su-updates")
    public ResponseEntity<List<LichSuUpdate>> getAllLichSuUpdates(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of LichSuUpdates");
        Page<LichSuUpdate> page = lichSuUpdateRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /lich-su-updates/:id} : get the "id" lichSuUpdate.
     *
     * @param id the id of the lichSuUpdate to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the lichSuUpdate, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/lich-su-updates/{id}")
    public ResponseEntity<LichSuUpdate> getLichSuUpdate(@PathVariable Long id) {
        log.debug("REST request to get LichSuUpdate : {}", id);
        Optional<LichSuUpdate> lichSuUpdate = lichSuUpdateRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(lichSuUpdate);
    }

    /**
     * {@code DELETE  /lich-su-updates/:id} : delete the "id" lichSuUpdate.
     *
     * @param id the id of the lichSuUpdate to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/lich-su-updates/{id}")
    public ResponseEntity<Void> deleteLichSuUpdate(@PathVariable Long id) {
        log.debug("REST request to delete LichSuUpdate : {}", id);
        lichSuUpdateRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
