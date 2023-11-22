package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import javax.persistence.*;

/**
 * A LichSuUpdate.
 */
@Entity
@Table(name = "lich_su_update")
public class LichSuUpdate implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "ma_kich_ban")
    private String maKichBan;

    @Column(name = "ma_thiet_bi")
    private String maThietBi;

    @Column(name = "loai_thiet_bi")
    private String loaiThietBi;

    @Column(name = "day_chuyen")
    private String dayChuyen;

    @Column(name = "ma_san_pham")
    private String maSanPham;

    @Column(name = "version_san_pham")
    private String versionSanPham;

    @Column(name = "time_update")
    private ZonedDateTime timeUpdate;

    @Column(name = "status")
    private String status;

    @OneToMany(mappedBy = "lichSuUpdate")
    @JsonIgnoreProperties(value = { "lichSuUpdate" }, allowSetters = true)
    private List<ChiTietLichSuUpdate> chiTietLichSus;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public LichSuUpdate id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMaKichBan() {
        return this.maKichBan;
    }

    public LichSuUpdate maKichBan(String maKichBan) {
        this.setMaKichBan(maKichBan);
        return this;
    }

    public void setMaKichBan(String maKichBan) {
        this.maKichBan = maKichBan;
    }

    public String getMaThietBi() {
        return this.maThietBi;
    }

    public LichSuUpdate maThietBi(String maThietBi) {
        this.setMaThietBi(maThietBi);
        return this;
    }

    public void setMaThietBi(String maThietBi) {
        this.maThietBi = maThietBi;
    }

    public String getLoaiThietBi() {
        return this.loaiThietBi;
    }

    public LichSuUpdate loaiThietBi(String loaiThietBi) {
        this.setLoaiThietBi(loaiThietBi);
        return this;
    }

    public void setLoaiThietBi(String loaiThietBi) {
        this.loaiThietBi = loaiThietBi;
    }

    public String getDayChuyen() {
        return this.dayChuyen;
    }

    public LichSuUpdate dayChuyen(String dayChuyen) {
        this.setDayChuyen(dayChuyen);
        return this;
    }

    public void setDayChuyen(String dayChuyen) {
        this.dayChuyen = dayChuyen;
    }

    public String getMaSanPham() {
        return this.maSanPham;
    }

    public LichSuUpdate maSanPham(String maSanPham) {
        this.setMaSanPham(maSanPham);
        return this;
    }

    public void setMaSanPham(String maSanPham) {
        this.maSanPham = maSanPham;
    }

    public String getVersionSanPham() {
        return this.versionSanPham;
    }

    public LichSuUpdate versionSanPham(String versionSanPham) {
        this.setVersionSanPham(versionSanPham);
        return this;
    }

    public void setVersionSanPham(String versionSanPham) {
        this.versionSanPham = versionSanPham;
    }

    public ZonedDateTime getTimeUpdate() {
        return this.timeUpdate;
    }

    public LichSuUpdate timeUpdate(ZonedDateTime timeUpdate) {
        this.setTimeUpdate(timeUpdate);
        return this;
    }

    public void setTimeUpdate(ZonedDateTime timeUpdate) {
        this.timeUpdate = timeUpdate;
    }

    public String getStatus() {
        return this.status;
    }

    public LichSuUpdate status(String status) {
        this.setStatus(status);
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<ChiTietLichSuUpdate> getChiTietLichSus() {
        return this.chiTietLichSus;
    }

    public void setChiTietLichSus(List<ChiTietLichSuUpdate> chiTietLichSuUpdates) {
        if (this.chiTietLichSus != null) {
            this.chiTietLichSus.forEach(i -> i.setLichSuUpdate(null));
        }
        if (chiTietLichSuUpdates != null) {
            chiTietLichSuUpdates.forEach(i -> i.setLichSuUpdate(this));
        }
        this.chiTietLichSus = chiTietLichSuUpdates;
    }

    public LichSuUpdate chiTietLichSus(List<ChiTietLichSuUpdate> chiTietLichSuUpdates) {
        this.setChiTietLichSus(chiTietLichSuUpdates);
        return this;
    }

    public LichSuUpdate addChiTietLichSu(ChiTietLichSuUpdate chiTietLichSuUpdate) {
        this.chiTietLichSus.add(chiTietLichSuUpdate);
        chiTietLichSuUpdate.setLichSuUpdate(this);
        return this;
    }

    public LichSuUpdate removeChiTietLichSu(ChiTietLichSuUpdate chiTietLichSuUpdate) {
        this.chiTietLichSus.remove(chiTietLichSuUpdate);
        chiTietLichSuUpdate.setLichSuUpdate(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LichSuUpdate)) {
            return false;
        }
        return id != null && id.equals(((LichSuUpdate) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LichSuUpdate{" +
            "id=" + getId() +
            ", maKichBan='" + getMaKichBan() + "'" +
            ", maThietBi='" + getMaThietBi() + "'" +
            ", loaiThietBi='" + getLoaiThietBi() + "'" +
            ", dayChuyen='" + getDayChuyen() + "'" +
            ", maSanPham='" + getMaSanPham() + "'" +
            ", versionSanPham='" + getVersionSanPham() + "'" +
            ", timeUpdate='" + getTimeUpdate() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
