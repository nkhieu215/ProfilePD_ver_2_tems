package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import javax.persistence.*;

/**
 * A SanXuatHangNgay.
 */
@Entity
@Table(name = "san_xuat_hang_ngay")
public class SanXuatHangNgay implements Serializable {

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

    @Column(name = "nhom_san_pham")
    private String nhomSanPham;

    @Column(name = "version_san_pham")
    private String versionSanPham;

    @Column(name = "ngay_tao")
    private ZonedDateTime ngayTao;

    @Column(name = "time_update")
    private ZonedDateTime timeUpdate;

    @Column(name = "trang_thai")
    private String trangThai;

    @Column(name = "signal")
    private Long signal;

    @Column(name = "parameter_convert")
    private String parameterConvert;

    @Column(name = "parameter_value_convert")
    private String parameterValueConvert;

    @OneToMany(mappedBy = "sanXuatHangNgay")
    @JsonIgnoreProperties(value = { "sanXuatHangNgay" }, allowSetters = true)
    private List<ChiTietSanXuat> chiTietSanXuats;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public SanXuatHangNgay() {}

    public Long getId() {
        return this.id;
    }

    public SanXuatHangNgay id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMaKichBan() {
        return this.maKichBan;
    }

    public SanXuatHangNgay maKichBan(String maKichBan) {
        this.setMaKichBan(maKichBan);
        return this;
    }

    public void setMaKichBan(String maKichBan) {
        this.maKichBan = maKichBan;
    }

    public String getMaThietBi() {
        return this.maThietBi;
    }

    public SanXuatHangNgay maThietBi(String maThietBi) {
        this.setMaThietBi(maThietBi);
        return this;
    }

    public void setMaThietBi(String maThietBi) {
        this.maThietBi = maThietBi;
    }

    public String getLoaiThietBi() {
        return this.loaiThietBi;
    }

    public SanXuatHangNgay loaiThietBi(String loaiThietBi) {
        this.setLoaiThietBi(loaiThietBi);
        return this;
    }

    public void setLoaiThietBi(String loaiThietBi) {
        this.loaiThietBi = loaiThietBi;
    }

    public String getDayChuyen() {
        return this.dayChuyen;
    }

    public SanXuatHangNgay dayChuyen(String dayChuyen) {
        this.setDayChuyen(dayChuyen);
        return this;
    }

    public void setDayChuyen(String dayChuyen) {
        this.dayChuyen = dayChuyen;
    }

    public String getNhomSanPham() {
        return nhomSanPham;
    }

    public void setNhomSanPham(String nhomSanPham) {
        this.nhomSanPham = nhomSanPham;
    }

    public String getMaSanPham() {
        return this.maSanPham;
    }

    public SanXuatHangNgay maSanPham(String maSanPham) {
        this.setMaSanPham(maSanPham);
        return this;
    }

    public void setMaSanPham(String maSanPham) {
        this.maSanPham = maSanPham;
    }

    public String getVersionSanPham() {
        return this.versionSanPham;
    }

    public SanXuatHangNgay versionSanPham(String versionSanPham) {
        this.setVersionSanPham(versionSanPham);
        return this;
    }

    public void setVersionSanPham(String versionSanPham) {
        this.versionSanPham = versionSanPham;
    }

    public ZonedDateTime getNgayTao() {
        return this.ngayTao;
    }

    public SanXuatHangNgay ngayTao(ZonedDateTime ngayTao) {
        this.setNgayTao(ngayTao);
        return this;
    }

    public void setNgayTao(ZonedDateTime ngayTao) {
        this.ngayTao = ngayTao;
    }

    public ZonedDateTime getTimeUpdate() {
        return this.timeUpdate;
    }

    public SanXuatHangNgay timeUpdate(ZonedDateTime timeUpdate) {
        this.setTimeUpdate(timeUpdate);
        return this;
    }

    public void setTimeUpdate(ZonedDateTime timeUpdate) {
        this.timeUpdate = timeUpdate;
    }

    public String getTrangThai() {
        return this.trangThai;
    }

    public SanXuatHangNgay trangThai(String trangThai) {
        this.setTrangThai(trangThai);
        return this;
    }

    public void setTrangThai(String trangThai) {
        this.trangThai = trangThai;
    }

    public Long getSignal() {
        return signal;
    }

    public SanXuatHangNgay signal(Long signal) {
        this.setSignal(signal);
        return this;
    }

    public void setSignal(Long signal) {
        this.signal = signal;
    }

    public List<ChiTietSanXuat> getChiTietSanXuats() {
        return this.chiTietSanXuats;
    }

    public void setChiTietSanXuats(List<ChiTietSanXuat> chiTietSanXuats) {
        if (this.chiTietSanXuats != null) {
            this.chiTietSanXuats.forEach(i -> i.setSanXuatHangNgay(null));
        }
        if (chiTietSanXuats != null) {
            chiTietSanXuats.forEach(i -> i.setSanXuatHangNgay(this));
        }
        this.chiTietSanXuats = chiTietSanXuats;
    }

    public SanXuatHangNgay chiTietSanXuats(List<ChiTietSanXuat> chiTietSanXuats) {
        this.setChiTietSanXuats(chiTietSanXuats);
        return this;
    }

    public SanXuatHangNgay addChiTietSanXuat(ChiTietSanXuat chiTietSanXuat) {
        this.chiTietSanXuats.add(chiTietSanXuat);
        chiTietSanXuat.setSanXuatHangNgay(this);
        return this;
    }

    public SanXuatHangNgay removeChiTietSanXuat(ChiTietSanXuat chiTietSanXuat) {
        this.chiTietSanXuats.remove(chiTietSanXuat);
        chiTietSanXuat.setSanXuatHangNgay(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SanXuatHangNgay)) {
            return false;
        }
        return id != null && id.equals(((SanXuatHangNgay) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    public String getParameterConvert() {
        return parameterConvert;
    }

    public void setParameterConvert(String parameterConvert) {
        this.parameterConvert = parameterConvert;
    }

    public String getParameterValueConvert() {
        return parameterValueConvert;
    }

    public void setParameterValueConvert(String parameterValueConvert) {
        this.parameterValueConvert = parameterValueConvert;
    }

    @Override
    public String toString() {
        return (
            "SanXuatHangNgay{" +
            "id=" +
            getId() +
            ", maKichBan='" +
            getMaKichBan() +
            '\'' +
            ", maThietBi='" +
            getMaThietBi() +
            '\'' +
            ", loaiThietBi='" +
            getLoaiThietBi() +
            '\'' +
            ", dayChuyen='" +
            getDayChuyen() +
            '\'' +
            ", maSanPham='" +
            getMaSanPham() +
            '\'' +
            ", nhomSanPham='" +
            getNhomSanPham() +
            '\'' +
            ", versionSanPham='" +
            getVersionSanPham() +
            '\'' +
            ", ngayTao=" +
            getNgayTao() +
            ", timeUpdate=" +
            getTimeUpdate() +
            ", trangThai='" +
            getTrangThai() +
            '\'' +
            ", signal=" +
            getSignal() +
            ", parameterConvert='" +
            getParameterConvert() +
            '\'' +
            ", parameterValueConvert='" +
            getParameterValueConvert() +
            '\'' +
            '}'
        );
    }
}
