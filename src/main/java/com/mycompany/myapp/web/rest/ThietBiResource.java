package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.ThietBi;
import com.mycompany.myapp.repository.ThietBiRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.ThietBi}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ThietBiResource {

    private final Logger log = LoggerFactory.getLogger(ThietBiResource.class);

    private static final String ENTITY_NAME = "thietBi";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ThietBiRepository thietBiRepository;

    public ThietBiResource(ThietBiRepository thietBiRepository) {
        this.thietBiRepository = thietBiRepository;
    }

    /**
     * {@code POST  /thiet-bis} : Create a new thietBi.
     *
     * @param thietBi the thietBi to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new thietBi, or with status {@code 400 (Bad Request)} if the thietBi has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/thiet-bis")
    public ResponseEntity<ThietBi> createThietBi(@RequestBody ThietBi thietBi) throws URISyntaxException {
        log.debug("REST request to save ThietBi : {}", thietBi);
        if (thietBi.getId() != null) {
            throw new BadRequestAlertException("A new thietBi cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ThietBi result = thietBiRepository.save(thietBi);
        return ResponseEntity
            .created(new URI("/api/thiet-bis/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /thiet-bis/:id} : Updates an existing thietBi.
     *
     * @param id the id of the thietBi to save.
     * @param thietBi the thietBi to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated thietBi,
     * or with status {@code 400 (Bad Request)} if the thietBi is not valid,
     * or with status {@code 500 (Internal Server Error)} if the thietBi couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/thiet-bis/{id}")
    public ResponseEntity<ThietBi> updateThietBi(@PathVariable(value = "id", required = false) final Long id, @RequestBody ThietBi thietBi)
        throws URISyntaxException {
        log.debug("REST request to update ThietBi : {}, {}", id, thietBi);
        if (thietBi.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, thietBi.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!thietBiRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ThietBi result = thietBiRepository.save(thietBi);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, thietBi.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /thiet-bis/:id} : Partial updates given fields of an existing thietBi, field will ignore if it is null
     *
     * @param id the id of the thietBi to save.
     * @param thietBi the thietBi to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated thietBi,
     * or with status {@code 400 (Bad Request)} if the thietBi is not valid,
     * or with status {@code 404 (Not Found)} if the thietBi is not found,
     * or with status {@code 500 (Internal Server Error)} if the thietBi couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/thiet-bis/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ThietBi> partialUpdateThietBi(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ThietBi thietBi
    ) throws URISyntaxException {
        log.debug("REST request to partial update ThietBi partially : {}, {}", id, thietBi);
        if (thietBi.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, thietBi.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!thietBiRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ThietBi> result = thietBiRepository
            .findById(thietBi.getId())
            .map(existingThietBi -> {
                if (thietBi.getMaThietBi() != null) {
                    existingThietBi.setMaThietBi(thietBi.getMaThietBi());
                }
                if (thietBi.getLoaiThietBi() != null) {
                    existingThietBi.setLoaiThietBi(thietBi.getLoaiThietBi());
                }
                if (thietBi.getDayChuyen() != null) {
                    existingThietBi.setDayChuyen(thietBi.getDayChuyen());
                }
                if (thietBi.getNgayTao() != null) {
                    existingThietBi.setNgayTao(thietBi.getNgayTao());
                }
                if (thietBi.getTimeUpdate() != null) {
                    existingThietBi.setTimeUpdate(thietBi.getTimeUpdate());
                }
                if (thietBi.getUpdateBy() != null) {
                    existingThietBi.setUpdateBy(thietBi.getUpdateBy());
                }
                if (thietBi.getStatus() != null) {
                    existingThietBi.setStatus(thietBi.getStatus());
                }

                return existingThietBi;
            })
            .map(thietBiRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, thietBi.getId().toString())
        );
    }

    /**
     * {@code GET  /thiet-bis} : get all the thietBis.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of thietBis in body.
     */
    @GetMapping("/thiet-bis")
    public ResponseEntity<List<ThietBi>> getAllThietBis(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of ThietBis");
        Page<ThietBi> page = thietBiRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /thiet-bis/:id} : get the "id" thietBi.
     *
     * @param id the id of the thietBi to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the thietBi, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/thiet-bis/{id}")
    public ResponseEntity<ThietBi> getThietBi(@PathVariable Long id) {
        log.debug("REST request to get ThietBi : {}", id);
        Optional<ThietBi> thietBi = thietBiRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(thietBi);
    }

    /**
     * {@code DELETE  /thiet-bis/:id} : delete the "id" thietBi.
     *
     * @param id the id of the thietBi to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/thiet-bis/{id}")
    public ResponseEntity<Void> deleteThietBi(@PathVariable Long id) {
        log.debug("REST request to delete ThietBi : {}", id);
        thietBiRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
