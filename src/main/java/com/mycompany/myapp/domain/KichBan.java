package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import javax.persistence.*;

/**
 * A KichBan.
 */
@Entity
@Table(name = "kich_ban")
public class KichBan implements Serializable {

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

    @Column(name = "nhom_san_pham")
    private String nhomSanPham;

    @Column(name = "ngay_tao")
    private ZonedDateTime ngayTao;

    @Column(name = "time_update")
    private ZonedDateTime timeUpdate;

    @Column(name = "update_by")
    private String updateBy;

    @Column(name = "trang_thai")
    private String trangThai;

    @OneToMany(mappedBy = "kichBan")
    @JsonIgnoreProperties(value = { "kichBan" }, allowSetters = true)
    private Set<ChiTietKichBan> chiTietKichBans = new HashSet<>();

    //    @OneToMany(mappedBy = "kichBan")
    //    @JsonIgnoreProperties(value = { "kichBan" }, allowSetters = true)
    //    private Set<NhomSanPham> nhomSanPhams = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public KichBan id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMaKichBan() {
        return this.maKichBan;
    }

    public KichBan maKichBan(String maKichBan) {
        this.setMaKichBan(maKichBan);
        return this;
    }

    public void setMaKichBan(String maKichBan) {
        this.maKichBan = maKichBan;
    }

    public String getMaThietBi() {
        return this.maThietBi;
    }

    public KichBan maThietBi(String maThietBi) {
        this.setMaThietBi(maThietBi);
        return this;
    }

    public void setMaThietBi(String maThietBi) {
        this.maThietBi = maThietBi;
    }

    public String getLoaiThietBi() {
        return this.loaiThietBi;
    }

    public KichBan loaiThietBi(String loaiThietBi) {
        this.setLoaiThietBi(loaiThietBi);
        return this;
    }

    public void setLoaiThietBi(String loaiThietBi) {
        this.loaiThietBi = loaiThietBi;
    }

    public String getDayChuyen() {
        return this.dayChuyen;
    }

    public KichBan dayChuyen(String dayChuyen) {
        this.setDayChuyen(dayChuyen);
        return this;
    }

    public void setDayChuyen(String dayChuyen) {
        this.dayChuyen = dayChuyen;
    }

    public String getMaSanPham() {
        return this.maSanPham;
    }

    public KichBan maSanPham(String maSanPham) {
        this.setMaSanPham(maSanPham);
        return this;
    }

    public void setMaSanPham(String maSanPham) {
        this.maSanPham = maSanPham;
    }

    public String getVersionSanPham() {
        return this.versionSanPham;
    }

    public KichBan versionSanPham(String versionSanPham) {
        this.setVersionSanPham(versionSanPham);
        return this;
    }

    public void setVersionSanPham(String versionSanPham) {
        this.versionSanPham = versionSanPham;
    }

    public String getNhomSanPham() {
        return this.nhomSanPham;
    }

    public KichBan nhomSanPham(String nhomSanPham) {
        this.setNhomSanPham(nhomSanPham);
        return this;
    }

    public void setNhomSanPham(String nhomSanPham) {
        this.nhomSanPham = nhomSanPham;
    }

    public ZonedDateTime getNgayTao() {
        return this.ngayTao;
    }

    public KichBan ngayTao(ZonedDateTime ngayTao) {
        this.setNgayTao(ngayTao);
        return this;
    }

    public void setNgayTao(ZonedDateTime ngayTao) {
        this.ngayTao = ngayTao;
    }

    public ZonedDateTime getTimeUpdate() {
        return this.timeUpdate;
    }

    public KichBan timeUpdate(ZonedDateTime timeUpdate) {
        this.setTimeUpdate(timeUpdate);
        return this;
    }

    public void setTimeUpdate(ZonedDateTime timeUpdate) {
        this.timeUpdate = timeUpdate;
    }

    public String getUpdateBy() {
        return this.updateBy;
    }

    public KichBan updateBy(String updateBy) {
        this.setUpdateBy(updateBy);
        return this;
    }

    public void setUpdateBy(String updateBy) {
        this.updateBy = updateBy;
    }

    public String getTrangThai() {
        return this.trangThai;
    }

    public KichBan trangThai(String trangThai) {
        this.setTrangThai(trangThai);
        return this;
    }

    public void setTrangThai(String trangThai) {
        this.trangThai = trangThai;
    }

    public Set<ChiTietKichBan> getChiTietKichBans() {
        return this.chiTietKichBans;
    }

    public void setChiTietKichBans(Set<ChiTietKichBan> chiTietKichBans) {
        if (this.chiTietKichBans != null) {
            this.chiTietKichBans.forEach(i -> i.setKichBan(null));
        }
        if (chiTietKichBans != null) {
            chiTietKichBans.forEach(i -> i.setKichBan(this));
        }
        this.chiTietKichBans = chiTietKichBans;
    }

    public KichBan chiTietKichBans(Set<ChiTietKichBan> chiTietKichBans) {
        this.setChiTietKichBans(chiTietKichBans);
        return this;
    }

    public KichBan addChiTietKichBan(ChiTietKichBan chiTietKichBan) {
        this.chiTietKichBans.add(chiTietKichBan);
        chiTietKichBan.setKichBan(this);
        return this;
    }

    public KichBan removeChiTietKichBan(ChiTietKichBan chiTietKichBan) {
        this.chiTietKichBans.remove(chiTietKichBan);
        chiTietKichBan.setKichBan(null);
        return this;
    }

    //    public Set<NhomSanPham> getNhomSanPhams() {
    //        return this.nhomSanPhams;
    //    }

    //    public void setNhomSanPhams(Set<NhomSanPham> nhomSanPhams) {
    //        if (this.nhomSanPhams != null) {
    //            this.nhomSanPhams.forEach(i -> i.setKichBan(null));
    //        }
    //        if (nhomSanPhams != null) {
    //            nhomSanPhams.forEach(i -> i.setKichBan(this));
    //        }
    //        this.nhomSanPhams = nhomSanPhams;
    //    }

    //    public KichBan nhomSanPhams(Set<NhomSanPham> nhomSanPhams) {
    //        this.setNhomSanPhams(nhomSanPhams);
    //        return this;
    //    }
    //
    //    public KichBan addNhomSanPham(NhomSanPham nhomSanPham) {
    //        this.nhomSanPhams.add(nhomSanPham);
    //        nhomSanPham.setKichBan(this);
    //        return this;
    //    }

    //    public KichBan removeNhomSanPham(NhomSanPham nhomSanPham) {
    //        this.nhomSanPhams.remove(nhomSanPham);
    //        nhomSanPham.setKichBan(null);
    //        return this;
    //    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof KichBan)) {
            return false;
        }
        return id != null && id.equals(((KichBan) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "KichBan{" +
            "id=" + getId() +
            ", maKichBan='" + getMaKichBan() + "'" +
            ", maThietBi='" + getMaThietBi() + "'" +
            ", loaiThietBi='" + getLoaiThietBi() + "'" +
            ", dayChuyen='" + getDayChuyen() + "'" +
            ", maSanPham='" + getMaSanPham() + "'" +
            ", versionSanPham='" + getVersionSanPham() + "'" +
            ", nhomSanPham='" + getNhomSanPham() + "'" +
            ", ngayTao='" + getNgayTao() + "'" +
            ", timeUpdate='" + getTimeUpdate() + "'" +
            ", updateBy='" + getUpdateBy() + "'" +
            ", trangThai='" + getTrangThai() + "'" +
            "}";
    }
}
