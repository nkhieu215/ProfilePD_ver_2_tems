package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.ChiTietKichBan;
import com.mycompany.myapp.repository.ChiTietKichBanRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.ChiTietKichBan}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ChiTietKichBanResource {

    private final Logger log = LoggerFactory.getLogger(ChiTietKichBanResource.class);

    private static final String ENTITY_NAME = "chiTietKichBan";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ChiTietKichBanRepository chiTietKichBanRepository;

    public ChiTietKichBanResource(ChiTietKichBanRepository chiTietKichBanRepository) {
        this.chiTietKichBanRepository = chiTietKichBanRepository;
    }

    /**
     * {@code POST  /chi-tiet-kich-bans} : Create a new chiTietKichBan.
     *
     * @param chiTietKichBan the chiTietKichBan to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new chiTietKichBan, or with status {@code 400 (Bad Request)} if the chiTietKichBan has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/chi-tiet-kich-bans")
    public ResponseEntity<ChiTietKichBan> createChiTietKichBan(@RequestBody ChiTietKichBan chiTietKichBan) throws URISyntaxException {
        log.debug("REST request to save ChiTietKichBan : {}", chiTietKichBan);
        if (chiTietKichBan.getId() != null) {
            throw new BadRequestAlertException("A new chiTietKichBan cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ChiTietKichBan result = chiTietKichBanRepository.save(chiTietKichBan);
        return ResponseEntity
            .created(new URI("/api/chi-tiet-kich-bans/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /chi-tiet-kich-bans/:id} : Updates an existing chiTietKichBan.
     *
     * @param id the id of the chiTietKichBan to save.
     * @param chiTietKichBan the chiTietKichBan to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated chiTietKichBan,
     * or with status {@code 400 (Bad Request)} if the chiTietKichBan is not valid,
     * or with status {@code 500 (Internal Server Error)} if the chiTietKichBan couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/chi-tiet-kich-bans/{id}")
    public ResponseEntity<ChiTietKichBan> updateChiTietKichBan(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ChiTietKichBan chiTietKichBan
    ) throws URISyntaxException {
        log.debug("REST request to update ChiTietKichBan : {}, {}", id, chiTietKichBan);
        if (chiTietKichBan.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, chiTietKichBan.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!chiTietKichBanRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ChiTietKichBan result = chiTietKichBanRepository.save(chiTietKichBan);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, chiTietKichBan.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /chi-tiet-kich-bans/:id} : Partial updates given fields of an existing chiTietKichBan, field will ignore if it is null
     *
     * @param id the id of the chiTietKichBan to save.
     * @param chiTietKichBan the chiTietKichBan to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated chiTietKichBan,
     * or with status {@code 400 (Bad Request)} if the chiTietKichBan is not valid,
     * or with status {@code 404 (Not Found)} if the chiTietKichBan is not found,
     * or with status {@code 500 (Internal Server Error)} if the chiTietKichBan couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/chi-tiet-kich-bans/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ChiTietKichBan> partialUpdateChiTietKichBan(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ChiTietKichBan chiTietKichBan
    ) throws URISyntaxException {
        log.debug("REST request to partial update ChiTietKichBan partially : {}, {}", id, chiTietKichBan);
        if (chiTietKichBan.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, chiTietKichBan.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!chiTietKichBanRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ChiTietKichBan> result = chiTietKichBanRepository
            .findById(chiTietKichBan.getId())
            .map(existingChiTietKichBan -> {
                if (chiTietKichBan.getMaKichBan() != null) {
                    existingChiTietKichBan.setMaKichBan(chiTietKichBan.getMaKichBan());
                }
                if (chiTietKichBan.getTrangThai() != null) {
                    existingChiTietKichBan.setTrangThai(chiTietKichBan.getTrangThai());
                }
                if (chiTietKichBan.getThongSo() != null) {
                    existingChiTietKichBan.setThongSo(chiTietKichBan.getThongSo());
                }
                if (chiTietKichBan.getMinValue() != null) {
                    existingChiTietKichBan.setMinValue(chiTietKichBan.getMinValue());
                }
                if (chiTietKichBan.getMaxValue() != null) {
                    existingChiTietKichBan.setMaxValue(chiTietKichBan.getMaxValue());
                }
                if (chiTietKichBan.getTrungbinh() != null) {
                    existingChiTietKichBan.setTrungbinh(chiTietKichBan.getTrungbinh());
                }
                if (chiTietKichBan.getDonVi() != null) {
                    existingChiTietKichBan.setDonVi(chiTietKichBan.getDonVi());
                }
                if (chiTietKichBan.getPhanLoai() != null) {
                    existingChiTietKichBan.setPhanLoai(chiTietKichBan.getPhanLoai());
                }

                return existingChiTietKichBan;
            })
            .map(chiTietKichBanRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, chiTietKichBan.getId().toString())
        );
    }

    /**
     * {@code GET  /chi-tiet-kich-bans} : get all the chiTietKichBans.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of chiTietKichBans in body.
     */
    @GetMapping("/chi-tiet-kich-bans")
    public ResponseEntity<List<ChiTietKichBan>> getAllChiTietKichBans(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of ChiTietKichBans");
        Page<ChiTietKichBan> page = chiTietKichBanRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /chi-tiet-kich-bans/:id} : get the "id" chiTietKichBan.
     *
     * @param id the id of the chiTietKichBan to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the chiTietKichBan, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/chi-tiet-kich-bans/{id}")
    public ResponseEntity<ChiTietKichBan> getChiTietKichBan(@PathVariable Long id) {
        log.debug("REST request to get ChiTietKichBan : {}", id);
        Optional<ChiTietKichBan> chiTietKichBan = chiTietKichBanRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(chiTietKichBan);
    }

    /**
     * {@code DELETE  /chi-tiet-kich-bans/:id} : delete the "id" chiTietKichBan.
     *
     * @param id the id of the chiTietKichBan to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/chi-tiet-kich-bans/{id}")
    public ResponseEntity<Void> deleteChiTietKichBan(@PathVariable Long id) {
        log.debug("REST request to delete ChiTietKichBan : {}", id);
        chiTietKichBanRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
