package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.ThongSoMay;
import com.mycompany.myapp.repository.ThongSoMayRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.ThongSoMay}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ThongSoMayResource {

    private final Logger log = LoggerFactory.getLogger(ThongSoMayResource.class);

    private static final String ENTITY_NAME = "thongSoMay";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ThongSoMayRepository thongSoMayRepository;

    public ThongSoMayResource(ThongSoMayRepository thongSoMayRepository) {
        this.thongSoMayRepository = thongSoMayRepository;
    }

    /**
     * {@code POST  /thong-so-mays} : Create a new thongSoMay.
     *
     * @param thongSoMay the thongSoMay to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new thongSoMay, or with status {@code 400 (Bad Request)} if the thongSoMay has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/thong-so-mays")
    public ResponseEntity<ThongSoMay> createThongSoMay(@RequestBody ThongSoMay thongSoMay) throws URISyntaxException {
        log.debug("REST request to save ThongSoMay : {}", thongSoMay);
        if (thongSoMay.getId() != null) {
            throw new BadRequestAlertException("A new thongSoMay cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ThongSoMay result = thongSoMayRepository.save(thongSoMay);
        return ResponseEntity
            .created(new URI("/api/thong-so-mays/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /thong-so-mays/:id} : Updates an existing thongSoMay.
     *
     * @param id the id of the thongSoMay to save.
     * @param thongSoMay the thongSoMay to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated thongSoMay,
     * or with status {@code 400 (Bad Request)} if the thongSoMay is not valid,
     * or with status {@code 500 (Internal Server Error)} if the thongSoMay couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/thong-so-mays/{id}")
    public ResponseEntity<ThongSoMay> updateThongSoMay(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ThongSoMay thongSoMay
    ) throws URISyntaxException {
        log.debug("REST request to update ThongSoMay : {}, {}", id, thongSoMay);
        if (thongSoMay.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, thongSoMay.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!thongSoMayRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ThongSoMay result = thongSoMayRepository.save(thongSoMay);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, thongSoMay.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /thong-so-mays/:id} : Partial updates given fields of an existing thongSoMay, field will ignore if it is null
     *
     * @param id the id of the thongSoMay to save.
     * @param thongSoMay the thongSoMay to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated thongSoMay,
     * or with status {@code 400 (Bad Request)} if the thongSoMay is not valid,
     * or with status {@code 404 (Not Found)} if the thongSoMay is not found,
     * or with status {@code 500 (Internal Server Error)} if the thongSoMay couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/thong-so-mays/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ThongSoMay> partialUpdateThongSoMay(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ThongSoMay thongSoMay
    ) throws URISyntaxException {
        log.debug("REST request to partial update ThongSoMay partially : {}, {}", id, thongSoMay);
        if (thongSoMay.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, thongSoMay.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!thongSoMayRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ThongSoMay> result = thongSoMayRepository
            .findById(thongSoMay.getId())
            .map(existingThongSoMay -> {
                if (thongSoMay.getMaThietBi() != null) {
                    existingThongSoMay.setMaThietBi(thongSoMay.getMaThietBi());
                }
                if (thongSoMay.getLoaiThietBi() != null) {
                    existingThongSoMay.setLoaiThietBi(thongSoMay.getLoaiThietBi());
                }
                if (thongSoMay.getHangTms() != null) {
                    existingThongSoMay.setHangTms(thongSoMay.getHangTms());
                }
                if (thongSoMay.getThongSo() != null) {
                    existingThongSoMay.setThongSo(thongSoMay.getThongSo());
                }
                if (thongSoMay.getMoTa() != null) {
                    existingThongSoMay.setMoTa(thongSoMay.getMoTa());
                }
                if (thongSoMay.getTrangThai() != null) {
                    existingThongSoMay.setTrangThai(thongSoMay.getTrangThai());
                }
                if (thongSoMay.getPhanLoai() != null) {
                    existingThongSoMay.setPhanLoai(thongSoMay.getPhanLoai());
                }

                return existingThongSoMay;
            })
            .map(thongSoMayRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, thongSoMay.getId().toString())
        );
    }

    /**
     * {@code GET  /thong-so-mays} : get all the thongSoMays.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of thongSoMays in body.
     */
    @GetMapping("/thong-so-mays")
    public ResponseEntity<List<ThongSoMay>> getAllThongSoMays(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of ThongSoMays");
        Page<ThongSoMay> page = thongSoMayRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /thong-so-mays/:id} : get the "id" thongSoMay.
     *
     * @param id the id of the thongSoMay to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the thongSoMay, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/thong-so-mays/{id}")
    public ResponseEntity<ThongSoMay> getThongSoMay(@PathVariable Long id) {
        log.debug("REST request to get ThongSoMay : {}", id);
        Optional<ThongSoMay> thongSoMay = thongSoMayRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(thongSoMay);
    }

    /**
     * {@code DELETE  /thong-so-mays/:id} : delete the "id" thongSoMay.
     *
     * @param id the id of the thongSoMay to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/thong-so-mays/{id}")
    public ResponseEntity<Void> deleteThongSoMay(@PathVariable Long id) {
        log.debug("REST request to delete ThongSoMay : {}", id);
        thongSoMayRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
