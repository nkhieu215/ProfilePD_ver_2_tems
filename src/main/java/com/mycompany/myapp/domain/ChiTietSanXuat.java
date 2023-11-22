package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;

/**
 * A ChiTietSanXuat.
 */
@Entity
@Table(name = "chi_tiet_san_xuat")
public class ChiTietSanXuat implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "ma_kich_ban")
    private String maKichBan;

    @Column(name = "thong_so")
    private String thongSo;

    @Column(name = "min_value")
    private Float minValue;

    @Column(name = "max_value")
    private Float maxValue;

    @Column(name = "trungbinh")
    private Float trungbinh;

    @Column(name = "don_vi")
    private String donVi;

    @Column(name = "trang_thai")
    private String trangThai;

    @ManyToOne
    @JsonIgnoreProperties(value = { "chiTietSanXuats" }, allowSetters = true)
    private SanXuatHangNgay sanXuatHangNgay;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public ChiTietSanXuat id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMaKichBan() {
        return this.maKichBan;
    }

    public ChiTietSanXuat maKichBan(String maKichBan) {
        this.setMaKichBan(maKichBan);
        return this;
    }

    public void setMaKichBan(String maKichBan) {
        this.maKichBan = maKichBan;
    }

    public String getTrangThai() {
        return trangThai;
    }

    public void setTrangThai(String trangThai) {
        this.trangThai = trangThai;
    }

    public ChiTietSanXuat trangThai(String trangThai) {
        this.setTrangThai(trangThai);
        return this;
    }

    public String getThongSo() {
        return this.thongSo;
    }

    public ChiTietSanXuat thongSo(String thongSo) {
        this.setThongSo(thongSo);
        return this;
    }

    public void setThongSo(String thongSo) {
        this.thongSo = thongSo;
    }

    public Float getMinValue() {
        return this.minValue;
    }

    public ChiTietSanXuat minValue(Float minValue) {
        this.setMinValue(minValue);
        return this;
    }

    public void setMinValue(Float minValue) {
        this.minValue = minValue;
    }

    public Float getMaxValue() {
        return this.maxValue;
    }

    public ChiTietSanXuat maxValue(Float maxValue) {
        this.setMaxValue(maxValue);
        return this;
    }

    public void setMaxValue(Float maxValue) {
        this.maxValue = maxValue;
    }

    public Float getTrungbinh() {
        return this.trungbinh;
    }

    public ChiTietSanXuat trungbinh(Float trungbinh) {
        this.setTrungbinh(trungbinh);
        return this;
    }

    public void setTrungbinh(Float trungbinh) {
        this.trungbinh = trungbinh;
    }

    public String getDonVi() {
        return this.donVi;
    }

    public ChiTietSanXuat donVi(String donVi) {
        this.setDonVi(donVi);
        return this;
    }

    public void setDonVi(String donVi) {
        this.donVi = donVi;
    }

    public SanXuatHangNgay getSanXuatHangNgay() {
        return this.sanXuatHangNgay;
    }

    public void setSanXuatHangNgay(SanXuatHangNgay sanXuatHangNgay) {
        this.sanXuatHangNgay = sanXuatHangNgay;
    }

    public ChiTietSanXuat sanXuatHangNgay(SanXuatHangNgay sanXuatHangNgay) {
        this.setSanXuatHangNgay(sanXuatHangNgay);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ChiTietSanXuat)) {
            return false;
        }
        return id != null && id.equals(((ChiTietSanXuat) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    @Override
    public String toString() {
        return (
            "ChiTietSanXuat{" +
            "id=" +
            getId() +
            ", maKichBan='" +
            getMaKichBan() +
            '\'' +
            ", thongSo='" +
            getThongSo() +
            '\'' +
            ", minValue=" +
            getMinValue() +
            ", maxValue=" +
            getMaxValue() +
            ", trungbinh=" +
            getTrungbinh() +
            ", donVi='" +
            getDonVi() +
            '\'' +
            ", trangThai='" +
            getTrangThai() +
            '\'' +
            '}'
        );
    }
}
