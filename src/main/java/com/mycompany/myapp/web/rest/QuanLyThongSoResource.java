package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.QuanLyThongSo;
import com.mycompany.myapp.repository.QuanLyThongSoRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.QuanLyThongSo}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class QuanLyThongSoResource {

    private final Logger log = LoggerFactory.getLogger(QuanLyThongSoResource.class);

    private static final String ENTITY_NAME = "quanLyThongSo";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final QuanLyThongSoRepository quanLyThongSoRepository;

    public QuanLyThongSoResource(QuanLyThongSoRepository quanLyThongSoRepository) {
        this.quanLyThongSoRepository = quanLyThongSoRepository;
    }

    /**
     * {@code POST  /quan-ly-thong-sos} : Create a new quanLyThongSo.
     *
     * @param quanLyThongSo the quanLyThongSo to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new quanLyThongSo, or with status {@code 400 (Bad Request)} if the quanLyThongSo has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/quan-ly-thong-sos")
    public ResponseEntity<QuanLyThongSo> createQuanLyThongSo(@RequestBody QuanLyThongSo quanLyThongSo) throws URISyntaxException {
        log.debug("REST request to save QuanLyThongSo : {}", quanLyThongSo);
        if (quanLyThongSo.getId() != null) {
            throw new BadRequestAlertException("A new quanLyThongSo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        QuanLyThongSo result = quanLyThongSoRepository.save(quanLyThongSo);
        return ResponseEntity
            .created(new URI("/api/quan-ly-thong-sos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /quan-ly-thong-sos/:id} : Updates an existing quanLyThongSo.
     *
     * @param id the id of the quanLyThongSo to save.
     * @param quanLyThongSo the quanLyThongSo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated quanLyThongSo,
     * or with status {@code 400 (Bad Request)} if the quanLyThongSo is not valid,
     * or with status {@code 500 (Internal Server Error)} if the quanLyThongSo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/quan-ly-thong-sos/{id}")
    public ResponseEntity<QuanLyThongSo> updateQuanLyThongSo(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody QuanLyThongSo quanLyThongSo
    ) throws URISyntaxException {
        log.debug("REST request to update QuanLyThongSo : {}, {}", id, quanLyThongSo);
        if (quanLyThongSo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, quanLyThongSo.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!quanLyThongSoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        QuanLyThongSo result = quanLyThongSoRepository.save(quanLyThongSo);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, quanLyThongSo.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /quan-ly-thong-sos/:id} : Partial updates given fields of an existing quanLyThongSo, field will ignore if it is null
     *
     * @param id the id of the quanLyThongSo to save.
     * @param quanLyThongSo the quanLyThongSo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated quanLyThongSo,
     * or with status {@code 400 (Bad Request)} if the quanLyThongSo is not valid,
     * or with status {@code 404 (Not Found)} if the quanLyThongSo is not found,
     * or with status {@code 500 (Internal Server Error)} if the quanLyThongSo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/quan-ly-thong-sos/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<QuanLyThongSo> partialUpdateQuanLyThongSo(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody QuanLyThongSo quanLyThongSo
    ) throws URISyntaxException {
        log.debug("REST request to partial update QuanLyThongSo partially : {}, {}", id, quanLyThongSo);
        if (quanLyThongSo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, quanLyThongSo.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!quanLyThongSoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<QuanLyThongSo> result = quanLyThongSoRepository
            .findById(quanLyThongSo.getId())
            .map(existingQuanLyThongSo -> {
                if (quanLyThongSo.getMaThongSo() != null) {
                    existingQuanLyThongSo.setMaThongSo(quanLyThongSo.getMaThongSo());
                }
                if (quanLyThongSo.getTenThongSo() != null) {
                    existingQuanLyThongSo.setTenThongSo(quanLyThongSo.getTenThongSo());
                }
                if (quanLyThongSo.getMoTa() != null) {
                    existingQuanLyThongSo.setMoTa(quanLyThongSo.getMoTa());
                }
                if (quanLyThongSo.getNgayTao() != null) {
                    existingQuanLyThongSo.setNgayTao(quanLyThongSo.getNgayTao());
                }
                if (quanLyThongSo.getNgayUpdate() != null) {
                    existingQuanLyThongSo.setNgayUpdate(quanLyThongSo.getNgayUpdate());
                }
                if (quanLyThongSo.getUpdateBy() != null) {
                    existingQuanLyThongSo.setUpdateBy(quanLyThongSo.getUpdateBy());
                }
                if (quanLyThongSo.getStatus() != null) {
                    existingQuanLyThongSo.setStatus(quanLyThongSo.getStatus());
                }

                return existingQuanLyThongSo;
            })
            .map(quanLyThongSoRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, quanLyThongSo.getId().toString())
        );
    }

    /**
     * {@code GET  /quan-ly-thong-sos} : get all the quanLyThongSos.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of quanLyThongSos in body.
     */
    @GetMapping("/quan-ly-thong-sos")
    public ResponseEntity<List<QuanLyThongSo>> getAllQuanLyThongSos(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of QuanLyThongSos");
        Page<QuanLyThongSo> page = quanLyThongSoRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /quan-ly-thong-sos/:id} : get the "id" quanLyThongSo.
     *
     * @param id the id of the quanLyThongSo to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the quanLyThongSo, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/quan-ly-thong-sos/{id}")
    public ResponseEntity<QuanLyThongSo> getQuanLyThongSo(@PathVariable Long id) {
        log.debug("REST request to get QuanLyThongSo : {}", id);
        Optional<QuanLyThongSo> quanLyThongSo = quanLyThongSoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(quanLyThongSo);
    }

    /**
     * {@code DELETE  /quan-ly-thong-sos/:id} : delete the "id" quanLyThongSo.
     *
     * @param id the id of the quanLyThongSo to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/quan-ly-thong-sos/{id}")
    public ResponseEntity<Void> deleteQuanLyThongSo(@PathVariable Long id) {
        log.debug("REST request to delete QuanLyThongSo : {}", id);
        quanLyThongSoRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
