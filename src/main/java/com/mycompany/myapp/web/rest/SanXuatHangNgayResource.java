package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.SanXuatHangNgay;
import com.mycompany.myapp.repository.SanXuatHangNgayRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.SanXuatHangNgay}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SanXuatHangNgayResource {

    private final Logger log = LoggerFactory.getLogger(SanXuatHangNgayResource.class);

    private static final String ENTITY_NAME = "sanXuatHangNgay";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SanXuatHangNgayRepository sanXuatHangNgayRepository;

    public SanXuatHangNgayResource(SanXuatHangNgayRepository sanXuatHangNgayRepository) {
        this.sanXuatHangNgayRepository = sanXuatHangNgayRepository;
    }

    /**
     * {@code POST  /san-xuat-hang-ngays} : Create a new sanXuatHangNgay.
     *
     * @param sanXuatHangNgay the sanXuatHangNgay to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new sanXuatHangNgay, or with status {@code 400 (Bad Request)} if the sanXuatHangNgay has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/san-xuat-hang-ngays")
    public ResponseEntity<SanXuatHangNgay> createSanXuatHangNgay(@RequestBody SanXuatHangNgay sanXuatHangNgay) throws URISyntaxException {
        log.debug("REST request to save SanXuatHangNgay : {}", sanXuatHangNgay);
        if (sanXuatHangNgay.getId() != null) {
            throw new BadRequestAlertException("A new sanXuatHangNgay cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SanXuatHangNgay result = sanXuatHangNgayRepository.save(sanXuatHangNgay);
        return ResponseEntity
            .created(new URI("/api/san-xuat-hang-ngays/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /san-xuat-hang-ngays/:id} : Updates an existing sanXuatHangNgay.
     *
     * @param id the id of the sanXuatHangNgay to save.
     * @param sanXuatHangNgay the sanXuatHangNgay to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated sanXuatHangNgay,
     * or with status {@code 400 (Bad Request)} if the sanXuatHangNgay is not valid,
     * or with status {@code 500 (Internal Server Error)} if the sanXuatHangNgay couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/san-xuat-hang-ngays/{id}")
    public ResponseEntity<SanXuatHangNgay> updateSanXuatHangNgay(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody SanXuatHangNgay sanXuatHangNgay
    ) throws URISyntaxException {
        log.debug("REST request to update SanXuatHangNgay : {}, {}", id, sanXuatHangNgay);
        if (sanXuatHangNgay.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, sanXuatHangNgay.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!sanXuatHangNgayRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        SanXuatHangNgay result = sanXuatHangNgayRepository.save(sanXuatHangNgay);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, sanXuatHangNgay.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /san-xuat-hang-ngays/:id} : Partial updates given fields of an existing sanXuatHangNgay, field will ignore if it is null
     *
     * @param id the id of the sanXuatHangNgay to save.
     * @param sanXuatHangNgay the sanXuatHangNgay to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated sanXuatHangNgay,
     * or with status {@code 400 (Bad Request)} if the sanXuatHangNgay is not valid,
     * or with status {@code 404 (Not Found)} if the sanXuatHangNgay is not found,
     * or with status {@code 500 (Internal Server Error)} if the sanXuatHangNgay couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/san-xuat-hang-ngays/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<SanXuatHangNgay> partialUpdateSanXuatHangNgay(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody SanXuatHangNgay sanXuatHangNgay
    ) throws URISyntaxException {
        log.debug("REST request to partial update SanXuatHangNgay partially : {}, {}", id, sanXuatHangNgay);
        if (sanXuatHangNgay.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, sanXuatHangNgay.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!sanXuatHangNgayRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<SanXuatHangNgay> result = sanXuatHangNgayRepository
            .findById(sanXuatHangNgay.getId())
            .map(existingSanXuatHangNgay -> {
                if (sanXuatHangNgay.getMaKichBan() != null) {
                    existingSanXuatHangNgay.setMaKichBan(sanXuatHangNgay.getMaKichBan());
                }
                if (sanXuatHangNgay.getMaThietBi() != null) {
                    existingSanXuatHangNgay.setMaThietBi(sanXuatHangNgay.getMaThietBi());
                }
                if (sanXuatHangNgay.getLoaiThietBi() != null) {
                    existingSanXuatHangNgay.setLoaiThietBi(sanXuatHangNgay.getLoaiThietBi());
                }
                if (sanXuatHangNgay.getDayChuyen() != null) {
                    existingSanXuatHangNgay.setDayChuyen(sanXuatHangNgay.getDayChuyen());
                }
                if (sanXuatHangNgay.getMaSanPham() != null) {
                    existingSanXuatHangNgay.setMaSanPham(sanXuatHangNgay.getMaSanPham());
                }
                if (sanXuatHangNgay.getVersionSanPham() != null) {
                    existingSanXuatHangNgay.setVersionSanPham(sanXuatHangNgay.getVersionSanPham());
                }
                if (sanXuatHangNgay.getNgayTao() != null) {
                    existingSanXuatHangNgay.setNgayTao(sanXuatHangNgay.getNgayTao());
                }
                if (sanXuatHangNgay.getTimeUpdate() != null) {
                    existingSanXuatHangNgay.setTimeUpdate(sanXuatHangNgay.getTimeUpdate());
                }
                if (sanXuatHangNgay.getTrangThai() != null) {
                    existingSanXuatHangNgay.setTrangThai(sanXuatHangNgay.getTrangThai());
                }

                return existingSanXuatHangNgay;
            })
            .map(sanXuatHangNgayRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, sanXuatHangNgay.getId().toString())
        );
    }

    /**
     * {@code GET  /san-xuat-hang-ngays} : get all the sanXuatHangNgays.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of sanXuatHangNgays in body.
     */
    @GetMapping("/san-xuat-hang-ngays")
    public ResponseEntity<List<SanXuatHangNgay>> getAllSanXuatHangNgays(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of SanXuatHangNgays");
        Page<SanXuatHangNgay> page = sanXuatHangNgayRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /san-xuat-hang-ngays/:id} : get the "id" sanXuatHangNgay.
     *
     * @param id the id of the sanXuatHangNgay to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the sanXuatHangNgay, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/san-xuat-hang-ngays/{id}")
    public ResponseEntity<SanXuatHangNgay> getSanXuatHangNgay(@PathVariable Long id) {
        log.debug("REST request to get SanXuatHangNgay : {}", id);
        Optional<SanXuatHangNgay> sanXuatHangNgay = sanXuatHangNgayRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(sanXuatHangNgay);
    }

    /**
     * {@code DELETE  /san-xuat-hang-ngays/:id} : delete the "id" sanXuatHangNgay.
     *
     * @param id the id of the sanXuatHangNgay to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/san-xuat-hang-ngays/{id}")
    public ResponseEntity<Void> deleteSanXuatHangNgay(@PathVariable Long id) {
        log.debug("REST request to delete SanXuatHangNgay : {}", id);
        sanXuatHangNgayRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
