package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.KichBan;
import com.mycompany.myapp.repository.KichBanRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.KichBan}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class KichBanResource {

    private final Logger log = LoggerFactory.getLogger(KichBanResource.class);

    private static final String ENTITY_NAME = "kichBan";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final KichBanRepository kichBanRepository;

    public KichBanResource(KichBanRepository kichBanRepository) {
        this.kichBanRepository = kichBanRepository;
    }

    /**
     * {@code POST  /kich-bans} : Create a new kichBan.
     *
     * @param kichBan the kichBan to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new kichBan, or with status {@code 400 (Bad Request)} if the kichBan has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/kich-bans")
    public ResponseEntity<KichBan> createKichBan(@RequestBody KichBan kichBan) throws URISyntaxException {
        log.debug("REST request to save KichBan : {}", kichBan);
        if (kichBan.getId() != null) {
            throw new BadRequestAlertException("A new kichBan cannot already have an ID", ENTITY_NAME, "idexists");
        }
        KichBan result = kichBanRepository.save(kichBan);
        return ResponseEntity
            .created(new URI("/api/kich-bans/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /kich-bans/:id} : Updates an existing kichBan.
     *
     * @param id the id of the kichBan to save.
     * @param kichBan the kichBan to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated kichBan,
     * or with status {@code 400 (Bad Request)} if the kichBan is not valid,
     * or with status {@code 500 (Internal Server Error)} if the kichBan couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/kich-bans/{id}")
    public ResponseEntity<KichBan> updateKichBan(@PathVariable(value = "id", required = false) final Long id, @RequestBody KichBan kichBan)
        throws URISyntaxException {
        log.debug("REST request to update KichBan : {}, {}", id, kichBan);
        if (kichBan.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, kichBan.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!kichBanRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        KichBan result = kichBanRepository.save(kichBan);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, kichBan.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /kich-bans/:id} : Partial updates given fields of an existing kichBan, field will ignore if it is null
     *
     * @param id the id of the kichBan to save.
     * @param kichBan the kichBan to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated kichBan,
     * or with status {@code 400 (Bad Request)} if the kichBan is not valid,
     * or with status {@code 404 (Not Found)} if the kichBan is not found,
     * or with status {@code 500 (Internal Server Error)} if the kichBan couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/kich-bans/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<KichBan> partialUpdateKichBan(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody KichBan kichBan
    ) throws URISyntaxException {
        log.debug("REST request to partial update KichBan partially : {}, {}", id, kichBan);
        if (kichBan.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, kichBan.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!kichBanRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<KichBan> result = kichBanRepository
            .findById(kichBan.getId())
            .map(existingKichBan -> {
                if (kichBan.getMaKichBan() != null) {
                    existingKichBan.setMaKichBan(kichBan.getMaKichBan());
                }
                if (kichBan.getMaThietBi() != null) {
                    existingKichBan.setMaThietBi(kichBan.getMaThietBi());
                }
                if (kichBan.getLoaiThietBi() != null) {
                    existingKichBan.setLoaiThietBi(kichBan.getLoaiThietBi());
                }
                if (kichBan.getDayChuyen() != null) {
                    existingKichBan.setDayChuyen(kichBan.getDayChuyen());
                }
                if (kichBan.getMaSanPham() != null) {
                    existingKichBan.setMaSanPham(kichBan.getMaSanPham());
                }
                if (kichBan.getVersionSanPham() != null) {
                    existingKichBan.setVersionSanPham(kichBan.getVersionSanPham());
                }
                if (kichBan.getNgayTao() != null) {
                    existingKichBan.setNgayTao(kichBan.getNgayTao());
                }
                if (kichBan.getTimeUpdate() != null) {
                    existingKichBan.setTimeUpdate(kichBan.getTimeUpdate());
                }
                if (kichBan.getUpdateBy() != null) {
                    existingKichBan.setUpdateBy(kichBan.getUpdateBy());
                }
                if (kichBan.getTrangThai() != null) {
                    existingKichBan.setTrangThai(kichBan.getTrangThai());
                }

                return existingKichBan;
            })
            .map(kichBanRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, kichBan.getId().toString())
        );
    }

    /**
     * {@code GET  /kich-bans} : get all the kichBans.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of kichBans in body.
     */
    @GetMapping("/kich-bans")
    public ResponseEntity<List<KichBan>> getAllKichBans(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of KichBans");
        Page<KichBan> page = kichBanRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /kich-bans/:id} : get the "id" kichBan.
     *
     * @param id the id of the kichBan to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the kichBan, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/kich-bans/{id}")
    public ResponseEntity<KichBan> getKichBan(@PathVariable Long id) {
        log.debug("REST request to get KichBan : {}", id);
        Optional<KichBan> kichBan = kichBanRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(kichBan);
    }

    /**
     * {@code DELETE  /kich-bans/:id} : delete the "id" kichBan.
     *
     * @param id the id of the kichBan to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/kich-bans/{id}")
    public ResponseEntity<Void> deleteKichBan(@PathVariable Long id) {
        log.debug("REST request to delete KichBan : {}", id);
        kichBanRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
